"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, Play } from "lucide-react";
import { ConstellationBackground } from "@/components/ui/constellation-background";

export function HeroSection({ splineBackground }: { splineBackground?: React.ReactNode }) {
  const t = useTranslations("hero");

  const marqueeItems = t.raw("marquee.items") as string[];
  // Duplicamos el array para que el loop sea sin saltos.
  const marqueeLoop = [...marqueeItems, ...marqueeItems];

  return (
    <section className="relative min-h-screen flex flex-col justify-end lg:justify-center overflow-hidden bg-brand-dark pt-24 sm:pt-32 pb-6 sm:pb-10 lg:pb-16 cursor-default">
      {/* Spline 3D Background — injected via Server Component Composition */}
      {splineBackground}

      {/* Responsive gradient overlays */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {/* Mobile: bottom-heavy gradient so robot shows at top */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/70 to-brand-dark/20 lg:hidden" />
        {/* Desktop: left-to-right gradient */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-brand-dark/80 via-brand-dark/30 to-transparent" />
        {/* Bottom fade for stats */}
        <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-brand-dark/70 to-transparent" />
        {/* Subtle neon glows */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-brand-neon/5 to-transparent blur-[100px] sm:blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-brand-neon-blue/5 to-transparent blur-[100px] sm:blur-[120px]" />
      </div>

      {/* Drifting constellation — sits above Spline (z-0) and gradients (z-1), below content (z-10).
          On desktop the mask is weighted to the left so it doesn't compete with the robot on the right. */}
      <div className="absolute inset-0 z-[2] pointer-events-none [mask-image:radial-gradient(ellipse_70%_75%_at_30%_50%,#000_25%,transparent_95%)]">
        <ConstellationBackground nodeCount={50} nodeAlpha={0.25} />
      </div>

      {/* Content — pointer-events-none lets mouse pass through to Spline */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none">

        {/* Text Content */}
        <div className="max-w-2xl mb-8 sm:mb-12 lg:mb-16 pt-4 sm:pt-10 lg:pt-0 text-center lg:text-left mx-auto lg:mx-0">
          {/* Badge */}
          <div
            className="animate-fade-up inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-brand-gray/40 border border-brand-neon/20 rounded-full mb-6 sm:mb-8 backdrop-blur-md"
          >
            <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-brand-neon rounded-full animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.6)]" />
            <span className="text-xs sm:text-sm font-medium text-brand-soft tracking-wide">{t("badge")}</span>
          </div>

          {/* Main Headline */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[4.5rem] font-black mb-4 sm:mb-6 leading-[1.05]"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.05em",
            }}
          >
             <span className="text-gray-300 drop-shadow-md">
              {t("headline1")}
             </span>{" "}
            <span className="bg-gradient-to-r from-brand-neon to-brand-neon-blue bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]">
               <br className="hidden sm:block" /> {t("headline2")}
            </span>
          </h1>

          {/* Subheadline — LCP element. Uses system fonts to avoid web-font
              swap delay (would push LCP from ~0.9 s to ~5 s on slow networks). */}
          <p
            className="text-base sm:text-lg md:text-xl text-brand-slate-light max-w-xl mb-8 sm:mb-10 lg:mb-12 leading-relaxed mx-auto lg:mx-0"
            style={{
              fontFamily:
                "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
            }}
          >
            {t("subheadline1")} {t("subheadline2")}
          </p>

          {/* CTA Buttons */}
          <div
            className="animate-fade-up delay-300 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3 sm:gap-4"
          >
            <a
              href="https://celaest-dashboard.vercel.app/?tab=marketplace"
              className="pointer-events-auto group relative w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-brand-neon text-brand-dark font-bold rounded-xl overflow-hidden shadow-[0_0_40px_rgba(34,211,238,0.2)] hover:shadow-[0_0_60px_rgba(34,211,238,0.4)] transition-all flex items-center justify-center gap-3 text-sm sm:text-base"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-brand-neon to-brand-neon-blue opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10 flex items-center gap-2">
                {t("browseCTA")}
                <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            <button className="pointer-events-auto group w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-transparent border-2 border-brand-slate text-brand-ice font-bold rounded-xl hover:border-brand-neon hover:bg-brand-neon/5 transition-all flex items-center justify-center gap-3 text-sm sm:text-base">
              <Play className="w-4 sm:w-5 h-4 sm:h-5" />
              {t("watchDemo")}
            </button>
          </div>
        </div>

        {/* Announcement marquee — reemplaza la antigua franja de stats */}
        <div className="animate-fade-up delay-400 w-full relative mt-4 sm:mt-8 lg:mt-16">
          <div className="pointer-events-auto relative z-10 w-full mx-auto rounded-2xl sm:rounded-3xl border border-white/10 bg-brand-gray/30 backdrop-blur-md shadow-2xl overflow-hidden">
            {/* hairline accent superior */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-neon/50 to-transparent" />

            {/* track con fade lateral */}
            <div className="py-6 sm:py-8 md:py-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,#000_8%,#000_92%,transparent_100%)]">
              <div className="animate-marquee flex w-max items-center whitespace-nowrap">
                {marqueeLoop.map((item, i) => (
                  <div key={i} className="flex items-center shrink-0">
                    <span className="font-display font-medium text-[13px] sm:text-[17px] md:text-[19px] tracking-[-0.02em] leading-none text-white/90 px-7 sm:px-12 md:px-16">
                      {item}
                    </span>
                    <span className="w-px h-6 sm:h-8 md:h-9 bg-white/10 shrink-0" aria-hidden="true" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
