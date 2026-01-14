import { HeroSection } from './HeroSection';
import { ProductInfo } from './ProductInfo';
import { PricingSection } from './PricingSection';
import { ReviewsSection } from './ReviewsSection';
import { AboutSection } from './AboutSection';
import { FAQSection } from './FAQSection';
import { Footer } from './Footer';
import { Navigation } from './Navigation';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <Navigation />
      <HeroSection />
      <ProductInfo />
      <PricingSection />
      <ReviewsSection />
      <AboutSection />
      <FAQSection />
      <Footer />
    </div>
  );
}
