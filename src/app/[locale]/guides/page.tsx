import React from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Rss } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SITE_URL } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo";
import { getAllGuides, getLocalizedGuideContent } from "@/lib/guides";
import { generateBreadcrumbSchema } from "@/lib/structured-data";
import { SolutionShell } from "@/components/solutions/solution-shell";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "solutions.guides" });

  return buildPageMetadata({
    locale,
    path: "/guides",
    title: t("seoTitle"),
    description: t("seoDescription"),
    keywords: t.raw("keywords") as string[],
  });
}

export default async function GuidesHubPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tGuides = await getTranslations({ locale, namespace: "solutions.guides" });
  const tNav = await getTranslations({ locale, namespace: "solutions.nav" });
  const tGlobalNav = await getTranslations({ locale, namespace: "nav" });

  const guides = getAllGuides();
  const rssHref = locale === "en" ? "/rss-en.xml" : "/rss.xml";

  const schemas: Record<string, unknown>[] = [
    generateBreadcrumbSchema([
      { name: tGlobalNav("home"), url: `${SITE_URL}/${locale}` },
      { name: tGuides("title1"), url: `${SITE_URL}/${locale}/guides` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: tGuides("seoTitle"),
      description: tGuides("seoDescription"),
      url: `${SITE_URL}/${locale}/guides`,
      inLanguage: locale,
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: guides.length,
        itemListElement: guides.map((g, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: getLocalizedGuideContent(g, locale).seoTitle,
          url: `${SITE_URL}/${locale}/guides/${g.slug}`,
        })),
      },
    },
  ];

  return (
    <SolutionShell backLabel={tNav("backToHome")} schemas={schemas}>
      <header className="sol-editorial-header">
        <div className="sol-editorial-eyebrow">
          <span className="rule" />
          <span>{tGuides("badge")}</span>
          <span className="rule" />
        </div>

        <h1 className="sol-editorial-title">
          <span>{tGuides("title1")} </span>
          <em>{tGuides("title2")}</em>
        </h1>

        <p className="sol-editorial-subtitle">{tGuides("subtitle")}</p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={rssHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#24242b] text-xs font-mono uppercase tracking-widest text-zinc-300 hover:border-purple-400/50 hover:text-white transition-colors"
          >
            <Rss className="w-3.5 h-3.5 text-[#a855f7]" />
            <span>{tGuides("rssLabel")}</span>
          </a>
        </div>
      </header>

      <section aria-label={tGuides("title1")} className="sol-pillars-closed-box">
        <div className="sol-pillars-grid">
          {guides.map((guide, idx) => {
            const content = getLocalizedGuideContent(guide, locale);
            return (
              <article key={guide.slug} className="sol-pillar-col">
                <div>
                  <div className="sol-pillar-rule-wrap">
                    <strong className="sol-pillar-num">{String(idx + 1).padStart(2, "0")}</strong>
                    <span className="rule" />
                    <span className="sol-pillar-tag">{content.category}</span>
                  </div>

                  <h2 className="sol-pillar-title">
                    {content.title}{" "}
                    <span className="text-[#a9a8b5] font-normal">{content.titleHighlight}</span>
                  </h2>

                  <p className="sol-pillar-desc mt-3">{content.description}</p>

                  <div className="font-mono text-[11px] uppercase tracking-widest text-[#9a9aa6] mb-6">
                    {tGuides("minRead", { minutes: guide.readMinutes })} · {guide.publishedAt}
                  </div>
                </div>

                <Link href={`/guides/${guide.slug}`} className="sol-pillar-cta group">
                  <span>{tGuides("readGuide")}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    </SolutionShell>
  );
}
