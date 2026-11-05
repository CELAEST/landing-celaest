# Standard de Anclaje del Robot Hero para DevTools y Pantallas 1920 (CELAEST)

## Diagnóstico Definitivo
En pantallas 1920x1080, cuando el usuario abre las herramientas de desarrollo / consola en el lado derecho, el ancho del viewport de la página se reduce a ~1350px - 1450px (mientras que la altura se mantiene en ~950px - 1000px):
1. El breakpoint anterior `@media (max-width: 1240px)` no se activaba para viewports de 1350px-1450px.
2. En la regla base de desktop (`.intent-robot`), la altura se calculaba únicamente a partir del ancho (`width: 87vw; height: auto`).
3. Al caer el ancho a 1350px, la altura del robot se reducía de 940px a solo 660px.
4. Con `top: -6.4%`, el robot terminaba a 599px desde la parte superior, dejando más de 250px de vacío negro y su torso flotando cortado en el aire sobre las montañas.

## Solución Aplicada
1. **Regla Base Desktop Inmune a Relaciones de Aspecto Estrechas**:
   ```css
   .intent-robot {
     width: auto;
     height: max(calc(87vw * 9 / 16), 94vh);
     aspect-ratio: 16 / 9;
   }
   ```
   La altura del robot NUNCA baja del 94% del viewport height (`94vh`), garantizando que su torso siempre quede enterrado detrás de las montañas en cualquier pantalla grande.
2. **Ampliación del Breakpoint a 1480px**:
   `@media (max-width: 1480px)` cubre inmediatamente la apertura de DevTools en monitores de 1920px (1350px - 1450px), anclando la base a `bottom: -2%`.

## Resultado Visual
- 1350x950: `robotBottom` = 969px (enterrado dentro de las rocas). Cero corte en el aire, cero vacío negro.
- 1920x1080: `robotBottom` = 946px (composición de arte intacta).
- Mobile (< 760px): 100% intacto.
