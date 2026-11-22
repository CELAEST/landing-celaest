import { handleContactPost, handleNewsletterPost } from "./src/lib/email/contact-processor.ts";

const KEEP_ALIVE_ENDPOINTS = [
  "https://celaest-back.onrender.com/health",
  "https://celaest-english-back.onrender.com/health",
  "https://celaest-core.onrender.com/health",
];

const REDIRECT_MAP = {
  "/": "/es",
  "/es/legal": "/es/legal/terms",
  "/en/legal": "/en/legal/terms",
  "/es/legal/faq": "/es/faq",
  "/en/legal/faq": "/en/faq",
  "/faq": "/es/faq",
  "/legal": "/es/legal/terms",
  "/legal/terms": "/es/legal/terms",
  "/legal/privacy": "/es/legal/privacy",
  "/legal/refunds": "/es/legal/refunds",
  "/legal/license": "/es/legal/license",
  "/legal/cookies": "/es/legal/cookies",
  "/legal/faq": "/es/faq",
  "/terms": "/es/legal/terms",
  "/terminos": "/es/legal/terms",
  "/privacy": "/es/legal/privacy",
  "/privacidad": "/es/legal/privacy",
  "/refunds": "/es/legal/refunds",
  "/reembolsos": "/es/legal/refunds",
  "/license": "/es/legal/license",
  "/licencia": "/es/legal/license",
  "/cookies": "/es/legal/cookies",
  "/solutions": "/es/solutions",
  "/guides": "/es/guides",
  "/products": "/es/solutions",
  "/productos": "/es/solutions",
  "/pricing": "/es",
  "/precios": "/es",
  "/mes": "/es",
  "/año": "/es",
  "/anio": "/es",
  "/month": "/en",
  "/year": "/en",
};

const LOCALE_LEGAL_ALIASES = {
  terms: "terms",
  terminos: "terms",
  privacy: "privacy",
  privacidad: "privacy",
  refunds: "refunds",
  reembolsos: "refunds",
  license: "license",
  licencia: "license",
  cookies: "cookies",
};

function resolveCanonicalPath(pathname) {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  if (REDIRECT_MAP[normalized]) {
    return REDIRECT_MAP[normalized];
  }
  const localeAliasMatch = normalized.match(/^\/(es|en)\/([^/]+)$/);
  if (localeAliasMatch) {
    const [, locale, segment] = localeAliasMatch;
    if (LOCALE_LEGAL_ALIASES[segment]) {
      return `/${locale}/legal/${LOCALE_LEGAL_ALIASES[segment]}`;
    }
    if (segment === "products" || segment === "productos") {
      return `/${locale}/solutions`;
    }
    if (segment === "pricing" || segment === "precios") {
      return `/${locale}`;
    }
  }
  if (/^\/(solutions|guides)\/[^/]+$/.test(normalized)) {
    return `/es${normalized}`;
  }
  return null;
}

function getRuntimeEmailConfig(env) {
  return {
    apiKey: env?.RESEND_API_KEY,
    defaultFrom: env?.EMAIL_FROM || "CELAEST <noreply@celaest.com>",
    internalReceiver: env?.EMAIL_INTERNAL_RECEIVER || "celaest.oficial@gmail.com",
    strictProvider: true,
  };
}

