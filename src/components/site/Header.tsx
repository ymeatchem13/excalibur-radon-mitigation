import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Phone, ChevronDown } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ROUTES } from "@/lib/routes";
import { business, mainNav, serviceNav } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import logoUrl from "@/assets/excalibur-radon-logo.webp";

/* Home renders before the Services dropdown, so mainNav can't be mapped as a
   single list. Split it once here and reuse in both the desktop nav and the
   mobile sheet. */
// Indexed rather than destructured: array destructuring does not narrow, so
// `const [homeNav] = mainNav` types homeNav as possibly undefined and every use
// of it becomes a TS18048 error.
const homeNav = mainNav[0]!;
const restNav = mainNav.slice(1);

/* Scroll offsets at which the header changes size. Deliberately far apart; see
   the note in the scroll effect below. */
const SHRINK_AT = 96;
const EXPAND_AT = 32;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let raf = 0;
    const read = () => {
      raf = 0;
      const y = window.scrollY;
      /* Two thresholds, not one. This header is `sticky`, so it stays in normal
         flow and its height change shifts layout; `overflow-anchor` is active,
         so the browser corrects scrollY to compensate for that shift. With the
         previous single `y > 8` test, the correction pushed scrollY back under
         8, which re-expanded the header, which shifted layout again: the header
         visibly pumped and the page snapped back to the top on any small scroll.

         Keeping the two thresholds further apart than the height change makes
         that impossible. The 64px gap here is comfortably wider than the 24px
         the header now moves. */
      setScrolled((prev) => (prev ? y > EXPAND_AT : y > SHRINK_AT));
    };
    // Coalesce a burst of scroll events into one layout read per frame.
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-transparent bg-background/90 backdrop-blur transition-shadow",
        scrolled && "border-border shadow-soft",
      )}
    >
      <div
        className={cn(
          "container-page flex items-center justify-between gap-4 py-2 transition-[height] duration-200 ease-out",
          /* Only a 24px change at most. The old scrolled values collapsed this
             by 96px, which is what drove the scroll-anchoring feedback loop. */
          scrolled ? "h-24 md:h-34 xl:h-40" : "h-26 md:h-38 xl:h-46",
        )}
      >
        <Link to="/" className="flex shrink-0 items-center">
          {/* Sizes verified against the desktop nav, which appears at lg: at
              1024px the logo is 192px wide and still leaves ~60px of slack.

              The heights below look arbitrary because they are derived, not
              chosen. This artwork is 2.09:1, where the previous logo was 1.5:1,
              so matching the old *heights* would have made it up to 94px wider
              and pushed it into the nav at lg. They are set to reproduce the
              approved rendered WIDTHS instead - 117/192/242 unscrolled and
              108/167/200 scrolled, within ~3px of what shipped before. Retune
              against width, not height, if the artwork ever changes again. */}
          <img
            src={logoUrl}
            alt={`${business.name} home page`}
            width={620}
            height={297}
            fetchPriority="high"
            decoding="async"
            className={cn(
              "w-auto transition-[height] duration-200 ease-out",
              // Each height clears its container once py-2 (16px) is accounted
              // for: scrolled 52+16<=96, 80+16<=136, 96+16<=160; unscrolled
              // 56+16<=104, 92+16<=152, 116+16<=184.
              scrolled ? "h-13 md:h-20 xl:h-24" : "h-14 md:h-23 xl:h-29",
            )}
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {/* activeOptions exact is required: router matching is fuzzy by
              default, and "/" prefixes every route, so without it Home renders
              as the active link on every page. */}
          {/* The text colour lives in active/inactiveProps, not in className.
              text-foreground and text-brand are equal-specificity utilities, so
              setting both lets stylesheet order decide the winner, which is
              why the active state silently never rendered. */}
          <Link
            to={homeNav.to}
            activeOptions={{ exact: true }}
            className="rounded-lg px-2 py-2 text-sm font-semibold transition-colors hover:text-brand xl:px-3"
            activeProps={{ className: "text-brand" }}
            inactiveProps={{ className: "text-foreground" }}
          >
            {homeNav.label}
          </Link>
          <div className="group relative">
            <button
              type="button"
              className="flex items-center gap-1 rounded-lg px-2 py-2 text-sm font-semibold text-foreground transition-colors hover:text-brand xl:px-3"
              aria-haspopup="true"
            >
              Services <ChevronDown className="size-4" aria-hidden="true" />
            </button>
            <div className="invisible absolute left-0 top-full w-72 translate-y-1 rounded-2xl border border-border bg-popover p-2 opacity-0 shadow-lift transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              {/* The trigger above is a button, not a link, so without this the
                  /services hub has no reachable entry point in the header.
                  Deliberately not part of serviceNav: that array also feeds the
                  footer column and the per-page "Other services" sidebar, where
                  a hub link is not a service.

                  className is kept byte-identical to the mapped items below on
                  purpose - it reads as the first entry in the list, not as a
                  separate footer to it. */}
              <Link
                to={ROUTES.services.path}
                className="block rounded-xl px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-brand"
              >
                All Services
              </Link>
              {serviceNav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="block rounded-xl px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-brand"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          {restNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-lg px-2 py-2 text-sm font-semibold transition-colors hover:text-brand xl:px-3"
              activeProps={{ className: "text-brand" }}
              inactiveProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={business.phoneHref}
            className="hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-navy transition-colors hover:text-brand md:inline-flex"
          >
            <Phone className="size-4" aria-hidden="true" />
            {business.phoneDisplay}
          </a>
          <Link
            to="/contact"
            className="hidden rounded-xl bg-brand px-4 py-2.5 text-sm font-bold text-brand-foreground shadow-brand transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            Get Free Estimate
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="grid size-11 place-items-center rounded-xl border border-border text-navy lg:hidden"
              >
                <Menu className="size-5" aria-hidden="true" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[86vw] max-w-sm overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="font-display text-navy">Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 px-4 pb-8">
                <Link
                  to={homeNav.to}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-base font-semibold"
                >
                  {homeNav.label}
                </Link>
                <p className="px-3 pt-3 text-xs font-bold tracking-widest text-muted-foreground uppercase">
                  Services
                </p>
                <Link
                  to={ROUTES.services.path}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-base font-semibold"
                >
                  All Services
                </Link>
                {serviceNav.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-3 text-base font-semibold"
                  >
                    {item.label}
                  </Link>
                ))}
                <p className="px-3 pt-3 text-xs font-bold tracking-widest text-muted-foreground uppercase">
                  Company
                </p>
                {restNav.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-3 text-base font-semibold"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="mt-4 rounded-xl bg-brand px-4 py-3 text-center text-base font-bold text-brand-foreground"
                >
                  Get Free Estimate
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
