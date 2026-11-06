# Robot Gaze Cursor Sequence Preload & Multi-Tier Cache Standard

## Arquitectura de Caché para la Animación del Cursor
La secuencia de la mirada del robot (`/data/robot-gaze.bin`, 60 fotogramas que siguen la posición del cursor en tiempo real) cuenta ahora con aceleración de nivel cero:

1. **Preload en `<head>` (HTTP/2 Parallel Fetch)**:
   - Configurado en `src/app/[locale]/layout.tsx`:
     `<link rel="preload" as="fetch" href="/data/robot-gaze.bin" crossOrigin="anonymous" />`
   - Se inicia la descarga paralela desde el primer byte de HTML sin esperar la ejecución de JavaScript ni el montaje de React.

2. **Caché en Memoria de Módulo (Module-Scope GPU Textures)**:
   - En `src/components/landing/hero/useRobotSequenceCanvas.ts`:
     `let globalGazeBitmaps: Array<ImageBitmap | null> | null = null;`
   - Una vez decodificados los 60 `ImageBitmap` en GPU, persisten en memoria de módulo durante toda la sesión.
   - En navegaciones internas de la SPA o cambios de idioma (`/es` <-> `/en`), el hook los reutiliza en **0.0 ms absolutos** sin volver a realizar `fetch` ni `createImageBitmap()`.

3. **CacheStorage Local Persistente**:
   - `robot-binary-loader.ts` guarda el contenedor en `window.caches` (`celaest-robot-assets-v1`).

4. **Encabezados HTTP Inmutables (1 Año)**:
   - `next.config.ts` sirve `/data/:path*` con `Cache-Control: public, max-age=31536000, immutable`.
