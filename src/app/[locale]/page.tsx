import { Suspense } from "react";
import dynamic from "next/dynamic";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Header } from "@/components/landing/header";
import { SectionProgressNav } from "@/components/landing/section-progress-nav";
import { HeroSection } from "@/components/landing/hero-section";
import { VolumetricAura } from "@/components/landing/lab";
import { Footer } from "@/components/landing/footer";
import { buildPageMetadata } from "@/lib/seo";
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateSoftwareSchema,
  generateAutomationCatalogSchema,
  generateSiteNavigationSchema,
  generateFAQSchema,
  type FAQItem,
} from "@/lib/structured-data";

// Lazy-load downstream sections in independent split chunks
const ProductsSection = dynamic(() =>
  import("@/components/landing/products-view").then((m) => m.ProductsSection),
);
const PlatformSection = dynamic(() =>
  import("@/components/landing/platform-section").then((m) => m.PlatformSection),
);
const SecuritySection = dynamic(() =>
  import("@/components/landing/security-section").then((m) => m.SecuritySection),
);
const PricingSection = dynamic(() =>
  import("@/components/landing/pricing-section").then((m) => m.PricingSection),
);
const ArchitectureSection = dynamic(() =>
  import("@/components/landing/architecture-section").then((m) => m.ArchitectureSection),
);
const ClosingCTASection = dynamic(() =>
  import("@/components/landing/closing-cta-section").then((m) => m.ClosingCTASection),
);

// Page ISR: Revalidate every hour - sync trigger
export const revalidate = 3600;

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const isEn = locale === "en";

  return buildPageMetadata({
    locale,
    path: "",
    useAbsoluteTitle: true,
    title: isEn
      ? "CELAEST — AI Automation Catalog, AI Management & Software"
      : "CELAEST — Catálogo de Automatizaciones, Gestión de IA y Software",
    description: isEn
      ? "CELAEST: enterprise software and AI company with a verified automation catalog, private AI Mesh management, software projects, and CELAEST Lingua."
      : "CELAEST: compañía de software e IA con catálogo de automatizaciones empresariales, gestión de IA privada (Malla IA), proyectos de software y Lingua.",
  });
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const tFaq = await getTranslations({ locale, namespace: "faq" });
  const questions = tFaq.raw("questions") as FAQItem[];

  return (
    <div className="min-h-screen bg-brand-dark relative overflow-x-hidden">
      <Header />
      <VolumetricAura />

      {/* JSON-LD Structured Data (SEO + AEO + GEO Entity Graph) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateOrganizationSchema(locale)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateWebSiteSchema(locale)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateSoftwareSchema(locale)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateAutomationCatalogSchema(locale)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateSiteNavigationSchema(locale)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(questions, locale)),
        }}
      />

      <main>
        <SectionProgressNav />
        <HeroSection />
        <Suspense fallback={null}>
          <div className="cv-section">
            <ProductsSection />
          </div>
        </Suspense>
        <Suspense fallback={null}>
          <div className="cv-section">
            <PlatformSection />
          </div>
        </Suspense>
        <Suspense fallback={null}>
          <div className="cv-section">
            <SecuritySection />
          </div>
        </Suspense>
        <Suspense fallback={null}>
          <div className="cv-section">
            <PricingSection />
          </div>
        </Suspense>
        <Suspense fallback={null}>
          <div className="cv-section">
            <ArchitectureSection />
          </div>
        </Suspense>
        <Suspense fallback={null}>
          <div className="cv-section">
            <ClosingCTASection />
          </div>
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <div className="cv-section">
          <Footer />
        </div>
      </Suspense>
    </div>
  );
}
