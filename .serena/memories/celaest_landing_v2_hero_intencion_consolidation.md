# CELAEST Landing — Consolidación V2 + Hero Intención (Silk Gaze 60f + Saludo 72f)

## Resumen de Arquitectura y Limpieza
1. **Consolidación de V2 como única Landing Page (`src/app/[locale]/page.tsx`)**:
   - Se eliminó la ruta duplicada `src/app/[locale]/v2/page.tsx` y la carpeta duplicada `src/components/landing-v2/`.
   - Se eliminaron todos los componentes y dependencias obsoletas de V1/Spline (`spline-minimal-loader.tsx`, `@splinetool/react-spline`, `@splinetool/runtime`, `@builder.io/partytown`, `public/sw.js`, `public/~partytown`, `public/spline-viewer*.html`, `public/propuestas`, `public/videos`, `public/billing`, `public/images`, `..lab`).
   - Se eliminaron los cuellos de botella de re-renderizado global (`LabContext` + `LabHUD` que ejecutaban `setState` en cada `mousemove` global). `SpotlightCard`, `MagneticElement` y `VolumetricAura` ahora operan en `src/components/landing/lab/` con cero re-renders de React en `mousemove` (usando variables CSS `--rx`, `--ry`, `--mouse-x`, `--mouse-y` e inercia bajo demanda en `requestAnimationFrame`).

2. **Integración Modular del Nuevo Hero ("De la Intención al Resultado")**:
   - `src/components/landing/hero-section.tsx`: Orquestador del Hero con soporte completo `next-intl` (`es` por defecto y `en`).
   - `src/components/landing/hero/useRobotSequenceCanvas.ts`: Hook para precarga en paralelo (`ImageBitmap`), interpolación sub-frame en `<canvas>` (`drawBlendedSequenceFrame` con `desynchronized: true`) y playhead con velocidad acotada para los **60 frames** de Silk Gaze (`public/robot_hero_gaze/gaze_001..060.webp`) y **72 frames** de Saludo (`public/robot_hero_saludo/frame_001..072.webp`).
   - `src/components/landing/hero/HeroArtStage.tsx`: Escenario multicapa con monolito SVG (`CELAEST  //  SYSTEMS`), robot y montaña con paralaje (`public/ridge_shadowed.png`).
   - `src/components/landing/hero/HeroIntentCopy.tsx`: Tipografía editorial interactiva (`DE LA INTENCIÓN AL RESULTADO` / `FROM INTENTION TO RESULTS`) con iluminación por letra (`--glow`) y borde degradado direccional en `RESULTADO`.
   - **Branding CELAEST + `<Logo />`**: Se integró el componente `<Logo />` (`src/components/ui/logo.tsx`) junto a `CELAEST` en `.intent-brand`, y se corrigieron todas las ocurrencias de `CELAES` / `CELEAST` / `Celeast` a `CELAEST` en toda la aplicación.
