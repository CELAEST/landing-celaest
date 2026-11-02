# CELAEST Platform Section - Exact Editorial & Micro-UI Standard

## Resumen de Arquitectura Visual
1. **Estructura Editorial Abierta (replicar-diseno-web)**:
   - Contenedor simétrico alineado a las secciones superiores: `max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8`.
   - Cabecera con eyebrow (`—— CAPACIDADES`), títulos a doble línea (`Potencia tu` / `flujo de trabajo.`) y subtítulo.
   - Grid de 3 columnas (`01`, `02`, `03`) separadas por bordes sutiles verticales (`border-left: 1px solid #24242b`), números con regla horizontal de 65px (`#3d3947`) y link `Explorar →`.
   - Cero cajas envolventes pesadas previas para conservar el diseño limpio tipo editorial.

2. **Micro-UI de Alta Fidelidad en las Cajas Interactivas**:
   - **Columna 01 (MembersWidget)**:
     - Avatares fotográficos reales en WebP (`public/images/platform/avatars/esteban.webp`, `maria.webp`, `carlos.webp`, `lucia.webp`) en círculos de 22px con borde sutil `border-white/10`.
     - Roles alineados (`Owner`, `Admin`, `Member`, `Member`) en `#9896a1`.
     - Indicador `Active` con punto verde neón brillante (`bg-[#10b981] shadow-[0_0_6px_#10b981]`) y tipografía verde menta `#62d6a4`.
     - Menú de tres puntos `···` y paginación en el pie: `4 members` y `< 1/1 >`.
     - Sidebar mini con `Dashboard` activo en fondo púrpura `#251a49`.
   - **Columna 02 (PipelineWidget)**:
     - Canvas de nodos con matriz de puntos (`radial-gradient`).
     - Nodos de Trigger, Ejecutar acción, Completado (verde) y Error / Reintentar (rojo).
     - Cableado SVG curvo con ramificación y pines de conexión púrpuras.
   - **Columna 03 (EcosystemWidget)**:
     - Buscador y selector de categorías.
     - Grid 2x2 con badges de colores para Auto Sync, Data Fetcher, Sheets Bridge y Slack Connector (espaciado y tipografía ajustada para renderizado 100% visible sin cortes).