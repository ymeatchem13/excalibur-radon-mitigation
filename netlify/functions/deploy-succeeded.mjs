// IndexNow auto-submit (Bing, Yandex, Seznam, Naver, ...), then the sitemap(s) to Google Search Console.
//
// Netlify runs a function named `deploy-succeeded` after every successful deploy
// (event-triggered function, https://docs.netlify.com/build/functions/trigger-on-events/).
// The request body is JSON: { payload: <deploy object> }; payload.context is
// "production", "deploy-preview" or "branch-deploy". We only submit for production.
//
// The key must be served at https://HOST/KEY.txt (file: public/643052f712aa175b24db5ea6f16c687a.txt).
// Nothing here can affect the site: every error is caught and logged, and Netlify
// ignores the return value of event functions.
//
// Search Console: netlify/lib/gscSubmit.mjs, with GSC_CLIENT_EMAIL and GSC_PRIVATE_KEY_B64 (a service account
// that is an Owner/Full user of the property). Property: GSC_SITE_URL if set, otherwise GSC_SITE.

import { submitToGoogle } from "../lib/gscSubmit.mjs";

const HOST = "excaliburradon.com";
const GSC_SITE = "sc-domain:excaliburradon.com";
const KEY = "643052f712aa175b24db5ea6f16c687a";

// Sitemaps to read in addition to https://HOST/sitemap.xml and any `Sitemap:`
// lines in robots.txt. Sitemap indexes are followed to their child sitemaps.
const EXTRA_SITEMAPS = [];

const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
const MAX_URLS_PER_REQUEST = 10000;
const MAX_SITEMAPS = 50;
const FETCH_TIMEOUT_MS = 10000;

const log = (...args) => console.log("[indexnow]", ...args);

const unescapeXml = (s) =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .trim();

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "IndexNow-deploy-hook" },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`GET ${url} -> HTTP ${res.status}`);
  return res.text();
}

async function sitemapsFromRobots() {
  try {
    const txt = await fetchText(`https://${HOST}/robots.txt`);
    return [...txt.matchAll(/^\s*sitemap:\s*(\S+)/gim)].map((m) => m[1]);
  } catch (err) {
    log("robots.txt not read:", err.message);
    return [];
  }
}

async function collectUrls() {
  const queue = [`https://${HOST}/sitemap.xml`, ...EXTRA_SITEMAPS, ...(await sitemapsFromRobots())];
  const seen = new Set();
  const read = []; // sitemaps fetched successfully (submitted to Search Console)
  const urls = new Set();

  while (queue.length && seen.size < MAX_SITEMAPS) {
    const sitemap = queue.shift();
    if (seen.has(sitemap)) continue;
    seen.add(sitemap);
    try {
      // Strip XML comments first: a comment that mentions <loc> would otherwise
      // swallow the first real URL.
      const xml = (await fetchText(sitemap)).replace(/<!--[\s\S]*?-->/g, "");
      read.push(sitemap);
      const locs = [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)].map((m) => unescapeXml(m[1]));
      if (/<sitemapindex[\s>]/i.test(xml)) {
        queue.push(...locs);
      } else {
        locs.forEach((u) => urls.add(u));
      }
    } catch (err) {
      log(`sitemap skipped (${sitemap}):`, err.message);
    }
  }

  const kept = [];
  let dropped = 0;
  for (const u of urls) {
    try {
      const h = new URL(u).hostname;
      if (h === HOST || h === `www.${HOST}`) kept.push(u);
      else dropped++;
    } catch {
      dropped++;
    }
  }
  if (dropped) log(`dropped ${dropped} URL(s) not on ${HOST}`);
  log(`read ${seen.size} sitemap(s): ${[...seen].join(", ")}`);
  return { sitemaps: read, urls: kept };
}

async function submit(urlList) {
  for (let i = 0; i < urlList.length; i += MAX_URLS_PER_REQUEST) {
    const batch = urlList.slice(i, i + MAX_URLS_PER_REQUEST);
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: HOST,
        key: KEY,
        keyLocation: `https://${HOST}/${KEY}.txt`,
        urlList: batch,
      }),
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    log(`HTTP ${res.status}, ${batch.length} URLs submitted`);
  }
}

export default async (req) => {
  try {
    const body = await req.json().catch(() => ({}));
    const context = body?.payload?.context ?? body?.deploy?.context;
    if (context !== "production") {
      log(`skipped: deploy context is "${context}", not production`);
      return new Response("skipped");
    }
    const { sitemaps, urls: urlList } = await collectUrls();
    if (!urlList.length) {
      log("no URLs found in sitemap(s); nothing submitted");
      return new Response("no urls");
    }
    await submit(urlList);
    try {
      await submitToGoogle(sitemaps, { site: process.env.GSC_SITE_URL || GSC_SITE });
    } catch (err) {
      console.log("[gsc] error (ignored):", err?.message ?? err);
    }
  } catch (err) {
    log("error (ignored):", err?.message ?? err);
  }
  return new Response("ok");
};
