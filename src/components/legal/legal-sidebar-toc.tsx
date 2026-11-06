"use client";

import React from "react";
import { Mail, HelpCircle } from "lucide-react";
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
    <aside className="hidden lg:block w-72 shrink-0">
      <div className="sticky top-28 space-y-6">
        {/* Table of Contents Box */}
        <div className="p-5 rounded-2xl bg-[#09090d]/80 border border-white/[0.08] backdrop-blur-md">
          <h4 className="text-xs font-semibold tracking-wider uppercase text-zinc-400 mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            {title}
          </h4>
          <nav className="space-y-1">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="group flex items-start gap-2.5 py-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
              >
                <span className="font-mono text-[11px] text-zinc-600 group-hover:text-purple-400 transition-colors shrink-0">
                  {section.number}
                </span>
                <span className="line-clamp-1 leading-relaxed">{section.title}</span>
              </a>
            ))}
          </nav>
        </div>

        {/* Contact Support & Legal Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-950/20 via-[#0a0a0f] to-transparent border border-purple-500/15">
          <div className="flex items-center gap-2 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Compliance & Legal</span>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed mb-4">{contactLegalText}</p>
          <a
            href={`mailto:${SUPPORT_EMAIL}?subject=Consulta%20Legal%20CELAEST`}
            className="inline-flex items-center justify-center gap-2 w-full px-3.5 py-2 rounded-xl bg-purple-600/15 hover:bg-purple-600/25 border border-purple-500/30 text-purple-300 text-xs font-medium transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>{contactLegalBtn}</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
