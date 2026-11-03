import React from "react";

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
}

export function CubeAnimatedIcon({ className = "w-[66px] h-[66px]", style }: IconProps) {
  return (
    <svg
      style={style}
      className={`${className} drop-shadow-[0_0_12px_rgba(208,199,255,0.3)] arch-cube-wrap`}
      viewBox="0 0 96 96"
      fill="none"
      aria-hidden="true"
    >
      {/* Dynamic Facet Illumination Fills */}
      {/* Top Face */}
      <path d="M48 10 L77 26.5 L48 43.5 L19 26.5 Z" fill="#D0C7FF" className="arch-cube-face-top" />
      {/* Left Face */}
      <path d="M19 26.5 L48 43.5 L48 76 L19 59.5 Z" fill="#D0C7FF" className="arch-cube-face-l" />
      {/* Right Face */}
      <path d="M48 43.5 L77 26.5 L77 59.5 L48 76 Z" fill="#D0C7FF" className="arch-cube-face-r" />

      {/* Wireframe Edges */}
      <g stroke="#D0C7FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M48 10 77 26.5v33L48 76 19 59.5v-33L48 10Z" />
        <path d="m19 26.5 29 17 29-17M48 43.5V76" />
      </g>
    </svg>
  );
}
