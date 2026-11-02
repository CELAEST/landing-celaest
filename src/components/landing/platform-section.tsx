"use client";

import { useTranslations } from "next-intl";
import { ConstellationBackground } from "@/components/ui/constellation-background";
import { SectionReveal } from "@/components/ui/section-reveal";
import { PlatformColumn, MembersWidget, PipelineWidget, EcosystemWidget } from "./platform";

export function PlatformSection() {
  const t = useTranslations("platform");

  return (
    <section id="platform" className="py-24 sm:py-32 bg-brand-dark relative overflow-hidden">
      {/* Drifting constellation & subtle atmospheric purple glow */}
      <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_90%)]">
        <ConstellationBackground nodeCount={40} nodeAlpha={0.18} />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-purple-600/[0.04] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl text-left">
          {/* Eyebrow Badge */}
          <SectionReveal delay={60} className="flex items-center gap-3 mb-4 sm:mb-5">
            <span className="w-8 h-[2px] bg-[#8b5cf6]" />
            <span className="text-xs font-mono font-semibold tracking-[0.25em] text-[#a78bfa] uppercase">
              {t("badge")}
            </span>
          </SectionReveal>

          {/* Master H2 Heading */}
          <SectionReveal
            as="h2"
            delay={100}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-medium tracking-tight text-white leading-[1.05] block"
          >
            <span className="block">{t("title1")}</span>
            <span className="block text-white/95">{t("title2")}</span>
          </SectionReveal>

          {/* Subtitle */}
          <SectionReveal delay={140}>
            <p className="text-neutral-400 text-sm sm:text-base md:text-lg max-w-2xl font-normal leading-relaxed mt-5">
              {t("subtitle")}
            </p>
          </SectionReveal>
        </div>

        {/* 3 Capabilities Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7 xl:gap-8 mt-14 sm:mt-20 items-start">
          <PlatformColumn
            number={t("columns.management.number")}
            titleLine1={t("columns.management.titleLine1")}
            titleLine2={t("columns.management.titleLine2")}
            description={t("columns.management.description")}
            exploreLabel={t("explore")}
            widget={<MembersWidget />}
          />
          <PlatformColumn
            number={t("columns.workflow.number")}
            titleLine1={t("columns.workflow.titleLine1")}
            titleLine2={t("columns.workflow.titleLine2")}
            description={t("columns.workflow.description")}
            exploreLabel={t("explore")}
            widget={<PipelineWidget />}
          />
          <PlatformColumn
            number={t("columns.ecosystem.number")}
            titleLine1={t("columns.ecosystem.titleLine1")}
            titleLine2={t("columns.ecosystem.titleLine2")}
            description={t("columns.ecosystem.description")}
            exploreLabel={t("explore")}
            widget={<EcosystemWidget />}
          />
        </div>
      </div>
    </section>
  );
}
