"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { ShieldCheck, Lock, Key, FileCheck, EyeOff, Server } from "lucide-react";

// Carga diferida del núcleo de partículas 3D viewport-gated
const ParticleCore = dynamic(
  () =>
    import("@/components/landing/security/particle-core").then((m) => ({
      default: m.ParticleCore,
    })),
  {
    ssr: false,
    loading: () => <div className="w-60 h-60 md:w-72 md:h-72" />,
  }
);

interface SecurityFeature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  tag: string;
  desc: string;
}

const SECURITY_FEATURES: SecurityFeature[] = [
  {
    icon: Lock,
    title: "Aislamiento Estricto de Datos",
    tag: "MULTI-TENANT ENFORCEMENT",
    desc: "Cada consulta a PostgreSQL está parametrizada obligatoriamente con 'user_id = $1', garantizando segregación absoluta entre clientes.",
  },
  {
    icon: Key,
    title: "Validación de Sesiones sin Estado",
    tag: "JWT REVOCATION AUDIT",
    desc: "Comprobación estricta de IssuedAt contra marcas temporales de revocación para neutralizar tokens comprometidos al instante.",
  },
  {
    icon: EyeOff,
    title: "Cero Filtración de Datos a LLMs",
    tag: "PRIVATE AI PIPELINE",
    desc: "Tus datos nunca entrenan modelos de terceros. Los prompts se anonimizan y procesan en enclaves protegidos con memoria volátil.",
  },
  {
    icon: FileCheck,
    title: "Auditoría Continua de Código",
    tag: "SAST & THREAT MODEL",
    desc: "Quality Gates automatizados con Semgrep y modelado de amenazas antes de cada despliegue a producción.",
  },
];

export function SecurityV2() {
  return (
    <section id="security" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Columna Izquierda: Gráfico 3D Criptográfico */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div
            className="relative p-8 rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col items-center"
            style={{
              boxShadow: "inset 0 1px 0 0 rgba(255, 255, 255, 0.15), 0 24px 48px rgba(0,0,0,0.6)",
            }}
          >
            <div className="relative w-64 h-64 flex items-center justify-center">
              <ParticleCore activeNode="all" />
            </div>
            <div className="mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>NÚCLEO CRIPTOGRÁFICO VERIFICADO</span>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Especificaciones de Seguridad Enterprise */}
        <div className="lg:col-span-7 flex flex-col text-left">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md mb-6 w-fit"
            style={{ boxShadow: "inset 0 1px 0 0 rgba(255, 255, 255, 0.12)" }}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-mono text-[11px] font-medium tracking-[0.16em] uppercase text-white/80">
              SEGURIDAD & CUMPLIMIENTO LEGAL
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.12] mb-6">
            Confianza de Grado Bancario.{" "}
            <span className="text-white/50 font-normal">
              Sin Concesiones Técnicas.
            </span>
          </h2>

          <p className="text-base text-white/65 leading-relaxed mb-10 max-w-xl font-normal">
            La arquitectura de CELAEST fue diseñada para superar las auditorías más hostiles de procurement y cumplimiento en corporaciones internacionales.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SECURITY_FEATURES.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-white/10 backdrop-blur-xl transition-all"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center mb-3">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-violet-400 block mb-1">
                    {item.tag}
                  </span>
                  <h3 className="text-sm font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-white/60 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
