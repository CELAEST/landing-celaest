import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Header } from "@/components/landing/header";
import { SectionProgressNav } from "@/components/landing/section-progress-nav";
import { HeroSection } from "@/components/landing/hero-section";
import { VolumetricAura } from "@/components/landing/lab";
import { ProductsSection } from "@/components/landing/products-view";
import { PlatformSection } from "@/components/landing/platform-section";
import { SecuritySection } from "@/components/landing/security-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { ArchitectureSection } from "@/components/landing/architecture-section";
import { ClosingCTASection } from "@/components/landing/closing-cta-section";
import { Footer } from "@/components/landing/footer";
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateSoftwareSchema,
} from "@/lib/structured-data";

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
