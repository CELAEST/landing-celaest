import { SITE_URL, SUPPORT_EMAIL } from "./constants";
import { getAllGuides, getLocalizedGuideContent } from "./guides";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Builds a standards-compliant RSS 2.0 feed for Buffer, Metricool, n8n, Make, and AI syndication.
 */
export function buildGuidesRssFeed(locale: "es" | "en"): string {
  const isEs = locale === "es";
  const selfUrl = `${SITE_URL}/${isEs ? "rss.xml" : "rss-en.xml"}`;
  const hubUrl = `${SITE_URL}/${locale}/guides`;
  const channelTitle = isEs
    ? "CELAEST — Guías Técnicas de IA, Automatización e Inglés Profesional"
    : "CELAEST — Enterprise AI, Automation & Professional English Playbooks";
  const channelDesc = isEs
    ? "Playbooks prácticos sobre Malla IA Zero-Training, CELAEST Lingua y automatización empresarial."
    : "Actionable playbooks on Zero-Training AI Mesh, CELAEST Lingua, and enterprise automation.";

  const itemsXml = getAllGuides()
    .map((guide) => {
      const content = getLocalizedGuideContent(guide, locale);
      const url = `${SITE_URL}/${locale}/guides/${guide.slug}`;
      const pubDate = new Date(`${guide.publishedAt}T12:00:00Z`).toUTCString();

      return `    <item>
      <title>${escapeXml(`${content.title} ${content.titleHighlight}`)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(content.category)}</category>
      <description>${escapeXml(content.description)}</description>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(channelTitle)}</title>
    <link>${escapeXml(hubUrl)}</link>
    <description>${escapeXml(channelDesc)}</description>
    <language>${isEs ? "es-co" : "en-us"}</language>
    <managingEditor>${SUPPORT_EMAIL} (CELAEST)</managingEditor>
    <atom:link href="${escapeXml(selfUrl)}" rel="self" type="application/rss+xml" />
${itemsXml}
  </channel>
</rss>
`;
}
