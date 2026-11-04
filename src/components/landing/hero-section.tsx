"use client";

import { useCallback, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useRobotSequenceCanvas } from "./hero/useRobotSequenceCanvas";
import { HeroArtStage } from "./hero/HeroArtStage";
import { HeroIntentCopy } from "./hero/HeroIntentCopy";
import "./hero/hero-intent.css";

const GLOW_RADIUS = 130;

export function HeroSection() {
  const t = useTranslations("hero.intent");
  const heroRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const letterRects = useRef<Array<{ el: HTMLElement; x: number; y: number }>>([]);
  const frame = useRef(0);
  const pointer = useRef({ x: -9999, y: -9999 });

  const {
    robotCanvasRef,
    robotImgRef,
    handleRobotClick,
    updateGazeFromUV,
    resetGazeToRest,
    prefetchSaludo,
  } = useRobotSequenceCanvas();

  const measure = useCallback(() => {
    const root = titleRef.current;
    if (!root) return;
    letterRects.current = Array.from(root.querySelectorAll<HTMLElement>(".intent-letter")).map(
      (el) => {
        const box = el.getBoundingClientRect();
        return { el, x: box.left + box.width / 2, y: box.top + box.height / 2 };
      },
    );
  }, []);

  useEffect(() => {
    measure();
    const handleResize = () => measure();
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("scroll", handleResize, { passive: true });
    const timeout = window.setTimeout(measure, 900);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleResize);
      window.clearTimeout(timeout);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [measure]);

  const paint = useCallback(() => {
    frame.current = 0;
    const { x, y } = pointer.current;

    const hero = heroRef.current;
    if (hero) {
      const u = Math.max(0, Math.min(1, x / window.innerWidth));
      const v = Math.max(0, Math.min(1, y / window.innerHeight));
      const nx = u - 0.5;
      const ny = v - 0.5;
      hero.style.setProperty("--px", nx.toFixed(3));
      hero.style.setProperty("--py", ny.toFixed(3));
      updateGazeFromUV(u, v);
    }

    for (const { el, x: cx, y: cy } of letterRects.current) {
      const distance = Math.hypot(x - cx, y - cy);
      const falloff = Math.max(0, 1 - distance / GLOW_RADIUS);
      el.style.setProperty("--glow", (falloff * falloff).toFixed(3));
    }
  }, [updateGazeFromUV]);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    pointer.current = { x: event.clientX, y: event.clientY };
    if (!frame.current) frame.current = requestAnimationFrame(paint);
  };

  const handlePointerLeave = () => {
    pointer.current = { x: -9999, y: -9999 };
    for (const { el } of letterRects.current) el.style.setProperty("--glow", "0");
    heroRef.current?.style.setProperty("--px", "0");
    heroRef.current?.style.setProperty("--py", "0");
    resetGazeToRest();
  };

  return (
    <section
      className="intent-hero"
      aria-label={t("sectionAria")}
      ref={heroRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div id="intent-hero" className="intent-stage">
        <HeroArtStage robotImgRef={robotImgRef} robotCanvasRef={robotCanvasRef} />

        <button
          type="button"
          className="intent-robot-hitbox"
          onClick={handleRobotClick}
          onPointerEnter={prefetchSaludo}
          aria-label={t("robotAria")}
          title={t("robotTitle")}
        />

        <HeroIntentCopy
          titleRef={titleRef}
          kickerLine1={t("kickerLine1")}
          kickerLine2={t("kickerLine2")}
          titleSmall={t("titleSmall")}
          titleMain={t("titleMain")}
          titleConnector={t("titleConnector")}
          titleResult={t("titleResult")}
          titleAria={t("titleAria")}
          description={t("description")}
          ctaLabel={t("cta")}
        />

        <span className="intent-art-index" aria-hidden="true">
          01
        </span>

        {/* Seamless bottom fade to pure black */}
        <div className="intent-bottom-fade" aria-hidden="true" />
      </div>
    </section>
  );
}
