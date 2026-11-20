# CELAEST Lingua PC Laptop + macOS Frame Video Standard

## Production Architecture (`celaest-video-studio`)
- **Why 14" Laptop Viewport (`1280x720`) @ `1.5x` HiDPI = `1920x1080`**:
  - Capturing desktop web routes at ultra-wide `1920x1080` leaves wide lateral empty voids in `/reading` and oversized dark gutters around `/memory` flashcards.
  - Launching Chrome with `--force-device-scale-factor=1.5` and Playwright `viewport={"width": 1280, "height": 720}`, `record_video_size={"width": 1920, "height": 1080}` forces proportional 14" laptop layout (`md`/`lg` breakpoints active) rendered at crisp 1.5x HiDPI pixels (`1920x1080` H.264 intraframe `-crf 11 -g 10`).
  - **Sidebar hover collapse**: When navigating from `/pathway` to `/reading` via the collapsible desktop rail (`button[aria-label="READING"]`), smoothly move the cursor back into center viewport (`(640, 360)`) before recording trim start so the expanded sidebar collapses cleanly.
- **macOS Sequoia Studio Shell (`MacWindowShell.tsx` + `MacLaptopShowcase.tsx`)**:
  - Dedicated `46px` macOS titlebar houses traffic lights, centered address pill (`lingua.celaest.com/{slug}`), and dynamic right status chip that illuminates emerald cleanly upon verified `success` actions (`✓ GUARDADO EN MEMORY`, `✓ ESTRUCTURA ARMADA`) — zero floating pill border collisions.
  - Full-bleed `1616x955` Mac window (`1616x909` inner 16:9 viewport) centered with generous `103px` obsidian bottom clearance for `SubtitleBar`.
  - Soft cinema push-in zoom clamping (`camScale = 1 + (rawCamScale - 1) * 0.28`) preserves 100% visibility of 3D Liam Chibi, `habits` IPA modal, `Memory` titles, and the full desktop 3-piece `InterviewAnalysisErrorCarousel` correction cards (`Evaluación de Desempeño` scrolled smoothly via `[role="dialog"] .overflow-y-auto`).
- **Verified Production Output (2026-11-17)**:
  - `out/celaest-lingua-tienda-16x9.mp4`: `1920x1080`, `30fps`, `53.67s` (`1610` frames), `18.05 MB`, `mean_volume -18.5 dB`, `max_volume -1.1 dB`.
