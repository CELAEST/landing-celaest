"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Check, Globe } from "lucide-react";
import { SectionReveal } from "@/components/ui/section-reveal";
import { useGeoPricing } from "@/hooks/useGeoPricing";

interface Plan {
  /** i18n key used to read name/description/features/price in messages. */
  key: "starter" | "professional" | "enterprise";
  /**
   * Plan code as defined in the backend (`/api/v1/public/pricing/resolve`).
   * Used to look up the localised price. `null` means the plan is presented
   * as a "Custom" tier and does not have a numeric price in the API.
   */
  backendCode: "pro" | "enterprise" | null;
  popular: boolean;
}

// NOTE: the landing's marketing tiers map onto the backend's billing plans:
//   - "Starter"      (UI) → `pro`        (API, $29/mo baseline)
//   - "Professional" (UI) → `enterprise` (API, $99/mo baseline)
//   - "Enterprise"   (UI) → no API plan → presented as "Custom" / contact sales
const PLANS: Plan[] = [
  { key: "starter", backendCode: "pro", popular: false },
  { key: "professional", backendCode: "enterprise", popular: true },
  { key: "enterprise", backendCode: null, popular: false },
];

type BillingCycle = "monthly" | "yearly";

export function PricingSection() {
  const t = useTranslations("pricing");
  const locale = useLocale();
  const [cycle, setCycle] = useState<BillingCycle>("monthly");

  const {
    pricing,
    currency,
    isForcedUSD,
    toggleCurrencyOverride,
    getPlanPrice,
  } = useGeoPricing(locale);

  // Compute yearly-vs-monthly savings from the resolved professional plan so
  // the badge shows a real number (e.g. "Save 17%"). Falls back to a sensible
  // default while data is loading or absent.
  const yearlySavingsPercent = useMemo(() => {
    const ref = pricing?.plans?.find(
      (p) =>
        p.plan_code.toLowerCase() === "pro" ||
        p.plan_code.toLowerCase() === "enterprise",
    );
    if (!ref) return 17;
    const monthlyAnnualized = ref.local_price_monthly * 12;
    if (monthlyAnnualized <= 0 || ref.local_price_yearly <= 0) return 17;
    const saved = monthlyAnnualized - ref.local_price_yearly;
    return Math.max(0, Math.round((saved / monthlyAnnualized) * 100));
  }, [pricing]);

  // Whether to show the geo badge + USD switcher. We only show it when the
  // API actually resolved a non-USD currency — otherwise it's noise.
  const showGeoBadge = Boolean(
    pricing && (pricing.currency.code !== "USD" || isForcedUSD),
  );

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-x-0 top-[10%] bottom-0 z-0 opacity-[0.15]"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            maskImage:
              "radial-gradient(ellipse 60% 80% at 50% 50%, black 10%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 80% at 50% 50%, black 10%, transparent 100%)",
          }}
        />
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-brand-neon/20 rounded-full blur-[100px]" />
        <div className="absolute top-[10%] right-[10%] w-[450px] h-[450px] bg-brand-neon-blue/15 rounded-full blur-[110px]" />
        <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <SectionReveal className="max-w-[1000px] mx-auto w-full mb-10 sm:mb-14">
          <div className="flex flex-col gap-2 text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] tracking-tight leading-[1.1] text-white font-semibold flex flex-col sm:inline-block">
              <span>{t("title1")} </span>
              <span className="text-brand-slate-light font-medium">{t("title2")}</span>
            </h2>
            <p className="text-brand-slate-light text-base sm:text-lg md:text-xl lg:text-2xl font-medium tracking-tight leading-[1.4] max-w-4xl mt-4">
              {t("subtitle")}
            </p>
          </div>
        </SectionReveal>

        {/* Controls: twin "pills" share the exact same outer shell so they
            line up symmetrically on the same horizontal row.
            - h-11 (44 px) is a comfortable tap target on touch devices.
            - Inner items are h-9 (36 px) for the active segment.
            - On <sm the row wraps to a column; both pills become full-width
              and identical, preserving symmetry. */}
        <SectionReveal className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-14 px-4">
          {/* Cycle toggle */}
          <div
            role="tablist"
            aria-label={t("billing.monthly") + " / " + t("billing.yearly")}
            className="inline-flex h-11 items-center rounded-full p-1 border border-white/10 bg-white/[0.03] backdrop-blur-sm"
          >
            <button
              role="tab"
              aria-selected={cycle === "monthly"}
              onClick={() => setCycle("monthly")}
              className={`h-9 px-4 sm:px-5 text-xs sm:text-sm font-semibold rounded-full transition-colors whitespace-nowrap ${
                cycle === "monthly"
                  ? "bg-white text-brand-dark"
                  : "text-brand-slate-light hover:text-white"
              }`}
            >
              {t("billing.monthly")}
            </button>
            <button
              role="tab"
              aria-selected={cycle === "yearly"}
              onClick={() => setCycle("yearly")}
              className={`h-9 px-4 sm:px-5 text-xs sm:text-sm font-semibold rounded-full transition-colors inline-flex items-center gap-1.5 whitespace-nowrap ${
                cycle === "yearly"
                  ? "bg-white text-brand-dark"
                  : "text-brand-slate-light hover:text-white"
              }`}
            >
              {t("billing.yearly")}
              {yearlySavingsPercent > 0 && (
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    cycle === "yearly"
                      ? "bg-emerald-500/20 text-emerald-700"
                      : "bg-emerald-500/20 text-emerald-300"
                  }`}
                >
                  -{yearlySavingsPercent}%
                </span>
              )}
            </button>
          </div>

          {/* Currency switcher — same pill shape as the cycle toggle so the
              two controls feel like siblings instead of mismatched widgets. */}
          {showGeoBadge && pricing && (
            <div className="inline-flex h-11 items-center rounded-full p-1 border border-white/10 bg-white/[0.03] backdrop-blur-sm max-w-full">
              <span className="inline-flex items-center gap-2 h-9 px-3 sm:px-4 text-xs sm:text-sm text-brand-slate-light min-w-0">
                <Globe className="w-3.5 h-3.5 text-brand-neon shrink-0" aria-hidden />
                <span className="truncate">
                  {t("geo.showingIn", {
                    currency: currency.code,
                    country: pricing.country_name,
                  })}
                </span>
              </span>
              <button
                onClick={toggleCurrencyOverride}
                aria-pressed={isForcedUSD}
                className="h-9 px-4 sm:px-5 text-xs sm:text-sm font-semibold rounded-full bg-white text-brand-dark transition-colors hover:brightness-95 whitespace-nowrap shrink-0"
              >
                {isForcedUSD ? t("geo.switchToLocal") : t("geo.switchToUsd")}
              </button>
            </div>
          )}
        </SectionReveal>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-6 max-w-sm sm:max-w-md md:max-w-[1000px] mx-auto items-stretch">
          {PLANS.map((plan, idx) => {
            const features = t.raw(`plans.${plan.key}.features`) as string[];
            const fallbackPrice = t(`plans.${plan.key}.price`); // translation default (USD numeric or "Custom")
            // A plan is "Custom" when it has no backend code (contact-sales tier).
            const isCustom = plan.backendCode === null;

            // Server-resolved price for this plan in the current cycle, using
            // the backend `plan_code` (not the i18n key). Falls back to the
            // translation default while loading or on error.
            const resolved =
              isCustom || !plan.backendCode
                ? null
                : getPlanPrice(plan.backendCode, cycle);

            return (
              <SectionReveal
                key={plan.key}
                delay={idx * 100}
                className="relative group cursor-pointer transition-transform duration-300 hover:-translate-y-2"
              >
                {plan.popular && (
                  <div className="absolute -inset-[1px] bg-gradient-to-b from-brand-neon/50 via-brand-neon-blue/30 to-brand-neon/50 rounded-[25px] blur-[2px] transition-opacity duration-500 group-hover:opacity-90 opacity-60" />
                )}

                <div
                  className={`relative h-full rounded-3xl p-7 sm:p-8 flex flex-col transition-colors duration-300 ${
                    plan.popular
                      ? "bg-brand-gray border border-brand-neon/30 shadow-[0_0_30px_rgba(34,211,238,0.05)] group-hover:border-brand-neon/60"
                      : "bg-brand-surface-alt border border-white/5 shadow-xl shadow-black/50 group-hover:border-white/20"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-brand-neon to-brand-neon-blue text-brand-dark text-[10px] font-bold rounded-full uppercase tracking-[0.15em]">
                      {t("mostPopular")}
                    </div>
                  )}

                  {/* Plan name */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-white mb-1">
                      {t(`plans.${plan.key}.name`)}
                    </h3>
                    <p className="text-brand-slate-light text-xs">
                      {t(`plans.${plan.key}.description`)}
                    </p>
                  </div>

                  {/* Price block.
                      Layout: row 1 = optional symbol + number + currency code,
                      row 2 = "/mes" or "/año" billing period below.

                      Keeping the headline on a single line (no wrap) avoids
                      the ugly break where "COP" jumps under "143.798". The
                      number font size scales down with the digit count so
                      even "1.437.975" fits cleanly in the card. */}
                  <div className="mb-2 flex flex-col min-w-0 min-h-[3.5rem]">
                    {isCustom ? (
                      <span className="text-4xl sm:text-5xl font-bold bg-gradient-to-b from-white to-brand-slate-light bg-clip-text text-transparent">
                        {fallbackPrice}
                      </span>
                    ) : resolved ? (
                      <>
                        <div className="flex items-baseline gap-1.5 min-w-0 whitespace-nowrap">
                          {/* Symbol (small superscript). Hidden when the
                              symbol is "$" but the currency is not USD —
                              many LATAM currencies reuse the dollar sign
                              and we already show the code (COP / MXN) to
                              the right, so the prefix would be redundant. */}
                          {resolved.symbolPos === "before" &&
                            resolved.currencySymbol &&
                            !(
                              resolved.currencySymbol === "$" &&
                              resolved.currencyCode !== "USD"
                            ) && (
                              <span className="text-2xl sm:text-3xl font-semibold text-brand-slate-light leading-none">
                                {resolved.currencySymbol}
                              </span>
                            )}
                          <span
                            className={`font-bold bg-gradient-to-b from-white to-brand-slate-light bg-clip-text text-transparent tabular-nums leading-none ${
                              resolved.formattedNumber.length > 9
                                ? "text-[28px] sm:text-[34px]"
                                : resolved.formattedNumber.length > 6
                                  ? "text-[34px] sm:text-[42px]"
                                  : "text-4xl sm:text-5xl"
                            }`}
                          >
                            {resolved.formattedNumber}
                          </span>
                          <span className="text-[13px] sm:text-sm font-semibold text-brand-slate-light tracking-wide">
                            {resolved.currencyCode}
                          </span>
                        </div>
                        <span className="text-brand-slate-light text-xs sm:text-sm mt-1">
                          {cycle === "monthly" ? t("perMonth") : t("perYear")}
                        </span>
                      </>
                    ) : (
                      // Translation fallback (USD numeric) — used during the
                      // brief window before the API responds or if it fails.
                      <div className="flex items-baseline gap-1 whitespace-nowrap">
                        <span className="text-lg text-brand-slate-light font-medium">$</span>
                        <span className="text-4xl sm:text-5xl font-bold bg-gradient-to-b from-white to-brand-slate-light bg-clip-text text-transparent tabular-nums">
                          {fallbackPrice}
                        </span>
                        <span className="text-brand-slate-light text-sm">{t("perMonth")}</span>
                      </div>
                    )}
                  </div>

                  {/* Yearly billing hint */}
                  <div className="mb-5 min-h-[1rem]">
                    {!isCustom && cycle === "yearly" && (
                      <p className="text-[11px] text-brand-slate-light/80">
                        {t("geo.billedYearly")}
                      </p>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mb-6" />

                  {/* Features */}
                  <ul className="space-y-3 mb-8 flex-1">
                    {features.map((feature) => (
                      <li key={feature} className="flex gap-3 items-start">
                        <div
                          className={`shrink-0 w-5 h-5 rounded-md flex items-center justify-center mt-0.5 ${
                            plan.popular ? "bg-brand-neon/15" : "bg-white/5"
                          }`}
                        >
                          <Check
                            className={`w-3 h-3 ${plan.popular ? "text-brand-neon" : "text-brand-slate-light"}`}
                          />
                        </div>
                        <span className="text-brand-slate-light text-sm leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href={
                      isCustom
                        ? "#contact"
                        : "https://celaest-dashboard.vercel.app/?mode=signup"
                    }
                    className={`w-full py-3.5 rounded-xl text-center font-semibold text-sm transition-all duration-300 block ${
                      plan.popular
                        ? "bg-brand-neon text-brand-dark hover:shadow-lg hover:shadow-brand-neon/30 hover:brightness-110"
                        : "bg-white/5 text-brand-soft border border-white/10 hover:bg-white/10 hover:border-white/20"
                    }`}
                  >
                    {isCustom ? t("contactSales") : t("getStarted")}
                  </a>
                </div>
              </SectionReveal>
            );
          })}
        </div>

        {/* Guarantee */}
        <SectionReveal
          as="p"
          delay={300}
          className="text-center text-brand-slate-light text-xs mt-10 sm:mt-14 max-w-lg mx-auto"
        >
          {t("guarantee")}
        </SectionReveal>
      </div>
    </section>
  );
}
