import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { serviceAreaContent } from "@/lib/service-area-content";
import { serviceAreas, SITE_URL } from "@/lib/site-data";
import { cityPath, ROUTES } from "@/lib/routes";
import { buildSitemapXml, type SitemapEntry } from "@/lib/sitemap";

// <loc> must be an absolute URL. Google rejects sitemaps with relative paths.
const BASE_URL = SITE_URL;

// <lastmod> dates, computed at BUILD time by scripts/generate-lastmod.mjs from the
// last git commit of each page's files (map: scripts/lib/lastmod-files.mjs). This
// route runs at request time, where git isn't available, so it only reads them.
//
// Loaded through import.meta.glob rather than a plain import because the file is
// generated and gitignored: a build that skips `npm run build` (the Lovable
// sandbox, `vite dev`) has no file, and the glob then yields {} instead of failing
// the build. An entry with no date simply has no <lastmod>. Never stamp a URL with
// `new Date()`: a sitemap that looks freshly updated on every build is one Google
// learns to distrust and then ignores site-wide.
const generated = import.meta.glob<Record<string, string>>("../generated/lastmod.json", {
  eager: true,
  import: "default",
});
const LASTMOD: Record<string, string> = Object.values(generated)[0] ?? {};

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: Omit<SitemapEntry, "lastmod">[] = [
          { pattern: "/", path: "/", changefreq: "weekly", priority: "1.0" },
          {
            pattern: ROUTES.services.path,
            path: ROUTES.services.path,
            changefreq: "monthly",
            priority: "0.8",
          },
          {
            pattern: ROUTES.radonMitigation.path,
            path: ROUTES.radonMitigation.path,
            changefreq: "monthly",
            priority: "0.9",
          },
          {
            pattern: ROUTES.radonTesting.path,
            path: ROUTES.radonTesting.path,
            changefreq: "monthly",
            priority: "0.9",
          },
          // Every key of RETIRED_PATHS is deliberately absent: those paths 301
          // now, and listing redirecting URLs in a sitemap is a Search Console
          // warning, not a ranking signal. That covers the old flat service URLs
          // as well as the three pages folded into /services/radon-mitigation.
          {
            pattern: ROUTES.serviceAreas.path,
            path: ROUTES.serviceAreas.path,
            changefreq: "monthly",
            priority: "0.8",
          },
          // Spread rather than listed by hand, so adding a 14th community cannot
          // silently miss the sitemap. Filtered on serviceAreaContent because an
          // area without copy has no page - the $city loader throws notFound for
          // it, and a sitemap entry for a 404 is worse than no entry.
          ...serviceAreas
            .filter((area) => serviceAreaContent[area.slug])
            .map((area) => ({
              pattern: "/service-areas/$city",
              path: cityPath(area.slug),
              changefreq: "monthly" as const,
              priority: "0.6",
            })),
          { pattern: "/about", path: "/about", changefreq: "yearly", priority: "0.6" },
          { pattern: "/contact", path: "/contact", changefreq: "yearly", priority: "0.8" },
          { pattern: "/faqs", path: "/faqs", changefreq: "monthly", priority: "0.7" },
          // /blog and its posts are deliberately absent: the section is unlisted
          // and carries `noindex, follow`. Listing a noindexed URL here asks
          // Google to crawl something it is then told to drop. Restore these
          // alongside the nav entries if the blog comes back (and date them by
          // each post's own date, not git).
          {
            pattern: "/privacy-policy",
            path: "/privacy-policy",
            changefreq: "yearly",
            priority: "0.3",
          },
          {
            pattern: ROUTES.accessibility.path,
            path: ROUTES.accessibility.path,
            changefreq: "yearly",
            priority: "0.3",
          },
          { pattern: "/terms", path: "/terms", changefreq: "yearly", priority: "0.3" },
        ];

        const xml = buildSitemapXml(
          entries.map((e) => ({ ...e, lastmod: LASTMOD[e.pattern] })),
          BASE_URL,
        );

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
