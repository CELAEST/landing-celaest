import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Inter, Space_Grotesk } from "next/font/google";

import { Analytics } from "@/components/analytics";
import { ContactProvider } from "@/components/contact/contact-context";
import { CookieBanner } from "@/components/ui/cookie-banner";
import { routing, type Locale } from "@/i18n/routing";
import { SITE_URL, GA_MEASUREMENT_ID, GOOGLE_TAG_ID } from "@/lib/constants";
import { SEO_KEYWORDS } from "@/lib/seo";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "optional",
  preload: false,
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "optional",
  preload: false,
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
  const baseUrl = SITE_URL;

  const titles = {
    en: "CELAEST — AI Automation Catalog, AI Management & Software",
    es: "CELAEST — Catálogo de Automatizaciones, Gestión de IA y Software",
  };

  const descriptions = {
    en: "CELAEST: enterprise software and AI company with a verified automation catalog, private AI Mesh management, software projects, and CELAEST Lingua.",
    es: "CELAEST: compañía de software e IA con catálogo de automatizaciones empresariales, gestión de IA privada (Malla IA), proyectos de software y Lingua.",
  };

  const title = titles[locale as keyof typeof titles] ?? titles.es;
  const description = descriptions[locale as keyof typeof descriptions] ?? descriptions.es;

  return {
    title: {
      default: title,
      template: "%s | CELAEST",
    },
    description,
    keywords: SEO_KEYWORDS[locale] ?? SEO_KEYWORDS.es,
    authors: [{ name: "CELAEST", url: baseUrl }],
    creator: "CELAEST",
    publisher: "CELAEST",
    category: "technology",
    manifest: "/manifest.webmanifest",
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        en: `${baseUrl}/en`,
        es: `${baseUrl}/es`,
        "x-default": `${baseUrl}/es`,
      },
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}`,
      siteName: "CELAEST",
      locale: locale === "es" ? "es_CO" : "en_US",
      alternateLocale: locale === "es" ? ["en_US"] : ["es_CO"],
      type: "website",
      images: [
        {
          url: locale === "en" ? "/og-banner-en-v2.png" : "/og-banner-v2.png",
          width: 1200,
          height: 630,
          type: "image/png",
          alt: "CELAEST - AI Systems & Enterprise Automation Platform",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [locale === "en" ? "/og-banner-en-v2.png" : "/og-banner-v2.png"],
    },
    icons: {
      icon: [
        { url: "/favicon-v2.ico", sizes: "48x48", type: "image/x-icon" },
        { url: "/icon-48-v2.png", sizes: "48x48", type: "image/png" },
        { url: "/icon-192-v2.png", sizes: "192x192", type: "image/png" },
        { url: "/icon-512-v2.png", sizes: "512x512", type: "image/png" },
        { url: "/icon-v2.svg", type: "image/svg+xml" },
      ],
      shortcut: "/favicon-v2.ico",
      apple: [{ url: "/apple-icon-v2.png", sizes: "180x180", type: "image/png" }],
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
  const CLIENT_NAMESPACES = [
    "nav",
    "hero",
    "products",
    "platform",
    "pricing",
    "security",
    "architecture",
    "faq",
    "footer",
    "contactModal",
  ] as const;
  const clientMessages = Object.fromEntries(
    CLIENT_NAMESPACES.filter((ns) => ns in messages).map((ns) => [
      ns,
      messages[ns as keyof typeof messages],
    ]),
  );

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      style={{ backgroundColor: "#020202", colorScheme: "dark" }}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                'analytics_storage': (typeof window !== 'undefined' && localStorage.getItem('celaest_cookie_consent') === 'essential') ? 'denied' : 'granted',
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied'
              });
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
              gtag('config', '${GOOGLE_TAG_ID}');
            `,
          }}
        />
        <link
          rel="alternate"
          type="text/plain"
          href="/llms.txt"
          title="LLMs.txt - CELAEST AI Context"
        />
        <link
          rel="alternate"
          type="text/plain"
          href="/llms-full.txt"
          title="LLMs-Full.txt - CELAEST Complete Knowledge Base"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          href={locale === "en" ? "/rss-en.xml" : "/rss.xml"}
          title="CELAEST Technical Playbooks RSS"
        />
      </head>
      <body
        className="font-sans antialiased bg-[#020202] text-brand-ice"
        style={{ backgroundColor: "#020202" }}
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={clientMessages}>
          <ContactProvider>
            {children}
            <Analytics />
            <CookieBanner />
          </ContactProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
