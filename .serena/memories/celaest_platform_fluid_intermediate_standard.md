# Standard de Calibración Fluida e Intermedia para PlatformSection (CELAEST)

## Contexto y Diagnóstico
Al redimensionar el navegador o abrir la consola de desarrollo (DevTools anclado a la derecha en pantallas de 1920x1080 o laptops de 1366x768 / 1440x900), el viewport de la página se reduce a anchos intermedios (1350px, 1200px, 1120px, 1085px).
En este rango, la sección "Potencia tu flujo de trabajo" (`PlatformSection`, `#platform`) forzaba 3 columnas fijas con dimensiones rígidas de desktop:
- **Columna 01 (MembersWidget)**: El sidebar fijo de 116px y badges de estado comprimían los nombres de los miembros (`b`) hasta 0px de ancho disponible (`text-overflow: ellipsis` forzado).
- **Columna 02 (PipelineWidget)**: El Wishbone SVG de conexión ramificada (`width: 250px`) y los nodos de resultado (`Completado`: 112px, `Error / Reintentar`: 122px a `calc(50% ± 63px)`) sobrepasaban el ancho del lienzo de la columna (177px - 225px), provocando que el borde y los textos del nodo de error se cortaran en el borde derecho por `overflow: hidden`.
- **Columna 03 (EcosystemWidget)**: Las tarjetas en grid 2x2 (`Auto Sync`, `Data Fetcher`, `Sheets Bridge`, `Slack Connector`) quedaban aplastadas a 55px-60px con solapamiento visual.

## Solución Desacoplada sin Modificar PC Pantalla Completa ni Mobile
Sin alterar el diseño móvil (< 640px / <= 500px) ni el de PC pantalla completa (>= 1440px / 1920px):
1. **Breakpoint Intermedio (@media (max-width: 1380px))**:
   - Relleno de columna simétrico: `padding: 32px 16px 40px 0;` y borde divisorio con `padding-left: 16px;`.
   - Títulos fluidos: `.feature-heading` escalado a `clamp(26px, 2.3vw, 32px)` con `letter-spacing: -1.2px`.
2. **MembersWidget Calibrado**:
   - Sidebar optimizado a `100px` con padding suave `16px 7px 12px`.
   - Badges y roles compactados (`active-badge: 38px`, `small: 34px`), garantizando al menos 60px-80px de espacio libre para nombres legibles sin truncamiento prematuro.
3. **PipelineWidget Matemáticamente Alineado**:
   - Toolbar a `38px` (herramienta activa `24px`).
   - Nodos Trigger y Action a `136px` y `144px`.
   - Wishbone SVG a `196px`.
   - Nodos de resultado simétricos: `success` (98px) a `calc(50% - 57px)` y `error` (110px) a `calc(50% + 57px)`, alineados exactamente a los zócalos del SVG y manteniendo un margen lateral de 18px-45px libre de cortes en todo el espectro.
4. **EcosystemWidget**:
   - Sidebar de navegación de categorías a `74px` (70px en <= 1150px).
   - Grid con gap de 6px y tarjetas con padding `7px 7px`, permitiendo que las 4 tarjetas mantengan sus títulos y botones de descarga perfectamente visibles.
5. **Transición Continua (@media (max-width: 1150px) y @media (max-width: 1080px))**:
   - Amortiguador fino a `1150px` con padding de 12px.
   - En `<= 1080px`, transición suave a 1 columna apilada (`grid-template-columns: 1fr; gap: 32px`) con `.preview { max-width: 520px; }`.

## Verificación Blackbox en Chrome Vivo
- Viewports verificados: 1920px, 1440px, 1350px, 1200px, 1120px, 1085px, 960px, 800px, 500px, 390px, 360px.
- `clipsLeft: false` y `clipsRight: false` en todos los nodos y tarjetas.
- 12/12 pruebas unitarias de Vitest aprobadas.
- Type-check de TypeScript 100% aprobado.
- Build Next.js SSG de 11/11 rutas estáticas compilado sin errores.
