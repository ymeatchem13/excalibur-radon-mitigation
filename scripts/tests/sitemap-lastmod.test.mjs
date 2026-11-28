// Tests for sitemap.xml <lastmod>: git dates (scripts/lib/gitLastmod.mjs), the route -> files map
// (scripts/lib/lastmod-files.mjs) and the serializer (src/lib/sitemap.ts).
//   npm run test:seo
import { test, mock } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  buildLastmodMap,
  createGitDater,
  gitLastmod,
  newestDate,
  SHALLOW_MESSAGE,
  toLastmod,
} from "../lib/gitLastmod.mjs";
import { ROUTE_FILES } from "../lib/lastmod-files.mjs";
import { buildSitemapXml } from "../../src/lib/sitemap.ts";
import { ROUTES } from "../../src/lib/routes.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SITE = "https://excaliburradon.com";

/** A fake git: `dates` maps file -> %cI output; records every call */
function fakeGit({ shallow = "false", dates = {}, fail = false } = {}) {
  const calls = [];
  const run = (args) => {
    calls.push(args.join(" "));
    if (fail) throw new Error("spawn git ENOENT");
    if (args[0] === "rev-parse") return `${shallow}\n`;
    if (args[0] === "log") return `${dates[args.at(-1)] || ""}\n`;
    throw new Error(`unexpected git ${args.join(" ")}`);
  };
  return { run, calls };
}

const silent = () => {};

test("toLastmod and newestDate accept W3C dates only and keep them as written", () => {
  assert.equal(toLastmod("2026-05-11"), "2026-05-11");
  assert.equal(toLastmod("2026-11-20T14:03:11-05:00"), "2026-11-20T14:03:11-05:00");
  assert.equal(toLastmod(""), undefined);
  assert.equal(toLastmod("May 11, 2026"), undefined);
  assert.equal(toLastmod(undefined), undefined);
  assert.equal(
    newestDate(["2026-01-02", "nope", "2026-03-04T00:00:00.000Z", undefined]),
    "2026-03-04T00:00:00.000Z",
  );
  assert.equal(newestDate([]), undefined);
});

test("a page gets the newest git commit of its files (git runs once per file)", () => {
  const { run, calls } = fakeGit({
    dates: {
      "src/routes/service-areas.$city.tsx": "2026-08-06T22:59:32-04:00",
      "src/lib/site-data.ts": "2026-08-09T15:04:06-04:00",
      "src/lib/service-area-content.ts": "2026-08-01T09:00:00-04:00",
    },
  });
  const dater = createGitDater({ run, log: silent });
  const files = ROUTE_FILES["/service-areas/$city"];
  assert.equal(gitLastmod(files, dater), "2026-08-09T15:04:06-04:00");
  assert.equal(gitLastmod(ROUTE_FILES["/services"], dater), "2026-08-09T15:04:06-04:00");
  const logCalls = calls.filter((c) => c.startsWith("log "));
  assert.equal(new Set(logCalls).size, logCalls.length, "each file is looked up once and cached");
  assert.equal(calls.filter((c) => c.startsWith("rev-parse")).length, 1);
});

test("buildLastmodMap leaves out route patterns git has no date for", () => {
  const dater = createGitDater({
    run: fakeGit({ dates: { "src/routes/terms.tsx": "2026-08-27T01:25:04-04:00" } }).run,
    log: silent,
  });
  assert.deepEqual(buildLastmodMap(ROUTE_FILES, dater), { "/terms": "2026-08-27T01:25:04-04:00" });
});

test("shallow clone: no git dates, one log line", () => {
  const logs = [];
  const { run, calls } = fakeGit({
    shallow: "true",
    dates: { "src/routes/about.tsx": "2026-11-20T00:00:00Z" },
  });
  const dater = createGitDater({ run, log: (m) => logs.push(m) });
  assert.deepEqual(buildLastmodMap(ROUTE_FILES, dater), {});
  assert.equal(gitLastmod(["src/routes/about.tsx"], dater), undefined);
  assert.deepEqual(logs, [SHALLOW_MESSAGE]);
  assert.equal(SHALLOW_MESSAGE, "sitemap: shallow clone, git-based lastmod skipped");
  assert.equal(
    calls.filter((c) => c.startsWith("log ")).length,
    0,
    "no git log in a shallow clone",
  );
});

