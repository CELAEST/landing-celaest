# Standard de Organizacion y Alineacion de Controles de Pricing en Mobile (CELAEST)

## Contexto
En pantallas moviles (< 640px, 390px iPhone, 360px Android), la barra de controles de Pricing (`.pricing-controls-bar`) sufria un problema de organizacion visual:
1. `Prices shown in COP · Colombia` se mostraba con un divisor vertical huerfano (`|`) flotando al final de la linea.
2. `BILLING: Monthly Yearly -17%` se centraba independientemente, tambien con un divisor vertical huerfano al final.
3. `CURRENCY: COP USD` se centraba independientemente en la tercera linea, creando un desfase en escalera/zigzag entre las etiquetas `BILLING:` y `CURRENCY:` de mas de 34px.

## Solucion Quirurgica sin Modificar PC
Se encapsulo la reorganizacion exclusivamente bajo `@media (max-width: 640px)`:
1. **Desktop (`> 640px`) 100% Invariante**:
   - Se anadio la clase contenedora `.pricing-switches-group { display: contents; }`. Al usar `display: contents;`, en pantallas de escritorio la envoltura desaparece a nivel de box model y los 5 elementos (badge, divider, billing, divider, currency) continúan renderizandose en una sola linea horizontal continua e intacta.
2. **Mobile (`<= 640px`) Editorial Puro**:
   - `.pricing-controls-bar`: `display: flex; flex-direction: column; align-items: center; gap: 14px;`
   - `.sw-editorial-divider`: `display: none;` (elimina todos los palitos verticales huerfanos).
   - `.sw-editorial-geo-badge`: Centrado en la parte superior como badge informativo limpio (`font-size: 12.5px;`).
   - `.pricing-switches-group`: Columna centrada con dos filas estructuradas y alineadas.
   - `.pricing-switches-group .sw-editorial-label`: Ancho fijo uniforme `width: 98px; flex-shrink: 0;` tanto para `BILLING:` (`PERIOD:`) como para `CURRENCY:` (`MONEDA:`), garantizando que las opciones activas (`Monthly` y `COP`) y sus subrayados purpura comiencen exactamente en la misma coordenada X vertical sin desalineacion ni zigzag.
