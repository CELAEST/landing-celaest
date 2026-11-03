# CELAEST Lingua: Chibi Robot 2-Layer Hybrid Architecture (Clean 3D Head DMA + Live 60 FPS OLED Visor)

## 1. Architectural Contract (Zero-WebGL Runtime, 0ms Paint)
Instead of 5 heavy baked `.bin` files (10.75 MB) with static/attenuated UV faces, Lingua's mentor Liam uses a decoupled 2-layer 2D Canvas pipeline:

1. **Layer 1 — Clean 3D Body & Head Sweep (`/data/chibi-head.bin`, magic `CHED`, 2.82 MB, 61 frames)**:
   - Baked from authentic `professor_mentor.glb` + `visor.glb` with `faceEngine = null` (`emissiveIntensity: 0`, pure `#000000` matte obsidian visor cavity).
   - Frame `30` (`HEAD_REST_INDEX = 30`) is exact `0.00 rad` dead-center symmetry (`0..29` left sweep, `31..60` right sweep).
   - Cached in RAM (`ImageBitmap[]`) + `CacheStorage` (`celaest-chibi-assets-v2`), with `/images/chibi_rest.webp?v=2` as Tier-0 instant paint.
2. **Layer 2 — Live 60 FPS Procedural Visor (`CyberVisorFaceEngine.ts`, 0 KB network, zero Three.js import)**:
   - Composited in `visorOverlayRenderer.ts` (`renderProfessorCompositeFrame`) inside the exact calibrated obsidian visor squircle (`clipLeft(u)..clipRight(u), y=70..294` in `720x720` space) with `"screen"` + `"lighter"` (0.28) OLED bloom and perspective tracking (`faceCenterX = 373.5 + u * 31`).
   - Zero `.glb` or `three` chunks loaded on `/pathway` or `/workspace`.

## 2. Modular File Decomposition (`src/design-system/components/Professor3D/`)
- `ProfessorStageCanvas.tsx` (~80 lines): Lightweight React view + preset zoom (`tutor-stage`, `bust-guide`, `face-focus`).
- `useProfessorCanvasLoop.ts` (~115 lines): 60 FPS `requestAnimationFrame` driver, state-to-emotion mapping, and cursor gaze tracking.
- `visorOverlayRenderer.ts` (~75 lines): Ground-truth calibrated 2D compositor (`HEAD_FRAME_COUNT = 61`, `HEAD_REST_INDEX = 30`).
- `CyberVisorFaceEngine.ts`: Pure 2D procedural OLED visor engine (`vocal_capsule` syllabic mouth articulation `8..92px`, `ear_radar`, `thinking`, `happy`, natural blinking).
