"use client";

import React, { useEffect, useRef, useState } from "react";
import ParticleCoreCanvas from "./particle-core-canvas";
import { preloadSecurityParticles } from "./security-data-loader";

type SecurityNode = "verified" | "encryption" | "infrastructure" | "all" | null;

type ParticleCoreProps = {
  activeNode: SecurityNode;
};

export function ParticleCore({ activeNode }: ParticleCoreProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  // Preload binary security data gently in idle
  useEffect(() => {
    if (typeof window !== "undefined") {
      const win = window as any;
      if (typeof win.requestIdleCallback === "function") {
        const handle = win.requestIdleCallback(() => preloadSecurityParticles(), { timeout: 3000 });
        return () => win.cancelIdleCallback?.(handle);
      } else {
        const timer = setTimeout(preloadSecurityParticles, 1500);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  // Anticipatory 500px observer to mount before scroll arrival
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

  return (
    <div ref={wrapperRef} className="relative w-60 h-60 md:w-72 md:h-72 flex items-center justify-center">
      {mounted && (
        <ParticleCoreCanvas
          activeNode={activeNode}
          visible={visible}
        />
      )}
    </div>
  );
}
