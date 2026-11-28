// Route pattern -> the files whose last git commit dates that page in sitemap.xml.
//
// Each entry is the page's route file plus the content files it reads. Site-wide files (lib/seo.ts,
// routes/__root.tsx, components/site/PageHero.tsx, ...) are deliberately left out, and so is lib/site-data.ts for
// pages that only read `business` from it, so a phone-number edit doesn't re-date every page.
//
// Keys must match the `pattern` of each entry in src/routes/sitemap[.]xml.ts (scripts/tests checks this). When a
// page starts reading a new content file, add it here.

const SITE_DATA = "src/lib/site-data.ts";
const AREA_CONTENT = "src/lib/service-area-content.ts";
const SERVICE_LAYOUT = "src/components/site/ServicePageLayout.tsx";

export const ROUTE_FILES = {
  "/": ["src/routes/index.tsx", SITE_DATA],
  "/services": ["src/routes/services.index.tsx", SITE_DATA, AREA_CONTENT],
  "/services/radon-mitigation": [
    "src/routes/services.radon-mitigation.tsx",
    SERVICE_LAYOUT,
    SITE_DATA,
  ],
  "/services/radon-testing": ["src/routes/services.radon-testing.tsx", SERVICE_LAYOUT, SITE_DATA],
  "/service-areas": ["src/routes/service-areas.index.tsx", SITE_DATA, AREA_CONTENT],
  // Every city page shares these files, so all of them carry the same date.
  "/service-areas/$city": ["src/routes/service-areas.$city.tsx", SITE_DATA, AREA_CONTENT],
  "/about": ["src/routes/about.tsx", SITE_DATA],
  "/contact": ["src/routes/contact.tsx"],
  "/faqs": ["src/routes/faqs.tsx", SITE_DATA],
  "/privacy-policy": ["src/routes/privacy-policy.tsx"],
  "/accessibility": ["src/routes/accessibility.tsx"],
  "/terms": ["src/routes/terms.tsx"],
};
