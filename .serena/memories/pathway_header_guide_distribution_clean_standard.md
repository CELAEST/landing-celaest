# Contrato: Distribución y Organización Sólida de la Guía de Estudio en Pathway Header

## Diagnóstico y Problema Resuelto
- **Problema previo**: En la cabecera móvil de la clase de Pathway, el botón `📖 Guía` estaba ubicado en la esquina superior derecha junto a `💬 Preguntar` (`gap-2.5`), generando un amontonamiento visual asimétrico sobre el tab `3. Habla` y rompiendo el equilibrio con el Chibi Micro-Capsule central y el selector de Base.
- **Solución implementada**: Reorganización basada en la **Matriz de Correspondencia 3x2**:
  - **Fila 1 (Contexto & Acciones Simétricas)**:
    - **Izquierda**: `BASE 0{n} ⌵` `·` `📖 Guía` (unificación lógica de herramientas de navegación y temario académico). Tipografía flotante nítida, libro violeta `#A78BFA` con escala al hover.
    - **Centro (Notch Bridge)**: `ChibiMicroCapsule` con ojos vivos celestes neón (`lg:hidden` en desktop para evitar solapamientos con la columna del profesor 3D).
    - **Derecha**: `💬 Preguntar` con icono `MessageSquareQuote` en `#A27FF3`.
  - **Fila 2 (Momentos de la Clase - Tabs)**:
    - **Izquierda**: `1. La Regla` (alineado verticalmente con Base y Guía).
    - **Centro**: `2. Practica` (alineado verticalmente con el Chibi).
    - **Derecha**: `3. Habla` (alineado verticalmente con Preguntar).
  - **En Desktop (`lg:`)**:
    - Bloque Izquierdo: `BASE 0{n} ⌵ · {nodeTitle}`, `LevelSelectorPill`, `Ruta ({masteredCount}/{totalNodes})` y `📖 Guía`.
    - Bloque Derecho: Tabs de la clase `1. La Regla | 2. Practica | 3. Habla` + botón `💬 Preguntar` con separador sutil.

## Archivos Involucrados
- `src/features/pathway/components/PathwayLessonHeader.tsx` (estrictamente < 80 líneas).
- Compatible 100% con TypeScript (`tsc --noEmit` sin errores).
