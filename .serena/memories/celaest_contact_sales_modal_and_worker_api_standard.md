# CELAEST Contact Sales Modal & Cloudflare Worker API Standard

## Root Cause Solved
- Previously, every sales/contact button across `PricingSection` (Plan 03 Enterprise), `ClosingCTASection`, `FAQEditorialCTA`, `FooterBrandColumn`, `SolutionStickyIndex`, `LegalSidebarToc`, and `faq/page.tsx` used bare `mailto:support@celaest.com` links, which fail for browser Gmail users on Windows/Chrome, while `POST /api/contact` returned 404 under Cloudflare Workers static export (`out/`).

## Implemented Architecture
1. **URL Builders (`src/lib/contact.ts`)**: `buildGmailComposeUrl`, `buildMailtoUrl`, and `buildContactFallbackBody` provide consistent pre-filled Gmail Web and RFC 6068 mailto links.
2. **Shared Runtime-Agnostic Email Processor (`src/lib/email/contact-processor.ts`, `src/lib/email/email-service.ts`, `src/lib/email/types.ts`)**:
   - Unified validation, honeypot spam handling, strict provider guard (`503 PROVIDER_NOT_CONFIGURED` + `fallbackGmailUrl` when `strictProvider` lacks `RESEND_API_KEY`), and Resend delivery with `internalReceiver` prioritized first (`replyTo` set to customer email) followed by 550ms rate-limit pacing before customer confirmation receipt.
   - Reused by both Next.js routes (`src/app/api/contact/route.ts`, `src/app/api/newsletter/route.ts`) and Cloudflare Worker (`worker.js` + `wrangler.jsonc` vars `EMAIL_FROM` & `EMAIL_INTERNAL_RECEIVER: celaest.oficial@gmail.com`).
3. **Zero-Box Editorial Contact Modal (`src/components/contact/*`, `Example24_ContactModalStudio` in `lab`)**:
   - Ported Proposal 01 (`Zero-Box Editorial`) designed in `c:\Users\user\Music\lab\src\components\examples\Example24_ContactModalStudio.tsx`.
   - Uses `font-sans` (`Inter`, matching `PricingSection` & `ArchitectureSection` exactly with zero monospace fallback), `#060609` surface, `#24242b` hairlines, `01 — Contacto Directo` rule index, underline-only borderless inputs (`border-b border-[#24242b] focus:border-purple-500`), underline topic tabs (`Enterprise · Catálogo · Malla IA · Soporte`), and direct hairline rows for **Abrir en Gmail** & **Copiar `support@celaest.com`**.

## Verification
- `npm test`: 9 test files, 50/50 tests passed (including `__tests__/contact-flow.test.tsx`).
- `npm run type-check`: exited cleanly with code 0.
- `RESEND_API_KEY` active on Cloudflare Worker secrets (`celaest-landing`).
- Deployed live (`0908b0cf-2ce8-48a5-af4a-5dc9531c0642`) and verified visually in Playwright on `https://celaest.com/es?v=6#pricing`:
  - Computed font-family on modal heading matches `#pricing` heading (`sameFontFamily: true`).
  - Desktop (`820x410.45px`): `fitsWithoutScroll: true`, `overflowX: false`.
  - Mobile (`390x844`): `mobileOverflowX: false`, clean single-column stack.