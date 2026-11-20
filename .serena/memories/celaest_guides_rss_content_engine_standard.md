# CELAEST Editorial Guides, RSS Syndication & Multi-Platform Content Engine

## Single Source of Truth (`src/content/guides.json` + `src/lib/guides.ts`)
- Holds bilingual (`es` / `en`) playbooks covering Malla IA Zero-Training, CELAEST Lingua, and Python/Excel automation.
- Automatically feeds:
  1. `/[locale]/guides` (`src/app/[locale]/guides/page.tsx`) & `/[locale]/guides/[slug]` (`src/app/[locale]/guides/[slug]/page.tsx`) with `TechArticle` + `FAQPage` + `BreadcrumbList` JSON-LD and Zero-Box Editorial layout (`SolutionShell`, `LegalSectionView`, `SolutionStickyIndex`).
  2. Static RSS 2.0 feeds via `src/lib/rss.ts` -> `src/app/rss.xml/route.ts` (ES) and `src/app/rss-en.xml/route.ts` (EN) with `application/rss+xml; charset=utf-8` in `public/_headers`.
  3. `src/app/sitemap.ts` (32 total URLs) and `public/llms*.txt`.
  4. `npm run content:kit` (`scripts/generate-content-kit.mjs`) -> outputs ready-to-publish `linkedin-es.md`, `linkedin-en.md`, `x-thread-es.md`, `short-video-es.md`, and `newsletter-es.md` inside `content/social-kits/<slug>/`.

## Delegated Conversion Event Tracking (`src/lib/analytics-events.ts` + `src/components/analytics.tsx`)
- Single passive document click listener tracks `cta_signup_click` (with `plan`, `billing_cycle`), `cta_signin_click`, `cta_marketplace_click`, `cta_docs_click`, `solution_explore_click`, `cta_pricing_click`, and `cta_contact_click` across GA4 (`gtag`) and Microsoft Clarity (`Clarity.event`) while honoring `celaest_cookie_consent !== "essential"`.
