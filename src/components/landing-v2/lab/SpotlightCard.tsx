"use client";

import React, { useRef, useState, useCallback } from "react";
import { useLab } from "./LabContext";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  glowRadius?: number;
}

export function SpotlightCard({
  children,
  className = "",
  glowColor = "rgba(34, 211, 238, 0.15)",
  glowRadius = 500,
  ...props
}: SpotlightCardProps) {
  const { settings } = useLab();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || !settings.spotlightEnabled) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update CSS variables directly for 120 FPS buttery smoothness without React rerender
      cardRef.current.style.setProperty("--mouse-x", `${x}px`);
      cardRef.current.style.setProperty("--mouse-y", `${y}px`);

      if (settings.tilt3d) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4.5; // Max 4.5deg tilt
        const rotateY = ((x - centerX) / centerX) * 4.5;
        setTilt({ x: rotateX, y: rotateY });
      }
    },
    [settings.spotlightEnabled, settings.tilt3d]
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform:
          settings.tilt3d && isHovered
            ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.01, 1.01, 1.01)`
            : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        transition: isHovered
          ? "transform 0.1s cubic-bezier(0.16, 1, 0.3, 1)"
          : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={`group relative overflow-hidden rounded-3xl ${className}`}
      {...props}
    >
      {/* Specular Edge Border Glow (Follows cursor) */}
      {settings.spotlightEnabled && (
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(${glowRadius * 0.75}px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(34, 211, 238, 0.4), transparent 50%)`,
            zIndex: 1,
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
            padding: "1px",
          }}
        />
      )}

      {/* Surface Ambient Spotlight (Illuminates inside card) */}
      {settings.spotlightEnabled && (
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(${glowRadius}px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), ${glowColor}, transparent 60%)`,
            zIndex: 2,
          }}
        />
      )}

      {/* Card Body */}
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
