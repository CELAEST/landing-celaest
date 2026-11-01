# CELAEST Monolith Curved Branding Track & Logo Integration

## Implementation Details
- Replaced the straight rotated text and `//` slashes with a curved trajectory and central CELAEST logo icon.
- **Curved Path**: Defined `<path id="monolith-text-curve" d="M1226 418 C 1268 248, 1322 95, 1414 -64" fill="none" />` in `HeroArtStage.tsx`, tracking parallel to the monolith's right edge at a precise distance of 47-48px.
- **Typography on Curve**:
  - `CELAEST` rendered on `<textPath href="#monolith-text-curve" startOffset="140px">`.
  - `SYSTEMS` rendered on `<textPath href="#monolith-text-curve" startOffset="244px">`.
- **Central Logo**:
  - Placed between the two words at arc length 228px (coordinates x=1291.3, y=199.7).
  - Rotated tangentially at -70.1° and vertically centered relative to the text cap-height.
  - Filled with `#d8b4fe` and rendered with `#intent-logo-glow` for high-end contrast.
