import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { business } from "@/lib/site-data";
import { canonical, ldScript, pageGraph, pageMeta } from "@/lib/seo";
import { ROUTES } from "@/lib/routes";

const { path, crumbs } = ROUTES.accessibility;

const title = "Accessibility Statement | Cincinnati Radon Solutions";
const description =
  "How we approach accessibility on the Cincinnati Radon Solutions website, the standard we build against, known limitations, and how to report a problem.";

export const Route = createFileRoute("/accessibility")({
  head: () => ({
    meta: pageMeta({ title, description, path }),
    links: canonical(path),
    scripts: [ldScript(pageGraph({ path, name: title, description, crumbs }))],
  }),
  component: Page,
});

/*
 * Deliberately written as a statement of intent, not a compliance claim. Nobody
 * has audited this site, so asserting "this site is WCAG 2.1 AA compliant" would
 * be a claim we cannot support - and in the US that is exactly the sentence
 * plaintiffs quote back. "We build against" is accurate and still useful.
 *
 * Same rule as the rest of the site's legal copy: nothing here asserts licence
 * numbers, insurance, or warranty terms.
 */
const sections = [
  {
    h: "Our approach",
    p: "We want anyone to be able to find radon information, understand what a system costs, and reach us, regardless of how they browse. Accessibility is treated as part of building a page rather than a pass someone makes afterward.",
  },
  {
    h: "The standard we build against",
    p: "We build against the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA. This site has not been independently audited or certified, so we describe that as the target we work toward rather than a compliance claim.",
  },
  {
    h: "What that means in practice",
    p: "Pages use real headings in a logical order so screen readers can navigate them. Interactive elements are reachable and operable by keyboard, and the current page is marked in the navigation. Images that carry meaning have text alternatives, and decorative images are hidden from assistive technology. Text is sized in relative units so it reflows when you zoom, and colour is never the only way information is conveyed.",
  },
  {
    h: "Known limitations",
    p: "The service-area map is an embedded Google Maps frame, and we do not control what it exposes to assistive technology. Every community it covers is also listed as text on the service areas page, and the counties we serve are written out in the footer, so no information exists only inside the map. If you find something else that does not work, we would rather hear about it than have you work around it.",
  },
  {
    h: "Reporting a problem",
    p: "If any part of this site is difficult or impossible to use, tell us what you were trying to do and what got in the way, and we will fix it. If the barrier is on the site itself, we can also just take care of what you needed over the phone.",
  },
];

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Accessibility"
        title="Accessibility Statement"
        subtitle="How we build this site, where we know it falls short, and how to tell us when something does not work."
        crumbs={crumbs}
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
            Reach us at {business.phoneDisplay} or email{" "}
            <a href={`mailto:${business.email}`} className="font-bold text-brand hover:underline">
              {business.email}
            </a>
            . We aim to respond within two business days.
          </p>
        </div>
      </section>
    </>
  );
}
