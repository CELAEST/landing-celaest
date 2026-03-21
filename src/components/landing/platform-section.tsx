"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useRef, useEffect, useCallback, useState } from "react";

const PLATFORM_CARDS = [
  {
    id: "management",
    video: "/sesion/1.mp4",
    accentColor: "rgba(34,211,238,1)",
    glowColor: "rgba(34,211,238,0.15)",
  },
  {
    id: "workflow",
    video: "/sesion/2.mp4",
    accentColor: "rgba(34,211,238,1)",
    glowColor: "rgba(34,211,238,0.12)",
  },
  {
    id: "ecosystem",
    video: "/sesion/3.mp4",
    videoClassName: "object-[80%_center]",
    accentColor: "rgba(34,211,238,1)",
    glowColor: "rgba(34,211,238,0.10)",
  },
];

export function PlatformSection() {
  const t = useTranslations("platform");
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Mark section as visible when scrolled into view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="platform" ref={sectionRef} className="py-16 sm:py-24 bg-brand-dark relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-brand-neon/50 to-transparent opacity-50" />
      <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-brand-neon/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[0%] right-[0%] w-[40%] h-[40%] bg-brand-neon-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header (Linear Style Typography + AI Badge) */}
        <div className="mb-16 sm:mb-24 max-w-5xl text-left">
          {/* Subtle AI Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-neon/5 border border-brand-neon/20 backdrop-blur-sm"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-brand-neon animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            <span className="text-[11px] font-bold tracking-[0.15em] text-brand-neon uppercase">
              Plataforma de Automatización con IA
            </span>
          </motion.div>

          {/* Main Title / Subtitle Block */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] tracking-tight leading-[1.15]"
          >
            <span className="text-white font-semibold">{t("title")}. </span>
            <span className="text-brand-slate-light font-medium">{t("subtitle")}</span>
          </motion.h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7">
          {PLATFORM_CARDS.map((card, index) => (
            <PlatformCard key={card.id} card={card} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PlatformCard({
  card,
  index,
  isVisible,
}: {
  card: (typeof PLATFORM_CARDS)[0];
  index: number;
  isVisible: boolean;
}) {
  const t = useTranslations(`platform.cards.${card.id}`);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative flex flex-col rounded-2xl border border-white/[0.06] bg-brand-surface-alt overflow-hidden cursor-pointer transition-[border-color,box-shadow,transform,opacity] duration-700 ease-out hover:border-white/[0.14] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.9)] ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Top cyan glow line — visible on hover only (GPU: opacity) */}
      <div
        className="absolute top-0 left-0 right-0 h-px z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `linear-gradient(to right, transparent, ${card.accentColor}, transparent)` }}
      />

      {/* Corner ambient glow — Zero-cost radial gradient (no blur filter) */}
      <div
        className="absolute -top-32 -right-32 w-64 h-64 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ 
          background: `radial-gradient(circle at center, ${card.glowColor} 0%, transparent 70%)` 
        }}
      />

      {/* ── VIDEO ZONE ───────────────────────────────────── */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl bg-[#0a0f14]">
        {/* Video natively renders first frame on load. Played explicitly on hover to maintain 100/100 performance without GPU tax. */}
        <video
          ref={videoRef}
          src={`${card.video}#t=0.01`}
          preload="metadata"
          muted
          loop
          playsInline
          disablePictureInPicture
          suppressHydrationWarning
          className={`absolute inset-0 w-full h-full object-cover ${card.videoClassName || ""}`}
        >
          <track kind="captions" src="data:text/vtt," label="no-captions" />
        </video>
        {/* Bottom fade into card body */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-brand-surface-alt to-transparent z-10 pointer-events-none" />
        {/* Side vignettes for depth */}
        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-brand-surface-alt to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-brand-surface-alt to-transparent z-10 pointer-events-none" />
      </div>

      {/* ── CONTENT ZONE ─────────────────────────────────── */}
      <div className="flex flex-col flex-1 px-5 pt-4 pb-6 relative z-20">

        {/* Tag + Arrow row */}
        <div className="flex items-center justify-between mb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.05]">
            <div className="w-1.5 h-1.5 bg-brand-neon rounded-full shadow-[0_0_6px_rgba(34,211,238,0.6)]" />
            <span className="text-[10px] font-bold tracking-[0.14em] text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300 uppercase">
              {t("tag")}
            </span>
          </div>

          {/* Arrow button */}
          <div className="w-7 h-7 rounded-full border border-white/[0.05] flex items-center justify-center bg-white/[0.02] group-hover:bg-brand-neon group-hover:border-transparent transition-all duration-300 -rotate-45 group-hover:rotate-0">
            <svg className="w-3 h-3 text-neutral-500 group-hover:text-black transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-[22px] sm:text-[24px] font-bold text-white tracking-tight mb-3 group-hover:text-brand-neon transition-colors duration-300 leading-snug">
          {t("title")}
        </h3>

        {/* Description */}
        <p className="text-zinc-400 text-sm sm:text-[15px] leading-[1.7] line-clamp-3 mb-auto">
          {t("description")}
        </p>

        {/* Explorar link */}
        <div className="mt-5 pt-4 border-t border-white/[0.05] flex items-center gap-2 text-zinc-400 group-hover:text-brand-neon transition-colors duration-300 text-[13px] font-semibold tracking-wide">
          <span>Explorar</span>
          <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>

    </div>
  );
}
