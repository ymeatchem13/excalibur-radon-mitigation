import { business, serviceAreas, SITE_URL } from "./site-data";

/** Turns a route path like "/about" into a full absolute URL. */
export function absoluteUrl(path: string) {
  return `${SITE_URL}${path}`;
}

export function pageMeta({
  title,
  description,
  path,
  type = "website",
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  type?: string;
  /**
   * Keeps a page reachable but out of search. Emits `noindex, follow` rather
   * than a bare `noindex`, so links on the page still pass signal to the pages
   * that are indexed.
   *
   * Do NOT pair this with a robots.txt Disallow. Blocking the crawl prevents
   * Google from ever reading this tag, which is how pages get stuck in the
   * index with no snippet instead of dropping out of it.
   */
  noindex?: boolean;
}) {
  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: absoluteUrl(path) },
    // twitter:card is set once in __root.tsx, so don't duplicate it per page.
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    ...(noindex ? [{ name: "robots", content: "noindex, follow" }] : []),
  ];
}

export function canonical(path: string) {
  return [{ rel: "canonical", href: absoluteUrl(path) }];
}

/*
 * Structured data is modelled as ONE connected graph rather than a pile of
 * independent blobs. Site-level entities (Organization, WebSite) are defined
 * exactly once, in __root.tsx, and every page-level node points at them by @id.
 * @id references resolve across separate <script> tags, so pages never restate
 * the business - which is what previously produced three unreconciled copies of
 * it (an anonymous Service.provider and an anonymous Article.author).
 */

export const ORG_ID = `${SITE_URL}/#organization`;
export const SITE_ID = `${SITE_URL}/#website`;

/** A bare @id reference. Use everywhere the org is mentioned but not defined. */
const orgRef = { "@id": ORG_ID };

/**
 * A HomeAndConstructionBusiness, not a bare Organization: there is now a real,
 * occupied address, which is exactly what a LocalBusiness subtype presupposes.
 * HomeAndConstructionBusiness is the closest honest fit - its siblings are
 * Plumber, HVACBusiness and RoofingContractor, none of which describe radon
 * work. Do not narrow further.
 *
 * CAVEAT, read before editing: the address is asserted here and rendered
 * NOWHERE on the site. Google's structured-data guidelines ask that marked-up
 * content be visible to readers, so this is a deliberate, accepted deviation.
 * It was taken because the visible copy's "we come to you, no walk-in office"
 * framing is the accurate description of a service-area business, and because
 * the address matches the Google Business Profile for NAP consistency. If that
 * trade stops being acceptable, the fix is a visible address line - not a
 * removal here.
 *
 * `email` is a conditional spread because business.email is null until a real
 * inbox is confirmed; a placeholder must never reach the graph. `openingHours`
 * and `priceRange` are absent for the same reason - the hours are unconfirmed
 * and there is no price list. Both are Google-recommended rather than required,
 * so their absence is a warning in the Rich Results Test, never an error.
 * priceRange in particular must stay out: the FAQ is explicit that the ranges
 * it quotes are the EPA's and other companies', not ours.
 *
 * Still absent on purpose: aggregateRating/review. There is no review data
 * anywhere on this site, and inventing it is a manual-action risk.
 */
export const organizationNode = {
  "@type": "HomeAndConstructionBusiness",
  "@id": ORG_ID,
  name: business.name,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/web-app-manifest-512x512.png`,
    width: 512,
    height: 512,
  },
  image: `${SITE_URL}/og-image.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: business.address.streetAddress,
    addressLocality: business.address.addressLocality,
    addressRegion: business.address.addressRegion,
    postalCode: business.address.postalCode,
    addressCountry: business.address.addressCountry,
  },
  hasMap: business.mapUrl,
  sameAs: business.sameAs,
  ...(business.email ? { email: business.email } : {}),
  // Derived, not restated: a literal here would be a third copy of the number
  // and could silently drift from the tel: link. Yields E.164, which is what
  // Google expects for `telephone`.
  telephone: business.phoneHref.replace(/^tel:/, ""),
  description:
    "Radon testing and radon mitigation systems for homes and commercial buildings throughout Greater Cincinnati and Northern Kentucky, installed to current EPA guidance.",
  knowsAbout: [
    "Radon testing",
    "Radon mitigation",
    "Sub-slab depressurization",
    "Radon-resistant new construction",
    "Indoor air quality",
  ],
  areaServed: serviceAreas.map((area) => ({
    "@type": area.region ? "AdministrativeArea" : "City",
    name: `${area.name}, ${area.state}`,
  })),
};

