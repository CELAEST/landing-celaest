import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { buildPageMetadata } from "@/lib/seo";
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateSoftwareSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateSolutionSchema,
  generateTechArticleSchema,
  generateAutomationCatalogSchema,
  generateSiteNavigationSchema,
  generateVideoObjectSchema,
} from "@/lib/structured-data";
import { buildGuidesRssFeed } from "@/lib/rss";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";

describe("SEO, AEO & GEO Enterprise Suite", () => {
  describe("Technical SEO: buildPageMetadata & Subpage Canonicals", () => {
    it("generates isolated canonical and hreflang alternates for /faq in Spanish and English", () => {
      const esMeta = buildPageMetadata({
        locale: "es",
        path: "/faq",
        title: "Preguntas Frecuentes",
        description: "Respuestas oficiales sobre CELAEST.",
      });
      const enMeta = buildPageMetadata({
        locale: "en",
        path: "/faq",
        title: "Frequently Asked Questions",
        description: "Official answers about CELAEST.",
      });

      expect(esMeta.alternates?.canonical).toBe("https://celaest.com/es/faq");
      expect(enMeta.alternates?.canonical).toBe("https://celaest.com/en/faq");
      expect(esMeta.alternates?.languages).toEqual({
        es: "https://celaest.com/es/faq",
        en: "https://celaest.com/en/faq",
        "x-default": "https://celaest.com/es/faq",
      });
      expect(esMeta.title).toBe("Preguntas Frecuentes");
    });

    it("generates isolated canonicals for legal routes", () => {
      const termsMeta = buildPageMetadata({
        locale: "es",
        path: "/legal/terms",
        title: "Términos de Servicio",
        description: "Contrato marco B2B.",
      });

      expect(termsMeta.alternates?.canonical).toBe("https://celaest.com/es/legal/terms");
      expect(termsMeta.alternates?.languages).toEqual({
        es: "https://celaest.com/es/legal/terms",
        en: "https://celaest.com/en/legal/terms",
        "x-default": "https://celaest.com/es/legal/terms",
      });
    });

    it("exports complete sitemap with localized pages and GEO llms.txt endpoints", () => {
      const entries = sitemap();
      const urls = entries.map((e) => e.url);

      expect(urls).toContain("https://celaest.com/es");
      expect(urls).toContain("https://celaest.com/en");
      expect(urls).toContain("https://celaest.com/es/solutions");
      expect(urls).toContain("https://celaest.com/en/solutions");
      expect(urls).toContain("https://celaest.com/es/solutions/lingua");
      expect(urls).toContain("https://celaest.com/en/solutions/lingua");
      expect(urls).toContain("https://celaest.com/es/solutions/ai-mesh");
      expect(urls).toContain("https://celaest.com/en/solutions/ai-mesh");
      expect(urls).toContain("https://celaest.com/es/solutions/automation");
      expect(urls).toContain("https://celaest.com/en/solutions/automation");
      expect(urls).toContain("https://celaest.com/es/guides");
      expect(urls).toContain("https://celaest.com/en/guides");
      expect(urls).toContain(
        "https://celaest.com/es/guides/catalogo-tienda-automatizaciones-ia-workflows",
      );
      expect(urls).toContain(
        "https://celaest.com/en/guides/catalogo-tienda-automatizaciones-ia-workflows",
      );
      expect(urls).toContain("https://celaest.com/es/guides/ia-privada-zero-training-empresas");
      expect(urls).toContain("https://celaest.com/en/guides/ingles-tecnico-entrevistas-ia");
      expect(urls).toContain("https://celaest.com/es/faq");
      expect(urls).toHaveLength(34);
      expect(urls).toContain("https://celaest.com/en/faq");
      expect(urls).toContain("https://celaest.com/llms.txt");
      expect(urls).toContain("https://celaest.com/llms-full.txt");

      const homeEs = entries.find((e) => e.url === "https://celaest.com/es");
      expect(homeEs?.alternates?.languages?.["x-default"]).toBe("https://celaest.com/es");
    });

    it("guarantees unique bounded SEO titles <= 65 visual chars across all localized hub, solution, and guide pages", () => {
      const guides = JSON.parse(
        fs.readFileSync(path.resolve(process.cwd(), "src/content/guides.json"), "utf-8"),
      ) as Array<{
        slug: string;
        es: { seoTitle: string; description: string };
        en: { seoTitle: string; description: string };
      }>;

      for (const locale of ["es", "en"] as const) {
        const isEn = locale === "en";
        const messages = JSON.parse(
          fs.readFileSync(path.resolve(process.cwd(), `src/i18n/messages/${locale}.json`), "utf-8"),
        ) as {
          faq: { title1: string; title2: string; subtitle: string };
          solutions: {
            guides: { seoTitle: string; seoDescription: string };
            hub: { seoTitle: string; seoDescription: string };
            items: Record<string, { seoTitle: string; seoDescription: string }>;
          };
        };

        const metas = [
          buildPageMetadata({
            locale,
            path: "",
            title: isEn
              ? "CELAEST — AI Automation Catalog, AI Management & Software"
              : "CELAEST — Catálogo de Automatizaciones, Gestión de IA y Software",
            description: isEn
              ? "CELAEST: enterprise software and AI company with a verified automation catalog, private AI Mesh management, software projects, and CELAEST Lingua."
              : "CELAEST: compañía de software e IA con catálogo de automatizaciones empresariales, gestión de IA privada (Malla IA), proyectos de software y Lingua.",
            useAbsoluteTitle: true,
          }),
          buildPageMetadata({
            locale,
            path: "/solutions",
            title: messages.solutions.hub.seoTitle,
            description: messages.solutions.hub.seoDescription,
          }),
          ...Object.entries(messages.solutions.items).map(([slug, item]) =>
            buildPageMetadata({
              locale,
              path: `/solutions/${slug}`,
              title: item.seoTitle,
              description: item.seoDescription,
            }),
          ),
          buildPageMetadata({
            locale,
            path: "/guides",
            title: messages.solutions.guides.seoTitle,
            description: messages.solutions.guides.seoDescription,
          }),
          buildPageMetadata({
            locale,
            path: "/faq",
            title: `${messages.faq.title1} ${messages.faq.title2}`,
            description: messages.faq.subtitle,
          }),
          ...guides.map((guide) =>
            buildPageMetadata({
              locale,
              path: `/guides/${guide.slug}`,
              title: guide[locale].seoTitle,
              description: guide[locale].description,
            }),
          ),
        ];

        const titles = metas.map((meta) => {
          const raw =
            typeof meta.title === "string"
              ? meta.title
              : meta.title && typeof meta.title === "object" && "absolute" in meta.title
                ? meta.title.absolute
                : "";
          return raw;
        });

        for (const t of titles) {
          expect(t.length).toBeGreaterThan(0);
          expect(t.length).toBeLessThanOrEqual(65);
        }
        expect(new Set(titles).size).toBe(titles.length);
      }
    });
  });

  describe("AEO: JSON-LD Knowledge Graph & Answer Schemas", () => {
    it("generates localized Organization schema with @id and knowsAbout entities", () => {
      const orgEs = generateOrganizationSchema("es");
      const orgEn = generateOrganizationSchema("en");

      expect(orgEs["@id"]).toBe("https://celaest.com/#organization");
      expect(orgEs.alternateName).toContain("celaest");
      expect(String(orgEs.disambiguatingDescription)).toContain(
        "compañía de software e inteligencia artificial",
      );
      expect(orgEs.knowsAbout).toContain("Large Language Model Orchestration (AI Mesh)");
      expect(orgEs.knowsAbout).toContain(
        "AI Automation Catalog (Catálogo de Automatizaciones con IA)",
      );
      expect(orgEs.knowsAbout).toContain("Enterprise AI Management (Gestión de IA Empresarial)");
      expect(String(orgEs.description)).toContain("CELAEST Lingua");
      expect(String(orgEn.description)).toContain("CELAEST Lingua");
      expect(orgEs.sameAs).toContain("https://www.youtube.com/@celaest");
    });

    it("generates WebSite schema without broken /search action and linked to #organization", () => {
      const site = generateWebSiteSchema("es");
      expect(site["@id"]).toBe("https://celaest.com/#website");
      expect(site.potentialAction).toBeUndefined();
      expect(site.publisher).toEqual({
        "@id": "https://celaest.com/#organization",
      });
    });

    it("generates SoftwareApplication schema with 3 explicit pricing offers", () => {
      const software = generateSoftwareSchema("es") as Record<string, unknown>;
      const offers = software.offers as {
        lowPrice: string;
        highPrice: string;
        offers: Array<{ name: string; price: string }>;
        offerCount: string;
      };
      expect(software["@id"]).toBe("https://celaest.com/#software");
      expect(offers.offerCount).toBe("3");
      expect(offers.lowPrice).toBe("0");
      expect(offers.highPrice).toBe("99");
      expect(offers.offers).toHaveLength(3);
      expect(offers.offers.map((o) => o.price)).toEqual(["0", "29", "99"]);
    });

    it("generates FAQPage schema with SpeakableSpecification for voice/answer engines", () => {
      const faqSchema = generateFAQSchema(
        [
          {
            question: "¿Qué es CELAEST?",
            answer: "Un ecosistema de sistemas de IA y automatización.",
          },
        ],
        "es",
      );

      expect(faqSchema["@type"]).toBe("FAQPage");
      expect(faqSchema.speakable).toBeDefined();
      expect((faqSchema.mainEntity as unknown[]).length).toBe(1);
    });

    it("generates BreadcrumbList schema with sequential positions", () => {
      const bc = generateBreadcrumbSchema([
        { name: "Inicio", url: "https://celaest.com/es" },
        { name: "Preguntas Frecuentes", url: "https://celaest.com/es/faq" },
      ]);
      const items = bc.itemListElement as Array<{ position: number; name: string }>;
      expect(items[0].position).toBe(1);
      expect(items[1].position).toBe(2);
    });

    it("generates Solution SoftwareApplication schema linked to #organization", () => {
      const schema = generateSolutionSchema({
        locale: "es",
        slug: "lingua",
        name: "CELAEST Lingua",
        description: "Inglés profesional con IA",
        featureList: ["Fonética IPA", "Simulador de entrevistas"],
      });
      expect(schema["@id"]).toBe("https://celaest.com/es/solutions/lingua#software");
      expect(schema.provider).toEqual({ "@id": "https://celaest.com/#organization" });
    });

    it("generates TechArticle schema and valid bilingual RSS 2.0 feeds", () => {
      const article = generateTechArticleSchema({
        locale: "es",
        slug: "ia-privada-zero-training-empresas",
        headline: "IA Privada Zero-Training",
        description: "Guía empresarial.",
        datePublished: "2026-11-16",
      });
      expect(article["@type"]).toBe("TechArticle");
      expect(article.author).toEqual({ "@id": "https://celaest.com/#organization" });

      const rssEs = buildGuidesRssFeed("es");
      const rssEn = buildGuidesRssFeed("en");
      expect(rssEs).toContain('<rss version="2.0"');
      expect(rssEs).toContain(
        "https://celaest.com/es/guides/catalogo-tienda-automatizaciones-ia-workflows",
      );
      expect(rssEs).toContain("https://celaest.com/es/guides/ia-privada-zero-training-empresas");
      expect(rssEn).toContain("https://celaest.com/en/guides/ingles-tecnico-entrevistas-ia");
    });

    it("generates OfferCatalog schema with 5 departmental automation verticals", () => {
      const catEs = generateAutomationCatalogSchema("es");
      const catEn = generateAutomationCatalogSchema("en");

      expect(catEs["@type"]).toBe("OfferCatalog");
      expect(catEs["@id"]).toBe("https://celaest.com/es/solutions#catalog");
      expect(catEs.numberOfItems).toBe(5);
      expect((catEs.itemListElement as unknown[]).length).toBe(5);
      expect(String(catEn.name)).toContain("Automation Catalog");
    });

    it("generates VideoObject schema for CELAEST Lingua official YouTube video", () => {
      const video = generateVideoObjectSchema({
        locale: "es",
        pagePath: "/solutions/lingua",
        videoId: "P6eigqaFWB0",
        name: "CELAEST Lingua en acción",
        description: "Demo oficial de CELAEST Lingua.",
        uploadDate: "2026-11-18T11:52:50-08:00",
        durationIso: "PT1M3S",
      });

      expect(video["@type"]).toBe("VideoObject");
      expect(video["@id"]).toBe("https://celaest.com/es/solutions/lingua#video-P6eigqaFWB0");
      expect(video.contentUrl).toBe("https://www.youtube.com/watch?v=P6eigqaFWB0");
      expect(video.embedUrl).toBe("https://www.youtube.com/embed/P6eigqaFWB0");
      expect(video.duration).toBe("PT1M3S");
      expect(video.publisher).toEqual({ "@id": "https://celaest.com/#organization" });
    });

    it("generates SiteNavigationElement ItemList schema for Google Sitelinks", () => {
      const navEs = generateSiteNavigationSchema("es");
      const navEn = generateSiteNavigationSchema("en");
      const items = navEs.itemListElement as Array<{ "@type": string; name: string; url: string }>;

      expect(navEs["@type"]).toBe("ItemList");
      expect(navEs["@id"]).toBe("https://celaest.com/es#navigation");
      expect(items).toHaveLength(6);
      expect(items[0]["@type"]).toBe("SiteNavigationElement");
      expect(items[0].name).toBe("Catálogo de Automatizaciones");
      expect(items[0].url).toBe("https://celaest.com/es/solutions/automation");
      expect((navEn.itemListElement as unknown[]).length).toBe(6);
    });
  });

  describe("GEO: Generative Engine Optimization (llms.txt, llms-full.txt & AI Crawlers)", () => {
    it("explicitly allows AI Search Agents in robots.ts", () => {
      const config = robots();
      const rules = Array.isArray(config.rules) ? config.rules : [config.rules];
      const agents = rules.map((r) => r.userAgent);

      expect(agents).toContain("OAI-SearchBot");
      expect(agents).toContain("GPTBot");
      expect(agents).toContain("PerplexityBot");
      expect(agents).toContain("ClaudeBot");
      expect(agents).toContain("Google-Extended");
      expect(agents).toContain("Google-Favicon");
      expect(agents).toContain("Googlebot-Image");

      // CRITICAL: Next.js /_next/ must NEVER be disallowed so Googlebot WRS can render CSS/JS
      for (const rule of rules) {
        const disallowed = Array.isArray(rule.disallow) ? rule.disallow : [rule.disallow];
        expect(disallowed).not.toContain("/_next/");
      }
    });

    it("provides opaque v2 favicons to bypass stale Google-Favicon transparent cache", () => {
      const iconFiles = [
        "public/favicon-v2.ico",
        "public/icon-48-v2.png",
        "public/icon-192-v2.png",
        "public/icon-512-v2.png",
        "public/apple-icon-v2.png",
        "public/icon-v2.svg",
      ];
      for (const relPath of iconFiles) {
        const abs = path.resolve(process.cwd(), relPath);
        expect(fs.existsSync(abs)).toBe(true);
        expect(fs.statSync(abs).size).toBeGreaterThan(200);
      }
    });

    it("provides valid public/llms.txt and public/llms-full.txt with core CELAEST entities", () => {
      const llmsPath = path.resolve(process.cwd(), "public/llms.txt");
      const llmsFullPath = path.resolve(process.cwd(), "public/llms-full.txt");
      const manifestPath = path.resolve(process.cwd(), "public/manifest.webmanifest");

      expect(fs.existsSync(llmsPath)).toBe(true);
      expect(fs.existsSync(llmsFullPath)).toBe(true);
      expect(fs.existsSync(manifestPath)).toBe(true);

      const llmsContent = fs.readFileSync(llmsPath, "utf-8");
      const llmsFullContent = fs.readFileSync(llmsFullPath, "utf-8");

      expect(llmsContent).toContain("CELAEST Lingua");
      expect(llmsContent).toContain("Malla IA");
      expect(llmsContent).toContain("https://celaest.com/llms-full.txt");

      expect(llmsFullContent).toContain("Zero-Training");
      expect(llmsFullContent).toContain("Starter ($0 forever)");
      expect(llmsFullContent).toContain("Pro ($29/mo");
      expect(llmsFullContent).toContain("Enterprise ($99/mo");
    });
  });

  describe("Cloudflare Worker Canonical Routing (Single-Hop 301 & Zero Legacy 404)", () => {
    const mockEnv = {
      ASSETS: {
        fetch: async () => new Response("Not Found", { status: 404 }),
      },
    };

    it("redirects http://www.celaest.com/ to https://celaest.com/es in a single 301 hop", async () => {
      const worker = (await import("../worker.js")).default;
      const res = await worker.fetch(new Request("http://www.celaest.com/"), mockEnv);
      expect(res.status).toBe(301);
      expect(res.headers.get("location")).toBe("https://celaest.com/es");
    });

    it("normalizes trailing slashes via 301 instead of 307 temporary redirects", async () => {
      const worker = (await import("../worker.js")).default;
      const res = await worker.fetch(new Request("https://celaest.com/es/faq/"), mockEnv);
      expect(res.status).toBe(301);
      expect(res.headers.get("location")).toBe("https://celaest.com/es/faq");
    });

    it("rescues legacy unprefixed paths (/solutions, /faq, /terms, /guides/*) via 301", async () => {
      const worker = (await import("../worker.js")).default;
      for (const [legacy, target] of [
        ["/solutions", "https://celaest.com/es/solutions"],
        ["/solutions/lingua", "https://celaest.com/es/solutions/lingua"],
        [
          "/guides/ia-privada-zero-training-empresas",
          "https://celaest.com/es/guides/ia-privada-zero-training-empresas",
        ],
        ["/faq", "https://celaest.com/es/faq"],
        ["/terms", "https://celaest.com/es/legal/terms"],
        ["/es/terms", "https://celaest.com/es/legal/terms"],
        ["/en/terms", "https://celaest.com/en/legal/terms"],
        ["/es/privacy", "https://celaest.com/es/legal/privacy"],
        ["/en/products", "https://celaest.com/en/solutions"],
        ["/legal/privacy", "https://celaest.com/es/legal/privacy"],
        ["/year", "https://celaest.com/en"],
        ["/mes", "https://celaest.com/es"],
      ]) {
        const res = await worker.fetch(new Request(`https://celaest.com${legacy}`), mockEnv);
        expect(res.status).toBe(301);
        expect(res.headers.get("location")).toBe(target);
      }
    });

    it("marks real 404 responses with X-Robots-Tag: noindex, nofollow", async () => {
      const worker = (await import("../worker.js")).default;
      const res = await worker.fetch(
        new Request("https://celaest.com/non-existent-route-xyz"),
        mockEnv,
      );
      expect(res.status).toBe(404);
      expect(res.headers.get("x-robots-tag")).toBe("noindex, nofollow");
    });
  });
});
