# CELAEST Platform Automation Pipeline Nodes Master Standard

## Context & Problem
In the Automation Pipeline Widget (Column 02: Pipeline de automatización), the flow nodes previously had:
- Harsh, rigid purple/gray border outlines (`#4d485e`) with sharp 7px corners.
- Node 2 enclosed the lightning bolt in a badge box.
- Result nodes used white icons instead of dark glyphs, and red node had a square box.
- The wire was an abrupt straight path without physical connector socket pills.

## Master Standard Specification (1:1 with Master Reference)
1. **Soft Border & Luxurious Obsidian Glass Surface**:
   - `border: 1px solid rgba(255, 255, 255, 0.07)` (subtle, soft dark perimeter).
   - `border-radius: 13px` (modern smooth squircle curve).
   - `background: #14131d` with `box-shadow: 0 4px 16px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.04)`.
   - Hover state: `border-color: rgba(255, 255, 255, 0.16); background: #181723; transform: translateX(-50%) translateY(-1px)`.

2. **Node 1 (`Trigger`)**:
   - Circular green badge: `#22c55e`, `26px x 26px`, soft green glow `box-shadow: 0 0 10px rgba(34, 197, 94, 0.25)`.
   - Play icon: Dark `#0c0b12` polygon in the center.
   - Text: `Trigger` (11px, weight 600, #fff), `Nuevo usuario` (9px, #8b8997).

3. **Wire 1 (Vertical)**:
   - Sockets: Top and bottom rounded vertical connector pills (`4px x 5px`, fill `#8b5cf6`).
   - Line: `1.8px`, background `#8b5cf6`.
   - Central glowing violet dot: `5px x 5px`, `box-shadow: 0 0 6px #8b5cf6`.

4. **Node 2 (`Ejecutar acción`)**:
   - **Pure Unboxed Lightning Bolt**: Floating naked on node surface, vivid violet `#9d55ff` with subtle purple drop shadow. Zero container box.
   - Text: `Ejecutar acción` (11px, weight 600, #fff), `Enviar notificación` (9px, #8b8997).

5. **Wire 2 (Wishbone Branching SVG)**:
   - Top socket: `4px x 6px` rounded pill at exit.
   - Dual wishbone fork curving immediately outward and down to each node's center.
   - Bottom sockets: `4px x 6px` rounded pills at each node entrance.

6. **Node 3 & Node 4 (Results)**:
   - `Completado`: Circular green badge (`#22c55e`) with dark checkmark (`#0c0b12`, stroke 3), text in bold white.
   - `Error / Reintentar`: Squircle coral red badge (`#ef4444`, border-radius 6px) with dark cross (`#0c0b12`, stroke 3.5), text in bold white.
