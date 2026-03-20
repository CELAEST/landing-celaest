"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useRef } from "react";

const PLATFORM_CARDS = [
  {
    id: "management",
    image: "/sesion/1.webp",
    video: "/sesion/1.mp4",
  },
  {
    id: "workflow",
    image: "/sesion/2.webp",
    video: "/sesion/2.mp4",
  },
  {
    id: "ecosystem",
    image: "/sesion/3.webp",
    video: "/sesion/3.mp4",
    videoClassName: "object-[80%_center]", // Shifts the image viewport horizontally so the 3D element moves left
  },
];

export function PlatformSection() {
  const t = useTranslations("platform");

  return (
    <section className="py-24 sm:py-32 bg-brand-dark relative overflow-hidden">
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
            <span className="text-[#888] font-medium">{t("subtitle")}</span>
          </motion.h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
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

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      // Regresar al frame inicial al terminar el hover
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 * (index + 2), duration: 0.5 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col h-full rounded-[2rem] border border-white/[0.05] bg-[#050505] overflow-hidden hover:border-white/10 hover:bg-[#0A0A0A] hover:shadow-[0_8px_32px_-12px_rgba(255,255,255,0.05)] transition-all duration-500 cursor-pointer"
    >
      {/* Decorative Glow completely outside the video */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-neon/20 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none will-change-opacity" />

      {/* Media Container: Unaltered video element per instructions */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-t-[2rem] bg-[#0A0A0A] border-b border-white/[0.04]">
        {/* Un solo video sin imágenes extra. El navegador extrae su propio primer frame. */}
        <video
          ref={videoRef}
          src={card.video}
          preload="auto"
          muted
          loop
          playsInline
          disablePictureInPicture
          className={`absolute inset-0 w-full h-full object-cover transform-gpu ${card.videoClassName || ""}`}
        />

        {/* Minimal gradient strictly at bottom edge to blend into dark card gracefully */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#050505] to-transparent z-10 transition-colors duration-300 opacity-60" />
      </div>

      {/* Content Area styled explicitly to match the uploaded reference image */}
      <div className="relative p-6 sm:p-8 flex flex-col flex-1 z-10">
        <div className="mb-6 flex items-center justify-between">
          {/* Tag Pill (Gray with cyan dot as in reference) */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.05]">
            <div className="w-1.5 h-1.5 bg-brand-neon rounded-full animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
            <span className="text-[10px] font-bold tracking-widest text-[#888] group-hover:text-[#ccc] transition-colors duration-300 uppercase">
              {t("tag")}
            </span>
          </div>

          {/* Interactive Arrow from the reference design layout */}
          <div className="w-8 h-8 rounded-full border border-white/[0.05] flex items-center justify-center bg-white/[0.02] group-hover:bg-brand-neon group-hover:border-brand-neon transition-all duration-300 transform -rotate-45 group-hover:rotate-0 group-hover:scale-110">
            <svg
              className="w-3.5 h-3.5 text-[#888] group-hover:text-black transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3 group-hover:text-brand-neon transition-colors duration-400">
          {t("title")}
        </h3>

        <p className="text-brand-slate-light text-sm sm:text-base leading-relaxed line-clamp-3">
          {t("description")}
        </p>

        {/* Explorar -> Bottom layout link */}
        <div className="flex items-center gap-1.5 text-[#555] group-hover:text-brand-neon transition-colors duration-300 text-[13px] font-semibold mt-auto border-t border-white/[0.03] pt-4">
          <span>Explorar</span>
          <svg
            className="w-3.5 h-3.5 translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}
