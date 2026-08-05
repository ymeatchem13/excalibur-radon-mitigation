import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { QuoteForm } from "@/components/site/QuoteForm";
import { Reveal } from "@/components/site/Reveal";
import { ServiceAreaMap } from "@/components/site/ServiceAreaMap";
import { business } from "@/lib/site-data";
import { canonical, ldScript, pageGraph, pageMeta } from "@/lib/seo";

const title = "Contact Us | Free Cincinnati Radon Mitigation Quote";
// The number is spelled out rather than interpolated from business.phoneDisplay
// because this string is length-budgeted: it renders verbatim in the SERP
// snippet and has to stay under 160 characters. It is 155 today. If the number
// changes, update it here too.
const description =
  "Call (513) 859-7678 or request a free radon mitigation or testing estimate for your Cincinnati or Northern Kentucky home. We reply within one business day.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: pageMeta({ title, description, path: "/contact" }),
    links: canonical("/contact"),
    // The phone is now real and IS in the graph, on the Organization node in
    // seo.ts, which every page references by @id. This page still adds no
    // separate ContactPoint because that would restate the same number on a
    // second node rather than tell a consumer anything new. Add one only if a
    // distinct contact channel appears, for example a separate sales line.
    scripts: [
      ldScript(
        pageGraph({
          path: "/contact",
          name: title,
          description,
          type: "ContactPage",
          crumbs: [{ name: "Contact", path: "/contact" }],
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
        eyebrow="Contact"
        title="Schedule Your Free Radon Estimate"
        subtitle="Tell us about your home or building and we'll follow up within one business day with pricing and scheduling."
        crumbs={[{ name: "Contact", path: "/contact" }]}
      />

      <section className="section-y">
        <div className="container-page grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <h2 className="text-2xl font-extrabold text-navy md:text-3xl">Reach us directly</h2>
            <ul className="mt-8 space-y-6">
              <li className="flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand-soft text-brand">
                  <Phone className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-bold text-navy">Phone</p>
                  <a href={business.phoneHref} className="text-lg font-extrabold text-brand">
                    {business.phoneDisplay}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand-soft text-brand">
                  <Mail className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-bold text-navy">Email</p>
                  {business.email ? (
                    <a
                      href={`mailto:${business.email}`}
                      className="text-sm break-all text-muted-foreground hover:text-brand"
                    >
                      {business.email}
                    </a>
                  ) : (
                    /* No self-link: the estimate form is on this very page, so
                       pointing at /contact would be a link to here. */
                    <p className="text-sm text-muted-foreground">
                      Use the estimate form on this page and we will reply by email.
                    </p>
                  )}
                </div>
              </li>
              {/* Service area, not an office address. This is a service-area
                  business with no public premises, so naming the region and
                  saying plainly that we come to you answers what a visitor is
                  actually asking. See the note on `business` in site-data.ts. */}
              <li className="flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand-soft text-brand">
                  <MapPin className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-bold text-navy">Service Area</p>
                  <p className="text-sm text-muted-foreground">
                    Based in Cincinnati, serving Northern Kentucky
                    <br />
                    We come to you — there is no walk-in office.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand-soft text-brand">
                  <Clock className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-bold text-navy">Hours</p>
                  <p className="text-sm text-muted-foreground">
                    {business.hours ?? "Call for current hours and scheduling."}
                  </p>
                </div>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <QuoteForm />
          </Reveal>
        </div>
      </section>

      <section className="bg-surface section-y">
        <div className="container-page">
          <ServiceAreaMap />
        </div>
      </section>
    </>
  );
}
