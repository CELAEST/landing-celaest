import guidesJson from "@/content/guides.json";
import type { FAQItem } from "./structured-data";

export interface GuideSection {
  id: string;
  number: string;
  title: string;
  summary: string;
  paragraphs: string[];
  points?: string[];
}

export interface GuideLocalizedContent {
  category: string;
  title: string;
  titleHighlight: string;
  seoTitle: string;
  description: string;
  keywords: string[];
  sections: GuideSection[];
  faqs: FAQItem[];
  socialHooks: {
    hook: string;
    takeaways: string[];
    cta: string;
  };
}

export interface GuideRecord {
  slug: string;
  publishedAt: string;
  readMinutes: number;
  targetSolution: "ai-mesh" | "lingua" | "automation";
  es: GuideLocalizedContent;
  en: GuideLocalizedContent;
}

const GUIDES = guidesJson as GuideRecord[];

export function getAllGuides(): GuideRecord[] {
  return GUIDES;
}

export function getAllGuideSlugs(): string[] {
  return GUIDES.map((g) => g.slug);
}

export function getGuideBySlug(slug: string): GuideRecord | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function getLocalizedGuideContent(
  guide: GuideRecord,
  locale: string,
): GuideLocalizedContent {
  return locale === "en" ? guide.en : guide.es;
}
