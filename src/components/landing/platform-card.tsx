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

  // Motion values for smooth 3D tilt
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 25, stiffness: 180 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [0, 1], [5, -5]);
  const rotateY = useTransform(smoothMouseX, [0, 1], [-5, 5]);

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
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
        className="relative flex flex-col justify-between w-full rounded-[28px] sm:rounded-[32px] p-7 sm:p-8 md:p-9 overflow-hidden transition-all duration-500 group cursor-pointer select-none aspect-[1/1.28] min-h-[420px] sm:min-h-[440px] md:min-h-[455px] border-0 shadow-[0_25px_60px_-25px_rgba(0,0,0,0.95)] bg-[#09080e]/95 backdrop-blur-2xl"
      >
        {/* Pure CSS Ambient Atmosphere (Borderless & clean) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[28px] sm:rounded-[32px]">
          {id === "management" && (
            <>
              <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.12),transparent_70%)]" />
              <div className="absolute -bottom-10 -right-10 w-52 h-52 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.10),transparent_70%)]" />
            </>
          )}

          {id === "workflow" && (
            <>
              <div className="absolute -top-8 -right-8 w-64 h-64 rounded-full bg-[radial-gradient(circle,rgba(147,51,234,0.16),transparent_70%)]" />
              <div className="absolute -bottom-8 -right-8 w-52 h-52 rounded-full bg-[radial-gradient(circle,rgba(126,34,206,0.10),transparent_70%)]" />
            </>
          )}

          {id === "ecosystem" && (
            <>
              <div className="absolute top-1/4 -right-10 w-60 h-60 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.14),transparent_70%)]" />
              <div className="absolute -bottom-8 -right-8 w-52 h-52 rounded-full bg-[radial-gradient(circle,rgba(147,51,234,0.10),transparent_70%)]" />
            </>
          )}

          {/* Subtle cursor spotlight */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x,_50%)_var(--y,_50%),rgba(167,139,250,0.08),transparent_65%)]"
              style={
                {
                  "--x": `${smoothMouseX.get() * 100}%`,
                  "--y": `${smoothMouseY.get() * 100}%`,
                } as React.CSSProperties
              }
            />
          )}
        </div>

        {/* TOP-RIGHT: 3D Isometric Illustration */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-[48%] h-[50%] flex items-center justify-end pointer-events-none z-10 [transform-style:preserve-3d]">
          {/* Ambient Purple Underglow (Subtle & diffused) */}
          <div className="absolute w-[85%] h-[85%] rounded-full bg-[#a78bfa]/12 blur-3xl pointer-events-none group-hover:bg-[#a78bfa]/22 transition-all duration-500" />

          {/* Floating Illustration with Parallax Depth */}
          <motion.div
            animate={{
              y: [-3, 3, -3],
            }}
            transition={{
              duration: 4.2 + index * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              transform: "translateZ(30px)",
            }}
            className="relative w-full h-full flex items-center justify-end p-2"
          >
            <Image
              src={image}
              alt={title}
              width={420}
              height={340}
              priority={index === 0}
              className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        </div>

        {/* LEFT COLUMN: Icon, Title, Description, and Bottom CTA */}
        <div className="relative z-10 flex flex-col justify-between h-full max-w-[62%] sm:max-w-[58%] pointer-events-auto">
          {/* TOP SECTION: Clean Square Icon Box (Borderless & minimal) */}
          <div className="w-12 h-12 rounded-[16px] bg-white/[0.03] flex items-center justify-center text-white/70 group-hover:text-white transition-colors duration-300">
            {icon === "layers" && <Layers className="w-5 h-5 stroke-[1.5]" />}
            {icon === "zap" && <Zap className="w-5 h-5 stroke-[1.5]" />}
            {icon === "shield" && <Shield className="w-5 h-5 stroke-[1.5]" />}
          </div>

          {/* MIDDLE-LOWER SECTION: Two-Tone Title & Description with generous breathing room */}
          <div className="mt-auto pt-8 pb-1">
            <h3 className="text-[22px] sm:text-[23px] md:text-[24px] tracking-tight leading-[1.2] text-white">
              {(() => {
                const lines = title.split("\n");
                if (lines.length > 1) {
                  return (
                    <>
                      <span className="font-light text-white/75 block">{lines[0]}</span>
                      <span className="font-bold text-white block whitespace-nowrap">
                        {lines[1]}
                      </span>
                    </>
                  );
                }
                return <span className="font-bold text-white block">{title}</span>;
              })()}
            </h3>

            <p className="text-neutral-400 text-[12.5px] sm:text-[13px] font-light leading-[1.65] mt-3.5 max-w-[215px] sm:max-w-[230px]">
              {description}
            </p>
          </div>

          {/* BOTTOM SECTION: Explorar CTA */}
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-neutral-400 group-hover:text-white text-[12.5px] sm:text-[13px] font-normal tracking-wide transition-colors duration-300 pt-5"
          >
            <span>{exploreLabel}</span>
            <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
