// sitemap.xml <lastmod> for pages without a content date: the last git commit date of the files that make up the
// page (scripts/lib/lastmod-files.mjs lists them). git is passed in as `run`, so the logic can be tested without a
// repo. Never uses the build time: a page with no date gets no <lastmod>.
//
// Runs at BUILD time (scripts/generate-lastmod.mjs). The sitemap itself is a request-time server route, where git
// isn't available, so it reads the result from src/generated/lastmod.json.

export const SHALLOW_MESSAGE = "sitemap: shallow clone, git-based lastmod skipped";

const W3C_DATE = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:\d{2}))?$/;

/** The value if it is a W3C Datetime (a valid sitemap <lastmod>), otherwise undefined */
export const toLastmod = (value) =>
  typeof value === "string" && W3C_DATE.test(value.trim()) ? value.trim() : undefined;

/** The newest valid date in the list, kept as written, or undefined */
export function newestDate(values) {
  let best;
  let bestTime = -Infinity;
  for (const v of values) {
    const d = toLastmod(v);
    if (!d) continue;
    const t = Date.parse(d);
    if (Number.isFinite(t) && t > bestTime) {
      best = d;
      bestTime = t;
    }
  }
  return best;
}

/**
 * Commit dates per file, cached (git runs once per file). `run(args)` runs git and returns its stdout, or throws.
 * In a shallow clone, or without git, every date is undefined: the newest commit there is only the clone's tip,
 * which would date every file to the latest deploy.
 */
export function createGitDater({ run, log = console.log }) {
  let enabled;
  const cache = new Map();
  const isEnabled = () => {
    if (enabled === undefined) {
      try {
        enabled = String(run(["rev-parse", "--is-shallow-repository"])).trim() !== "true";
      } catch {
        enabled = false;
      }
      if (!enabled) log(SHALLOW_MESSAGE);
    }
    return enabled;
  };
  return {
    get enabled() {
      return isEnabled();
    },
    dateOf(file) {
      if (!isEnabled()) return undefined;
      if (!cache.has(file)) {
        let date;
        try {
          date = String(run(["log", "-1", "--format=%cI", "--", file])).trim() || undefined;
        } catch {
          date = undefined;
        }
        cache.set(file, date);
      }
      return cache.get(file);
    },
  };
}

/** The newest commit date across the files, or undefined */
export function gitLastmod(files, dater) {
  if (!files?.length || !dater.enabled) return undefined;
  return newestDate(files.map((f) => dater.dateOf(f)));
}

/** { routePattern: date } for every pattern in `routeFiles` that has a date; undated patterns are left out */
export function buildLastmodMap(routeFiles, dater) {
  const out = {};
  for (const [pattern, files] of Object.entries(routeFiles)) {
    const date = gitLastmod(files, dater);
    if (date) out[pattern] = date;
  }
  return out;
}
