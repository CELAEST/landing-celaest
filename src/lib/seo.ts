import type { Metadata } from "next";
import { SITE_URL } from "./constants";

export const SEO_KEYWORDS: Record<string, string[]> = {
  es: [
    "CELAEST",
    "celaest",
    "catálogo de automatizaciones",
    "catálogo de automatizaciones con IA",
    "tienda de automatizaciones",
    "automatizaciones",
    "automatizaciones con IA",
    "automatizaciones empresariales",
    "gestión de IA",
    "gestión de inteligencia artificial",
    "gestión de proyectos de software",
    "proyectos de software con IA",
    "compañía de software e inteligencia artificial",
    "sistemas de inteligencia artificial",
    "automatización empresarial con IA",
    "Malla IA",
    "AI Mesh",
    "CELAEST Lingua",
    "marketplace de activos digitales",
    "scripts de Python verificados",
    "macros de Excel empresariales",
    "agentes de IA para empresas",
    "orquestación de modelos LLM",
    "automatización de flujos de trabajo",
    "software SaaS B2B",
    "inglés profesional con IA",
    "inteligencia artificial Colombia",
    "workflows de automatización",
    "comprar automatizaciones para empresas",
    "automatización de procesos con IA en Colombia",
    "plantillas y flujos de trabajo con IA",
  ],
  en: [
    "CELAEST",
    "celaest",
    "AI automation catalog",
    "AI automation store",
    "enterprise automations",
    "AI management platform",
    "software project management with AI",
    "AI software development and governance",
    "AI systems for business",
    "enterprise AI automation",
    "AI Mesh orchestration",
    "CELAEST Lingua",
    "digital asset marketplace",
    "verified Python automation scripts",
    "enterprise Excel macros",
    "custom LLM agents",
    "workflow automation platform",
    "B2B SaaS AI platform",
    "AI professional English learning",
    "zero-training enterprise AI",
    "AI workflow catalog",
  ],
};

interface PageMetadataOptions {
  locale: string;
  /** Route path starting with `/` (e.g. `"/faq"`, `"/legal/terms"`) or `""` for homepage */
  path?: string;
  title: string;
  description: string;
  keywords?: string[];
  useAbsoluteTitle?: boolean;
}

/**
 * Generates complete SEO, OpenGraph, Twitter, Canonical, Hreflang, and Googlebot
 * metadata for any localized page, preventing duplicate canonicals across subpages.
 */
export function buildPageMetadata({
  locale,
  path = "",
  title,
  description,
  keywords,
  useAbsoluteTitle = false,
}: PageMetadataOptions): Metadata {
  const normalizedPath = path === "/" ? "" : path;
  const canonicalUrl = `${SITE_URL}/${locale}${normalizedPath}`;
  const defaultKeywords = SEO_KEYWORDS[locale] ?? SEO_KEYWORDS.es;

  const cleanRawTitle = title
    .replace(/(\s*\|\s*CELAEST(?:\s+Lingua)?)+$/i, "")
    .replace(/\s*\|\s*Guía$/i, "")
    .trim();
  const maxBaseLen = useAbsoluteTitle ? 65 : 54;
  const boundedTitle =
    cleanRawTitle.length <= maxBaseLen
      ? cleanRawTitle
      : cleanRawTitle
          .slice(0, maxBaseLen)
          .replace(/\s+\S*$/, "")
          .replace(/[|,:;—–-]\s*$/, "")
          .trim();

  const boundedDescription =
    description.length <= 152
      ? description
      : `${description
          .slice(0, 148)
          .replace(/\s+\S*$/, "")
          .replace(/[|.,:;—–-]\s*$/, "")
          .trim()}.`;

  return {
    title: useAbsoluteTitle ? { absolute: boundedTitle } : boundedTitle,
    description: boundedDescription,
    keywords: keywords ? [...defaultKeywords, ...keywords] : defaultKeywords,
    authors: [{ name: "CELAEST", url: `${SITE_URL}/${locale}` }],
    creator: "CELAEST",
    publisher: "CELAEST",
    category: "technology",
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        es: `${SITE_URL}/es${normalizedPath}`,
        en: `${SITE_URL}/en${normalizedPath}`,
        "x-default": `${SITE_URL}/es${normalizedPath}`,
      },
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: boundedTitle.includes("CELAEST") ? boundedTitle : `${boundedTitle} | CELAEST`,
      description: boundedDescription,
      url: canonicalUrl,
      siteName: "CELAEST",
      locale: locale === "es" ? "es_CO" : "en_US",
      alternateLocale: locale === "es" ? ["en_US"] : ["es_CO"],
      type: "website",
      images: [
        {
          url: locale === "en" ? "/og-banner-en-v2.png" : "/og-banner-v2.png",
          width: 1200,
          height: 630,
          type: "image/png",
          alt: "CELAEST - AI Systems & Enterprise Automation Platform",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: boundedTitle.includes("CELAEST") ? boundedTitle : `${boundedTitle} | CELAEST`,
      description: boundedDescription,
      images: [locale === "en" ? "/og-banner-en-v2.png" : "/og-banner-v2.png"],
    },
  };
}
