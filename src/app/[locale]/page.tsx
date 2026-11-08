import dynamic from "next/dynamic";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Header } from "@/components/landing/header";
import { SectionProgressNav } from "@/components/landing/section-progress-nav";
import { HeroSection } from "@/components/landing/hero-section";
import { VolumetricAura } from "@/components/landing/lab";
import { Footer } from "@/components/landing/footer";
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateSoftwareSchema,
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

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-brand-dark relative overflow-x-hidden">
      <Header />
      <VolumetricAura />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateOrganizationSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebSiteSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSoftwareSchema()) }}
      />

      <main>
        <SectionProgressNav />
        <HeroSection />
        <div className="cv-section">
          <ProductsSection />
        </div>
        <div className="cv-section">
          <PlatformSection />
        </div>
        <div className="cv-section">
          <SecuritySection />
        </div>
        <div className="cv-section">
          <PricingSection />
        </div>
        <div className="cv-section">
          <ArchitectureSection />
        </div>
        <div className="cv-section">
          <ClosingCTASection />
        </div>
      </main>
      <div className="cv-section">
        <Footer />
      </div>
    </div>
  );
}
