import { cdnImage, cdnSrcSet, HERO_WIDTHS } from "@/lib/images";

/**
 * A photo served through the Netlify Image CDN as responsive AVIF, with a WebP
 * step and a CDN-resized JPEG at the bottom.
 *
 * The three-format ladder is what makes this safe to use everywhere: AVIF covers
 * current browsers, WebP catches pre-16 Safari, and the plain <img> is the last
 * resort - and even that resort is resized, so no browser ever receives the
 * multi-hundred-KB original.
 *
 * `width`/`height` are required rather than optional on purpose. They are the
 * intrinsic aspect ratio the browser reserves space with, and they are the only
 * reason this site's CLS is 0; an image swapped in without them would quietly
 * cost more score than the format saved.
 */
export function CdnImage({
  src,
  alt,
  width,
  height,
  className,
  widths = HERO_WIDTHS,
  sizes = "100vw",
  quality,
  fallbackWidth = 1280,
  priority = false,
}: {
  src: string;
  /** Empty string marks the image as decorative, same as a bare <img>. */
  alt: string;
  width: number;
  height: number;
  className?: string;
  /** srcSet steps. Cap these at the widest the element actually renders. */
  widths?: readonly number[];
  sizes?: string;
  quality?: number;
  /** Width of the non-AVIF/WebP fallback. Deliberately mid-range, not the largest step. */
  fallbackWidth?: number;
  /**
   * True only for an above-the-fold LCP candidate. Everything else stays lazy -
   * marking several images high priority splits early bandwidth and delays the
   * one that actually determines LCP.
   */
  priority?: boolean;
}) {
  return (
    // `contents` so the wrapper generates no box: several call sites position the
    // <img> absolutely against an ancestor, and a stray inline box would be free
    // to open a line box there.
    <picture className="contents">
      <source type="image/avif" sizes={sizes} srcSet={cdnSrcSet(src, widths, "avif", quality)} />
      <source type="image/webp" sizes={sizes} srcSet={cdnSrcSet(src, widths, "webp", quality)} />
      <img
        src={cdnImage(src, fallbackWidth, "jpg", quality)}
        alt={alt}
        width={width}
        height={height}
        {...(priority ? { fetchPriority: "high" as const } : { loading: "lazy" as const })}
        {...(className === undefined ? {} : { className })}
      />
    </picture>
  );
}
