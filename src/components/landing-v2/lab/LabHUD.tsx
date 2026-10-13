"use client";

import React from "react";
import { useLab } from "./LabContext";
import Link from "next/link";
import { useLocale } from "next-intl";

export function LabHUD() {
  const {
    settings,
    toggleSetting,
    fps,
    velocity,
    isInspectorOpen,
    setIsInspectorOpen,
  } = useLab();
  const locale = useLocale();

  return (
    <aside
      aria-label="Design Lab Controller"
      className="fixed bottom-6 right-6 z-50 font-sans pointer-events-auto"
    >
      {/* Minimized Pill */}
      {!isInspectorOpen ? (
        <button
          type="button"
          onClick={() => setIsInspectorOpen(true)}
          className="group flex items-center gap-3 px-4 py-2.5 rounded-full bg-black/80 backdrop-blur-2xl border border-white/10 shadow-2xl hover:border-brand-neon/40 hover:bg-black/90 transition-all duration-300"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          <span className="text-[11px] font-mono tracking-[0.16em] uppercase text-white/90 group-hover:text-white font-semibold">
            DESIGN LAB
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-brand-neon">
            {fps} FPS
          </span>
        </button>
      ) : (
        /* Expanded HUD Deck */
        <div className="w-80 sm:w-96 rounded-2xl bg-[#070b14]/90 backdrop-blur-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] p-4 sm:p-5 text-left text-white animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.08]">
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <div>
                <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-white">
                  CELAEST LAB 0.9
                </h4>
                <p className="text-[10px] text-white/40 tracking-wider">
                  EXPERIMENTAL WORKSPACE
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={`/${locale}`}
                className="text-[10px] font-mono text-zinc-400 hover:text-brand-neon px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors"
                title="Volver a V1 oficial"
              >
                V1 Oficial
              </Link>
              <button
                type="button"
                onClick={() => setIsInspectorOpen(false)}
                className="w-6 h-6 rounded-md flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                title="Minimizar panel"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Real-time Telemetry Grid */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.05]">
              <div className="text-[9px] font-mono uppercase text-white/40 tracking-wider">
                Frame Rate
              </div>
              <div className="text-sm font-mono font-semibold text-brand-neon flex items-baseline gap-1 mt-0.5">
                {fps} <span className="text-[10px] text-white/40 font-normal">FPS</span>
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.05]">
              <div className="text-[9px] font-mono uppercase text-white/40 tracking-wider">
                Pointer Velocity
              </div>
              <div className="text-sm font-mono font-semibold text-emerald-400 flex items-baseline gap-1 mt-0.5">
                {velocity} <span className="text-[10px] text-white/40 font-normal">px/s</span>
              </div>
            </div>
          </div>

          {/* Craft Experiment Toggles */}
          <div className="space-y-2 mb-4">
            <div className="text-[10px] font-mono uppercase text-white/40 tracking-widest px-0.5">
              Active Craft Experiments
            </div>

            {/* Spotlight Toggle */}
            <button
              type="button"
              onClick={() => toggleSetting("spotlightEnabled")}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all text-left ${
                settings.spotlightEnabled
                  ? "bg-brand-neon/[0.08] border-brand-neon/30 text-white"
                  : "bg-white/[0.02] border-white/[0.05] text-white/40 hover:text-white/60"
              }`}
            >
              <div className="flex flex-col">
                <span className="text-xs font-medium">Specular Spotlight</span>
                <span className="text-[10px] text-white/40">Linear radial cursor sheen</span>
              </div>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                  settings.spotlightEnabled
                    ? "bg-brand-neon/20 text-brand-neon"
                    : "bg-white/5 text-white/40"
                }`}
              >
                {settings.spotlightEnabled ? "ON" : "OFF"}
              </span>
            </button>

            {/* Magnetic Springs Toggle */}
            <button
              type="button"
              onClick={() => toggleSetting("magneticSprings")}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all text-left ${
                settings.magneticSprings
                  ? "bg-indigo-500/[0.08] border-indigo-500/30 text-white"
                  : "bg-white/[0.02] border-white/[0.05] text-white/40 hover:text-white/60"
              }`}
            >
              <div className="flex flex-col">
                <span className="text-xs font-medium">Magnetic Springs</span>
                <span className="text-[10px] text-white/40">Framer Motion pointer pull</span>
              </div>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                  settings.magneticSprings
                    ? "bg-indigo-500/20 text-indigo-400"
                    : "bg-white/5 text-white/40"
                }`}
              >
                {settings.magneticSprings ? "ON" : "OFF"}
              </span>
            </button>

            {/* 3D Tilt Gyroscope */}
            <button
              type="button"
              onClick={() => toggleSetting("tilt3d")}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all text-left ${
                settings.tilt3d
                  ? "bg-emerald-500/[0.08] border-emerald-500/30 text-white"
                  : "bg-white/[0.02] border-white/[0.05] text-white/40 hover:text-white/60"
              }`}
            >
              <div className="flex flex-col">
                <span className="text-xs font-medium">3D Spatial Tilt</span>
                <span className="text-[10px] text-white/40">Dynamic perspective & inertia</span>
              </div>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                  settings.tilt3d
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-white/5 text-white/40"
                }`}
              >
                {settings.tilt3d ? "ON" : "OFF"}
              </span>
            </button>

            {/* Volumetric Aura */}
            <button
              type="button"
              onClick={() => toggleSetting("volumetricAura")}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all text-left ${
                settings.volumetricAura
                  ? "bg-purple-500/[0.08] border-purple-500/30 text-white"
                  : "bg-white/[0.02] border-white/[0.05] text-white/40 hover:text-white/60"
              }`}
            >
              <div className="flex flex-col">
                <span className="text-xs font-medium">Volumetric Light Aura</span>
                <span className="text-[10px] text-white/40">Spatial atmosphere behind Spline</span>
              </div>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                  settings.volumetricAura
                    ? "bg-purple-500/20 text-purple-400"
                    : "bg-white/5 text-white/40"
                }`}
              >
                {settings.volumetricAura ? "ON" : "OFF"}
              </span>
            </button>
          </div>

          {/* Footer note */}
          <div className="text-[9px] font-mono text-white/30 text-center tracking-wide pt-1">
            LAB SANDBOX · CELAEST ENTERPRISE ENGINE
          </div>
        </div>
      )}
    </aside>
  );
}
