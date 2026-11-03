import React, { ReactNode } from "react";

interface PillarProps {
  number: string;
  title: string;
  desc: string;
  icon: ReactNode;
}

export function ArchitecturePillarCard({ number, title, desc, icon }: PillarProps) {
  return (
    <article className="eco-col-open">
      {/* Stage with Diagonal Number & Centered SVG */}
      <div className="eco-stage-wrap">
        <span className="eco-num-diagonal">{number}</span>
        <div className="eco-svg-center-box">{icon}</div>
      </div>

      {/* Title & Description (Centered & Symmetrical) */}
      <h3 className="eco-pillar-title-clean">{title}</h3>
      <p className="eco-pillar-desc-clean">{desc}</p>
    </article>
  );
}
