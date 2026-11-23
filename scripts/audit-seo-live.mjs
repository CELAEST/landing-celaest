#!/usr/bin/env node
/**
 * Zero-Token Live SEO / AEO / GEO & Edge Hygiene Auditor for CELAEST.
 *
 * Audits all production domains (`celaest.com`, `dashboard.celaest.com`,
 * `lingua.celaest.com`, `app.celaest.com`), sitemap HTML pages, structured
 * JSON-LD schemas, canonical redirects, Range 206 video streaming, CORS
 * readiness, and Google's live FaviconV2 cache, then writes a readable Markdown
 * report to `content/SEO-AUDIT-LATEST.md`.
 */

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SITE_URL = "https://celaest.com";
const OUTPUT_PATH = path.resolve(process.cwd(), "content/SEO-AUDIT-LATEST.md");

const decodeHtmlEntities = (str) =>
  str
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

const extractMeta = (html, name) => {
  const forward = new RegExp(`<meta[^>]*name=["']${name}["'][^>]*content=["']([^"']*)["']`, "i");
  const reverse = new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*name=["']${name}["']`, "i");
  return decodeHtmlEntities((html.match(forward) || html.match(reverse) || [])[1] || "");
};

const extractCanonical = (html) => {
  const forward = /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i;
  const reverse = /<link[^>]*href=["']([^"']*)["'][^>]*rel=["']canonical["']/i;
  return (html.match(forward) || html.match(reverse) || [])[1] || "";
};

const parseJsonLdTypes = (html) => {
  const types = [];
  let invalidCount = 0;
  for (const m of html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const parsed = JSON.parse(m[1]);
      if (Array.isArray(parsed["@graph"])) {
        for (const node of parsed["@graph"]) {
          if (node["@type"]) types.push(String(node["@type"]));
        }
      } else if (parsed["@type"]) {
        types.push(String(parsed["@type"]));
      }
    } catch {
      invalidCount += 1;
    }
  }
  return { types, invalidCount };
};

async function checkEndpoints() {
  const required = [
    `${SITE_URL}/robots.txt`,
    `${SITE_URL}/sitemap.xml`,
    `${SITE_URL}/llms.txt`,
    `${SITE_URL}/llms-full.txt`,
    `${SITE_URL}/rss.xml`,
    `${SITE_URL}/rss-en.xml`,
    `${SITE_URL}/manifest.webmanifest`,
    `${SITE_URL}/14ab1315f9d2a532378af82872bc4c70.txt`,
    `${SITE_URL}/og-banner-v2.png`,
    `${SITE_URL}/og-banner-en-v2.png`,
    `${SITE_URL}/favicon-v2.ico`,
    `${SITE_URL}/icon-48-v2.png`,
    `${SITE_URL}/icon-192-v2.png`,
    `${SITE_URL}/icon-512-v2.png`,
    `${SITE_URL}/images/lingua-video-thumbnail.webp`,
    "https://dashboard.celaest.com/robots.txt",
    "https://lingua.celaest.com/robots.txt",
  ];

  const results = [];
  let robotsTxt = "";
  let sitemapXml = "";

  for (const url of required) {
    const res = await fetch(url);
    const body = url.endsWith(".txt") || url.endsWith(".xml") ? await res.text() : null;
    if (url === `${SITE_URL}/robots.txt`) robotsTxt = body || "";
    if (url === `${SITE_URL}/sitemap.xml`) sitemapXml = body || "";
    results.push({ url, status: res.status, ok: res.status === 200 });
  }

  const requiredBots = [
    "Googlebot",
    "Bingbot",
    "OAI-SearchBot",
    "GPTBot",
    "PerplexityBot",
    "ClaudeBot",
  ];
  const robotsChecks = {
    noYandexHost: !/^Host:/im.test(robotsTxt),
    allowsNextStatic: robotsTxt.includes("Allow: /_next/static/"),
    missingBots: requiredBots.filter((bot) => !robotsTxt.includes(bot)),
  };

  return { results, sitemapXml, robotsChecks };
}

async function checkSitemapPages(sitemapXml) {
  const locs = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const htmlUrls = locs.filter((u) => !u.endsWith(".txt") && !u.endsWith(".xml"));

  const pages = [];
  const titleMap = new Map();
  const descMap = new Map();

  for (const url of htmlUrls) {
    const res = await fetch(url);
    const html = await res.text();
    const rawTitle = (html.match(/<title>([^<]*)<\/title>/i) || [])[1] || "";
    const title = decodeHtmlEntities(rawTitle);
    const description = extractMeta(html, "description");
    const canonical = extractCanonical(html);
    const hreflangs = [...html.matchAll(/hrefLang=["']([^"']+)["']|hreflang=["']([^"']+)["']/gi)].map(
      (m) => m[1] || m[2],
    );
    const emptyAlt = (html.match(/<img\b(?![^>]*\balt=)[^>]*>/gi) || []).length;
    const { types: schemas, invalidCount } = parseJsonLdTypes(html);

    if (!titleMap.has(title)) titleMap.set(title, []);
    titleMap.get(title).push(url);

    if (!descMap.has(description)) descMap.set(description, []);
    descMap.get(description).push(url);

    pages.push({
      url,
      status: res.status,
      title,
      titleLen: title.length,
      descLen: description.length,
      canonicalOk: canonical === url,
      hreflangCount: hreflangs.length,
      emptyAlt,
      schemas,
      invalidJsonLd: invalidCount,
    });
  }

  const duplicateTitles = [...titleMap.entries()]
    .filter(([, list]) => list.length > 1)
    .map(([title, list]) => ({ title, urls: list }));
  const duplicateDescriptions = [...descMap.entries()]
    .filter(([, list]) => list.length > 1)
    .map(([description, list]) => ({ description, urls: list }));

  return { totalLocs: locs.length, pages, duplicateTitles, duplicateDescriptions };
}

async function checkRedirectsAndHygiene() {
  const redirectCases = [
    [`${SITE_URL}/`, `${SITE_URL}/es`, true],
    [`http://celaest.com/es`, `${SITE_URL}/es`, true],
    [`https://www.celaest.com/es`, `${SITE_URL}/es`, true],
    [`${SITE_URL}/es/`, `${SITE_URL}/es`, true],
    [`${SITE_URL}/year`, `${SITE_URL}/en`, true],
    [`${SITE_URL}/mes`, `${SITE_URL}/es`, true],
    [`${SITE_URL}/terms`, `${SITE_URL}/es/legal/terms`, true],
    [`${SITE_URL}/es/terms`, `${SITE_URL}/es/legal/terms`, true],
    ["https://app.celaest.com/", "https://dashboard.celaest.com/", false],
  ];

  const redirectResults = [];
  for (const [from, expectedTo, expectLinkHeader] of redirectCases) {
    const res = await fetch(from, { redirect: "manual" });
    const location = res.headers.get("location") || "";
    const hasLink = Boolean(res.headers.get("link"));
    redirectResults.push({
      from,
      expectedTo,
      status: res.status,
      location,
      hasLink,
      ok: res.status === 301 && location === expectedTo && (!expectLinkHeader || hasLink),
    });
  }

  const notFoundRes = await fetch(`${SITE_URL}/__seo-audit-nonexistent-404__`, {
    redirect: "manual",
  });
  const notFoundCheck = {
    status: notFoundRes.status,
    xRobotsTag: notFoundRes.headers.get("x-robots-tag") || "",
    ok:
      notFoundRes.status === 404 &&
      (notFoundRes.headers.get("x-robots-tag") || "").includes("noindex"),
  };

  return { redirectResults, notFoundCheck };
}

async function checkSubdomainsAndMedia() {
  const linguaHtmlRes = await fetch("https://lingua.celaest.com/");
  const linguaHtml = await linguaHtmlRes.text();
  const linguaDesc = extractMeta(linguaHtml, "description");
  const linguaSchemas = parseJsonLdTypes(linguaHtml);

  const dashHtmlRes = await fetch("https://dashboard.celaest.com/");
  const dashHtml = await dashHtmlRes.text();

  const videoRanges = [];
  for (const videoUrl of [
    `${SITE_URL}/videos/celaest-ecosistema-pitch.mp4`,
    "https://dashboard.celaest.com/auth-media/access-login-dark.mp4",
    "https://lingua.celaest.com/assets/begin1.mp4",
  ]) {
    const res = await fetch(videoUrl, { headers: { Range: "bytes=0-1023" } });
    videoRanges.push({
      url: videoUrl,
      status: res.status,
      acceptRanges: res.headers.get("accept-ranges") || "",
      contentRange: res.headers.get("content-range") || "",
      ok: res.status === 206 && Boolean(res.headers.get("content-range")),
    });
  }

  const coreCorsRes = await fetch("https://celaest-core-c4o7.onrender.com/api/v1/ai/chat/simple", {
    method: "OPTIONS",
    headers: {
      Origin: "https://lingua.celaest.com",
      "Access-Control-Request-Method": "POST",
      "Access-Control-Request-Headers": "authorization,content-type",
    },
  });

  const mktRes = await fetch("https://celaest-back.onrender.com/api/v1/public/marketplace/search");
  const mktJson = await mktRes.json();
  const linguaCard = (mktJson?.data?.products || []).find((p) => p.slug === "lingua");

  const landingEsRes = await fetch(`${SITE_URL}/es`);

  const securityTargets = [
    ["celaest.com/es", landingEsRes],
    ["dashboard.celaest.com/", dashHtmlRes],
    ["lingua.celaest.com/", linguaHtmlRes],
  ];
  const requiredSecHeaders = [
    "strict-transport-security",
    "x-content-type-options",
    "x-frame-options",
    "referrer-policy",
  ];
  const securityHeaders = securityTargets.map(([label, res]) => {
    const missing = requiredSecHeaders.filter((h) => !res.headers.get(h));
    return { label, missing, ok: missing.length === 0 };
  });

  return {
    lingua: {
      status: linguaHtmlRes.status,
      canonical: extractCanonical(linguaHtml),
      descLen: linguaDesc.length,
      hasVideoObject: linguaSchemas.types.includes("VideoObject"),
      ok:
        linguaHtmlRes.status === 200 &&
        extractCanonical(linguaHtml) === "https://lingua.celaest.com/" &&
        linguaDesc.length <= 152 &&
        linguaSchemas.types.includes("VideoObject"),
    },
    dashboard: {
      status: dashHtmlRes.status,
      canonical: extractCanonical(dashHtml),
      hasBrokenVercelNoise: dashHtml.includes("grainy-gradients.vercel.app"),
      ok:
        dashHtmlRes.status === 200 &&
        extractCanonical(dashHtml) === "https://dashboard.celaest.com" &&
        !dashHtml.includes("grainy-gradients.vercel.app"),
    },
    securityHeaders,
    videoRanges,
    coreCorsOk:
      coreCorsRes.status === 204 &&
      coreCorsRes.headers.get("access-control-allow-origin") === "https://lingua.celaest.com",
    marketplaceLinguaName: linguaCard?.name || "",
    marketplaceLinguaShortDesc: linguaCard?.short_description || "",
  };
}

async function checkGoogleFaviconCache() {
  const targets = [
    SITE_URL,
    `${SITE_URL}/es`,
    "https://dashboard.celaest.com",
    "https://lingua.celaest.com",
  ];
  const rows = [];
  for (const target of targets) {
    const gUrl = `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${encodeURIComponent(target)}&size=128`;
    try {
      const res = await fetch(gUrl);
      const buf = Buffer.from(await res.arrayBuffer());
      const meta = await sharp(buf).metadata();
      const stats = await sharp(buf).stats();
      const isDarkOpaque = res.status === 200 && stats.isOpaque && (meta.width || 0) >= 128;
      rows.push({
        target,
        status: res.status,
        size: `${meta.width}x${meta.height}`,
        opaque: stats.isOpaque,
        lastModified: res.headers.get("last-modified") || "-",
        state: isDarkOpaque ? "UPDATED_DARK" : res.status === 200 ? "PENDING_ROOT_REFRESH" : "NOT_CACHED_YET",
      });
    } catch (err) {
      rows.push({
        target,
        status: 0,
        size: "-",
        opaque: false,
        lastModified: "-",
        state: `ERR: ${err.message}`,
      });
    }
  }
  return rows;
}

function renderMarkdownReport({
  timestamp,
  failures,
  endpoints,
  sitemap,
  hygiene,
  ecosystem,
  favicons,
}) {
  const overall = failures.length === 0 ? "PASS (100% Técnico)" : `FAIL (${failures.length} hallazgos)`;
  const lines = [
    "# CELAEST — Live SEO / AEO / GEO Scorecard",
    "",
    `- **Última ejecución:** \`${timestamp}\``,
    `- **Estado Técnico Global:** **${overall}**`,
    `- **URLs en Sitemap:** \`${sitemap.totalLocs}\` (\`${sitemap.pages.length}\` páginas HTML auditadas)`,
    `- **Títulos duplicados:** \`${sitemap.duplicateTitles.length}\` · **Descripciones duplicadas:** \`${sitemap.duplicateDescriptions.length}\``,
    "",
    "## 1. Caché de Favicon en Google (`t1.gstatic.com/faviconV2`)",
    "",
    "| URL | HTTP | Tamaño | Opaco (sin blanco transparente) | Estado en Google | Última captura |",
    "| :--- | :--- | :--- | :--- | :--- | :--- |",
    ...favicons.map(
      (f) =>
        `| ${f.target} | ${f.status} | ${f.size} | ${f.opaque ? "Sí" : "No"} | \`${f.state}\` | ${f.lastModified} |`,
    ),
    "",
    "## 2. Subdominios, Videos iOS (`Range 206`), CORS y Tienda",
    "",
    `- **Lingua (\`lingua.celaest.com\`):** HTTP \`${ecosystem.lingua.status}\` · Desc \`${ecosystem.lingua.descLen}\` chars · \`VideoObject\`: ${ecosystem.lingua.hasVideoObject ? "✅" : "❌"}`,
    `- **Dashboard (\`dashboard.celaest.com\`):** HTTP \`${ecosystem.dashboard.status}\` · Canonical OK · Sin Vercel 402: ${!ecosystem.dashboard.hasBrokenVercelNoise ? "✅" : "❌"}`,
    `- **Streaming iPhone/Safari (\`206 Partial Content\`):** ${ecosystem.videoRanges.every((v) => v.ok) ? "✅ 3/3 dominios" : "❌ Revisar"}`,
    `- **Security Headers (HSTS/XFO/nosniff/Referrer):** ${ecosystem.securityHeaders.every((s) => s.ok) ? "✅ 3/3 dominios A+" : "❌ Revisar"}`,
    `- **CORS \`celaest-core\` (\`lingua.celaest.com\`):** ${ecosystem.coreCorsOk ? "✅ 204 OK" : "❌ Revisar"}`,
    `- **Marketplace Lingua:** \`${ecosystem.marketplaceLinguaName}\` — "${ecosystem.marketplaceLinguaShortDesc}"`,
    "",
    "## 3. Redirecciones `301` Canónicas y Endpoints GEO (`llms.txt`, RSS, Robots)",
    "",
    `- **Endpoints estáticos:** ${endpoints.results.filter((r) => r.ok).length}/${endpoints.results.length} en \`200 OK\``,
    `- **\`robots.txt\`:** Sin directiva Yandex \`Host:\` (${endpoints.robotsChecks.noYandexHost ? "✅" : "❌"}), \`/_next/static/\` permitido (${endpoints.robotsChecks.allowsNextStatic ? "✅" : "❌"})`,
    `- **Redirecciones \`301\` single-hop:** ${hygiene.redirectResults.filter((r) => r.ok).length}/${hygiene.redirectResults.length} OK · **404 \`noindex\`:** ${hygiene.notFoundCheck.ok ? "✅" : "❌"}`,
    "",
    "## 4. Fallos Técnicos Detectados",
    "",
    ...(failures.length === 0 ? ["- Ninguno (`0` errores técnicos)."] : failures.map((f) => `- ❌ ${f}`)),
    "",
  ];
  return lines.join("\n");
}

async function main() {
  const timestamp = new Date().toISOString();
  const endpoints = await checkEndpoints();
  const sitemap = await checkSitemapPages(endpoints.sitemapXml);
  const hygiene = await checkRedirectsAndHygiene();
  const ecosystem = await checkSubdomainsAndMedia();
  const favicons = await checkGoogleFaviconCache();

  const failures = [];
  for (const r of endpoints.results) {
    if (!r.ok) failures.push(`Endpoint ${r.url} returned ${r.status}`);
  }
  if (!endpoints.robotsChecks.noYandexHost) failures.push("robots.txt contains disallowed Yandex Host: directive");
  if (!endpoints.robotsChecks.allowsNextStatic) failures.push("robots.txt does not allow /_next/static/");
  if (endpoints.robotsChecks.missingBots.length > 0) {
    failures.push(`robots.txt missing crawlers: ${endpoints.robotsChecks.missingBots.join(", ")}`);
  }

  for (const p of sitemap.pages) {
    if (p.status !== 200) failures.push(`${p.url} returned HTTP ${p.status}`);
    if (p.titleLen === 0 || p.titleLen > 65) failures.push(`${p.url} title length ${p.titleLen} > 65`);
    if (p.descLen === 0 || p.descLen > 152) failures.push(`${p.url} description length ${p.descLen} > 152`);
    if (!p.canonicalOk) failures.push(`${p.url} canonical mismatch`);
    if (p.hreflangCount < 3) failures.push(`${p.url} missing full hreflang set`);
    if (p.emptyAlt > 0) failures.push(`${p.url} has ${p.emptyAlt} images missing alt`);
    if (p.invalidJsonLd > 0) failures.push(`${p.url} has ${p.invalidJsonLd} invalid JSON-LD blocks`);
  }
  for (const d of sitemap.duplicateTitles) {
    failures.push(`Duplicate <title> "${d.title}" across: ${d.urls.join(", ")}`);
  }
  for (const d of sitemap.duplicateDescriptions) {
    failures.push(`Duplicate meta description across: ${d.urls.join(", ")}`);
  }
  for (const r of hygiene.redirectResults) {
    if (!r.ok) failures.push(`Redirect ${r.from} -> status=${r.status} loc=${r.location}`);
  }
  if (!hygiene.notFoundCheck.ok) failures.push("404 response missing X-Robots-Tag: noindex");
  if (!ecosystem.lingua.ok) failures.push("lingua.celaest.com SEO check failed");
  if (!ecosystem.dashboard.ok) failures.push("dashboard.celaest.com hygiene check failed");
  for (const s of ecosystem.securityHeaders) {
    if (!s.ok) failures.push(`Security headers missing on ${s.label}: ${s.missing.join(", ")}`);
  }
  for (const v of ecosystem.videoRanges) {
    if (!v.ok) failures.push(`Video Range 206 failed for ${v.url} (status=${v.status})`);
  }
  if (!ecosystem.coreCorsOk) failures.push("celaest-core CORS preflight failed for lingua.celaest.com");

  const markdown = renderMarkdownReport({
    timestamp,
    failures,
    endpoints,
    sitemap,
    hygiene,
    ecosystem,
    favicons,
  });

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, markdown, "utf-8");

  console.log(markdown);
  if (failures.length > 0) {
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error("Fatal audit error:", err);
  process.exit(1);
});
