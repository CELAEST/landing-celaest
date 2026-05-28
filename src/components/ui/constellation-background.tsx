"use client";

import { useEffect, useRef } from "react";

interface ConstellationBackgroundProps {
  /** Cantidad de nodos. Default 75. */
  nodeCount?: number;
  /** Distancia máxima en px para dibujar una arista entre dos nodos. */
  linkDistance?: number;
  /** Color de nodos en formato "r,g,b" (sin alpha). */
  nodeColor?: string;
  /** Alpha base de nodos (se multiplica por el brillo aleatorio por-nodo). */
  nodeAlpha?: number;
  /** Color de las aristas en formato "r,g,b". */
  linkColor?: string;
  /** Velocidad de drift base por nodo en px/frame. */
  driftSpeed?: number;
  /** Opacidad base máxima de las aristas (0-1). */
  linkOpacity?: number;
  /** Radio del nodo en px (se modula con el brillo). */
  nodeRadius?: number;
  /** Clases adicionales. */
  className?: string;
}

/**
 * Constelación de nodos que derivan lentamente. Conecta los pares de nodos
 * cercanos con líneas cuya opacidad cae con la distancia. Pausa el render
 * cuando el componente sale del viewport.
 */
export function ConstellationBackground({
  nodeCount = 75,
  linkDistance = 140,
  nodeColor = "255,255,255",
  nodeAlpha = 0.4,
  linkColor = "255,255,255",
  driftSpeed = 0.12,
  linkOpacity = 0.08,
  nodeRadius = 1.4,
  className = "",
}: ConstellationBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    type Node = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      b: number;
      /** Si está presente, el nodo parpadea con esta frecuencia + fase. */
      tw?: { freq: number; phase: number };
    };
    let nodes: Node[] = [];
    let width = 0;
    let height = 0;
    let raf = 0;
    let running = true;
    let inView = false;

    const seed = () => {
      nodes = [];
      for (let i = 0; i < nodeCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = driftSpeed * (0.4 + Math.random() * 0.8);
        // Distribución power: la mayoría de nodos son débiles y unos pocos
        // bastante brillantes → sensación de campo estelar, no plano.
        const b = 0.3 + Math.pow(Math.random(), 2.2) * 1.6;
        // ~35% de nodos parpadean. Cada uno con su propia frecuencia y fase
        // → intercalado natural, ningún sincronismo visible.
        const twinkle = Math.random() < 0.35
          ? {
              freq: 0.35 + Math.random() * 0.8,           // 0.35–1.15 Hz
              phase: Math.random() * Math.PI * 2,
            }
          : undefined;
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          b,
          tw: twinkle,
        });
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const wasEmpty = width === 0;
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (wasEmpty) seed();
      else {
        // clamp nodos a los nuevos bounds en vez de re-seed (no jump)
        for (const n of nodes) {
          if (n.x > width) n.x = width;
          if (n.y > height) n.y = height;
        }
      }
    };

    const tick = () => {
      if (!running || !inView) {
        raf = 0;
        return;
      }
      const t = performance.now() / 1000; // segundos para la oscilación del twinkle
      ctx.clearRect(0, 0, width, height);

      // update
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        // wrap around (más limpio que bouncing en los bordes)
        if (n.x < -8) n.x = width + 8;
        else if (n.x > width + 8) n.x = -8;
        if (n.y < -8) n.y = height + 8;
        else if (n.y > height + 8) n.y = -8;
      }

      // links
      const linkDistSq = linkDistance * linkDistance;
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dSq = dx * dx + dy * dy;
          if (dSq < linkDistSq) {
            const dist = Math.sqrt(dSq);
            const alpha = (1 - dist / linkDistance) * linkOpacity;
            ctx.strokeStyle = `rgba(${linkColor},${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // nodes — los marcados parpadean: oscilan entre muy débiles y
      // muy brillantes, y al pico se les agrega aura (shadowBlur).
      for (const n of nodes) {
        let eb = n.b;
        let glow = 0;
        if (n.tw) {
          // s ∈ [0,1] — fase del seno.
          const s = (Math.sin(t * n.tw.freq * Math.PI * 2 + n.tw.phase) + 1) * 0.5;
          // eb oscila entre 0.25·b (mínimo) y 1.7·b (peak → más brillante que la base).
          eb = n.b * (0.25 + s * 1.45);
          // Aura: solo aparece en la mitad alta del ciclo, escala con s.
          glow = Math.max(0, (s - 0.5) * 2); // 0 abajo de s=0.5, 1 en s=1
        }
        // Alpha base + boost del glow → al peak se vuelve blanco puro.
        const alpha = Math.min(nodeAlpha * eb + glow * 0.55, 1);
        if (glow > 0.05) {
          ctx.shadowColor = `rgba(${nodeColor},${0.5 * glow})`;
          ctx.shadowBlur = 6 * glow;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fillStyle = `rgba(${nodeColor},${alpha})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, nodeRadius * (0.7 + eb * 0.5), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0; // reset al final del frame

      raf = requestAnimationFrame(tick);
    };

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let startTimeout: number | undefined;

    const startTick = () => {
      if (inView && !raf && running) {
        raf = requestAnimationFrame(tick);
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView && !raf) {
          if (document.readyState !== "complete") {
            const handleLoad = () => {
              window.removeEventListener("load", handleLoad);
              startTimeout = window.setTimeout(startTick, 500);
            };
            window.addEventListener("load", handleLoad);
          } else {
            startTimeout = window.setTimeout(startTick, 300);
          }
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    return () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      if (startTimeout) clearTimeout(startTimeout);
      ro.disconnect();
      io.disconnect();
    };
  }, [nodeCount, linkDistance, nodeColor, nodeAlpha, linkColor, driftSpeed, linkOpacity, nodeRadius]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}
