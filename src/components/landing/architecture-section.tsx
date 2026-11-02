"use client";

import React from "react";
import { useTranslations } from "next-intl";

// ============================================================================
// VECTOR LINE-ART ICONS (Bigger, bolder stroke, soft luminescence)
// ============================================================================
function LayersIcon({ className = "w-[76px] h-[76px]" }: { className?: string }) {
  return (
    <svg
      className={`${className} drop-shadow-[0_0_12px_rgba(201,187,255,0.22)]`}
      viewBox="0 0 68 63"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <mask id="arch-mid-visible" maskUnits="userSpaceOnUse" x="0" y="0" width="68" height="63">
          <rect width="68" height="63" fill="white" />
          <path d="M34 5 L59 19 L34 33 L9 19 Z" fill="black" />
        </mask>
        <mask id="arch-bot-visible" maskUnits="userSpaceOnUse" x="0" y="0" width="68" height="63">
          <rect width="68" height="63" fill="white" />
          <path d="M34 5 L59 19 L34 33 L9 19 Z" fill="black" />
          <path d="M34 15 L59 29 L34 43 L9 29 Z" fill="black" />
        </mask>
      </defs>
      <g stroke="#D0C7FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M34 25 L59 39 L34 53 L9 39 Z" mask="url(#arch-bot-visible)" />
        <path d="M34 15 L59 29 L34 43 L9 29 Z" mask="url(#arch-mid-visible)" />
        <path d="M34 5 L59 19 L34 33 L9 19 Z" />
      </g>
    </svg>
  );
}

function ChipIcon({ className = "w-[76px] h-[76px]" }: { className?: string }) {
  return (
    <svg
      className={`${className} drop-shadow-[0_0_12px_rgba(201,187,255,0.22)]`}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="#D0C7FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="18" y="17" width="28" height="30" rx="4" />
        <rect x="24" y="23" width="16" height="18" rx="1.8" />
        <path d="M24 10v7M32 10v7M40 10v7M24 47v7M32 47v7M40 47v7" />
        <path d="M11 23h7M11 31h7M11 39h7M46 23h7M46 31h7M46 39h7" />
      </g>
    </svg>
  );
}

function FlowsIcon({ className = "w-[76px] h-[76px]" }: { className?: string }) {
  return (
    <svg
      className={`${className} drop-shadow-[0_0_12px_rgba(201,187,255,0.22)]`}
      viewBox="0 0 96 96"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="#D0C7FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M48 29v17M21 67V54h54v13M48 46v8" />
        <rect x="39" y="12" width="18" height="18" rx="2" />
        <rect x="12" y="67" width="18" height="18" rx="2" />
        <rect x="39" y="67" width="18" height="18" rx="2" />
        <rect x="66" y="67" width="18" height="18" rx="2" />
      </g>
    </svg>
  );
}

function MarketplaceIcon({ className = "w-[76px] h-[76px]" }: { className?: string }) {
  return (
    <svg
      className={`${className} drop-shadow-[0_0_12px_rgba(201,187,255,0.22)]`}
      viewBox="0 0 96 96"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="#D0C7FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M48 10 77 26.5v33L48 76 19 59.5v-33L48 10Z" />
        <path d="m19 26.5 29 17 29-17M48 43.5V76" />
      </g>
    </svg>
  );
}

