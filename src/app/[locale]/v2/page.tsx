import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateSoftwareSchema,
} from "@/lib/structured-data";
import {
  NavigationV2,
  HeroV2,
  PlatformV2,
  SecurityV2,
  PricingV2,
  FAQV2,
  FooterV2,
} from "@/components/landing-v2";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function LandingV2Page({ params }: PageProps) {
  const { locale } = await params;

  // Habilitar renderizado estático en el locale actual
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-[#040811] text-[#f8fafc] selection:bg-violet-500/30 selection:text-white">
      {/* Datos Estructurados JSON-LD SEO */}
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

      {/* Navegación V2 Ultra-Luxury */}
      <NavigationV2 />

      {/* Contenido Principal con Skip Link Target */}
      <main id="main-content">
        <HeroV2 />
        <PlatformV2 />
        <SecurityV2 />
        <PricingV2 />
        <FAQV2 />
      </main>

      {/* Footer V2 con Conversión Final */}
      <FooterV2 />
    </div>
  );
}
