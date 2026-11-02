import React from "react";

interface IconProps {
  className?: string;
}

export function ChipAnimatedIcon({ className = "w-[66px] h-[66px]" }: IconProps) {
  return (
    <svg
      className={`${className} drop-shadow-[0_0_12px_rgba(208,199,255,0.3)]`}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      {/* Outer Package Body */}
      <rect
        x="18"
        y="17"
        width="28"
        height="30"
        rx="4"
        stroke="#D0C7FF"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Pulsing Core Silicon Die */}
      <rect
        x="24"
        y="23"
        width="16"
        height="18"
        rx="1.8"
        fill="#D0C7FF"
        className="arch-chip-core-glow"
        stroke="#D0C7FF"
        strokeWidth="1.2"
      />

      {/* Central Neural Node Beacon */}
      <circle cx="32" cy="32" r="2.2" className="arch-chip-beacon" />

      {/* Micro-Traces (Pins with subtle cycling signal pulse) */}
      <g stroke="#D0C7FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {/* Top & Bottom Pins */}
        <path d="M24 10v7M32 10v7M40 10v7M24 47v7M32 47v7M40 47v7" />
        {/* Left & Right Pins */}
        <path d="M11 23h7M11 31h7M11 39h7M46 23h7M46 31h7M46 39h7" />
      </g>

      {/* Active High-Speed Data Pulses Over Pins */}
      <g stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" className="arch-chip-pin-pulse">
        <path d="M24 10v7M32 10v7M40 10v7M24 47v7M32 47v7M40 47v7" />
        <path d="M11 23h7M11 31h7M11 39h7M46 23h7M46 31h7M46 39h7" />
      </g>
    </svg>
  );
}
