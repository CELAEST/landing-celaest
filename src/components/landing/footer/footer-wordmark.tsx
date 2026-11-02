"use client";

import React, { useCallback, useEffect, useRef } from "react";
import "./footer-wordmark.css";

const WORD = "CELAEST";
const GLOW_RADIUS = 260;

interface LetterRect {
  el: HTMLSpanElement;
  x: number;
  y: number;
}

export function FooterWordmark({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const letterRects = useRef<LetterRect[]>([]);
  const pointer = useRef({ x: -9999, y: -9999 });
  const frame = useRef(0);

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const spans = container.querySelectorAll<HTMLSpanElement>(".footer-wordmark-letter");
    letterRects.current = Array.from(spans).map((el) => {
      const rect = el.getBoundingClientRect();
      return { el, x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure, { passive: true });
    window.addEventListener("scroll", measure, { passive: true });
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure);
    };
  }, [measure]);

  const paint = useCallback(() => {
    frame.current = 0;
    const { x, y } = pointer.current;
    for (const { el, x: cx, y: cy } of letterRects.current) {
      const distance = Math.hypot(x - cx, y - cy);
      const falloff = Math.max(0, 1 - distance / GLOW_RADIUS);
      el.style.setProperty("--glow", (falloff * falloff).toFixed(3));
    }
  }, []);

  const handlePointerMove = (e: React.PointerEvent) => {
    pointer.current = { x: e.clientX, y: e.clientY };
    if (!frame.current) frame.current = requestAnimationFrame(paint);
  };

  const handlePointerLeave = () => {
    pointer.current = { x: -9999, y: -9999 };
    for (const { el } of letterRects.current) el.style.setProperty("--glow", "0");
  };

  return (
    <div
      ref={containerRef}
      className={`footer-wordmark-container ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="footer-wordmark-track notranslate" translate="no">
        <div className="footer-wordmark-aura" aria-hidden="true" />
        <span className="sr-only">CELAEST</span>
        <strong className="footer-wordmark-text" aria-hidden="true">
          {Array.from(WORD).map((char, index) => (
            <span key={`${char}-${index}`} className="footer-wordmark-letter">
              {char}
            </span>
          ))}
          <span className="footer-wordmark-line" />
        </strong>
      </div>
    </div>
  );
}
