# CELAEST Unified Pricing & Plan Alignment Standard

Authoritative plan structure across `celaest-back` (`subscription_plans` + `/api/v1/public/pricing/resolve`), `celaest-dashboard` (`UpgradePlanModal` / `PlanCard`), and `landing-celaest` (`PricingSection` + `src/lib/geo-pricing.ts` + i18n/SEO):

## 1. Real Tiers & Plan Slugs
1. **Starter (`starter`) — Comunitario / Community (`01`)**
   - USD: `$0 forever` (no credit card required)
   - COP: `$0 para siempre` (`sin tarjeta de crédito requerida`)
   - Quotas: `100` AI requests/mo (`SOL. IA`), `1` AI model, `1` concurrent AI task, initial catalog up to `3` solutions as released, `2` team members (`ASIENTOS`), `2` devices/license, `1 GB NVMe`, `7`-day audit logs, `1` webhook, basic analytics, community support.
   - Checkout URL: `https://dashboard.celaest.com/?mode=signup&plan=starter`

2. **Pro (`pro`) — Más Popular / Most Popular (`02`, highlighted)**
   - USD: `$29.00 USD / month` monthly (`$288.00 USD / year` billed yearly)
   - COP (`country=CO`): `73.000 COP / mes` monthly (`720.000 COP / año` billed yearly, manual override in CO)
   - Quotas: `500K` (`500,000`) AI requests/mo, `5` AI models, `5` concurrent AI tasks, active catalog (includes `CELAEST Lingua`) + upcoming releases up to `10`, `15` team members, `10` devices/license, `25 GB NVMe`, `90`-day audit logs, `5` webhooks, GitHub integration, custom branding, advanced analytics, priority support.
   - Checkout URL: `https://dashboard.celaest.com/?mode=signup&plan=pro&billing_cycle={monthly|yearly}`

3. **Enterprise (`enterprise`) — Escala Corporativa / Enterprise Scale (`03`)**
   - USD: `$99.00 USD / month` monthly (`$990.00 USD / year` billed yearly)
   - COP (`country=CO`): `250.000 COP / mes` monthly (`2.500.000 COP / año` billed yearly, manual override in CO)
   - Quotas: `1.0M` (`1,000,000`) AI requests/mo, unlimited AI models & concurrent tasks, unlimited current + future catalog solutions, unlimited team members & devices/license, `200 GB NVMe`, `365`-day audit logs, CSV export, `20` webhooks, GitHub integration, ROI/cost analytics, SLA guarantee, dedicated support (BYOK / Sovereign On-Premise available).
   - Checkout URL: `https://dashboard.celaest.com/?mode=signup&plan=enterprise&billing_cycle={monthly|yearly}`

## 2. Safeguards Implemented
- `src/lib/geo-pricing.ts`: `DEFAULT_ES_PRICING` aligned to live CO manual overrides (`73000`/`720000` & `250000`/`2500000`, `exchange_rate: 3947.368421`, `ppp_factor: 0.64`) and cache key bumped to `celaest:geo-pricing:v2:`.
- `src/lib/structured-data.ts`: `AggregateOffer` updated to `lowPrice: "0"`, `highPrice: "99"`, `offers` matching `Starter ($0)`, `Pro ($29)`, `Enterprise ($99)`.
- `public/llms.txt`, `public/llms-full.txt`, `src/content/guides.json`, and all FAQs/solutions comparisons in `src/i18n/messages/{es,en}.json` unified without legacy `"Inicial ($29)"`, `"Profesional ($99)"`, or `"Custom ($299)"` discrepancies.
