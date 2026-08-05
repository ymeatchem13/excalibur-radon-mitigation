import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CtaBand, PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { ServiceAreaMap } from "@/components/site/ServiceAreaMap";
import { serviceAreaContent } from "@/lib/service-area-content";
import { serviceAreas } from "@/lib/site-data";
import { absoluteUrl, canonical, ldScript, pageGraph, pageMeta } from "@/lib/seo";
import { cityPath, ROUTES } from "@/lib/routes";

/* An area gets a linked card only if it has long-form copy. That is the same
   condition the $city loader uses to decide between rendering and notFound, so
   the hub can never link somewhere that 404s. */
const hasPage = (slug: string) => Boolean(serviceAreaContent[slug]);

const { path, crumbs } = ROUTES.serviceAreas;

const title = "Radon Mitigation Service Areas | Cincinnati & N. Kentucky";
const description =
  "Radon mitigation systems and testing across Cincinnati, Mason, West Chester, Blue Ash, Loveland, Milford, Anderson Township, Florence, and Northern Kentucky.";

export const Route = createFileRoute("/service-areas/")({
  head: () => ({
    meta: pageMeta({ title, description, path }),
    links: canonical(path),
    scripts: [
      ldScript(
        pageGraph({
          path,
          name: title,
          description,
          type: "CollectionPage",
          crumbs,
          // Only areas with their own page carry a url. An ItemList entry
          // pointing at a URL that doesn't exist is worse than one without.
          itemList: serviceAreas.map((a) => ({
            name: `${a.name}, ${a.state}`,
            ...(hasPage(a.slug) ? { url: absoluteUrl(cityPath(a.slug)) } : {}),
          })),
        }),
      ),
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Service Areas"
        title="Serving the Greater Cincinnati Area"
        subtitle="Daily routes across Hamilton, Butler, Warren, and Clermont counties in Ohio and Boone, Kenton, and Campbell counties in Kentucky."
        crumbs={crumbs}
      />

      <section className="section-y">
        <div className="container-page">
          <ServiceAreaMap heading="Find your community on the map" />
        </div>
      </section>

      <section className="bg-surface section-y">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Communities</p>
            <h2 className="mt-4 text-3xl font-extrabold text-navy md:text-4xl">
              Local conditions we plan around
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {serviceAreas.map((area, i) => {
              const card = (
                <>
                  <h3 className="text-lg font-bold text-navy">{area.name}</h3>
                  <p className="text-xs font-semibold tracking-widest text-brand uppercase">
                    {area.note}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{area.blurb}</p>
                </>
              );

              /* Add an entry to serviceAreaContent and the card becomes a link
                 automatically; without one it stays a plain card rather than
                 linking to a notFound. */
              return (
                <Reveal key={area.slug} delay={(i % 3) * 0.05} className="h-full">
                  {hasPage(area.slug) ? (
                    <Link
                      to={cityPath(area.slug)}
                      className="flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-brand hover:shadow-lift"
                    >
                      {card}
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand">
                        Radon systems in {area.name}
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </span>
                    </Link>
                  ) : (
                    <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-soft">
                      {card}
                    </div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand
        title="Don't see your community?"
        body="If you're within about an hour of downtown Cincinnati, we almost certainly serve you. Give us a call."
      />
    </>
  );
}
