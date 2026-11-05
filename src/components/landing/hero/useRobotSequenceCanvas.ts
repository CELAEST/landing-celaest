"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { loadRobotBinaryBundle } from "./robot-binary-loader";

export const SALUDO_FRAME_COUNT = 72;
export const SALUDO_FPS = 30;
export const GAZE_FRAME_COUNT = 60;
export const GAZE_REST_INDEX = 17; // 0-based index for gaze_018.webp (neutral 3/4 profile)
export const GAZE_SALUDO_SYNC_INDEX = 59; // 0-based index for gaze_060.webp (matches saludo frame_001 & frame_072)

export type RobotDynamicScene = "gaze" | "saludo" | "explaining" | "listening" | "celebrating";

function getSaludoFrameUrl(indexOneBased: number): string {
  return `/robot_hero_saludo/frame_${String(indexOneBased).padStart(3, "0")}.webp`;
}

function getGazeFrameUrl(indexOneBased: number): string {
  return `/robot_hero_gaze/gaze_${String(indexOneBased).padStart(3, "0")}.webp`;
}

/**
 * Searches radially outward for the closest decoded bitmap to prevent any canvas dropped frames or blank flash.
 */
function findBestBitmap(
  bitmaps: Array<ImageBitmap | null>,
  targetIdx: number,
): { bmp: ImageBitmap; idx: number } | null {
  const maxIdx = bitmaps.length - 1;
  const clamped = Math.max(0, Math.min(maxIdx, Math.round(targetIdx)));
  if (bitmaps[clamped]) return { bmp: bitmaps[clamped]!, idx: clamped };

  for (let offset = 1; offset <= maxIdx; offset++) {
    const left = clamped - offset;
    if (left >= 0 && bitmaps[left]) return { bmp: bitmaps[left]!, idx: left };
    const right = clamped + offset;
    if (right <= maxIdx && bitmaps[right]) return { bmp: bitmaps[right]!, idx: right };
  }
  return null;
}

let globalGazeBitmaps: Array<ImageBitmap | null> | null = null;
let globalSaludoBitmaps: Array<ImageBitmap | null> | null = null;