test("git unavailable: treated like a shallow clone", () => {
  const logs = [];
  const dater = createGitDater({ run: fakeGit({ fail: true }).run, log: (m) => logs.push(m) });
  assert.equal(gitLastmod(["src/routes/about.tsx"], dater), undefined);
  assert.deepEqual(logs, [SHALLOW_MESSAGE]);
});

test("an undated entry has no <lastmod> in sitemap.xml; element order follows the XSD", () => {
  const xml = buildSitemapXml(
    [
      { pattern: "/", path: "/", changefreq: "weekly", priority: "1.0" },
      { pattern: "/terms", path: "/terms", lastmod: "2026-08-27T01:25:04-04:00", priority: "0.3" },
    ],
    SITE,
  );
  assert.match(
    xml,
    /<url>\n {4}<loc>https:\/\/excaliburradon\.com\/<\/loc>\n {4}<changefreq>weekly<\/changefreq>/,
  );
  assert.match(
    xml,
    /<loc>https:\/\/excaliburradon\.com\/terms<\/loc>\n {4}<lastmod>2026-08-27T01:25:04-04:00<\/lastmod>\n {4}<priority>0\.3<\/priority>/,
  );
  assert.equal((xml.match(/<lastmod>/g) || []).length, 1);
});

test("no URL ever gets the build time", (t) => {
  // Freeze the clock at a moment no input uses; nothing may come out dated "now"
  const NOW = Date.UTC(2031, 6, 15, 12, 34, 56);
  mock.timers.enable({ apis: ["Date"], now: NOW });
  t.after(() => mock.timers.reset());
  const nowDay = new Date(NOW).toISOString().slice(0, 10);

  const shallow = createGitDater({ run: fakeGit({ shallow: "true" }).run, log: silent });
  const noDates = createGitDater({ run: fakeGit().run, log: silent });
  const failing = createGitDater({ run: fakeGit({ fail: true }).run, log: silent });
  const dated = createGitDater({
    run: fakeGit({ dates: { "src/routes/index.tsx": "2026-01-01T00:00:00Z" } }).run,
    log: silent,
  });
  const maps = [shallow, noDates, failing, dated].map((d) => buildLastmodMap(ROUTE_FILES, d));
  assert.deepEqual(maps, [{}, {}, {}, { "/": "2026-01-01T00:00:00Z" }]);
  assert.equal(gitLastmod([], dated), undefined);

  const entries = Object.keys(ROUTE_FILES).map((pattern) => ({
    pattern,
    path: pattern,
    lastmod: maps[3][pattern],
  }));
  const xml = buildSitemapXml(entries, SITE);
  assert.ok(!xml.includes(nowDay), "sitemap.xml contains the build date");
});

test("every sitemap entry's pattern is in the files map, and every mapped file exists", () => {
  const route = readFileSync(path.join(ROOT, "src/routes/sitemap[.]xml.ts"), "utf8");
  const literal = [...route.matchAll(/pattern: "([^"]+)"/g)].map((m) => m[1]);
  const viaRoutes = [...route.matchAll(/pattern: ROUTES\.(\w+)\.path/g)].map(
    (m) => ROUTES[m[1]].path,
  );
  const patterns = new Set([...literal, ...viaRoutes]);
  assert.ok(patterns.size >= 12, `found ${patterns.size} patterns in the sitemap route`);
  assert.deepEqual([...patterns].sort(), Object.keys(ROUTE_FILES).sort());

  for (const [pattern, files] of Object.entries(ROUTE_FILES)) {
    assert.ok(files.length, `${pattern} has files`);
    for (const f of files) assert.ok(existsSync(path.join(ROOT, f)), `${pattern}: ${f} exists`);
  }
});
