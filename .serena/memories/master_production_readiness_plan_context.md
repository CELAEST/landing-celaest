# Master Production Readiness Plan Context

Fase 1 (Rendimiento Élite 100/100):
1. ridge_shadowed.png (914 KB) -> ridge_shadowed.webp (~80 KB).
2. Code-splitting de Three.js con next/dynamic en security-section.tsx (descomprime 1.14 MB de JS inicial).
3. Clamping de DPR dpr={[1, 1.5]} en Three.js Canvas para dispositivos retina móviles.
4. Optimización de assets en public/.

Fase 2 (Puntos Críticos de Producción):
1. Corregir botón Enterprise (#contact roto) -> mailto o enlace válido.
2. Desacoplar DASHBOARD_URL hardcodeada a Vercel con env variable.
3. Coherencia canonical/sitemap entre layout.tsx, sitemap.ts, structured-data.ts y .env.
4. Generar public/favicon.ico para evitar 404s.
5. Agregar páginas legales a sitemap.ts.
