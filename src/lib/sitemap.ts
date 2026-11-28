/*
 * sitemap.xml serializer. Deliberately import-free (no `@/` aliases) so the node
 * tests in scripts/tests can load it directly.
 */

export interface SitemapEntry {
  /** Route pattern, the key into src/generated/lastmod.json (e.g. "/service-areas/$city"). */
  pattern: string;
  path: string;
  /** Omitted unless a real date exists. Never the build time. */
  lastmod?: string | undefined;
  changefreq?: "daily" | "weekly" | "monthly" | "yearly";
  priority?: string;
}

const escapeXml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function buildSitemapXml(entries: SitemapEntry[], baseUrl: string): string {
  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${escapeXml(`${baseUrl}${e.path}`)}</loc>`,
      // Element order is fixed by the sitemap XSD: loc, lastmod, changefreq,
      // priority. Do not reorder.
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
}
