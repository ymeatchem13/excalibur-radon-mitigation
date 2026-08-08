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
 * Widths for full-bleed (100vw) hero art. Four steps is enough to keep every
 * common phone/tablet/laptop within ~1.3x of its ideal width; more variants just
 * splits the edge cache and makes first hits likelier to miss.
 */
export const HERO_WIDTHS = [640, 960, 1280, 1920] as const;

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
 * largest image on the page.
 */
export function cdnHeroPreload(
  src: string,
  widths: readonly number[] = HERO_WIDTHS,
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
      imageSrcSet: cdnSrcSet(src, widths, "avif"),
      imageSizes: "100vw",
      fetchPriority: "high",
    },
  ];
}