// ============================================================================
// MAIN ARCHITECTURE SECTION
// ============================================================================
export function ArchitectureSection() {
  const t = useTranslations("architecture");

  const pillars = [
    {
      key: "governance",
      number: t("pillars.governance.number"),
      title: t("pillars.governance.title"),
      desc: t("pillars.governance.desc"),
      icon: <LayersIcon />,
    },
    {
      key: "mesh",
      number: t("pillars.mesh.number"),
      title: t("pillars.mesh.title"),
      desc: t("pillars.mesh.desc"),
      icon: <ChipIcon />,
    },
    {
      key: "flows",
      number: t("pillars.flows.number"),
      title: t("pillars.flows.title"),
      desc: t("pillars.flows.desc"),
      icon: <FlowsIcon />,
    },
    {
      key: "marketplace",
      number: t("pillars.marketplace.number"),
      title: t("pillars.marketplace.title"),
      desc: t("pillars.marketplace.desc"),
      icon: <MarketplaceIcon />,
    },
  ];

  return (
    <section
      id="architecture"
      className="bg-[#000000] text-[#f7f7f8] relative overflow-hidden py-20 sm:py-28 lg:py-32"
    >
      {/* Symmetrical container matching ProductsSection & PlatformSection max-w-[85rem] */}
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Hero Header */}
        <header className="max-w-4xl">
          <div className="flex items-center gap-4 text-[#a9adbb] text-xs font-mono tracking-[2.2px] leading-none mb-7">
            <span className="w-12 h-px bg-[#afb2ba] inline-block" />
            <span>{t("badge")}</span>
          </div>

          <h2 className="text-5xl sm:text-7xl lg:text-[88px] font-normal tracking-[-3.5px] sm:tracking-[-4.5px] leading-[0.88] mb-6 text-white font-sans">
            {t("titleLead")}
            <br />
            <span className="text-[#9da2b1]">{t("titleAccent")}</span>
          </h2>

          <p className="text-[#9da2b1] text-lg sm:text-xl lg:text-[20px] leading-[1.45] tracking-[-0.35px] max-w-2xl font-light">
            {t("subtitle")}
          </p>
        </header>

        {/* 4 Pillars Grid with Symmetrical Connector Line & Numbers next to SVGs */}
        <section
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-0 mt-16 sm:mt-20 relative"
          aria-label="System architecture pillars"
        >
          {pillars.map((pillar, index) => (
            <article className="min-w-0 relative pr-4" key={pillar.number}>
              {/* Top Row: Number on left + Large SVG + Connector line to next */}
              <div className="h-[96px] flex items-center justify-start relative">
                {/* Number beside the SVG */}
                <span className="font-mono text-[#9ba0ae] text-[15px] sm:text-[16px] leading-none shrink-0 w-8">
                  {pillar.number}
                </span>

                {/* Larger SVG Icon */}
                <div className="relative z-10 shrink-0 ml-2">{pillar.icon}</div>

                {/* Connector line between columns */}
                {index < pillars.length - 1 && (
                  <div
                    className="hidden lg:block absolute left-[134px] right-[24px] top-[48px] h-px bg-[#4d4e53] z-0"
                    aria-hidden="true"
                  />
                )}
              </div>

              {/* Title */}
              <h3 className="font-normal text-[20px] sm:text-[22px] leading-[1.15] tracking-[-0.6px] text-white min-h-[52px] mt-4 mb-3 text-left whitespace-pre-line">
                {pillar.title}
              </h3>

              {/* Description */}
              <p className="text-[#9ba0ae] text-[14px] sm:text-[15px] leading-[1.45] text-left max-w-[250px] whitespace-pre-line font-light">
                {pillar.desc}
              </p>
            </article>
          ))}
        </section>

        {/* Strategic Business Impact Section */}
        <section className="border-t border-[#4b4d51] mt-20 pt-9">
          <div className="flex items-center gap-4 text-[#a9adbb] text-xs font-mono tracking-[2.2px] leading-none mb-8">
            <span className="w-12 h-px bg-[#afb2ba] inline-block" />
            <span>{t("impact.badge")}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 mt-7">
            {/* Impact Lead */}
            <div className="text-[28px] sm:text-[34px] lg:text-[35px] font-normal leading-[1.08] tracking-[-1.5px] pr-4">
              <span className="text-white">{t("impact.leadTitle")}</span>
              <br />
              <span className="text-[#9da2b1]">{t("impact.leadAccent")}</span>
            </div>

            {/* Metric 1: Technical Debt */}
            <div className="lg:border-l lg:border-[#4b4d51] lg:pl-12 flex flex-col justify-start">
              <strong className="text-[36px] sm:text-[38px] font-normal tracking-[-1px] text-white leading-none">
                {t("impact.metrics.debt.value")}
              </strong>
              <b className="text-[#c2c5cf] text-[16px] font-normal mt-3 leading-snug">
                {t("impact.metrics.debt.label")}
              </b>
              <small className="text-[#858a98] text-[13px] mt-1 leading-normal font-light">
                {t("impact.metrics.debt.desc")}
              </small>
            </div>

            {/* Metric 2: Operational Efficiency */}
            <div className="lg:border-l lg:border-[#4b4d51] lg:pl-12 flex flex-col justify-start">
              <strong className="text-[36px] sm:text-[38px] font-normal tracking-[-1px] text-white leading-none">
                {t("impact.metrics.efficiency.value")}
              </strong>
              <b className="text-[#c2c5cf] text-[16px] font-normal mt-3 leading-snug">
                {t("impact.metrics.efficiency.label")}
              </b>
              <small className="text-[#858a98] text-[13px] mt-1 leading-normal font-light">
                {t("impact.metrics.efficiency.desc")}
              </small>
            </div>

            {/* Metric 3: Scalability */}
            <div className="lg:border-l lg:border-[#4b4d51] lg:pl-12 flex flex-col justify-start">
              <strong className="text-[36px] sm:text-[38px] font-normal tracking-[-1px] text-white leading-none">
                {t("impact.metrics.scalability.value")}
              </strong>
              <b className="text-[#c2c5cf] text-[16px] font-normal mt-3 leading-snug">
                {t("impact.metrics.scalability.label")}
              </b>
              <small className="text-[#858a98] text-[13px] mt-1 leading-normal font-light">
                {t("impact.metrics.scalability.desc")}
              </small>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
