# Standard de Responsividad Fluida y Continuidad en Reducción (CELAEST)

## Contexto
Al redimensionar la ventana o abrir la consola de desarrollo (reducción de ancho de 1440px a rangos intermedios: 1240px, 1150px, 1024px, 960px, 850px, 768px), existían cortes visuales y superposiciones en tres secciones clave:
1. **HeroSection**: El robot gigante (1173px de ancho intrínseco con relación 16:9) se colocaba detrás/encima del texto copiado; el título con `white-space: nowrap` y `font-size` rígidos excedía el contenedor; y el carril lateral (`SectionProgressNav`) colisionaba con el copy a `< 1080px`.
2. **ProductsSection**: El diseño dividido canónico `44% / 56%` mantenía 2 columnas forzadas hasta 1024px, aplastando los títulos a 4 renglones en anchos entre 1024px y 1240px.
3. **PlatformSection**: El `feature-grid` conservaba 3 columnas (`repeat(3, 1fr)`) hasta 960px, reduciendo el ancho por columna a ~240px. Esto cortaba los nodos de `PipelineWidget` ("Error / Reintentar...") y la segunda columna de tarjetas de `EcosystemWidget` ("Data Fetcher", "Slack Connector").

## Solución Desacoplada sin Modificar Mobile ni PC Completo
Sin alterar el diseño móvil (< 640px) ni el de PC pantalla completa (>= 1280px):
1. **HeroSection (`hero-intent.css`)**:
   - Breakpoint fluido a `1240px`.
   - `.intent-copy`: `left: clamp(28px, 4vw, 56px); width: min(580px, calc(100% - 56px));`.
   - Robot: escala a `height: clamp(500px, 80vh, 760px); right: clamp(-200px, -15vw, -40px); opacity: 0.88;`.
   - Viñeta oscura con gradiente reforzado a 34% para garantizar contraste perfecto y legibilidad total.
   - `.intent-title`: `padding-right: 6px;` para amortiguar el glow de las letras sin generar scrollWidth.
2. **ProductsSection (`products.css`)**:
   - Relleno suave en `1081px - 1240px`: `padding: 44px 32px 44px 0;`.
   - Transición elegante a 1 columna en `max-width: 1080px`.
3. **PlatformSection (`platform-previews.css`)**:
   - `PipelineWidget`: Nodos centrados simétricamente a `left: calc(50% ± 63px)` con anchos de 112px/122px.
   - `EcosystemWidget`: Grid de tarjetas con `repeat(2, minmax(0, 1fr))`, `min-width: 0`, navegación a `clamp(74px, 7vw, 92px)`. Cero corte de tarjetas en 3 columnas.
   - Transición a 1 columna en `max-width: 1080px` con `max-width: 520px; margin: 0 auto;`.
4. **SectionProgressNav (`section-progress-nav.css`)**:
   - Ocultamiento del riel flotante en `<= 1080px`, liberando el margen lateral en tablets y laptops con devtools abierto.

## Validación Automatizada con Chrome Vivo
- 1366px, 1150px, 1024px, 960px, 850px, 768px verificados por AST y DOM bounding rects.
- `hasOverflow: false` en todos los viewports para el título y el copy del Hero.
- `isCutOff: false` en todas las columnas de widgets de PlatformSection.
- 12/12 pruebas pasadas en Vitest.
- Build Next.js estático 11/11 rutas generadas.
