import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { serviceAreaContent } from "@/lib/service-area-content";
import { blogPosts, serviceAreas, SITE_URL } from "@/lib/site-data";
import { cityPath, ROUTES } from "@/lib/routes";

// <loc> must be an absolute URL. Google rejects sitemaps with relative paths.
const BASE_URL = SITE_URL;

interface SitemapEntry {
  path: string;
  /** Omitted unless a real date exists. See the note above `latestPostDate`. */
  lastmod?: string;
  changefreq?: "daily" | "weekly" | "monthly" | "yearly";
  priority?: string;
}

// lastmod is emitted only for pages backed by a real publication date. Stamping
// every static page with `new Date()` would make the whole file look freshly
// updated on each build, which Google learns to distrust and then ignores
// site-wide. blogPosts[].date is already YYYY-MM-DD, a valid W3C Datetime.
//
// STILL IN USE despite the blog being unlisted: this is the only real lastmod on
// the homepage entry below, since every other static page deliberately has none.
// It also cannot tolerate an empty blogPosts - the `[0]!` runs at module scope,
// so emptying that array throws on import and makes this whole route 500.
const latestPostDate = blogPosts.reduce((a, p) => (p.date > a ? p.date : a), blogPosts[0]!.date);

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", lastmod: latestPostDate, changefreq: "weekly", priority: "1.0" },
          { path: ROUTES.services.path, changefreq: "monthly", priority: "0.8" },
          { path: ROUTES.radonMitigation.path, changefreq: "monthly", priority: "0.9" },
          { path: ROUTES.radonTesting.path, changefreq: "monthly", priority: "0.9" },
          // Every key of RETIRED_PATHS is deliberately absent: those paths 301
          // now, and listing redirecting URLs in a sitemap is a Search Console
          // warning, not a ranking signal. That covers the old flat service URLs
          // as well as the three pages folded into /services/radon-mitigation.
          { path: ROUTES.serviceAreas.path, changefreq: "monthly", priority: "0.8" },
          // Spread rather than listed by hand, so adding a 14th community cannot
          // silently miss the sitemap. Filtered on serviceAreaContent because an
          // area without copy has no page - the $city loader throws notFound for
          // it, and a sitemap entry for a 404 is worse than no entry.
          ...serviceAreas
            .filter((area) => serviceAreaContent[area.slug])
            .map<SitemapEntry>((area) => ({
              path: cityPath(area.slug),
              changefreq: "monthly",
              priority: "0.6",
            })),
          { path: "/about", changefreq: "yearly", priority: "0.6" },
          { path: "/contact", changefreq: "yearly", priority: "0.8" },
          { path: "/faqs", changefreq: "monthly", priority: "0.7" },
          // /blog and its posts are deliberately absent: the section is unlisted
          // and carries `noindex, follow`. Listing a noindexed URL here asks
          // Google to crawl something it is then told to drop. Restore these
          // alongside the nav entries if the blog comes back.
          { path: "/privacy-policy", changefreq: "yearly", priority: "0.3" },
          { path: ROUTES.accessibility.path, changefreq: "yearly", priority: "0.3" },
          { path: "/terms", changefreq: "yearly", priority: "0.3" },
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            // Element order is fixed by the sitemap XSD: loc, lastmod,
            // changefreq, priority. Do not reorder.
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

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
