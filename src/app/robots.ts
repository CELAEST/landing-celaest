import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE_URL;

  const aiAndSearchAgents = [
    "*",
    "Googlebot",
    "Googlebot-Image",
    "Google-Favicon",
    "Bingbot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "GPTBot",
    "PerplexityBot",
    "ClaudeBot",
    "anthropic-ai",
    "Google-Extended",
    "Applebot-Extended",
    "cohere-ai",
    "Meta-ExternalAgent",
  ];

  return {
    rules: aiAndSearchAgents.map((userAgent) => ({
      userAgent,
      allow: ["/", "/_next/static/", "/llms.txt", "/llms-full.txt"],
      disallow: ["/api/"],
    })),
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
