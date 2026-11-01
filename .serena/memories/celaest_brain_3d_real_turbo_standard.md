# CELAEST Brain 3D Real Turbo Architecture Standard

## 1. Context & Motivation
The landing's particle brain component previously loaded `particle_ui_brain.gltf` (1.1 MB) dynamically and ran `MeshSurfaceSampler` 27,000 times on the main CPU thread upon mount, causing scroll lag, empty placeholder delays, and dropped frames.

## 2. Implemented Architecture (GPU Direct Binary Stream)
- Pre-baked particle coordinates into a lightweight binary buffer `public/data/brain-particles.bin` (648 KB uncompressed, ~200 KB over HTTP/2) containing all 27,000 exact sampled 3D points (18,000 for Layer A structure and 9,000 for Layer B surface flow).
- `brain-data-loader.ts` streams this binary buffer directly into TypedArrays (`Float32Array`), enabling sub-millisecond instantiation of `THREE.BufferAttribute` with zero GLTF overhead and zero CPU sampling loops.
- `preloadBrainParticles()` triggers in idle (`requestIdleCallback`) during initial page load, warming up the GPU buffer in the background before the user scrolls to the section.
- `dynamic-infrastructure.tsx` uses an anticipatory `800px` rootMargin observer and direct component import in `products-view.tsx` to eradicate lazy waterfalls.
- Vertex Shader Curl Noise is gated by `if (attract > 0.001)` so idle frames skip expensive multi-simplex mathematical evaluations, guaranteeing 60 FPS locked across desktop and mobile.