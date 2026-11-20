/**
 * JSON-LD Structured Data for CELAEST (SEO + AEO + GEO Entity Graph).
 * Generates Organization, WebSite, SoftwareApplication, FAQPage, and BreadcrumbList
 * schemas for Google Knowledge Graph, Rich Snippets, and AI Answer Engines.
 */

import { SITE_URL, SUPPORT_EMAIL, PRESS_EMAIL, PARTNERS_EMAIL } from "./constants";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateOrganizationSchema(locale: string = "es"): Record<string, unknown> {
  const isEs = locale === "es";

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "CELAEST",
    legalName: "CELAEST",
    alternateName: [
      "celaest",
      "Celaest",
      "CELAEST Systems",
      "CELAEST Software",
      "CELAEST AI",
      "CELAEST Platform",
      "CELAEST Marketplace",
      "CELAEST Lingua",
      "CELAEST Malla IA",
    ],
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/icon-512-v2.png`,
      width: 512,
      height: 512,
    },
    image: `${SITE_URL}/og-banner-v2.png`,
    disambiguatingDescription: isEs
      ? "CELAEST (celaest.com) es una compañía de software e inteligencia artificial fundada en Colombia con alcance global, especializada en catálogo de automatizaciones con IA, gestión de IA empresarial (Malla IA / AI Mesh), gestión y desarrollo de proyectos de software B2B y aprendizaje ejecutivo con IA (CELAEST Lingua). No confundir con la expresión francesa «cela est»."
      : "CELAEST (celaest.com) is an enterprise software and artificial intelligence company founded in Colombia with global reach, specializing in an AI automation catalog, enterprise AI management (AI Mesh), B2B software project management and development, and executive AI learning (CELAEST Lingua).",
    description: isEs
      ? "Compañía de software e inteligencia artificial: diseñamos, implementamos y escalamos sistemas de IA, catálogo de automatizaciones verificadas, gestión de IA privada (Malla IA), proyectos de software empresarial y aplicaciones SaaS (CELAEST Lingua)."
      : "Enterprise software and AI company: we design, implement, and scale artificial intelligence systems, verified automation catalogs, private AI management (AI Mesh), software projects, and SaaS applications (CELAEST Lingua).",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Medellín",
      addressRegion: "Antioquia",
      addressCountry: "CO",
    },
    sameAs: [
      "https://github.com/celaest",
      "https://www.linkedin.com/in/celaest/",
      "https://www.youtube.com/@celaest",
    ],
    knowsAbout: [
      "AI Automation Catalog (Catálogo de Automatizaciones con IA)",
      "Enterprise AI Management (Gestión de IA Empresarial)",
      "Software Project Management & B2B SaaS Engineering (Gestión de Proyectos de Software)",
      "Artificial Intelligence Systems",
      "Enterprise Workflow Automation",
      "Large Language Model Orchestration (AI Mesh)",
      "AI-Assisted Professional English Learning (CELAEST Lingua)",
      "Python Automation Scripts",
      "Enterprise Excel Macros",
      "Zero-Training Enterprise AI Security",
      "B2B Digital Asset Marketplace",
    ],
    areaServed: "Worldwide",
    availableLanguage: ["Spanish", "English"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: SUPPORT_EMAIL,
        contactType: "customer support",
        availableLanguage: ["Spanish", "English"],
      },
      {
        "@type": "ContactPoint",
        email: PARTNERS_EMAIL,
        contactType: "sales",
        availableLanguage: ["Spanish", "English"],
      },
      {
        "@type": "ContactPoint",
        email: PRESS_EMAIL,
        contactType: "public relations",
        availableLanguage: ["Spanish", "English"],
      },
    ],
  };
}

export function generateWebSiteSchema(locale: string = "es"): Record<string, unknown> {
  const isEs = locale === "es";

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "CELAEST",
    alternateName: isEs
      ? "CELAEST - Sistemas de IA para Todos y Activos Digitales"
      : "CELAEST - AI Systems for Everyone & Digital Asset Marketplace",
    url: `${SITE_URL}/${locale}`,
    inLanguage: isEs ? "es-CO" : "en-US",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

export function generateFAQSchema(faqs: FAQItem[], locale: string = "es"): Record<string, unknown> {
  const isEs = locale === "es";

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/${locale}/faq#faqpage`,
    inLanguage: isEs ? "es-CO" : "en-US",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", "article p"],
    },
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateSoftwareSchema(locale: string = "es"): Record<string, unknown> {
  const isEs = locale === "es";

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/#software`,
    name: "CELAEST Platform",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "AI Orchestration, Enterprise Automation & SaaS Ecosystem",
    operatingSystem: "Web, Windows, macOS, Linux, iOS, Android",
    inLanguage: ["es", "en"],
    url: `${SITE_URL}/${locale}`,
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    description: isEs
      ? "Ecosistema de aplicaciones SaaS empresariales encabezadas por CELAEST Lingua y el panel de orquestación Malla IA, con acceso progresivo a herramientas de automatización verificadas."
      : "Enterprise SaaS ecosystem led by CELAEST Lingua and the AI Mesh orchestration dashboard, with progressive access to verified automation tools.",
    featureList: isEs
      ? [
          "CELAEST Lingua: Adquisición de inglés profesional asistido por IA",
          "Malla IA (AI Mesh): Orquestación multi-modelo con garantía de Cero-Entrenamiento",
          "Gestión centralizada de licencias, equipos y auditoría",
          "Cifrado End-to-End AES-256 y TLS 1.3 con aislamiento multi-tenant",
          "Catálogo en expansión de automatizaciones, conectores API, scripts Python y macros Excel",
        ]
      : [
          "CELAEST Lingua: AI-assisted professional English acquisition",
          "AI Mesh: Multi-model LLM orchestration with Zero-Training guarantee",
          "Centralized license, team, and audit log management",
          "End-to-End AES-256 and TLS 1.3 encryption with multi-tenant isolation",
          "Expanding catalog of verified automations, API connectors, Python scripts, and Excel macros",
        ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "128",
      bestRating: "5",
      worstRating: "1",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "0",
      highPrice: "99",
      offerCount: "3",
      offers: [
        {
          "@type": "Offer",
          name: isEs ? "Starter (Comunitario)" : "Starter Plan",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/${locale}#pricing`,
          description: isEs
            ? "Plan gratuito para siempre con 100 solicitudes de IA/mes, 1 modelo de IA, 2 miembros, 1 GB NVMe y acceso inicial al catálogo (hasta 3 soluciones)."
            : "Free forever plan with 100 AI requests/month, 1 AI model, 2 team members, 1 GB NVMe storage, and initial catalog access (up to 3 solutions).",
        },
        {
          "@type": "Offer",
          name: isEs ? "Plan Pro (Más Popular)" : "Pro Plan",
          price: "29",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/${locale}#pricing`,
          description: isEs
            ? "Acceso a CELAEST Lingua y catálogo activo (hasta 10 soluciones), 500,000 solicitudes/mes en Malla IA (5 modelos), 15 miembros, 25 GB NVMe y soporte prioritario."
            : "Access to CELAEST Lingua and active catalog (up to 10 solutions), 500,000 AI Mesh requests/month (5 models), 15 team members, 25 GB NVMe, and priority support.",
        },
        {
          "@type": "Offer",
          name: isEs ? "Plan Enterprise" : "Enterprise Plan",
          price: "99",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/${locale}#pricing`,
          description: isEs
            ? "Catálogo completo y futuros lanzamientos ilimitados, 1,000,000 de solicitudes/mes, modelos y miembros ilimitados, 200 GB NVMe, auditoría 365 días, garantía SLA y soporte dedicado."
            : "Unlimited current and future catalog releases, 1,000,000 AI Mesh requests/month, unlimited models and seats, 200 GB NVMe, 365-day audit logs, SLA guarantee, and dedicated support.",
        },
      ],
    },
  };
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateSolutionSchema({
  locale,
  slug,
  name,
  description,
  featureList,
}: {
  locale: string;
  slug: string;
  name: string;
  description: string;
  featureList: string[];
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/${locale}/solutions/${slug}#software`,
    name,
    description,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, Windows, macOS, Linux, iOS, Android",
    inLanguage: locale === "es" ? "es-CO" : "en-US",
    url: `${SITE_URL}/${locale}/solutions/${slug}`,
    featureList,
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "0",
      highPrice: "99",
      offerCount: "3",
      url: `${SITE_URL}/${locale}#pricing`,
    },
  };
}

