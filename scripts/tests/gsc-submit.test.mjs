// Tests for the Search Console sitemap submit (netlify/lib/gscSubmit.mjs), with a throwaway RSA key.
//   npm run test:seo
import { test } from "node:test";
import assert from "node:assert/strict";
import { generateKeyPairSync, verify } from "node:crypto";
import {
  buildJwt,
  sitemapEndpoint,
  submitToGoogle,
  SCOPE,
  TOKEN_URL,
} from "../../netlify/lib/gscSubmit.mjs";

const { privateKey, publicKey } = generateKeyPairSync("rsa", {
  modulusLength: 2048,
  privateKeyEncoding: { type: "pkcs8", format: "pem" },
  publicKeyEncoding: { type: "spki", format: "pem" },
});
const EMAIL = "site-bot@example-project.iam.gserviceaccount.com";
const ENV = {
  GSC_CLIENT_EMAIL: EMAIL,
  GSC_PRIVATE_KEY_B64: Buffer.from(privateKey).toString("base64"),
};
const SITEMAP = "https://excaliburradon.com/sitemap.xml";
const TOKEN = "ya29.test-access-token";

const decode = (part) => JSON.parse(Buffer.from(part, "base64url").toString("utf8"));
const json = (status, body) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

/** A fake fetch: token endpoint, then `put` for each sitemap PUT; records requests */
function fakeFetch({
  token = json(200, { access_token: TOKEN, expires_in: 3599 }),
  put = () => new Response(null, { status: 204 }),
} = {}) {
  const requests = [];
  const fetch = async (url, init = {}) => {
    requests.push({ url, ...init });
    assert.ok(init.signal instanceof AbortSignal, "every request has a timeout signal");
    if (url === TOKEN_URL) return typeof token === "function" ? token() : token;
    return put(url, init);
  };
  return { fetch, requests };
}

test("the JWT has three base64url parts, the right header and claims, and a valid RS256 signature", () => {
  const now = 1_800_000_000;
  const jwt = buildJwt({ clientEmail: EMAIL, privateKey, now });
  const parts = jwt.split(".");
  assert.equal(parts.length, 3);
  for (const p of parts) assert.match(p, /^[A-Za-z0-9_-]+$/);
  assert.deepEqual(decode(parts[0]), { alg: "RS256", typ: "JWT" });
  assert.deepEqual(decode(parts[1]), {
    iss: EMAIL,
    scope: SCOPE,
    aud: TOKEN_URL,
    iat: now,
    exp: now + 3600,
  });
  assert.equal(SCOPE, "https://www.googleapis.com/auth/webmasters");
  assert.equal(TOKEN_URL, "https://oauth2.googleapis.com/token");
  const ok = verify(
    "RSA-SHA256",
    Buffer.from(`${parts[0]}.${parts[1]}`),
    publicKey,
    Buffer.from(parts[2], "base64url"),
  );
  assert.ok(ok, "signature verifies with the public key");
});

test("sitemap endpoint encodes the property (including sc-domain:) and the sitemap URL", () => {
  assert.equal(
    sitemapEndpoint("sc-domain:excaliburradon.com", SITEMAP),
    "https://www.googleapis.com/webmasters/v3/sites/sc-domain%3Aexcaliburradon.com/sitemaps/https%3A%2F%2Fexcaliburradon.com%2Fsitemap.xml",
  );
  assert.equal(
    sitemapEndpoint("https://excaliburradon.com/", SITEMAP),
    "https://www.googleapis.com/webmasters/v3/sites/https%3A%2F%2Fexcaliburradon.com%2F/sitemaps/https%3A%2F%2Fexcaliburradon.com%2Fsitemap.xml",
  );
});

test("missing credentials: skipped cleanly, no requests", async () => {
  for (const env of [
    {},
    { GSC_CLIENT_EMAIL: EMAIL },
    { GSC_PRIVATE_KEY_B64: ENV.GSC_PRIVATE_KEY_B64 },
  ]) {
    const logs = [];
    const { fetch, requests } = fakeFetch();
    await submitToGoogle([SITEMAP], {
      site: "sc-domain:excaliburradon.com",
      env,
      fetch,
      log: (...a) => logs.push(a.join(" ")),
    });
    assert.deepEqual(logs, ["[gsc] skipped: no credentials"]);
    assert.equal(requests.length, 0);
  }
});

test("success: token exchange as form data, then one PUT per sitemap with the bearer token", async () => {
  const logs = [];
  const { fetch, requests } = fakeFetch();
  await submitToGoogle([SITEMAP], {
    site: "sc-domain:excaliburradon.com",
    env: ENV,
    fetch,
    log: (...a) => logs.push(a.join(" ")),
  });
  assert.equal(requests.length, 2);
  const [tokenReq, putReq] = requests;
  assert.equal(tokenReq.method, "POST");
  assert.equal(tokenReq.headers["Content-Type"], "application/x-www-form-urlencoded");
  const form = new URLSearchParams(tokenReq.body);
  assert.equal(form.get("grant_type"), "urn:ietf:params:oauth:grant-type:jwt-bearer");
  assert.equal(form.get("assertion").split(".").length, 3);
  assert.equal(putReq.method, "PUT");
  assert.equal(putReq.url, sitemapEndpoint("sc-domain:excaliburradon.com", SITEMAP));
  assert.equal(putReq.headers.Authorization, `Bearer ${TOKEN}`);
  assert.deepEqual(logs, [`[gsc] submitted ${SITEMAP} 204`]);
});

test("a non-2xx response is logged with Google's error message, not thrown, and no secrets are logged", async () => {
  const logs = [];
  const { fetch } = fakeFetch({
    put: () =>
      json(403, {
        error: { code: 403, message: "User does not have sufficient permission for site." },
      }),
  });
  await submitToGoogle([SITEMAP], {
    site: "sc-domain:excaliburradon.com",
    env: ENV,
    fetch,
    log: (...a) => logs.push(a.join(" ")),
  });
  assert.deepEqual(logs, [
    `[gsc] failed ${SITEMAP} 403: User does not have sufficient permission for site.`,
  ]);

  // A failed token exchange or a network error is logged too
  const authLogs = [];
  await submitToGoogle([SITEMAP], {
    site: "sc-domain:excaliburradon.com",
    env: ENV,
    log: (...a) => authLogs.push(a.join(" ")),
    fetch: fakeFetch({
      token: json(400, { error: "invalid_grant", error_description: "Invalid JWT Signature." }),
    }).fetch,
  });
  assert.deepEqual(authLogs, ["[gsc] auth failed: token HTTP 400: Invalid JWT Signature."]);
  const netLogs = [];
  await submitToGoogle([SITEMAP], {
    site: "sc-domain:excaliburradon.com",
    env: ENV,
    log: (...a) => netLogs.push(a.join(" ")),
    fetch: fakeFetch({
      put: () => {
        throw new Error("fetch failed");
      },
    }).fetch,
  });
  assert.deepEqual(netLogs, [`[gsc] failed ${SITEMAP}: fetch failed`]);

  const all = [...logs, ...authLogs, ...netLogs].join("\n");
  assert.ok(!all.includes(TOKEN));
  assert.ok(!all.includes("eyJ"), "no JWT in the logs");
  assert.ok(!all.includes("PRIVATE KEY") && !all.includes(ENV.GSC_PRIVATE_KEY_B64.slice(0, 40)));
});
