"use client";

import React from "react";
import { Link, usePathname } from "@/i18n/navigation";

interface SolutionTabsProps {
  labels: {
    overview: string;
    lingua: string;
    aiMesh: string;
    automation: string;
  };
}

/**
 * Typographic switcher bar matching CELAEST Legal Center's Zero-Box Tetralogy Bar.
 */
export function SolutionTabs({ labels }: SolutionTabsProps) {
  const pathname = usePathname();

  const tabs = [
    {
      href: "/solutions",
      num: "01",
      label: labels.overview,
      active: pathname === "/solutions" || pathname.endsWith("/solutions"),
    },
    {
      href: "/solutions/lingua",
      num: "02",
      label: labels.lingua,
      active: pathname.includes("/solutions/lingua"),
    },
    {
      href: "/solutions/ai-mesh",
      num: "03",
      label: labels.aiMesh,
      active: pathname.includes("/solutions/ai-mesh"),
    },
    {
      href: "/solutions/automation",
      num: "04",
      label: labels.automation,
      active: pathname.includes("/solutions/automation"),
    },
  ];

  return (
    <div className="legal-tetralogy-bar">
      <nav aria-label="CELAEST Solutions Navigation" className="legal-tetralogy-nav">
        {tabs.map((tab, idx) => (
          <React.Fragment key={tab.href}>
            <Link
              href={tab.href}
              prefetch={false}
              className={`legal-tetralogy-link ${tab.active ? "active" : ""}`}
            >
              <span className="num">{tab.num}</span>
              <span className="label">{tab.label}</span>
            </Link>
            {idx < tabs.length - 1 && <span className="legal-tetralogy-sep">/</span>}
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
}
