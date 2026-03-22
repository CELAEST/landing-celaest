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
import { useState } from "react";
import {
  EnterpriseEdgeIcon,
  EnterpriseVaultIcon,
  EnterpriseLicenseIcon,
  EnterprisePulseIcon,
  EnterpriseDiskIcon,
  EnterpriseStatusBadge,
} from "./products/enterprise-icons";

export function ProductsSection() {
  const t = useTranslations("products");
  const [hoveredNode, setHoveredNode] = useState<"edge" | "vault" | "engine" | null>(null);

  return (
    <section id="products" className="py-16 sm:py-24 bg-brand-deep relative overflow-hidden">
      {/* Background Glows (Subtle, professional) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-brand-neon/50 to-transparent opacity-50" />
      <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-brand-neon/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[0%] right-[0%] w-[40%] h-[40%] bg-brand-neon-blue/5 rounded-full blur-[120px] pointer-events-none" />

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
              <span className="text-[10px] font-semibold tracking-widest text-zinc-400 uppercase">
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
              <span className="text-brand-slate-light font-medium">{t("title2")}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-brand-slate-light text-base sm:text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
            >
              {t("subtitle")} Integre nuestro motor de licenciamiento y distribución en menos de 5
              minutos con nuestro SDK nativo.
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
                className="inline-flex items-center justify-center px-8 py-3.5 bg-neutral-200 text-neutral-900 font-medium rounded-full hover:bg-white transition-colors duration-300 gap-2.5 group"
              >
                {t("exploreCTA")}
                <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-neutral-900 group-hover:translate-x-0.5 transition-all" />
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
              className="relative w-full rounded-[2rem] border border-white/[0.04] bg-brand-dark shadow-[0_0_100px_-20px_rgba(0,0,0,1)] p-6 sm:p-10 lg:p-14 overflow-hidden"
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
                  <div
                    onMouseEnter={() => setHoveredNode("edge")}
                    onMouseLeave={() => setHoveredNode(null)}
                    className={`group w-full rounded-2xl bg-brand-surface border ${hoveredNode === "edge" ? "border-brand-neon/40 bg-brand-surface/80 shadow-[0_0_20px_rgba(34,211,238,0.15)]" : "border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_8px_20px_rgba(0,0,0,0.5)]"} relative transition-all duration-300 cursor-default overflow-hidden`}
                  >
                    {/* Header row */}
                    <div className="flex items-center gap-3.5 p-2.5">
                      <EnterpriseEdgeIcon
                        active={hoveredNode === "edge" || hoveredNode === "engine"}
                      />
                      <div className="flex-1 min-w-0">
                        <div
                          className={`text-[10px] font-bold tracking-[0.05em] uppercase transition-colors duration-300 ${hoveredNode === "edge" ? "text-brand-neon" : "text-zinc-500"} mb-0.5`}
                        >
                          Edge Route
                        </div>
                        <div className="text-[12px] font-mono text-zinc-200 truncate flex items-center justify-between">
                          api.celaest.com/v1
                          <Copy className="w-3 h-3 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" />
                        </div>
                      </div>
                    </div>

                    {/* Enterprise Metric Body */}
                    <div
                      className={`border-t ${hoveredNode === "edge" ? "border-brand-neon/15" : "border-white/[0.04]"} px-3 py-2.5 flex flex-col gap-2 transition-colors duration-300`}
                    >
                      {/* Row 1: Latency */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          {/* LED Indicator */}
                          <svg viewBox="0 0 10 10" className="w-2 h-2 shrink-0">
                            <circle
                              cx="5"
                              cy="5"
                              r="4"
                              fill={
                                hoveredNode === "edge" || hoveredNode === "engine"
                                  ? "#22d3ee"
                                  : "#3f3f46"
                              }
                            />
                            {(hoveredNode === "edge" || hoveredNode === "engine") && (
                              <circle
                                cx="5"
                                cy="5"
                                r="4"
                                fill="none"
                                stroke="#22d3ee"
                                strokeWidth="2"
                                opacity="0.4"
                              />
                            )}
                          </svg>
                          <span
                            className={`text-[10px] font-mono uppercase tracking-wider transition-colors duration-300 ${hoveredNode === "edge" || hoveredNode === "engine" ? "text-zinc-400" : "text-zinc-400"}`}
                          >
                            Latency
                          </span>
                        </div>
                        <span
                          className={`text-[10px] font-mono font-semibold transition-colors duration-300 ${hoveredNode === "edge" || hoveredNode === "engine" ? "text-brand-neon" : "text-zinc-500"}`}
                        >
                          9ms P99
                        </span>
                      </div>

                      {/* Row 2: Throughput bar */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-end gap-[2px] flex-1">
                          {[5, 8, 6, 10, 7, 9, 10, 8, 10, 7, 9, 10].map((h, i) => (
                            <motion.div
                              key={i}
                              className="flex-1 rounded-[1px]"
                              style={{ height: `${h * 1.4}px` }}
                              animate={{
                                backgroundColor:
                                  hoveredNode === "edge" || hoveredNode === "engine"
                                    ? "rgba(34,211,238,0.6)"
                                    : i > 8
                                      ? "rgba(63,63,70,0.5)"
                                      : "rgba(34,211,238,0.15)",
                              }}
                              transition={{ duration: 0.4, delay: i * 0.03 }}
                            />
                          ))}
                        </div>
                        <span
                          className={`text-[10px] font-mono shrink-0 transition-colors duration-300 ${hoveredNode === "edge" || hoveredNode === "engine" ? "text-zinc-400" : "text-zinc-400"}`}
                        >
                          42.8k req/s
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Node: Vault */}
                  <div
                    onMouseEnter={() => setHoveredNode("vault")}
                    onMouseLeave={() => setHoveredNode(null)}
                    className={`group w-full rounded-2xl bg-brand-surface border ${hoveredNode === "vault" ? "border-emerald-500/40 bg-brand-surface/80 shadow-[0_0_20px_rgba(16,185,129,0.15)]" : "border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_8px_20px_rgba(0,0,0,0.5)]"} relative transition-all duration-300 cursor-default overflow-hidden`}
                  >
                    {/* Header row */}
                    <div className="flex items-center gap-3.5 p-2.5">
                      <EnterpriseVaultIcon
                        active={hoveredNode === "vault" || hoveredNode === "engine"}
                      />
                      <div className="flex-1 min-w-0">
                        <div
                          className={`text-[10px] font-bold tracking-[0.05em] uppercase transition-colors duration-300 ${hoveredNode === "vault" ? "text-emerald-500" : "text-zinc-500"} mb-0.5`}
                        >
                          Encrypted Vault
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${hoveredNode === "vault" || hoveredNode === "engine" ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" : "bg-emerald-500/50"} transition-all duration-300`}
                          />
                          <span className="text-[11px] text-zinc-400 font-medium">Synced</span>
                        </div>
                      </div>
                    </div>

                    {/* Enterprise Metric Body */}
                    <div
                      className={`border-t ${hoveredNode === "vault" ? "border-emerald-500/15" : hoveredNode === "engine" ? "border-brand-neon/10" : "border-white/[0.04]"} px-3 py-2.5 flex flex-col gap-2 transition-colors duration-300`}
                    >
                      {/* Row 1: Encryption Tier */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <svg viewBox="0 0 10 10" className="w-2 h-2 shrink-0">
                            <circle
                              cx="5"
                              cy="5"
                              r="4"
                              fill={
                                hoveredNode === "vault" || hoveredNode === "engine"
                                  ? "#10b981"
                                  : "#3f3f46"
                              }
                            />
                          </svg>
                          <span
                            className={`text-[10px] font-mono uppercase tracking-wider transition-colors duration-300 ${hoveredNode === "vault" || hoveredNode === "engine" ? "text-zinc-400" : "text-zinc-400"}`}
                          >
                            Cipher
                          </span>
                        </div>
                        <span
                          className={`text-[10px] font-mono font-semibold transition-colors duration-300 ${hoveredNode === "vault" || hoveredNode === "engine" ? "text-emerald-500" : "text-zinc-500"}`}
                        >
                          AES-256-GCM
                        </span>
                      </div>

                      {/* Row 2: Block segments — representing encrypted data blocks */}
                      <div className="flex items-center gap-1.5">
                        {Array.from({ length: 16 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className="flex-1 h-1.5 rounded-[1px]"
                            animate={{
                              backgroundColor:
                                hoveredNode === "vault" || hoveredNode === "engine"
                                  ? i % 3 === 0
                                    ? "rgba(16,185,129,0.7)"
                                    : i % 3 === 1
                                      ? "rgba(16,185,129,0.3)"
                                      : "rgba(16,185,129,0.5)"
                                  : "rgba(63,63,70,0.4)",
                            }}
                            transition={{ duration: 0.3, delay: i * 0.025 }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. CENTER CONNECTIONS (SVG Pipes) */}
                <div className="hidden lg:flex w-[80px] h-[300px] items-center justify-center shrink-0 relative z-0 overflow-hidden">
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 100 300"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      {/* Vibrant Gradients for the base tracks */}
                      <linearGradient id="neonTrack" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.5" />
                      </linearGradient>
                      <linearGradient id="emeraldTrack" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#34d399" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="#34d399" stopOpacity="0.5" />
                      </linearGradient>

                      {/* Heavy Glow Filters */}
                      <filter id="heavyGlowNeon" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="blur1" />
                        <feGaussianBlur stdDeviation="6" result="blur2" />
                        <feMerge>
                          <feMergeNode in="blur2" />
                          <feMergeNode in="blur1" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                      <filter id="heavyGlowEmerald" x="-50%" y="-50%" width="200%" height="200%">
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
                      strokeWidth={hoveredNode === "edge" || hoveredNode === "engine" ? "5" : "3"}
                      filter="url(#heavyGlowNeon)"
                      vectorEffect="non-scaling-stroke"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
                      animate={{
                        pathLength: [0, 0.25, 0.25],
                        pathOffset: [0, 0.8, 1],
                        opacity:
                          hoveredNode === "edge" || hoveredNode === "engine"
                            ? [0, 1, 0]
                            : [0, 0.3, 0],
                      }}
                      transition={{
                        duration: hoveredNode === "edge" || hoveredNode === "engine" ? 0.8 : 2.5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />

                    <motion.path
                      d="M -8 262 C 50 262, 50 150, 100 150"
                      fill="none"
                      stroke="#10b981" /* Emerald 500 */
                      strokeWidth={hoveredNode === "vault" || hoveredNode === "engine" ? "5" : "3"}
                      filter="url(#heavyGlowEmerald)"
                      vectorEffect="non-scaling-stroke"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
                      animate={{
                        pathLength: [0, 0.25, 0.25],
                        pathOffset: [0, 0.8, 1],
                        opacity:
                          hoveredNode === "vault" || hoveredNode === "engine"
                            ? [0, 1, 0]
                            : [0, 0.3, 0],
                      }}
                      transition={{
                        duration: hoveredNode === "vault" || hoveredNode === "engine" ? 0.9 : 3,
                        repeat: Infinity,
                        ease: "linear",
                        delay: hoveredNode === "vault" || hoveredNode === "engine" ? 0 : 1,
                      }}
                    />
                  </svg>
                </div>

                {/* 3. RIGHT NODE (Main Engine) */}
                <div
                  onMouseEnter={() => setHoveredNode("engine")}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`flex flex-col justify-center h-[300px] w-full lg:w-[320px] shrink-0 relative z-10 transition-all duration-300 ${hoveredNode === "engine" ? "scale-[1.02]" : "scale-100"}`}
                >
                  <div
                    className={`w-full rounded-2xl bg-brand-surface border ${hoveredNode === "engine" ? "border-brand-neon/40 bg-brand-surface/80 shadow-[0_0_25px_rgba(34,211,238,0.15)]" : "border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_20px_40px_-10px_rgba(0,0,0,0.8)]"} flex flex-col relative transition-all duration-300 cursor-default`}
                  >
                    {/* Tiny connector port exactly at the vertical center */}
                    <div
                      className={`hidden lg:block absolute top-1/2 -left-[2px] w-[3px] h-4 ${hoveredNode === "edge" || hoveredNode === "engine" || hoveredNode === "vault" ? "bg-white shadow-[0_0_16px_rgba(255,255,255,1)]" : "bg-brand-neon shadow-[0_0_12px_rgba(34,211,238,1)]"} -translate-y-1/2 z-20 rounded-full transition-colors duration-300`}
                    />

                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-white/[0.04] px-4 py-3.5 bg-brand-gray rounded-t-2xl">
                      <div className="flex items-center gap-2.5">
                        <EnterpriseLicenseIcon active={hoveredNode === "engine"} />
                        <span
                          className={`text-[13px] font-bold tracking-wide transition-colors duration-300 ${hoveredNode === "engine" ? "text-white" : "text-zinc-200"}`}
                        >
                          License Engine
                        </span>
                      </div>
                      <EnterpriseStatusBadge active={hoveredNode === "engine"} />
                    </div>

                    {/* Telemetry Body */}
                    <div className="flex flex-col gap-3.5 p-5 font-mono text-[11px] text-zinc-500">
                      <div className="flex justify-between items-center group">
                        <span className="flex items-center gap-2">
                          <EnterprisePulseIcon active={hoveredNode === "engine"} />
                          <span
                            className={`transition-colors duration-300 ${hoveredNode === "engine" ? "text-white" : ""}`}
                          >
                            Latency
                          </span>
                        </span>
                        <div
                          className={`flex items-center gap-1.5 transition-opacity duration-300 ${hoveredNode === "engine" ? "opacity-100" : "opacity-80 group-hover:opacity-100"}`}
                        >
                          <span
                            className={`${hoveredNode === "engine" ? "text-brand-neon drop-shadow-[0_0_4px_rgba(34,211,238,0.5)]" : "text-emerald-400 font-medium"} transition-all duration-300`}
                          >
                            9ms
                          </span>
                          <span className="text-zinc-700">P99</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center group">
                        <span className="flex items-center gap-2">
                          <EnterpriseDiskIcon active={hoveredNode === "engine"} />
                          <span
                            className={`transition-colors duration-300 ${hoveredNode === "engine" ? "text-white" : ""}`}
                          >
                            Nodes
                          </span>
                        </span>
                        <span
                          className={`transition-colors duration-300 ${hoveredNode === "engine" ? "text-zinc-200" : "text-zinc-400 opacity-80 group-hover:opacity-100"}`}
                        >
                          Global Edge
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 12 }).map((_, i) => (
                            <div
                              key={i}
                              className={`w-1 h-3 rounded-[1px] ${i > 9 ? "bg-zinc-800" : "bg-emerald-400/40"}`}
                            />
                          ))}
                        </div>
                        <span className="text-zinc-400">42.8k req/s</span>
                      </div>
                    </div>

                    {/* Technical Footer */}
                    <div className="px-5 py-2.5 border-t border-white/[0.04] bg-brand-dark flex justify-between items-center">
                      <div className="text-[9px] font-mono text-zinc-400 uppercase">
                        SHA-256 Validated
                      </div>
                      <div className="text-[9px] font-mono text-zinc-400">US-EAST-1</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Minimal floating tech accent */}
              <div className="absolute bottom-5 right-5 flex items-center gap-1.5 opacity-50 z-20 pointer-events-none md:flex">
                <div className="w-1 h-1 rounded-full bg-brand-neon" />
                <span className="text-[9px] font-mono tracking-[0.2em] text-zinc-400 uppercase">
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
