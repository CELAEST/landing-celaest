# CELAEST Section Spacing & Demarcation Architecture Standard

## 1. Uniform Cadence & Demarcation Protocol
- Standardized vertical padding scale across ALL landing page sections to ensure 100% geometric uniformity and rhythm:
  - Standard inter-section class: `py-14 sm:py-16 lg:py-20` (56px mobile, 64px tablet, 80px desktop).
  - Between adjacent sections (e.g. Products to Platform, Platform to Security, Security to Pricing, Pricing to FAQ), the combined vertical breathing room is 160px on desktop (`pb-20` + `pt-20`), 128px on tablet, 112px on mobile.
- Hairline Section Demarcation:
  - Integrated a subtle 1px luminous hairline divider at the top boundary of every section:
    `<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none z-20" />`
  - Defines crisp, architectural transitions without adding layout shift or heavy borders.

## 2. Hero-to-Products Transition Symmetry Standard
- Because `HeroSection` is a 100vh viewport-locked stage ending at the mountain ridge (`/ridge_shadowed.png`) with zero internal bottom padding, `ProductsSection` utilizes:
  - `pt-28 sm:pt-32 lg:pt-40 pb-14 sm:pb-16 lg:pb-20`
  - This guarantees that the visual breathing room from the Hero mountain ridge to the "Herramientas con IA" headline (160px on desktop) exactly mirrors the inter-section breathing room between Products and Platform (80px + 80px = 160px).

## 3. Standardized Sections
- `ProductsSection`: `pt-28 sm:pt-32 lg:pt-40 pb-14 sm:pb-16 lg:pb-20` + top hairline divider.
- `PlatformSection`: `py-14 sm:py-16 lg:py-20` + top hairline divider.
- `SecuritySection`: `py-14 sm:py-16 lg:py-20` + top hairline divider.
- `PricingSection`: `py-14 sm:py-16 lg:py-20` + top hairline divider.
- `FAQSection`: `pt-14 sm:pt-16 lg:pt-20 pb-10 sm:pb-12` + top hairline divider.
- `Footer`: `pt-6 sm:pt-10 pb-12 sm:pb-16` + top hairline divider + centered `CELAEST` wordmark directly post-FAQ.

## 4. Quality Gate
- 100% pass on Vitest test suite (`11/11` tests).
- 100% clean production build (`next build`) with 11 SSG routes.
- Visual inspection via Playwright confirming harmonious cadence across all seams.
