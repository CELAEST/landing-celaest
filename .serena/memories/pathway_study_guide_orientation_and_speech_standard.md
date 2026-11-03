# Contrato de Mentoría: Orientación Única de la Guía de Estudio y Sincronización de Speeches

## 1. Regla de Orientación Única (Zero-Repetition & Zero-Amnesia)
- **Persistencia**: Controlado mediante `SOFTWARE_INTRO_KEY = "celaest:tutor:software_explained:v2"` en `localStorage`.
- **Condición**: Se reproduce y muestra en la pizarra **exactamente una vez** en el primer inicio del usuario (`!isSoftwareIntroSeen()`).
- **Contenido del Speech de Orientación**:
  > "¡Hola! Qué gusto saludarte. Soy Liam, tu mentor personal en CELAEST. Te voy a acompañar en cada paso para que hables inglés con total seguridad. Mira tu pantalla: a la izquierda tienes tu pizarra de clase con la regla visual, el ensamblaje de bloques y la certificación de tu voz. Arriba en tu cabecera tienes una ayuda clave: la Guía de Estudio. Ábrela en cualquier momento para consultar la Estructura de los 14 Bloques de inglés y el Alfabeto Fonético completo con audios reales. Y aquí a tu derecha estaré siempre a tu lado para resolver tus dudas con el botón Preguntar. Esta orientación te la comparto solo esta vez para que conozcas tus herramientas. ¡Entremos directo a la clase!"
- **Continuidad Inmediata**: En las visitas subsiguientes o en las siguientes bases, el script omite automáticamente este segmento y arranca directamente con `1. PROPÓSITO REAL`.

## 2. Prevención de Solapamiento de Audio (Anti-Clashing Audio Guard)
- En `usePathwayStageSession.ts`, la activación de los audios de transición en `BUILD` y `SPEAK` verifica estrictamente:
  `if (!speakingText && !SpeechSynthesisService.isAiPlaying())`
- Evita que cuando el motor de lectura (`PathwayLectureEngine`) esté ejecutando o terminando el último segmento de instrucción ("Ahora es tu turno de construir..."), se dispare un audio redundante o se interrumpa la voz de Liam.

## 3. Coherencia Absoluta Pizarra vs Voz
- La constante `SOFTWARE_GUIDE_ORIENTATION_TEXT` se comparte de forma idéntica entre el motor de lectura (`PathwayLectureEngine.ts`) y la pizarra del profesor (`professorSpeech.ts`), asegurando fidelidad 100% entre lo que el alumno lee tipeado y lo que escucha pronunciado.
