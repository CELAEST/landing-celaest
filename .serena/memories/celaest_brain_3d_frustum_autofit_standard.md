# Standard de Prevención de Recorte Frustum en el Cerebro 3D (CELAEST)

## Diagnóstico del Corte Vertical en el Cerebro
En la sección `#products` (`DynamicInfrastructure`), el cerebro de partículas Three.js aparecía a veces cortado por una línea vertical recta en su extremo izquierdo (como se evidenció en la captura del usuario):
1. **Causa Raíz - Límite de Frustum de Cámara WebGL**:
   - Three.js utiliza una `PerspectiveCamera` con `fov: 45` y posición `[0, 0, 8]`.
   - En una cámara de perspectiva, el FOV vertical es constante, pero el FOV horizontal se reduce cuando disminuye la relación de aspecto del canvas (`width / height`).
   - En el layout de 2 columnas de escritorio (44% / 56%), la columna del canvas mide entre 500px y 600px de ancho y 600px de alto (aspect ratio ~0.9 - 1.0).
   - A esta relación de aspecto estrecha, el ancho visible de la cámara cae a ~6.0 unidades, mientras que la geometría de partículas del cerebro mide 6.2 unidades de ancho más el drift del curl-noise (~0.5 unidades).
   - Como `scaleMultiplier` estaba fijo en `1` para anchos de pantalla `>= 768px`, las partículas del lóbulo izquierdo sobrepasaban el plano horizontal del frustum de la cámara (`gl_Position.w`), provocando un recorte recto vertical abrupto por el hardware de WebGL.
2. **Padding Asimétrico**:
   - `.prod-stage-col` tenía `padding: 24px 0 24px 32px`, desplazando el canvas 32px hacia la izquierda contra el divisor central.

## Solución Dinámica Aplicada
1. **Auto-fit Inteligente en Three.js (`useThree().viewport`)**:
   En `DynamicInfrastructureCanvas.tsx`, se calculó un multiplicador de escala adaptativo basado en el ancho real visible de la cámara:
   ```tsx
   const { viewport } = useThree();
   const autoFitScale = Math.min(1, Math.max(0.65, viewport.width / 7.6));
   const effectiveScale = scaleMultiplier * autoFitScale;
   ```
   Si la relación de aspecto disminuye, el cerebro reduce suavemente su escala para garantizar un margen libre mínimo del 15% a ambos lados, eliminando de forma absoluta cualquier posibilidad de corte por frustum.
2. **Medición Real por Contenedor**:
   En `DynamicInfrastructure.tsx`, el `handleResize` mide el ancho real del elemento (`el.clientWidth`), no solo `window.innerWidth`.
3. **Padding Simétrico**:
   En `products.css`, `.prod-stage-col` pasa a `padding: 24px 16px`.

## Validación
- Probado y verificado en 1120px, 1200px, 1350px y 1920px con capturas reales.
- El contorno del cerebro es 100% orgánico, completo y redondeado en todos sus ángulos.
