"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ConstellationBackground } from "@/components/ui/constellation-background";
import { SectionReveal } from "@/components/ui/section-reveal";
import { MembersWidget, PipelineWidget, EcosystemWidget } from "./platform";
import "./platform/platform-previews.css";

export function PlatformSection() {
  const t = useTranslations("platform");

  return (
    <section id="platform" className="pt-12 pb-0 bg-brand-dark relative overflow-hidden">
      {/* Drifting constellation & subtle atmospheric purple glow */}
      <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_90%)]">
        <ConstellationBackground nodeCount={40} nodeAlpha={0.18} />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] [background:radial-gradient(ellipse_at_center,rgba(147,51,234,0.05)_0%,transparent_70%)] pointer-events-none" />

      {/* Symmetrical container matching ProductsSection max-w-[85rem] */}
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header - Ultra clean header without eyebrow */}
        <header className="capabilities-header">
          {/* Master Title */}
          <SectionReveal as="h2" delay={60} className="capabilities-title">
            <span className="block">{t("title1")}</span>
            <em>{t("title2")}</em>
          </SectionReveal>

          {/* Subtitle */}
          <SectionReveal delay={100}>
            <p className="capabilities-subtitle">{t("subtitle")}</p>
          </SectionReveal>
        </header>

        {/* 3 Columns Feature Grid - Exact replicar-diseno-web layout */}
        <div className="feature-grid" style={{ borderBottom: "1px solid #24242b" }}>
          {/* Column 01: Centralized Management */}
          <article className="feature-col">
            <div>
              <div className="feature-number">
                <strong>{t("columns.management.number")}</strong>
                <span />
              </div>
              <h3 className="feature-heading">
                {t("columns.management.titleLine1")}
                <br />
                {t("columns.management.titleLine2")}
              </h3>
              <p className="feature-desc">{t("columns.management.description")}</p>
            </div>
            <div>
              <MembersWidget />
              <Link
                href="/solutions/ai-mesh"
                className="feature-link group/link"
                aria-label={`${t("explore")} ${t("columns.management.titleLine1")} ${t("columns.management.titleLine2")}`}
              >
                <span>{t("explore")}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" />
              </Link>
            </div>
          </article>

          {/* Column 02: Automation Pipeline */}
          <article className="feature-col">
            <div>
              <div className="feature-number">
                <strong>{t("columns.workflow.number")}</strong>
                <span />
              </div>
              <h3 className="feature-heading">
                {t("columns.workflow.titleLine1")}
                <br />
                {t("columns.workflow.titleLine2")}
              </h3>
              <p className="feature-desc">{t("columns.workflow.description")}</p>
            </div>
            <div>
              <PipelineWidget />
              <Link
                href="/solutions/automation"
                className="feature-link group/link"
                aria-label={`${t("explore")} ${t("columns.workflow.titleLine1")} ${t("columns.workflow.titleLine2")}`}
              >
                <span>{t("explore")}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" />
              </Link>
            </div>
          </article>

          {/* Column 03: Asset Ecosystem */}
          <article className="feature-col">
            <div>
              <div className="feature-number">
                <strong>{t("columns.ecosystem.number")}</strong>
                <span />
              </div>
              <h3 className="feature-heading">
                {t("columns.ecosystem.titleLine1")}
                <br />
                {t("columns.ecosystem.titleLine2")}
              </h3>
              <p className="feature-desc">{t("columns.ecosystem.description")}</p>
            </div>
            <div>
              <EcosystemWidget />
              <Link
                href="/solutions"
                className="feature-link group/link"
                aria-label={`${t("explore")} ${t("columns.ecosystem.titleLine1")} ${t("columns.ecosystem.titleLine2")}`}
              >
                <span>{t("explore")}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" />
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