export const webSiteNode = {
  "@type": "WebSite",
  "@id": SITE_ID,
  url: SITE_URL,
  name: business.name,
  inLanguage: "en-US",
  publisher: orgRef,
};

/** The site-level graph. Emitted once, from the root route. */
export const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [organizationNode, webSiteNode],
};

type Crumb = { name: string; path: string };

type PageType =
  | "WebPage"
  | "AboutPage"
  | "ContactPage"
  | "CollectionPage"
  | "FAQPage";

export function faqSchema(items: { q: string; a: string }[]) {
  return items.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  }));
}

/**
 * Builds the page-level graph. Every node here either links up to the site-level
 * entities by @id or is anchored to this page's URL, so nothing dangles.
 */
export function pageGraph({
  path,
  name,
  description,
  type = "WebPage",
  crumbs = [],
  primaryImage,
  faqs,
  service,
  article,
  itemList,
}: {
  path: string;
  name: string;
  description: string;
  type?: PageType;
  /** Same array passed to PageHero, so the visible trail and the markup cannot drift. */
  // readonly: ROUTES in lib/routes.ts is `as const`, so its crumb trails are
  // readonly tuples. This only reads the array, so accepting them costs nothing.
  crumbs?: readonly Crumb[];
  primaryImage?: string;
  faqs?: { q: string; a: string }[];
  /**
   * `areaServed` narrows the Service node to specific places. City pages pass
   * their own single area, which is the honest claim for that URL; omitting it
   * falls back to the full sitewide list.
   */
  service?: { name: string; description: string; areaServed?: unknown[] };
  article?: { headline: string; datePublished: string; image?: string };
  itemList?: { name: string; url?: string }[];
}) {
  const url = absoluteUrl(path);
  const pageId = `${url}#webpage`;
  const breadcrumbId = `${url}#breadcrumb`;
  const graph: Record<string, unknown>[] = [];

  // Home has no trail above it, so it gets no BreadcrumbList.
  const hasCrumbs = crumbs.length > 0;
  if (hasCrumbs) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": breadcrumbId,
      itemListElement: [{ name: "Home", path: "/" }, ...crumbs].map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: absoluteUrl(c.path),
      })),
    });
  }

  // Built in one expression rather than mutated: tsconfig sets
  // noPropertyAccessFromIndexSignature, so dot-assigning onto a Record is an error.
  // A blog post's primary node is the BlogPosting itself; everything else gets a
  // WebPage (or the closer subtype).
  graph.unshift({
    "@type": article ? "WebPage" : type,
    "@id": pageId,
    url,
    name,
    description,
    isPartOf: { "@id": SITE_ID },
    about: orgRef,
    inLanguage: "en-US",
    ...(primaryImage
      ? { primaryImageOfPage: { "@type": "ImageObject", url: primaryImage } }
      : {}),
    ...(hasCrumbs ? { breadcrumb: { "@id": breadcrumbId } } : {}),
    ...(faqs ? { mainEntity: faqSchema(faqs) } : {}),
  });

  if (service) {
    graph.push({
      "@type": "Service",
      "@id": `${url}#service`,
      name: service.name,
      description: service.description,
      url,
      serviceType: service.name,
      provider: orgRef,
      // The real 13-entry list, not a single hardcoded city - unless the caller
      // scopes it, which the per-city pages do.
      areaServed: service.areaServed ?? organizationNode.areaServed,
      mainEntityOfPage: { "@id": pageId },
    });
  }

  if (article) {
    graph.push({
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      headline: article.headline,
      description,
      url,
      datePublished: article.datePublished,
      // No dateModified: there is no such data, and stamping one would be the
      // same fabricated-freshness signal the sitemap deliberately avoids.
      ...(article.image ? { image: article.image } : {}),
      author: orgRef,
      publisher: orgRef,
      // Points at the WebSite, not at /blog#webpage: that node is only defined on
      // the blog index's own URL, so referencing it from a post page dangles.
      isPartOf: { "@id": SITE_ID },
      mainEntityOfPage: { "@id": pageId },
    });
  }

  if (itemList) {
    graph.push({
      "@type": "ItemList",
      "@id": `${url}#list`,
      itemListElement: itemList.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        ...(item.url ? { url: item.url } : {}),
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

export function ldScript(data: unknown) {
  return { type: "application/ld+json", children: JSON.stringify(data) };
}
