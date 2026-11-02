"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function ClosingCTASection() {
  const t = useTranslations("faq.cta");

  return (
    <section className="py-14 sm:py-16 lg:py-20 bg-brand-dark text-center flex flex-col items-center justify-center relative overflow-hidden">
      {/* Section Demarcation Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none z-20" />

      {/* Subtle atmospheric ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-purple-600/[0.03] blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center"
      >
        {/* Main Headline */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white leading-[1.08]">
          <span className="block">{t("titleLine1")}</span>
          <span className="block">{t("titleLine2")}</span>
        </h2>

        {/* Action Pills */}
        <div className="flex flex-row items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10">
          {/* Primary Pill: White solid */}
          <a
            href="#pricing"
            className="inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white text-zinc-950 font-medium text-sm sm:text-base shadow-sm hover:bg-zinc-100 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            {t("getStarted")}
          </a>

          {/* Secondary Pill: Dark sleek pill */}
          <a
            href="mailto:support@celaest.com"
            className="inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#18181b] hover:bg-[#27272a] text-white border border-white/10 font-medium text-sm sm:text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            {t("contactSales")}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
