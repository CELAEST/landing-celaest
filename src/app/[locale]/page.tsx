import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { Navigation } from '@/components/landing/navigation';
import { HeroSection } from '@/components/landing/hero-section';
import dynamic from 'next/dynamic';

// Lazy load sections below the fold for better performance
const ProductsSection = dynamic(() => import('@/components/landing/products-section').then(mod => ({ default: mod.ProductsSection })), {
  loading: () => <div className="py-24 bg-white" />
});
const PricingSection = dynamic(() => import('@/components/landing/pricing-section').then(mod => ({ default: mod.PricingSection })), {
  loading: () => <div className="py-24 bg-[#F5F5F5]" />
});
const ReviewsSection = dynamic(() => import('@/components/landing/reviews-section').then(mod => ({ default: mod.ReviewsSection })), {
  loading: () => <div className="py-24 bg-white" />
});
const AboutSection = dynamic(() => import('@/components/landing/about-section').then(mod => ({ default: mod.AboutSection })), {
  loading: () => <div className="py-24 bg-[#F5F5F5]" />
});
const FAQSection = dynamic(() => import('@/components/landing/faq-section').then(mod => ({ default: mod.FAQSection })), {
  loading: () => <div className="py-24 bg-white" />
});
const Footer = dynamic(() => import('@/components/landing/footer').then(mod => ({ default: mod.Footer })), {
  loading: () => <div className="py-12 bg-[#0F172A]" />
});

// ISR: Revalidate every hour
export const revalidate = 3600;

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <Navigation />
      <main>
        <HeroSection />
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
