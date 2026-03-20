"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from 'next/dynamic';

const Spline = dynamic(() => import('@splinetool/react-spline'), { 
  ssr: false
});

export function SplineBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showSpline, setShowSpline] = useState(false);

  useEffect(() => {
    // Only mount heavy WebGL Spline on larger screens (Desktop/Tablets)
    // Mobile phones will stay with the lightweight, instant WebP image!
    if (window.innerWidth >= 1024) {
      setShowSpline(true);
    }
  }, []);

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
      {showSpline && (
        <div className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
          <Spline 
            scene="https://prod.spline.design/Yic4l1OuN9ECUUjB/scene.splinecode" 
            style={{ width: "100%", height: "100%" }}
            onLoad={() => {
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
          opacity: showSpline && isLoaded ? 0 : 1,
          pointerEvents: showSpline && isLoaded ? "none" : "auto",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="/robot1.webp" 
          alt="Entorno 3D Celeast"
          fetchPriority="high"
          decoding="async"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "center",
            transform: "scale(1.02)",
          }}
        />
      </div>
    </div>
  );
}
