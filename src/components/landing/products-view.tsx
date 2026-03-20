"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Shield,
  Zap,
  Server,
  ArrowRight,
  Activity,
  Database,
  Fingerprint,
  Lock,
  Copy,
} from "lucide-react";

export function ProductsSection() {
  const t = useTranslations("products");

  return (
    <section
      id="products"
      className="py-24 sm:py-32 bg-[#020202] relative overflow-hidden"
    >
      {/* Background Glows (Subtle, professional) */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-neon/[0.03] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/[0.02] rounded-full blur-[120px] translate-y-1/4 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col xl:flex-row items-center gap-12 xl:gap-14">
          {/* LEFT HALF: Content & CTA */}
          <div className="w-full xl:w-[45%] flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.05] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-brand-neon animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
              <span className="text-[10px] font-semibold tracking-widest text-[#a1a1aa] uppercase">
                Developer API & SDK
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] tracking-tight leading-[1.15] mb-6"
            >
              <span className="text-white font-semibold">{t("title1")} </span>
              <span className="text-[#888] font-medium">{t("title2")}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-brand-slate-light text-base sm:text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
            >
              {t("subtitle")} Integre nuestro motor de licenciamiento y
              distribución en menos de 5 minutos con nuestro SDK nativo.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <a
                href="https://celaest-dashboard.vercel.app/?tab=marketplace"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-[#ededed] text-[#111] font-medium rounded-full hover:bg-white transition-colors duration-300 gap-2.5 group"
              >
                {t("exploreCTA")}
                <ArrowRight className="w-4 h-4 text-[#555] group-hover:text-[#111] group-hover:translate-x-0.5 transition-all" />
              </a>
            </motion.div>
          </div>

          {/* RIGHT HALF: Ultra-Premium B2B Infrastructure Diagram */}
          <div className="w-full xl:w-[58%] relative flex items-center justify-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full rounded-[2rem] border border-white/[0.04] bg-[#050505] shadow-[0_0_100px_-20px_rgba(0,0,0,1)] p-6 sm:p-10 lg:p-14 overflow-hidden"
            >
              {/* Vercel-style ultra-subtle grid background */}
              <div
                className="absolute inset-0 z-0"
                style={{
                  backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)`,
                  backgroundSize: "32px 32px",
                  maskImage:
                    "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)",
                  WebkitMaskImage:
                    "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)",
                }}
              />

              {/* Flexbox Graph Architecture */}
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full gap-8 lg:gap-0">
                {/* 1. LEFT NODES (Inputs) */}
                <div className="flex flex-col justify-between h-[300px] w-full lg:w-[260px] shrink-0">
                  {/* Top Node: Route */}
                  <div className="group h-[76px] w-full p-3.5 rounded-xl bg-gradient-to-b from-[#121212] to-[#0a0a0a] border border-white/[0.08] flex items-center gap-3.5 relative shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_8px_20px_rgba(0,0,0,0.5)] transition-all hover:border-white/[0.12]">
                    <div className="w-9 h-9 rounded-lg bg-[#1a1a1a] flex items-center justify-center border border-white/[0.06] shadow-inner shrink-0 group-hover:bg-[#222] transition-colors">
                      <Server className="w-3.5 h-3.5 text-[#a1a1aa]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-medium tracking-[0.05em] text-[#71717a] mb-0.5">
                        Edge Route
                      </div>
                      <div className="text-[13px] font-mono text-[#e4e4e7] truncate flex items-center justify-between">
                        api.celaest.com/v1
                        <Copy className="w-3 h-3 text-[#52525b] opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" />
                      </div>
                    </div>
                  </div>

                  {/* Bottom Node: Vault */}
                  <div className="group h-[76px] w-full p-3.5 rounded-xl bg-gradient-to-b from-[#121212] to-[#0a0a0a] border border-white/[0.08] flex items-center gap-3.5 relative shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_8px_20px_rgba(0,0,0,0.5)] transition-all hover:border-white/[0.12]">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/5 flex items-center justify-center border border-emerald-500/10 shrink-0 group-hover:bg-emerald-500/10 transition-colors">
                      <Lock className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-medium tracking-[0.05em] text-[#71717a] mb-0.5">
                        Encrypted Vault
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
                        <span className="text-xs text-[#a1a1aa] font-medium">
                          Synced
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. CONNECTION TUBES (Natural Organic SVG Bezier Curves) */}
                <div className="hidden lg:block flex-1 relative h-[300px] min-w-[60px] mx-0 z-0">
                  <svg
                    className="absolute top-0 bottom-0 -left-[16px] -right-[16px] w-[calc(100%+32px)] h-full overflow-visible pointer-events-none"
                    viewBox="0 0 100 300"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      {/* Vibrant Gradients for the base tracks */}
                      <linearGradient
                        id="neonTrack"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#22d3ee"
                          stopOpacity="0.1"
                        />
                        <stop
                          offset="100%"
                          stopColor="#22d3ee"
                          stopOpacity="0.5"
                        />
                      </linearGradient>
                      <linearGradient
                        id="emeraldTrack"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#34d399"
                          stopOpacity="0.1"
                        />
                        <stop
                          offset="100%"
                          stopColor="#34d399"
                          stopOpacity="0.5"
                        />
                      </linearGradient>

                      {/* Heavy Glow Filters */}
                      <filter
                        id="heavyGlowNeon"
                        x="-50%"
                        y="-50%"
                        width="200%"
                        height="200%"
                      >
                        <feGaussianBlur stdDeviation="3" result="blur1" />
                        <feGaussianBlur stdDeviation="6" result="blur2" />
                        <feMerge>
                          <feMergeNode in="blur2" />
                          <feMergeNode in="blur1" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                      <filter
                        id="heavyGlowEmerald"
                        x="-50%"
                        y="-50%"
                        width="200%"
                        height="200%"
                      >
                        <feGaussianBlur stdDeviation="3" result="blur1" />
                        <feGaussianBlur stdDeviation="6" result="blur2" />
                        <feMerge>
                          <feMergeNode in="blur2" />
                          <feMergeNode in="blur1" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Base Solid Tracks (Ensures they are NEVER invisible) */}
                    <path
                      d="M -8 38 C 50 38, 50 150, 100 150"
                      fill="none"
                      stroke="url(#neonTrack)"
                      strokeWidth="2"
                      vectorEffect="non-scaling-stroke"
                      strokeLinecap="round"
                    />
                    <path
                      d="M -8 262 C 50 262, 50 150, 100 150"
                      fill="none"
                      stroke="url(#emeraldTrack)"
                      strokeWidth="2"
                      vectorEffect="non-scaling-stroke"
                      strokeLinecap="round"
                    />

                    {/* Highly Visible Animated Data Pulses (Comets) */}
                    <motion.path
                      d="M -8 38 C 50 38, 50 150, 100 150"
                      fill="none"
                      stroke="#06b6d4" /* Cyan 500 */
                      strokeWidth="3"
                      filter="url(#heavyGlowNeon)"
                      vectorEffect="non-scaling-stroke"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
                      animate={{
                        pathLength: [0, 0.2, 0.2],
                        pathOffset: [0, 0.8, 1],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />

                    <motion.path
                      d="M -8 262 C 50 262, 50 150, 100 150"
                      fill="none"
                      stroke="#10b981" /* Emerald 500 */
                      strokeWidth="3"
                      filter="url(#heavyGlowEmerald)"
                      vectorEffect="non-scaling-stroke"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
                      animate={{
                        pathLength: [0, 0.2, 0.2],
                        pathOffset: [0, 0.8, 1],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 1,
                      }}
                    />
                  </svg>
                </div>

                {/* 3. RIGHT NODE (Main Engine) */}
                <div className="flex flex-col justify-center h-[300px] w-full lg:w-[320px] shrink-0 relative z-10">
                  <div className="w-full rounded-2xl bg-[#09090b] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_20px_40px_-10px_rgba(0,0,0,0.8)] flex flex-col relative">
                    {/* Tiny connector port exactly at the vertical center */}
                    <div className="hidden lg:block absolute top-1/2 -left-[2px] w-[3px] h-4 bg-brand-neon -translate-y-1/2 shadow-[0_0_12px_rgba(34,211,238,1)] z-20 rounded-full" />

                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-white/[0.04] px-5 py-4 bg-[#0c0c0e] rounded-t-2xl">
                      <div className="flex items-center gap-2.5">
                        <Fingerprint className="w-4 h-4 text-[#a1a1aa]" />
                        <span className="text-[13px] font-medium text-[#e4e4e7] tracking-wide">
                          License Engine
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-500/20 px-2.5 py-1 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.08),inset_0_1px_0_rgba(16,185,129,0.1)]">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_4px_rgba(52,211,153,0.6)]" />
                        <span className="text-[9px] font-mono tracking-wider font-semibold text-emerald-300">
                          OPERATIONAL
                        </span>
                      </div>
                    </div>

                    {/* Telemetry Body */}
                    <div className="flex flex-col gap-3.5 p-5 font-mono text-[11px] text-[#71717a]">
                      <div className="flex justify-between items-center group">
                        <span className="flex items-center gap-2">
                          <Activity className="w-3.5 h-3.5 text-[#52525b]" />
                          Latency
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[#34d399] font-medium">
                            9ms
                          </span>
                          <span className="text-[#3f3f46]">P99</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-2">
                          <Database className="w-3.5 h-3.5 text-[#52525b]" />
                          Nodes
                        </span>
                        <span className="text-[#a1a1aa]">Global Edge</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 12 }).map((_, i) => (
                            <div
                              key={i}
                              className={`w-1 h-3 rounded-[1px] ${i > 9 ? "bg-[#27272a]" : "bg-[#34d399]/40"}`}
                            />
                          ))}
                        </div>
                        <span className="text-[#a1a1aa]">42.8k req/s</span>
                      </div>
                    </div>

                    {/* Technical Footer */}
                    <div className="px-5 py-2.5 border-t border-white/[0.04] bg-[#050505] flex justify-between items-center">
                      <div className="text-[9px] font-mono text-[#52525b] uppercase">
                        SHA-256 Validated
                      </div>
                      <div className="text-[9px] font-mono text-[#52525b]">
                        US-EAST-1
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Minimal floating tech accent */}
              <div className="absolute bottom-5 right-5 flex items-center gap-1.5 opacity-50 z-20 pointer-events-none hidden md:flex">
                <div className="w-1 h-1 rounded-full bg-brand-neon" />
                <span className="text-[9px] font-mono tracking-[0.2em] text-[#a1a1aa] uppercase">
                  System Optimized
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
