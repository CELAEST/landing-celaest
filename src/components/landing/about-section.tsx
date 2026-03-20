"use client";

import { useTranslations } from "next-intl";
import { Store, ShieldCheck, Zap, Globe, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface Feature {
  icon: LucideIcon;
  titleKey: string;
  descriptionKey: string;
}

const FEATURES: Feature[] = [
  { icon: Store, titleKey: "vendors", descriptionKey: "vendors" },
  { icon: ShieldCheck, titleKey: "quality", descriptionKey: "quality" },
  { icon: Zap, titleKey: "instant", descriptionKey: "instant" },
  { icon: Globe, titleKey: "global", descriptionKey: "global" },
];

export function AboutSection() {
  const t = useTranslations("about");

  return (
    <section
      id="marketplace"
      className="py-24 sm:py-32 bg-[#020202] relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-neon/15 to-transparent" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-neon/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-brand-neon-blue/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 sm:mb-20 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight">
            {t("title1")}{" "}
            <span className="bg-gradient-to-r from-brand-neon to-brand-neon-blue bg-clip-text text-transparent">
              {t("title2")}
            </span>
          </h2>
          <p className="text-brand-slate-light text-base sm:text-lg leading-relaxed">
            {t("description")}
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.titleKey}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="group p-7 sm:p-8 rounded-2xl bg-[#080808] border border-white/5 hover:border-brand-neon/20 transition-all duration-400 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-neon/5 relative overflow-hidden"
              >
                {/* Subtle hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-brand-neon/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-brand-neon/[0.07] border border-brand-neon/10 flex items-center justify-center mb-5 group-hover:bg-brand-neon group-hover:border-brand-neon group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-5 h-5 text-brand-neon group-hover:text-brand-dark transition-colors" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-brand-neon transition-colors duration-300">
                    {t(`features.${feature.titleKey}.title`)}
                  </h3>
                  <p className="text-brand-slate-light text-sm leading-relaxed">
                    {t(`features.${feature.descriptionKey}.description`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
