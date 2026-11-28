// Google Search Console sitemap submit, used by netlify/functions/deploy-succeeded.mjs after the IndexNow step.
// Authenticates as a service account (JWT bearer grant, RS256 signed with node:crypto, no dependencies) and PUTs
// each sitemap to the Search Console API. Env: GSC_CLIENT_EMAIL, GSC_PRIVATE_KEY_B64 (base64 of the PEM key).
// The service account must be an Owner or Full user of the Search Console property.
// Never logs the token, the JWT or the key, and never throws.
import { sign } from "node:crypto";

export const TOKEN_URL = "https://oauth2.googleapis.com/token";
export const SCOPE = "https://www.googleapis.com/auth/webmasters";
const TIMEOUT_MS = 10000;

export const base64url = (input) =>
  Buffer.from(input).toString("base64").replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");

/** A signed RS256 JWT for Google's token endpoint */
export function buildJwt({ clientEmail, privateKey, now = Math.floor(Date.now() / 1000) }) {
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64url(
    JSON.stringify({ iss: clientEmail, scope: SCOPE, aud: TOKEN_URL, iat: now, exp: now + 3600 }),
  );
  const input = `${header}.${claims}`;
  return `${input}.${base64url(sign("RSA-SHA256", Buffer.from(input), privateKey))}`;
}

/** Exchanges the JWT for an access token; throws (without the JWT or token in the message) on failure */
export async function exchangeToken(jwt, { fetch = globalThis.fetch } = {}) {
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }).toString(),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.access_token) {
    throw new Error(
      `token HTTP ${res.status}: ${data.error_description || data.error || "no access token"}`,
    );
  }
  return data.access_token;
}

/** Search Console API address for submitting one sitemap to one property (sc-domain:… or a URL prefix) */
export const sitemapEndpoint = (site, sitemapUrl) =>
  `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site)}/sitemaps/${encodeURIComponent(sitemapUrl)}`;

/** Submits each sitemap to Search Console; logs one line per sitemap */
export async function submitToGoogle(
  sitemaps,
  { site, env = process.env, fetch = globalThis.fetch, log = console.log } = {},
) {
  const clientEmail = env.GSC_CLIENT_EMAIL;
  const keyB64 = env.GSC_PRIVATE_KEY_B64;
  if (!clientEmail || !keyB64) {
    log("[gsc] skipped: no credentials");
    return;
  }
  let token;
  try {
    const privateKey = Buffer.from(keyB64, "base64").toString("utf8").replace(/\\n/g, "\n");
    token = await exchangeToken(buildJwt({ clientEmail, privateKey }), { fetch });
  } catch (err) {
    log("[gsc] auth failed:", err?.message ?? "unknown error");
    return;
  }
  for (const sitemapUrl of sitemaps) {
    try {
      const res = await fetch(sitemapEndpoint(site, sitemapUrl), {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      if (res.ok) {
        log(`[gsc] submitted ${sitemapUrl} ${res.status}`);
      } else {
        const data = await res.json().catch(() => ({}));
        log(
          `[gsc] failed ${sitemapUrl} ${res.status}: ${data?.error?.message || res.statusText || "no error message"}`,
        );
      }
    } catch (err) {
      log(`[gsc] failed ${sitemapUrl}:`, err?.message ?? "unknown error");
    }
  }
}
