import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import dynamic from "next/dynamic";

import { SplineBackground } from "@/components/landing/spline-minimal-loader";

// Lazy load sections below the fold for better performance
const ProductsSection = dynamic(
  () =>
    import("@/components/landing/products-view").then((mod) => ({
      default: mod.ProductsSection,
    })),
  {
    loading: () => <div className="py-24 bg-[#020202]" />,
  },
);
const PricingSection = dynamic(
  () =>
    import("@/components/landing/pricing-section").then((mod) => ({
      default: mod.PricingSection,
    })),
  {
    loading: () => <div className="py-24 bg-[#030303]" />,
  },
);
const ReviewsSection = dynamic(
  () =>
    import("@/components/landing/reviews-section").then((mod) => ({
      default: mod.ReviewsSection,
    })),
  {
    loading: () => <div className="py-24 bg-[#020202]" />,
  },
);
const AboutSection = dynamic(
  () =>
    import("@/components/landing/about-section").then((mod) => ({
      default: mod.AboutSection,
    })),
  {
    loading: () => <div className="py-24 bg-[#020202]" />,
  },
);
const PlatformSection = dynamic(
  () =>
    import("@/components/landing/platform-section").then((mod) => ({
      default: mod.PlatformSection,
    })),
  {
    loading: () => <div className="py-24 bg-[#020202]" />,
  },
);
const FAQSection = dynamic(
  () =>
    import("@/components/landing/faq-section").then((mod) => ({
      default: mod.FAQSection,
    })),
  {
    loading: () => <div className="py-24 bg-[#030303]" />,
  },
);
const Footer = dynamic(
  () =>
    import("@/components/landing/footer").then((mod) => ({
      default: mod.Footer,
    })),
  {
    loading: () => <div className="py-12 bg-[#0F172A]" />,
  },
);

// ISR: Revalidate every hour
export const revalidate = 3600; // Force Turbopack rebuild

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-brand-dark">
      <Navigation />
      <main>
        <HeroSection
          splineBackground={
            <div className="absolute z-0 w-[104%] h-[108%] -left-2 -top-4 pointer-events-auto">
              <SplineBackground />
            </div>
          }
        />
        <PlatformSection />
        <ProductsSection />
        <PricingSection />
        <ReviewsSection />
        <AboutSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
