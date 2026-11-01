"use client";

import React, { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Layers, Zap, Shield, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlatformCardProps {
  id: "management" | "workflow" | "ecosystem";
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
        className={cn(
          "relative flex flex-col justify-between w-full rounded-[28px] sm:rounded-[32px] p-6 sm:p-7 md:p-8 overflow-hidden transition-all duration-300 group cursor-pointer select-none aspect-square min-h-[330px] sm:min-h-[350px] md:min-h-[365px]",
          isPopular
            ? "border-2 border-[#a855f7] shadow-[0_0_30px_rgba(168,85,247,0.35),inset_0_0_20px_rgba(168,85,247,0.08)] bg-[#0d0a17]/95"
            : "border border-white/[0.08] hover:border-white/20 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)] bg-[#09090f]/90",
        )}
      >
        {/* Ambient Smoky Background Texture */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <Image
            src={bgImage}
            alt=""
            fill
            className="object-cover opacity-75 group-hover:opacity-95 transition-opacity duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {/* Subtle cursor spotlight */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x,_50%)_var(--y,_50%),rgba(167,139,250,0.15),transparent_65%)]"
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
        <div className="absolute top-1 sm:top-2 right-1 sm:right-2 w-[58%] sm:w-[56%] h-[58%] sm:h-[62%] flex items-center justify-end pointer-events-none z-10 [transform-style:preserve-3d]">
          {/* Ambient Purple Underglow */}
          <div className="absolute w-[85%] h-[85%] rounded-full bg-[#8b5cf6]/20 blur-2xl pointer-events-none group-hover:bg-[#8b5cf6]/35 transition-all duration-500" />

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
              width={480}
              height={360}
              priority={index === 0}
              className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        </div>

        {/* LEFT COLUMN: Icon, Title, Description, and Bottom CTA */}
        <div className="relative z-10 flex flex-col justify-between h-full max-w-[56%] sm:max-w-[53%] pointer-events-auto">
          {/* TOP SECTION: Badge (if popular) + Square Icon Box */}
          <div className="flex flex-col items-start gap-3">
            {isPopular && popularLabel && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.12] backdrop-blur-md shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a78bfa] shadow-[0_0_8px_#a78bfa] animate-pulse" />
                <span className="text-[11px] font-medium tracking-wide text-white/90">
                  {popularLabel}
                </span>
              </div>
            )}

            {/* Square Glass Icon Box */}
            <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/[0.1] backdrop-blur-md flex items-center justify-center text-white/80 group-hover:text-white group-hover:scale-105 transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]">
              {icon === "layers" && <Layers className="w-5 h-5 stroke-[1.75]" />}
              {icon === "zap" && <Zap className="w-5 h-5 stroke-[1.75]" />}
              {icon === "shield" && <Shield className="w-5 h-5 stroke-[1.75]" />}
            </div>
          </div>

          {/* MIDDLE SECTION: Title & Description */}
          <div className="my-auto pt-3 pb-2">
            <h3 className="text-xl sm:text-[22px] md:text-[23px] font-bold text-white tracking-tight leading-[1.2] group-hover:text-purple-100 transition-colors duration-300 whitespace-pre-line">
              {title}
            </h3>

            <p className="text-zinc-400 text-[12.5px] sm:text-[13px] md:text-[13.5px] font-normal leading-[1.6] mt-2.5">
              {description}
            </p>
          </div>

          {/* BOTTOM SECTION: Explorar CTA */}
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-zinc-300 group-hover:text-white text-[13px] font-medium tracking-wide transition-colors duration-300 pt-2"
          >
            <span>{exploreLabel}</span>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-purple-300 group-hover:translate-x-1 transition-all duration-300" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
