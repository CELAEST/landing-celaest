"use client";

import React, { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { preloadBrainParticles } from "./brain-data-loader";

const DynamicInfrastructureCanvas = dynamic(() => import("./dynamic-infrastructure-canvas"), {
  ssr: false,
});

export function DynamicInfrastructure() {
  const [isHovered, setIsHovered] = useState(false);
  const [scaleMultiplier, setScaleMultiplier] = useState(1);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Responsive scale handler based on actual container bounds
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const handleResize = () => {
      const w = el.clientWidth || window.innerWidth;
      if (w < 400) {
        setScaleMultiplier(0.8);
      } else if (w < 550) {
        setScaleMultiplier(0.88);
      } else if (w < 700) {
        setScaleMultiplier(0.94);
      } else {
        setScaleMultiplier(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Anticipatory observer: canvas mounts 500px before reaching viewport
  // and pauses frameloop when scrolled away to save 100% of GPU/CPU
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setMounted(true);
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            preloadBrainParticles();
            setMounted(true);
            setVisible(true);
          } else {
            setVisible(false);
          }
        }
      },
      { rootMargin: "500px 0px 500px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const handleInteractStart = () => setIsHovered(true);
  const handleInteractEnd = () => setIsHovered(false);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full h-[320px] sm:h-[450px] md:h-[600px] flex items-center justify-center isolate cursor-crosshair group overflow-hidden"
      onPointerEnter={handleInteractStart}
      onPointerLeave={handleInteractEnd}
      onPointerDown={handleInteractStart}
      onPointerUp={handleInteractEnd}
      onPointerCancel={handleInteractEnd}
      onTouchStart={handleInteractStart}
      onTouchEnd={handleInteractEnd}
      onTouchCancel={handleInteractEnd}
    >
      {mounted && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <DynamicInfrastructureCanvas
            isHovered={isHovered}
            visible={visible}
            scaleMultiplier={scaleMultiplier}
          />
        </div>
      )}
    </div>
  );
}
