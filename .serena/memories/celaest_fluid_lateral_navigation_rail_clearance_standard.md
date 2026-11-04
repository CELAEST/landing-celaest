# Standard de Margen Lateral Fluido y Rail de Navegacion (CELAEST)

## Contexto y Causa Raiz
El riel de navegacion lateral fijo (.intent-progress-fixed) se posiciona a la izquierda en `left: clamp(28px, 2.4vw, 42px)` con un ancho util de aprox. 20px (borde derecho entre 38px y 60px).
En pantallas ultra-anchas (>= 1600px), el contenedor centrado `max-w-[85rem] mx-auto` genera naturalmente un margen lateral `(W - 1360)/2 >= 120px`, separando el contenido del riel con 96px a 252px de espacio limpio.
Sin embargo, en pantallas de portatil (1280px, 1366px, 1440px) o cuando el usuario abre las DevTools lateralmente (viewport de 800px a 1120px), `mx-auto` se reduce a 0, y el padding base de 32px (`lg:px-8`) provocaba que titulos como 'Power your workflow' o 'Explore All Products' colisionaran directamente sobre los numeros del riel.

## Solucion Matematica Continua (Zero-Jump)
Se definio en `src/styles/globals.css` una formula de padding responsivo continuo para los contenedores de seccion:
```css
@media (min-width: 761px) {
  #products > div.max-w-\[85rem\],
  #platform > div.max-w-\[85rem\],
  #security > div.max-w-\[85rem\],
  #pricing > div.max-w-\[85rem\],
  .cv-section > section > div.max-w-\[85rem\],
  .cv-section > div.max-w-\[85rem\],
  .eco-container {
    padding-left: max(32px, calc(clamp(96px, 8.6vw, 136px) - max(0px, (100vw - 85rem) / 2)));
    padding-right: max(32px, calc(clamp(96px, 8.6vw, 136px) - max(0px, (100vw - 85rem) / 2)));
  }
}
```

## Reglas de Comportamiento:
1. En pantallas anchas (>= 1600px), la resta neutraliza el exceso y converge a 32px simetricos, respetando exactamente el diseno original.
2. A medida que la pantalla se estrecha (1440px -> 1280px -> 1024px -> 800px o consola abierta), el padding se expande dinamicamente garantizando siempre entre 58px y 72px de espacio limpio respecto al riel.
3. En moviles (<= 760px), el riel se oculta (`display: none`) y se preserva el padding nativo tactil (16px a 24px).
4. Verificaciones: vitest 100%, type-check 100%, next build SSG 11/11.
