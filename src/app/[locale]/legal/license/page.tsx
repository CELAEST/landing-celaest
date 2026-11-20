import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalHeader } from "@/components/legal/legal-header";
import { LegalSidebarToc } from "@/components/legal/legal-sidebar-toc";
import { LegalSectionView, type LegalSectionData } from "@/components/legal/legal-section-view";
import { SITE_URL } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo";
import { generateBreadcrumbSchema } from "@/lib/structured-data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.license" });
  return buildPageMetadata({
    locale,
    path: "/legal/license",
    title: t("title"),
    description: t("description"),
  });
}

export default async function LicensePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "legal.license" });
  const tNav = await getTranslations({ locale, namespace: "legal.nav" });

  const sections = t.raw("sections") as LegalSectionData[];

  const tocItems = sections.map((s) => ({
    id: s.id,
    number: s.number,
    title: s.title,
  }));

  const navLabels = {
    print: tNav("print"),
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: tNav("breadcrumbHome"), url: `${SITE_URL}/${locale}` },
    { name: tNav("breadcrumbLegal"), url: `${SITE_URL}/${locale}/legal/terms` },
    { name: t("title"), url: `${SITE_URL}/${locale}/legal/license` },
  ]);

  return (
    <div className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <LegalHeader
        title={t("title")}
        badge={t("badge")}
        subtitle={t("subtitle")}
        version={tNav("version")}
        lastUpdated={t("lastUpdated")}
        navLabels={navLabels}
      />

      <div className="legal-editorial-grid">
        {/* Main Document Body */}
        <div className="w-full">
          {sections.map((section) => (
            <LegalSectionView key={section.id} section={section} />
          ))}
        </div>

        {/* Sticky Editorial Index */}
        <LegalSidebarToc
          sections={tocItems}
          title={tNav("tableOfContents")}
          contactLegalText={tNav("contactLegal")}
          contactLegalBtn={tNav("contactLegalBtn")}
        />
      </div>
    </div>
  );
}
