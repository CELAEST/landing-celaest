import React from "react";

interface IconProps {
  className?: string;
}

export function FlowsAnimatedIcon({ className = "w-[66px] h-[66px]" }: IconProps) {
  return (
    <svg
      className={`${className} drop-shadow-[0_0_12px_rgba(208,199,255,0.3)]`}
      viewBox="0 0 96 96"
      fill="none"
      aria-hidden="true"
    >
      {/* Base Pipeline Hierarchy Circuit Lines */}
      <g stroke="#D0C7FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M48 29v17M21 67V54h54v13M48 46v8" />
        {/* Parent Node */}
        <rect x="39" y="12" width="18" height="18" rx="2" fill="rgba(208,199,255,0.08)" />
        {/* Child Node Left */}
        <rect
          x="12"
          y="67"
          width="18"
          height="18"
          rx="2"
          fill="#D0C7FF"
          className="arch-node-flash-l"
        />
        {/* Child Node Center */}
        <rect
          x="39"
          y="67"
          width="18"
          height="18"
          rx="2"
          fill="#D0C7FF"
          className="arch-node-flash-m"
        />
        {/* Child Node Right */}
        <rect
          x="66"
          y="67"
          width="18"
          height="18"
          rx="2"
          fill="#D0C7FF"
          className="arch-node-flash-r"
        />
      </g>

      {/* Traveling Data Photons (Root to branches) */}
      <circle cx="48" cy="29" r="2.2" fill="#ffffff" className="arch-flow-photon-trunk" />
      <circle cx="48" cy="54" r="2" fill="#ffffff" className="arch-flow-photon-l" />
      <circle cx="48" cy="54" r="2" fill="#ffffff" className="arch-flow-photon-m" />
      <circle cx="48" cy="54" r="2" fill="#ffffff" className="arch-flow-photon-r" />
    </svg>
  );
}
