"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from 'next/dynamic';

import type { Application } from '@splinetool/runtime';

const Spline = dynamic(() => import('@splinetool/react-spline'), { 
  ssr: false
});

export function SplineBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const splineAppRef = useRef<Application | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // 1. Mobile constraint: never load Spline on phones
    if (window.innerWidth >= 1024) {
      // Montamos automáticamente en el primer momento en que el navegador esté inactivo (idle),
      // balanceando un rendimiento óptimo con una experiencia de carga sin pausas.
      const handle = 'requestIdleCallback' in window 
        ? window.requestIdleCallback(() => setIsDesktop(true))
        : setTimeout(() => setIsDesktop(true), 1000);

      return () => {
        if ('requestIdleCallback' in window) {
          window.cancelIdleCallback(handle as number);
        } else {
          clearTimeout(handle as any);
        }
      };
    }
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const container = containerRef.current;
    if (!container) return;

    // 2. Resource Management: Instead of unconditionally UNMOUNTING the component
    // (which destroys WebGL context and freezes the main thread on remount),
    // we just pause the WebGL render loop!
    // GPU usage drops to 0%, but the canvas stays in DOM = instant, zero-lag scroll.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          splineAppRef.current?.play();
        } else {
          splineAppRef.current?.stop();
        }
      },
      // Give a 500px buffer so it starts rendering just before it becomes visible
      { rootMargin: "500px" } 
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [isDesktop]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation();
    };

    container.addEventListener("wheel", handleWheel, { capture: true, passive: true });

    return () => {
      container.removeEventListener("wheel", handleWheel, { capture: true });
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-auto overflow-hidden" suppressHydrationWarning>
      
      {/* 1. SPLINE 3D — Se pinta POR DEBAJO de la imagen, invisible hasta que esté listo */}
      {isDesktop && (
        <div className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
          <Spline 
            scene="https://prod.spline.design/Yic4l1OuN9ECUUjB/scene.splinecode" 
            style={{ width: "100%", height: "100%" }}
            onLoad={(app) => {
              splineAppRef.current = app;
              setTimeout(() => setIsLoaded(true), 300);
            }}
          />
        </div>
      )}

      {/* 2. IMAGEN — Siempre ARRIBA tapando todo. Se desvanece SOLO cuando Spline está 100% listo */}
      {/* Usamos <img> nativo en vez de next/image para que NUNCA desaparezca durante hidratación */}
      <div 
        suppressHydrationWarning
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 30,
          transition: "opacity 1s ease-in-out",
          opacity: isLoaded ? 0 : 1,
          pointerEvents: isLoaded ? "none" : "auto",
        }}
      >
        {/* FALLBACK CSS — Pesa 0 KB, asegura LCP instantáneo (Puntaje 100) */}
        <div 
          className="absolute inset-0 w-full h-full flex items-center justify-center bg-brand-dark"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(34,211,238,0.08) 0%, rgba(0,0,0,1) 50%)"
          }}
        >
          <div className="w-16 h-16 rounded-full border border-brand-neon/20 border-t-brand-neon animate-spin" />
        </div>
      </div>
    </div>
  );
}
