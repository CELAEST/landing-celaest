import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalHeader } from "@/components/legal/legal-header";
import { LegalSidebarToc } from "@/components/legal/legal-sidebar-toc";
import { LegalSectionView, type LegalSectionData } from "@/components/legal/legal-section-view";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.terms" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "legal.terms" });
  const tNav = await getTranslations({ locale, namespace: "legal.nav" });

  const sections = t.raw("sections") as LegalSectionData[];

  const tocItems = sections.map((s) => ({
    id: s.id,
    number: s.number,
    title: s.title,
  }));

  const navLabels = {
    breadcrumbHome: tNav("breadcrumbHome"),
    breadcrumbLegal: tNav("breadcrumbLegal"),
    print: tNav("print"),
  };

  return (
    <div className="w-full">
      <LegalHeader
        title={t("title")}
        badge={t("badge")}
        subtitle={t("subtitle")}
        version={tNav("version")}
        lastUpdated={t("lastUpdated")}
        navLabels={navLabels}
      />

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        {/* Main Document Body */}
        <div className="flex-1 w-full max-w-3xl">
          {sections.map((section) => (
            <LegalSectionView
              key={section.id}
              section={section}
              summaryLabel={tNav("summaryLabel")}
            />
          ))}
        </div>

        {/* Sticky Table of Contents & Compliance Box */}
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
