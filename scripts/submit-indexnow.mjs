#!/usr/bin/env node
/**
 * Submits all URLs from the CELAEST sitemap to IndexNow (Bing, ChatGPT Search,
 * Copilot, Yandex, Seznam, Naver) for instant crawling and indexing.
 */

import fs from "node:fs";
import path from "node:path";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://celaest.com").replace(/\/$/, "");
const HOST = new URL(SITE_URL).hostname;
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

function resolveIndexNowKey() {
  if (process.env.INDEXNOW_KEY) {
    return process.env.INDEXNOW_KEY.trim();
  }

  const publicDir = path.resolve(process.cwd(), "public");
  const files = fs.readdirSync(publicDir);
  const keyFile = files.find((file) => /^[a-f0-9]{32}\.txt$/i.test(file));

  if (!keyFile) {
    throw new Error("No 32-char IndexNow key file (<key>.txt) found in public/.");
  }

  return fs.readFileSync(path.join(publicDir, keyFile), "utf-8").trim();
}

async function resolveSitemapUrls() {
  const localSitemap = path.resolve(process.cwd(), "out/sitemap.xml");
  let xmlContent = "";

  if (fs.existsSync(localSitemap)) {
    xmlContent = fs.readFileSync(localSitemap, "utf-8");
  } else {
    const res = await fetch(`${SITE_URL}/sitemap.xml`);
    if (!res.ok) {
      throw new Error(`Failed to fetch ${SITE_URL}/sitemap.xml: ${res.status}`);
    }
    xmlContent = await res.text();
  }

  const matches = [...xmlContent.matchAll(/<loc>(.*?)<\/loc>/g)];
  const urls = matches.map((m) => m[1].trim()).filter(Boolean);

  if (urls.length === 0) {
    throw new Error("No <loc> URLs found in sitemap.xml.");
  }

  return urls;
}

async function main() {
  const key = resolveIndexNowKey();
  const keyLocation = `${SITE_URL}/${key}.txt`;
  const urlList = await resolveSitemapUrls();

  const payload = {
    host: HOST,
    key,
    keyLocation,
    urlList,
  };

  console.log(`Submitting ${urlList.length} URLs to IndexNow for ${HOST}...`);
  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  const body = await response.text();
  if (!response.ok) {
    throw new Error(`IndexNow submission failed (${response.status}): ${body}`);
  }

  console.log(`IndexNow accepted (${response.status} ${response.statusText}).`);
  console.log(`Key verified at: ${keyLocation}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
