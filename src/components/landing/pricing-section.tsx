"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Check, Globe } from "lucide-react";
import { SectionReveal } from "@/components/ui/section-reveal";
import { useGeoPricing } from "@/hooks/useGeoPricing";

interface Plan {
  key: "starter" | "professional" | "enterprise";
  popular: boolean;
}

const PLANS: Plan[] = [
  { key: "starter", popular: false },
  { key: "professional", popular: true },
  { key: "enterprise", popular: false },
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
        p.plan_code.toLowerCase() === "professional" ||
        p.plan_code.toLowerCase() === "starter",
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

        {/* Controls: billing-cycle toggle + geo badge / USD switcher */}
        <SectionReveal className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-10 sm:mb-14">
          {/* Cycle toggle */}
          <div
            role="tablist"
            aria-label={t("billing.monthly") + " / " + t("billing.yearly")}
            className="inline-flex items-center rounded-full p-1 border border-white/10 bg-white/[0.03] backdrop-blur-sm"
          >
            <button
              role="tab"
              aria-selected={cycle === "monthly"}
              onClick={() => setCycle("monthly")}
              className={`relative px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold rounded-full transition-colors ${
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
              className={`relative px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold rounded-full transition-colors inline-flex items-center gap-2 ${
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

          {/* Geo badge + USD toggle (only renders when geo-pricing applies) */}
          {showGeoBadge && pricing && (
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm text-xs sm:text-[13px]">
              <Globe className="w-3.5 h-3.5 text-brand-neon shrink-0" aria-hidden />
              <span className="text-brand-slate-light">
                {t("geo.showingIn", {
                  currency: currency.code,
                  country: pricing.country_name,
                })}
              </span>
              <button
                onClick={toggleCurrencyOverride}
                className="text-white/90 hover:text-brand-neon font-semibold transition-colors underline-offset-2 hover:underline"
                aria-pressed={isForcedUSD}
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
            const isCustom = fallbackPrice === "Custom";

            // Server-resolved price for this plan in the current cycle.
            // Falls back to translation default while loading or on error.
            const resolved = isCustom ? null : getPlanPrice(plan.key, cycle);

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

                  {/* Price */}
                  <div className="mb-2 flex items-baseline min-h-[3.5rem]">
                    {isCustom ? (
                      <span className="text-4xl sm:text-5xl font-bold bg-gradient-to-b from-white to-brand-slate-light bg-clip-text text-transparent">
                        {fallbackPrice}
                      </span>
                    ) : resolved ? (
                      <>
                        <span className="text-4xl sm:text-5xl font-bold bg-gradient-to-b from-white to-brand-slate-light bg-clip-text text-transparent tabular-nums">
                          {resolved.formatted}
                        </span>
                        <span className="text-brand-slate-light text-sm ml-1.5">
                          {cycle === "monthly" ? t("perMonth") : t("perYear")}
                        </span>
                      </>
                    ) : (
                      // Translation fallback (USD numeric) — used during the
                      // brief window before the API responds or if it fails.
                      <>
                        <span className="text-lg text-brand-slate-light font-medium mr-0.5">$</span>
                        <span className="text-4xl sm:text-5xl font-bold bg-gradient-to-b from-white to-brand-slate-light bg-clip-text text-transparent tabular-nums">
                          {fallbackPrice}
                        </span>
                        <span className="text-brand-slate-light text-sm ml-1">{t("perMonth")}</span>
                      </>
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
