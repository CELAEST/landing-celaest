/**
 * Geo-pricing client for the public landing page.
 *
 * Talks to the Celaest backend public endpoint:
 *   GET {NEXT_PUBLIC_CELAEST_API_URL}/api/v1/public/pricing/resolve?country=XX
 *
 * Responsibilities:
 *  - Best-effort country detection (URL override → cached → API default)
 *  - localStorage cache with TTL so revisits skip the network on slow links
 *  - Graceful fallback: callers always get either a valid resolved context
 *    or `null`, never a thrown error from a flaky network
 *  - Hydration-safe: only ever called on the client
 */

// Production fallback so the landing works even if the env var is not wired
// up in the deployment platform (Vercel build embeds NEXT_PUBLIC_* at build
// time — a missing var would otherwise silently disable geo-pricing).
const DEFAULT_API_BASE_URL = "https://celaest-back.onrender.com";

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_CELAEST_API_URL || DEFAULT_API_BASE_URL
).replace(/\/+$/, "");

// Cache for 1 hour. Pricing rarely changes intra-session and FX rates are
// updated daily server-side, so this keeps the landing snappy without
// surfacing stale data.
const CACHE_TTL_MS = 60 * 60 * 1000;
const CACHE_KEY_PREFIX = "celaest:geo-pricing:v1:";
const CURRENCY_OVERRIDE_KEY = "celaest:currency-override:v1";

// --- Types (mirrors the backend ResolvedPricingContext payload) -------------

export interface SupportedCurrency {
  code: string;
  name: string;
  symbol: string;
  decimals: number;
  symbol_pos: string;
  is_zero_decimal: boolean;
}

export interface ResolvedPlanPricing {
  plan_id: string;
  plan_code: string;
  plan_name: string;
  original_price_monthly: number;
  original_price_yearly: number;
  local_price_monthly: number;
  local_price_yearly: number;
  currency_code: string;
  is_override: boolean;
}

export interface ResolvedPricingContext {
  country_code: string;
  country_name: string;
  currency: SupportedCurrency;
  ppp_factor: number;
  exchange_rate: number;
  plans: ResolvedPlanPricing[];
}

// --- API envelope helpers ---------------------------------------------------

interface ApiEnvelope<T> {
  success: boolean;
  data?: T;
  error?: { message?: string };
}

function unwrapEnvelope<T>(payload: unknown): T {
  if (
    payload &&
    typeof payload === "object" &&
    "success" in payload
  ) {
    const env = payload as ApiEnvelope<T>;
    if (env.success !== true) {
      throw new Error(env.error?.message || "API returned an unsuccessful response");
    }
    return env.data as T;
  }
  return payload as T;
}

// --- Country override (URL ?country=XX or ?geoCountry=XX) -------------------

export function getCountryOverrideFromURL(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const params = new URLSearchParams(window.location.search);
    const raw =
      params.get("geoCountry") ||
      params.get("country") ||
      null;
    if (!raw) return null;
    const code = raw.trim().toUpperCase();
    // ISO 3166-1 alpha-2: exactly two letters.
    return /^[A-Z]{2}$/.test(code) ? code : null;
  } catch {
    return null;
  }
}

// --- Manual currency switcher (USD opt-out) --------------------------------
//
// When a visitor explicitly picks "show me USD" in the UI, we persist that
// preference in localStorage so it survives navigation. `null` means "use
// local currency detected by the API".

export type CurrencyOverride = "USD" | null;

export function getCurrencyOverride(): CurrencyOverride {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CURRENCY_OVERRIDE_KEY);
    return raw === "USD" ? "USD" : null;
  } catch {
    return null;
  }
}

export function setCurrencyOverride(value: CurrencyOverride): void {
  if (typeof window === "undefined") return;
  try {
    if (value) {
      window.localStorage.setItem(CURRENCY_OVERRIDE_KEY, value);
    } else {
      window.localStorage.removeItem(CURRENCY_OVERRIDE_KEY);
    }
  } catch {
    /* ignore quota / disabled storage */
  }
}

// --- Cache -----------------------------------------------------------------

interface CacheEntry {
  ts: number;
  value: ResolvedPricingContext;
}

function cacheKey(country: string | null): string {
  return `${CACHE_KEY_PREFIX}${country || "auto"}`;
}

function readCache(country: string | null): ResolvedPricingContext | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(cacheKey(country));
    if (!raw) return null;
    const entry = JSON.parse(raw) as CacheEntry;
    if (!entry || typeof entry.ts !== "number") return null;
    if (Date.now() - entry.ts > CACHE_TTL_MS) return null;
    return entry.value;
  } catch {
    return null;
  }
}

function writeCache(country: string | null, value: ResolvedPricingContext): void {
  if (typeof window === "undefined") return;
  try {
    const entry: CacheEntry = { ts: Date.now(), value };
    window.localStorage.setItem(cacheKey(country), JSON.stringify(entry));
  } catch {
    /* ignore quota / disabled storage */
  }
}

// --- Fetch -----------------------------------------------------------------

export async function fetchGeoPricing(
  options: { country?: string | null; skipCache?: boolean } = {},
): Promise<ResolvedPricingContext | null> {
  if (!API_BASE_URL) {
    // No API configured (e.g. local dev without backend) — silently bail out.
    return null;
  }

  const country = (options.country || null)?.toUpperCase() || null;

  if (!options.skipCache) {
    const cached = readCache(country);
    if (cached) return cached;
  }

  try {
    const url = new URL(`${API_BASE_URL}/api/v1/public/pricing/resolve`);
    if (country) url.searchParams.set("country", country);

    const response = await fetch(url.toString(), {
      // We want fresh-ish data but allow the browser's HTTP cache to absorb
      // bursts of revisits within the same page session.
      cache: "default",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const json = await response.json();
    const value = unwrapEnvelope<ResolvedPricingContext>(json);

    if (!value || !value.currency || !Array.isArray(value.plans)) {
      throw new Error("Invalid pricing payload");
    }

    writeCache(country, value);
    return value;
  } catch (err) {
    // Log to the console but never throw — pricing display always degrades
    // to the translation defaults (USD) when the API is unreachable.
    if (typeof console !== "undefined") {
      console.warn("[geo-pricing] fetch failed:", err);
    }
    return null;
  }
}

// --- Formatting ------------------------------------------------------------

/**
 * Format a numeric amount using the resolved currency, falling back to USD.
 * Locale is taken from the browser so 1,200.00 becomes 1.200,00 in es-CO etc.
 */
export function formatLocalAmount(
  amount: number,
  currency: SupportedCurrency | null | undefined,
  locale: string,
): string {
  const code = currency?.code || "USD";
  const isZero = currency?.is_zero_decimal ?? false;
  const decimals = isZero ? 0 : (currency?.decimals ?? 2);

  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: code,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(amount);
  } catch {
    // Some exotic currency codes can be rejected by Intl on older runtimes.
    // Fall back to a plain numeric formatting with the currency code suffix.
    return `${amount.toLocaleString(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })} ${code}`;
  }
}
