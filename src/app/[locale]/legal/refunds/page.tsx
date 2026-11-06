import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalHeader } from "@/components/legal/legal-header";
import { LegalSidebarToc } from "@/components/legal/legal-sidebar-toc";
import { LegalSectionView, type LegalSectionData } from "@/components/legal/legal-section-view";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.refunds" });
  return {
    title: `${t("title")} | CELAEST`,
    description: t("description"),
  };
}

export default async function RefundsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "legal.refunds" });
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

      <div className="legal-editorial-grid">
        {/* Main Document Body */}
        <div className="w-full legal-editorial-content">
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
