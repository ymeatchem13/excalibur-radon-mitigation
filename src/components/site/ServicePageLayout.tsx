import { Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { CtaBand, PageHero } from "./PageHero";
import { Reveal } from "./Reveal";
import { QuoteForm } from "./QuoteForm";
import { blogPosts, serviceNav } from "@/lib/site-data";
import { ROUTES } from "@/lib/routes";

export type ServiceSection = { heading: string; paragraphs: string[] };

/**
 * Slugifies a section heading into a stable in-page anchor. Gives every service
 * page linkable section targets, which is what sitelinks and AI answer citations
 * attach to, and lets one page be deep-linked to a specific stage of a service
 * without inventing a separate route for it.
 */
export function sectionAnchorId(heading: string) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function ServicePageLayout({
  eyebrow,
  title,
  subtitle,
  crumbs,
  image,
  imageAlt,
  sections,
  bullets,
  path,
  relatedPostSlugs = [],
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  crumbs: readonly { name: string; path: string }[];
  image: string;
  imageAlt: string;
  sections: ServiceSection[];
  bullets: string[];
  /** This page's own route, used to drop the self-link from "Other services". */
  path: string;
  /** Blog slugs to surface as related reading. Rescues otherwise orphaned posts. */
  relatedPostSlugs?: string[];
}) {
  /* `path` comes from ROUTES, and so does every serviceNav `to`, so this
     comparison is now between two values with the same origin rather than
     between a hand-typed string and a data literal. When it was the latter it
     failed silently: a mismatch just meant the page listed itself under "Other
     services" with nothing to flag it. The dev-only assert below turns the
     remaining failure mode - passing a path that is not a service route - into
     something visible. */
  const otherServices = serviceNav.filter((item) => item.to !== path);
  if (import.meta.env.DEV && otherServices.length === serviceNav.length) {
    console.warn(
      `ServicePageLayout: path "${path}" matched no serviceNav entry, so "Other services" is showing every service including this one. Pass a path from ROUTES.`,
    );
  }
  const relatedPosts = relatedPostSlugs
    .map((slug) => blogPosts.find((p) => p.slug === slug))
    .filter((p): p is (typeof blogPosts)[number] => Boolean(p));

  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} subtitle={subtitle} crumbs={crumbs} />

      <section className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <Reveal>
              <img
                src={image}
                alt={imageAlt}
                loading="lazy"
                width={1200}
                height={800}
                className="aspect-3/2 w-full rounded-3xl object-cover shadow-lift"
              />
            </Reveal>
            {sections.map((section, i) => (
              <Reveal key={section.heading} delay={0.05} className="mt-10">
                <h2
                  id={sectionAnchorId(section.heading)}
                  className={i === 0 ? "text-2xl font-extrabold text-navy md:text-3xl" : "text-xl font-bold text-navy md:text-2xl"}
                >
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {section.paragraphs.map((p) => (
                    <p key={p.slice(0, 32)}>{p}</p>
                  ))}
                </div>
              </Reveal>
            ))}

            <Reveal className="mt-10 rounded-3xl border border-border bg-surface p-7">
              <h3 className="text-lg font-bold text-navy">What&apos;s included</h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm font-medium text-foreground">
                    <CheckCircle2 className="mt-0.5 size-4.5 shrink-0 text-success" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <QuoteForm compact />
            <div className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-soft">
              <h3 className="text-sm font-bold tracking-widest text-muted-foreground uppercase">
                Other services
              </h3>
              <ul className="mt-4 space-y-2.5">
                {otherServices.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="text-sm font-semibold text-navy transition-colors hover:text-brand"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                {/* Up to the hub and across to the areas, so a service page is
                    not a dead end in the link graph. */}
                <li>
                  <Link
                    to={ROUTES.services.path}
                    className="text-sm font-semibold text-navy transition-colors hover:text-brand"
                  >
                    All services
                  </Link>
                </li>
                <li>
                  <Link
                    to={ROUTES.serviceAreas.path}
                    className="text-sm font-semibold text-navy transition-colors hover:text-brand"
                  >
                    Service areas
                  </Link>
                </li>
              </ul>
            </div>

            {relatedPosts.length > 0 ? (
              <div className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-soft">
                <h3 className="text-sm font-bold tracking-widest text-muted-foreground uppercase">
                  Related reading
                </h3>
                <ul className="mt-4 space-y-3">
                  {relatedPosts.map((post) => (
                    <li key={post.slug}>
                      <Link
                        to="/blog/$slug"
                        params={{ slug: post.slug }}
                        className="text-sm font-semibold text-navy transition-colors hover:text-brand"
                      >
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
