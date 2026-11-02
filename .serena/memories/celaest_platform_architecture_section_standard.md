# CELAEST Architecture Section - Harmonized Scale & Diagonal Numbers Standard

## Especificaciones de Maquetación & Escala Proporcional
1. **Escala Tipográfica Armonizada (Anti-Gigantismo)**:
   - El título principal se ajustó de 96px a `text-4xl sm:text-5xl lg:text-[62px] leading-[0.96] tracking-[-2.2px]` para coincidir de forma balanceada con la escala de las demás secciones de la landing (`capabilities-title` en `platform-section.tsx`).
   - El subtítulo se calibró a `text-base sm:text-lg leading-[1.4]`.
2. **Posicionamiento Diagonal de Números**:
   - Siguiendo el contrato exacto de `replicar-diseno-web-arriba-footer`, los números (`01`, `02`, `03`, `04`) se ubican en la esquina superior izquierda de cada columna (`position: absolute; top: 0; left: 0;`), quedando en **posición diagonal** respecto al icono SVG.
   - El icono se sitúa en la fila superior con `padding-left: 36px` a `height: 89px`.
3. **Escala y Luminosidad de los Iconos**:
   - Iconos vectoriales de `66px x 66px` con trazo definido (`1.8px - 2.0px`) y resplandor sutil `#D0C7FF`.
4. **Ancho Contenedor Maestro**:
   - Restringido a `max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8` para alinearse verticalmente con las demás secciones de la landing.
