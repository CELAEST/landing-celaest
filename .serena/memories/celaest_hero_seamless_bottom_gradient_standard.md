# CELAEST Hero-to-Body Seamless Gradient Transition Standard

## Transition Architecture
1. **Ridge Alpha Mask**: `.intent-ridge` uses `mask-image: linear-gradient(180deg, #000 0%, #000 64%, transparent 95%)` so the base of the rocky terrain gently dissolves into transparency before reaching the viewport floor.
2. **Atmospheric Vignette Base**: `.intent-art-vignette` bottom ramp updated to `linear-gradient(0deg, #020202 0%, rgba(2, 2, 2, 0.95) 8%, rgba(2, 2, 2, 0.60) 22%, transparent 38%)`.
3. **Hero Bottom Fade (`.intent-bottom-fade`)**: Dedicated overlay at `bottom: -1px` spanning `clamp(160px, 26vh, 320px)` fading from `transparent` through quadratic alpha stops to 100% solid `#020202` (`bg-brand-deep`).
4. **Dividing Line Eradication**: Removed the horizontal separator line from the top of `ProductsSection`, allowing the Hero bottom fade to blend with 100% continuous continuity into the section below.
