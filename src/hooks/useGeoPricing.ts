"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  fetchGeoPricing,
  formatLocalAmount,
  formatLocalAmountParts,
  getCountryOverrideFromURL,
  getCurrencyOverride,
  setCurrencyOverride,
  type CurrencyOverride,
  type ResolvedPlanPricing,
  type ResolvedPricingContext,
  type SupportedCurrency,
} from "@/lib/geo-pricing";

const USD_CURRENCY: SupportedCurrency = {
  code: "USD",
  name: "US Dollar",
  symbol: "$",
  decimals: 2,
  symbol_pos: "before",
  is_zero_decimal: false,
};

interface UseGeoPricingResult {
  /** Raw resolved context (null while loading / on failure). */
  pricing: ResolvedPricingContext | null;
  /** True only on first load; subsequent refreshes keep the previous value visible. */
  isLoading: boolean;
  /** Effective currency to display (respects manual USD override). */
  currency: SupportedCurrency;
  /** True when the visitor explicitly forced USD via the switcher. */
  isForcedUSD: boolean;
  /** Toggle between local currency and USD (persists in localStorage). */
  toggleCurrencyOverride: () => void;
  /**
   * Returns the price for a plan by `plan_code` (case-insensitive), in the
   * currently selected currency. Returns `null` if the plan is missing.
   */
  getPlanPrice: (
    planCode: string,
    cycle: "monthly" | "yearly",
  ) => {
    amount: number;
    /** Fully formatted price including currency, e.g. "143.798 COP". */
    formatted: string;
    /** Number-only portion, locale-formatted: "143.798". */
    formattedNumber: string;
    /** ISO 4217 code of the currency the amount is in: "COP", "USD". */
    currencyCode: string;
    /** Currency symbol when available: "$" for USD/COP. */
    currencySymbol: string;
    /** Whether the symbol typically goes before or after the number. */
    symbolPos: "before" | "after";
  } | null;
  /** Formats an arbitrary amount in the currently selected currency. */
  formatAmount: (amount: number) => string;
}

/**
 * React hook that surfaces geo-localized plan prices to the landing.
 *
 * Best-practice behaviour:
 *  - Hydration-safe: first render returns `pricing=null`. Components fall
 *    back to translation-default USD prices until the client effect kicks in.
 *  - Country override via `?country=XX` query param (uppercase ISO 3166-1).
 *  - Manual override: `toggleCurrencyOverride()` lets the user opt back to
 *    USD without losing the resolved country context.
 *  - Cached via localStorage in the underlying lib so repeat views are instant.
 */
export function useGeoPricing(locale: string): UseGeoPricingResult {
  const [pricing, setPricing] = useState<ResolvedPricingContext | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [override, setOverrideState] = useState<CurrencyOverride>(null);

  // Initial load: fetch resolved pricing once on mount. We don't bother with
  // a SWR-style background refresh because the lib already caches for 1h.
  useEffect(() => {
    let cancelled = false;
    const country = getCountryOverrideFromURL();
    setOverrideState(getCurrencyOverride());

    fetchGeoPricing({ country }).then((value) => {
      if (cancelled) return;
      setPricing(value);
      setIsLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const isForcedUSD = override === "USD";

  const currency: SupportedCurrency = useMemo(() => {
    if (isForcedUSD) return USD_CURRENCY;
    return pricing?.currency ?? USD_CURRENCY;
  }, [pricing, isForcedUSD]);

  const planByCode = useMemo(() => {
    const map = new Map<string, ResolvedPlanPricing>();
    for (const plan of pricing?.plans ?? []) {
      map.set(plan.plan_code.toLowerCase(), plan);
    }
    return map;
  }, [pricing]);

  const getPlanPrice = useCallback(
    (planCode: string, cycle: "monthly" | "yearly") => {
      const plan = planByCode.get(planCode.toLowerCase());
      if (!plan) return null;

      // Pick the amount in the currently selected currency.
      //
      // When the user toggles "Ver en USD" we DO NOT fall back to the US
      // base price (`original_price_*`). Doing so would make 1.437.975 COP
      // suddenly jump to $990 USD, which is the US market price and is
      // visibly more expensive than the local PPP-adjusted price.
      //
      // Instead we show the USD equivalent of the SAME amount the
      // customer would pay locally: local_price / exchange_rate. This way
      // switching currencies is just a unit conversion — it never adds or
      // removes value, which is what the user expects.
      //
      // The original USD price is only used as a fallback when the
      // backend didn't provide an exchange rate or local price (e.g. for
      // unknown countries that already default to USD).
      const localAmount =
        cycle === "monthly" ? plan.local_price_monthly : plan.local_price_yearly;
      const usdAmount =
        cycle === "monthly" ? plan.original_price_monthly : plan.original_price_yearly;
      const rate = pricing?.exchange_rate ?? 0;

      let amount: number;
      if (isForcedUSD) {
        amount = rate > 0 && Number.isFinite(localAmount) ? localAmount / rate : usdAmount;
      } else {
        amount = localAmount;
      }

      if (typeof amount !== "number" || !Number.isFinite(amount)) return null;

      const parts = formatLocalAmountParts(amount, currency, locale);
      return {
        amount,
        formatted: formatLocalAmount(amount, currency, locale),
        formattedNumber: parts.number,
        currencyCode: parts.code,
        currencySymbol: parts.symbol,
        symbolPos: parts.symbolPos,
      };
    },
    [planByCode, isForcedUSD, currency, locale, pricing?.exchange_rate],
  );

  const formatAmount = useCallback(
    (amount: number) => formatLocalAmount(amount, currency, locale),
    [currency, locale],
  );

  const toggleCurrencyOverride = useCallback(() => {
    setOverrideState((prev) => {
      const next: CurrencyOverride = prev === "USD" ? null : "USD";
      setCurrencyOverride(next);
      return next;
    });
  }, []);

  return {
    pricing,
    isLoading,
    currency,
    isForcedUSD,
    toggleCurrencyOverride,
    getPlanPrice,
    formatAmount,
  };
}