export function useRobotSequenceCanvas() {
  const robotCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const robotCtxRef = useRef<CanvasRenderingContext2D | null>(null);
  const robotImgRef = useRef<HTMLImageElement | null>(null);

  const saludoBitmapsRef = useRef<Array<ImageBitmap | null>>(
    globalSaludoBitmaps || Array(SALUDO_FRAME_COUNT).fill(null),
  );
  const gazeBitmapsRef = useRef<Array<ImageBitmap | null>>(
    globalGazeBitmaps || Array(GAZE_FRAME_COUNT).fill(null),
  );
  const isSaludoLoadingRef = useRef<boolean>(false);

  const animRafRef = useRef<number>(0);
  const [currentScene, setCurrentScene] = useState<RobotDynamicScene>("gaze");
  const modeRef = useRef<RobotDynamicScene | "align_to_saludo">("gaze");
  const sceneStartTimeRef = useRef<number>(0);

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

      let bmp0 = bitmaps[i0];
      let bmp1 = bitmaps[i1];

      // Zero-drop fallback: always pull closest decoded bitmap if requested index is decoding
      if (!bmp0) {
        const best = findBestBitmap(bitmaps, clamped);
        if (!best) return false;
        bmp0 = best.bmp;
        bmp1 = null;
      }

      const key = `${prefix}:${i0}:${bmp1 && frac > 0.05 ? frac.toFixed(1) : "0"}`;
      if (lastDrawnKeyRef.current === key) return true;

      const canvas = robotCanvasRef.current;
      if (!canvas) return false;
      let ctx = robotCtxRef.current;
      if (!ctx) {
        ctx = canvas.getContext("2d", { alpha: true });
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
        const isAtRest = prefix === "gaze" && Math.abs(clamped - GAZE_REST_INDEX) < 0.2;
        if (isAtRest) {
          if (robotImgRef.current.style.opacity !== "1") {
            robotImgRef.current.style.opacity = "1";
          }
        } else {
          if (robotImgRef.current.style.opacity !== "0") {
            robotImgRef.current.style.opacity = "0";
          }
        }
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
      const tScene = (now - sceneStartTimeRef.current) / 1000;

      // 1. Full Saludo Wave Playback
      if (modeRef.current === "saludo") {
        const elapsedSec = (now - saludoStartTimeRef.current) / 1000;
        const floatFrame = elapsedSec * SALUDO_FPS;

        if (floatFrame >= SALUDO_FRAME_COUNT - 1) {
          modeRef.current = "gaze";
          setCurrentScene("gaze");
          currentGazeFrameRef.current = GAZE_SALUDO_SYNC_INDEX;
          drawBlendedSequenceFrame(gazeBitmapsRef.current, GAZE_SALUDO_SYNC_INDEX, "gaze");
        } else {
          drawBlendedSequenceFrame(saludoBitmapsRef.current, floatFrame, "saludo");
          animRafRef.current = requestAnimationFrame(tick);
          return;
        }
      }

      // 2. Compute dynamic goal frame based on active scene
      let goal = targetGazeFrameRef.current;
      let speed = 16.0; // High-agility biomechanical speed (120 FPS responsiveness)
      let maxStep = dt * 96.0;

      if (modeRef.current === "align_to_saludo") {
        goal = GAZE_SALUDO_SYNC_INDEX;
        speed = 18.0;
        maxStep = dt * 110.0;
      } else if (modeRef.current === "explaining") {
        // Conversational nodding & scanning between listener and platform
        const nod = Math.sin(tScene * 3.8) * 2.8 + Math.cos(tScene * 2.1) * 1.5;
        const scan = Math.sin(tScene * 1.3) * 6.5;
        goal = Math.max(0, Math.min(GAZE_FRAME_COUNT - 1, GAZE_REST_INDEX + scan + nod));
        speed = 12.0;
        maxStep = dt * 80.0;
      } else if (modeRef.current === "listening") {
        // Attentive forward tilt holding steady contact with subtle breath
        const breath = Math.sin(tScene * 1.1) * 1.2;
        goal = Math.max(0, Math.min(GAZE_FRAME_COUNT - 1, 26 + breath));
        speed = 14.0;
        maxStep = dt * 70.0;
      } else if (modeRef.current === "celebrating") {
        // High-energy celebratory nod & bounce
        const bounce = Math.sin(tScene * 6.5) * Math.exp(-tScene * 0.45) * 8.5;
        goal = Math.max(0, Math.min(GAZE_FRAME_COUNT - 1, GAZE_REST_INDEX + bounce));
        speed = 22.0;
        maxStep = dt * 120.0;
        if (tScene > 3.2) {
          modeRef.current = "gaze";
          setCurrentScene("gaze");
        }
      }

      const cur = currentGazeFrameRef.current;
      const diff = goal - cur;
      const rawStep = diff * (1 - Math.exp(-dt * speed));
      const step = Math.abs(rawStep) > maxStep ? Math.sign(rawStep) * maxStep : rawStep;

      const nextFrame = cur + step;
      currentGazeFrameRef.current = nextFrame;
      drawBlendedSequenceFrame(gazeBitmapsRef.current, nextFrame, "gaze");

      // Check alignment to Saludo trigger
      if (modeRef.current === "align_to_saludo") {
        if (Math.abs(GAZE_SALUDO_SYNC_INDEX - nextFrame) < 0.45) {
          currentGazeFrameRef.current = GAZE_SALUDO_SYNC_INDEX;
          modeRef.current = "saludo";
          setCurrentScene("saludo");
          saludoStartTimeRef.current = now;
          drawBlendedSequenceFrame(saludoBitmapsRef.current, 0, "saludo");
        }
        animRafRef.current = requestAnimationFrame(tick);
        return;
      }

      // Keep loop running for continuous dynamic scenes (explaining, listening, celebrating)
      if (
        modeRef.current === "explaining" ||
        modeRef.current === "listening" ||
        modeRef.current === "celebrating"
      ) {
        animRafRef.current = requestAnimationFrame(tick);
        return;
      }

      // In idle gaze, settle loop once goal frame is reached
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

  // Pre-fetch single-request DMA binary for Saludo (cached permanently in CacheStorage)
  const prefetchSaludo = useCallback(async () => {
    if (isSaludoLoadingRef.current) return;
    if (saludoBitmapsRef.current[0] && saludoBitmapsRef.current[SALUDO_FRAME_COUNT - 1]) return;
    isSaludoLoadingRef.current = true;

    try {
      const blobs = await loadRobotBinaryBundle("/data/robot-saludo.bin", "CSAL");
      const decodePromises = blobs.map(async (blob, idx) => {
        const bmp = await createImageBitmap(blob);
        saludoBitmapsRef.current[idx] = bmp;
      });
      await Promise.all(decodePromises);
      globalSaludoBitmaps = saludoBitmapsRef.current;
    } catch {
      // Fallback: load saludo individual frames progressively
      const fallbackPromises: Promise<void>[] = [];
      for (let f = 1; f <= SALUDO_FRAME_COUNT; f++) {
        fallbackPromises.push(
          (async () => {
            try {
              const res = await fetch(getSaludoFrameUrl(f));
              const blob = await res.blob();
              const bmp = await createImageBitmap(blob);
              saludoBitmapsRef.current[f - 1] = bmp;
            } catch {}
          })(),
        );
      }
      await Promise.all(fallbackPromises);
    } finally {
      isSaludoLoadingRef.current = false;
    }
  }, []);

  // Main DMA initialization
  useEffect(() => {
    let cancelled = false;

    // Fast-path: If cursor gaze frames are already cached in module memory, reuse instantly (0ms)
    if (globalGazeBitmaps && globalGazeBitmaps[GAZE_REST_INDEX]) {
      gazeBitmapsRef.current = globalGazeBitmaps;
      drawBlendedSequenceFrame(globalGazeBitmaps, currentGazeFrameRef.current, "gaze");
      return;
    }

    const loadSingleGaze = async (oneBased: number) => {
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
      } catch {}
    };

    (async () => {
      // Tier 0: Load rest frame immediately (0ms instant display)
      await loadSingleGaze(GAZE_REST_INDEX + 1);

      // Tier 1: Single-request DMA batch loading for all 60 gaze frames
      try {
        const gazeBlobs = await loadRobotBinaryBundle("/data/robot-gaze.bin", "CGAZ");
        if (cancelled) return;
        const decodePromises = gazeBlobs.map(async (blob, idx) => {
          if (cancelled) return;
          const bmp = await createImageBitmap(blob);
          if (cancelled) {
            bmp.close();
            return;
          }
          gazeBitmapsRef.current[idx] = bmp;
        });
        await Promise.all(decodePromises);
        globalGazeBitmaps = gazeBitmapsRef.current;
        if (!cancelled && modeRef.current === "gaze") {
          drawBlendedSequenceFrame(gazeBitmapsRef.current, currentGazeFrameRef.current, "gaze");
        }
      } catch {
        // Fallback: Anchor ring frames
        const anchors = [1, 8, 15, 23, 31, 39, 47, 54, 60];
        await Promise.all(anchors.map((idx) => loadSingleGaze(idx)));
      }
    })();

    return () => {
      cancelled = true;
      if (animRafRef.current) cancelAnimationFrame(animRafRef.current);
      if (robotImgRef.current) {
        robotImgRef.current.style.opacity = "1";
      }
      robotCtxRef.current = null;
    };
  }, [drawBlendedSequenceFrame]);

  // Set explicit scene
  const setScene = useCallback(
    (scene: RobotDynamicScene) => {
      if (scene === "saludo") {
        void prefetchSaludo();
        if (Math.abs(currentGazeFrameRef.current - GAZE_SALUDO_SYNC_INDEX) < 0.5) {
          currentGazeFrameRef.current = GAZE_SALUDO_SYNC_INDEX;
          modeRef.current = "saludo";
          setCurrentScene("saludo");
          saludoStartTimeRef.current = performance.now();
        } else {
          modeRef.current = "align_to_saludo";
          setCurrentScene("saludo");
        }
      } else {
        modeRef.current = scene;
        setCurrentScene(scene);
        sceneStartTimeRef.current = performance.now();
      }
      startLoopIfNeeded();
    },
    [prefetchSaludo, startLoopIfNeeded],
  );

  const handleRobotClick = useCallback(() => {
    void prefetchSaludo();
    if (modeRef.current === "saludo" || modeRef.current === "align_to_saludo") return;

    // Cycle dynamically through the scenes on subsequent clicks
    if (currentScene === "gaze") {
      setScene("saludo");
    } else if (currentScene === "saludo") {
      setScene("explaining");
    } else if (currentScene === "explaining") {
      setScene("celebrating");
    } else {
      setScene("gaze");
    }
  }, [currentScene, prefetchSaludo, setScene]);

  const updateGazeFromUV = useCallback(
    (u: number, v: number) => {
      // Proactively warm up saludo when cursor is near robot (u > 0.35)
      if (u > 0.35) {
        void prefetchSaludo();
      }

      if (modeRef.current !== "gaze") return;

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
    [prefetchSaludo, startLoopIfNeeded],
  );

  const resetGazeToRest = useCallback(() => {
    if (modeRef.current === "gaze") {
      targetGazeFrameRef.current = GAZE_REST_INDEX;
      startLoopIfNeeded();
    }
  }, [startLoopIfNeeded]);

  return {
    robotCanvasRef,
    robotImgRef,
    currentScene,
    setScene,
    handleRobotClick,
    updateGazeFromUV,
    resetGazeToRest,
    prefetchSaludo,
  };
}
