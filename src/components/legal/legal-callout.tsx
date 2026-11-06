"use client";

import React from "react";
import { Sparkles } from "lucide-react";

interface LegalCalloutProps {
  label: string;
  summary: string;
}

export function LegalCallout({ label, summary }: LegalCalloutProps) {
  return (
    <div className="my-5 p-4 sm:p-5 rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-950/20 via-[#0d0d12]/80 to-transparent backdrop-blur-sm shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
      <div className="flex items-start gap-3">
        <div className="w-6 h-6 rounded-md bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0 mt-0.5 text-purple-400">
          <Sparkles className="w-3.5 h-3.5" />
        </div>
        <div>
          <span className="text-[11px] font-semibold tracking-wider uppercase text-purple-300 block mb-1">
            {label}
          </span>
          <p className="text-sm sm:text-[14px] text-zinc-200 leading-relaxed font-normal">
            {summary}
          </p>
        </div>
      </div>
    </div>
  );
}
