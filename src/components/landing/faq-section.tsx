"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/section-header";
import { FAQAccordion, type FAQItem } from "./faq/faq-accordion";

export function FAQSection() {
  const t = useTranslations("faq");
  const faqs = t.raw("questions") as FAQItem[];

  return (
    <section
      id="faq"
      className="pt-14 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 bg-brand-dark relative overflow-hidden"
    >
      {/* Section Demarcation Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none z-20" />

      {/* Subtle atmospheric ambient glow centered safely away from seam */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-purple-600/[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <SectionHeader title1={t("title1")} title2={t("title2")} subtitle={t("subtitle")} />

        {/* FAQ Accordion */}
        <FAQAccordion items={faqs} />
      </div>
    </section>
  );
}