function methodNotAllowedResponse() {
  return new Response(JSON.stringify({ success: false, error: "Method not allowed" }), {
    status: 405,
    headers: {
      Allow: "POST",
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

/**
 * Parses a single HTTP Range header (`bytes=start-end`, `bytes=start-`, `bytes=-suffix`).
 */
export function parseByteRange(rangeHeader, totalSize) {
  if (!rangeHeader || !rangeHeader.startsWith("bytes=") || totalSize <= 0) {
    return null;
  }
  const spec = rangeHeader.slice(6).split(",")[0]?.trim() || "";
  const dashIdx = spec.indexOf("-");
  if (dashIdx === -1) return null;

  const rawStart = spec.slice(0, dashIdx).trim();
  const rawEnd = spec.slice(dashIdx + 1).trim();

  if (rawStart === "") {
    const suffix = Number(rawEnd);
    if (!Number.isInteger(suffix) || suffix <= 0) return null;
    const start = Math.max(0, totalSize - suffix);
    return { start, end: totalSize - 1 };
  }

  const start = Number(rawStart);
  const end = rawEnd === "" ? totalSize - 1 : Math.min(totalSize - 1, Number(rawEnd));
  if (
    !Number.isInteger(start) ||
    !Number.isInteger(end) ||
    start < 0 ||
    start >= totalSize ||
    end < start
  ) {
    return null;
  }
  return { start, end };
}

function sliceByteStream(body, start, end) {
  let offset = 0;
  const transformer = new TransformStream({
    transform(chunk, controller) {
      const chunkStart = offset;
      const chunkEnd = offset + chunk.byteLength - 1;
      offset += chunk.byteLength;

      if (chunkEnd < start) return;
      if (chunkStart > end) {
        controller.terminate();
        return;
      }

      const from = Math.max(0, start - chunkStart);
      const to = Math.min(chunk.byteLength, end - chunkStart + 1);
      controller.enqueue(from === 0 && to === chunk.byteLength ? chunk : chunk.subarray(from, to));

      if (offset > end) {
        controller.terminate();
      }
    },
  });
  return body.pipeThrough(transformer);
}

async function serveRangeAwareVideo(request, env) {
  const assetRes = await env.ASSETS.fetch(new Request(request.url, { method: "GET" }));
  if (assetRes.status === 404) {
    const headers = new Headers(assetRes.headers);
    headers.set("X-Robots-Tag", "noindex, nofollow");
    return new Response(assetRes.body, {
      status: 404,
      statusText: assetRes.statusText,
      headers,
    });
  }
  if (!assetRes.ok) return assetRes;

  const headers = new Headers(assetRes.headers);
  headers.set("Accept-Ranges", "bytes");
  headers.set("Vary", "Range");
  if (!headers.has("Cache-Control")) {
    headers.set("Cache-Control", "public, max-age=604800");
  }

  let totalSize = Number(headers.get("content-length") || 0);
  let bodyStream = assetRes.body;

  // Fallback for runtimes or upstream paths omitting Content-Length header
  if (totalSize <= 0 && bodyStream) {
    const buf = await assetRes.arrayBuffer();
    totalSize = buf.byteLength;
    headers.set("Content-Length", String(totalSize));
    if (request.method === "HEAD") {
      return new Response(null, { status: 200, headers });
    }
    const rangeHeader = request.headers.get("range");
    if (!rangeHeader) {
      return new Response(buf, { status: 200, headers });
    }
    const parsed = parseByteRange(rangeHeader, totalSize);
    if (!parsed) {
      headers.set("Content-Range", `bytes */${totalSize}`);
      headers.set("Content-Length", "0");
      return new Response(null, { status: 416, headers });
    }
    headers.set("Content-Range", `bytes ${parsed.start}-${parsed.end}/${totalSize}`);
    headers.set("Content-Length", String(parsed.end - parsed.start + 1));
    return new Response(buf.slice(parsed.start, parsed.end + 1), {
      status: 206,
      headers,
    });
  }

  if (request.method === "HEAD") {
    await bodyStream?.cancel();
    return new Response(null, { status: 200, headers });
  }

  const rangeHeader = request.headers.get("range");
  if (!rangeHeader || !bodyStream) {
    return new Response(bodyStream, { status: 200, headers });
  }

  const parsed = parseByteRange(rangeHeader, totalSize);
  if (!parsed) {
    await bodyStream.cancel();
    headers.set("Content-Range", `bytes */${totalSize}`);
    headers.set("Content-Length", "0");
    return new Response(null, { status: 416, headers });
  }

  headers.set("Content-Range", `bytes ${parsed.start}-${parsed.end}/${totalSize}`);
  headers.set("Content-Length", String(parsed.end - parsed.start + 1));
  return new Response(sliceByteStream(bodyStream, parsed.start, parsed.end), {
    status: 206,
    headers,
  });
}

function withSecurityHeaders(response) {
  const headers = new Headers(response.headers);
  headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "SAMEORIGIN");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Permissions-Policy", "camera=(), geolocation=(), microphone=()");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

const worker = {
  async fetch(request, env) {
    const url = new URL(request.url);
    const normalizedPath = url.pathname.replace(/\/+$/, "") || "/";

    // 1. Server-side edge handlers for /api/contact and /api/newsletter (static ./out compatible)
    if (normalizedPath === "/api/contact") {
      if (request.method === "POST") {
        return handleContactPost(request, getRuntimeEmailConfig(env));
      }
      return methodNotAllowedResponse();
    }

    if (normalizedPath === "/api/newsletter") {
      if (request.method === "POST") {
        return handleNewsletterPost(request, getRuntimeEmailConfig(env));
      }
      return methodNotAllowedResponse();
    }

    // 2. Single-hop 301 canonicalization: force HTTPS + apex domain + strip trailing slashes + legacy paths
    const isProdDomain = url.hostname === "celaest.com" || url.hostname === "www.celaest.com";
    const needsDomainUpgrade =
      url.hostname === "www.celaest.com" || (isProdDomain && url.protocol === "http:");
    const hasTrailingSlash = url.pathname !== "/" && url.pathname.endsWith("/");
    const mappedPath = resolveCanonicalPath(url.pathname);

    if (needsDomainUpgrade || hasTrailingSlash || mappedPath) {
      const targetUrl = new URL(request.url);
      if (isProdDomain) {
        targetUrl.protocol = "https:";
        targetUrl.hostname = "celaest.com";
      }
      targetUrl.pathname = mappedPath || normalizedPath;
      return new Response(null, {
        status: 301,
        headers: {
          Location: targetUrl.toString(),
          Link: '</favicon-v2.ico>; rel="icon"; type="image/x-icon", </icon-48-v2.png>; rel="icon"; type="image/png"; sizes="48x48", </icon-192-v2.png>; rel="icon"; type="image/png"; sizes="192x192"',
        },
      });
    }

    // 3. Next.js 16 static export RSC segment dot-path rewrite (/es/.../__next.$d$locale.a.b.txt -> /es/.../__next.%24d%24locale/a/b.txt)
    const rscMatch = url.pathname.match(/^(.*\/__next\.\$d\$locale)\.(.+)\.txt$/);
    if (rscMatch) {
      const rewrittenUrl = new URL(request.url);
      const basePrefix = rscMatch[1].replace(/\$/g, "%24");
      const segmentPath = rscMatch[2].replace(/\./g, "/").replace(/\$/g, "%24");
      rewrittenUrl.pathname = `${basePrefix}/${segmentPath}.txt`;
      return withSecurityHeaders(
        await env.ASSETS.fetch(new Request(rewrittenUrl.toString(), request)),
      );
    }

    if (url.pathname.includes("$")) {
      const rewrittenUrl = new URL(request.url);
      rewrittenUrl.pathname = url.pathname.replace(/\$/g, "%24");
      return withSecurityHeaders(
        await env.ASSETS.fetch(new Request(rewrittenUrl.toString(), request)),
      );
    }

    if (url.pathname.startsWith("/videos/")) {
      return withSecurityHeaders(await serveRangeAwareVideo(request, env));
    }

    const assetResponse = await env.ASSETS.fetch(request);
    if (assetResponse.status === 404) {
      const headers = new Headers(assetResponse.headers);
      headers.set("X-Robots-Tag", "noindex, nofollow");
      return withSecurityHeaders(
        new Response(assetResponse.body, {
          status: 404,
          statusText: assetResponse.statusText,
          headers,
        }),
      );
    }

    return withSecurityHeaders(assetResponse);
  },

  async scheduled(_controller, _env, ctx) {
    ctx.waitUntil(
      Promise.allSettled(
        KEEP_ALIVE_ENDPOINTS.map((endpoint) =>
          fetch(endpoint, {
            method: "GET",
            headers: { "User-Agent": "CELAEST-Edge-KeepAlive/1.0" },
          }).then((res) => res.body?.cancel()),
        ),
      ),
    );
  },
};

export default worker;
