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
import { CallLink } from "./CallLink";
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
        /* Dark bar, not the page background: the logo artwork is silver on
           transparency and scores 1.8:1 on white against 9.8:1 here. Every
           foreground in this header is therefore light-on-dark. */
        "sticky top-0 z-50 w-full border-b border-transparent bg-navy/95 backdrop-blur transition-shadow",
        scrolled && "border-navy-foreground/10 shadow-soft",
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
          {/* The heights below look arbitrary because they are derived, not
              chosen. This artwork is 2.369:1 (443x187), so a height change moves
              the width more than twice as fast - always retune against the
              rendered WIDTH, not the height, or the logo walks into the desktop
              nav at lg before anything looks wrong at other sizes.

              Measured widths at the current values:
                unscrolled  190 / 218 / 275   (base / md / xl)
                scrolled    171 / 190 / 227

              The binding constraint is lg, where the nav appears but md sizing
              is still in force: 218px wide leaves 27px of clearance before the
              nav at 1024px. That is the number to watch. Everything else has
              room to spare. */}
          <img
            src={logoUrl}
            alt={`${business.name} home page`}
            width={443}
            height={187}
            fetchPriority="high"
            decoding="async"
            className={cn(
              "w-auto transition-[height] duration-200 ease-out",
              // Each height clears its container once py-2 (16px) is accounted
              // for: scrolled 72+16<=96, 80+16<=136, 96+16<=160; unscrolled
              // 80+16<=104, 92+16<=152, 116+16<=184.
              //
              // The base values sit 8px inside the bar. Nothing constrains the
              // logo at mobile widths - the nav is behind a hamburger and the
              // phone and CTA buttons are hidden below sm/md - so the only limit
              // is the bar height, and the previous 56px left 32px of it unused.
              scrolled ? "h-18 md:h-20 xl:h-24" : "h-20 md:h-23 xl:h-29",
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
            className="rounded-lg px-2 py-2 text-sm font-semibold transition-colors hover:text-brand-on-dark xl:px-3"
            activeProps={{ className: "text-brand-on-dark" }}
            inactiveProps={{ className: "text-navy-foreground/85" }}
          >
            {homeNav.label}
          </Link>
          <div className="group relative">
            <button
              type="button"
              className="flex items-center gap-1 rounded-lg px-2 py-2 text-sm font-semibold text-navy-foreground/85 transition-colors hover:text-brand-on-dark xl:px-3"
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
              className="rounded-lg px-2 py-2 text-sm font-semibold transition-colors hover:text-brand-on-dark xl:px-3"
              activeProps={{ className: "text-brand-on-dark" }}
              inactiveProps={{ className: "text-navy-foreground/85" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CallLink
            location="header"
            className="hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-navy-foreground transition-colors hover:text-brand-on-dark md:inline-flex"
          >
            <Phone className="size-4" aria-hidden="true" />
            {business.phoneDisplay}
          </CallLink>
          <Link
            to="/contact"
            className="hidden rounded-xl bg-brand px-4 py-2.5 text-sm font-bold text-brand-foreground shadow-brand transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            Get Free Estimate
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              {/* No border box: the icon carries itself at this size. size-11 is
                  kept even though nothing draws it - it is the 44px tap target,
                  which is the WCAG 2.5.5 minimum, so it must not shrink to fit
                  the glyph. rounded-xl is likewise not dead: Chrome and Safari
                  shape the default focus outline to border-radius. */}
              <button
                type="button"
                aria-label="Open menu"
                className="grid size-11 place-items-center rounded-xl text-navy-foreground transition-colors hover:text-brand-on-dark lg:hidden"
              >
                <Menu className="size-7" aria-hidden="true" />
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
