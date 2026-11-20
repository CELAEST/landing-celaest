import React from "react";
import { SUPPORT_EMAIL } from "@/lib/constants";
import { ContactTriggerLink } from "@/components/contact/contact-trigger-link";

interface TocItem {
  id: string;
  number: string;
  title: string;
}

interface SolutionStickyIndexProps {
  eyebrow: string;
  sections: TocItem[];
  supportPrompt: string;
  contactLabel: string;
}

/**
 * Zero-box sticky editorial index matching LegalSidebarToc.
 */
export function SolutionStickyIndex({
  eyebrow,
  sections,
  supportPrompt,
  contactLabel,
}: SolutionStickyIndexProps) {
  return (
    <aside className="hidden lg:block w-[280px] shrink-0" aria-label={eyebrow}>
      <div className="legal-sticky-index">
        <div className="legal-index-eyebrow">
          <span className="dot" />
          <span>{eyebrow}</span>
        </div>

        <nav className="legal-index-nav">
          {sections.map((section) => (
            <a key={section.id} href={`#${section.id}`} className="legal-index-link">
              <span className="num">{section.number}</span>
              <span className="line-clamp-1">{section.title}</span>
            </a>
          ))}
        </nav>

        <div className="legal-index-footer">
          <span>{supportPrompt}</span>
          <ContactTriggerLink subject="CELAEST Solutions" source="solutions_sidebar">
            {contactLabel}: {SUPPORT_EMAIL}
          </ContactTriggerLink>
        </div>
      </div>
    </aside>
  );
}
