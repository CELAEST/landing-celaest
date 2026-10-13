"use client";

import React from "react";
import { ArrowRight, ShieldCheck, Heart, Terminal, Github } from "lucide-react";
import { Logo } from "@/components/ui/logo";

export function FooterV2() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#040811] relative overflow-hidden">
      {/* Banner de Cierre / Conversión Final */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div
          className="relative rounded-3xl bg-gradient-to-b from-white/[0.09] to-white/[0.02] border border-white/15 p-8 sm:p-14 text-center overflow-hidden shadow-2xl"
          style={{
            boxShadow: "inset 0 1px 0 0 rgba(255, 255, 255, 0.2), 0 30px 60px -15px rgba(0,0,0,0.8)",
          }}
        >
          {/* Luz cenital de fondo */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-48 bg-violet-500/20 rounded-full blur-3xl"
          />

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="font-mono text-xs text-violet-300 font-semibold uppercase tracking-widest block mb-4">
              DESPLIEGUE INSTANTÁNEO EN 3 PASOS
            </span>
            <h3 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-tight mb-5">
              Empieza a Orquestar con Confianza Absoluta Hoy Mismo.
            </h3>
            <p className="text-sm sm:text-base text-white/60 leading-relaxed mb-8">
              Prueba gratuita de 14 días. Sin tarjeta de crédito requerida. Configura tu clúster de malla en menos de 120 segundos.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <a
                href="https://celaest-dashboard.vercel.app/signup"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-white/90 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-2"
              >
                <span>Crear Cuenta Gratuita</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://celaest-dashboard.vercel.app/"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/10 font-medium text-xs transition-all flex items-center justify-center gap-2"
              >
                <Terminal className="w-3.5 h-3.5 text-white/50" />
                <span>Explorar Sandbox</span>
              </a>
            </div>
          </div>
        </div>

        {/* Columnas del Footer y Metadatos */}
        <div className="mt-16 pt-12 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-white/[0.08] border border-white/10 flex items-center justify-center p-1">
              <Logo className="w-full h-full text-white" />
            </div>
            <span className="font-semibold text-white text-sm tracking-tight">CELAEST INC.</span>
            <span className="text-xs text-white/40 font-mono">
              © {new Date().getFullYear()} Todos los derechos reservados.
            </span>
          </div>

          {/* Estado de la Red en Vivo */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[11px] text-white/70">
              32/32 REGIONES ACTIVAS // LATENCIA 3.2ms
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
