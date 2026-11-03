import React from "react";

interface ImpactMetric {
  value: string;
  label: string;
  desc: string;
}

interface ImpactProps {
  badge: string;
  leadTitle: string;
  leadAccent: string;
  debt: ImpactMetric;
  efficiency: ImpactMetric;
  scalability: ImpactMetric;
}

export function ArchitectureImpact({
  badge,
  leadTitle,
  leadAccent,
  debt,
  efficiency,
  scalability,
}: ImpactProps) {
  const metrics = [debt, efficiency, scalability];

  return (
    <section className="eco-impact-closed-box" aria-label="Business impact metrics">
      <div className="eco-impact-grid-closed">
        {/* Impact Lead with Eyebrow Inside */}
        <div className="eco-impact-lead-col">
          <div className="eco-impact-eyebrow">
            <span className="rule" />
            <span>{badge}</span>
          </div>

          <div className="eco-impact-lead-text">
            <span>{leadTitle}</span>
            <em>{leadAccent}</em>
          </div>
        </div>

        {/* 3 Strategic Metrics (Full-Height Borders, Más Aire & Neón) */}
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
