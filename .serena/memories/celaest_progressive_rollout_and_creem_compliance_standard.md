# CELAEST Progressive Rollout & Creem.io Merchant Compliance Standard

## 1. Progressive Catalog & Pricing Alignment
- **Launch Reality**: The CELAEST catalog launches with its flagship SaaS application (`CELAEST Lingua`) and `Malla IA` orchestration, with additional verified automation and data modules joining progressively.
- **Landing Pricing (`src/i18n/messages/es.json` & `en.json`)**:
  - `starter` (01, maps to `pro`): Access to `CELAEST Lingua` and active catalog solutions + progressive access to upcoming releases (up to 10 active solutions).
  - `professional` (02, maps to `enterprise`): Full access to the current catalog + automatic unlimited access to all future catalog releases + up to 1,000,000 AI requests/month.
  - `enterprise` (03, Custom): Custom corporate deployment, BYOK AI Mesh, and priority early access to new solutions.
- **Dashboard PlanCard (`celaest-dashboard/src/features/billing/components/ui/PlanCard.tsx`)**:
  - Normalizes HTML entities (`&amp;` -> `&`) before translation key resolution and fallback rendering.
  - Translates `1000000_ai_requests`, `1_000_000_ai_requests_month`, `full_analytics___roi__amp__costs`, `up_to_3_products`, `up_to_10_products`, and `unlimited_products` with progressive rollout wording.

## 2. Editorial Roadmap Cards (`UpcomingReleaseCard.tsx`)
- Displayed alongside live products in `MarketplacePublicView.tsx` and `MarketplaceDashboardView.tsx`.
- Strictly editorial (`EN DESARROLLO · PRÓXIMO LANZAMIENTO`): zero price, zero ratings, and no purchase buttons to comply 100% with Creem.io anti-placeholder rules while building customer expectation for `CELAEST Flow Studio` and `CELAEST Data & Ops Suite`.

## 3. SaaS Product Modal & Legal Unification
- `ProductModalSidebar.tsx` distinguishes `isSaasProduct(product)` (`Suscripción SaaS Mensual` + `/ mes`) vs perpetual downloadable assets (`Licencia Comercial`).
- `TabCompatibility.tsx` reflects modern cross-platform browser/cloud compatibility (`Chrome, Edge, Safari, Firefox` on `Windows, macOS, Linux, iOS, Android`).
- Terms of Service (`legal.terms`) and Refund Policy (`legal.refunds`) explicitly cover SaaS applications, digital assets, and AI Mesh under unified final-sale / demonstrable-technical-defect refund rules, plus explicit prohibition of NSFW/adult AI content generation.
