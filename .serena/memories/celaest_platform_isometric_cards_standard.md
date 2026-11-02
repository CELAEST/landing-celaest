# Contrato Canónico: Cards Isométricas 3D de Plataforma (Estructura Asimétrica 1:1)

## Contexto & Corrección Estructural
Se corrigió la composición y arquitectura de las 3 tarjetas de la sección Plataforma para reflejar con precisión matemática 1:1 el diseño de referencia:

1. **Proporción de Card (Squarish / ~1:1)**:
   - Proporción cuadrada `aspect-square` (`min-h-[330px] sm:min-h-[350px] md:min-h-[365px]`), amplia y espaciosa.

2. **Composición Asimétrica Izquierda/Derecha**:
   - **Columna Izquierda (55% de ancho)**:
     - **Arriba**: Badge de categoría/popularidad y caja de ícono cuadrada de cristal (`Layers`, `Zap`, `Shield`). En la Card 2 ("Pipeline"), el badge `● Más popular` se ubica arriba a la izquierda justo encima del ícono del rayo.
     - **Centro**: Título con salto de línea limpio (`Gestión\nCentralizada`, `Pipeline\nde Automatización`, `Ecosistema\nde Activos`) y descripción de 3 líneas.
     - **Abajo**: Enlace `Explorar →` alineado a la izquierda.
   - **Área Superior Derecha (56% de ancho)**:
     - La ilustración isométrica 3D (`management.webp`, `workflow.webp`, `ecosystem.webp`) flota en el cuadrante superior derecho con perspectiva espacial y paralaje reactivo al cursor (`rotateX`, `rotateY`, `translateZ(30px)`).

3. **Borde Sutil y Sofisticado (Zero-Oversaturation Standard)**:
   - PROHIBIDO usar bordes morados saturados agresivos (`border-2 border-[#a855f7]` o halos cegadores) que ensucian el diseño minimalista de lujo.
   - En su lugar, se implementa un borde de cristal fino y sutil tonalizado con la paleta de las fuentes:
     `border border-[#a78bfa]/35 hover:border-[#a78bfa]/60 shadow-[0_12px_40px_-15px_rgba(167,139,250,0.18)] bg-[#09090f]/90`
   - El resplandor inferior del modelo 3D se difumina a `bg-[#a78bfa]/12 blur-3xl`, logrando un aura etérea idéntica a la tipografía sin opacar la estética oscura.

4. **Limpieza Quirúrgica de Activos**:
   - **Card 1**: Únicamente los 3 paneles de dashboard translúcidos con su anillo orbital neón.
   - **Card 2**: Únicamente los 3 cubos interconectados con el cubo superior de cristal y energía púrpura.
   - **Card 3**: Pedestal con cubos y fichas de código, terminal y métricas.
