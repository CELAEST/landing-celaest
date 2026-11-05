"use client";

import React from "react";
import { CELAEST_LOGO_PATH_D } from "@/components/ui/logo-path";

interface HeroArtStageProps {
  robotImgRef: React.RefObject<HTMLImageElement | null>;
  robotCanvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export function HeroArtStage({ robotImgRef, robotCanvasRef }: HeroArtStageProps) {
  return (
    <div className="intent-art" aria-hidden="true">
      <div className="intent-art-glow" />

      <svg className="intent-structure" viewBox="0 0 1680 820" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="intent-monolith" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#080912" />
            <stop offset="0.42" stopColor="#111321" />
            <stop offset="0.72" stopColor="#070811" />
            <stop offset="1" stopColor="#020307" />
          </linearGradient>
          <linearGradient id="intent-rim" x1="0" x2="0.7" y1="0" y2="1">
            <stop offset="0" stopColor="#f4eaff" />
            <stop offset="0.34" stopColor="#a78bfa" />
            <stop offset="0.72" stopColor="#7c3aed" />
            <stop offset="1" stopColor="#d8b4fe" />
          </linearGradient>
          <filter id="intent-rim-glow" x="-80%" y="-20%" width="260%" height="140%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="intent-logo-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Curved path along monolith surface for organic branding track */}
          <path id="monolith-text-curve" d="M1226 418 C 1268 248, 1322 95, 1414 -64" fill="none" />
        </defs>

        <path
          d="M1178-70 1455-40c-89 151-141 301-182 469-49 202-44 314-12 485H934c46-161 59-303 99-471 36-153 80-333 145-553Z"
          fill="url(#intent-monolith)"
          opacity="1"
        />
        <path
          d="M1175-65c-62 188-113 343-151 512-34 150-49 279-53 431"
          fill="none"
          stroke="url(#intent-rim)"
          strokeWidth="5"
          opacity=".92"
          filter="url(#intent-rim-glow)"
        />
        <path
          d="M1220 0c-46 163-87 311-111 430-23 114-38 215-43 317"
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="1"
          opacity=".45"
        />
        {/* Brand track adapted to curve: CELAEST */}
        <text fill="#c4bfd5" opacity=".58" fontSize="10" letterSpacing="5">
          <textPath href="#monolith-text-curve" startOffset="140px">
            CELAEST
          </textPath>
        </text>

        {/* Central CELAEST Logo replacing the '//' separator on the curve */}
        <g
          transform="translate(1291.3, 199.7) rotate(-70.1) translate(0, -4.5) scale(0.021) translate(-190, -251.5)"
          opacity=".78"
          filter="url(#intent-logo-glow)"
        >
          <path d={CELAEST_LOGO_PATH_D} fill="#d8b4fe" />
        </g>

        {/* Brand track adapted to curve: SYSTEMS */}
        <text fill="#c4bfd5" opacity=".58" fontSize="10" letterSpacing="5">
          <textPath href="#monolith-text-curve" startOffset="244px">
            SYSTEMS
          </textPath>
        </text>
      </svg>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={robotImgRef}
        className="intent-robot intent-robot-img"
        src="/robot_hero_gaze/gaze_018.webp"
        alt=""
        fetchPriority="high"
      />

      <canvas
        ref={robotCanvasRef}
        className="intent-robot intent-robot-canvas"
        width={1920}
        height={1080}
        data-frame="gaze-18"
      />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="intent-ridge" src="/ridge_shadowed.png" alt="" decoding="async" />

      <div className="intent-art-vignette" />
    </div>
  );
}
