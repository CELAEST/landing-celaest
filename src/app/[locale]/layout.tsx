import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Inter, Space_Grotesk } from "next/font/google";

import { Analytics } from "@/components/analytics";
import { routing } from "@/i18n/routing";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  // `optional` keeps the fallback for the entire page-view if Inter doesn't
  // arrive within ~100 ms. Eliminates the late font-swap that re-triggers LCP
  // measurement (~5 s on slow networks). Cached visits still use Inter.
  display: "optional",
  preload: true,
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#050505",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://landing-celaest.vercel.app";

  const titles = {
    en: "Celeast - Premium Digital Asset Marketplace",
    es: "Celeast - Mercado Premium de Activos Digitales",
  };

  const descriptions = {
    en: "Premium, verified digital assets for serious professionals. Excel macros, Python scripts, and business software that delivers instant ROI.",
    es: "Activos digitales premium y verificados para profesionales serios. Macros Excel, scripts Python y software empresarial con ROI instantáneo.",
  };

  const title = titles[locale as keyof typeof titles];
  const description = descriptions[locale as keyof typeof descriptions];

  return {
    title: {
      default: title,
      template: "%s | Celeast",
    },
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        en: `${baseUrl}/en`,
        es: `${baseUrl}/es`,
        "x-default": `${baseUrl}/en`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}`,
      siteName: "CELAEST",
      locale: locale === "es" ? "es_ES" : "en_US",
      type: "website",
      images: [
        {
          url: "/robot1.webp",
          width: 1200,
          height: 630,
          alt: "CELAEST Platform",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/robot1.webp"],
    },
    icons: {
      icon: "/icon.svg",
    },
  };
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head />
      <body className="font-sans antialiased" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          {children}
          <Analytics />
        </NextIntlClientProvider>
        {/* Service Worker: Caché de assets 3D de Spline para recargas instantáneas */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(function() {});
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
