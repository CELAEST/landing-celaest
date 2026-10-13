import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Navigation } from "@/components/landing-v2/navigation";
import { HeroSection } from "@/components/landing-v2/hero-section";
import dynamic from "next/dynamic";
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateSoftwareSchema,
} from "@/lib/structured-data";

import { SplineBackground } from "@/components/landing-v2/spline-minimal-loader";

// Lazy load sections below the fold for better performance
const ProductsSection = dynamic(
  () =>
    import("@/components/landing-v2/products-view").then((mod) => ({
      default: mod.ProductsSection,
    })),
  {
    loading: () => <div className="py-24 bg-brand-deep" />,
  },
);
const PricingSection = dynamic(
  () =>
    import("@/components/landing-v2/pricing-section").then((mod) => ({
      default: mod.PricingSection,
    })),
  {
    loading: () => <div className="py-24 bg-brand-deep" />,
  },
);
const SecuritySection = dynamic(
  () =>
    import("@/components/landing-v2/security-section").then((mod) => ({
      default: mod.SecuritySection,
    })),
  {
    loading: () => <div className="py-24 bg-brand-deep" />,
  },
);

const PlatformSection = dynamic(
  () =>
    import("@/components/landing-v2/platform-section").then((mod) => ({
      default: mod.PlatformSection,
    })),
  {
    loading: () => <div className="py-24 bg-brand-deep" />,
  },
);
const FAQSection = dynamic(
  () =>
    import("@/components/landing-v2/faq-section").then((mod) => ({
      default: mod.FAQSection,
    })),
  {
    loading: () => <div className="py-24 bg-brand-deep" />,
  },
);
const Footer = dynamic(
  () =>
    import("@/components/landing-v2/footer").then((mod) => ({
      default: mod.Footer,
    })),
  {
    loading: () => <div className="py-12 bg-slate-900" />,
  },
);

// ISR: Revalidate every hour
export const revalidate = 3600;

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function LandingV2Page({ params }: PageProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-brand-dark">
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
      <Navigation />
      <main>
        <HeroSection
          splineBackground={
            <div className="absolute z-0 w-[104%] h-[108%] -left-2 -top-4 pointer-events-auto">
              <SplineBackground />
            </div>
          }
        />
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
          <FAQSection />
        </div>
      </main>
      <div className="cv-section">
        <Footer />
      </div>
    </div>
  );
}
