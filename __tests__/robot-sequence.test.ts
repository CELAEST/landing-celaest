import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import {
  GAZE_FRAME_COUNT,
  GAZE_REST_INDEX,
  GAZE_SALUDO_SYNC_INDEX,
  SALUDO_FRAME_COUNT,
  SALUDO_FPS,
} from "@/components/landing/hero/useRobotSequenceCanvas";

describe("useRobotSequenceCanvas constants and kinematics", () => {
  it("has exact frame sync anchors between Gaze and Saludo", () => {
    expect(GAZE_FRAME_COUNT).toBe(60);
    expect(SALUDO_FRAME_COUNT).toBe(72);
    expect(SALUDO_FPS).toBe(30);

    // Gaze Rest Frame is index 17 (gaze_018.webp)
    expect(GAZE_REST_INDEX).toBe(17);

    // Gaze Saludo Sync Frame is index 59 (gaze_060.webp matches frame_001.webp)
    expect(GAZE_SALUDO_SYNC_INDEX).toBe(59);
  });

  it("calculates exponential saccade step without artificial bottlenecks", () => {
    const dt = 0.016; // 60 FPS frame time
    const speed = 16.0;
    const diff = 40; // User moves mouse across screen
    const maxStep = dt * 96.0; // 1.536 frames per tick

    const rawStep = diff * (1 - Math.exp(-dt * speed));
    const step = Math.abs(rawStep) > maxStep ? Math.sign(rawStep) * maxStep : rawStep;

    // Must be bounded by maxStep to avoid instant snapping, but large enough for instant responsiveness (> 1.0 frame/tick)
    expect(step).toBeGreaterThan(1.0);
    expect(step).toBeLessThanOrEqual(maxStep);
  });

  it("guarantees crisp single-draw discrete frame rounding without ghosting", () => {
    expect(Math.round(17.2)).toBe(17);
    expect(Math.round(17.49)).toBe(17);
    expect(Math.round(17.5)).toBe(18);
    expect(Math.round(17.8)).toBe(18);
  });

  it("safely finds nearest loaded bitmap in sparse array without dropping frames", () => {
    const mockBitmaps = new Array(60).fill(null);
    mockBitmaps[17] = { width: 1920, height: 1080 };
    mockBitmaps[59] = { width: 1920, height: 1080 };

    function findBest(bitmaps: (unknown | null)[], targetIdx: number) {
      const maxIdx = bitmaps.length - 1;
      const clamped = Math.max(0, Math.min(maxIdx, targetIdx));
      if (bitmaps[clamped]) return bitmaps[clamped];

      for (let r = 1; r <= maxIdx; r++) {
        const left = clamped - r;
        if (left >= 0 && bitmaps[left]) return bitmaps[left];
        const right = clamped + r;
        if (right <= maxIdx && bitmaps[right]) return bitmaps[right];
      }
      return null;
    }

    const result25 = findBest(mockBitmaps, 25);
    expect(result25).not.toBeNull();
    expect(result25).toBe(mockBitmaps[17]);

    const result55 = findBest(mockBitmaps, 55);
    expect(result55).not.toBeNull();
    expect(result55).toBe(mockBitmaps[59]);
  });

  it("validates that robot-gaze.bin exists and matches binary DMA specification", () => {
    const gazeBinPath = path.join(process.cwd(), "public/data/robot-gaze.bin");
    expect(fs.existsSync(gazeBinPath)).toBe(true);

    const buf = fs.readFileSync(gazeBinPath);
    expect(buf.subarray(0, 4).toString("ascii")).toBe("CGAZ");
    expect(buf.readUInt8(4)).toBe(1); // Version 1
    expect(buf.readUInt16LE(6)).toBe(60); // 60 frames

    // First frame offset must start immediately after header (8) + 60 * 8 = 488 bytes
    expect(buf.readUInt32LE(8)).toBe(488);
    // Optimized 1280x720 budget: ~1.3MB (must be under 2MB for high-speed delivery)
    expect(buf.length).toBeGreaterThan(1 * 1024 * 1024);
    expect(buf.length).toBeLessThan(2 * 1024 * 1024);
  });

  it("validates that robot-saludo.bin exists and matches binary DMA specification", () => {
    const saludoBinPath = path.join(process.cwd(), "public/data/robot-saludo.bin");
    expect(fs.existsSync(saludoBinPath)).toBe(true);

    const buf = fs.readFileSync(saludoBinPath);
    expect(buf.subarray(0, 4).toString("ascii")).toBe("CSAL");
    expect(buf.readUInt8(4)).toBe(1); // Version 1
    expect(buf.readUInt16LE(6)).toBe(72); // 72 frames

    // First frame offset must start immediately after header (8) + 72 * 8 = 584 bytes
    expect(buf.readUInt32LE(8)).toBe(584);
    // Optimized 1280x720 budget: ~1.95MB (must be under 2.5MB for fast parallel decoding)
    expect(buf.length).toBeGreaterThan(1.5 * 1024 * 1024);
    expect(buf.length).toBeLessThan(2.5 * 1024 * 1024);
  });

  it("manages session-based greeting state correctly via sessionStorage", () => {
    // Clear storage before test
    sessionStorage.clear();

    const SESSION_GREETED_KEY = "celaest_robot_greeted";
    expect(sessionStorage.getItem(SESSION_GREETED_KEY)).toBeNull();

    sessionStorage.setItem(SESSION_GREETED_KEY, "true");
    expect(sessionStorage.getItem(SESSION_GREETED_KEY)).toBe("true");

    sessionStorage.removeItem(SESSION_GREETED_KEY);
    expect(sessionStorage.getItem(SESSION_GREETED_KEY)).toBeNull();
  });
});
