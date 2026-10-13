"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";
import { Activity, ShieldCheck, Zap, RefreshCw, Cpu, Globe2 } from "lucide-react";

// Shaders para los nodos de la malla neuronal / topología de red
const NODE_VERTEX_SHADER = /* glsl */ `
  attribute float aScale;
  varying vec3 vPosition;
  uniform float uTime;

  void main() {
    vPosition = position;
    vec3 pos = position;
    
    // Deformación orbital suave
    pos.x += sin(pos.y * 2.0 + uTime * 0.8) * 0.08;
    pos.y += cos(pos.z * 2.0 + uTime * 0.8) * 0.08;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = (12.0 * aScale) * (1.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const NODE_FRAGMENT_SHADER = /* glsl */ `
  uniform vec3 uColor;
  uniform float uTime;

  void main() {
    // Generar punto circular suave con desvanecimiento radial
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    
    float alpha = smoothstep(0.5, 0.05, dist);
    // Pulso sutil de brillo en el centro
    float glow = 0.85 + 0.15 * sin(uTime * 3.0);
    
    gl_FragColor = vec4(uColor * glow, alpha * 0.85);
  }
`;

function NetworkMeshCluster({
  nodeCount = 180,
  isBenchmarkActive = false,
}: {
  nodeCount: number;
  isBenchmarkActive: boolean;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(isBenchmarkActive ? "#34d399" : "#a78bfa") },
    }),
    [isBenchmarkActive]
  );

  // Generar posiciones y conexiones de la red
  const { positions, scales, linePositions } = useMemo(() => {
    const pos = new Float32Array(nodeCount * 3);
    const sca = new Float32Array(nodeCount);
    const coords: THREE.Vector3[] = [];

    // Distribuir nodos en una elipse orbital tridimensional
    for (let i = 0; i < nodeCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 1.8 + Math.random() * 1.6;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = (radius * Math.sin(phi) * Math.sin(theta)) * 0.65;
      const z = radius * Math.cos(phi) * 0.8;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      sca[i] = 0.8 + Math.random() * 1.4;
      coords.push(new THREE.Vector3(x, y, z));
    }

    // Calcular líneas entre nodos cercanos (< 1.2 unidades)
    const lineCoords: number[] = [];
    for (let i = 0; i < coords.length; i++) {
      for (let j = i + 1; j < coords.length; j++) {
        const d = coords[i].distanceTo(coords[j]);
        if (d < 1.15) {
          lineCoords.push(coords[i].x, coords[i].y, coords[i].z);
          lineCoords.push(coords[j].x, coords[j].y, coords[j].z);
        }
      }
    }

    return {
      positions: pos,
      scales: sca,
      linePositions: new Float32Array(lineCoords),
    };
  }, [nodeCount]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const speed = isBenchmarkActive ? 0.45 : 0.18;
    pointsRef.current.rotation.y += delta * speed;
    if (linesRef.current) {
      linesRef.current.rotation.y += delta * speed;
    }
    uniforms.uTime.value = state.clock.getElapsedTime();
  });

  return (
    <group>
      {/* Nodos de la Malla */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={NODE_VERTEX_SHADER}
          fragmentShader={NODE_FRAGMENT_SHADER}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Líneas de Interconexión Criptográfica */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color={isBenchmarkActive ? "#10b981" : "#8b5cf6"}
          transparent
          opacity={isBenchmarkActive ? 0.35 : 0.18}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

export function InteractiveMeshCockpit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [latency, setLatency] = useState(3.4);
  const [isBenchmarking, setIsBenchmarking] = useState(false);
  const [activeRegion, setActiveRegion] = useState<"GLOBAL" | "US-EAST" | "EU-CENTRAL">("GLOBAL");
  const shouldReduceMotion = useReducedMotion();

  // Pausar el renderizado GPU si el contenedor sale del viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const runLatencyTest = () => {
    if (isBenchmarking) return;
    setIsBenchmarking(true);
    setLatency(1.9);

    setTimeout(() => {
      setLatency(2.6);
      setTimeout(() => {
        setLatency(3.1);
        setIsBenchmarking(false);
      }, 600);
    }, 450);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 backdrop-blur-2xl overflow-hidden shadow-2xl transition-all duration-300"
      style={{
        boxShadow: `
          inset 0 1px 0 0 rgba(255, 255, 255, 0.15),
          0 24px 48px -12px rgba(0, 0, 0, 0.7)
        `,
      }}
    >
      {/* Cockpit Superior: Telemetría y Controles */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-b border-white/[0.08] bg-black/40">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                isBenchmarking ? "bg-emerald-400 animate-ping" : "bg-emerald-400 animate-pulse"
              }`}
            />
            <span className="font-mono text-[11px] text-white/90 tracking-wider uppercase font-semibold">
              CELAEST AI MESH // TOPOLOGY
            </span>
          </div>
          <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] text-white/50 border border-white/5">
            PROD-CLUSTER-32
          </span>
        </div>

        {/* Región y Métricas Rápidas */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <div className="inline-flex rounded-lg bg-white/[0.04] p-0.5 border border-white/5">
            {(["GLOBAL", "US-EAST", "EU-CENTRAL"] as const).map((region) => (
              <button
                key={region}
                onClick={() => setActiveRegion(region)}
                className={`px-2.5 py-1 text-[10px] rounded-md transition-all ${
                  activeRegion === region
                    ? "bg-white text-black font-semibold shadow-sm"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Área del Canvas WebGL o Fallback Estático Accesible */}
      <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[420px] bg-black/30">
        {!shouldReduceMotion ? (
          <Canvas
            camera={{ position: [0, 0, 4.8], fov: 42 }}
            frameloop={isVisible ? "always" : "demand"}
            dpr={[1, 1.5]}
            gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          >
            <NetworkMeshCluster
              nodeCount={activeRegion === "GLOBAL" ? 220 : 130}
              isBenchmarkActive={isBenchmarking}
            />
          </Canvas>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-6 text-center">
            <ShieldCheck className="w-8 h-8 text-violet-400" />
            <span className="font-mono text-xs text-white/70 uppercase tracking-widest">
              MODO REDUCCIÓN DE MOVIMIENTO ACTIVO
            </span>
            <span className="text-xs text-white/40 max-w-sm">
              Renderizado estático para optimizar batería y respetar preferencias vestibulares.
            </span>
          </div>
        )}

        {/* Overlay Flotante de Métricas de Latencia en Vivo */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
          <div className="flex items-center gap-2 pointer-events-auto">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/70 border border-white/10 backdrop-blur-md">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-mono text-xs text-white/90">
                <span className="text-emerald-400 font-semibold">{latency}ms</span> EDGE RTT
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/70 border border-white/10 backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5 text-violet-400" />
              <span className="font-mono text-xs text-white/80">AES-256 ZERO TRUST</span>
            </div>
          </div>

          <button
            onClick={runLatencyTest}
            disabled={isBenchmarking}
            className="pointer-events-auto inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white text-black text-xs font-semibold hover:bg-white/90 active:scale-95 transition-all shadow-md disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isBenchmarking ? "animate-spin" : ""}`} />
            <span>{isBenchmarking ? "Midiendo..." : "Probar Latencia"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
