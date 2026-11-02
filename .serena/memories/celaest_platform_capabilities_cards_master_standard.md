# CELAEST Platform Structure Standard (Replication of replicar-diseno-web)

## Architecture & Visual Composition
1. **No Typical Cards Enclosure**:
   - The section avoids outer rounded cards (`PlatformCard`) wrapping each column.
   - The 3 columns (`.feature-grid`) are separated by clean, minimal vertical divider lines (`border-left: 1px solid #24242b`).
   - On screens < 960px, it adapts to 1 column with top dividers (`border-top: 1px solid #24242b`).

2. **Column Structure**:
   - **Number**: Violet accent `01`, `02`, `03` with a 65px horizontal line (`#3d3947`).
   - **Heading**: Editorial two-line title in `#ffffff`, letter-spacing -1.6px.
   - **Description**: High-contrast body copy (`#96959e`), 15px with generous line-height.
   - **Micro-UI Preview Widget**: Direct presentation of the 3 preview cards (`MembersWidget`, `PipelineWidget`, `EcosystemWidget`) at native 261px height with `#292831` border and rounded-2xl geometry.
   - **CTA Link**: `Explorar →` inline link with hover purple glow and arrow translation.

3. **Section Shell**:
   - Matches `#products` width exactly: `max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10`.
   - Header with `—— CAPACIDADES` eyebrow bar, editorial title `Potencia tu` / `flujo de trabajo.`, and horizontal divider line `border-bottom: 1px solid #24242b`.
