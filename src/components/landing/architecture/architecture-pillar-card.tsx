import React, { ReactNode } from "react";

interface PillarProps {
  number: string;
  title: string;
  desc: string;
  icon: ReactNode;
  showConnector?: boolean;
  connectorIndex?: number;
}

export function ArchitecturePillarCard({
  number,
  title,
  desc,
  icon,
  showConnector = false,
  connectorIndex = 0,
}: PillarProps) {
  return (
    <article className="eco-col-open">
      {/* Stage with Diagonal Number, Centered SVG & Segmented Connector */}
      <div className="eco-stage-wrap">
        <span className="eco-num-diagonal">{number}</span>
        <div className="eco-svg-center-box">{icon}</div>

        {/* Segmented Laser Bridge (only between pillars, does not cross SVGs) */}
        {showConnector && (
          <div className="eco-pillar-connector" aria-hidden="true">
            <div
              className="eco-connector-photon"
              style={{ animationDelay: `${connectorIndex * 1.2}s` }}
            />
          </div>
        )}
      </div>

      {/* Title & Description (Centered & Symmetrical) */}
      <h3 className="eco-pillar-title-clean">{title}</h3>
      <p className="eco-pillar-desc-clean">{desc}</p>
    </article>
  );
}
