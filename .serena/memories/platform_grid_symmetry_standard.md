# CELAEST Platform Section - Mathematical Grid Symmetry Standard

## Simetría y Centrado en MembersWidget
- **Alineación Vertical Fila por Fila**:
  - `mini-sidebar` y `preview-main` comparten el mismo padding superior de `18px`.
  - Fila 1 (Cabecera):
    - `.brand-header` (sidebar) y `.preview-head` (main) tienen una altura de `25.5px` y comparten la misma línea base y centro geométrico (`top: 612.875px`).
    - Margen inferior unificado de `10px` en ambos lados.
  - Fila 2 (Controles):
    - `.side-item.active` (Dashboard) y `.search-line` (Buscador) inician exactamente a la misma altura `top: 54px`.
- **Centrado Horizontal del Brandmark**:
  - `brand-header` utiliza `justify-content: center` dentro de los `116px` del sidebar.
  - Espaciado simétrico a izquierda (`17.17px`) y derecha (`17.97px`), logrando balance visual y estético limpio.