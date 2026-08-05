import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { business } from "@/lib/site-data";
import { canonical, ldScript, pageGraph, pageMeta } from "@/lib/seo";

const title = "Privacy Policy | Cincinnati Radon Solutions";
const description =
  "How Cincinnati Radon Solutions collects, uses, and protects information submitted through our website and estimate request forms.";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: pageMeta({ title, description, path: "/privacy-policy" }),
    links: canonical("/privacy-policy"),
    scripts: [
      ldScript(
        pageGraph({
          path: "/privacy-policy",
          name: title,
          description,
          crumbs: [{ name: "Privacy Policy", path: "/privacy-policy" }],
        }),
      ),
    ],
  }),
  component: Page,
});

const sections = [
  {
    h: "Information we collect",
    p: "We collect the information you voluntarily provide through our estimate request form or by contacting us: typically your name, phone number, email address, city, and any details you share about your property. We also collect standard, non-identifying analytics such as pages visited and referring source.",
  },
  {
    h: "How we use it",
    p: "Your information is used to respond to your request, schedule service, prepare estimates, and follow up about work we have performed. We do not sell, rent, or trade your information to third parties.",
  },
  {
    h: "Sharing",
    p: "We share information only with service providers that help us operate the business (for example, scheduling or email tools) and only to the extent necessary, or where required by law.",
  },
  {
    h: "Cookies and analytics",
    p: "Our site may use cookies and privacy-respecting analytics to understand how visitors use the pages. You can disable cookies in your browser without losing access to site content.",
  },
  {
    h: "Data retention and security",
    p: "We retain request and customer records for as long as needed to service the relationship and meet recordkeeping obligations, and we apply reasonable safeguards to protect that information.",
  },
  {
    h: "Your choices",
    p: "You may request a copy of the information we hold about you, ask us to correct it, or ask us to delete it, subject to any records we are required to keep.",
  },
];

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="Privacy Policy"
        subtitle="This policy is maintained by Cincinnati Radon Solutions and describes how we handle information submitted through this website."
        crumbs={[{ name: "Privacy Policy", path: "/privacy-policy" }]}
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
            Questions about this policy? Email{" "}
            <a href={`mailto:${business.email}`} className="font-bold text-brand hover:underline">
              {business.email}
            </a>{" "}
            or call {business.phoneDisplay}.
          </p>
        </div>
      </section>
    </>
  );
}
