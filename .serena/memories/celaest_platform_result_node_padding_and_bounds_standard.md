# Standard de Padding y Calibración de Nodos de Resultado en Platform Widgets (CELAEST)

## Diagnóstico del Desfase y Desbordamiento ("Se sale")
En el widget de automatización (`PipelineWidget`, columna 02 de `PlatformSection`):
1. **Colisión Interna del Texto ("Error / Reintentar")**:
   - La tarjeta `.flow-node.result.error` tenía un ancho rígido de `122px` en base desktop y `110px` en viewport intermedio.
   - El contenido interior comprende:
     - Padding izquierdo: 11px
     - Icono squircle de error (cruz): 22px
     - Gap entre icono y texto: 8px
     - Texto `<b>Error / Reintentar</b>` (18 caracteres a font-size 10.5px): ~83px
     - Padding derecho requerido: 11px - 14px
     - Total requerido: 136px.
   - Con `width: 122px`, el texto sobrepasaba la caja en +11px, dejando la letra "r" de "Reintentar" a 1px o colisionando contra el borde redondeado derecho de la tarjeta ("esto se sale").

2. **Desbordamiento Lateral del Canvas**:
   - En viewports intermedios (ancho de canvas ~234px - 250px cuando DevTools está anclado a la derecha), si las tarjetas se posicionan a offsets de zócalo muy alejados o sin recalibración fina, la tarjeta derecha roza el borde exterior del canvas.

## Solución Impecable y Calibración
1. **Base Desktop (> 1480px / 1920px)**:
   - `.flow-node.result`: `padding: 0 11px; gap: 8px;`
   - `.flow-node.result b`: `font-size: 10px; font-weight: 600; letter-spacing: -0.2px;`
   - `.flow-node.result.success`: `width: 114px; left: calc(50% - 73px);`
   - `.flow-node.result.error`: `width: 136px; left: calc(50% + 73px);`
   - Margen de texto derecho: 15px de padding libre y simétrico. Margen contra el borde del canvas: 14.5px. Zócalo alineado con diff = 0px.

2. **Intermedio DevTools (<= 1480px / 1366px - 1200px)**:
   - `.flow-node.result`: `height: 40px; padding: 0 9px; gap: 6px;`
   - `.flow-node.result b`: `font-size: 8.5px;`
   - `.flow-node.result.success`: `width: 98px; left: calc(50% - 57px);`
   - `.flow-node.result.error`: `width: 114px; left: calc(50% + 57px);`
   - Margen de texto derecho: 12.4px. Margen contra el borde del canvas: 15px - 48px. Diff de zócalo = 0.2px.

3. **Intermedio Estrecho (<= 1150px / 1090px)**:
   - `wire-branch-svg`: `width: 184px;`
   - Offset exacto: $184 \times 0.292 = 53.7\text{px} \approx 54\text{px}$.
   - `.flow-node.result.success`: `width: 96px; left: calc(50% - 54px);`
   - `.flow-node.result.error`: `width: 112px; left: calc(50% + 54px);`
   - Margen interior del texto: 10.4px. Margen exterior contra el borde del canvas: 7.2px libre.

4. **Invarianza Móvil (< 500px / 390px)**:
   - Intacto y preservado según estándar previo verificado.
