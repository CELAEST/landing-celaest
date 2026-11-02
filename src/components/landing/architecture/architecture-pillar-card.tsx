import React, { ReactNode } from "react";

interface PillarProps {
  number: string;
  title: string;
  desc: string;
  icon: ReactNode;
  showConnector: boolean;
}

export function ArchitecturePillarCard({ number, title, desc, icon, showConnector }: PillarProps) {
  return (
    <article className="min-w-0 relative pr-5">
      {/* Number in the top-left (diagonal to the icon) */}
      <div className="absolute top-0 left-0 z-10 font-sans font-medium text-[#9ba0ae] text-[15px] leading-none tabular-nums">
        {number}
      </div>

      {/* Top Row: Icon with left-padding to position it diagonally to the number */}
      <div className="h-[89px] flex items-center justify-start relative pl-9 sm:pl-10">
        <div className="relative z-10 flex-none">{icon}</div>

        {/* Connector line between columns */}
        {showConnector && (
          <div
            className="hidden lg:block absolute left-[124px] right-[28px] top-[44px] h-px bg-[#24242b] z-0"
            aria-hidden="true"
          />
        )}
      </div>

      {/* Title */}
      <h3 className="font-normal text-[20px] sm:text-[21px] leading-[1.15] tracking-[-0.6px] text-white min-h-[48px] mt-4 mb-2.5 text-left whitespace-pre-line">
        {title}
      </h3>

      {/* Description */}
      <p className="text-[#9ba0ae] text-[14px] sm:text-[14.5px] leading-[1.4] text-left max-w-[240px] whitespace-pre-line font-light">
        {desc}
      </p>
    </article>
  );
}
