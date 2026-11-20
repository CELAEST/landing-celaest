import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/constants";
import { getAllGuideSlugs } from "@/lib/guides";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  const now = new Date();
  const guidePages = getAllGuideSlugs().map((slug) => ({
    path: `/guides/${slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // Páginas indexables: Inicio, Soluciones, Guías, FAQ y rutas legales
  const pages = [
    { path: "", changeFrequency: "weekly" as const, priority: 1.0 },
    { path: "/solutions", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/solutions/lingua", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/solutions/ai-mesh", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/solutions/automation", changeFrequency: "weekly" as const, priority: 0.85 },
    { path: "/guides", changeFrequency: "weekly" as const, priority: 0.85 },
    ...guidePages,
    { path: "/faq", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/legal/terms", changeFrequency: "monthly" as const, priority: 0.4 },
    { path: "/legal/privacy", changeFrequency: "monthly" as const, priority: 0.4 },
    { path: "/legal/refunds", changeFrequency: "monthly" as const, priority: 0.4 },
    { path: "/legal/license", changeFrequency: "monthly" as const, priority: 0.4 },
    { path: "/legal/cookies", changeFrequency: "monthly" as const, priority: 0.4 },
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    const languages: Record<string, string> = Object.fromEntries(
      routing.locales.map((l) => [l, `${baseUrl}/${l}${page.path}`]),
    );
    languages["x-default"] = `${baseUrl}/es${page.path}`;

    for (const locale of routing.locales) {
      entries.push({
        url: `${baseUrl}/${locale}${page.path}`,
        lastModified: now,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: { languages },
      });
    }
  }

  // GEO (Generative Engine Optimization) knowledge documents for AI search crawlers
  entries.push(
    {
      url: `${baseUrl}/llms.txt`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/llms-full.txt`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  );

  return entries;
}
