import { ArrowRight } from "lucide-react";
import React from "react";

interface PlatformColumnProps {
  number: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  exploreLabel: string;
  widget: React.ReactNode;
}

export function PlatformColumn({
  number,
  titleLine1,
  titleLine2,
  description,
  exploreLabel,
  widget,
}: PlatformColumnProps) {
  return (
    <div className="flex flex-col justify-between group/col w-full">
      {/* Top Header */}
      <div>
        <span className="text-[#8b5cf6] font-mono text-xs sm:text-sm font-semibold tracking-wider block mb-2">
          {number}
        </span>
        <h3 className="text-2xl sm:text-[28px] leading-[1.12] tracking-tight">
          <span className="font-light text-white block">{titleLine1}</span>
          <span className="font-bold text-white block">{titleLine2}</span>
        </h3>
        <p className="text-neutral-400 text-[13px] sm:text-sm leading-relaxed mt-2.5 mb-6 min-h-[44px]">
          {description}
        </p>
      </div>

      {/* Software UI Widget Container */}
      <div className="rounded-[20px] sm:rounded-[22px] border border-white/[0.08] bg-[#0c0d15]/95 p-3.5 sm:p-4 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.85)] relative overflow-hidden h-[295px] sm:h-[305px] md:h-[315px] flex flex-col justify-center transition-all duration-300 group-hover/col:border-purple-500/35 group-hover/col:shadow-[0_25px_60px_-15px_rgba(139,92,246,0.18)] before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/[0.12] before:to-transparent">
        {widget}
      </div>

      {/* Footer Explore Link */}
      <div className="mt-6">
        <a
          href="#pricing"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-white/75 hover:text-white transition-colors group/link"
        >
          <span>{exploreLabel}</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
        </a>
      </div>
    </div>
  );
}
