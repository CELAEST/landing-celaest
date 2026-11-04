"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import "./section-progress-nav.css";

interface SectionItem {
  id: string;
  number: string;
  labelKey: "home" | "products" | "platform" | "pricing";
}

const SECTIONS: SectionItem[] = [
  { id: "intent-hero", number: "01", labelKey: "home" },
  { id: "products", number: "02", labelKey: "products" },
  { id: "platform", number: "03", labelKey: "platform" },
  { id: "pricing", number: "04", labelKey: "pricing" },
];

export function SectionProgressNav() {
  const t = useTranslations("nav");
  const [activeIdx, setActiveIdx] = useState(0);
  const [gliderY, setGliderY] = useState(24);
  const [isVisible, setIsVisible] = useState(true);

  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isClickScrollingRef = useRef(false);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Compute exact Y position for glider dot based on active button
  const updateGliderPosition = useCallback((targetIdx: number) => {
    const btn = btnRefs.current[targetIdx];
    if (btn) {
      // Position dot directly under the button text, aligned with line start
      const dotTop = btn.offsetTop + btn.offsetHeight + 4;
      setGliderY(dotTop);
    }
  }, []);

  // Update glider on active index change and resize
  useEffect(() => {
    updateGliderPosition(activeIdx);
  }, [activeIdx, updateGliderPosition]);

  useEffect(() => {
    const onResize = () => {
      updateGliderPosition(activeIdx);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [activeIdx, updateGliderPosition]);

  // High-performance scroll spy with passive RAF
  useEffect(() => {
    let rafId = 0;

    const onScroll = () => {
      if (rafId) return;

      rafId = window.requestAnimationFrame(() => {
        rafId = 0;

        if (isClickScrollingRef.current) return;

        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        const triggerY = scrollY + viewportHeight * 0.38;

        // Check if user reached bottom / footer
        const docHeight = document.documentElement.scrollHeight;
        if (scrollY + viewportHeight >= docHeight - 160) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }

        // Find active section based on trigger line
        let current = 0;
        for (let i = 0; i < SECTIONS.length; i++) {
          const el = document.getElementById(SECTIONS[i].id);
          if (el) {
            const top = el.getBoundingClientRect().top + scrollY;
            if (top <= triggerY) {
              current = i;
            }
          }
        }

        setActiveIdx((prev) => {
          if (prev !== current) {
            updateGliderPosition(current);
            return current;
          }
          return prev;
        });
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Initial check
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    };
  }, [updateGliderPosition]);

  // Smooth click navigation
  const handleNavClick = (idx: number, id: string) => {
    (document.activeElement as HTMLElement)?.blur();
    isClickScrollingRef.current = true;
    setActiveIdx(idx);
    updateGliderPosition(idx);

    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);

    if (idx === 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 40;
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      }
    }

    // Release lock after smooth scroll settles
    clickTimerRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 750);
  };

  return (
    <nav className={`intent-progress-fixed ${isVisible ? "" : "is-hidden"}`} aria-label={t("home")}>
      <div className="intent-progress-track">
        {/* Animated GPU-accelerated glider dot */}
        <div
          className="intent-progress-glider"
          style={{
            transform: `translate3d(0, ${gliderY}px, 0)`,
          }}
          aria-hidden="true"
        />

        {SECTIONS.map((sec, idx) => {
          const isActive = activeIdx === idx;
          const isLast = idx === SECTIONS.length - 1;

          return (
            <div key={sec.id} className="intent-progress-step">
              <button
                ref={(el) => {
                  btnRefs.current[idx] = el;
                }}
                type="button"
                className={`intent-progress-btn ${isActive ? "is-active" : ""}`}
                onClick={() => handleNavClick(idx, sec.id)}
                aria-label={`${sec.number} - ${t(sec.labelKey)}`}
                aria-current={isActive ? "true" : undefined}
              >
                <span>{sec.number}</span>
                <span className="intent-progress-label">
                  {sec.number} · {t(sec.labelKey)}
                </span>
              </button>

              <i
                className={isLast ? "intent-progress-line-last" : "intent-progress-line"}
                aria-hidden="true"
              />
            </div>
          );
        })}
      </div>
    </nav>
  );
}
