import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

export interface IntentRouteItem {
  query: string;
  targetSlug: string;
  targetLabel: string;
}

interface SolutionIntentMapProps {
  title1: string;
  title2: string;
  subtitle: string;
  intents: IntentRouteItem[];
}

/**
 * Hairline-delimited editorial intent rows mapping real search prompts to solutions.
 */
export function SolutionIntentMap({ title1, title2, subtitle, intents }: SolutionIntentMapProps) {
  return (
    <section className="sol-section-block">
      <h2 className="sol-section-heading">
        <span>{title1} </span>
        <em>{title2}</em>
      </h2>
      <p className="text-sm sm:text-base text-[#9998a2] font-light max-w-2xl">{subtitle}</p>

      <div className="sol-intent-list">
        {intents.map((intent, idx) => (
          <Link
            key={intent.query}
            href={`/solutions/${intent.targetSlug}`}
            className="sol-intent-row group"
          >
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-xs font-semibold text-[#a855f7] shrink-0">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span className="sol-intent-query group-hover:text-white transition-colors">
                {intent.query}
              </span>
            </div>

            <span className="sol-intent-target">
              <span>{intent.targetLabel}</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
