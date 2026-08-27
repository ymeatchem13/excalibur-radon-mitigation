import type { ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { WrittenContact } from "@/components/site/WrittenContact";
import { business } from "@/lib/site-data";
import { canonical, ldScript, pageGraph, pageMeta } from "@/lib/seo";

const title = "Privacy Policy | Excalibur Radon Mitigation";
const description =
  "How Excalibur Radon Mitigation collects, uses, and protects information submitted through our website and estimate request forms.";

/* Carrier reviewers look for a date on both legal pages, and a policy with no
   date cannot be shown to have been in force when a given consent was taken.
   Keep this in step with CONSENT_VERSION in QuoteForm.tsx - they answer the
   same audit question from two different directions. */
const EFFECTIVE_DATE = "August 27, 2026";

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

/* `p` is ReactNode rather than string so the one section that has to carry a
   real anchor can. A2P review checks that the messaging pages link to each
   other; "see our Terms" as plain prose does not satisfy it. Every other entry
   is still a plain string - ReactNode accepts those unchanged. */
const sections: { h: string; p: ReactNode }[] = [
  {
    h: "Information we collect",
    p: "We collect the information you voluntarily provide through our estimate request form or by contacting us: typically your name, phone number, email address, city, and any details you share about your property. Where you tick a text messaging box, we also record which consents you gave and the version of the wording shown to you at the time. We also collect standard, non-identifying analytics such as pages visited and referring source.",
  },
  {
    h: "How we use it",
    p: "Your information is used to respond to your request, schedule service, prepare estimates, and follow up about work we have performed. We do not sell, rent, or trade your information to third parties.",
  },
  {
    h: "Sharing",
    p: "We share information only with service providers that help us operate the business (for example, scheduling or email tools) and only to the extent necessary, or where required by law.",
  },
  /* Required by the carriers that deliver our SMS traffic, not optional
     boilerplate: A2P 10DLC review reads this page and looks for the two
     message categories, the HELP/STOP keywords, and the mobile-information
     sentence.

     That sentence is reproduced VERBATIM from the carrier's own wording and
     must not be tightened, shortened, or rewritten in our voice. Reviewers
     pattern-match the string; a paraphrase that means exactly the same thing
     is still rejected (the rejection shows up as GHL error 30932). It reads
     oddly next to the rest of this page on purpose.

     Keep the rest of the section in sync with the checkbox wording in
     QuoteForm.tsx and the "Text messaging" section of the terms. */
  {
    h: "Text messages",
    p: (
      <>
        We send text messages only to numbers that have opted in on our estimate request form, and
        the two programs are separate. Transactional messages cover appointment confirmations,
        technician arrival updates, test result notifications, and service follow-ups. Marketing
        messages cover special offers, discounts, and service updates such as annual retest
        reminders; consent to those is never a condition of purchase. Message frequency varies.
        Message and data rates may apply. Reply STOP to opt out or HELP for assistance at any time.
        No mobile information will be shared with third parties/affiliates for marketing/promotional
        purposes. Information sharing to subcontractors in support services, such as customer
        service, is permitted. All other use case categories exclude text messaging originator
        opt-in data and consent; this information will not be shared with any third parties. Opting
        out of texts does not affect your estimate or any work we perform. The full messaging terms,
        including eligibility and carrier disclaimers, are in our{" "}
        <Link to="/terms" className="font-semibold text-brand hover:underline">
          Terms of Service
        </Link>
        .
      </>
    ),
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
    p: "You may request a copy of the information we hold about you, ask us to correct it, or ask us to delete it, subject to any records we are required to keep. You can also ask us to stop texting you at any time, either by replying STOP or by calling or emailing us.",
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
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                {s.p}
              </p>
            </div>
          ))}
          <p className="text-sm text-muted-foreground">
            Questions about this policy? Call {business.phoneDisplay} or{" "}
            <WrittenContact linkClassName="font-bold text-brand hover:underline" />.
          </p>
          <p className="mt-6 text-xs text-muted-foreground">Last updated {EFFECTIVE_DATE}.</p>
        </div>
      </section>
    </>
  );
}
