# CELAEST Seamless Hero Seam & Extended Mountain Visibility Standard

## Problem Diagnosed & Solved
1. **Root Cause of the Visible Horizontal Line**:
   - `ProductsSection` contained a blurred ambient orb with negative margin `-top-[20%]`.
   - Combined with `overflow: hidden`, the browser engine clipped the blur at `top: 0`, generating a sharp horizontal line of RGB(6.4, 5.1, 8.7) right at the seam between the Hero and Products section.
   - Solved by moving the ambient orb down to `top-[10%]`, keeping `top: 0` pure `#020202` without clipping artifacts.

2. **Extended Mountain Ridge Visibility ("deja que se vea más la imagen")**:
   - The ridge mask previously faded at 64%, obscuring too much of the lower mountain texture.
   - Updated `.intent-ridge` to `mask-image: linear-gradient(180deg, #000 0%, #000 88%, transparent 100%)`, ensuring 88% of the mountain is completely sharp and visible.
   - Compacted `.intent-bottom-fade` from 26vh to `clamp(60px, 9vh, 100px)`, confining the gradient strictly to the very bottom floor of the viewport.
   - Unified `.intent-hero`, `.intent-art` base, and `.intent-bottom-fade` to `#020202`, matching `bg-brand-deep` identically with zero color delta.
