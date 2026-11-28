// Build step (runs before `vite build`, see package.json): writes src/generated/lastmod.json, the <lastmod> dates
// the request-time sitemap route reads. Dates come from git; in a shallow clone or without git the file is written
// empty and the sitemap carries no <lastmod> at all (never the build time).
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildLastmodMap, createGitDater } from "./lib/gitLastmod.mjs";
import { ROUTE_FILES } from "./lib/lastmod-files.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "src/generated/lastmod.json");

const dater = createGitDater({
  run: (args) =>
    execFileSync("git", args, { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }),
});
const dates = buildLastmodMap(ROUTE_FILES, dater);

mkdirSync(path.dirname(OUT), { recursive: true });
writeFileSync(OUT, `${JSON.stringify(dates, null, 2)}\n`);

const total = Object.keys(ROUTE_FILES).length;
console.log(`sitemap: ${Object.keys(dates).length} of ${total} route patterns have a git lastmod`);
