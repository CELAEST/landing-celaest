import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://celaest.com';

  // Construir mapa de lenguajes paralelos ('hreflang') para SEO Internacional
  const languages: Record<string, string> = Object.fromEntries(
    routing.locales.map((l) => [l, `${baseUrl}/${l}`])
  );
  // Declarar el idioma por defecto para tráfico global no coincidente
  languages['x-default'] = `${baseUrl}/en`;

  // Generar entradas de sitemap para cada locale
  const entries: MetadataRoute.Sitemap = routing.locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1,
    alternates: { languages },
  }));

  return entries;
}
