"use client";

import React from "react";
import { useTranslations } from "next-intl";
import "./architecture/architecture-icons.css";
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
    <section
      id="architecture"
      className="bg-[#000000] text-[#f7f7f8] relative overflow-hidden py-14 sm:py-16 lg:py-20"
    >
      {/* Section Demarcation Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none z-20" />

      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
