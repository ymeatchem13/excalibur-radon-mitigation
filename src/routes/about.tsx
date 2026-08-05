import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import homeExterior from "@/assets/home-exterior.jpg";
import { CtaBand, PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { canonical, ldScript, pageGraph, pageMeta } from "@/lib/seo";
import { whyUs } from "@/lib/site-data";

const title = "About Us | Cincinnati Radon Mitigation Company";
const description =
  "Radon-only mitigation company based in Cincinnati and serving Northern Kentucky. EPA-aligned diagnostics, clean installs, verified results.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: pageMeta({ title, description, path: "/about" }),
    links: canonical("/about"),
    scripts: [
      ldScript(
        pageGraph({
          path: "/about",
          name: title,
          description,
          type: "AboutPage",
          crumbs: [{ name: "About", path: "/about" }],
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
        eyebrow="About Us"
        title="A Cincinnati company that does one thing"
        subtitle="Radon is not a sideline we added to a list of services. It is the whole business, and it is the reason our crews get the diagnostics right."
        crumbs={[{ name: "About", path: "/about" }]}
      />

      <section className="section-y">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <img
              src={homeExterior}
              alt="Cincinnati-area home with a professionally installed radon mitigation system"
              loading="lazy"
              width={1408}
              height={1008}
              className="w-full rounded-3xl object-cover shadow-lift"
            />
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-3xl font-extrabold text-navy md:text-4xl">Why we started</h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              <p>
                Southwest Ohio and Northern Kentucky sit in a region where elevated indoor radon is
                common enough that most homeowners will eventually have to make a decision about it,
                usually under a deadline and usually with very little context.
              </p>
              <p>
                Excalibur Radon Mitigation helps Cincinnati-area homeowners address elevated indoor
                radon with professionally designed mitigation systems, built around the part of the
                job that most affects the result: diagnostics. Measuring how air moves under a slab
                before choosing suction points is
                slower than guessing, and it is the difference between a system that quietly
                underperforms and one that actually pulls the level down.
              </p>
              <p>
                Radon measurement and mitigation is the whole business, not a sideline bolted onto
                another trade. The person who quotes your home is accountable for what the
                post-mitigation test ends up saying.
              </p>
              <p>
                We follow current EPA guidance and national radon mitigation standards, and we put the
                scope and the price in writing before anyone drills anything.
              </p>
            </div>
            <Link
              to="/contact"
              className="mt-8 inline-flex rounded-xl bg-brand px-6 py-3.5 text-sm font-bold text-brand-foreground shadow-brand"
            >
              Talk to our team
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface section-y">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Our Standards</p>
            <h2 className="mt-4 text-3xl font-extrabold text-navy md:text-4xl">
              How we work, every job
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((item, i) => (
              <Reveal
                key={item.title}
                delay={(i % 4) * 0.05}
                className="h-full rounded-3xl border border-border bg-card p-6 shadow-soft"
              >
                <CheckCircle2 className="size-5 text-success" aria-hidden="true" />
                <h3 className="mt-4 text-base font-bold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
