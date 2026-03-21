import type { Metadata } from "next";

/**
 * JSON-LD Structured Data for CELAEST.
 * Generates Organization + WebSite + FAQPage schemas for rich Google results.
 */

interface FAQItem {
  question: string;
  answer: string;
}

export function generateOrganizationSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CELAEST",
    url: "https://celaest.com",
    logo: "https://celaest.com/icon.svg",
    sameAs: [
      "https://twitter.com/celaest",
      "https://linkedin.com/company/celaest",
      "https://github.com/celaest",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "support@celaest.com",
      contactType: "customer support",
    },
  };
}

export function generateWebSiteSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CELAEST",
    url: "https://celaest.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://celaest.com/search?q={search_term_string}",
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
