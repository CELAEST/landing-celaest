"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { SectionHeader } from "@/components/ui/section-header";
import { MagneticCard } from "@/components/ui/magnetic-card";
import { ConstellationBackground } from "@/components/ui/constellation-background";

// Code-split the R3F + GLTF + shader bundle out of the security section's
// initial chunk. The component itself viewport-gates its own Canvas.
const ParticleCore = dynamic(
  () => import("./security/particle-core").then((m) => ({ default: m.ParticleCore })),
  { ssr: false, loading: () => <div className="w-60 h-60 md:w-72 md:h-72" /> },
);

// ==========================================
// MAIN COMPONENT
// ==========================================
export function SecuritySection() {
  const t = useTranslations("security");
  const [hoveredNode, setHoveredNode] = useState<"verified" | "encryption" | "infrastructure" | "all" | null>(null);

  // Path definitions for central alignment to the 40x40 robot ears and trunk
  // SVG ViewBox is 1000x650. Center shifted UP to Top-[40%] (Y:260)
  const paths = {
    // Top-left connector: endpoint pulled closer to the core (X:445) without overlapping it.
    verified: "M 380 120 C 400 120, 410 245, 445 245",
    // Top-right connector: mirror at X:555.
    encryption: "M 620 120 C 600 120, 590 245, 555 245",
    // Bottom connector: endpoint raised to match the lifted core (Y:305).
    infrastructure: "M 500 412 C 500 360, 500 360, 500 305"
  };

  const isAnyActive = hoveredNode !== null;

  return (
    <section id="security" className="py-16 sm:py-24 bg-brand-dark relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-brand-deep pointer-events-none" />
      {/* Permanent subtle aura from Robot */}
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[600px] md:h-[900px] bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.04)_0%,transparent_60%)] pointer-events-none" />
      {/* Cyan grid radiating from Robot's center */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_10%,transparent_80%)] pointer-events-none" />

      {/* Drifting constellation (subtle ambience) */}
      <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(ellipse_75%_80%_at_50%_50%,#000_20%,transparent_90%)]">
        <ConstellationBackground nodeCount={55} nodeAlpha={0.3} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        
        {/* Header */}
        <SectionHeader
          title1={t("title1")}
          title2={t("title2")}
          subtitle={t("description")}
          badge="Global Scale Infrastructure"
        />

        {/* The Interactive SVG Schematic Container */}
        <div 
          className="relative w-full max-w-5xl md:aspect-[1000/650] mt-8 md:mt-4 select-none"
          onMouseLeave={() => setHoveredNode(null)}
        >
          {/* Central Reactor Glow (Reacts to any node hover) */}
          <div className={`absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[700px] h-[500px] md:h-[700px] bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.08)_0%,transparent_50%)] rounded-full pointer-events-none transition-opacity duration-1000 ${isAnyActive ? 'opacity-100' : 'opacity-0'}`} />

          {/* Symmetrical SVG Connections Layer */}
          <svg
            viewBox="0 0 1000 650"
            className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="neon-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
              <filter id="blur-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* BASE INACTIVE TUBES */}
            <g opacity="0.15">
              <path d={paths.verified} fill="none" stroke="#fff" strokeWidth="2" />
              <path d={paths.encryption} fill="none" stroke="#fff" strokeWidth="2" />
              <path d={paths.infrastructure} fill="none" stroke="#fff" strokeWidth="2" />
            </g>

            {/* ACTIVE GLOWING PATHS (Node Specific) */}
            <g filter="url(#blur-glow)">
              {/* Verified Path */}
              <path d={paths.verified} fill="none" stroke="#22d3ee" strokeWidth="2" 
                className={`transition-opacity duration-500 ${hoveredNode === "verified" || hoveredNode === "all" ? "opacity-100" : (isAnyActive ? "opacity-10" : "opacity-0")}`} />
              <motion.path d={paths.verified} fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="50 1000" strokeLinecap="round"
                animate={{ strokeDashoffset: hoveredNode === "verified" || hoveredNode === "all" ? [1050, -50] : 1050 }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                className={hoveredNode === "verified" || hoveredNode === "all" ? "opacity-100" : "opacity-0"} />

              {/* Encryption Path */}
              <path d={paths.encryption} fill="none" stroke="#22d3ee" strokeWidth="2" 
                className={`transition-opacity duration-500 ${hoveredNode === "encryption" || hoveredNode === "all" ? "opacity-100" : (isAnyActive ? "opacity-10" : "opacity-0")}`} />
              <motion.path d={paths.encryption} fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="50 1000" strokeLinecap="round"
                animate={{ strokeDashoffset: hoveredNode === "encryption" || hoveredNode === "all" ? [1050, -50] : 1050 }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                className={hoveredNode === "encryption" || hoveredNode === "all" ? "opacity-100" : "opacity-0"} />

              {/* Infrastructure Path */}
              <path d={paths.infrastructure} fill="none" stroke="#22d3ee" strokeWidth="2" 
                className={`transition-opacity duration-500 ${hoveredNode === "infrastructure" || hoveredNode === "all" ? "opacity-100" : (isAnyActive ? "opacity-10" : "opacity-0")}`} />
              <motion.path d={paths.infrastructure} fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="50 1000" strokeLinecap="round"
                animate={{ strokeDashoffset: hoveredNode === "infrastructure" || hoveredNode === "all" ? [1050, -50] : 1050 }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                className={hoveredNode === "infrastructure" || hoveredNode === "all" ? "opacity-100" : "opacity-0"} />
            </g>
          </svg>

          {/* =========================================
              HTML NODES (Responsive Positioning)
             ========================================= */}
          <div className="flex flex-col md:block w-full h-full gap-6 px-4 md:px-0 relative">
            
            {/* NODE 1: Licencias Verificadas */}
            <div className="md:absolute top-[15%] left-[22%] md:-translate-x-1/2 md:-translate-y-1/2 w-full md:w-[32%] z-20">
              <MagneticCard
                onHoverStart={() => setHoveredNode("verified")}
                className={hoveredNode && hoveredNode !== "verified" && hoveredNode !== "all" ? "md:opacity-40" : "opacity-100"}
              >
                <div className="px-5 py-6 sm:px-6 sm:py-8 flex flex-col items-center text-center">
                  <h3 className="font-display text-white font-medium text-[20px] sm:text-[22px] leading-[1.15] tracking-[-0.02em] mb-2.5 sm:mb-3">
                    {t("features.verified.title")}
                  </h3>
                  <p className="font-sans text-white/55 text-[13px] sm:text-[14px] leading-[1.6] sm:leading-[1.65] tracking-[0.005em] max-w-[30ch]">
                    {t("features.verified.description")}
                  </p>
                </div>
              </MagneticCard>
            </div>

            {/* NODE 2: Cifrado End-to-End */}
            <div className="md:absolute top-[15%] left-[78%] md:-translate-x-1/2 md:-translate-y-1/2 w-full md:w-[32%] z-20">
              <MagneticCard
                onHoverStart={() => setHoveredNode("encryption")}
                className={hoveredNode && hoveredNode !== "encryption" && hoveredNode !== "all" ? "md:opacity-40" : "opacity-100"}
              >
                <div className="px-5 py-6 sm:px-6 sm:py-8 flex flex-col items-center text-center">
                  <h3 className="font-display text-white font-medium text-[20px] sm:text-[22px] leading-[1.15] tracking-[-0.02em] mb-2.5 sm:mb-3">
                    {t("features.encryption.title")}
                  </h3>
                  <p className="font-sans text-white/55 text-[13px] sm:text-[14px] leading-[1.6] sm:leading-[1.65] tracking-[0.005em] max-w-[30ch]">
                    {t("features.encryption.description")}
                  </p>
                </div>
              </MagneticCard>
            </div>

            {/* THE CORE ENGINE (ROBOT HEAD) */}
            <div 
              className="hidden md:flex absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-30 cursor-crosshair"
              onMouseEnter={() => setHoveredNode("all")}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <ParticleCore activeNode={hoveredNode} />
            </div>

            {/* NODE 3: Infraestructura Resiliente */}
            <div className="md:absolute top-[75%] left-[50%] md:-translate-x-1/2 md:-translate-y-1/2 w-full md:w-[36%] z-20">
              <MagneticCard
                onHoverStart={() => setHoveredNode("infrastructure")}
                className={hoveredNode && hoveredNode !== "infrastructure" && hoveredNode !== "all" ? "md:opacity-40" : "opacity-100"}
              >
                <div className="px-5 py-6 sm:px-6 sm:py-8 flex flex-col items-center text-center">
                  <h3 className="font-display text-white font-medium text-[20px] sm:text-[22px] leading-[1.15] tracking-[-0.02em] mb-2.5 sm:mb-3">
                    {t("features.infrastructure.title")}
                  </h3>
                  <p className="font-sans text-white/55 text-[13px] sm:text-[14px] leading-[1.6] sm:leading-[1.65] tracking-[0.005em] max-w-[32ch]">
                    {t("features.infrastructure.description")}
                  </p>
                </div>
              </MagneticCard>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
