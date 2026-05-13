"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/logo";

/**
 * Full-screen branded splash that covers the page until everything is
 * actually painted and stable. Solves the cold-load jank where the hero
 * marquee + Spline + GLTF brain compete for the main thread on first visit
 * and the whole landing looks laggy.
 *
 * Reveal logic:
 *   1) Wait for `window.load` (all images/fonts/scripts done)
 *   2) Wait for `requestIdleCallback` so the main thread is actually free
 *   3) Hold for a 250 ms minimum so cached visits don't see a flicker
 *   4) Fade out over 500 ms, then unmount entirely
 *
 * Safety net: 6 s hard timeout regardless of load state, so the page is
 * never permanently hidden if something hangs.
 */
export function PageLoadingOverlay() {
  // `hidden` controls the fade. `removed` unmounts after the fade so the
  // overlay never blocks pointer events once revealed.
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    let idleHandle: number | undefined;
    let idleTimeoutHandle: number | undefined;
    let minDisplayHandle: number | undefined;
    let removeHandle: number | undefined;
    let loadFired = false;

    const cancelRic = (
      window as unknown as { cancelIdleCallback?: (id: number) => void }
    ).cancelIdleCallback;
    const ric = (
      window as unknown as {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      }
    ).requestIdleCallback;

    const reveal = () => {
      setHidden(true);
      removeHandle = window.setTimeout(() => setRemoved(true), 600);
    };

    const startFadeWhenIdle = () => {
      if (typeof ric === "function") {
        idleHandle = ric(reveal, { timeout: 1500 });
      } else {
        idleTimeoutHandle = window.setTimeout(reveal, 400);
      }
    };

    const onLoad = () => {
      loadFired = true;
      // Minimum-display so the splash feels intentional on fast cached visits
      // instead of a one-frame flash that looks like a glitch.
      minDisplayHandle = window.setTimeout(startFadeWhenIdle, 250);
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }

    // Hard safety net: never keep the page hidden longer than 6 s.
    const safetyHandle = window.setTimeout(reveal, 6000);

    return () => {
      if (!loadFired) window.removeEventListener("load", onLoad);
      if (typeof idleHandle === "number" && typeof cancelRic === "function") {
        cancelRic(idleHandle);
      }
      if (typeof idleTimeoutHandle === "number") clearTimeout(idleTimeoutHandle);
      if (typeof minDisplayHandle === "number") clearTimeout(minDisplayHandle);
      if (typeof removeHandle === "number") clearTimeout(removeHandle);
      clearTimeout(safetyHandle);
    };
  }, []);

  if (removed) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark transition-opacity duration-500 ease-out"
      style={{
        opacity: hidden ? 0 : 1,
        pointerEvents: hidden ? "none" : "auto",
        // Subtle radial vignette so the splash doesn't feel flat.
        backgroundImage:
          "radial-gradient(ellipse at center, rgba(34,211,238,0.06) 0%, transparent 60%)",
      }}
    >
      <div className="flex flex-col items-center gap-7">
        <div className="w-14 h-[74px] sm:w-16 sm:h-[85px] text-brand-neon drop-shadow-[0_0_30px_rgba(34,211,238,0.45)] animate-pulse">
          <Logo color="currentColor" />
        </div>
        <div className="flex gap-2" aria-label="Loading">
          <span
            className="w-1.5 h-1.5 rounded-full bg-brand-neon/80"
            style={{ animation: "loaderDot 1.2s ease-in-out 0s infinite" }}
          />
          <span
            className="w-1.5 h-1.5 rounded-full bg-brand-neon/80"
            style={{ animation: "loaderDot 1.2s ease-in-out 0.2s infinite" }}
          />
          <span
            className="w-1.5 h-1.5 rounded-full bg-brand-neon/80"
            style={{ animation: "loaderDot 1.2s ease-in-out 0.4s infinite" }}
          />
        </div>
      </div>
    </div>
  );
}
