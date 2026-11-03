import React from "react";

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
}

export function LayersAnimatedIcon({ className = "w-[66px] h-[66px]", style }: IconProps) {
  return (
    <svg
      style={style}
      className={`${className} drop-shadow-[0_0_12px_rgba(208,199,255,0.3)]`}
      viewBox="0 0 68 63"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <mask id="arch-mid-vis" maskUnits="userSpaceOnUse" x="0" y="0" width="68" height="63">
          <rect width="68" height="63" fill="white" />
          <path d="M34 5 L59 19 L34 33 L9 19 Z" fill="black" />
        </mask>
        <mask id="arch-bot-vis" maskUnits="userSpaceOnUse" x="0" y="0" width="68" height="63">
          <rect width="68" height="63" fill="white" />
          <path d="M34 5 L59 19 L34 33 L9 19 Z" fill="black" />
          <path d="M34 15 L59 29 L34 43 L9 29 Z" fill="black" />
        </mask>
      </defs>

      {/* Layer 3: Bottom Layer */}
      <g
        className="arch-layer-bot"
        stroke="#D0C7FF"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M34 25 L59 39 L34 53 L9 39 Z" mask="url(#arch-bot-vis)" />
      </g>

      {/* Layer 2: Middle Layer with Staggered Levitation */}
      <g
        className="arch-layer-mid"
        stroke="#D0C7FF"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M34 15 L59 29 L34 43 L9 29 Z" mask="url(#arch-mid-vis)" />
      </g>

      {/* Layer 1: Top Floating Diamond */}
      <g
        className="arch-layer-top"
        stroke="#D0C7FF"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M34 5 L59 19 L34 33 L9 19 Z" fill="rgba(208, 199, 255, 0.06)" />
        {/* Subtle center point */}
        <circle cx="34" cy="19" r="1.5" fill="#ffffff" stroke="none" opacity="0.8" />
      </g>
    </svg>
  );
}
