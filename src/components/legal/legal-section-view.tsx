"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import { LegalCallout } from "./legal-callout";

export interface LegalSectionData {
  id: string;
  number: string;
  title: string;
  summary?: string;
  paragraphs: string[];
  points?: string[];
}

interface LegalSectionViewProps {
  section: LegalSectionData;
  summaryLabel: string;
}

export function LegalSectionView({ section, summaryLabel }: LegalSectionViewProps) {
  return (
    <article
      id={section.id}
      className="scroll-mt-28 py-8 border-b border-white/[0.06] last:border-b-0"
    >
      {/* Section Header */}
      <div className="flex items-baseline gap-3 mb-4">
        <span className="font-mono text-sm font-semibold text-purple-400 shrink-0">
          {section.number}.
        </span>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">{section.title}</h2>
      </div>

      {/* Optional Executive Summary Callout */}
      {section.summary && <LegalCallout label={summaryLabel} summary={section.summary} />}

      {/* Paragraphs */}
      <div className="space-y-4 text-[14.5px] sm:text-[15px] text-zinc-300 leading-relaxed font-normal">
        {section.paragraphs.map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}
      </div>

      {/* Optional Bullet Points */}
      {section.points && section.points.length > 0 && (
        <ul className="mt-4 space-y-2.5">
          {section.points.map((point, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2.5 text-[14px] sm:text-[14.5px] text-zinc-300 leading-relaxed"
            >
              <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-1" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
