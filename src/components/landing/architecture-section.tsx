"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Cpu,
  Workflow,
  Boxes,
  ArrowRight,
  Lock,
  Activity,
  CheckCircle2,
  Sparkles,
  Zap,
  Server,
  Layers,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import Link from "next/link";

// ============================================================================
// MICRO-SCHEMATIC 1: GOBERNANZA & MULTI-TENANT
// ============================================================================
function GovernanceSchematic() {
  return (
    <div className="w-full bg-[#08080f]/90 rounded-xl p-4 border border-white/[0.04] flex flex-col justify-between min-h-[220px]">
      {/* Top tenant identity bar */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.05]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-purple-500/10 flex items-center justify-center text-purple-400">
            <Lock className="w-3.5 h-3.5" />
          </div>
          <span className="font-mono text-[11px] text-white/70 tracking-tight">
            tenant_id: org_9f81a7b
          </span>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
          AES-256
        </span>
      </div>

      {/* Role hierarchy tree */}
      <div className="py-3 flex flex-col gap-2">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-white/40 font-mono">Owner</span>
          <span className="text-white/80 font-medium">Control Total • Biling</span>
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_6px_rgba(168,85,247,0.6)]" />
        </div>
        <div className="w-full h-px bg-white/[0.04]" />
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-white/40 font-mono">Admin</span>
          <span className="text-white/80 font-medium">Políticas & API Keys</span>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_6px_rgba(96,165,250,0.6)]" />
        </div>
        <div className="w-full h-px bg-white/[0.04]" />
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-white/40 font-mono">Member</span>
          <span className="text-white/80 font-medium">Ejecución Acotada</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
        </div>
      </div>

      {/* Security boundary footer */}
      <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-[10px] text-white/40">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Aislamiento estricto de datos
        </span>
        <span className="font-mono text-white/50">RBAC Active</span>
      </div>
    </div>
  );
}

// ============================================================================
// MICRO-SCHEMATIC 2: IA MESH & ROUTING EN CASCADA
// ============================================================================
function MeshSchematic() {
  return (
    <div className="w-full bg-[#08080f]/90 rounded-xl p-4 border border-white/[0.04] flex flex-col justify-between min-h-[220px]">
      {/* Central broker node */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.05]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-blue-500/10 flex items-center justify-center text-blue-400">
            <Cpu className="w-3.5 h-3.5" />
          </div>
          <span className="font-mono text-[11px] text-white/70">celaest-core:8085</span>
        </div>
        <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
          Cascade AI
        </span>
      </div>

      {/* Downstream LLM channels */}
      <div className="py-2.5 space-y-2">
        <div className="flex items-center justify-between text-[11px] bg-white/[0.02] px-2.5 py-1.5 rounded-lg border border-white/[0.03]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            <span className="text-white/90 font-medium">Gemini 1.5 Pro</span>
          </div>
          <span className="font-mono text-[10px] text-white/40">11ms • Primary</span>
        </div>

        <div className="flex items-center justify-between text-[11px] bg-white/[0.02] px-2.5 py-1.5 rounded-lg border border-white/[0.03]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
            <span className="text-white/90 font-medium">Claude 3.5</span>
          </div>
          <span className="font-mono text-[10px] text-white/40">16ms • Reasoning</span>
        </div>

        <div className="flex items-center justify-between text-[11px] bg-white/[0.02] px-2.5 py-1.5 rounded-lg border border-white/[0.03]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_6px_rgba(168,85,247,0.8)]" />
            <span className="text-white/90 font-medium">DeepSeek R1</span>
          </div>
          <span className="font-mono text-[10px] text-white/40">Fallback Ready</span>
        </div>
      </div>

      {/* Failover latency status */}
      <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-[10px] text-white/40">
        <span className="flex items-center gap-1.5">
          <Zap className="w-3 h-3 text-amber-400" />
          Conmutación sub-15ms
        </span>
        <span className="font-mono text-emerald-400">0% Downtime</span>
      </div>
    </div>
  );
}

