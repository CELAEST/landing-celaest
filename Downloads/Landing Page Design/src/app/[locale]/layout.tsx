import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Inter, Space_Grotesk } from 'next/font/google';
import { routing, type Locale } from '@/i18n/routing';
import '@/styles/globals.css';

// Optimized font loading with preload
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

// Static generation for all locales
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0F172A',
};

// Metadata generation
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles = {
    en: 'Celeast - Premium Digital Asset Marketplace',
    es: 'Celeast - Mercado Premium de Activos Digitales',
  };

  const descriptions = {
    en: 'Premium, verified digital assets for serious professionals. Excel macros, Python scripts, and business software that delivers instant ROI.',
    es: 'Activos digitales premium y verificados para profesionales serios. Macros Excel, scripts Python y software empresarial con ROI instantáneo.',
  };

  return {
    title: {
      default: titles[locale],
      template: '%s | Celeast',
    },
    description: descriptions[locale],
    keywords: [
      'automation',
      'Excel macros',
      'Python scripts',
      'business software',
      'digital assets',
      'marketplace',
    ],
    authors: [{ name: 'Celeast' }],
    creator: 'Celeast',
    metadataBase: new URL('https://celeast.com'),
    alternates: {
      canonical: '/',
      languages: {
        en: '/en',
        es: '/es',
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      alternateLocale: locale === 'es' ? 'en_US' : 'es_ES',
      title: titles[locale],
      description: descriptions[locale],
      siteName: 'Celeast',
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale],
      description: descriptions[locale],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get messages for the locale
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/videos/background.webm" as="video" type="video/webm" />
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        {/* Disable scroll restoration */}
        <script dangerouslySetInnerHTML={{ __html: `if (history.scrollRestoration) { history.scrollRestoration = 'manual'; }` }} />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
