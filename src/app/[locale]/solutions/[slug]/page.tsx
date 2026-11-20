import React from "react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { SITE_URL, DASHBOARD_URL } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo";
import {
  generateAutomationCatalogSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateSolutionSchema,
  generateVideoObjectSchema,
  type FAQItem,
} from "@/lib/structured-data";
import { SolutionShell } from "@/components/solutions/solution-shell";
import { SolutionMetricsBand } from "@/components/solutions/solution-metrics-band";
import { SolutionVideoShowcase } from "@/components/solutions/solution-video-showcase";
import { SolutionStickyIndex } from "@/components/solutions/solution-sticky-index";
import { SolutionFaqList } from "@/components/solutions/solution-faq-list";

const SOLUTION_SLUGS = ["lingua", "ai-mesh", "automation"] as const;
type SolutionSlug = (typeof SOLUTION_SLUGS)[number];

interface SolutionDetailContent {
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  badge: string;
  title1: string;
  title2: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  metrics: Array<{ value: string; label: string; desc: string }>;
  capabilitiesTitle: string;
  capabilities: Array<{ title: string; description: string }>;
  faqs: FAQItem[];
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => SOLUTION_SLUGS.map((slug) => ({ locale, slug })));
}

function isValidSlug(slug: string): slug is SolutionSlug {
  return SOLUTION_SLUGS.includes(slug as SolutionSlug);
}

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isValidSlug(slug)) return {};

  const tItems = await getTranslations({ locale, namespace: "solutions.items" });
  const item = tItems.raw(slug) as SolutionDetailContent;

  return buildPageMetadata({
    locale,
    path: `/solutions/${slug}`,
    title: item.seoTitle,
    description: item.seoDescription,
    keywords: item.keywords,
  });
}

export default async function SolutionDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isValidSlug(slug)) notFound();

  setRequestLocale(locale);

  const tNav = await getTranslations({ locale, namespace: "solutions.nav" });
  const tGlobalNav = await getTranslations({ locale, namespace: "nav" });
  const tHub = await getTranslations({ locale, namespace: "solutions.hub" });
  const tFaq = await getTranslations({ locale, namespace: "faq" });
  const tItems = await getTranslations({ locale, namespace: "solutions.items" });

  const item = tItems.raw(slug) as SolutionDetailContent;
  const fullName = `${item.title1} ${item.title2}`.replace(/\.$/, "");

  const tabLabels = {
    overview: tNav("tabOverview"),
    lingua: tNav("tabLingua"),
    aiMesh: tNav("tabAiMesh"),
    automation: tNav("tabAutomation"),
  };

  const tocSections = [
    ...item.capabilities.map((cap, idx) => ({
      id: `cap-${String(idx + 1).padStart(2, "0")}`,
      number: String(idx + 1).padStart(2, "0"),
      title: cap.title,
    })),
    ...item.faqs.map((faq, idx) => ({
      id: `faq-${String(idx + 1).padStart(2, "0")}`,
      number: `Q${idx + 1}`,
      title: faq.question,
    })),
  ];

  const schemas = [
    generateSolutionSchema({
      locale,
      slug,
      name: fullName,
      description: item.seoDescription,
      featureList: item.capabilities.map((c) => c.title),
    }),
    ...(slug === "automation" ? [generateAutomationCatalogSchema(locale)] : []),
    ...(slug === "lingua"
      ? [
          generateVideoObjectSchema({
            locale,
            pagePath: `/solutions/${slug}`,
            videoId: "P6eigqaFWB0",
            name: tNav("linguaVideoTitle"),
            description: tNav("linguaVideoDescription"),
            uploadDate: "2026-11-18T11:52:50-08:00",
            durationIso: "PT1M3S",
          }),
        ]
      : []),
    generateFAQSchema(item.faqs, locale),
    generateBreadcrumbSchema([
      { name: tGlobalNav("home"), url: `${SITE_URL}/${locale}` },
      { name: tHub("title1"), url: `${SITE_URL}/${locale}/solutions` },
      { name: fullName, url: `${SITE_URL}/${locale}/solutions/${slug}` },
    ]),
  ];

  return (
    <SolutionShell backLabel={tNav("backToHome")} tabLabels={tabLabels} schemas={schemas}>
      <header className="sol-editorial-header">
        <div className="sol-editorial-eyebrow">
          <span className="rule" />
          <span>{item.badge}</span>
          <span className="rule" />
        </div>

        <h1 className="sol-editorial-title">
          <span>{item.title1} </span>
          <em>{item.title2}</em>
        </h1>

        <p className="sol-editorial-subtitle">{item.subtitle}</p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={`${DASHBOARD_URL}/?mode=signup`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-zinc-950 font-medium text-sm hover:bg-zinc-200 transition-colors"
          >
            <span>{item.ctaPrimary}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <Link
            href="/#pricing"
            prefetch={false}
            className="inline-flex items-center px-6 py-3 rounded-full border border-[#24242b] text-zinc-200 font-medium text-sm hover:border-purple-400/50 hover:text-white transition-colors"
          >
            {item.ctaSecondary}
          </Link>
        </div>
      </header>

      <SolutionMetricsBand
        badge={item.badge}
        lead1={tNav("impactLead1")}
        lead2={tNav("impactLead2")}
        metrics={item.metrics}
      />

      {slug === "lingua" && (
        <SolutionVideoShowcase
          videoId="P6eigqaFWB0"
          posterUrl="/images/lingua-video-thumbnail.webp"
          eyebrow={tNav("linguaVideoEyebrow")}
          title={tNav("linguaVideoTitle")}
          description={tNav("linguaVideoDescription")}
          playLabel={tNav("linguaVideoPlay")}
          watchExternalLabel={tNav("linguaVideoWatchExternal")}
        />
      )}

      <div className="legal-editorial-grid pt-4">
        <div className="w-full">
          <h2 className="sol-section-heading mb-10">{item.capabilitiesTitle}</h2>

          <div className="pb-12 border-b border-[#24242b]">
            {item.capabilities.map((cap, idx) => {
              const num = String(idx + 1).padStart(2, "0");
              return (
                <article
                  key={cap.title}
                  id={`cap-${num}`}
                  className="legal-section-article scroll-mt-28"
                >
                  <div className="legal-section-rule-wrap">
                    <strong className="legal-section-num">{num}</strong>
                    <span className="rule" />
                    <span className="legal-section-tag">
                      {tNav("sectionPrefix")} {num}
                    </span>
                  </div>
                  <h3 className="legal-section-title">{cap.title}</h3>
                  <div className="legal-section-paragraphs">
                    <p>{cap.description}</p>
                  </div>
                </article>
              );
            })}
          </div>

          <SolutionFaqList
            title1={tFaq("title1")}
            title2={tFaq("title2")}
            questionPrefix={tNav("faqPrefix")}
            faqs={item.faqs}
          />
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
