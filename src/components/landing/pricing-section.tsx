"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Check, ArrowRight } from "lucide-react";
import { SectionReveal } from "@/components/ui/section-reveal";
import { ConstellationBackground } from "@/components/ui/constellation-background";
import { useGeoPricing } from "@/hooks/useGeoPricing";
import "./pricing/pricing-section.css";

interface Plan {
  key: "starter" | "professional" | "enterprise";
  number: string;
  backendCode: "pro" | "enterprise" | null;
  popular: boolean;
}

const PLANS: Plan[] = [
  { key: "starter", number: "01", backendCode: "pro", popular: false },
  { key: "professional", number: "02", backendCode: "enterprise", popular: true },
  { key: "enterprise", number: "03", backendCode: null, popular: false },
];

type BillingCycle = "monthly" | "yearly";

export function PricingSection() {
  const t = useTranslations("pricing");
  const locale = useLocale();
  const [cycle, setCycle] = useState<BillingCycle>("monthly");

  const { pricing, currency, isForcedUSD, toggleCurrencyOverride, getPlanPrice } =
    useGeoPricing(locale);

  // Compute yearly-vs-monthly savings
  const yearlySavingsPercent = useMemo(() => {
    const ref = pricing?.plans?.find(
      (p) => p.plan_code.toLowerCase() === "pro" || p.plan_code.toLowerCase() === "enterprise",
    );
    if (!ref) return 17;
    const monthlyAnnualized = ref.local_price_monthly * 12;
    if (monthlyAnnualized <= 0 || ref.local_price_yearly <= 0) return 17;
    const saved = monthlyAnnualized - ref.local_price_yearly;
    return Math.max(0, Math.round((saved / monthlyAnnualized) * 100));
  }, [pricing]);

  // Whether to show the geo currency switcher
  const showGeoBadge = Boolean(pricing && (pricing.currency.code !== "USD" || isForcedUSD));

  return (
    <section
      id="pricing"
      className="py-14 sm:py-16 lg:py-20 bg-brand-dark relative overflow-hidden"
    >
      {/* Top Section Demarcation Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none z-20" />

      {/* Atmospheric constellation background & subtle glow */}
      <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_90%)]">
        <ConstellationBackground nodeCount={36} nodeAlpha={0.16} />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-purple-600/[0.04] blur-[120px] rounded-full pointer-events-none" />

      {/* Symmetrical container matching PlatformSection max-w-[85rem] */}
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Style 1 Editorial Puro Switchers */}
        <header className="pricing-header-layout">
          <div className="pricing-header-left">
            <SectionReveal as="h2" delay={60} className="pricing-title">
              <span>{t("title1")} </span>
              <em>{t("title2")}</em>
            </SectionReveal>
            <SectionReveal delay={100}>
              <p className="pricing-subtitle">{t("subtitle")}</p>
            </SectionReveal>
          </div>

          {/* Style 1: Editorial Puro (Zero-Box Typography) */}
          <SectionReveal delay={120} className="sw-editorial-wrap">
            {/* Billing Cycle */}
            <div className="sw-editorial-group" role="tablist" aria-label="Billing cycle">
              <span className="sw-editorial-label">{t("periodLabel")}</span>
              <button
                role="tab"
                aria-selected={cycle === "monthly"}
                className={`sw-editorial-btn ${cycle === "monthly" ? "active" : ""}`}
                onClick={() => setCycle("monthly")}
              >
                {t("billing.monthly")}
              </button>
              <button
                role="tab"
                aria-selected={cycle === "yearly"}
                className={`sw-editorial-btn ${cycle === "yearly" ? "active" : ""}`}
                onClick={() => setCycle("yearly")}
              >
                {t("billing.yearly")}
                {yearlySavingsPercent > 0 && (
                  <span className="sw-editorial-tag">-{yearlySavingsPercent}%</span>
                )}
              </button>
            </div>

            {/* Currency Switcher */}
            {showGeoBadge && pricing && (
              <>
                <div className="sw-editorial-divider" />
                <div className="sw-editorial-group" role="group" aria-label="Currency selection">
                  <span className="sw-editorial-label">{t("currencyLabel")}</span>
                  <button
                    className={`sw-editorial-btn ${!isForcedUSD ? "active" : ""}`}
                    onClick={() => {
                      if (isForcedUSD) toggleCurrencyOverride();
                    }}
                  >
                    {pricing.currency.code}
                  </button>
                  <button
                    className={`sw-editorial-btn ${isForcedUSD ? "active" : ""}`}
                    onClick={() => {
                      if (!isForcedUSD) toggleCurrencyOverride();
                    }}
                  >
                    USD
                  </button>
                </div>
              </>
            )}
          </SectionReveal>
        </header>

        {/* 3-Column Triptych Grid */}
        <div className="pricing-editorial-grid">
          {PLANS.map((plan, idx) => {
            const features = t.raw(`plans.${plan.key}.features`) as string[];
            const fallbackPrice = t(`plans.${plan.key}.price`);
            const isCustom = plan.backendCode === null;

            const resolved =
              isCustom || !plan.backendCode ? null : getPlanPrice(plan.backendCode, cycle);

            return (
              <SectionReveal key={plan.key} delay={idx * 100} className="pricing-editorial-col">
                {/* Plan 02: Línea Neón Superior Elegida */}
                {plan.popular && <div className="popular-top-neon" />}

                <div>
                  {/* Number Hairline Rule + MÁS POPULAR badge */}
                  <div className="pricing-number-wrap">
                    <strong>{plan.number}</strong>
                    <span className="rule" />
                    {plan.popular && <span className="popular-label-neon">{t("mostPopular")}</span>}
                  </div>

                  {/* Plan Name & Tagline */}
                  <h3 className="pricing-plan-title">{t(`plans.${plan.key}.name`)}</h3>
                  <p className="pricing-plan-desc">{t(`plans.${plan.key}.description`)}</p>

                  {/* Clean Price Block */}
                  <div className="pricing-price-box">
                    <div className="pricing-price-num">
                      {isCustom ? (
                        fallbackPrice
                      ) : resolved ? (
                        <>
                          {resolved.symbolPos === "before" &&
                            resolved.currencySymbol &&
                            !(
                              resolved.currencySymbol === "$" && resolved.currencyCode !== "USD"
                            ) && (
                              <span className="pricing-price-symbol">
                                {resolved.currencySymbol}
                              </span>
                            )}
                          <span>{resolved.formattedNumber}</span>
                          <span className="pricing-price-currency">{resolved.currencyCode}</span>
                        </>
                      ) : (
                        <>
                          <span className="pricing-price-symbol">$</span>
                          <span>{fallbackPrice}</span>
                          <span className="pricing-price-currency">USD</span>
                        </>
                      )}
                    </div>
                    <span className="pricing-price-cycle">
                      {isCustom
                        ? t("geo.billedYearly")
                        : `${cycle === "monthly" ? t("perMonth") : t("perYear")}${
                            cycle === "yearly" ? ` (${t("geo.billedYearly")})` : ""
                          }`}
                    </span>
                  </div>

                  {/* Feature Rows */}
                  <div className="pricing-feature-list">
                    {features.map((feature, fIdx) => (
                      <div key={fIdx} className="pricing-feature-row">
                        <Check className="pricing-check-icon" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Base Editorial Link */}
                <a
                  href={
                    isCustom
                      ? "#contact"
                      : `https://celaest-dashboard.vercel.app/?mode=signup&plan=${plan.backendCode}&billing_cycle=${cycle}`
                  }
                  className="pricing-feature-link group/link"
                >
                  <span>{isCustom ? t("contactSales") : t("getStarted")}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" />
                </a>
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
