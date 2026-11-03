"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { ConstellationBackground } from "@/components/ui/constellation-background";
import "./architecture/architecture-icons.css";
import "./architecture/architecture-editorial.css";
import { ArchitectureHeader } from "./architecture/architecture-header";
import { ArchitecturePillarsGrid } from "./architecture/architecture-pillars-grid";
import { ArchitectureImpact } from "./architecture/architecture-impact";

const PILLAR_KEYS = ["governance", "mesh", "flows", "marketplace"] as const;

export function ArchitectureSection() {
  const t = useTranslations("architecture");

  const pillars = PILLAR_KEYS.map((key) => ({
    key,
    number: t(`pillars.${key}.number`),
    title: t(`pillars.${key}.title`),
    desc: t(`pillars.${key}.desc`),
  }));

  return (
    <section id="architecture" className="eco-section-wrap">
      {/* Drifting constellation & subtle atmospheric purple glow */}
      <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_90%)]">
        <ConstellationBackground nodeCount={36} nodeAlpha={0.16} />
      </div>
      <div className="eco-section-glow" />

      <div className="eco-container">
        <ArchitectureHeader
          titleLead={t("titleLead")}
          titleAccent={t("titleAccent")}
          subtitle={t("subtitle")}
        />

        <ArchitecturePillarsGrid pillars={pillars} />

        <ArchitectureImpact
          badge={t("impact.badge")}
          leadTitle={t("impact.leadTitle")}
          leadAccent={t("impact.leadAccent")}
          debt={{
            value: t("impact.metrics.debt.value"),
            label: t("impact.metrics.debt.label"),
            desc: t("impact.metrics.debt.desc"),
          }}
          efficiency={{
            value: t("impact.metrics.efficiency.value"),
            label: t("impact.metrics.efficiency.label"),
            desc: t("impact.metrics.efficiency.desc"),
          }}
          scalability={{
            value: t("impact.metrics.scalability.value"),
            label: t("impact.metrics.scalability.label"),
            desc: t("impact.metrics.scalability.desc"),
          }}
        />
      </div>
    </section>
  );
}
