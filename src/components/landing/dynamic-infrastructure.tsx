"use client";

import React, { useRef, useState, useEffect } from "react";
import DynamicInfrastructureCanvas from "./dynamic-infrastructure-canvas";
import { preloadBrainParticles } from "./brain-data-loader";

export function DynamicInfrastructure() {
  const [isHovered, setIsHovered] = useState(false);
  const [scaleMultiplier, setScaleMultiplier] = useState(1);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Preload particles binary buffer gently in idle without blocking page load
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("requestIdleCallback" in window) {
        const handle = window.requestIdleCallback(() => preloadBrainParticles(), { timeout: 2500 });
        return () => window.cancelIdleCallback(handle);
      } else {
        const timer = setTimeout(preloadBrainParticles, 1200);
        return () => clearTimeout(timer);
      }
    }
  }, []);

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
