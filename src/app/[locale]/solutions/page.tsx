import React from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SITE_URL, DASHBOARD_URL } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo";
import {
  generateAutomationCatalogSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  type FAQItem,
} from "@/lib/structured-data";
import { SolutionShell } from "@/components/solutions/solution-shell";
import {
  SolutionCardsGrid,
  type SolutionCardItem,
} from "@/components/solutions/solution-cards-grid";
import {
  SolutionIntentMap,
  type IntentRouteItem,
} from "@/components/solutions/solution-intent-map";
import { SolutionComparisonTable } from "@/components/solutions/solution-comparison-table";
import { SolutionFaqList } from "@/components/solutions/solution-faq-list";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const tHub = await getTranslations({ locale, namespace: "solutions.hub" });
  return buildPageMetadata({
    locale,
    path: "/solutions",
    title: tHub("seoTitle"),
    description: tHub("seoDescription"),
    keywords: tHub.raw("keywords") as string[],
  });
}

export default async function SolutionsHubPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tNav = await getTranslations({ locale, namespace: "solutions.nav" });
  const tGlobalNav = await getTranslations({ locale, namespace: "nav" });
  const tHub = await getTranslations({ locale, namespace: "solutions.hub" });
  const tFaq = await getTranslations({ locale, namespace: "faq" });

  const cards = tHub.raw("cards") as SolutionCardItem[];
  const intents = tHub.raw("intents") as IntentRouteItem[];
  const comparison = tHub.raw("comparison") as {
    title1: string;
    title2: string;
    columns: string[];
    rows: string[][];
  };
  const departments = tHub.raw("departments") as {
    title1: string;
    title2: string;
    columns: string[];
    rows: string[][];
  };
  const faqs = tHub.raw("faqs") as FAQItem[];

  const tabLabels = {
    overview: tNav("tabOverview"),
    lingua: tNav("tabLingua"),
    aiMesh: tNav("tabAiMesh"),
    automation: tNav("tabAutomation"),
  };

  const schemas = [
    generateAutomationCatalogSchema(locale),
    generateFAQSchema(faqs, locale),
    generateBreadcrumbSchema([
      { name: tGlobalNav("home"), url: `${SITE_URL}/${locale}` },
      { name: tHub("title1"), url: `${SITE_URL}/${locale}/solutions` },
    ]),
  ];

  return (
    <SolutionShell backLabel={tNav("backToHome")} tabLabels={tabLabels} schemas={schemas}>
      <header className="sol-editorial-header">
        <div className="sol-editorial-eyebrow">
          <span className="rule" />
          <span>{tHub("badge")}</span>
          <span className="rule" />
        </div>

        <h1 className="sol-editorial-title">
          <span>{tHub("title1")} </span>
          <em>{tHub("title2")}</em>
        </h1>

        <p className="sol-editorial-subtitle">{tHub("subtitle")}</p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={`${DASHBOARD_URL}/?mode=signup`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-zinc-950 font-medium text-sm hover:bg-zinc-200 transition-colors"
          >
            <span>{tNav("startNow")}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <Link
            href="/#pricing"
            prefetch={false}
            className="inline-flex items-center px-6 py-3 rounded-full border border-[#24242b] text-zinc-200 font-medium text-sm hover:border-purple-400/50 hover:text-white transition-colors"
          >
            {tNav("viewPricing")}
          </Link>
        </div>
      </header>

      <div className="py-6 border-b border-[#24242b]">
        <p className="legal-section-lead max-w-4xl">{tHub("definitionLead")}</p>
      </div>

      <SolutionCardsGrid cards={cards} exploreLabel={tNav("exploreSolution")} />

      <SolutionIntentMap
        title1={tHub("intentsTitle1")}
        title2={tHub("intentsTitle2")}
        subtitle={tHub("intentsSubtitle")}
        intents={intents}
      />

      <SolutionComparisonTable
        title1={departments.title1}
        title2={departments.title2}
        columns={departments.columns}
        rows={departments.rows}
      />

      <SolutionComparisonTable
        title1={comparison.title1}
        title2={comparison.title2}
        columns={comparison.columns}
        rows={comparison.rows}
      />

      <SolutionFaqList
        title1={tFaq("title1")}
        title2={tFaq("title2")}
        questionPrefix={tNav("faqPrefix")}
        faqs={faqs}
      />
    </SolutionShell>
  );
}