export function generateTechArticleSchema({
  locale,
  slug,
  headline,
  description,
  datePublished,
}: {
  locale: string;
  slug: string;
  headline: string;
  description: string;
  datePublished: string;
}): Record<string, unknown> {
  const url = `${SITE_URL}/${locale}/guides/${slug}`;
  const banner =
    locale === "en" ? `${SITE_URL}/og-banner-en-v2.png` : `${SITE_URL}/og-banner-v2.png`;

  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${url}#article`,
    headline,
    description,
    datePublished,
    dateModified: datePublished,
    inLanguage: locale === "es" ? "es-CO" : "en-US",
    image: banner,
    url,
    mainEntityOfPage: url,
    author: {
      "@id": `${SITE_URL}/#organization`,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", ".legal-section-lead"],
    },
  };
}

export function generateAutomationCatalogSchema(locale: string = "es"): Record<string, unknown> {
  const isEs = locale === "es";

  const items = isEs
    ? [
        {
          name: "Comercial, Ventas y Atención al Cliente",
          description:
            "Bots de WhatsApp y Telegram con IA, calificación automática de leads y sincronización CRM con Slack. Ahorro estimado: 12–18 horas/semana.",
          url: `${SITE_URL}/es/solutions/automation`,
        },
        {
          name: "Finanzas, Contabilidad y Administración",
          description:
            "Macros de Excel VBA verificadas, conciliación bancaria automática y reportes financieros gerenciales. Ahorro estimado: 10–20 horas/semana.",
          url: `${SITE_URL}/es/solutions/automation`,
        },
        {
          name: "Operaciones, Datos e Ingeniería (Workflows & ETL)",
          description:
            "Scripts de Python verificados, web scraping estructurado, pipelines ETL y conectores API para Google Sheets, GitHub y Webhooks. Ahorro estimado: 15–25 horas/semana.",
          url: `${SITE_URL}/es/solutions/automation`,
        },
        {
          name: "Talento Bilingüe y Capacitación Corporativa (CELAEST Lingua)",
          description:
            "Adquisición de inglés técnico y ejecutivo con IA, transcripción fonética IPA instantánea y simulador de entrevistas laborales 24/7.",
          url: `${SITE_URL}/es/solutions/lingua`,
        },
        {
          name: "Dirección, TI y Ciberseguridad (Malla IA / AI Mesh)",
          description:
            "Orquestación de OpenAI, Anthropic y Google Vertex con failover automático, Cero-Entrenamiento vinculante, BYOK y despliegue On-Premise.",
          url: `${SITE_URL}/es/solutions/ai-mesh`,
        },
      ]
    : [
        {
          name: "Commercial, Sales & Customer Support",
          description:
            "AI WhatsApp and Telegram bots, automated lead qualification, and CRM/Slack synchronization. Estimated savings: 12–18 hours/week.",
          url: `${SITE_URL}/en/solutions/automation`,
        },
        {
          name: "Finance, Accounting & Administration",
          description:
            "Verified Excel VBA macros, automated ledger reconciliation, and executive financial reporting. Estimated savings: 10–20 hours/week.",
          url: `${SITE_URL}/en/solutions/automation`,
        },
        {
          name: "Operations, Data & Engineering (Workflows & ETL)",
          description:
            "Verified Python scripts, structured data extraction, ETL pipelines, and API connectors for Google Sheets, GitHub, and webhooks. Estimated savings: 15–25 hours/week.",
          url: `${SITE_URL}/en/solutions/automation`,
        },
        {
          name: "Bilingual Talent & Corporate Training (CELAEST Lingua)",
          description:
            "AI-assisted technical and executive English acquisition, instant IPA phonetics, and 24/7 role-specific interview coaching.",
          url: `${SITE_URL}/en/solutions/lingua`,
        },
        {
          name: "Executive, IT & Cybersecurity (AI Mesh)",
          description:
            "Multi-model orchestration across OpenAI, Anthropic, and Google Vertex with automatic failover, binding Zero-Training, BYOK, and On-Premise tiers.",
          url: `${SITE_URL}/en/solutions/ai-mesh`,
        },
      ];

  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "@id": `${SITE_URL}/${locale}/solutions#catalog`,
    name: isEs
      ? "Catálogo y Tienda de Automatizaciones con IA, Workflows y Soluciones SaaS — CELAEST"
      : "CELAEST AI Automation Catalog, Workflows & Enterprise SaaS Store",
    url: `${SITE_URL}/${locale}/solutions`,
    inLanguage: isEs ? "es-CO" : "en-US",
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
    numberOfItems: items.length,
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Service",
        name: item.name,
        description: item.description,
        url: item.url,
        provider: {
          "@id": `${SITE_URL}/#organization`,
        },
      },
    })),
  };
}

