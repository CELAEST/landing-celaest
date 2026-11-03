# Celaest Pricing Section: Production Implementation Standard

## Architecture Contract
- **Archetype**: Tríptico Editorial (Option A), matching `PlatformSection` and `SecuritySection`.
- **Layout & Width**: `max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8` (1360px container).
- **Hairlines**:
  - `border-bottom: 1px solid #24242b` under header.
  - `border-bottom: 1px solid #24242b` under columns.
  - `border-left: 1px solid #24242b` between column 01/02 and 02/03.
- **Controls (Style 1 - Editorial Puro)**:
  - Zero pill containers, zero chunky white buttons (`bg-white text-black` eradicated).
  - Pure Swiss typography: `sw-editorial-btn` with active indicator `::after` (2px `#a855f7` neon line + `box-shadow: 0 0 8px rgba(168, 85, 247, 0.7)`).
  - 1px hairline divider (`sw-editorial-divider`) between Billing Cycle (`PERIODO`) and Currency Switcher (`MONEDA`).
  - Integrated with `useGeoPricing` for dynamic currency override and billing calculation.
- **Plan 02 ("Profesional")**:
  - `popular-top-neon`: 2px top glowing neon bar `#a855f7`.
  - `popular-label-neon`: Unboxed monospace uppercase badge `MÁS POPULAR` (`text-[#c084fc] font-mono font-bold tracking-[0.22em] text-[10.5px]`).
- **CTAs**:
  - Editorial action links `pricing-feature-link` (`Comenzar →` / `Contactar Ventas →`) with animated arrow hover, directly matching `PlatformSection`'s `feature-link`.
- **i18n & Zero Hardcode**:
  - All labels mapped to `es.json` and `en.json` under `pricing.*` and `security.*`.
