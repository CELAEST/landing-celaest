import { buildGuidesRssFeed } from "@/lib/rss";

export const dynamic = "force-static";

export async function GET() {
  return new Response(buildGuidesRssFeed("es"), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
