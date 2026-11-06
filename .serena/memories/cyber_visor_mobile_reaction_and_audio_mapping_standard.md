# Cyber Visor Mobile Reaction & Audio Mapping Standard

## Problem Diagnosed (2026-11-05)
1. **Robot Face Permanently Stuck on Happy (`^ ^` + blush)**:
   - Root cause: `animState` in `useProfessorStageState` checked `if (isConquered || ...)` at the top level before `explaining`.
   - In `PathwayStudioView`, `isConquered` is computed as `session.isCompletedBanner || activeNode.status === "MASTERED"`.
   - When a node was previously mastered, `activeNode.status === "MASTERED"` is true forever. As a result, even while the lecture is playing or when the user is in the interactive chalkboard (`RULE` step), `animState` always returned `"celebrating"`.
   - The face never switched to `"explaining"` (speaking mouth) and never switched to `"thinking"` or `"idle"`.

2. **Audio Cut-off in Tab 2 (Trampa)**:
   - In `PathwayLectureEngine.ts`, Base 01 transitions from TRAP (`seg_03.mp3`) to TRAP_CHECK (`"¡Probemos tu oído ahora mismo!..."`).
   - In `a1AudioManifest.json`, `"¡Probemos tu oído ahora mismo!..."` was pointing to `/audio/pathway/a1/base_01/seg_03.mp3` instead of having its own dedicated audio.
   - When the lecture reached TRAP_CHECK, it restarted `seg_03.mp3` ("Fíjate bien en la alerta en rojo...") and immediately paused for the user interaction (`pauseAfterForCheck: true`), causing the audio to cut off mid-playback.

## Permanent Solution Implemented
1. **Hierarchical Visor Priority in `useProfessorStageState.ts`**:
   - `isRecordingMic` -> `"listening"` (radar rings).
   - `isSpeakingAudio || choreography.isDictating || isAnsweringVoice || isAiAudioPlaying` -> `"explaining"` (moving vocal mouth + waveforms) ALWAYS takes precedence whenever mentor voice is active.
   - Victory celebrations (`"celebrating"`) are scoped strictly to celebratory events:
     - `choreography.isTrapCelebrating` (brief window after trap check success).
     - `step === "BUILD" && isBuildCorrect` (correct assembly of tiles).
     - `step === "SPEAK" && isConquered` (completion of final speaking step).
   - Expectant analysis (`"thinking"`) -> `isWaitingTrapCheck`, `isAskingQA`, `isEvaluatingVoice`, or assembling tiles.
   - Resting state -> `"idle"` (OLED pills, natural blinks, tracking).

2. **Dedicated Audio for Trap Check (`trap_intro.mp3`)**:
   - Synthesized `public/audio/pathway/a1/base_01/trap_intro.mp3` with Andrew Multilingual at `-4%`.
   - Updated `a1AudioManifest.json` so `"¡Probemos tu oído ahora mismo!..."` points to `/audio/pathway/a1/base_01/trap_intro.mp3`.
   - `seg_03.mp3` is strictly reserved for the TRAP explanation.
