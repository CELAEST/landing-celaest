"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Check, ArrowRight, Globe } from "lucide-react";
import { SectionReveal } from "@/components/ui/section-reveal";
import { ConstellationBackground } from "@/components/ui/constellation-background";
import { useGeoPricing } from "@/hooks/useGeoPricing";
import { DASHBOARD_URL, SUPPORT_EMAIL } from "@/lib/constants";
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
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

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

  return (
    <section id="pricing" className="pt-12 pb-0 bg-brand-dark relative overflow-hidden">
      {/* Atmospheric constellation background & subtle glow */}
      <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_90%)]">
        <ConstellationBackground nodeCount={36} nodeAlpha={0.16} />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-purple-600/[0.04] blur-[120px] rounded-full pointer-events-none" />

      {/* Symmetrical container matching PlatformSection max-w-[85rem] */}
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Style 1 Editorial Puro Switchers */}
        <header className="pricing-header-layout">
          <div className="pricing-header-center">
            <SectionReveal as="h2" delay={60} className="pricing-title">
              <span>{t("title1")} </span>
              <em>{t("title2")}</em>
            </SectionReveal>
            <SectionReveal delay={100}>
              <p className="pricing-subtitle">{t("subtitle")}</p>
            </SectionReveal>
          </div>

          {/* Subheader Controls Bar: Joined in the Center */}
          <SectionReveal delay={120} className="pricing-controls-bar">
            {/* Geo Country Badge */}
            <span className="sw-editorial-geo-badge">
              <Globe className="w-3.5 h-3.5 text-purple-400 shrink-0" aria-hidden="true" />
              <span className="sw-editorial-geo-text" suppressHydrationWarning>
                {t("geo.showingIn", {
                  currency: currency.code,
                  country:
                    pricing?.country_name || (locale === "es" ? "Colombia" : "United States"),
                })}
              </span>
            </span>

            <div className="sw-editorial-divider" />

            <div className="pricing-switches-group">
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
              {(pricing?.currency?.code !== "USD" || isForcedUSD) && (
                <>
                  <div className="sw-editorial-divider" />
                  <div className="sw-editorial-group" role="group" aria-label="Currency selection">
                    <span className="sw-editorial-label">{t("currencyLabel")}</span>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={!isForcedUSD}
                      className={`sw-editorial-btn ${!isForcedUSD ? "active" : ""}`}
                      onClick={() => {
                        if (isForcedUSD) toggleCurrencyOverride();
                      }}
                    >
                      {pricing?.currency?.code ?? (locale === "es" ? "COP" : "USD")}
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isForcedUSD}
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
            </div>
          </SectionReveal>
        </header>

        {/* 3-Column Triptych Grid */}
        <div className="pricing-editorial-grid" onMouseLeave={() => setHoveredIdx(null)}>
          {PLANS.map((plan, idx) => {
            const features = t.raw(`plans.${plan.key}.features`) as string[];
            const fallbackPrice = t(`plans.${plan.key}.price`);
            const isCustom = plan.backendCode === null;

            const resolved =
              isCustom || !plan.backendCode ? null : getPlanPrice(plan.backendCode, cycle);

            const isNeonActive = hoveredIdx !== null ? hoveredIdx === idx : Boolean(plan.popular);

            return (
              <SectionReveal
                key={plan.key}
                delay={idx * 100}
                className={`pricing-editorial-col ${isNeonActive ? "is-neon-active" : ""}`}
                data-popular={plan.popular ? "true" : "false"}
                onMouseEnter={() => setHoveredIdx(idx)}
              >
                {/* Dynamic Neon Light Bar */}
                <div className={`card-top-neon ${isNeonActive ? "active" : ""}`} />

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
                    <div className="pricing-price-num" suppressHydrationWarning>
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
                      ? `mailto:${SUPPORT_EMAIL}?subject=Consulta%20Plan%20Enterprise`
                      : `${DASHBOARD_URL}/?mode=signup&plan=${plan.backendCode}&billing_cycle=${cycle}`
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
