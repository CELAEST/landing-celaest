# Hero Fluid Render & Reload Glitch Elimination Standard

## Contexto y Diagnóstico Forense
Al recargar la página (tanto recarga estándar como forzada/bypass cache), se percibía un parpadeo o renderizado doble donde el robot y los textos desaparecían en negro durante ~280ms y luego reaparecían súbitamente.

El análisis cuadro por cuadro a 25 FPS con Playwright y sharp reveló dos causas concurrentes:
1. **Blackout del Robot (280ms de desaparición)**:
   - `useRobotSequenceCanvas.ts` ejecutaba `robotImgRef.current.style.opacity = '0'` de forma inmediata en cuanto el canvas se inicializaba, incluso estando en el frame de reposo (`gaze_018`).
   - El canvas 2D de Chromium tarda entre 1 y 3 cuadros en subir la textura a la GPU, creando un vacío negro instantáneo.
   - En el desmontaje (cleanup), `robotImgRef` quedaba en `opacity = '0'` mientras los bitmaps del canvas se cerraban, dejando el área completamente negra antes de que llegara el nuevo documento HTML.
2. **Flash de Contenido Desaparecido (FOUC) en Textos del Hero**:
   - `hero-intent.css` contenía `animation: intent-rise-in ... both;` con retardos de hasta 470ms. La propiedad `animation-fill-mode: both` forzaba `opacity: 0; transform: translate3d(0, 16px, 0);` sobre textos ya pintados por el SSR, haciéndolos desaparecer y volver a elevarse ("cargar 2 veces").

## Solución de Arquitectura y Contrato
1. **Fallback Visual Permanente en Reposo**:
   - `robotImgRef` (`gaze_018.webp`) NUNCA se oculta mientras el robot esté en reposo (`isAtRest === true`: `prefix === 'gaze'` y `|clamped - GAZE_REST_INDEX| < 0.2`).
   - El `<canvas>` se sitúa sobre `<img>`; al coincidir exactamente en dimensiones y contenido, no hay desfase ni salto de opacidad.
   - Solo cuando el robot anima fuera de reposo (`saludo` o mirada activa) se desvanece suavemente con `transition: opacity 250ms ease`.
   - En el `cleanup` de `useRobotSequenceCanvas`, se garantiza `robotImgRef.current.style.opacity = '1'`.
2. **Textos Hero Estables y Solid FCP**:
   - Se eliminaron las reglas `animation-fill-mode: both` y retardos que forzaban `opacity: 0` sobre el SSR en `.intent-kicker`, `.intent-title-small`, `.intent-title > strong`, `.intent-title-result`, `.intent-description` y `.intent-cta`.
   - El First Contentful Paint y Largest Contentful Paint son inmediatos, con `CLS = 0` y cero saltos visuales.
3. **Pintura Oscura Nativa Inmediata**:
   - Se configuró `style={{ backgroundColor: '#020202', colorScheme: 'dark' }}` en `<html>` y `<body>` de `layout.tsx` para asegurar que el motor del navegador pinte negro desde el frame 0 sin depender del parser CSS.

## Verificación Blackbox
- Escaneo de 218 cuadros extraídos de video Playwright con recargas normales y forzadas (sin caché):
  - Luminosidad del robot: 0 caídas a negro (nunca bajó de 84).
  - Luminosidad del texto: sólida e invariable en 71.
  - Vitest: 12/12 pruebas unitarias aprobadas.
  - TypeScript: 0 errores (`tsc --noEmit`).
  - Next.js Build: 11/11 páginas SSG generadas exitosamente.
