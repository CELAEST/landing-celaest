"use client";

import { useId, memo } from "react";
import "./constellation-pattern.css";

export interface ConstellationBackgroundProps {
  /** Cantidad de nodos (compatibilidad previa; si >= 70 activa el modo astral denso). */
  nodeCount?: number;
  /** Variante explícita de densidad: "default" | "dense". */
  variant?: "default" | "dense";
  /** Alpha base de nodos y constelaciones (0 a 1). */
  nodeAlpha?: number;
  /** Color base en formato "r,g,b" o CSS color. Por defecto blanco "255,255,255". */
  nodeColor?: string;
  /** Clases adicionales para el contenedor. */
  className?: string;
  /** Propiedades heredadas para compatibilidad con llamadas existentes */
  linkDistance?: number;
  linkColor?: string;
  driftSpeed?: number;
  linkOpacity?: number;
  nodeRadius?: number;
}

/**
 * ConstellationBackground (v2 - High Performance SVG Astral Engine)
 *
 * 100% Vectorial · Zero CPU Canvas Loops · GPU-Composited Keyframes · 120 FPS Locked
 *
 * Reemplaza el canvas 2D O(N^2) con un patrón SVG de precisión astronómica.
 * En modo normal brinda elegancia etérea con cero overhead.
 * En modo denso (Footer o nodeCount >= 70), monta una segunda capa de
 * constelaciones desfasada con deriva en sentido opuesto, creando un efecto
 * de profundidad cósmica y paralaje celestial sin costo computacional.
 */
