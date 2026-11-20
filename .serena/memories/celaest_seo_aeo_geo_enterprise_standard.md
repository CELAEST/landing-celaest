# CELAEST SEO / AEO / GEO & Entity Disambiguation Standard (Updated 2026-11-20)

## Production Deployments Verified
1. **`https://celaest.com` (`landing-celaest`, Cloudflare Worker Version `16ef998f-bf4c-4f71-89e9-0a65f12bf2c6`, 63/63 Vitest tests)**:
   - Single-hop `301` canonicalization in `worker.js` for `http://`, `www.`, trailing slashes (`/es/` -> `/es`), and legacy/unprefixed routes (`/solutions*`, `/guides*`, `/legal*`, `/faq`, `/terms`, `/es/terms`, `/en/terms`, `/privacy`, `/es/privacy`, `/year`, `/mes`, `/month`, `/año`), plus `X-Robots-Tag: noindex, nofollow` on real `404` responses.
   - Sitelinks architecture (`gamecode.me` parity): semantic SSR `<nav aria-label="..." className="sr-only">` inside `src/components/landing/header.tsx` + `generateSiteNavigationSchema` (`ItemList` of 6 `SiteNavigationElement` entries) in `src/lib/structured-data.ts` and `src/app/[locale]/page.tsx`.
   - Entity graph (`Organization` JSON-LD with `disambiguatingDescription`, `address: Medellín, Antioquia, CO`, `sameAs` including `https://github.com/celaest`, `https://www.linkedin.com/in/celaest/`, `https://www.youtube.com/@celaest`), `OfferCatalog`, `FAQPage` (`SpeakableSpecification`), and `VideoObject` (`P6eigqaFWB0`, `PT1M3S`, custom thumbnail `/images/lingua-video-thumbnail.webp` on `/[locale]/solutions/lingua`).
   - All 12 icon files (`/favicon.ico`, `/favicon-v2.ico`, `/icon.svg`, `/icon-v2.svg`, `/icon-48[-v2].png`, `/icon-192[-v2].png`, `/icon-512[-v2].png`, `/apple-icon[-v2].png`) verified `200 OK` and `isOpaque: true` (opaque `#05050A` + `#7C3AED` glow).
2. **`https://dashboard.celaest.com` & `https://app.celaest.com` (`celaest-dashboard`, Cloudflare Worker Version `4667e1ce-ec04-4152-94be-b481663cae7e`)**:
   - Added `worker.js` redirecting `app.celaest.com` -> `https://dashboard.celaest.com` (`301`).
   - Added `alternates.canonical: "https://dashboard.celaest.com"`, `noindex, nofollow` on `/auth/*` and `(dashboard)/*`, opaque `-v2` favicons, and unlocked `/_next/static/` in `robots.txt`.
3. **`https://lingua.celaest.com` (`celaest-english-front`, Cloudflare Worker Version `85dd9c68-97e5-45b3-bf8d-43925369667d`)**:
   - Added `/assets/begin1-poster.webp` automatic `poster` fallback in `OptimizedVideo.tsx`, `/assets/lingua-video-thumbnail.webp`, `VideoObject` JSON-LD, `<link rel="canonical" href="https://lingua.celaest.com/" />`, opaque `-v2` favicons, and `public/robots.txt`.
4. **Google Search Console (`sc-domain:celaest.com`, owner `estebani1421@gmail.com`) Actions Completed on 2026-11-20**:
   - Validations started (`20/11/26`): `No se ha encontrado (404)` (2), `Duplicada: el usuario no ha indicado ninguna versión canónica` (8), `Indexación de vídeos > No se ha proporcionado ninguna URL de la miniatura` (1).
   - URL Prefix Removal (`Retirar URL temporalmente`): `https://app.celaest.com/` (`Procesando solicitud`).
   - Sitemap `https://celaest.com/sitemap.xml` resubmitted (`Correcto`, 34 discovered pages) + IndexNow submitted (`200 OK`).
   - `Solicitar indexación` completed for: `https://celaest.com/`, `https://celaest.com/es`, `https://celaest.com/es/solutions`, `https://celaest.com/es/solutions/automation`, `https://celaest.com/es/solutions/ai-mesh`, `https://celaest.com/es/solutions/lingua`, `https://celaest.com/es/guides/catalogo-tienda-automatizaciones-ia-workflows`, and `https://lingua.celaest.com/`.
