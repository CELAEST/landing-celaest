"use client";

import { useTranslations } from "next-intl";
import { ConstellationBackground } from "@/components/ui/constellation-background";
import { SectionReveal } from "@/components/ui/section-reveal";
import { PlatformCard } from "./platform-card";

interface PlatformCardConfig {
  id: "management" | "workflow" | "ecosystem";
  image: string;
  icon: "layers" | "zap" | "shield";
}

const PLATFORM_CARDS: PlatformCardConfig[] = [
  {
    id: "management",
    image: "/images/platform/management.webp",
    icon: "layers",
  },
  {
    id: "workflow",
    image: "/images/platform/workflow.webp",
    icon: "zap",
  },
  {
    id: "ecosystem",
    image: "/images/platform/ecosystem.webp",
    icon: "shield",
  },
];

export function PlatformSection() {
  const t = useTranslations("platform");

  return (
    <section id="platform" className="py-20 sm:py-28 bg-brand-dark relative overflow-hidden">
      {/* Drifting constellation (subtle ambience) */}
      <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(ellipse_75%_80%_at_50%_50%,#000_20%,transparent_90%)]">
        <ConstellationBackground nodeCount={55} nodeAlpha={0.3} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-14 sm:mb-20 max-w-7xl mx-auto w-full text-left">
          <SectionReveal
            as="h2"
            delay={80}
            className="text-3xl sm:text-4xl md:text-[46px] lg:text-[50px] tracking-tight leading-[1.22] block"
          >
            <span className="text-white font-semibold">{t("title")}. </span>
            <span className="text-brand-slate-light font-normal">{t("subtitle")}</span>
          </SectionReveal>
        </div>

        {/* 3D Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-sm sm:max-w-md md:max-w-7xl mx-auto items-stretch">
          {PLATFORM_CARDS.map((card, index) => (
            <PlatformCard
              key={card.id}
              id={card.id}
              title={t(`cards.${card.id}.title`)}
              description={t(`cards.${card.id}.description`)}
              image={card.image}
              icon={card.icon}
              exploreLabel={t("explore")}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