export const ConstellationBackground = memo(function ConstellationBackground({
  nodeCount = 40,
  variant,
  nodeAlpha,
  nodeColor = "255,255,255",
  className = "",
}: ConstellationBackgroundProps) {
  const reactId = useId().replace(/:/g, "_");
  const basePatternId = `celestial-base-${reactId}`;
  const densePatternId = `celestial-dense-${reactId}`;
  const glowGradientId = `celestial-glow-${reactId}`;

  // Activa el modo denso si se especifica la variante o si nodeCount >= 70 (como en Footer)
  const isDense = variant === "dense" || (nodeCount ?? 40) >= 70;

  // Normalización de opacidad para mantener la estética sutil de cada sección
  const effectiveAlpha = Math.min(1, Math.max(0.12, (nodeAlpha ?? 0.35) * 1.6));
  const starFill = `rgb(${nodeColor})`;
  const lineStroke = `rgba(${nodeColor}, 0.14)`;
  const faintLineStroke = `rgba(${nodeColor}, 0.08)`;
  const beaconGlow = `rgba(${nodeColor}, 0.28)`;

  return (
    <div
      aria-hidden="true"
      className={`celestial-pattern-root ${className}`}
      style={{ opacity: effectiveAlpha }}
    >
      <svg
        className="celestial-svg-canvas"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          {/* Radial Gradient para el halo difuso de las estrellas guía (Beacons) */}
          <radialGradient id={glowGradientId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={beaconGlow} />
            <stop offset="45%" stopColor={starFill} stopOpacity="0.35" />
            <stop offset="100%" stopColor={starFill} stopOpacity="0" />
          </radialGradient>

          {/* Patrón A: Capa Cósmica Principal (600x600 px Seamless Astral Network) */}
          <pattern id={basePatternId} width="600" height="600" patternUnits="userSpaceOnUse">
            {/* --- LÍNEAS DE CONSTELACIÓN (HAIRLINE VECTORS) --- */}
            {/* Cluster Alfa (Noroeste): Cruz del Norte */}
            <path
              d="M 70 90 L 140 130 L 210 85 M 140 130 L 155 190 L 230 220 M 70 90 L 155 190"
              stroke={lineStroke}
              strokeWidth="0.85"
              fill="none"
              strokeLinecap="round"
            />
            {/* Cluster Beta (Noreste): Polígono de Orión */}
            <path
              d="M 380 80 L 460 60 L 520 115 L 490 190 L 420 170 L 360 130 Z M 380 80 L 420 170"
              stroke={lineStroke}
              strokeWidth="0.85"
              fill="none"
              strokeLinejoin="round"
            />
            {/* Puente Central: Triángulo de Lira */}
            <path
              d="M 270 260 L 335 230 L 310 310 Z"
              stroke={faintLineStroke}
              strokeWidth="0.75"
              fill="none"
            />
            {/* Cluster Gamma (Suroeste): Trapecio de Casiopea */}
            <path
              d="M 85 360 L 150 320 L 220 380 L 170 460 L 95 490 M 150 320 L 170 460"
              stroke={lineStroke}
              strokeWidth="0.85"
              fill="none"
              strokeLinejoin="round"
            />
            {/* Cluster Delta (Sureste): Arco de Sagitario */}
            <path
              d="M 390 360 L 470 330 L 540 385 L 505 470 L 430 450 L 350 420 Z M 470 330 L 430 450"
              stroke={lineStroke}
              strokeWidth="0.85"
              fill="none"
              strokeLinejoin="round"
            />

            {/* --- NODOS ESTELARES PRINCIPALES --- */}
            {/* Cluster Alfa */}
            <circle cx="70" cy="90" r="1.6" fill={starFill} />
            <circle cx="210" cy="85" r="1.4" fill={starFill} opacity="0.8" />
            <circle cx="155" cy="190" r="1.5" fill={starFill} />
            <circle cx="230" cy="220" r="1.3" fill={starFill} opacity="0.75" />

            {/* Cluster Beta */}
            <circle cx="380" cy="80" r="1.5" fill={starFill} />
            <circle cx="520" cy="115" r="1.4" fill={starFill} opacity="0.85" />
            <circle cx="490" cy="190" r="1.5" fill={starFill} />
            <circle cx="420" cy="170" r="1.3" fill={starFill} opacity="0.75" />
            <circle cx="360" cy="130" r="1.4" fill={starFill} opacity="0.9" />

            {/* Puente Central */}
            <circle cx="270" cy="260" r="1.3" fill={starFill} opacity="0.7" />
            <circle cx="335" cy="230" r="1.4" fill={starFill} opacity="0.8" />

            {/* Cluster Gamma */}
            <circle cx="85" cy="360" r="1.5" fill={starFill} />
            <circle cx="150" cy="320" r="1.7" fill={starFill} />
            <circle cx="220" cy="380" r="1.4" fill={starFill} opacity="0.8" />
            <circle cx="170" cy="460" r="1.6" fill={starFill} />
            <circle cx="95" cy="490" r="1.3" fill={starFill} opacity="0.7" />

            {/* Cluster Delta */}
            <circle cx="390" cy="360" r="1.5" fill={starFill} />
            <circle cx="540" cy="385" r="1.4" fill={starFill} opacity="0.85" />
            <circle cx="505" cy="470" r="1.6" fill={starFill} />
            <circle cx="430" cy="450" r="1.5" fill={starFill} />
            <circle cx="350" cy="420" r="1.3" fill={starFill} opacity="0.75" />

            {/* --- ESTRELLAS GUÍA PULSANTES (BEACONS CON HALO) --- */}
            <g className="celestial-beacon-pulse">
              <circle cx="140" cy="130" r="7.5" fill={`url(#${glowGradientId})`} />
              <circle cx="140" cy="130" r="2.2" fill={starFill} />
            </g>
            <g className="celestial-beacon-pulse-alt">
              <circle cx="460" cy="60" r="8.5" fill={`url(#${glowGradientId})`} />
              <circle cx="460" cy="60" r="2.4" fill={starFill} />
            </g>
            <g className="celestial-beacon-pulse-slow">
              <circle cx="310" cy="310" r="7.0" fill={`url(#${glowGradientId})`} />
              <circle cx="310" cy="310" r="2.1" fill={starFill} />
            </g>
            <g className="celestial-beacon-pulse">
              <circle cx="470" cy="330" r="8.0" fill={`url(#${glowGradientId})`} />
              <circle cx="470" cy="330" r="2.3" fill={starFill} />
            </g>

            {/* --- POLVO CÓSMICO Y MICRO-ESTRELLAS DISPERSAS --- */}
            <circle cx="40" cy="40" r="0.9" fill={starFill} opacity="0.45" />
            <circle cx="180" cy="30" r="1.1" fill={starFill} opacity="0.6" />
            <circle cx="310" cy="50" r="0.8" fill={starFill} opacity="0.4" />
            <circle cx="570" cy="40" r="1.0" fill={starFill} opacity="0.55" />
            <circle cx="20" cy="180" r="0.9" fill={starFill} opacity="0.5" />
            <circle cx="280" cy="140" r="1.2" fill={starFill} opacity="0.65" />
            <circle cx="560" cy="220" r="0.8" fill={starFill} opacity="0.4" />
            <circle cx="30" cy="280" r="1.0" fill={starFill} opacity="0.55" />
            <circle cx="190" cy="290" r="0.9" fill={starFill} opacity="0.45" />
            <circle cx="410" cy="270" r="1.1" fill={starFill} opacity="0.6" />
            <circle cx="580" cy="310" r="0.8" fill={starFill} opacity="0.4" />
            <circle cx="30" cy="420" r="1.0" fill={starFill} opacity="0.5" />
            <circle cx="270" cy="420" r="0.9" fill={starFill} opacity="0.45" />
            <circle cx="330" cy="510" r="1.1" fill={starFill} opacity="0.6" />
            <circle cx="570" cy="520" r="0.8" fill={starFill} opacity="0.4" />
            <circle cx="40" cy="560" r="1.0" fill={starFill} opacity="0.5" />
            <circle cx="210" cy="560" r="0.9" fill={starFill} opacity="0.45" />
            <circle cx="460" cy="560" r="1.2" fill={starFill} opacity="0.65" />
            <circle cx="530" cy="580" r="0.8" fill={starFill} opacity="0.4" />
          </pattern>

          {/* Patrón B: Capa Cósmica Densa (Complementaria para el Footer) */}
          {isDense && (
            <pattern id={densePatternId} width="600" height="600" patternUnits="userSpaceOnUse">
              {/* Constelaciones Intercaladas */}
              <path
                d="M 220 30 L 300 70 L 260 140 L 180 110 Z"
                stroke={lineStroke}
                strokeWidth="0.8"
                fill="none"
              />
              <path
                d="M 490 20 L 550 70 L 510 150 L 570 180"
                stroke={faintLineStroke}
                strokeWidth="0.75"
                fill="none"
              />
              <path
                d="M 40 230 L 110 210 L 130 280 L 70 290 Z"
                stroke={lineStroke}
                strokeWidth="0.8"
                fill="none"
              />
              <path
                d="M 230 220 L 280 180 L 360 200 L 420 240 L 350 270 Z"
                stroke={lineStroke}
                strokeWidth="0.8"
                fill="none"
              />
              <path
                d="M 240 340 L 320 320 L 350 400 L 270 420 Z"
                stroke={lineStroke}
                strokeWidth="0.8"
                fill="none"
              />
              <path
                d="M 30 390 L 80 440 L 140 410 L 200 470 L 260 510"
                stroke={faintLineStroke}
                strokeWidth="0.75"
                fill="none"
              />
              <path
                d="M 440 310 L 510 290 L 560 350 L 490 420 Z"
                stroke={lineStroke}
                strokeWidth="0.8"
                fill="none"
              />
              <path
                d="M 380 480 L 450 510 L 520 470 L 480 550 L 410 560 Z"
                stroke={lineStroke}
                strokeWidth="0.8"
                fill="none"
              />

              {/* Nodos Estelares de Capa B */}
              <circle cx="220" cy="30" r="1.4" fill={starFill} opacity="0.8" />
              <circle cx="260" cy="140" r="1.5" fill={starFill} />
              <circle cx="180" cy="110" r="1.3" fill={starFill} opacity="0.7" />
              <circle cx="490" cy="20" r="1.4" fill={starFill} opacity="0.8" />
              <circle cx="510" cy="150" r="1.5" fill={starFill} />
              <circle cx="570" cy="180" r="1.3" fill={starFill} opacity="0.7" />
              <circle cx="40" cy="230" r="1.4" fill={starFill} opacity="0.75" />
              <circle cx="130" cy="280" r="1.5" fill={starFill} />
              <circle cx="70" cy="290" r="1.3" fill={starFill} opacity="0.7" />
              <circle cx="280" cy="180" r="1.5" fill={starFill} />
              <circle cx="360" cy="200" r="1.4" fill={starFill} opacity="0.8" />
              <circle cx="350" cy="270" r="1.4" fill={starFill} opacity="0.8" />
              <circle cx="240" cy="340" r="1.4" fill={starFill} opacity="0.8" />
              <circle cx="350" cy="400" r="1.5" fill={starFill} />
              <circle cx="270" cy="420" r="1.3" fill={starFill} opacity="0.75" />
              <circle cx="30" cy="390" r="1.3" fill={starFill} opacity="0.7" />
              <circle cx="140" cy="410" r="1.4" fill={starFill} opacity="0.8" />
              <circle cx="260" cy="510" r="1.5" fill={starFill} />
              <circle cx="510" cy="290" r="1.4" fill={starFill} opacity="0.8" />
              <circle cx="490" cy="420" r="1.5" fill={starFill} />
              <circle cx="380" cy="480" r="1.4" fill={starFill} opacity="0.75" />
              <circle cx="520" cy="470" r="1.5" fill={starFill} />
              <circle cx="410" cy="560" r="1.3" fill={starFill} opacity="0.7" />

              {/* Beacons Adicionales de la Capa Densa */}
              <g className="celestial-beacon-pulse-alt">
                <circle cx="300" cy="70" r="8.0" fill={`url(#${glowGradientId})`} />
                <circle cx="300" cy="70" r="2.3" fill={starFill} />
              </g>
              <g className="celestial-beacon-pulse-slow">
                <circle cx="110" cy="210" r="7.5" fill={`url(#${glowGradientId})`} />
                <circle cx="110" cy="210" r="2.2" fill={starFill} />
              </g>
              <g className="celestial-beacon-pulse">
                <circle cx="420" cy="240" r="8.2" fill={`url(#${glowGradientId})`} />
                <circle cx="420" cy="240" r="2.4" fill={starFill} />
              </g>
              <g className="celestial-beacon-pulse-alt">
                <circle cx="320" cy="320" r="7.8" fill={`url(#${glowGradientId})`} />
                <circle cx="320" cy="320" r="2.2" fill={starFill} />
              </g>
              <g className="celestial-beacon-pulse-slow">
                <circle cx="560" cy="350" r="8.5" fill={`url(#${glowGradientId})`} />
                <circle cx="560" cy="350" r="2.4" fill={starFill} />
              </g>
              <g className="celestial-beacon-pulse">
                <circle cx="450" cy="510" r="7.5" fill={`url(#${glowGradientId})`} />
                <circle cx="450" cy="510" r="2.2" fill={starFill} />
              </g>

              {/* Micro-estrellas adicionales */}
              <circle cx="100" cy="50" r="0.8" fill={starFill} opacity="0.4" />
              <circle cx="390" cy="25" r="0.9" fill={starFill} opacity="0.5" />
              <circle cx="210" cy="180" r="1.0" fill={starFill} opacity="0.55" />
              <circle cx="480" cy="200" r="0.8" fill={starFill} opacity="0.4" />
              <circle cx="170" cy="240" r="0.9" fill={starFill} opacity="0.45" />
              <circle cx="80" cy="340" r="1.0" fill={starFill} opacity="0.5" />
              <circle cx="180" cy="350" r="0.8" fill={starFill} opacity="0.4" />
              <circle cx="380" cy="340" r="0.9" fill={starFill} opacity="0.5" />
              <circle cx="580" cy="440" r="0.8" fill={starFill} opacity="0.4" />
              <circle cx="100" cy="530" r="1.0" fill={starFill} opacity="0.55" />
              <circle cx="310" cy="560" r="0.8" fill={starFill} opacity="0.4" />
            </pattern>
          )}
        </defs>

        {/* Capa A: Patrón Base con Deriva Suave (48s) */}
        <rect
          width="100%"
          height="100%"
          fill={`url(#${basePatternId})`}
          className="celestial-layer-base"
        />

        {/* Capa B: Patrón Denso con Deriva Opuesta (60s) para Profundidad Cósmica */}
        {isDense && (
          <rect
            width="100%"
            height="100%"
            fill={`url(#${densePatternId})`}
            className="celestial-layer-dense"
          />
        )}
      </svg>
    </div>
  );
});
