"use client";

import React from "react";
import { Link, usePathname } from "@/i18n/navigation";

interface LegalTabsProps {
  navLabels: {
    terms: string;
    privacy: string;
    license: string;
    cookies: string;
  };
}

export function LegalTabs({ navLabels }: LegalTabsProps) {
  const pathname = usePathname();

  const tabs = [
    {
      href: "/legal/terms",
      num: "01",
      label: navLabels.terms,
      active: pathname.includes("/legal/terms"),
    },
    {
      href: "/legal/privacy",
      num: "02",
      label: navLabels.privacy,
      active: pathname.includes("/legal/privacy"),
    },
    {
      href: "/legal/license",
      num: "03",
      label: navLabels.license,
      active: pathname.includes("/legal/license"),
    },
    {
      href: "/legal/cookies",
      num: "04",
      label: navLabels.cookies,
      active: pathname.includes("/legal/cookies"),
    },
  ];

  return (
    <div className="legal-tetralogy-bar">
      <nav aria-label="Tetralogía Legal CELAEST" className="legal-tetralogy-nav">
        {tabs.map((tab, idx) => (
          <React.Fragment key={tab.href}>
            <Link href={tab.href} className={`legal-tetralogy-link ${tab.active ? "active" : ""}`}>
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
