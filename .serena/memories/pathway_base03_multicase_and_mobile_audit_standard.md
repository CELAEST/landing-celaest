# Base 03 Multi-Case Live Choreography & Mobile Visual Audit Standard

## Architectural Summary
1. **Node Order Indexing**:
   - `node.orderIndex === 0`: Base 01 ("El Orden Mágico")
   - `node.orderIndex === 1`: Base 02 ("El 'It' Fantasma")
   - `node.orderIndex === 2`: Base 03 ("Ser o Estar sin Enredos: Am · Is · Are")

2. **Base 03 Multi-Case Dynamic Choreography**:
   - Base 03 introduces 3 grammatical pairings for To Be:
     - Case 0 (`01 · Yo (Am)`): "El reto de esta base es el verbo To Be sin enredos... En inglés una sola palabra sirve para decir ser y estar... La primera pareja fija es contigo mismo, diciendo:... I am ready." -> activates Tab 01 (`seg_01.mp3`).
     - Case 1 (`02 · Él · Ella · Eso (Is)`): "La segunda pareja es cuando hablas de una sola persona ajena... con él o con ella siempre decimos:... she is ready." -> activates Tab 02 (`seg_01_case2.mp3`).
     - Case 2 (`03 · Tú y Plurales (Are)`): "Y la tercera pareja es para ti y para los grupos... con tú, nosotros o ellos siempre decimos:... we are ready." -> activates Tab 03 (`seg_01_case3.mp3`).
   - Real-time tab transitions ensure tabs switch live as Andrew speaks, avoiding static text chunks.

3. **Audio Synthesis (Andrew Multilingual)**:
   - Voice: `en-US-AndrewMultilingualNeural` with calibrated pitch & rate `-4%`.
   - Full 22+3 tracks deployed to:
     - `public/audio/pathway/a1/base_03/`
     - `c:\Users\user\Music\lab\public\audio_samples\base_03/`
   - Manifest `src/features/pathway/data/a1AudioManifest.json` populated with 501 sanitized variants.

4. **Mobile Visual Quality Gate**:
   - Robot framing calibrated: whole head and antenna fully visible in upper viewport.
   - Facial animation verified:
     - Speaking: `"explaining"` (OLED eyes + moving vocal mouth).
     - Observing / Analyzing: `"thinking"` (OLED eyes + cyan sweep scanning line, no blushing).
     - Victory / Reward: `"celebrating"` (arched crescents `^ ^` + cyan smile + red blush).
   - Zero clunky legacy buttons: clean native Obsidian Glass buttons.
