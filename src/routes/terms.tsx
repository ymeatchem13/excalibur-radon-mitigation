import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { business } from "@/lib/site-data";
import { canonical, ldScript, pageGraph, pageMeta } from "@/lib/seo";

const title = "Terms of Service | Cincinnati Radon Solutions";
const description =
  "Terms governing use of the Cincinnati Radon Solutions website, estimates, scheduling, and workmanship warranty information.";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: pageMeta({ title, description, path: "/terms" }),
    links: canonical("/terms"),
    scripts: [
      ldScript(
        pageGraph({
          path: "/terms",
          name: title,
          description,
          crumbs: [{ name: "Terms", path: "/terms" }],
        }),
      ),
    ],
  }),
  component: Page,
});

const sections = [
  {
    h: "Use of this website",
    p: "Content on this site is provided for general information about radon testing and mitigation. It is not a substitute for a site-specific evaluation of your property, and radon levels vary from home to home.",
  },
  {
    h: "Estimates and pricing",
    p: "Pricing discussed on this site or by phone is preliminary. A binding price is provided in a written estimate after we evaluate the property, and that written estimate governs the scope of work.",
  },
  {
    h: "Scheduling and access",
    p: "Testing requires closed-house conditions and uninterrupted access to the placement area. Installation requires access to the work area, an appropriate power source, and a clear path for equipment.",
  },
  {
    h: "Workmanship warranty",
    p: "Installations carry a workmanship warranty; specific coverage, duration, and exclusions are stated in your written estimate and invoice. Manufacturer warranties on fans and components are provided by the manufacturer.",
  },
  {
    h: "Results and testing",
    p: "We design systems to reduce radon as low as reasonably achievable and verify results with post-mitigation testing. Radon levels can change over time due to occupancy, weather, structural changes, and mechanical systems, so periodic retesting is recommended.",
  },
  {
    h: "Limitation of liability",
    p: "To the extent permitted by law, our liability is limited to the amount paid for the services provided. Nothing in these terms limits liability that cannot be limited under applicable law.",
  },
];

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Terms"
        title="Terms of Service"
        subtitle="These terms are maintained by Cincinnati Radon Solutions and apply to use of this website and to services we provide."
        crumbs={[{ name: "Terms", path: "/terms" }]}
      />
      <section className="section-y">
        <div className="container-page mx-auto max-w-3xl">
          {sections.map((s) => (
            <div key={s.h} className="mb-8">
              <h2 className="text-xl font-bold text-navy">{s.h}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{s.p}</p>
            </div>
          ))}
          <p className="text-sm text-muted-foreground">
            Questions? Call {business.phoneDisplay} or email{" "}
            <a href={`mailto:${business.email}`} className="font-bold text-brand hover:underline">
              {business.email}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
