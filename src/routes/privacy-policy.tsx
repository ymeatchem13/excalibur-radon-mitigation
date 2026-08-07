import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { WrittenContact } from "@/components/site/WrittenContact";
import { business } from "@/lib/site-data";
import { canonical, ldScript, pageGraph, pageMeta } from "@/lib/seo";

const title = "Privacy Policy | Excalibur Radon Mitigation";
const description =
  "How Excalibur Radon Mitigation collects, uses, and protects information submitted through our website and estimate request forms.";

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
  /* Names both analytics tools rather than saying "analytics". The earlier
     wording predated Google Analytics, which unlike the cookieless Ahrefs tool
     does set cookies - a policy that does not say so is inaccurate. Update this
     paragraph whenever a tracking script is added to __root.tsx. */
  {
    h: "Cookies and analytics",
    p: "We use two analytics tools to understand how visitors use the site. Ahrefs Web Analytics is cookieless and does not track individuals. Google Analytics 4 sets cookies to recognize returning visits and reports on pages viewed, referring source, approximate location, and actions such as requesting an estimate or tapping our phone number. These are reported to us only in aggregate; we do not send your name, email address, or phone number to Google. You can disable cookies in your browser, or install Google's opt-out add-on, without losing access to any site content.",
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
        subtitle="This policy is maintained by Excalibur Radon Mitigation and describes how we handle information submitted through this website."
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
            Questions about this policy? Call {business.phoneDisplay} or{" "}
            <WrittenContact linkClassName="font-bold text-brand hover:underline" />.
          </p>
        </div>
      </section>
    </>
  );
}
