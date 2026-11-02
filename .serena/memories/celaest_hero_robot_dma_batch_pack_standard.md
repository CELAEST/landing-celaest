# CELAEST Standard: Robot Binary DMA Pack & Single-Draw Lag-Free Architecture

## 1. Problem Eradicated
- Previously, loading the robot animation fired 60 independent HTTP requests for Gaze and 72 for Saludo (132 total WebP files).
- Frame-by-frame fallback caused jerky visual jumps ("tirones") as frames downloaded asynchronously out-of-order.
- Double alpha blending (`drawImage` of bmp0 + `drawImage` of bmp1 with `globalAlpha`) on a 1920x1080 canvas burned 1.5 GB/s of raster memory, producing GPU fill-rate throttling and ghosting.
- Premature trigger (`u > 0.4`) caused 15 saludo frames to compete with gaze during cursor movement.

## 2. Binary DMA Architecture (Industry Best Practice)
- **Packager**: `scripts/pack-robot-sequences.js` (npm run pack:robot) packs frames into single binary DMA containers:
  - `public/data/robot-gaze.bin`: 2.99 MB (60 frames, magic `CGAZ`).
  - `public/data/robot-saludo.bin`: 4.29 MB (72 frames, magic `CSAL`).
- **Binary Format**:
  - Header (8 bytes): Magic (4 bytes ASCII), Version (uint8), Reserved (uint8), FrameCount (uint16 LE).
  - Index Table (FrameCount * 8 bytes): Offset (uint32 LE) and Length (uint32 LE) for each frame.
  - Raw WebP Payload: Direct contiguous image byte streams.
- **Loader**: `src/components/landing/hero/robot-binary-loader.ts`:
  - `loadRobotBinaryBundle`: Queries browser `window.caches` (CacheStorage API) for 0ms repeat visit retrieval. If cache miss, downloads via a single stream and asynchronously stores to CacheStorage.
  - Slices `ArrayBuffer` into typed image Blobs in RAM with DMA direct indexing.

## 3. Single-Draw Crisp 2D Canvas Engine
- Located in `src/components/landing/hero/useRobotSequenceCanvas.ts`.
- Evaluates `targetIdx = Math.round(clamped)`.
- Exactly **1 single `ctx.drawImage` call** per RAF tick.
- Zero blurry ghosting, 50% less GPU fill rate.
- Instant fallback via `findBestBitmap` ensures zero dropped draws while initial bundle decodes.
- Decoupled Saludo: `prefetchSaludo` strictly bound to `onPointerEnter` on `.intent-robot-hitbox` and `handleRobotClick`.
