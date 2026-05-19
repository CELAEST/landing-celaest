"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  fetchGeoPricing,
  formatLocalAmount,
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
  ) => { amount: number; formatted: string } | null;
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

      // Pick original (USD) values when the user has forced USD, otherwise
      // the localised values resolved by the backend.
      const amount = isForcedUSD
        ? cycle === "monthly"
          ? plan.original_price_monthly
          : plan.original_price_yearly
        : cycle === "monthly"
          ? plan.local_price_monthly
          : plan.local_price_yearly;

      if (typeof amount !== "number" || !Number.isFinite(amount)) return null;

      return {
        amount,
        formatted: formatLocalAmount(amount, currency, locale),
      };
    },
    [planByCode, isForcedUSD, currency, locale],
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
