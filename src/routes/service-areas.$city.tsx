import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { CtaBand, PageHero } from "@/components/site/PageHero";
import { QuoteForm } from "@/components/site/QuoteForm";
import { Reveal } from "@/components/site/Reveal";
import { ServiceAreaMap } from "@/components/site/ServiceAreaMap";
import { serviceAreaContent } from "@/lib/service-area-content";
import { serviceAreas } from "@/lib/site-data";
import { canonical, ldScript, pageGraph, pageMeta } from "@/lib/seo";
import { cityCrumbs, cityPath, ROUTES } from "@/lib/routes";

/* The two live service pages. Keyed off ROUTES so these can never drift back to
   the retired flat paths, which now 301. */
const SERVICE_LABELS: Record<string, string> = {
  [ROUTES.radonMitigation.path]: "Radon mitigation",
  [ROUTES.radonTesting.path]: "Radon testing",
};

export const Route = createFileRoute("/service-areas/$city")({
  loader: ({ params }) => {
    const area = serviceAreas.find((a) => a.slug === params.city);
    const content = serviceAreaContent[params.city];
    // Both must exist. An area added to site-data without matching copy would
    // otherwise render an empty shell, which is exactly the thin page this
    // whole section is trying not to be.
    if (!area || !content) throw notFound();
    return { area, content };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Area unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const { area, content } = loaderData;
    const place = `${area.name}, ${area.state}`;
    const path = cityPath(params.city);

    // Leads on "radon mitigation system", not "radon mitigation {city}": the
    // repo's keyword research found the former 2-7x larger in every market
    // measured, while every suburb-modified term was below the reporting floor.
    const title = `Radon Mitigation Systems in ${place} | Testing & Installation`;
    const description = `${content.intro} Radon testing and EPA-protocol mitigation systems for ${place} homes.`;

    return {
      meta: pageMeta({ title, description, path }),
      links: canonical(path),
      scripts: [
        ldScript(
          pageGraph({
            path,
            name: title,
            description,
            crumbs: cityCrumbs(params.city, area.name),
            service: {
              name: `Radon Mitigation in ${place}`,
              description,
              // Scoped to this one place. Claiming all 13 areas on a page about
              // one of them would be the less honest signal.
              areaServed: [{ "@type": area.region ? "AdministrativeArea" : "City", name: place }],
            },
          }),
        ),
      ],
    };
  },
  component: Page,
});

function Page() {
  const { area, content } = Route.useLoaderData();
  const place = `${area.name}, ${area.state}`;
  const nearby = content.nearby
    .map((slug) => serviceAreas.find((a) => a.slug === slug))
    .filter((a): a is (typeof serviceAreas)[number] => Boolean(a));

  return (
    <>
      <PageHero
        eyebrow={area.note}
        title={`Radon Mitigation Systems in ${area.name}`}
        subtitle={content.intro}
        crumbs={cityCrumbs(area.slug, area.name)}
      />

      <section className="section-y">
        <div className="container-page grid items-start gap-12 lg:grid-cols-[1.35fr_1fr]">
          <div>
            <Reveal>
              <h2 className="text-2xl font-extrabold text-navy md:text-3xl">
                {area.name} homes we work on
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {content.housingStock}
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="mt-12 text-2xl font-extrabold text-navy md:text-3xl">
                How the work differs here
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {content.whatWeSee}
              </p>
            </Reveal>

            <Reveal delay={0.09}>
              <h2 className="mt-12 text-2xl font-extrabold text-navy md:text-3xl">
                Installation day in {area.name}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {content.installDay}
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <h2 className="mt-12 text-2xl font-extrabold text-navy md:text-3xl">
                {area.region ? "Counties we cover" : `Areas of ${area.name} we serve`}
              </h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {content.neighborhoods.map((n) => (
                  <li
                    key={n}
                    className="rounded-full border border-border bg-card px-3.5 py-2 text-sm font-semibold text-navy"
                  >
                    {n}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                Start with{" "}
                <Link to={content.primaryService} className="font-bold text-brand hover:underline">
                  {SERVICE_LABELS[content.primaryService]?.toLowerCase()}
                </Link>{" "}
                if you are not sure which you need, and we will tell you honestly whether a system
                is warranted.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.08}>
            <QuoteForm compact />
          </Reveal>
        </div>
      </section>

      <section className="bg-surface section-y">
        <div className="container-page">
          <ServiceAreaMap
            heading={`Where ${area.name} sits in our service area`}
            initialCity={area.name}
          />
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <h2 className="text-2xl font-extrabold text-navy md:text-3xl">What we do in {place}</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {Object.entries(SERVICE_LABELS).map(([to, label]) => (
              <Link
                key={to}
                to={to}
                className="flex items-start gap-3 rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-brand"
              >
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" aria-hidden="true" />
                <span>
                  <span className="block text-base font-bold text-navy">{label}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    Available across {place} with post-installation verification included.
                  </span>
                </span>
              </Link>
            ))}
          </div>

          {nearby.length > 0 ? (
            <>
              <h2 className="mt-14 text-2xl font-extrabold text-navy md:text-3xl">
                Nearby communities
              </h2>
              <ul className="mt-6 flex flex-wrap gap-3">
                {nearby.map((n) => (
                  <li key={n.slug}>
                    <Link
                      to={cityPath(n.slug)}
                      className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-brand hover:text-brand"
                    >
                      {n.name}
                      <ArrowRight className="size-3.5" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to={ROUTES.serviceAreas.path}
                    className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-brand hover:text-brand"
                  >
                    All service areas
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                </li>
              </ul>
            </>
          ) : null}
        </div>
      </section>

      <CtaBand
        title={`Get a written radon quote for your ${area.name} home`}
        body="Tell us the foundation type and we'll tell you what the system would look like before anyone visits."
      />
    </>
  );
}
