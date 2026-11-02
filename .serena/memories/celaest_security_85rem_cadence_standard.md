# CELAEST Security Section 85rem Cadence & Dynamic Particle Triptych Standard

## 1. Problem Identification (Lateral Contraction Bug & Visual Clutter)
- In `landing-celaest`, `ProductsSection` and `PlatformSection` both expand to `max-w-[85rem]` (1360px), creating an expansive edge-to-edge luxury feel.
- `SecuritySection` previously constricted into `max-w-7xl` (1280px) and internally into `max-w-5xl` (1024px) with magnetic cards occupying only 32% widths (~300px), causing an uncomfortable narrowing by >330px when scrolling into Security.
- Initial prototypes had cluttered mock telemetry (fake tokens, ping tables, fake test buttons) which degraded luxury enterprise aesthetic.

## 2. Clean Interactive Particle Solution (`lab/src/components/examples/Example12_SecurityStudio.tsx`)
- Container: `max-w-[85rem]` (1360px) perfectly aligned with `PlatformSection` and `ProductsSection`.
- Architectural Layout: 3 columns with 1px border dividers (`#24242b`), mono numbering `01`, `02`, `03` and minimalist typography.
- **Zero Basura / Zero Clutter**:
  - All fake buttons, token boxes, ping lists, and spec tables removed.
  - Cards formatted as pristine dark Obsidian Glass (`#0c0b12`) with subtle border and dynamic hover backlight glow.
- **Dynamic 3D Particle Reaction on Hover**:
  - In resting state: 6,000 GPU-accelerated WebGL particles breathe gently in a subtle cosmic mist.
  - On hover:
    - **Card 01 (Licencias verificadas)**: Particles morph into the defined **Escudo Cuántico (Shield)** with purple accent.
    - **Card 02 (Cifrado extremo a extremo)**: Particles morph into the iconic **Ave CELAEST (Bird Logo)** glowing in high-intensity electric violet with zero-knowledge aura.
    - **Card 03 (Infraestructura resiliente)**: Particles morph into the **Globo de Red Global (Globe)** of interconnected nodes with cyan pulse.
  - Follows cursor with electromagnetic attraction in real-time.
- Running live in lab on `http://localhost:5173/` (shortcut `s` or `[12] Security Studio`).
