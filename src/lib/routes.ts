/*
 * Single source of truth for URLs and breadcrumb trails.
 *
 * Before this existed, every page restated its own path five or six times (the
 * createFileRoute id, pageMeta, canonical, pageGraph, the crumbs array in
 * head(), the crumbs array in JSX, and ServicePageLayout's `path` prop). Sixty-
 * odd literals with no compiler check between them, and two of the consumers
 * fail *silently* when they drift: ServicePageLayout filters its own self-link
 * by string equality, and crumb paths are only read by the JSON-LD builder, so a
 * stale one produces a wrong BreadcrumbList with no visible symptom.
 *
 * This file owns paths and trails. It deliberately does NOT own titles and
 * descriptions - those are page copy and belong next to the content they
 * describe, in the route file.
 *
 * The `path` of every route below must match its createFileRoute id exactly.
 * That pairing is the one thing still not machine-checked, so the route files
 * import from here rather than retyping the string.
 */

export type Crumb = { name: string; path: string };

const SERVICES = "/services";
const SERVICE_AREAS = "/service-areas";
const BLOG = "/blog";

/** Crumb trails never include Home - PageHero and pageGraph both prepend it. */
const servicesCrumb: Crumb = { name: "Services", path: SERVICES };
const serviceAreasCrumb: Crumb = { name: "Service Areas", path: SERVICE_AREAS };

export const ROUTES = {
  home: { path: "/", crumbs: [] as Crumb[] },

  services: {
    path: SERVICES,
    crumbs: [servicesCrumb],
  },
  radonMitigation: {
    path: `${SERVICES}/radon-mitigation`,
    crumbs: [servicesCrumb, { name: "Radon Mitigation", path: `${SERVICES}/radon-mitigation` }],
  },
  radonTesting: {
    path: `${SERVICES}/radon-testing`,
    crumbs: [servicesCrumb, { name: "Radon Testing", path: `${SERVICES}/radon-testing` }],
  },

  serviceAreas: {
    path: SERVICE_AREAS,
    crumbs: [serviceAreasCrumb],
  },

  about: { path: "/about", crumbs: [{ name: "About", path: "/about" }] },
  contact: { path: "/contact", crumbs: [{ name: "Contact", path: "/contact" }] },
  faqs: { path: "/faqs", crumbs: [{ name: "FAQs", path: "/faqs" }] },
  /* UNLISTED, not retired. /blog and its posts still return 200 and still work,
     but they are deliberately absent from mainNav, footerNav, the sitemap and
     every inbound link, and they carry `noindex, follow`. Kept live so the five
     posts survive and the section can be restored without rebuilding it.

     To bring it back: re-add a Blog entry to mainNav/footerNav, drop the
     `noindex: true` in blog.index.tsx and blog.$slug.tsx, and restore the /blog
     entries in sitemap[.]xml.ts. */
  blog: { path: BLOG, crumbs: [{ name: "Blog", path: BLOG }] },
  privacyPolicy: {
    path: "/privacy-policy",
    crumbs: [{ name: "Privacy Policy", path: "/privacy-policy" }],
  },
  terms: { path: "/terms", crumbs: [{ name: "Terms", path: "/terms" }] },
  accessibility: {
    path: "/accessibility",
    crumbs: [{ name: "Accessibility", path: "/accessibility" }],
  },
} as const;

/*
 * Dynamic segments can't live in ROUTES as literals, so they get builders. Both
 * return the same shape the static entries do, which keeps every head() block
 * reading identically whether its path is fixed or derived.
 */

export function cityPath(slug: string) {
  return `${SERVICE_AREAS}/${slug}`;
}

/** Crumb label is the city's display name, never its slug. */
export function cityCrumbs(slug: string, name: string): Crumb[] {
  return [serviceAreasCrumb, { name, path: cityPath(slug) }];
}

export function blogPostPath(slug: string) {
  return `${BLOG}/${slug}`;
}

export function blogPostCrumbs(slug: string, title: string): Crumb[] {
  return [
    { name: "Blog", path: BLOG },
    { name: title, path: blogPostPath(slug) },
  ];
}

/*
 * Paths that no longer render anything but must keep resolving, because they
 * were live URLs. Each is a 301 stub route file; this map is what those files
 * and the sitemap agree on, so a retired path can never be re-listed by mistake.
 *
 * The three hashed entries were five service pages consolidated into two - the
 * hash must keep matching sectionAnchorId() output in ServicePageLayout.
 */
export const RETIRED_PATHS = {
  "/residential-mitigation": { to: ROUTES.radonMitigation.path },
  "/radon-testing": { to: ROUTES.radonTesting.path },
  "/commercial-mitigation": {
    to: ROUTES.radonMitigation.path,
    hash: "commercial-and-multi-family-buildings",
  },
  "/new-construction": {
    to: ROUTES.radonMitigation.path,
    hash: "building-the-system-in-during-new-construction",
  },
  "/real-estate-services": {
    to: ROUTES.radonMitigation.path,
    hash: "radon-mitigation-on-a-real-estate-deadline",
  },
} as const;

/*
 * Strict union of every static path. NavItem.to uses this, so a typo'd or
 * retired nav link is a build error rather than a runtime 404 - the previous
 * `to: string` typing caught neither. Dynamic paths (city, blog post) are built
 * by the helpers above and are intentionally NOT assignable here, because
 * nothing in the nav should ever point at one.
 */
export type AppPath = (typeof ROUTES)[keyof typeof ROUTES]["path"];
