"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { ArrowRight, ShieldCheck, Terminal, Sparkles } from "lucide-react";

// Carga diferida del cockpit 3D sin bloquear la pintura crítica del H1 (LCP Instantáneo)
const InteractiveMeshCockpit = dynamic(
  () =>
    import("./hero/interactive-mesh-cockpit").then((m) => ({
      default: m.InteractiveMeshCockpit,
    })),
  {
    ssr: false,
    loading: () => <CockpitSkeleton />,
  }
);

function CockpitSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="w-full h-[320px] sm:h-[380px] lg:h-[420px] rounded-2xl bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
      <div className="flex flex-col items-center gap-3 text-white/40">
        <div className="w-8 h-8 rounded-full border border-white/20 border-t-white/80 animate-spin" />
        <span className="font-mono text-xs uppercase tracking-widest">
          INICIALIZANDO MALLA DE CLÚSTER
        </span>
      </div>
    </div>
  );
}

export function HeroV2() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Fondo de Profundidad Obsidiana con Gradientes Radiales Suaves (Anti-Neón Clutter) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-violet-600/10 via-violet-900/5 to-transparent rounded-full blur-[120px] -z-10"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Columna Izquierda: Mensaje Central y Llamada a la Acción (LCP Hero) */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
          {/* Badge con Borde Especular y Tipografía Mono */}
          <div
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-xl mb-6 shadow-sm"
            style={{
              boxShadow: "inset 0 1px 0 0 rgba(255, 255, 255, 0.15)",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[11px] font-medium tracking-[0.16em] uppercase text-white/80">
              CELAEST AI MESH ENGINE // V2.0
            </span>
          </div>

          {/* Titular Principal H1 (Fluido con jerarquía de alto contraste) */}
          <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-semibold text-white tracking-[-0.035em] leading-[1.08] mb-6">
            Inteligencia Distribuida con Latencia{" "}
            <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
              Sub-Milisegundo
            </span>
            .
          </h1>

          {/* Subtítulo: El mecanismo explicado en lenguaje humano */}
          <p className="text-base sm:text-lg text-white/65 leading-relaxed max-w-xl mb-8 font-normal">
            Orquestación descentralizada de modelos de IA, tolerancia a fallos en cascada y residencia de datos en 32 regiones globales sin dependencias monolíticas.
          </p>

          {/* CTAs: Acción Primaria (Sin Fricción) + Secundaria (Arquitectura) */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
            <a
              href="#pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-white/90 active:scale-[0.98] transition-all shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            >
              <span>Desplegar Clúster Ahora</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#platform"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white/90 hover:text-white border border-white/10 font-medium text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            >
              <Terminal className="w-4 h-4 text-white/50" />
              <span>Ver Topología de Red</span>
            </a>
          </div>

          {/* Micro-Social Proof / Garantías Enterprise */}
          <div className="flex items-center gap-6 mt-10 pt-6 border-t border-white/[0.08] text-white/40 text-xs font-mono">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400/80" /> SOC2 COMPLIANT
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-violet-400/80" /> 99.99% SLA
            </span>
            <span className="hidden sm:inline-block">ZERO VENDOR LOCK-IN</span>
          </div>
        </div>

        {/* Columna Derecha: Cockpit Interactivo de Malla R3F ("Show, Don't Tell") */}
        <div className="lg:col-span-6 w-full z-10">
          <Suspense fallback={<CockpitSkeleton />}>
            <InteractiveMeshCockpit />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