export interface VideoObjectInput {
  locale: string;
  pagePath: string;
  videoId: string;
  name: string;
  description: string;
  uploadDate: string;
  durationIso: string;
}

/**
 * Generates Schema.org VideoObject metadata for official product demonstrations.
 */
export function generateVideoObjectSchema(input: VideoObjectInput): Record<string, unknown> {
  const { locale, pagePath, videoId, name, description, uploadDate, durationIso } = input;
  const normalizedPath = pagePath.startsWith("/") ? pagePath : `/${pagePath}`;
  const pageUrl = `${SITE_URL}/${locale}${normalizedPath}`;

  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${pageUrl}#video-${videoId}`,
    name,
    description,
    thumbnailUrl: [
      `${SITE_URL}/images/lingua-video-thumbnail.webp`,
      `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
      `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    ],
    uploadDate,
    duration: durationIso,
    contentUrl: `https://www.youtube.com/watch?v=${videoId}`,
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
    inLanguage: locale === "es" ? "es-CO" : "en-US",
    isFamilyFriendly: true,
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

/**
 * Generates Schema.org SiteNavigationElement ItemList so Google Search and AI
 * crawlers discover the primary site hierarchy for organic Sitelinks.
 */
export function generateSiteNavigationSchema(locale: string = "es"): Record<string, unknown> {
  const isEs = locale === "es";
  const items = isEs
    ? [
        {
          name: "Catálogo de Automatizaciones",
          description:
            "Catálogo y tienda de automatizaciones con IA, scripts de Python, macros de Excel VBA y workflows empresariales.",
          url: `${SITE_URL}/es/solutions/automation`,
        },
        {
          name: "Gestión de IA · Malla IA",
          description:
            "Orquestación multi-modelo de IA empresarial con garantía de Cero-Entrenamiento, BYOK y despliegue On-Premise.",
          url: `${SITE_URL}/es/solutions/ai-mesh`,
        },
        {
          name: "CELAEST Lingua · Inglés con IA",
          description:
            "Plataforma de inglés profesional y técnico con IA, fonética IPA instantánea y simulador de entrevistas 24/7.",
          url: `${SITE_URL}/es/solutions/lingua`,
        },
        {
          name: "Soluciones y Proyectos de Software",
          description:
            "Ecosistema de software empresarial, gestión de proyectos de software B2B y activos digitales verificados.",
          url: `${SITE_URL}/es/solutions`,
        },
        {
          name: "Guías Técnicas y Playbooks",
          description:
            "Guías prácticas de automatización con IA, arquitectura Zero-Training, Python ETL e inglés técnico.",
          url: `${SITE_URL}/es/guides`,
        },
        {
          name: "Preguntas Frecuentes",
          description:
            "Respuestas oficiales sobre planes, licencias corporativas, privacidad Zero-Training y soporte técnico.",
          url: `${SITE_URL}/es/faq`,
        },
      ]
    : [
        {
          name: "AI Automation Catalog",
          description:
            "Verified AI automation store, Python ETL scripts, Excel VBA macros, and enterprise workflows.",
          url: `${SITE_URL}/en/solutions/automation`,
        },
        {
          name: "Enterprise AI Mesh",
          description:
            "Multi-model LLM orchestration with binding Zero-Training guarantees, BYOK, and On-Premise deployment.",
          url: `${SITE_URL}/en/solutions/ai-mesh`,
        },
        {
          name: "CELAEST Lingua · AI English",
          description:
            "AI-powered professional and technical English platform with instant IPA phonetics and 24/7 interview simulator.",
          url: `${SITE_URL}/en/solutions/lingua`,
        },
        {
          name: "Software Projects & Solutions",
          description:
            "Enterprise B2B software ecosystem, software project governance, and verified digital assets.",
          url: `${SITE_URL}/en/solutions`,
        },
        {
          name: "Technical Playbooks & Guides",
          description:
            "Actionable playbooks on AI workflow automation, Zero-Training governance, and technical English.",
          url: `${SITE_URL}/en/guides`,
        },
        {
          name: "Frequently Asked Questions",
          description:
            "Official answers on pricing plans, corporate licensing, Zero-Training privacy, and enterprise SLA.",
          url: `${SITE_URL}/en/faq`,
        },
      ];

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/${locale}#navigation`,
    name: isEs ? "Navegación Principal de CELAEST" : "CELAEST Primary Navigation",
    itemListElement: items.map((item, idx) => ({
      "@type": "SiteNavigationElement",
      position: idx + 1,
      name: item.name,
      description: item.description,
      url: item.url,
    })),
  };
}
