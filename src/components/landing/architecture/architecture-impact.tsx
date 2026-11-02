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
    <section className="border-t border-[#24242b] mt-16 sm:mt-20 pt-8 sm:pt-9">
      <div className="flex items-center gap-4 text-[#87838e] text-[11px] font-sans font-medium tracking-[0.2em] uppercase leading-none mb-7">
        <span className="w-10 h-px bg-[#3d3947] inline-block" />
        <span>{badge}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 mt-6">
        {/* Impact Lead */}
        <div className="text-[26px] sm:text-[30px] lg:text-[31px] font-normal leading-[1.1] tracking-[-1.2px] pr-4">
          <span className="text-white">{leadTitle}</span>
          <br />
          <span className="text-[#9da2b1]">{leadAccent}</span>
        </div>

        {/* 3 Strategic Metrics */}
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="lg:border-l lg:border-[#24242b] lg:pl-11 flex flex-col justify-start"
          >
            <strong className="text-[34px] sm:text-[36px] font-normal tracking-[-1px] text-white leading-none">
              {metric.value}
            </strong>
            <b className="text-[#c2c5cf] text-[15px] font-normal mt-2.5 leading-snug">
              {metric.label}
            </b>
            <small className="text-[#858a98] text-[13px] mt-1 leading-normal font-light">
              {metric.desc}
            </small>
          </div>
        ))}
      </div>
    </section>
  );
}
