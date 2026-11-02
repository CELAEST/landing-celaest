---
name: CELAEST Landing
description: Enterprise AI Systems, Workflows, and Digital Asset Infrastructure
colors:
  background: "#030307"
  surface-card: "#0c0d15"
  surface-node: "#141522"
  surface-hover: "rgba(255, 255, 255, 0.03)"
  border-subtle: "rgba(255, 255, 255, 0.08)"
  border-highlight: "rgba(255, 255, 255, 0.12)"
  primary: "#8b5cf6"
  primary-deep: "#7c3aed"
  primary-light: "#a78bfa"
  primary-bg: "rgba(124, 58, 237, 0.20)"
  accent-green: "#10b981"
  accent-red: "#f43f5e"
  accent-cyan: "#22d3ee"
  text-primary: "#ffffff"
  text-secondary: "#94a3b8"
  text-muted: "#64748b"
typography:
  display:
    fontFamily: "Space Grotesk, Inter, sans-serif"
    fontSize: "4.25rem"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  h2:
    fontFamily: "Space Grotesk, Inter, sans-serif"
    fontSize: "2.75rem"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  h3:
    fontFamily: "Space Grotesk, Inter, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0em"
  caption:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.02em"
rounded:
  sm: "6px"
  md: "10px"
  lg: "16px"
  xl: "22px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "48px"
components:
  card-panel:
    backgroundColor: "{colors.surface-card}"
    rounded: "{rounded.xl}"
  button-primary:
    backgroundColor: "{colors.primary-deep}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.sm}"
  badge-active:
    backgroundColor: "{colors.primary-bg}"
    textColor: "{colors.primary-light}"
    rounded: "{rounded.sm}"
---

# Design System & Guidelines

## Core Philosophy: Obsidian Enterprise Luxury

CELAEST enforces high-density, high-legibility enterprise UI engineering. We avoid generic AI styling clichés (such as thick borders, gratuitous rainbow gradients, centered template cards, or lorem placeholder data).

### 1. Depth & Glass Architecture
- **Surfaces**: Layered panels in deep obsidian (`#030307` base, `#0c0d15` panels, `#141522` nodes).
- **Bevel Reflection**: Subtle 1px top highlight (`before:bg-gradient-to-r before:from-transparent before:via-white/[0.12] before:to-transparent`) to ground glass surfaces with physical lighting.
- **Borders**: Muted, semi-transparent hairpins (`border-white/[0.08]`). No hard or saturated full-perimeter borders.

### 2. Micro-UI Fidelity
- Every widget represents a functional, realistic piece of production software.
- High-contrast states, readable avatars, authentic brand SVGs, clear hierarchy, and zero premature label truncation.

### 3. Typography & Hierarchy
- Two-tone headings: Light introductory line paired with a bold anchor line (`font-light` / `font-bold`).
- High-contrast body copy (`text-neutral-400` or `text-neutral-300` on dark obsidian).
- All UI text fully localized via `next-intl` (ES/EN).
