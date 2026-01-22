"use client";

import { useTranslations } from "next-intl";
import { Check, Star } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Plan {
  key: "starter" | "professional" | "enterprise";
  popular: boolean;
}

const PLANS: Plan[] = [
  { key: "starter", popular: false },
  { key: "professional", popular: true },
  { key: "enterprise", popular: false },
];

export function PricingSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const t = useTranslations("pricing");

  return (
    <section
      ref={ref}
      id="pricing"
      className="py-24 bg-brand-deep relative overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-mint/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-mint/5 rounded-full blur-3xl" />

      <div className="relative section-container">
        {/* Section Header */}
        <div
          className={cn(
            "text-center mb-16 scroll-reveal",
            isVisible && "is-visible",
          )}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-brand-ice mb-6">
            {t("title1")}
            <br />
            <span className="gradient-text">{t("title2")}</span>
          </h2>
          <p className="text-xl text-brand-soft max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PLANS.map((plan, index) => {
            const price = t(`plans.${plan.key}.price`);
            const features = t.raw(`plans.${plan.key}.features`) as string[];

            return (
              <article
                key={plan.key}
                className={cn(
                  "relative rounded-2xl p-8 transition-all duration-300 scroll-reveal-scale",
                  isVisible && "is-visible",
                  plan.popular
                    ? "glass-effect border-2 border-brand-mint shadow-2xl shadow-brand-mint/20 scale-105 md:scale-110"
                    : "bg-brand-slate/30 backdrop-blur-sm border border-brand-slate-medium/30 hover:border-brand-mint/30",
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Most Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="px-4 py-2 bg-gradient-mint text-white text-sm font-bold rounded-full flex items-center gap-2 shadow-lg shadow-brand-mint/30">
                      <Star className="w-4 h-4" fill="currentColor" />
                      {t("mostPopular")}
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8 pt-4">
                  <h3 className="text-2xl font-bold text-brand-ice mb-2">
                    {t(`plans.${plan.key}.name`)}
                  </h3>
                  <p className="text-brand-soft text-sm mb-6">
                    {t(`plans.${plan.key}.description`)}
                  </p>
                  <div className="flex items-baseline justify-center gap-2">
                    {price === "Custom" ? (
                      <span className="text-5xl font-bold text-brand-ice">
                        {price}
                      </span>
                    ) : (
                      <>
                        <span className="text-2xl text-brand-soft">$</span>
                        <span className="text-5xl font-bold text-brand-ice">
                          {price}
                        </span>
                        <span className="text-brand-soft">{t("perMonth")}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-8">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        className={cn(
                          "w-5 h-5 flex-shrink-0 mt-0.5",
                          plan.popular
                            ? "text-brand-mint"
                            : "text-brand-slate-light",
                        )}
                      />
                      <span className="text-brand-soft">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                {/* CTA Button */}
                {price === "Custom" ? (
                  <Button
                    className={cn(
                      "w-full",
                      plan.popular
                        ? ""
                        : "bg-brand-ice text-brand-deep hover:bg-brand-soft hover:shadow-none hover:scale-100",
                    )}
                    size="lg"
                  >
                    {t("contactSales")}
                  </Button>
                ) : (
                  <Button
                    className={cn(
                      "w-full",
                      plan.popular
                        ? ""
                        : "bg-brand-ice text-brand-deep hover:bg-brand-soft hover:shadow-none hover:scale-100",
                    )}
                    size="lg"
                    asChild
                  >
                    <a href="https://celaest-dashboard.vercel.app/?mode=signup">
                      {t("getStarted")}
                    </a>
                  </Button>
                )}
              </article>
            );
          })}
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <p className="text-brand-soft">{t("guarantee")}</p>
        </div>
      </div>
    </section>
  );
}
