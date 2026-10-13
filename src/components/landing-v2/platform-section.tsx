"use client";

import { useTranslations } from "next-intl";
import { useRef, useEffect, useState } from "react";
import { ConstellationBackground } from "@/components/ui/constellation-background";
import { SectionReveal } from "@/components/ui/section-reveal";
import { SpotlightCard, MagneticElement } from "@/components/landing-v2/lab";

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

  return (
    <section id="platform" ref={sectionRef} className="py-16 sm:py-24 bg-brand-dark relative overflow-hidden">
      {/* Drifting constellation (subtle ambience) */}
      <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(ellipse_75%_80%_at_50%_50%,#000_20%,transparent_90%)]">
        <ConstellationBackground nodeCount={55} nodeAlpha={0.3} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header (Linear Style Typography + AI Badge) */}
        <div className="mb-16 sm:mb-24 max-w-5xl text-left">


          <SectionReveal as="h2" delay={80} className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] tracking-tight leading-[1.15] block">
            <span className="text-white font-semibold">{t("title")}. </span>
            <span className="text-brand-slate-light font-medium">{t("subtitle")}</span>
          </SectionReveal>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7 max-w-sm sm:max-w-md md:max-w-none mx-auto">
          {PLATFORM_CARDS.map((card, index) => (
            <PlatformCard key={card.id} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PlatformCard({
  card,
  index,
}: {
  card: (typeof PLATFORM_CARDS)[0];
  index: number;
}) {
  const t = useTranslations(`platform.cards.${card.id}`);
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  // Only autoplay when the card is actually visible to the user.
  // Saves a lot of GPU/CPU on long pages where 3 mp4 videos would
  // otherwise decode permanently even off-screen.
  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [inView]);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    // Keep playing on desktop hover-out only if in view (mobile-first)
    if (videoRef.current && !inView) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0.01;
    }
  };

  return (
    <SectionReveal delay={index * 100} className="h-full">
      <SpotlightCard
        glowColor={card.glowColor}
        className="flex flex-col h-full border border-white/[0.08] bg-brand-surface-alt transition-[box-shadow] duration-500 hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.9)]"
      >
        <div
          ref={wrapperRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative flex flex-col h-full overflow-hidden"
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
      <div className="relative aspect-video sm:aspect-[16/10] overflow-hidden rounded-t-2xl bg-[#0a0f14]">
        <video
          ref={videoRef}
          src={`${card.video}#t=0.01`}
          preload="metadata"
          muted
          loop
          playsInline
          disablePictureInPicture
          suppressHydrationWarning
          className={`absolute inset-0 w-full h-full object-cover sm:opacity-80 group-hover:opacity-100 transition-opacity duration-500 ${card.videoClassName || ""}`}
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
          <span className="text-[10px] font-mono tracking-[0.18em] text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300 uppercase">
            {t("tag")}
          </span>

          {/* Arrow button with magnetic spring attraction */}
          <MagneticElement strength={0.4}>
            <div className="w-7 h-7 rounded-full border border-white/[0.08] flex items-center justify-center bg-white/[0.03] group-hover:bg-brand-neon group-hover:border-transparent transition-all duration-300 -rotate-45 group-hover:rotate-0 shadow-sm">
              <svg className="w-3 h-3 text-neutral-400 group-hover:text-black transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </MagneticElement>
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
      </SpotlightCard>
    </SectionReveal>
  );
}
