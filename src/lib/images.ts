import type { DetailedHTMLProps, LinkHTMLAttributes } from "react";

// Netlify Image CDN wrappers.
//
// Netlify serves /.netlify/images as a resize-and-recode proxy: it fetches the
// origin image, transcodes it, and caches the variant at the edge. That buys two
// things Lighthouse cares about on mobile:
//
//   1. Responsive sizes. The hero art is 2000px wide; a 390px phone was
//      downloading all of it (445 KB) as the LCP element.
//   2. Same-origin delivery for the Unsplash banners. The browser now asks THIS
//      origin, so the DNS + TLS handshake to images.unsplash.com leaves the
//      critical path on all 13 inner pages. Remote sources must be allowlisted
//      in netlify.toml under [images] remote_images, or the CDN returns 400.

/**
 * Widths for full-bleed (100vw) hero art. Enough steps to keep every common
 * phone/tablet/laptop within ~1.25x of its ideal width, without splitting the
 * edge cache so far that first hits routinely miss.
 *
 * The 800 step exists for one specific case: a 412px-wide phone at DPR 1.75 -
 * which is exactly what Lighthouse emulates - needs ~721px, and without it the
 * browser rounds up to 960 and pulls ~40% more bytes than the screen can show.
 */
export const HERO_WIDTHS = [640, 800, 960, 1280, 1920] as const;

/**
 * Quality for photos sitting under one of the heavy navy scrims (the homepage
 * hero, the PageHero banner, the CtaBand). The gradient hides the artifacts that
 * would be obvious on a bare photo, so these can go well below the default.
 *
 * Deliberately NOT the module default: radon-diagram.jpg is a line illustration
 * where AVIF at this quality smears the thin strokes.
 */
export const SCRIM_QUALITY = 48;

type Fmt = "avif" | "webp" | "jpg";

/**
 * A single Netlify Image CDN URL.
 *
 * Returns `src` untouched outside production: /.netlify/images only exists on a
 * Netlify deploy, so under plain `npm run dev` (Vite, no Netlify proxy) every
 * transformed URL would 404 and the site would render with broken images.
 *
 * `q` defaults to 60 because the hero photos all sit under a heavy navy scrim -
 * the gradient hides the artifacts that would show on a bare photo.
 */
export function cdnImage(src: string, width: number, fmt: Fmt, q = 60): string {
  if (!import.meta.env.PROD) return src;
  // URLSearchParams, not string concatenation: `src` may itself be an absolute
  // URL carrying a query string (the Unsplash banners do), and that has to be
  // percent-encoded into the `url` parameter rather than merged into ours.
  const params = new URLSearchParams({
    url: src,
    w: String(width),
    fm: fmt,
    q: String(q),
  });
  return `/.netlify/images?${params.toString()}`;
}

/**
 * A `srcSet` string across `widths`.
 *
 * Empty outside production, which is deliberate: an empty srcSet makes the
 * browser fall back to the element's plain `src`, so dev shows the original
 * asset instead of a broken image.
 */
export function cdnSrcSet(src: string, widths: readonly number[], fmt: Fmt, q = 60): string {
  if (!import.meta.env.PROD) return "";
  return widths.map((w) => `${cdnImage(src, w, fmt, q)} ${w}w`).join(", ");
}

/**
 * A `rel=preload` entry for a full-bleed AVIF hero, ready to spread into a
 * route's `head().links`.
 *
 * Returns a one-element array in production and an empty one in dev, because
 * without the CDN there is no srcSet to preload and a `<link rel=preload>`
 * carrying an empty imagesrcset is an console-warning no-op.
 *
 * The values here have to match the corresponding <source> exactly - a preload
 * that does not match is not a no-op, it is a second full download of the
 * largest image on the page. `q` is a parameter for exactly that reason: the
 * scrimmed heroes render at SCRIM_QUALITY, and a preload left on the default 60
 * would build a different set of URLs and double-fetch the LCP image.
 */
export function cdnHeroPreload(
  src: string,
  widths: readonly number[] = HERO_WIDTHS,
  q = 60,
  // Annotated rather than inferred: without it TS widens fetchPriority to
  // `string`, which no longer satisfies the `"high" | "low" | "auto"` union that
  // a route's head().links expects.
): DetailedHTMLProps<LinkHTMLAttributes<HTMLLinkElement>, HTMLLinkElement>[] {
  if (!import.meta.env.PROD) return [];
  return [
    {
      rel: "preload",
      as: "image",
      type: "image/avif",
      imageSrcSet: cdnSrcSet(src, widths, "avif", q),
      imageSizes: "100vw",
      fetchPriority: "high",
    },
  ];
}
