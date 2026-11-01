# Contrato Canónico: Cards Isométricas 3D de Plataforma (Estructura Asimétrica 1:1)

## Contexto & Corrección Estructural
Se corrigió la composición y arquitectura de las 3 tarjetas de la sección Plataforma para reflejar con precisión matemática 1:1 el diseño de referencia:

1. **Proporción de Card (Squarish / ~1:1)**:
   - Ya no son tarjetas verticales alargadas de columna única.
   - Proporción cuadrada `aspect-square` (`min-h-[340px] sm:min-h-[365px]`), amplia y espaciosa.

2. **Composición Asimétrica Izquierda/Derecha**:
   - **Columna Izquierda (55% de ancho)**:
     - **Arriba**: Badge de categoría/popularidad y caja de ícono cuadrada de cristal (`Layers`, `Zap`, `Shield`). En la Card 2 ("Pipeline"), el badge `● Más popular` se ubica arriba a la izquierda justo encima del ícono del rayo.
     - **Centro**: Título con salto de línea limpio (`Gestión\nCentralizada`, `Pipeline\nde Automatización`, `Ecosistema\nde Activos`) y descripción de 3 líneas.
     - **Abajo**: Enlace `Explorar →` alineado a la izquierda.
   - **Área Superior Derecha (56% de ancho)**:
     - La ilustración isométrica 3D (`management.webp`, `workflow.webp`, `ecosystem.webp`) flota en el cuadrante superior derecho con perspectiva espacial y paralaje reactivo al cursor (`rotateX`, `rotateY`, `translateZ(30px)`).

3. **Limpieza Quirúrgica de Activos**:
   - **Card 1**: Únicamente los 3 paneles de dashboard translúcidos con su anillo orbital neón (sin bloques duplicados a la izquierda).
   - **Card 2**: Únicamente los 3 cubos interconectados con el cubo superior de cristal y energía púrpura, y borde perimetral neón con resplandor completo.
   - **Card 3**: Pedestal con cubos y fichas de código, terminal y métricas.
