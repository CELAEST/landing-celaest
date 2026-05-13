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
    <section id="pricing" className="py-16 sm:py-24 bg-black relative overflow-hidden">
      {/* High-Performance Animated Background (No Video) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Vercel-style subtle grid background starting behind cards */}
        <div
          className="absolute inset-x-0 top-[10%] bottom-0 z-0 opacity-[0.15] mix-blend-screen"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            maskImage:
              "radial-gradient(ellipse 60% 80% at 50% 50%, black 10%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 80% at 50% 50%, black 10%, transparent 100%)",
          }}
        />

        {/* Animated Aurora / Plasma Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.3, 0.15],
            x: ["-5%", "5%", "-5%"],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[10%] w-[600px] h-[600px] bg-brand-neon/30 rounded-full blur-[140px] mix-blend-screen"
        />
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.1, 0.25, 0.1],
            x: ["5%", "-5%", "5%"],
            y: ["5%", "-5%", "5%"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-[10%] right-[10%] w-[700px] h-[700px] bg-brand-neon-blue/20 rounded-full blur-[160px] mix-blend-screen"
        />
        <motion.div
           animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-500/15 rounded-full blur-[150px] mix-blend-screen"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header - Stacked layout matching the upper sections and aligned with cards */}
        <div className="max-w-5xl mx-auto w-full mb-14 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-2 text-left"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] tracking-tight leading-[1.1] text-white font-semibold flex flex-col sm:inline-block">
              <span>{t("title1")} </span>
              <span className="text-brand-slate-light font-medium">{t("title2")}</span>
            </h2>
            <p className="text-brand-slate-light text-base sm:text-lg md:text-xl lg:text-2xl font-medium tracking-tight leading-[1.4] max-w-4xl mt-4">
              {t("subtitle")}
            </p>
          </motion.div>
        </div>

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
                whileHover={{ y: -8 }}
                className="relative group cursor-pointer"
              >
                {/* Glow ring for popular */}
                {plan.popular && (
                  <div className="absolute -inset-[1px] bg-gradient-to-b from-brand-neon/50 via-brand-neon-blue/30 to-brand-neon/50 rounded-[25px] blur-[2px] transition-all duration-500 group-hover:blur-[6px] group-hover:opacity-80 opacity-60" />
                )}

                <div
                  className={`relative h-full rounded-3xl p-7 sm:p-8 flex flex-col transition-all duration-500 ${
                    plan.popular
                      ? "bg-brand-gray border border-brand-neon/30 shadow-[0_0_30px_rgba(34,211,238,0.05)] group-hover:shadow-[0_0_50px_rgba(34,211,238,0.2)] group-hover:border-brand-neon/60 group-hover:bg-brand-surface-alt"
                      : "bg-brand-surface-alt border border-white/5 shadow-xl shadow-black/50 group-hover:bg-brand-surface-alt group-hover:border-white/20 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.04)]"
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
