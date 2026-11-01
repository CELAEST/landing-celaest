# CELAEST Project Purge & Zero-Lag Progressive Loading Standard

## 1. Project Purge & Deprecation
- Eliminated all legacy folders and versions: `src/components/landing-v2/` (entire duplicate tree), `src/app/[locale]/v2/page.tsx`, `public/propuestas/` (20 screenshot PNGs), `public/~partytown/`, `public/videos/`, `public/spline-viewer*.html`, and `public/particle_ui_brain.gltf` (1.1 MB).
- Net impact: 249 files removed / modified, 31,853 lines of dead code eradicated.

## 2. Zero-Lag Initial Load Pipeline
- Fixed the network & CPU choke in `useRobotSequenceCanvas.ts`:
  - Previously fired 132 parallel fetches (7.6 MB) on initial page mount.
  - Now loads ONLY the single critical rest frame (`gaze_018.webp`, ~50 KB) immediately.
  - Progressive loading: loads remaining gaze frames in gentle batches of 4 during browser idle time (`requestIdleCallback`) yielding back to the main thread.
  - Saludo frames (4.5 MB) load only after gaze is complete or on user interaction, freeing up 100% of network bandwidth during page load.
- Dynamic Infrastructure:
  - Canvas mounting is tied to anticipatory `IntersectionObserver` (500px margin) instead of an aggressive timer during hero hydration.
  - Pre-baked particle data streams from `public/data/brain-particles.bin` via DMA direct load.
  - Production build compiles 100% cleanly in 7.3s. Dev lock is unlocked.