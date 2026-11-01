"use client";

import { useCallback, useEffect, useRef } from "react";

export const SALUDO_FRAME_COUNT = 72;
export const SALUDO_FPS = 30;
export const GAZE_FRAME_COUNT = 60;
export const GAZE_REST_INDEX = 17; // 0-based index for gaze_018.webp (neutral 3/4 profile)
export const GAZE_SALUDO_SYNC_INDEX = 59; // 0-based index for gaze_060.webp (matches saludo frame_001 & frame_072)

function getSaludoFrameUrl(indexOneBased: number): string {
  return `/robot_hero_saludo/frame_${String(indexOneBased).padStart(3, "0")}.webp`;
}

function getGazeFrameUrl(indexOneBased: number): string {
  return `/robot_hero_gaze/gaze_${String(indexOneBased).padStart(3, "0")}.webp`;
}

export function useRobotSequenceCanvas() {
  const robotCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const robotCtxRef = useRef<CanvasRenderingContext2D | null>(null);
  const robotImgRef = useRef<HTMLImageElement | null>(null);
  const saludoBitmapsRef = useRef<Array<ImageBitmap | null>>(Array(SALUDO_FRAME_COUNT).fill(null));
  const gazeBitmapsRef = useRef<Array<ImageBitmap | null>>(Array(GAZE_FRAME_COUNT).fill(null));
  const animRafRef = useRef<number>(0);
  const modeRef = useRef<"gaze" | "align_to_saludo" | "saludo">("gaze");
  const saludoStartTimeRef = useRef<number>(0);
  const targetGazeFrameRef = useRef<number>(GAZE_REST_INDEX);
  const currentGazeFrameRef = useRef<number>(GAZE_REST_INDEX);
  const lastDrawnKeyRef = useRef<string>("");

  const drawBlendedSequenceFrame = useCallback(
    (bitmaps: Array<ImageBitmap | null>, floatIdx: number, prefix: string) => {
      const maxIdx = bitmaps.length - 1;
      const clamped = Math.max(0, Math.min(maxIdx, floatIdx));
      const i0 = Math.floor(clamped);
      const i1 = Math.min(maxIdx, i0 + 1);
      const frac = Math.round((clamped - i0) * 10) / 10;

      const bmp0 = bitmaps[i0];
      if (!bmp0) return false;
      const bmp1 = bitmaps[i1];

      const key = `${prefix}:${i0}:${bmp1 && frac > 0.05 ? frac.toFixed(1) : "0"}`;
      if (lastDrawnKeyRef.current === key) return true;

      const canvas = robotCanvasRef.current;
      if (!canvas) return false;
      let ctx = robotCtxRef.current;
      if (!ctx) {
        ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
        robotCtxRef.current = ctx;
      }
      if (!ctx) return false;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;
      ctx.drawImage(bmp0, 0, 0, canvas.width, canvas.height);

      if (bmp1 && i1 !== i0 && frac > 0.05) {
        ctx.globalAlpha = frac;
        ctx.drawImage(bmp1, 0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
      }

      lastDrawnKeyRef.current = key;
      canvas.dataset.frame =
        prefix === "saludo" ? String(Math.round(clamped) + 1) : `gaze-${Math.round(clamped) + 1}`;
      if (robotImgRef.current) {
        robotImgRef.current.style.opacity = "0";
      }
      return true;
    },
    [],
  );

  const startLoopIfNeeded = useCallback(() => {
    if (animRafRef.current) return;
    let prevTime = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - prevTime) / 1000);
      prevTime = now;

      if (modeRef.current === "saludo") {
        const elapsedSec = (now - saludoStartTimeRef.current) / 1000;
        const floatFrame = elapsedSec * SALUDO_FPS;

        if (floatFrame >= SALUDO_FRAME_COUNT - 1) {
          modeRef.current = "gaze";
          currentGazeFrameRef.current = GAZE_SALUDO_SYNC_INDEX;
          drawBlendedSequenceFrame(gazeBitmapsRef.current, GAZE_SALUDO_SYNC_INDEX, "gaze");
        } else {
          drawBlendedSequenceFrame(saludoBitmapsRef.current, floatFrame, "saludo");
          animRafRef.current = requestAnimationFrame(tick);
          return;
        }
      }

      const goal =
        modeRef.current === "align_to_saludo" ? GAZE_SALUDO_SYNC_INDEX : targetGazeFrameRef.current;
      const cur = currentGazeFrameRef.current;
      const diff = goal - cur;

      const speed = modeRef.current === "align_to_saludo" ? 14.0 : 8.5;
      const rawStep = diff * (1 - Math.exp(-dt * speed));
      const maxStep = dt * (modeRef.current === "align_to_saludo" ? 78.0 : 48.0);
      const step = Math.abs(rawStep) > maxStep ? Math.sign(rawStep) * maxStep : rawStep;

      const nextFrame = cur + step;
      currentGazeFrameRef.current = nextFrame;
      drawBlendedSequenceFrame(gazeBitmapsRef.current, nextFrame, "gaze");

      if (modeRef.current === "align_to_saludo") {
        if (Math.abs(GAZE_SALUDO_SYNC_INDEX - nextFrame) < 0.35) {
          currentGazeFrameRef.current = GAZE_SALUDO_SYNC_INDEX;
          modeRef.current = "saludo";
          saludoStartTimeRef.current = now;
          drawBlendedSequenceFrame(saludoBitmapsRef.current, 0, "saludo");
        }
        animRafRef.current = requestAnimationFrame(tick);
        return;
      }

      if (Math.abs(goal - nextFrame) < 0.04) {
        currentGazeFrameRef.current = goal;
        drawBlendedSequenceFrame(gazeBitmapsRef.current, goal, "gaze");
        animRafRef.current = 0;
        return;
      }

      animRafRef.current = requestAnimationFrame(tick);
    };

    animRafRef.current = requestAnimationFrame(tick);
  }, [drawBlendedSequenceFrame]);

  useEffect(() => {
    let cancelled = false;

    const loadGazeFrame = async (oneBased: number) => {
      try {
        const res = await fetch(getGazeFrameUrl(oneBased));
        const blob = await res.blob();
        const bmp = await createImageBitmap(blob);
        if (cancelled) {
          bmp.close();
          return;
        }
        gazeBitmapsRef.current[oneBased - 1] = bmp;
        if (oneBased === GAZE_REST_INDEX + 1 && modeRef.current === "gaze") {
          drawBlendedSequenceFrame(gazeBitmapsRef.current, GAZE_REST_INDEX, "gaze");
        }
      } catch {
        // Ignore network abort on unmount
      }
    };

    const loadSaludoFrame = async (oneBased: number) => {
      try {
        const res = await fetch(getSaludoFrameUrl(oneBased));
        const blob = await res.blob();
        const bmp = await createImageBitmap(blob);
        if (cancelled) {
          bmp.close();
          return;
        }
        saludoBitmapsRef.current[oneBased - 1] = bmp;
      } catch {
        // Ignore network abort on unmount
      }
    };

    (async () => {
      // 1. Critical path: Load ONLY the rest frame immediately (0ms instant display)
      await loadGazeFrame(GAZE_REST_INDEX + 1);

      // 2. Load the anchor sync frames
      await Promise.all([
        loadGazeFrame(GAZE_SALUDO_SYNC_INDEX + 1),
        loadSaludoFrame(1),
      ]);

      // 3. Progressive idle loading: Load gaze frames in gentle batches of 4
      // yielding back to the main thread between batches to prevent network/CPU spikes
      const gazeTasks: Array<() => Promise<void>> = [];
      for (let f = 1; f <= GAZE_FRAME_COUNT; f++) {
        if (f !== GAZE_REST_INDEX + 1 && f !== GAZE_SALUDO_SYNC_INDEX + 1) {
          gazeTasks.push(() => loadGazeFrame(f));
        }
      }

      const yieldToIdle = () =>
        new Promise<void>((resolve) => {
          if (typeof window !== "undefined" && "requestIdleCallback" in window) {
            (window as any).requestIdleCallback(() => resolve(), { timeout: 1000 });
          } else {
            setTimeout(resolve, 80);
          }
        });

      // Load gaze frames in small batches with idle pauses
      const batchSize = 4;
      for (let i = 0; i < gazeTasks.length; i += batchSize) {
        if (cancelled) break;
        await Promise.all(gazeTasks.slice(i, i + batchSize).map((fn) => fn()));
        await yieldToIdle();
      }

      // 4. Saludo frames: only load once gaze is fully ready, during idle
      if (!cancelled) {
        const saludoTasks: Array<() => Promise<void>> = [];
        for (let f = 2; f <= SALUDO_FRAME_COUNT; f++) {
          saludoTasks.push(() => loadSaludoFrame(f));
        }
        for (let i = 0; i < saludoTasks.length; i += batchSize) {
          if (cancelled) break;
          await Promise.all(saludoTasks.slice(i, i + batchSize).map((fn) => fn()));
          await yieldToIdle();
        }
      }
    })();

    return () => {
      cancelled = true;
      if (animRafRef.current) cancelAnimationFrame(animRafRef.current);
      gazeBitmapsRef.current.forEach((bmp) => bmp?.close());
      saludoBitmapsRef.current.forEach((bmp) => bmp?.close());
      gazeBitmapsRef.current = Array(GAZE_FRAME_COUNT).fill(null);
      saludoBitmapsRef.current = Array(SALUDO_FRAME_COUNT).fill(null);
      robotCtxRef.current = null;
    };
  }, [drawBlendedSequenceFrame]);

  const handleRobotClick = useCallback(() => {
    if (modeRef.current === "saludo" || modeRef.current === "align_to_saludo") return;
    if (Math.abs(currentGazeFrameRef.current - GAZE_SALUDO_SYNC_INDEX) < 0.5) {
      currentGazeFrameRef.current = GAZE_SALUDO_SYNC_INDEX;
      modeRef.current = "saludo";
      saludoStartTimeRef.current = performance.now();
    } else {
      modeRef.current = "align_to_saludo";
    }
    startLoopIfNeeded();
  }, [startLoopIfNeeded]);

  const updateGazeFromUV = useCallback(
    (u: number, v: number) => {
      const verticalBias = (0.5 - v) * 4.5;
      let targetFrame = GAZE_REST_INDEX;
      if (u <= 0.24) {
        targetFrame = (u / 0.24) * GAZE_REST_INDEX + verticalBias * 0.4;
      } else {
        const t = Math.min(1, (u - 0.24) / 0.44);
        targetFrame =
          GAZE_REST_INDEX + t * (GAZE_SALUDO_SYNC_INDEX - GAZE_REST_INDEX) + verticalBias;
      }
      targetGazeFrameRef.current = Math.max(0, Math.min(GAZE_FRAME_COUNT - 1, targetFrame));
      startLoopIfNeeded();
    },
    [startLoopIfNeeded],
  );

  const resetGazeToRest = useCallback(() => {
    targetGazeFrameRef.current = GAZE_REST_INDEX;
    startLoopIfNeeded();
  }, [startLoopIfNeeded]);

  return {
    robotCanvasRef,
    robotImgRef,
    handleRobotClick,
    updateGazeFromUV,
    resetGazeToRest,
  };
}