// ============================================================================
// MICRO-SCHEMATIC 3: MOTOR DE AUTOMATIZACION (EXECUTION GRAPH)
// ============================================================================
function PipelineSchematic() {
  return (
    <div className="w-full bg-[#08080f]/90 rounded-xl p-4 border border-white/[0.04] flex flex-col justify-between min-h-[220px]">
      {/* Top execution header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.05]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <Workflow className="w-3.5 h-3.5" />
          </div>
          <span className="font-mono text-[11px] text-white/70">pipeline_graph: 301</span>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
          Deterministic
        </span>
      </div>

      {/* Mini Flow Pipeline */}
      <div className="py-2 flex flex-col items-center">
        {/* Node 1: Trigger */}
        <div className="flex items-center gap-2 bg-[#10101b] border border-white/[0.07] px-3 py-1 rounded-lg w-full max-w-[190px] shadow-sm">
          <div className="w-4 h-4 rounded-full bg-[#22c55e] flex items-center justify-center shrink-0">
            <svg
              viewBox="0 0 10 10"
              className="w-2.5 h-2.5 text-black fill-current translate-x-[0.5px]"
            >
              <polygon points="2,1 8,5 2,9" />
            </svg>
          </div>
          <span className="text-[11px] font-medium text-white tracking-tight truncate">
            Trigger Event
          </span>
        </div>

        {/* Vertical connector line */}
        <div className="w-px h-3 bg-purple-500/50 my-0.5" />

        {/* Node 2: Action */}
        <div className="flex items-center gap-2 bg-[#10101b] border border-white/[0.07] px-3 py-1 rounded-lg w-full max-w-[190px] shadow-sm">
          <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-[#a855f7] fill-current shrink-0">
            <path d="M9 1L3 9h4l-1 6 6-8h-4l1-6z" />
          </svg>
          <span className="text-[11px] font-medium text-white tracking-tight truncate">
            IA Mesh Action
          </span>
        </div>

        {/* Symmetrical wishbone branching wires */}
        <div className="w-full max-w-[190px] h-3 relative my-0.5">
          <svg
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
            viewBox="0 0 190 12"
          >
            <path
              d="M 95 0 L 95 4 Q 95 8 75 8 L 45 8 Q 35 8 35 12"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="1.2"
              strokeOpacity="0.6"
            />
            <path
              d="M 95 0 L 95 4 Q 95 8 115 8 L 145 8 Q 155 8 155 12"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="1.2"
              strokeOpacity="0.6"
            />
          </svg>
        </div>

        {/* Forked Child Nodes */}
        <div className="grid grid-cols-2 gap-2 w-full max-w-[190px]">
          <div className="flex items-center gap-1.5 bg-[#10101b] border border-white/[0.06] px-2 py-0.5 rounded-lg">
            <div className="w-3 h-3 rounded-full bg-[#22c55e] flex items-center justify-center shrink-0">
              <svg
                viewBox="0 0 12 12"
                className="w-2 h-2 text-black fill-none stroke-current stroke-[2.5]"
              >
                <polyline points="2.5 6 4.5 8.5 9.5 3" />
              </svg>
            </div>
            <span className="text-[10px] text-white/90 truncate">Completado</span>
          </div>

          <div className="flex items-center gap-1.5 bg-[#10101b] border border-white/[0.06] px-2 py-0.5 rounded-lg">
            <div className="w-3 h-3 rounded-[3px] bg-[#f87171] flex items-center justify-center shrink-0">
              <svg
                viewBox="0 0 12 12"
                className="w-2 h-2 text-white fill-none stroke-current stroke-[2.5]"
              >
                <line x1="3" y1="3" x2="9" y2="9" />
                <line x1="9" y1="3" x2="3" y2="9" />
              </svg>
            </div>
            <span className="text-[10px] text-white/90 truncate">Reintentar</span>
          </div>
        </div>
      </div>

      {/* Determinism footer */}
      <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-[10px] text-white/40">
        <span className="flex items-center gap-1.5">
          <Activity className="w-3 h-3 text-purple-400" />
          Trazabilidad 100%
        </span>
        <span className="font-mono text-white/50">Zero Side-Effects</span>
      </div>
    </div>
  );
}

// ============================================================================
// MICRO-SCHEMATIC 4: CATALOGO DE ACTIVOS & SOLUCIONES
// ============================================================================
function MarketplaceSchematic() {
  return (
    <div className="w-full bg-[#08080f]/90 rounded-xl p-4 border border-white/[0.04] flex flex-col justify-between min-h-[220px]">
      {/* Top catalog header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.05]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-amber-500/10 flex items-center justify-center text-amber-400">
            <Boxes className="w-3.5 h-3.5" />
          </div>
          <span className="font-mono text-[11px] text-white/70">market_registry: v2</span>
        </div>
        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
          Verified
        </span>
      </div>

      {/* 4 unboxed authentic vector badges */}
      <div className="grid grid-cols-2 gap-2 py-2">
        {/* Sheets Bridge */}
        <div className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-2 flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none">
            <path
              d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z"
              fill="#0F9D58"
            />
            <path d="M14 2V8H20L14 2Z" fill="#87CEAB" />
            <rect x="7" y="11" width="10" height="7" rx="0.8" fill="#0B8043" />
            <path d="M7 14.5H17" stroke="#ffffff" strokeWidth="0.8" />
            <path d="M12 11V18" stroke="#ffffff" strokeWidth="0.8" />
          </svg>
          <div className="min-w-0">
            <div className="text-[10px] font-semibold text-white truncate">Sheets Bridge</div>
            <div className="text-[9px] text-white/40">v1.2.3</div>
          </div>
        </div>

        {/* Slack Connector */}
        <div className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-2 flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none">
            <path
              d="M6 15a2 2 0 1 1-2-2h2v2zm1 0a2 2 0 1 1 4 0v5a2 2 0 1 1-4 0v-5z"
              fill="#E01E5A"
            />
            <path d="M9 6a2 2 0 1 1 2-2v2H9zm0 1a2 2 0 1 1 0 4H4a2 2 0 1 1 0-4h5z" fill="#36C5F0" />
            <path
              d="M18 9a2 2 0 1 1 2 2h-2V9zm-1 0a2 2 0 1 1-4 0V4a2 2 0 1 1 4 0v5z"
              fill="#2EB67D"
            />
            <path
              d="M15 18a2 2 0 1 1-2 2v-2h2zm0-1a2 2 0 1 1 0-4h5a2 2 0 1 1 0 4h-5z"
              fill="#ECB22E"
            />
          </svg>
          <div className="min-w-0">
            <div className="text-[10px] font-semibold text-white truncate">Slack API</div>
            <div className="text-[9px] text-white/40">v3.1.0</div>
          </div>
        </div>

        {/* Lingua AI */}
        <div className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-2 flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-purple-500/20 flex items-center justify-center shrink-0">
            <Sparkles className="w-3 h-3 text-purple-300" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-semibold text-white truncate">Lingua Suite</div>
            <div className="text-[9px] text-purple-300/80">Active AI</div>
          </div>
        </div>

        {/* Auto Sync */}
        <div className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-2 flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-blue-500/20 flex items-center justify-center shrink-0">
            <span className="text-[10px] font-mono text-cyan-300 font-bold">&lt;/&gt;</span>
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-semibold text-white truncate">Auto Sync</div>
            <div className="text-[9px] text-cyan-300/80">v2.4.1</div>
          </div>
        </div>
      </div>

      {/* Deployment status footer */}
      <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-[10px] text-white/40">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          Despliegue en 1-clic
        </span>
        <span className="font-mono text-white/50">40+ Assets</span>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN ARCHITECTURE SECTION COMPONENT
// ============================================================================
export function ArchitectureSection() {
  const t = useTranslations("architecture");

  const layers = [
    {
      key: "governance",
      tag: t("layers.governance.tag"),
      title: t("layers.governance.title"),
      description: t("layers.governance.description"),
      signal: t("layers.governance.signal"),
      metric: t("layers.governance.metric"),
      schematic: <GovernanceSchematic />,
      accentColor: "from-purple-500/20 via-transparent to-transparent",
    },
    {
      key: "mesh",
      tag: t("layers.mesh.tag"),
      title: t("layers.mesh.title"),
      description: t("layers.mesh.description"),
      signal: t("layers.mesh.signal"),
      metric: t("layers.mesh.metric"),
      schematic: <MeshSchematic />,
      accentColor: "from-blue-500/20 via-transparent to-transparent",
    },
    {
      key: "pipeline",
      tag: t("layers.pipeline.tag"),
      title: t("layers.pipeline.title"),
      description: t("layers.pipeline.description"),
      signal: t("layers.pipeline.signal"),
      metric: t("layers.pipeline.metric"),
      schematic: <PipelineSchematic />,
      accentColor: "from-emerald-500/20 via-transparent to-transparent",
    },
    {
      key: "ecosystem",
      tag: t("layers.ecosystem.tag"),
      title: t("layers.ecosystem.title"),
      description: t("layers.ecosystem.description"),
      signal: t("layers.ecosystem.signal"),
      metric: t("layers.ecosystem.metric"),
      schematic: <MarketplaceSchematic />,
      accentColor: "from-amber-500/20 via-transparent to-transparent",
    },
  ];

  return (
    <section
      id="architecture"
      className="py-20 sm:py-28 lg:py-32 bg-brand-dark relative overflow-hidden"
    >
      {/* Section Demarcation Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none z-20" />

      {/* Atmospheric lighting backdrop */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[radial-gradient(circle_at_50%_50%,rgba(167,139,250,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <SectionHeader
          badge={t("badge")}
          title1={t("title1")}
          title2={t("title2")}
          subtitle={t("subtitle")}
        />

        {/* 4-Layer Connected Architecture Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mt-12">
          {layers.map((layer, index) => (
            <motion.div
              key={layer.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="group relative flex flex-col justify-between bg-white/[0.015] hover:bg-white/[0.03] rounded-2xl p-5 sm:p-6 border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
            >
              {/* Subtle top accent gradient */}
              <div
                className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${layer.accentColor} rounded-t-2xl opacity-60 group-hover:opacity-100 transition-opacity`}
              />

              {/* Layer Header */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono tracking-widest text-brand-neon font-bold uppercase">
                    {layer.tag}
                  </span>
                  <span className="text-[10px] font-mono text-white/40 bg-white/[0.04] px-2 py-0.5 rounded-full border border-white/[0.05]">
                    {layer.metric}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight mb-2 leading-snug">
                  {layer.title}
                </h3>

                <p className="text-xs sm:text-[13px] text-brand-slate-light leading-relaxed">
                  {layer.description}
                </p>
              </div>

              {/* Live Micro-Schematic Graphic */}
              <div className="my-2">{layer.schematic}</div>

              {/* Bottom Micro-Signal */}
              <div className="pt-4 mt-3 border-t border-white/[0.04] flex items-center justify-between text-[11px] text-white/50">
                <span className="text-white/60 font-medium text-[11px]">{layer.signal}</span>
                <ChevronRight className="w-3.5 h-3.5 text-white/30 group-hover:text-brand-neon group-hover:translate-x-0.5 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Strategic Macro-Synthesis Row */}
        <div className="mt-16 sm:mt-20 pt-12 sm:pt-16 border-t border-white/[0.06]">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.05] mb-3">
                <div className="w-1.5 h-1.5 bg-brand-neon rounded-full" />
                <span className="text-[10px] font-bold tracking-widest text-brand-accent uppercase">
                  {t("synthesis.badge")}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                {t("synthesis.title")}
              </h3>
            </div>

            <Link
              href="#platform"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-white/80 hover:text-white px-5 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-200 shrink-0"
            >
              <span>{t("synthesis.cta")}</span>
              <ArrowRight className="w-4 h-4 text-brand-neon" />
            </Link>
          </div>

          {/* 3 Strategic Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="p-6 rounded-xl bg-white/[0.01] border border-white/[0.04]">
              <div className="text-lg sm:text-xl font-bold text-white mb-2 tracking-tight">
                {t("synthesis.columns.unification.title")}
              </div>
              <p className="text-xs sm:text-sm text-brand-slate-light leading-relaxed">
                {t("synthesis.columns.unification.desc")}
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/[0.01] border border-white/[0.04]">
              <div className="text-lg sm:text-xl font-bold text-white mb-2 tracking-tight">
                {t("synthesis.columns.uptime.title")}
              </div>
              <p className="text-xs sm:text-sm text-brand-slate-light leading-relaxed">
                {t("synthesis.columns.uptime.desc")}
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/[0.01] border border-white/[0.04]">
              <div className="text-lg sm:text-xl font-bold text-white mb-2 tracking-tight">
                {t("synthesis.columns.speed.title")}
              </div>
              <p className="text-xs sm:text-sm text-brand-slate-light leading-relaxed">
                {t("synthesis.columns.speed.desc")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
