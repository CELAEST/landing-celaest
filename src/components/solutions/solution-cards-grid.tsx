import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

export interface SolutionCardItem {
  slug: string;
  tag: string;
  title: string;
  headline: string;
  description: string;
  highlights: string[];
}

interface SolutionCardsGridProps {
  cards: SolutionCardItem[];
  exploreLabel: string;
}

/**
 * Zero-box hairline 3-column showcase matching CELAEST Architecture & Legal typography.
 */
export function SolutionCardsGrid({ cards, exploreLabel }: SolutionCardsGridProps) {
  return (
    <section aria-label="Core AI Solutions" className="sol-pillars-closed-box">
      <div className="sol-pillars-grid">
        {cards.map((card, idx) => (
          <article key={card.slug} className="sol-pillar-col">
            <div>
              <div className="sol-pillar-rule-wrap">
                <strong className="sol-pillar-num">{String(idx + 1).padStart(2, "0")}</strong>
                <span className="rule" />
                <span className="sol-pillar-tag">{card.tag}</span>
              </div>

              <h2 className="sol-pillar-title">{card.title}</h2>
              <p className="sol-pillar-headline">{card.headline}</p>
              <p className="sol-pillar-desc">{card.description}</p>

              <ul className="sol-pillar-points">
                {card.highlights.map((item) => (
                  <li key={item} className="sol-pillar-point">
                    <span className="dash" aria-hidden="true">
                      —
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link href={`/solutions/${card.slug}`} className="sol-pillar-cta group">
              <span>{exploreLabel}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
