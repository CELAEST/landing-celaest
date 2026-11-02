import React from "react";
import { LayersAnimatedIcon } from "./layers-animated-icon";
import { ChipAnimatedIcon } from "./chip-animated-icon";
import { FlowsAnimatedIcon } from "./flows-animated-icon";
import { CubeAnimatedIcon } from "./cube-animated-icon";
import { ArchitecturePillarCard } from "./architecture-pillar-card";

interface PillarData {
  key: "governance" | "mesh" | "flows" | "marketplace";
  number: string;
  title: string;
  desc: string;
}

interface GridProps {
  pillars: PillarData[];
}

export function ArchitecturePillarsGrid({ pillars }: GridProps) {
  const iconMap = {
    governance: <LayersAnimatedIcon />,
    mesh: <ChipAnimatedIcon />,
    flows: <FlowsAnimatedIcon />,
    marketplace: <CubeAnimatedIcon />,
  };

  return (
    <section
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-0 mt-14 sm:mt-16 relative"
      aria-label="System architecture pillars"
    >
      {pillars.map((pillar, index) => (
        <ArchitecturePillarCard
          key={pillar.key}
          number={pillar.number}
          title={pillar.title}
          desc={pillar.desc}
          icon={iconMap[pillar.key]}
          showConnector={index < pillars.length - 1}
        />
      ))}
    </section>
  );
}
