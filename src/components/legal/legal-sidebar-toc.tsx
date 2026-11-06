"use client";

import React from "react";
import { SUPPORT_EMAIL } from "@/lib/constants";

interface TocItem {
  id: string;
  number: string;
  title: string;
}

interface LegalSidebarTocProps {
  sections: TocItem[];
  title: string;
  contactLegalText: string;
  contactLegalBtn: string;
}

export function LegalSidebarToc({
  sections,
  title,
  contactLegalText,
  contactLegalBtn,
}: LegalSidebarTocProps) {
  return (
    <aside className="hidden lg:block w-[280px] shrink-0" aria-label="Índice de navegación">
      <div className="legal-sticky-index">
        {/* Eyebrow Header */}
        <div className="legal-index-eyebrow">
          <span className="dot" />
          <span>{title}</span>
        </div>

        {/* Typographic Nav */}
        <nav className="legal-index-nav">
          {sections.map((section) => (
            <a key={section.id} href={`#${section.id}`} className="legal-index-link">
              <span className="num">{section.number}</span>
              <span className="line-clamp-1">{section.title}</span>
            </a>
          ))}
        </nav>

        {/* Minimalist Editorial Footnote */}
        <div className="legal-index-footer">
          <span>{contactLegalText}</span>
          <a href={`mailto:${SUPPORT_EMAIL}?subject=Consulta%20Legal%20CELAEST`}>
            {contactLegalBtn}: {SUPPORT_EMAIL}
          </a>
        </div>
      </div>
    </aside>
  );
}
