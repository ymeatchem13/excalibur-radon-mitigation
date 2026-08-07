import type { ReactNode } from "react";
import { business } from "@/lib/site-data";
import { trackEvent, currentPath } from "@/lib/analytics";

/* Every call-to-action on the site that dials the phone. For a home services
   business this is very likely the majority of conversions, so it is the one
   interaction that most needs to be measurable.

   The union is closed rather than a plain string: these values become the
   `link_location` dimension in GA4, and a typo would appear there as a new
   location with a plausible-looking name, splitting the numbers for a CTA
   without ever looking wrong in a report. Add a member when adding a CTA. */
type CallLocation =
  "header" | "mobile_bar" | "page_hero" | "footer" | "home_hero" | "home_bottom" | "contact";

type CallLinkProps = {
  location: CallLocation;
  className?: string;
  children: ReactNode;
};

/**
 * A `tel:` link that reports the click to GA4.
 *
 * Prefer this over a hand-written anchor anywhere the number is dialable. It
 * reads `business.phoneHref` itself, so call sites cannot drift from the
 * canonical number in site-data.ts.
 */
export function CallLink({ location, className, children }: CallLinkProps) {
  return (
    <a
      href={business.phoneHref}
      className={className}
      /* Fire-and-forget, before the dialer takes over. gtag keeps its own send
         queue and uses sendBeacon, so the request survives the tab losing
         focus - there is no need to delay navigation to wait for it, and doing
         so would put a measurement concern in front of a customer's phone
         call. */
      onClick={() => {
        trackEvent("phone_call_click", {
          link_location: location,
          page_path: currentPath(),
        });
      }}
    >
      {children}
    </a>
  );
}
