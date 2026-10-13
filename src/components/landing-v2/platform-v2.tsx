"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Cpu, ShieldCheck, Activity, Layers, ArrowRight, CheckCircle2, Play } from "lucide-react";

interface ArchPillar {
  id: "mesh" | "security" | "telemetry";
  title: string;
  badge: string;
  description: string;
  specs: string[];
  metrics: { label: string; value: string };
  videoPreview?: string;
}

const ARCH_PILLARS: ArchPillar[] = [
  {
    id: "mesh",
    title: "Orquestación en Malla y Cascada de Inteligencia",
    badge: "IA-MESH BROKER",
    description:
      "Ruteo dinámico con cascada de tolerancia a fallos: balanceo predictivo entre Groq Llama 3.3, OpenAI GPT-4o y nodos locales Ollama con latencia ultra-baja y recuperación automática.",
    specs: [
      "Cascada determinista: Groq → OpenAI → Ollama",
      "Caché de prompts con TTL adaptativo en memoria",
      "Blindaje anti-alucinación y validación semántica",
    ],
    metrics: { label: "Disponibilidad de Malla", value: "99.995%" },
    videoPreview: "/sesion/1.mp4",
  },
  {
    id: "security",
    title: "Aislamiento Criptográfico y Residencia Multi-Tenant",
    badge: "ZERO-TRUST PIPELINE",
    description:
      "Cada sesión y dato de usuario opera bajo partición criptográfica estricta. Verificación de claims JWT sin estado, cifrado AES-256 en reposo y tránsito.",
    specs: [
      "Aislamiento estricto por user_id = $1 en cada consulta SQL",
      "Validación de revocación de sesiones con IssuedAt",
      "Rotación continua de secretos criptográficos",
    ],
    metrics: { label: "Cifrado de Nodos", value: "AES-256-GCM" },
    videoPreview: "/sesion/2.mp4",
  },
  {
    id: "telemetry",
    title: "Telemetría Global y Rendimiento en Tiempo Real",
    badge: "EDGE TELEMETRY",
    description:
      "Monitoreo predictivo a 60Hz. Diagnóstico en vivo de latencias por región, detección proactiva de cuellos de botella y balanceo de carga geo-distribuido.",
    specs: [
      "Métricas en vivo transmitidas vía WebSockets de baja latencia",
      "Detección de anomalías en menos de 50 milisegundos",
      "Cumplimiento estricto de residencia de datos regional",
    ],
    metrics: { label: "Latencia RTT Promedio", value: "3.2ms" },
    videoPreview: "/sesion/3.mp4",
  },
];

export function PlatformV2() {
  const [activeTab, setActiveTab] = useState<ArchPillar["id"]>("mesh");
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  const currentPillar = ARCH_PILLARS.find((p) => p.id === activeTab) || ARCH_PILLARS[0];

  return (
    <section id="platform" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Encabezado de Sección */}
      <div className="max-w-3xl mb-16 text-left">
        <div
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md mb-6"
          style={{ boxShadow: "inset 0 1px 0 0 rgba(255, 255, 255, 0.12)" }}
        >
          <Layers className="w-3.5 h-3.5 text-violet-400" />
          <span className="font-mono text-[11px] font-medium tracking-[0.16em] uppercase text-white/80">
            ARQUITECTURA DE INFRAESTRUCTURA
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.12] mb-6">
          Diseñado para Cargas Críticas.{" "}
          <span className="text-white/50 font-normal">
            Sin Puntos Únicos de Fallo.
          </span>
        </h2>
        <p className="text-base sm:text-lg text-white/60 leading-relaxed font-normal">
          Explora los tres pilares fundamentales que convierten a CELAEST en la plataforma más confiable para orquestación de software autónomo.
        </p>
      </div>

      {/* Selector de Pestañas Interactivo */}
      <div className="flex flex-wrap gap-2.5 mb-10 border-b border-white/[0.08] pb-4">
        {ARCH_PILLARS.map((pillar) => {
          const isActive = activeTab === pillar.id;
          return (
            <button
              key={pillar.id}
              onClick={() => {
                setActiveTab(pillar.id);
                setIsPlayingVideo(false);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                isActive
                  ? "bg-white text-black shadow-lg shadow-white/5 scale-[1.02]"
                  : "bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/[0.08] border border-white/5"
              }`}
            >
              {pillar.badge}
            </button>
          );
        })}
      </div>

      {/* Panel de Arquitectura "Show, Don't Tell" con Luz Especular */}
      <div
        className="rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl transition-all duration-300"
        style={{
          boxShadow: `
            inset 0 1px 0 0 rgba(255, 255, 255, 0.15),
            0 24px 48px -12px rgba(0, 0, 0, 0.7)
          `,
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Detalles del Pilar */}
          <div className="lg:col-span-6 flex flex-col text-left">
            <span className="font-mono text-xs text-violet-400 font-semibold tracking-widest uppercase mb-3 block">
              {currentPillar.badge}
            </span>
            <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight leading-snug mb-5">
              {currentPillar.title}
            </h3>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-8">
              {currentPillar.description}
            </p>

            {/* Lista de Especificaciones Técnicas */}
            <div className="flex flex-col gap-3 mb-8">
              {currentPillar.specs.map((spec, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-white/80 font-medium">
                    {spec}
                  </span>
                </div>
              ))}
            </div>

            {/* Métrica Clave */}
            <div className="inline-flex items-center gap-4 p-4 rounded-xl bg-black/40 border border-white/5 w-fit">
              <div>
                <span className="text-[10px] font-mono uppercase text-white/40 block mb-0.5">
                  {currentPillar.metrics.label}
                </span>
                <span className="text-xl font-semibold text-emerald-400 tracking-tight">
                  {currentPillar.metrics.value}
                </span>
              </div>
            </div>
          </div>

          {/* Demostración Visual / Video Optimizado con Play bajo demanda */}
          <div className="lg:col-span-6 relative rounded-xl overflow-hidden bg-black/60 border border-white/10 aspect-video flex items-center justify-center group shadow-xl">
            {isPlayingVideo && currentPillar.videoPreview ? (
              <video
                src={currentPillar.videoPreview}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-violet-950/20 via-black to-black">
                {/* Visualizador de Cockpit de Arquitectura */}
                <div className="w-16 h-16 rounded-2xl bg-white/[0.08] border border-white/10 flex items-center justify-center mb-4 transition-transform group-hover:scale-110 shadow-lg">
                  <Play className="w-6 h-6 text-white ml-0.5" />
                </div>
                <span className="font-semibold text-white text-sm mb-1">
                  Reproducir Demostración de Arquitectura
                </span>
                <span className="text-xs text-white/50 max-w-xs">
                  Haz clic para cargar el flujo de trabajo en vivo sin penalización de datos
                </span>
                <button
                  onClick={() => setIsPlayingVideo(true)}
                  className="absolute inset-0 cursor-pointer w-full h-full opacity-0"
                  aria-label="Reproducir video de demostración"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
