# Live Board Dynamic Real-Time Choreography Standard

## Problem Diagnosed (2026-11-05)
1. **TTS Glitch on "ya sea I, you, we, o they"**:
   - In Spanish text, `ya sea` immediately preceding standalone English uppercase `I` caused Andrew Multilingual to pronounce `I` as "primero" (Roman I) or "ee" with an unnatural glitch.
   - Fixed by humanizing the phonetic script to:
     `"...Siempre abre tu frase nombrando a la persona... por ejemplo:... I... you... we... o they... Por eso tachamos work every day... y decimos:... I work every day..."`
   - Ellipses `...` between pronouns force native American vocal separation (*"ai"*, *"yu"*, *"wi"*, *"dei"*).

2. **Static Premature UI Display ("Desde el principio")**:
   - `LiveBoardTrapScene` previously triggered its visual changes at hardcoded `800ms` and `1300ms`, showing the strikethrough and the correct sentence before the teacher even spoke the intro.
   - `LiveBoardFormulaScene` similarly revealed all tiles within `1.5s`, while the teacher only explained them at second 12.

## Real-Time Choreographed Solution Implemented
1. **LiveBoardTrapScene Choreography**:
   - **0.0s - 3.2s**: Red error alert `✗ Work every day.` displayed cleanly without strikethrough.
   - **3.2s - 8.0s**: As teacher says *"nombrando a la persona: por ejemplo: I, you, we, o they"*, the dynamic pronoun badges `[ I ] [ you ] [ we ] [ they ]` slide in and illuminate with cyan glow.
   - **8.0s - 11.2s**: As teacher says *"Por eso tachamos work every day..."*, the red strikethrough line dynamically draws across the error in real time.
   - **11.2s - 13.5s**: As teacher says *"...y decimos: I work every day"*, the correct sentence `✓ I work every day.` emerges with emerald green glow.
   - **13.5s+**: As teacher explains the anchor rule, the footer card and `Probarme →` CTA illuminate.
   - **Idle/Static fallback**: When `!isDictating`, all elements are immediately visible (`phase = 4`).

2. **LiveBoardFormulaScene Choreography**:
   - When `isDictating` is true:
     - Tile 1 starts in focus.
     - At ~14.5s (*"luego la acción..."*), Tile 2 illuminates.
     - At ~17.2s (*"y luego el momento..."*), Tile 3 illuminates.
   - When `!isDictating`: all tiles visible immediately.
