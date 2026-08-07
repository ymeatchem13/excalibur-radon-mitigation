import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { business } from "@/lib/site-data";
import { Reveal } from "./Reveal";
import { CallLink } from "./CallLink";

// Roebling Bridge over the Ohio River, the shared banner behind every inner-page
// hero. Cropped to a wide strip server-side (h=600) because object-cover would
// throw the extra height away, and served at q=50 since it sits under a heavy
// scrim: together that's ~263 KB instead of ~608 KB, on 13 pages.
export const pageHeroBanner =
  "https://images.unsplash.com/photo-1600186203774-769f73209d00?auto=format&fit=crop&w=1920&h=600&q=50";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  crumbs,
  children,
  image = pageHeroBanner,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  // readonly so the `as const` trails in lib/routes.ts can be passed directly.
  crumbs: readonly { name: string; path: string }[];
  children?: ReactNode;
  /** Decorative banner photo. Pass `undefined` for a plain navy hero. */
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy text-navy-foreground">
      {image ? (
        <>
          <img
            src={image}
            alt=""
            width={1920}
            height={600}
            fetchPriority="high"
            className="absolute inset-0 size-full object-cover"
          />
          {/* Directional, not flat: the hero copy is left-aligned, so keep the left
              dark for legibility and let the skyline read on the right. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-linear-to-r from-navy/90 via-navy/80 to-navy/60"
          />
        </>
      ) : null}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] size-[36rem] rounded-full bg-brand/25 blur-3xl"
      />
      <div className="container-page relative py-16 md:py-24">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1 text-xs font-semibold text-navy-foreground/60">
            <li>
              <Link to="/" className="hover:text-navy-foreground">
                Home
              </Link>
            </li>
            {/* Every crumb except the last is a link. Previously all of them
                rendered as plain spans, which meant the BreadcrumbList in the
                JSON-LD advertised a trail of linked items that did not exist in
                the HTML - and with flat URLs there was nothing to link to
                anyway. The last crumb stays a span because it is this page. */}
            {crumbs.map((c, i) => {
              const isCurrent = i === crumbs.length - 1;
              return (
                <li key={c.path} className="flex items-center gap-1">
                  <ChevronRight className="size-3.5" aria-hidden="true" />
                  {isCurrent ? (
                    <span className="text-navy-foreground/85" aria-current="page">
                      {c.name}
                    </span>
                  ) : (
                    <Link to={c.path} className="hover:text-navy-foreground">
                      {c.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
        <Reveal>
          <p className="inline-flex items-center rounded-full bg-brand/20 px-3.5 py-1.5 text-xs font-bold tracking-[0.12em] text-navy-foreground uppercase">
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold md:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-navy-foreground/75 md:text-lg">
            {subtitle}
          </p>
          {children ? <div className="mt-8">{children}</div> : null}
        </Reveal>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="mt-4 text-3xl font-extrabold text-navy md:text-4xl">{title}</h2>
      {intro ? <p className="mt-4 text-base leading-relaxed text-muted-foreground">{intro}</p> : null}
    </div>
  );
}

// A finished residential basement - the room a radon system actually goes in,
// behind the closing CTA on every page. Pre-cropped to h=600 because the band
// renders roughly 1216x230 and object-cover would throw the rest away; q=55
// because it sits under an 85% navy scrim. That lands it at ~62 KB.
export const ctaBandImage =
  "https://images.unsplash.com/photo-1646592474273-86049d4f3575?auto=format&fit=crop&w=1400&h=600&q=55";

export function CtaBand({
  title = "Schedule Your Free Radon Estimate",
  body = "Tell us about your home and we'll get you a written quote. No pressure, no obligation.",
  image = ctaBandImage,
}: {
  title?: string;
  body?: string;
  /** Decorative background photo. Pass `undefined` for a plain navy band. */
  image?: string;
}) {
  return (
    <section className="section-y">
      <div className="container-page">
        <Reveal className="relative overflow-hidden rounded-3xl bg-navy px-6 py-14 text-center text-navy-foreground shadow-lift md:px-16">
          {image ? (
            <>
              <img
                src={image}
                alt=""
                width={1400}
                height={600}
                loading="lazy"
                className="absolute inset-0 size-full object-cover"
              />
              {/* Flat rather than directional: the copy is centered, so it needs even
                  coverage. /90 rather than /85 because this basement shot is a bright,
                  near-white room (median pixel 183,183,183). Both pass AA - computing
                  the composite against the photo's brightest pixels gives 6.90:1 for the
                  75%-white body copy at /85 and 7.89:1 at /90 - but the extra stop is
                  cheap headroom for whatever image replaces this one later. */}
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-navy/90" />
            </>
          ) : null}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 left-1/2 size-[30rem] -translate-x-1/2 rounded-full bg-brand/25 blur-3xl"
          />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-extrabold md:text-4xl">{title}</h2>
            <p className="mx-auto mt-4 max-w-xl text-navy-foreground/75">{body}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/contact"
                className="rounded-xl bg-brand px-6 py-3.5 text-sm font-bold text-brand-foreground shadow-brand transition-transform hover:-translate-y-0.5"
              >
                Get Free Estimate
              </Link>
              <CallLink
                location="page_hero"
                className="rounded-xl border border-navy-foreground/25 px-6 py-3.5 text-sm font-bold text-navy-foreground transition-colors hover:bg-navy-foreground/10"
              >
                Call {business.phoneDisplay}
              </CallLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
