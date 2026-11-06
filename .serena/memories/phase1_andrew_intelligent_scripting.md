# Protocol: Production Audio Phase 1 & Base 01 Intelligent Scripting & SOTA Engine

- **Voice Architecture**: Andrew Multilingual (`en-US-AndrewMultilingualNeural`) by Microsoft Edge / Azure.
- **Why It Solves the Bilingual Problem**: Native American English + fluent neutral Spanish generated within the *exact same single vocal tract*, avoiding all voice clashing, model transitions, downsampling, and popping splices.
- **Golden Prompting Rules (Helping the Model)**:
  1. Zero Math/Code Symbols: Never pass `+`, `:`, `/`, `&`, or mid-sentence Title Case. Replace with conversational phrasing: `"primero quién, más la acción"`, `"el sujeto obligatorio, más el verbo"`.
  2. Breath and Prosody Punctuation: Natural commas and ellipses (`...`) before English models to trigger organic breath pauses without cutting the audio wave.
  3. Continuous Single-Take Execution: Never fragment sentences into 5-word chunks. Every track is rendered in a single unbroken pass at `rate='-4%'`.
- **Status**:
  - All 22 tracks of Base 01 (Fase 1: RULE, Fase 2: BUILD, Fase 3: SPEAK) generated and synchronized in `public/audio/pathway/a1/base_01/` and `lab/public/audio_samples/base_01/`.
  - Lab Example 9 updated with Sala Master and dedicated Fase 1 interactive player.
- **Verification**:
  - `lab` builds in 7.3s with 0 errors.
  - `celaest-english-front` vitest passes 100% (8 suites, 29 tests).
  - TypeScript passes with 0 errors.
