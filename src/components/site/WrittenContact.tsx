import { Link } from "@tanstack/react-router";
import { business } from "@/lib/site-data";

/**
 * The written-contact clause used by the legal pages, in both states.
 *
 * These pages promise the reader a way to make a privacy, records, or
 * accessibility request, so the fallback cannot be "nothing" - it has to be a
 * channel that still produces a written record. The contact form is that
 * channel until a real inbox is confirmed.
 *
 * Hiding only the link would leave "Questions? Email ." on the page, so the
 * whole clause swaps, not just the address. Renders as an inline fragment so
 * the surrounding sentence reads naturally either way, and takes the caller's
 * className so the link styling is untouched.
 *
 * When business.email stops being null this collapses to the mailto branch with
 * no edit at any call site.
 */
export function WrittenContact({ linkClassName }: { linkClassName: string }) {
  if (business.email) {
    return (
      <>
        email{" "}
        <a href={`mailto:${business.email}`} className={linkClassName}>
          {business.email}
        </a>
      </>
    );
  }

  return (
    <>
      send us a message through{" "}
      <Link to="/contact" className={linkClassName}>
        our contact form
      </Link>
    </>
  );
}
