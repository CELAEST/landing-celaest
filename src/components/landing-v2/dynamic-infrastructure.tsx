"use client";

import React, { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Code-split the heavy R3F + GLTF brain bundle out of the initial wrapper chunk.
// The canvas component is dynamically loaded only when approaching the viewport.
const DynamicInfrastructureCanvas = dynamic(
  () => import("./dynamic-infrastructure-canvas"),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 flex items-center justify-center bg-transparent" />,
  }
);

export function DynamicInfrastructure() {
  const [isHovered, setIsHovered] = useState(false);
  const [scaleMultiplier, setScaleMultiplier] = useState(1);
  
  // Two-stage mount: (1) IntersectionObserver decides when the Canvas can
  // initialize at all, (2) `visible` toggles continuously so the r3f frameloop
  // pauses while the section is off-screen. This keeps the WebGL context
  // alive (no re-init stutter) without burning the main thread when invisible.
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Responsive scale handler
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) {
        setScaleMultiplier(0.9); // Increased from 0.6 to 0.9 for better mobile presence
      } else if (window.innerWidth < 768) {
        setScaleMultiplier(0.95); 
      } else {
        setScaleMultiplier(1); // Default for desktop
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Handle pointer/touch correctly for instant reaction
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