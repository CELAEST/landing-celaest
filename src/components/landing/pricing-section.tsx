"use client";

import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

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
  const t = useTranslations("pricing");

  return (
    <section id="pricing" className="py-24 sm:py-32 bg-[#030303] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-neon/20 to-transparent" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-brand-neon-blue/[0.04] rounded-full blur-[150px] translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 sm:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight">
            {t("title1")}{" "}
            <span className="bg-gradient-to-r from-brand-neon to-brand-neon-blue bg-clip-text text-transparent">
              {t("title2")}
            </span>
          </h2>
          <p className="text-brand-slate-light text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 max-w-5xl mx-auto items-stretch">
          {PLANS.map((plan, idx) => {
            const price = t(`plans.${plan.key}.price`);
            const features = t.raw(`plans.${plan.key}.features`) as string[];

            return (
              <motion.div
                key={plan.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative group"
              >
                {/* Glow ring for popular */}
                {plan.popular && (
                  <div className="absolute -inset-[1px] bg-gradient-to-b from-brand-neon/50 via-brand-neon-blue/30 to-brand-neon/50 rounded-[25px] blur-[2px]" />
                )}

                <div
                  className={`relative h-full rounded-3xl p-7 sm:p-8 flex flex-col transition-all duration-500 ${
                    plan.popular
                      ? "bg-[#0a0a0a] border border-brand-neon/30 shadow-xl shadow-brand-neon/5"
                      : "bg-[#080808] border border-white/5 hover:border-white/10 hover:shadow-lg hover:shadow-brand-neon/5"
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
                  <div className="mb-7 flex items-baseline">
                    {price === "Custom" ? (
                      <span className="text-4xl sm:text-5xl font-bold bg-gradient-to-b from-white to-brand-slate-light bg-clip-text text-transparent">
                        {price}
                      </span>
                    ) : (
                      <>
                        <span className="text-lg text-brand-slate-light font-medium mr-0.5">$</span>
                        <span className="text-4xl sm:text-5xl font-bold bg-gradient-to-b from-white to-brand-slate-light bg-clip-text text-transparent">
                          {price}
                        </span>
                        <span className="text-brand-slate-light text-sm ml-1">{t("perMonth")}</span>
                      </>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mb-6" />

                  {/* Features */}
                  <ul className="space-y-3 mb-8 flex-1">
                    {features.map((feature) => (
                      <li key={feature} className="flex gap-3 items-start">
                        <div className={`shrink-0 w-5 h-5 rounded-md flex items-center justify-center mt-0.5 ${
                          plan.popular ? 'bg-brand-neon/15' : 'bg-white/5'
                        }`}>
                          <Check className={`w-3 h-3 ${plan.popular ? 'text-brand-neon' : 'text-brand-slate-light'}`} />
                        </div>
                        <span className="text-brand-slate-light text-sm leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href={price === "Custom" ? "#contact" : "https://celaest-dashboard.vercel.app/?mode=signup"}
                    className={`w-full py-3.5 rounded-xl text-center font-semibold text-sm transition-all duration-300 block ${
                      plan.popular
                        ? "bg-brand-neon text-brand-dark hover:shadow-lg hover:shadow-brand-neon/30 hover:brightness-110"
                        : "bg-white/5 text-brand-soft border border-white/10 hover:bg-white/10 hover:border-white/20"
                    }`}
                  >
                    {price === "Custom" ? t("contactSales") : t("getStarted")}
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Guarantee */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center text-brand-slate-light text-xs mt-10 sm:mt-14 max-w-lg mx-auto"
        >
          {t("guarantee")}
        </motion.p>
      </div>
    </section>
  );
}
