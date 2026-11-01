# CELAEST 3D R3F Turbopack HMR & Dynamic Import Standard

## Context & Problem
During Turbopack development in Next.js 16+, wrapping client components like `dynamic-infrastructure-canvas.tsx` or `particle-core-canvas.tsx` inside `dynamic(() => import(...), { ssr: false })` produces separate dynamic chunk entrypoints. When modules or imports are refactored or updated during hot reload, Turbopack's in-memory factory table desynchronizes, triggering:
`Module ... was instantiated because it was required from module ... but the module factory is not available. It might have been deleted in an HMR update.`

## Standard Solution
1. Replace `next/dynamic` with direct imports:
   ```tsx
   import ParticleCoreCanvas from "./particle-core-canvas";
   import DynamicInfrastructureCanvas from "./dynamic-infrastructure-canvas";
   ```
2. Guard rendering with client-mount state (`mounted && visible`):
   ```tsx
   const [mounted, setMounted] = useState(false);
   useEffect(() => { setMounted(true); }, []);
   return mounted ? <CanvasComponent ... /> : <FallbackSkeleton />;
   ```
   This completely protects SSR without creating fragmented dynamic chunks in Turbopack.
3. Pre-bake all heavy 3D assets (lock, shield, globe, logo, brain) into flat binary buffers (`Float32Array`) in `/public/data/*.bin`.
4. Zero dependencies on `three-stdlib/loaders/GLTFLoader` at runtime.
5. Automated validation via Vitest (`__tests__/data-loaders.test.ts`) and Playwright E2E console log inspection.
