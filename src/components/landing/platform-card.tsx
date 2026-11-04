"use client";

import React, { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Layers, Zap, Shield, ArrowRight } from "lucide-react";

interface PlatformCardProps {
  id: "management" | "workflow" | "ecosystem";
  title: string;
  description: string;
  image: string;
  icon: "layers" | "zap" | "shield";
  exploreLabel: string;
  href?: string;
  index: number;
}

export function PlatformCard({
  id,
  title,
  description,
  image,
  icon,
  exploreLabel,
  href = "https://celaest-dashboard.vercel.app/?tab=marketplace",
  index,
}: PlatformCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Smooth 3D parallax tilt
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 25, stiffness: 180 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [0, 1], [4, -4]);
  const rotateY = useTransform(smoothMouseX, [0, 1], [-4, 4]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY],
  );

  const handlePointerEnter = useCallback(() => setIsHovered(true), []);
  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  const isHighlighted = id === "workflow";

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="h-full [perspective:1000px]"
    >
      <motion.div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`relative flex flex-col justify-between w-full rounded-[28px] sm:rounded-[32px] p-7 sm:p-8 md:p-8 overflow-hidden transition-all duration-500 group select-none min-h-[460px] sm:min-h-[480px] md:min-h-[500px] ${
          isHighlighted
            ? "border border-purple-500/25 hover:border-purple-500/40 shadow-[0_0_40px_-15px_rgba(168,85,247,0.14)] hover:shadow-[0_0_60px_-10px_rgba(168,85,247,0.22)] bg-[#0b0a15]/95 backdrop-blur-2xl"
            : "border border-white/[0.06] hover:border-white/[0.12] shadow-[0_25px_60px_-25px_rgba(0,0,0,0.95)] hover:shadow-[0_30px_70px_-20px_rgba(0,0,0,0.98)] bg-[#0a0913]/95 backdrop-blur-2xl"
        }`}
      >
        {/* Subtle Specular Top Highlight */}
        <div
          className={`absolute inset-x-0 top-0 h-[1px] pointer-events-none ${
            isHighlighted
              ? "bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"
              : "bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
          }`}
        />

        {/* Dynamic Hover Spotlight */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-[28px] sm:rounded-[32px] bg-[radial-gradient(circle_at_var(--x,_50%)_var(--y,_50%),rgba(168,85,247,0.08),transparent_65%)]"
            style={
              {
                "--x": `${smoothMouseX.get() * 100}%`,
                "--y": `${smoothMouseY.get() * 100}%`,
              } as React.CSSProperties
            }
          />
        )}

        {/* 3D Isometric Artwork Stage (Upper Portion) */}
        <div className="absolute top-0 right-0 left-0 h-[62%] pointer-events-none overflow-hidden rounded-t-[28px] sm:rounded-t-[32px] z-0 [transform-style:preserve-3d]">
          {/* Ambient Diffused Glow behind artwork */}
          <div
            className={`absolute top-6 right-6 w-56 h-56 rounded-full blur-3xl pointer-events-none transition-all duration-500 ${
              isHighlighted
                ? "bg-purple-600/[0.14] group-hover:bg-purple-600/[0.22]"
                : "bg-violet-600/[0.10] group-hover:bg-violet-600/[0.16]"
            }`}
          />

          {/* Floating Artwork Layer with Subtle Parallax */}
          <motion.div
            animate={{
              y: [-2, 3, -2],
            }}
            transition={{
              duration: 4.8 + index * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              transform: "translateZ(20px)",
            }}
            className="relative w-full h-full flex items-center justify-end"
          >
            <div className="relative w-full h-full [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)]">
              <Image
                src={image}
                alt={title.replace("\n", " ")}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={index === 0}
                className="object-cover object-right-top transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
          </motion.div>
        </div>

        {/* TOP ROW: Pure Minimal Square Icon Box (100% Symmetrical on all cards) */}
        <div className="relative z-10 flex items-start">
          <div className="w-11 h-11 rounded-[16px] bg-white/[0.03] border border-white/[0.07] flex items-center justify-center text-white/75 group-hover:text-white transition-colors duration-300 shadow-sm backdrop-blur-sm">
            {icon === "layers" && <Layers className="w-5 h-5 stroke-[1.6]" />}
            {icon === "zap" && <Zap className="w-5 h-5 stroke-[1.6]" />}
            {icon === "shield" && <Shield className="w-5 h-5 stroke-[1.6]" />}
          </div>
        </div>

        {/* BOTTOM CONTENT: Title, Description, and Action Link */}
        <div className="relative z-10 flex flex-col mt-auto pt-6">
          {/* Two-Line Title */}
          <h3 className="text-[23px] sm:text-[25px] md:text-[26px] tracking-tight leading-[1.18] text-white">
            {(() => {
              const lines = title.split("\n");
              if (lines.length > 1) {
                return (
                  <>
                    <span className="font-bold text-white block">{lines[0]}</span>
                    <span className="font-bold text-white block">{lines[1]}</span>
                  </>
                );
              }
              return <span className="font-bold text-white block">{title}</span>;
            })()}
          </h3>

          {/* Description */}
          <p className="text-neutral-400 text-[13px] sm:text-[13.5px] font-normal leading-[1.65] mt-3 mb-6 max-w-[280px]">
            {description}
          </p>

          {/* Explorar CTA */}
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-[13px] sm:text-sm font-medium tracking-wide transition-colors duration-200 group/link self-start"
          >
            <span>{exploreLabel}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
