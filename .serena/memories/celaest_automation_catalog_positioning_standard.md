# CELAEST Automation Catalog SEO/AEO/GEO Positioning Standard

## Architecture & Live Deployment
- Hosting: Cloudflare Workers Assets (`wrangler.jsonc`, `OUTPUT_EXPORT="true"`, static output `./out`, `worker.js` enforcing 301 canonicals to `https://celaest.com`).
- Core Commercial Positioning: Unifies AI automation store/catalog (`tienda de automatizaciones con IA`, `catálogo de automatizaciones`, `workflows B2B`), multi-model Zero-Training `Malla IA` (`AI Mesh`), and `CELAEST Lingua` (technical/executive English with IPA phonetics and 24/7 interview simulator).

## Implemented Pillars
1. **Structured Data (`src/lib/structured-data.ts`)**: `generateAutomationCatalogSchema` emits `OfferCatalog` JSON-LD with 5 departmental `Service` verticals (`Comercial & Soporte`, `Finanzas & Admin`, `Operaciones, Datos & TI`, `Talento & RRHH`, `Dirección & Seguridad`) on `/[locale]/solutions` and `/[locale]/solutions/automation`, alongside `FAQPage`, `BreadcrumbList`, `SoftwareApplication`, and `TechArticle`.
2. **Definitional & Departmental Copy (`src/i18n/messages/{es,en}.json`, `src/app/[locale]/solutions/page.tsx`)**: Zero-Box Editorial `definitionLead` block ("Un catálogo y tienda de automatizaciones con IA...") plus department-by-department matrix (`SolutionComparisonTable`) for direct AI Overview / ChatGPT Search extraction.
3. **Pillar Guide & Bilingual Feeds (`src/content/guides.json`, `/rss.xml`, `/rss-en.xml`)**: Pillar guide `catalogo-tienda-automatizaciones-ia-workflows` (`ES`/`EN`), `public/llms.txt`, and `public/llms-full.txt`, totaling 34 indexed sitemap URLs.
4. **Off-Page & RSS Distribution Kit**: `content/LAUNCH-MASTER-PLAYBOOK.md` and `npm run content:kit` (`content/social-kits/`) for LinkedIn (`https://www.linkedin.com/in/celaest/`), GitHub (`https://github.com/celaest`), free AI directories, and Buffer/Metricool RSS autopublishing.

## Verification
- `npm test`: 8 test files, 44/44 tests passed.
- Live UTF-8 HTML verified on `https://celaest.com/es/solutions`, `/es/solutions/automation`, `/es/guides/catalogo-tienda-automatizaciones-ia-workflows` with `OfferCatalog`, `definitionLead`, and departmental matrix present; `out/sitemap.xml` confirmed at 34 URLs.