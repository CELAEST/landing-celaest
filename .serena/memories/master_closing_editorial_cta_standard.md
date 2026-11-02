# Master Closing Editorial CTA Standard (Option 1)

## Architecture & Design Decision
- **Concept**: Minimalist, open editorial closing CTA at the bottom of the FAQ section, completely eliminating bulky boxed container cards, cyber grids, or heavy decorative borders.
- **Copy Alignment (Option 1 - Intent to Direct Impact)**:
  - **Spanish (`es.json`)**:
    - Line 1: `De la intención.`
    - Line 2: `Al resultado directo.`
    - Buttons: `Comenzar` (`#pricing`), `Contactar ventas` (`mailto:support@celaest.com`).
  - **English (`en.json`)**:
    - Line 1: `From intent.`
    - Line 2: `To direct impact.`
    - Buttons: `Get started` (`#pricing`), `Contact sales` (`mailto:support@celaest.com`).
- **Typography & Styling**:
  - Open headline: `text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white leading-[1.08] max-w-4xl mx-auto`.
  - Primary pill button: `rounded-full bg-white text-zinc-950 font-medium text-sm sm:text-base px-6 sm:px-7 py-3 sm:py-3.5 shadow-sm hover:bg-zinc-100`.
  - Secondary pill button: `rounded-full bg-[#18181b] hover:bg-[#27272a] text-white border border-white/10 font-medium text-sm sm:text-base px-6 sm:px-7 py-3 sm:py-3.5`.
- **Zero-Hardcode & i18n**: Fully localized through `useTranslations("faq.cta")`.
- **Quality Gate**: Verified with fresh Next.js production build and Playwright headless visual verification.
