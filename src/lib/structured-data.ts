/**
 * JSON-LD Structured Data for CELAEST.
 * Generates Organization + WebSite + FAQPage schemas for rich Google results.
 */

import { SITE_URL, SUPPORT_EMAIL } from "./constants";

interface FAQItem {
  question: string;
  answer: string;
}

export function generateOrganizationSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CELAEST",
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    sameAs: [
      "https://twitter.com/celaest",
      "https://linkedin.com/company/celaest",
      "https://github.com/celaest",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: SUPPORT_EMAIL,
      contactType: "customer support",
    },
  };
}

export function generateWebSiteSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CELAEST",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateFAQSchema(faqs: FAQItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
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

export function generateSoftwareSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CELAEST Platform",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "0",
      highPrice: "99",
      offerCount: "3",
    },
  };
}
