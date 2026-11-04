# Standard de Unificación de Voz Única (Walter) y Cero Cortes en Pathway A1

## 1. Principio de Voz Única Permanente (Zero Voice Switching)
- Toda interacción hablada por el mentor (Liam) en el Pathway Foundation DEBE ser ejecutada exclusivamente con la voz **Walter (M)** de Speechify Studio (`voice_id: "walter"`, `model: "simba-3.2"`).
- Queda estrictamente PROHIBIDO alternar entre voces sintéticas robóticas (Azure `es-MX-JorgeNeural` o SAPI del navegador) y voces neuronales.
- Cada bifurcación pedagógica (éxito, error, pista, instrucción, reintento y victoria) DEBE contar con un archivo de audio estático pre-horneado en `public/audio/pathway/a1/base_XX/` y estar registrado en `src/features/pathway/data/a1AudioManifest.json`.

## 2. Mapa Exhaustivo de Bifurcaciones de Voz por Base
En cada base se garantizan las 23 frases canónicas:
1. `lesson_intro.mp3`: Inicio de clase ("El reto de hoy es...").
2. `seg_01.mp3` / `seg_01_desktop.mp3`: Propósito real y desglose de fórmula.
3. `seg_02.mp3` / `seg_02_desktop.mp3`: Explicación de la alerta y trampa del español.
4. `seg_03.mp3`: Reto interactivo Caza la Trampa (Pregunta al usuario).
5. `trap_error.mp3`: Feedback inmediato al cometer el error en Caza la Trampa ("¡Ojo! Esa es la trampa del español...").
6. `trap_success.mp3`: Feedback de acierto en Caza la Trampa ("¡Exacto! Cazaste la trampa...").
7. `seg_04.mp3`: Audio nativo del Ejemplo 1 en inglés.
8. `seg_05.mp3`: Secreto fonético y cadencia motriz.
9. `seg_06.mp3` / `seg_06_alt.mp3`: Audio nativo del Ejemplo 2 en inglés.
10. `seg_07.mp3` / `seg_07_desktop.mp3`: Transición a la práctica motriz de fichas.
11. `build_intro.mp3`: Entrada y activación del tablero de fichas.
12. `challenge_error.mp3`: Pista hablada al ordenar incorrectamente las fichas.
13. `challenge_success.mp3`: Acierto y transición a certificación de voz.
14. `voice_instruction.mp3`: Modelo hablado e instrucción para activar micrófono.
15. `voice_sample.mp3`: Botón de bocina para escuchar el modelo inglés en solitario.
16. `voice_retry.mp3`: Feedback motivador al necesitar otro intento de pronunciación.
17. `voice_victory.mp3` / `voice_victory_alt.mp3`: Felicitación de base conquistada.
18. `voice_not_heard.mp3`: Feedback amable si el audio capturado es silencio o ruido.

## 3. Protocolo Anti-Cortes de Audio (Event-Driven OnEnd)
- PROHIBIDO usar `setTimeout` arbitrarios (e.g. 3200ms, 3800ms) para forzar avances de pantalla mientras el mentor habla.
- Toda transición de estado (avanzar a ejemplos tras la trampa, o pasar de BUILD a SPEAK tras armar las fichas) DEBE ser disparada estrictamente por el callback natural `onEnd` del reproductor de audio (`audio.onended`).
- Se admite un timeout de seguridad amplio (mínimo 15,000ms) única y exclusivamente como fallback si el subsistema de audio falla catastróficamente.
