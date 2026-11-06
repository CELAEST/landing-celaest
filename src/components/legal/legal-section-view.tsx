"use client";

import React from "react";
import { useLocale } from "next-intl";

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
  summaryLabel?: string;
}

export function LegalSectionView({ section }: LegalSectionViewProps) {
  const locale = useLocale();
  const sectionLabel = locale === "en" ? "SECTION" : "SECCIÓN";

  return (
    <article id={section.id} className="legal-section-article scroll-mt-28">
      {/* Symmetrical Numeral + Hairline Rule */}
      <div className="legal-section-rule-wrap">
        <strong className="legal-section-num">{section.number}</strong>
        <span className="rule" />
        <span className="legal-section-tag">
          {sectionLabel} {section.number}
        </span>
      </div>

      {/* Title */}
      <h2 className="legal-section-title">{section.title}</h2>

      {/* Pure Editorial Summary Lead - Zero Cards, Zero Emojis */}
      {section.summary && <p className="legal-section-lead">{section.summary}</p>}

      {/* Editorial Paragraphs */}
      <div className="legal-section-paragraphs">
        {section.paragraphs.map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}
      </div>

      {/* Typographic Points */}
      {section.points && section.points.length > 0 && (
        <ul className="legal-section-points">
          {section.points.map((point, idx) => (
            <li key={idx} className="legal-section-point">
              <span className="dash" aria-hidden="true">
                —
              </span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
