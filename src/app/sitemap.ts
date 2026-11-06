import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  // Páginas indexables: Inicio y rutas legales de cumplimiento
  const pages = [
    { path: "", changeFrequency: "weekly" as const, priority: 1.0 },
    { path: "/legal/terms", changeFrequency: "monthly" as const, priority: 0.3 },
    { path: "/legal/privacy", changeFrequency: "monthly" as const, priority: 0.3 },
    { path: "/legal/license", changeFrequency: "monthly" as const, priority: 0.3 },
    { path: "/legal/cookies", changeFrequency: "monthly" as const, priority: 0.3 },
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    const languages: Record<string, string> = Object.fromEntries(
      routing.locales.map((l) => [l, `${baseUrl}/${l}${page.path}`]),
    );
    languages["x-default"] = `${baseUrl}/en${page.path}`;

    for (const locale of routing.locales) {
      entries.push({
        url: `${baseUrl}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: { languages },
      });
    }
  }

  return entries;
}
