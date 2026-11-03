# CELAEST Lingua: Chibi Robot DMA Canvas Architecture & State Matrix

## 1. Zero Overengineering Principle
Cada caso de uso está mapeado de forma directa y atómica a su secuencia pre-renderizada en contenedor DMA binario (`.bin`), eliminando cálculos híbridos o composiciones complejas innecesarias:

| Estado / Caso de Uso | Archivo Binario | Frames | FPS | Comportamiento |
|---|---|---|---|---|
| `explaining` | `chibi-explaining.bin` | 48 | 30 | Loop continuo. Mueve la cápsula vocal/boca en el visor cyber y cabeceos de cadencia natural de habla. Se activa cuando Liam dicta la clase (`isDictating`), suena un audio de ejemplo (`isSpeakingAudio`) o responde una pregunta por voz (`isAnsweringVoice`). |
| `listening` | `chibi-listening.bin` | 36 | 30 | Loop continuo. Onda de radar auditivo expandiéndose en el visor cyber con inclinación atenta de cabeza. Se activa con el micrófono activo o esperando respuesta de QA. |
| `celebrating` | `chibi-celebrating.bin` | 48 | 30 | Reproducción única (one-shot). Rebote de victoria y ojos felices en arco `^ ^`. Se activa al completar con éxito los bloques (`isBuildCorrect`) o dominar la lección (`isConquered`). Regresa automáticamente a `idle`. |
| `greeting` | `chibi-saludo.bin` | 72 | 30 | Reproducción única (one-shot). Cabeceo y saludo amigable de bienvenida. Se activa al hacer clic o tap sobre el robot. Regresa automáticamente a `idle`. |
| `idle` | `chibi-gaze.bin` | 60 | 30 | Rastreo de cursor suave y continuo (sweep horizontal -0.75 a +0.75 con interpolación exponencial hacia el frame objetivo). Rest index en frame 17 (centro absoluto). ÚNICAMENTE se activa cuando no hay ninguna acción en curso. |

## 2. Render Loop & Canvas Direct Pipeline
- Renderizado mediante 2D Canvas + `ImageBitmap` decodificados en RAM (`professorModelCacheService.ts`).
- Dibujo directo de frame individual atómico (`drawFrame(bitmaps, frameIndex, prefix)`). Cero capas de cross-fade alfa innecesarias para evitar artefactos de superposición transparente.
- Wakeup reactivo inmediato en cambio de estado (`lastDrawnKeyRef.current = ""` y llamada a `startLoopIfNeeded()`).
- Contenedor interactivo con `pointer-events-auto` en `PathwayProfessorStage.tsx` para captura instantánea del click de saludo sin interferir con la pizarra frontal.
