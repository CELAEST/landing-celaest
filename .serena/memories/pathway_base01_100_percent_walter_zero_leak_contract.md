# BASE 01 100% PURE WALTER AUDIO CONTRACT & ZERO-LEAK PIPELINE

## 1. The Core Problem Diagnosed
During initial mobile and desktop testing of Base 01, secondary synthetic voices (Azure es-MX-JorgeNeural / browser SAPI) leaked in 3 exact scenarios:
1. Initial Orientation / Welcome Speech:
   - PathwayLectureEngine.ts triggers this if !hasSeenSoftware.
   - The manifest previously mapped this key to legacy files (base_06/seg_01.mp3 or mismatched lesson_intro.mp3).
   - Fix: Dedicated pre-baked files generated via Speechify API (simba-3.2, Walter (M)):
     - Mobile: public/audio/pathway/a1/orientation_mobile.mp3 (591,789 bytes)
     - Desktop: public/audio/pathway/a1/orientation_desktop.mp3 (733,101 bytes)

2. The "Ejemplo" / "Sonando" Button Leak in Single-Case Bases:
   - In professorSpeech.ts, if (cases.length > 1) skipped Base 01 because it only has 1 case (cases.length === 1).
   - It fell through to getConnectedIntroSpeech, which set sampleAudioText: introText (a 200-character Spanish paragraph).
   - Tapping the "Ejemplo" button tried to speak that unbaked Spanish paragraph, triggering Azure TTS fallback!
   - Fix: Changed condition to cases.length >= 1, binding sampleAudioText strictly to activeCase.exampleEnglish ("I learn English today."), mapped to voice_sample.mp3 (Walter).
   - In getConnectedIntroSpeech, set sampleAudioText: null during welcome orientation so no unbaked text can ever be passed to onPlaySample.

3. Reto / Trap Screen Example Button Leak:
   - When on TRAP or TRAP_CHECK beat ("Caza la trampa del español"), sampleAudioText was lesson.commonMistake.correct ("I work every day.").
   - "I work every day." was not mapped in the manifest, triggering Azure Jorge.
   - Fix: Generated trap_sample.mp3 ("I work every day."), trap_wrong.mp3 ("Work every day."), and mic_error.mp3 with Walter and mapped them in a1AudioManifest.json.

## 2. Universal Rule for Future Bases (Base 02 - Base 24)
- Every base must be audited with scripts/verify_base_manifest.mjs before being declared ready.
- Every single branch (Intro, Formula, Trap, Trap Check, Trap Error, Trap Success, Examples, Build Intro, Build Error, Build Success, Voice Instruction, Voice Sample, Voice Retry, Voice Victory, Not Heard, Mic Error) MUST have a dedicated, genuine Walter Speechify audio on disk.
- Never declare a base ready without verifying HTTP 200 with content-type: audio/mpeg on production Vercel.
