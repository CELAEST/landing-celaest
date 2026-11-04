# Standard de Layout Responsivo Adaptativo para Security Section (CELAEST)

## Contexto y Causa Raiz
En desktop (> 960px), la seccion de seguridad (`SecuritySection`) utiliza un layout simetrico dividido en 44% (3 pilares) y 56% (canvas de particulas 3D `UnifiedParticleMasterStage`).
En pantallas moviles o tablets (<= 960px), el contenedor colapsaba a `1fr`, colocando los 3 pilares primero con alturas desktop y padding vertical excesivo (~500px), mientras que el canvas 3D interactivo quedaba desplazado hacia el fondo (fuera del viewport visible). El usuario solo veia una lista estatica y no tenia retroalimentacion visual al tocar los pilares.

## Solucion Implementada (Mobile & Tablet)
1. **Reordenamiento Priorizado (3D Canvas Primero)**: En `@media (max-width: 960px)`, `.sec-master-stage-wrap` adopta `order: -1`, posicionando el canvas 3D interactivo justo debajo del titulo y encima de los pilares.
2. **Escalado Dinamico de Altura Canvas**: Se elimino el `height: 440px` hardcodeado inline en `unified-particle-master-stage.tsx`, delegandolo a `.sec-stage-canvas-inner`:
   - Desktop: 440px
   - Tablet/Mobile (<= 960px): 260px
   - Small Mobile (<= 480px): 230px
3. **Pilares Optimizados para Tactil**:
   - Padding reducido de 38px a 18px (o 14px en moviles chicos).
   - Tipografia responsiva con `clamp(18.5px, 4.2vw, 24px)`.
   - Indicador purpura neon lateral y fondo interactivo en el item activo.
   - Al tocar cualquier pilar (01 Shield, 02 Lock, 03 Globe), el canvas 3D visible arriba se transforma en tiempo real inmediatamente.
4. **Enlace Explore Responsivo**: Reubicado como `.sec-mobile-foot` centrado debajo de los pilares en movil.
5. Quality Gate: vitest 11/11, type-check 0 errors, build SSG 11/11.
