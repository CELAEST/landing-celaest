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
      // Montamos inmediatamente para aprovechar el caché del Service Worker (0ms de red)
      setIsDesktop(true);
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
            scene="https://prod.spline.design/Yic4l1OuN9ECUUjB/scene.splinecode?v=2026" 
            style={{ width: "100%", height: "100%" }}
            onLoad={(app) => {
              splineAppRef.current = app;
              // Mantener la imagen estática 1000ms más para asegurar que WebGL dibuje el frame
              setTimeout(() => setIsLoaded(true), 1000);
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
        {/* FALLBACK IMAGE: La imagen ultra-comprimida a 3KB. 
            Cubre todo con un gradiente negro para disimular la compresión, dando 
            la sensación de "estar cargando en la oscuridad" orgánicamente. */}
        <div className="absolute inset-0 w-full h-full bg-brand-dark">
          <img 
            src="/images/hero-3d-poster.webp" 
            alt="Hero Platform Model Loading"
            className="absolute inset-0 w-full h-full object-cover blur-[2px] opacity-60"
          />
          {/* Capa de Gradiente Oscuro tipo viñeta para integrar con el fondo */}
          <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,#050505_80%)]" />
          <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-brand-dark via-brand-dark/20 to-brand-dark/80" />
        </div>
      </div>
    </div>
  );
}
