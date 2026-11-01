"use client";

import React, { useEffect, useRef } from "react";

export function VolumetricAura() {
  const auraRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: 600, y: 350 });
  const currentPos = useRef({ x: 600, y: 350 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    const tick = () => {
      const dx = targetPos.current.x - currentPos.current.x;
      const dy = targetPos.current.y - currentPos.current.y;

      currentPos.current.x += dx * 0.06;
      currentPos.current.y += dy * 0.06;

      if (auraRef.current) {
        auraRef.current.style.transform = `translate3d(${Math.round(currentPos.current.x - 350)}px, ${Math.round(currentPos.current.y - 350)}px, 0)`;
      }

      if (Math.hypot(dx, dy) > 0.5) {
        rafId.current = requestAnimationFrame(tick);
      } else {
        rafId.current = 0;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      <div
        ref={auraRef}
        className="absolute top-0 left-0 w-[700px] h-[700px] rounded-full blur-[140px] opacity-35 mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle, rgba(167,139,250,0.20) 0%, rgba(124,58,237,0.12) 45%, transparent 70%)",
          willChange: "transform",
        }}
      />
    </div>
  );
}

