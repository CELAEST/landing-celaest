"use client";

import React from "react";
import { Link } from "@/i18n/navigation";
import { Printer, ChevronRight, Calendar, Tag } from "lucide-react";

interface LegalHeaderProps {
  title: string;
  badge: string;
  subtitle: string;
  version: string;
  lastUpdated: string;
  navLabels: {
    breadcrumbHome: string;
    breadcrumbLegal: string;
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
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <header className="mb-10 sm:mb-12 border-b border-white/[0.08] pb-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-6">
        <Link href="/" className="hover:text-zinc-300 transition-colors">
          {navLabels.breadcrumbHome}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
        <Link href="/legal/terms" className="hover:text-zinc-300 transition-colors">
          {navLabels.breadcrumbLegal}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
        <span className="text-purple-400 font-medium">{title}</span>
      </div>

      {/* Category Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[11px] font-semibold tracking-wider uppercase mb-4">
        <Tag className="w-3 h-3" />
        <span>{badge}</span>
      </div>

      {/* Main Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
        {title}
      </h1>

      {/* Subtitle */}
      <p className="text-zinc-400 text-sm sm:text-base max-w-3xl leading-relaxed mb-6">
        {subtitle}
      </p>

      {/* Metadata Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/[0.05] text-xs text-zinc-400">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded bg-zinc-800/80 text-zinc-300 border border-white/10 font-mono text-[11px]">
              {version}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-400">
            <Calendar className="w-3.5 h-3.5 text-zinc-500" />
            <span>{lastUpdated}</span>
          </div>
        </div>

        {/* Print / Save PDF Button */}
        <button
          onClick={handlePrint}
          type="button"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white border border-white/10 transition-colors cursor-pointer text-xs"
        >
          <Printer className="w-3.5 h-3.5 text-zinc-400" />
          <span>{navLabels.print}</span>
        </button>
      </div>
    </header>
  );
}
