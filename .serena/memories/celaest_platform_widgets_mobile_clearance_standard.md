# Standard de Dimensionamiento Responsivo en Platform Widgets (CELAEST)

## Contexto
En pantallas moviles (< 500px, 390px iPhone, 360px Android), los widgets de la seccion Platform (Capacidades Empresariales) presentaban recortes laterales:
- Columna 01 (Members): Funcionaba bien gracias a flex: 1 y text-overflow: ellipsis.
- Columna 02 (Automation Pipeline): El nodo de error (`flow-node.result.error`) tenia ancho fijo de 142px y desplazamiento `left: calc(50% + 73px)`, sobrepasando el ancho util del canvas (280px) por la derecha.
- Columna 03 (Asset Ecosystem): Las tarjetas (`asset-card`) en el grid 2x2 tenian padding horizontal de 12px y el sidebar `asset-nav` ocupaba 96px, provocando que `Data Fetcher` y `Slack Connector` se cortaran por el borde derecho.

## Solucion Quirurgica sin Modificar PC
Todas las calibraciones se encapsularon en `@media (max-width: 500px)` y `@media (max-width: 360px)` dentro de `platform-previews.css`:
1. **Automation Pipeline**:
   - Barra de herramientas: `width: 40px` (36px en <= 360px).
   - Nodos Trigger y Action adaptados a `138px` y `148px`.
   - Wishbone SVG escalado a `width: 206px` (192px en <= 360px).
   - Nodos de resultado centrados simetricamente a `calc(50% - 60px)` (success, 102px) y `calc(50% + 60px)` (error, 118px), dejando un margen lateral limpio de 24px-32px sin cortes.
2. **Asset Ecosystem**:
   - Padding del contenedor `.assets-preview`: `10px 11px`.
   - Sidebar de categorias: `width: 86px` con gap de 8px.
   - Grid de tarjetas: `gap: 8px` con `min-width: 0` y padding `8px 8px`.
   - Tipografia de titulos `10px` con `text-overflow: ellipsis`.
   - Todas las 4 tarjetas (Auto Sync, Data Fetcher, Sheets Bridge, Slack Connector) caben perfectamente con borde completo y boton de descarga visible.
3. **PC (>= 960px)**:
   - 100% inalterado (altura fija 261px, 3 columnas alineadas, espaciado desktop intacto).
