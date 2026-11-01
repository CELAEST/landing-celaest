# CELAEST Security Core Particles Standard (100% Faithful Reproduction)

## Context & User Mandate
The security core component in `src/components/landing/security/particle-core-canvas.tsx` MUST preserve 100% of the original visual identity:
1. **Official Emblem / Logo**: Uses the exact SVG path `CELAEST_LOGO_PATH_D` from `src/components/ui/logo-path.ts` (viewBox 380x503, lambda silhouette).
2. **Procedural Geometries**:
   - Shield: Original extruded geometry with `shape.moveTo(-1, 1)` and exact bevel.
   - Globe: 14 TorusGeometries (latitudes + meridians).
   - Padlock: `magic_lock.gltf` meshes filtered by `obj.name.toLowerCase().includes("lock")`, with exact yaw/pitch rotation and centering (`LOCK_YAW = 1.4`, `LOCK_Y_OFFSET = 0.33`).
   - Sphere: Resting sphere positions, normals, seeds, and phases.
3. **GPU Binary Stream**: All 8 vertex attributes (6,000 points each) pre-baked into `/public/data/security-particles.bin` (`CELAEST_SEC_V2`, 480 KB). Zero GLTF/SVG CPU parsing at runtime.
