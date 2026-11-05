import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Inter, Space_Grotesk } from "next/font/google";

import { Analytics } from "@/components/analytics";
import { routing, type Locale } from "@/i18n/routing";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
  themeColor: "#030307",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://landing-celaest.vercel.app";

  const titles = {
    en: "CELAEST - AI Systems for Everyone & Digital Asset Marketplace",
    es: "CELAEST - Sistemas de IA para Todos y Activos Digitales",
  };

  const descriptions = {
    en: "We design, implement, and scale AI systems that turn processes into real results for your business and daily life.",
    es: "Diseñamos, implementamos y escalamos sistemas de IA que convierten procesos en resultados reales para tu negocio y tu vida diaria.",
  };

  const title = titles[locale as keyof typeof titles] ?? titles.es;
  const description = descriptions[locale as keyof typeof descriptions] ?? descriptions.es;

  return {
    title: {
      default: title,
      template: "%s | CELAEST",
    },
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        en: `${baseUrl}/en`,
        es: `${baseUrl}/es`,
        "x-default": `${baseUrl}/es`,
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
          width: 1920,
          height: 1080,
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

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      style={{ backgroundColor: "#020202", colorScheme: "dark" }}
    >
      <head>
        <link rel="preload" as="image" href="/robot_hero_gaze/gaze_018.webp" type="image/webp" />
        <link rel="preload" as="fetch" href="/data/robot-gaze.bin" crossOrigin="anonymous" />
      </head>
      <body
        className="font-sans antialiased bg-[#020202] text-brand-ice"
        style={{ backgroundColor: "#020202" }}
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages}>
          {children}
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
