# CELAEST Unboxed Ecosystem Integration Cards Master Standard

## Context & Architecture
In the CELAEST Capabilities section (Ecosistema de Activos / 03), the integration cards represent connected tools, macros, and integrations (Auto Sync, Data Fetcher, Sheets Bridge, Slack Connector).

## Anti-Pattern Identified & Eradicated
- **Enclosed Badge Box Anti-Pattern**: Wrapping brand logos in heavy square/rounded colored containers (`.asset-badge.purple`, `.asset-badge.green`, `.asset-badge.blue`, `.asset-badge.slack`) trapped the brand marks, introduced unnecessary bounding boxes, and cluttered the vertical cadence.
- **Top-Right Download Crowding**: Placing the download button opposite the badge in row 1 squeezed the card header and forced the text to wrap awkwardly below.

## The Pure Unboxed Master Standard (1:1 with Master Reference)
1. **Unboxed Real Vector Marks**:
   - **Auto Sync**: Pure vector `< / >` glyph with rounded caps in vivid violet `#9d55ff` floating naked on the top-left of the card.
   - **Data Fetcher**: Pure vector `⚡` solid lightning bolt with rounded vertices in electric sky blue `#38bdf8` floating naked on the top-left.
   - **Sheets Bridge**: Authentic official Google Sheets emerald green document (`#0F9D58`) with folded top-right dog-ear (`#87CEAC`) and 2x3 white spreadsheet grid table.
   - **Slack Connector**: Authentic official Slack 4-color octothorpe emblem (`#36C5F0` cyan, `#2EB67D` green, `#ECB22E` amber, `#E01E5A` red/pink).

2. **Spatial Hierarchy & Composition**:
   - **Row 1**: Floating unboxed brand icon (height ~22px).
   - **Row 2**: Title in crisp `#ffffff`, 11px font size, weight 500, letter-spacing -0.2px.
   - **Row 3 (Metadata & Action)**:
     - Left: Version tag `v2.4.1`, `v1.8.0`, etc. in muted slate `#71707d`, 9.5px.
     - Right: Lucide `Download` (12px, stroke 1.8), `#71707d`, transitions to `#ffffff` on hover.

3. **Card Shell Geometry**:
   - `height: 86px`, `border-radius: 14px`.
   - Dark obsidian background: `#13121b`.
   - Subtle perimeter border: `1px solid rgba(255, 255, 255, 0.07)` hovering to `rgba(255, 255, 255, 0.16)`.
   - Smooth lift interaction: `transform: translateY(-1px)` on hover.
