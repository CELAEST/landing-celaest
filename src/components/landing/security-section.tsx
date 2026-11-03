"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { ConstellationBackground } from "@/components/ui/constellation-background";
import { SectionReveal } from "@/components/ui/section-reveal";
import {
  UnifiedParticleMasterStage,
  type ActiveSecurityPillar,
} from "./security/unified-particle-master-stage";
import "./security/security-stage.css";

export function SecuritySection() {
  const t = useTranslations("security");
  const [activePillar, setActivePillar] = useState<ActiveSecurityPillar>("shield");

  const pillars = [
    {
      id: "shield" as const,
      number: "01",
      title: t("features.verified.title"),
      description: t("features.verified.description"),
    },
    {
      id: "lock" as const,
      number: "02",
      title: t("features.encryption.title"),
      description: t("features.encryption.description"),
    },
    {
      id: "globe" as const,
      number: "03",
      title: t("features.infrastructure.title"),
      description: t("features.infrastructure.description"),
    },
  ];

  return (
    <section id="security" className="pt-12 pb-0 bg-brand-dark relative overflow-hidden">
      {/* Atmospheric constellation background */}
      <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_90%)]">
        <ConstellationBackground nodeCount={32} nodeAlpha={0.16} />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-purple-600/[0.03] blur-[140px] rounded-full pointer-events-none" />

      {/* Symmetrical container matching PlatformSection max-w-[85rem] */}
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header - Exact copywriting preserved */}
        <div className="text-center mb-12 w-full max-w-3xl mx-auto">
          <SectionReveal as="h2" delay={60} className="landing-section-title text-center mb-4">
            <span className="text-white font-semibold">{t("title1")} </span>
            <span className="text-brand-slate-light font-medium">{t("title2")}</span>
          </SectionReveal>
          {t("description") && (
            <SectionReveal delay={100}>
              <p className="text-brand-slate-light text-base sm:text-lg md:text-xl font-normal tracking-tight leading-relaxed">
                {t("description")}
              </p>
            </SectionReveal>
          )}
        </div>

        {/* Master Asymmetric Stage Layout (Zero cards over cards) */}
        <div className="sec-master-layout">
          {/* Left Column: 3 Pillars with Clean Typography */}
          <div className="sec-pillar-list">
            {pillars.map((p) => {
              const isActive = activePillar === p.id;
              return (
                <div
                  key={p.id}
                  className={`sec-pillar-item ${isActive ? "is-active" : ""}`}
                  onMouseEnter={() => setActivePillar(p.id)}
                  onClick={() => setActivePillar(p.id)}
                >
                  <div className="sec-pillar-indicator" />
                  <div className="sec-pillar-number">{p.number} —</div>
                  <h3 className="sec-pillar-title">{p.title}</h3>
                  <p className="sec-pillar-desc">{p.description}</p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Heroic Unified 3D Particle Canvas */}
          <div className="sec-master-stage-wrap">
            <div className="sec-particle-canvas-container">
              <UnifiedParticleMasterStage activePillar={activePillar} />
            </div>

            {/* Bottom Subtle Explore Link */}
            <div className="sec-stage-foot">
              <a href="#pricing" className="sec-link-explore">
                <span>{t("explore")}</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
