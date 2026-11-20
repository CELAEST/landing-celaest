import React from "react";

interface MetricItem {
  value: string;
  label: string;
  desc: string;
}

interface SolutionMetricsBandProps {
  badge: string;
  lead1: string;
  lead2: string;
  metrics: MetricItem[];
}

/**
 * Closed hairline impact band reusing architecture-editorial.css (.eco-impact-closed-box).
 */
export function SolutionMetricsBand({ badge, lead1, lead2, metrics }: SolutionMetricsBandProps) {
  return (
    <section className="eco-impact-closed-box" aria-label={badge}>
      <div className="eco-impact-grid-closed">
        <div className="eco-impact-lead-col">
          <div className="eco-impact-eyebrow">
            <span className="rule" />
            <span>{badge}</span>
          </div>
          <div className="eco-impact-lead-text">
            <span>{lead1}</span>
            <em>{lead2}</em>
          </div>
        </div>

        {metrics.map((metric) => (
          <div key={metric.label} className="eco-impact-metric-col">
            <strong className="eco-impact-num neon">{metric.value}</strong>
            <b className="eco-impact-label">{metric.label}</b>
            <p className="eco-impact-desc">{metric.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
