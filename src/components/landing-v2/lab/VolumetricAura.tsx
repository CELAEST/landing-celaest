"use client";

import React, { useEffect, useRef } from "react";
import { useLab } from "./LabContext";

export function VolumetricAura() {
  const { settings } = useLab();
  const auraRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: 600, y: 350 });
  const currentPos = useRef({ x: 600, y: 350 });

  useEffect(() => {
    if (!settings.volumetricAura) return;

    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Smooth inertia lerp loop
    const render = () => {
      // Lerp factor (0.05 = heavy liquid smoothing)
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.045;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.045;

      if (auraRef.current) {
        auraRef.current.style.transform = `translate3d(${currentPos.current.x - 350}px, ${currentPos.current.y - 350}px, 0)`;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [settings.volumetricAura]);

  if (!settings.volumetricAura) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      <div
        ref={auraRef}
        className="absolute top-0 left-0 w-[700px] h-[700px] rounded-full blur-[140px] opacity-40 mix-blend-screen transition-opacity duration-700"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.22) 0%, rgba(99,102,241,0.12) 40%, transparent 70%)",
          willChange: "transform",
        }}
      />
    </div>
  );
}
