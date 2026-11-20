import React from "react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo";
import { getAllGuideSlugs, getGuideBySlug, getLocalizedGuideContent } from "@/lib/guides";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateTechArticleSchema,
} from "@/lib/structured-data";
import { SolutionShell } from "@/components/solutions/solution-shell";
import { SolutionStickyIndex } from "@/components/solutions/solution-sticky-index";
import { SolutionFaqList } from "@/components/solutions/solution-faq-list";
import { LegalSectionView } from "@/components/legal/legal-section-view";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => getAllGuideSlugs().map((slug) => ({ locale, slug })));
}

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

  const content = getLocalizedGuideContent(guide, locale);
  return buildPageMetadata({
    locale,
    path: `/guides/${slug}`,
    title: content.seoTitle,
    description: content.description,
    keywords: content.keywords,
  });
}

export default async function GuideDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  setRequestLocale(locale);

  const tGuides = await getTranslations({ locale, namespace: "solutions.guides" });
  const tNav = await getTranslations({ locale, namespace: "solutions.nav" });
  const tGlobalNav = await getTranslations({ locale, namespace: "nav" });
  const tFaq = await getTranslations({ locale, namespace: "faq" });

  const content = getLocalizedGuideContent(guide, locale);

  const tocSections = [
    ...content.sections.map((s) => ({
      id: s.id,
      number: s.number,
      title: s.title,
    })),
    ...content.faqs.map((faq, idx) => ({
      id: `faq-${String(idx + 1).padStart(2, "0")}`,
      number: `Q${idx + 1}`,
      title: faq.question,
    })),
  ];

  const schemas = [
    generateTechArticleSchema({
      locale,
      slug,
      headline: `${content.title} ${content.titleHighlight}`,
      description: content.description,
      datePublished: guide.publishedAt,
    }),
    generateFAQSchema(content.faqs, locale),
    generateBreadcrumbSchema([
      { name: tGlobalNav("home"), url: `${SITE_URL}/${locale}` },
      { name: tGuides("title1"), url: `${SITE_URL}/${locale}/guides` },
      { name: content.title, url: `${SITE_URL}/${locale}/guides/${slug}` },
    ]),
  ];

  return (
    <SolutionShell backLabel={tGuides("allGuides")} backHref="/guides" schemas={schemas}>
      <header className="sol-editorial-header mb-12">
        <div className="sol-editorial-eyebrow">
          <span className="rule" />
          <span>{content.category}</span>
          <span className="rule" />
        </div>

        <h1 className="sol-editorial-title">
          <span>{content.title} </span>
          <em>{content.titleHighlight}</em>
        </h1>

        <p className="sol-editorial-subtitle">{content.description}</p>

        <div className="legal-editorial-meta">
          <span>{tGuides("minRead", { minutes: guide.readMinutes })}</span>
          <span className="dot">•</span>
          <span>{guide.publishedAt}</span>
        </div>
      </header>

      <div className="legal-editorial-grid pt-4">
        <div className="w-full">
          <div className="pb-12 border-b border-[#24242b]">
            {content.sections.map((section) => (
              <LegalSectionView key={section.id} section={section} />
            ))}
          </div>

          <SolutionFaqList
            title1={tFaq("title1")}
            title2={tFaq("title2")}
            questionPrefix={tNav("faqPrefix")}
            faqs={content.faqs}
          />

          <div className="mt-12 pt-8 border-t border-[#24242b] flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#a855f7] block mb-1">
                {tGuides("relatedSolutionLabel")}
              </span>
              <p className="text-sm text-[#a9a8b5]">{content.socialHooks.cta}</p>
            </div>
            <Link
              href={`/solutions/${guide.targetSolution}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-zinc-950 font-medium text-sm hover:bg-zinc-200 transition-colors"
            >
              <span>{tGuides("relatedSolutionCta")}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <SolutionStickyIndex
          eyebrow={tNav("indexEyebrow")}
          sections={tocSections}
          supportPrompt={tNav("supportPrompt")}
          contactLabel={tFaq("contactSupport")}
        />
      </div>
    </SolutionShell>
  );
}
