"use client";

import React, { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Layers, Zap, Shield, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlatformCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  bgImage: string;
  icon: "layers" | "zap" | "shield";
  isPopular?: boolean;
  popularLabel?: string;
  exploreLabel: string;
  href?: string;
  index: number;
}

export function PlatformCard({
  title,
  description,
  image,
  bgImage,
  icon,
  isPopular,
  popularLabel,
  exploreLabel,
  href = "https://celaest-dashboard.vercel.app/?tab=marketplace",
  index,
}: PlatformCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for smooth 3D tilt
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [0, 1], [8, -8]);
  const rotateY = useTransform(smoothMouseX, [0, 1], [-8, 8]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY],
  );

  const handlePointerEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
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
        className={cn(
          "relative flex flex-col justify-between h-full min-h-[460px] sm:min-h-[480px] p-6 sm:p-7 rounded-[28px] overflow-hidden transition-all duration-300 group cursor-pointer select-none",
          isPopular
            ? "border-2 border-[#a78bfa]/80 shadow-[0_0_35px_-5px_rgba(167,139,250,0.35)] bg-[#0b0a13]/95"
            : "border border-white/[0.08] hover:border-white/20 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] bg-[#09090f]/90",
        )}
      >
        {/* Ambient Card Background Image & Glow */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <Image
            src={bgImage}
            alt=""
            fill
            className="object-cover opacity-60 group-hover:opacity-85 transition-opacity duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {/* Subtle cursor spotlight */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x,_50%)_var(--y,_50%),rgba(167,139,250,0.14),transparent_65%)]"
              style={
                {
                  "--x": `${smoothMouseX.get() * 100}%`,
                  "--y": `${smoothMouseY.get() * 100}%`,
                } as React.CSSProperties
              }
            />
          )}
        </div>

        {/* Top Header Row: Icon + Badge (if popular) */}
        <div className="relative z-10 flex items-center justify-between w-full mb-2">
          {/* Top-Left Glass Icon Badge */}
          <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.14] backdrop-blur-md flex items-center justify-center text-white/80 group-hover:text-white group-hover:scale-105 transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
            {icon === "layers" && <Layers className="w-5 h-5 stroke-[1.75]" />}
            {icon === "zap" && <Zap className="w-5 h-5 stroke-[1.75]" />}
            {icon === "shield" && <Shield className="w-5 h-5 stroke-[1.75]" />}
          </div>

          {/* Top-Right "Más popular" Badge (only on central card) */}
          {isPopular && popularLabel && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/70 border border-purple-500/40 backdrop-blur-md shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a78bfa] shadow-[0_0_8px_#a78bfa] animate-pulse" />
              <span className="text-[11px] font-semibold tracking-wide text-purple-200">
                {popularLabel}
              </span>
            </div>
          )}
        </div>

        {/* Upper Center / 3D Isometric Illustration */}
        <div className="relative z-10 w-full h-[180px] sm:h-[195px] flex items-center justify-center my-auto [transform-style:preserve-3d]">
          {/* Ambient Purple Underglow */}
          <div className="absolute w-[65%] h-[65%] rounded-full bg-[#8b5cf6]/20 blur-2xl pointer-events-none group-hover:bg-[#8b5cf6]/30 transition-all duration-500" />

          {/* Floating Illustration with Parallax Depth */}
          <motion.div
            animate={{
              y: [-4, 4, -4],
            }}
            transition={{
              duration: 4.5 + index * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              transform: "translateZ(30px)",
            }}
            className="relative w-full h-full flex items-center justify-center"
          >
            <Image
              src={image}
              alt={title}
              width={420}
              height={300}
              priority={index === 0}
              className="max-h-[175px] sm:max-h-[190px] w-auto object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        </div>

        {/* Bottom Content: Title, Description & CTA */}
        <div className="relative z-10 flex flex-col mt-4 pt-2">
          <h3 className="text-[21px] sm:text-[23px] font-bold text-white tracking-tight leading-snug group-hover:text-purple-100 transition-colors duration-300">
            {title}
          </h3>

          <p className="text-zinc-400 text-[13.5px] sm:text-[14px] leading-relaxed mt-2.5 line-clamp-3">
            {description}
          </p>

          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-zinc-400 group-hover:text-white text-[13px] font-medium tracking-wide transition-colors duration-300 self-start"
          >
            <span>{exploreLabel}</span>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-purple-300 group-hover:translate-x-1 transition-all duration-300" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
