import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CtaBand, PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { serviceIcons } from "@/components/site/service-icons";
import { serviceAreaContent } from "@/lib/service-area-content";
import { serviceAreas, services, steps } from "@/lib/site-data";
import { absoluteUrl, canonical, ldScript, pageGraph, pageMeta } from "@/lib/seo";
import { cityPath, ROUTES } from "@/lib/routes";

const { path, crumbs } = ROUTES.services;

/* A handful of communities, not all thirteen: this is a cross-link band, and
   dumping every area here would bury the two service links above it. */
const featuredAreas = serviceAreas
  .filter((a) => !a.region && serviceAreaContent[a.slug])
  .slice(0, 6);

const title = "Radon Services | Testing & Mitigation in Cincinnati";
const description =
  "Radon testing and radon mitigation for homes and commercial buildings across Greater Cincinnati and Northern Kentucky, including real estate, new construction, and multi-family work.";

export const Route = createFileRoute("/services/")({
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
          // The two real service pages. The other four cards are anchors into
          // those pages, not URLs, so listing them here would point at
          // destinations that don't exist as separate items.
          itemList: [
            { name: "Radon Mitigation", url: absoluteUrl(ROUTES.radonMitigation.path) },
            { name: "Radon Testing", url: absoluteUrl(ROUTES.radonTesting.path) },
          ],
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
        eyebrow="Services"
        title="Radon testing and mitigation, start to finish"
        subtitle="Measure first, design around the foundation you actually have, install it cleanly, then prove it worked with a follow-up test."
        crumbs={crumbs}
      />

      <section className="section-y">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">What We Do</p>
            <h2 className="mt-4 text-3xl font-extrabold text-navy md:text-4xl">
              Two services, and everything they cover
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              Real estate deadlines, new construction rough-ins, and commercial buildings are all
              handled inside these two pages rather than split across thin separate ones.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => {
              const Icon = serviceIcons[service.icon]!;
              return (
                <Reveal
                  key={service.title}
                  delay={(i % 3) * 0.06}
                  className="group h-full rounded-3xl border border-border bg-card p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
                >
                  <span className="grid size-12 place-items-center rounded-2xl bg-brand-soft text-brand">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-navy">{service.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {service.blurb}
                  </p>
                  <Link
                    to={service.to}
                    // Spread conditionally: tsconfig sets exactOptionalPropertyTypes,
                    // so passing hash={undefined} is an error where the prop is
                    // declared as an optional string.
                    {...(service.hash ? { hash: service.hash } : {})}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:gap-2.5"
                  >
                    Learn more
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-surface section-y">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">How It Works</p>
            <h2 className="mt-4 text-3xl font-extrabold text-navy md:text-4xl">
              The same five steps every time
            </h2>
          </div>
          <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, i) => (
              <Reveal
                key={step.title}
                delay={(i % 5) * 0.05}
                className="h-full rounded-3xl border border-border bg-card p-6 shadow-soft"
              >
                <span className="text-xs font-bold tracking-widest text-brand uppercase">
                  Step {i + 1}
                </span>
                <h3 className="mt-3 text-base font-bold text-navy">{step.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Where We Work</p>
            <h2 className="mt-4 text-3xl font-extrabold text-navy md:text-4xl">
              Local conditions change the design
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              Foundation types and sub-slab material vary a lot across the metro. These pages cover
              what we plan around in each community.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {featuredAreas.map((area) => (
              <Link
                key={area.slug}
                to={cityPath(area.slug)}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-navy transition-colors hover:border-brand hover:text-brand"
              >
                Radon mitigation in {area.name}
              </Link>
            ))}
            <Link
              to={ROUTES.serviceAreas.path}
              className="rounded-full border border-brand bg-brand-soft px-4 py-2 text-sm font-bold text-brand"
            >
              All service areas
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        title="Not sure which one you need?"
        body="Start with a test. If your number is low we will tell you so and recommend retesting in two years."
      />
    </>
  );
}
