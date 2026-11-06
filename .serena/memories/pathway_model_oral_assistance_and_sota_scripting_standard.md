# SOTA Standard: Asistencia Oral al Modelo TTS (Andrew Multilingual) y Scripting Pedagógico Humano

Este estándar documenta las reglas estrictas de prompt engineering fonético, scriptwriting bilingüe y coreografía visual aprendidas y perfeccionadas durante la optimización de las Bases de Celaest English con el modelo neuronal `en-US-AndrewMultilingualNeural` a velocidad `-4%`.

---

## 🎙️ 1. Las Reglas de Oro de Asistencia Oral al Modelo (Ayudas al Modelo)

Para que el modelo hable con fluidez de locutor nativo, sin cortes, sin acentos raros y sin comportamientos robóticos:

### Regla 1: Principio de "Más la Acción" (Chunking Gramatical)
- **Problema/Error Detectado**: Si se introducen pronombres o partículas gramaticales aisladas en español (`"I, you, we, o they"` o `"It"` a secas), el sintetizador multilingüe se desestabiliza: lee `I` como la letra española "i" o como el número romano "primero", y pausa como si leyera una lista de compras robótica.
- **Solución Obligatoria**: NUNCA recitar pronombres o partículas desnudas. Ligarlos siempre a un verbo o acción real:
  - *Base 01*: `"nombrando a la persona... diciendo por ejemplo: I work... you work... o they work..."`
  - *Base 02*: `"diciendo por ejemplo: It is cold... o It is late..."`
  - *Base 03*: `"conmigo diciendo: I am ready... con ella diciendo: she is ready... y con el grupo diciendo: we are ready..."`

### Regla 2: Elipsis Triples (`...`) como Inhalaciones Análogas
- **Problema/Error Detectado**: Puntos secos o comas simples provocan que el modelo acelere o corte bruscamente la última sílaba antes del cambio de idioma.
- **Solución Obligatoria**: Usar `...` antes y después de cada frase o ejemplo en inglés. Esto genera una pausa orgánica de 300ms a 400ms similar a la inhalación de un ser humano, permitiendo al transformer reconfigurar los pesos fonéticos del idioma sin saltos.

### Regla 3: Cero Símbolos Matemáticos, Barras o Código
- **Problema/Error Detectado**: Escribir `Quién + Acción`, `It / is / cold`, o signos como `&`, `_`, `:`. El modelo los lee como palabras matemáticas frías o los omite descolocando el compás.
- **Solución Obligatoria**: Escribir todo con lenguaje conversacional natural:
  - `"primero quién, más la acción..."`
  - `"o diciendo..."`
  - `"y luego el estado..."`

### Regla 4: Anclas Fonéticas de Cambio de Idioma (Bilingual Latent Anchors)
- **Problema/Error Detectado**: Lanzar una palabra o frase en inglés sorpresivamente en medio de una oración en español hace que el modelo intente pronunciarla con fonología española.
- **Solución Obligatoria**: Anteponer siempre un ancla conversacional en español inmediatamente antes del inglés:
  - `"diciendo por ejemplo... [English phrase]"`
  - `"y decimos... [English phrase]"`
  - `"al decir... [English phrase]"`

### Regla 5: Mapeo Estricto 1:1 de Archivos de Audio
- **Problema/Error Detectado**: Apuntar dos escenas consecutivas (e.g. Fórmula y Trampa) al mismo audio largo, causando recortes abruptos o saltos de playback al cambiar de pestaña.
- **Solución Obligatoria**: Cada momento pedagógico (`Fórmula`, `Trampa`, `Reto`, `Ejemplos`, `Build`, `Speak`) debe tener su propio archivo MP3 pre-sintetizado único (`seg_01.mp3`, `seg_03.mp3`, `seg_04.mp3`, etc.).

### Regla 6: Asistencia Fonética Adaptativa a Anglicismos y Gramática (Phonetic Respelling Assistance)
- **Problema/Error Detectado**: Escribir términos como `"el verbo to be"` o `"el verbo To Be"` en español hace que el modelo multilingüe lo lea con fonética literal española como `/to be/` en vez de pronunciar `/tuː biː/`. Asimismo, combinaciones como `"es is"` provocan colisiones fonéticas incómodas (`/esis/`).
- **Solución Obligatoria**:
  1. **Respelling Fonético Directo**: Escribir `"el verbo tu bi"` en el texto de entrada al sintetizador. Esto fuerza al modelo a pronunciar impecablemente `/tuː biː/` con ritmo humano natural.
  2. **Pausa Respiratoria para Cópulas**: En lugar de `"su pareja siempre es is"`, escribir `"su pareja fija siempre es... is... diciendo por ejemplo: he is..."`.
  3. **Desacoplamiento Texto-Voz vs Subtítulo UI**: El texto hablado (`text`) contiene la adaptación fonética (`"verbo tu bi"`), mientras que el subtítulo visual en pantalla (`subtitleSpanish`) conserva la ortografía académica (`"verbo To Be"`).

### Regla 7: Cero Dos Puntos Inmediatos a Elipsis (`:...` Inválido en SSML)
- **Problema/Error Detectado**: Escribir secuencias como `:...` causa que el parser SSML de Edge TTS falle con `NoAudioReceived`.
- **Solución Obligatoria**: NUNCA combinar `:` seguido de `...`. Usar únicamente `...` (e.g. `"diciendo... I am ready"`, `"siempre es... is..."`).

---

## 🎨 2. Reglas de Interfaz y Diseño Premium (Obsidian Glass)

1. **Cero Botones o Cajas Invasivas**: Prohibido insertar filas de botones aparatosos (`ABRE CON: [ I ] [ you ]`) en la pizarra. Toda interacción debe ser sutil y de lujo (e.g. `Probarme →`).
2. **Coreografía en Tiempo Real**: Los efectos visuales de la pizarra (tachado de error, iluminación en verde del acierto) deben dispararse en el segundo exacto en que la voz lo pronuncia, no al inicio de la escena.
3. **Visor Cyber Visor Móvil y Desktop Reactivo**:
   - En mobile y desktop, la expresión facial del robot debe responder dinámicamente:
     - `explaining`: hablando con boca activa al compás de la voz.
     - `thinking`: escuchando o esperando respuesta con barrido de escaneo cian.
     - `celebrating`: únicamente al acertar un reto o conquistar la base.
