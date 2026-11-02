# CELAEST Footer Wordmark & Outline Typography Standard (Centered Post-FAQ)

## 1. Context & Architecture
- Wordmark **`CELAEST`** repositioned from the absolute base of the footer to sit **directly below the "¿Aún tienes preguntas?" FAQ card**, perfectly centered as the centerpiece transition between FAQ and Footer navigation.
- Centered optical alignment:
  - `footer-wordmark-container`: `display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;`
  - `.footer-wordmark-line`: Centered glowing beam (`left: 50%; transform: translateX(-50%); width: 52%; max-width: 380px;`).
  - `.footer-wordmark-aura`: Centered radial glow directly behind the letters.
- Spacing calibration:
  - FAQ section bottom padding reduced to `pb-10 sm:pb-14` (eliminating dead space).
  - Footer top padding calibrated to `pt-6 sm:pt-10` with wordmark margin `mb-14 sm:mb-20`.
  - Net distance between "¿Aún tienes preguntas?" and `CELAEST` is tight, breathing, and eliminates excessive downward drift.
- All components strictly adhere to <80 lines Clean Architecture modularity.
