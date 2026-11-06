"use client";

import React from "react";

interface LegalHeaderProps {
  title: string;
  badge: string;
  subtitle: string;
  version: string;
  lastUpdated: string;
  navLabels: {
    print: string;
  };
}

export function LegalHeader({
  title,
  badge,
  subtitle,
  version,
  lastUpdated,
  navLabels,
}: LegalHeaderProps) {
  const handlePrint = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <header className="legal-editorial-header">
      {/* Symmetrical Eyebrow Rule */}
      <div className="legal-editorial-eyebrow">
        <span className="rule" />
        <span>{badge}</span>
        <span className="rule" />
      </div>

      {/* Main Display Title */}
      <h1 className="legal-editorial-title">{title}</h1>

      {/* Editorial Subtitle */}
      <p className="legal-editorial-subtitle">{subtitle}</p>

      {/* Meta Bar */}
      <div className="legal-editorial-meta">
        <span>{version}</span>
        <span className="dot">·</span>
        <span>{lastUpdated}</span>
        <span className="dot">·</span>
        <button
          onClick={handlePrint}
          type="button"
          className="hover:text-white transition-colors cursor-pointer text-inherit font-inherit bg-transparent border-none p-0 underline decoration-zinc-700 underline-offset-4"
        >
          {navLabels.print}
        </button>
      </div>
    </header>
  );
}
