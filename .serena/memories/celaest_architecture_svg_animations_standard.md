# Standard de Animación SVG y Arquitectura Modular CELAEST (Linear/Apple Tier)

## Contexto y Especificación
Se implementó la suite completa de micro-animaciones vectoriales para los 4 pilares de la sección de Arquitectura (`ArchitectureSection`):
1. **01 Centralización & Gobernanza (`LayersAnimatedIcon`)**:
   - Levitación armónica desacoplada en 3 capas isométricas con desfase de fase (`archLayerTopFloat`, `archLayerMidFloat`, `archLayerBotFloat`).
   - Expansión dimensional en hover (Exploded CAD View) con amplificación de drop-shadow violeta.
2. **02 Malla IA (`ChipAnimatedIcon`)**:
   - Cascada de corriente continua en los 12 pines de reloj (`archPinsFlowV` y `archPinsFlowH`).
   - Respiración lumínica del núcleo de silicio (`archChipDieBreathe`) con punto cuántico central (`archChipCorePulse`).
   - Aceleración de frecuencia al hover.
3. **03 Flujos Autónomos (`FlowsAnimatedIcon`)**:
   - Flujo de fotones de datos nativos mediante SVG `<animateMotion>` que viajan desde el nodo orquestador superior, bifurcan el bus y llegan a los 3 nodos trabajadores inferiores.
   - Destello sincronizado en las 3 hojas al recibir el paquete de datos (`archFlowLeafAck`).
4. **04 Mercado de Activos & Soluciones (`CubeAnimatedIcon`)**:
   - Flotación 3D isométrica con sutil inclinación geométrica (`archCubeFloat`).
   - Ciclo de sombreado especular en las 3 caras del cubo (`archCubeFaceTop`, `archCubeFaceLeft`, `archCubeFaceRight`).
5. **Conectores Inter-Pilares (`PipelineConnectorLine`)**:
   - Línea base de 1px a `white/[0.08]` con cometa de fotones violeta (`archCometFlow`) que viaja rítmicamente entre las columnas (01 → 02 → 03 → 04).

## Contrato de Arquitectura (<80 líneas)
- `src/components/landing/architecture-section.tsx` (74 líneas).
- `src/components/landing/architecture/architecture-header.tsx` (24 líneas).
- `src/components/landing/architecture/architecture-pillar-card.tsx` (48 líneas).
- `src/components/landing/architecture/architecture-impact.tsx` (64 líneas).
- `src/components/landing/architecture/icons/layers-animated-icon.tsx` (60 líneas).
- `src/components/landing/architecture/icons/chip-animated-icon.tsx` (60 líneas).
- `src/components/landing/architecture/icons/flows-animated-icon.tsx` (78 líneas).
- `src/components/landing/architecture/icons/cube-animated-icon.tsx` (56 líneas).
- `src/components/landing/architecture/icons/pipeline-connector-line.tsx` (20 líneas).
- `src/components/landing/architecture/architecture-icons.css` (aceleración GPU + `prefers-reduced-motion`).
