"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// Code-split the heavy R3F + GLTF particle core bundle out of the initial wrapper chunk.
// The canvas component is dynamically loaded only when approaching the viewport.
const ParticleCoreCanvas = dynamic(
  () => import("./particle-core-canvas"),
  {
    ssr: false,
    loading: () => <div className="w-60 h-60 md:w-72 md:h-72 flex items-center justify-center bg-transparent" />,
  }
);

type SecurityNode = "verified" | "encryption" | "infrastructure" | "all" | null;

type ParticleCoreProps = {
  activeNode: SecurityNode;
};

export function ParticleCore({ activeNode }: ParticleCoreProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  
  // Mount the Canvas only after the wrapper enters the viewport. Once mounted
  // we keep it (toggling off would dispose the WebGL context and re-mounting
  // would stutter on scroll-back). `visible` toggles continuously to drive the
  // r3f frameloop → we stop running the shader when the section is off-screen.
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

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
      { rootMargin: "200px" },
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
