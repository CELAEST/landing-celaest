# SPEECHIFY STUDIO MASTER AUDIO INTEGRATION (BASE 01 & GENERAL STANDARD)

## 1. Master Pipeline Pattern
1. User generates unified studio script in Speechify Studio with calibrated Walter (M) voice and downloads high-fidelity master MP3 (`Playground Project (en) v2.mp3`).
2. Script `scripts/slice_base01_studio.mjs` executes surgical FFmpeg slicing between silence markers (with verified boundaries).
3. All 23 distinct branches of Base 01 are generated with 100% genuine Walter studio voice:
   - Orientation (mobile & desktop)
   - Lesson intro
   - Visual formula (seg_01)
   - Formula example ("I learn English today")
   - L1 interference trap explanation (seg_02)
   - Live challenge prompt (seg_03)
   - Trap wrong option ("Work every day")
   - Trap correct option ("I work every day")
   - Trap error feedback
   - Trap success feedback
   - Example 1 native audio ("I learn English step by step")
   - Example 1 phonetic breakdown
   - Example 2 native audio ("I work with my team every morning")
   - Example 2 short variant ("I work every morning")
   - Transition to build step (seg_07)
   - Build step intro
   - Build order error hint
   - Build success transition
   - Voice practice instruction
   - Voice retry encouragement
   - Voice not heard prompt
   - Microphone blocked error
   - Voice victory celebration
4. All 23 slices verified with `scripts/verify_base01_manifest.mjs` and deployed to Vercel production.
