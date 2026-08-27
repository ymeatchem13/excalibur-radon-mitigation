import type { ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { WrittenContact } from "@/components/site/WrittenContact";
import { business } from "@/lib/site-data";
import { canonical, ldScript, pageGraph, pageMeta } from "@/lib/seo";

const title = "Terms of Service | Excalibur Radon Mitigation";
const description =
  "Terms governing use of the Excalibur Radon Mitigation website, our SMS messaging program, and how estimates, scheduling, and service visits are handled.";

/* See the matching note in privacy-policy.tsx - change both together. */
const EFFECTIVE_DATE = "August 27, 2026";

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

/* `p` is ReactNode, not string: the messaging sections need real anchors and an
   interpolated phone number. Plain-string entries are unaffected. */
const sections: { h: string; p: ReactNode }[] = [
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
    h: "Estimates and invoices",
    p: "Any coverage on workmanship, along with its duration and exclusions, is stated in your written estimate and invoice rather than on this website. Manufacturer warranties on fans and components are provided by the manufacturer.",
  },
  {
    h: "Results and testing",
    p: "We design systems to reduce radon as low as reasonably achievable and verify results with post-mitigation testing. Radon levels can change over time due to occupancy, weather, structural changes, and mechanical systems, so periodic retesting is recommended.",
  },
  /* The messaging program's terms. A2P 10DLC review reads this page alongside
     the privacy policy, and it is scanned item by item rather than read - so
     the program description, the opt-out and rejoin keywords, the support
     contact, the rate disclosure, the carrier disclaimer and the age limit are
     split into their own headed sections instead of buried in one paragraph.
     Each heading below answers one line of the carrier's checklist.

     Keep in sync with the checkbox wording in QuoteForm.tsx and the "Text
     messages" section of the privacy policy. */
  {
    h: "Text messaging program",
    p: "Excalibur Radon Mitigation operates two separate text messaging programs, and each has its own checkbox on our estimate request form. Transactional messages cover appointment confirmations, technician arrival updates, test result notifications, and service follow-ups. Marketing messages cover special offers, discounts, and service updates such as annual retest reminders. Consent to either program is optional, is never a condition of purchase, and is never assumed from a phone number alone. Consent to one program does not carry over to the other.",
  },
  {
    h: "Opting out, rejoining, and getting help",
    p: (
      <>
        You can cancel the SMS service at any time. Reply STOP to any message from us, or text STOP
        to {business.phoneDisplay}. We will send one final message confirming that you have been
        unsubscribed, after which you will receive no further texts from that program. To rejoin,
        text START to the same number or tick the box again on our estimate request form. Reply HELP
        at any time and we will respond with our business name and a support contact. You can also
        reach us directly at {business.phoneDisplay} or{" "}
        <WrittenContact linkClassName="font-semibold text-brand hover:underline" /> to be removed.
      </>
    ),
  },
  {
    h: "Message frequency, rates, and delivery",
    p: "Message frequency varies. Message and data rates may apply, and they are set by your mobile carrier rather than by us. Carriers are not liable for delayed or undelivered messages. Supported carriers may change without notice, and delivery is not guaranteed on every network or handset.",
  },
  {
    h: "Eligibility",
    p: "You must be at least 18 years old to consent to our text messaging programs. You must also be the account holder for the mobile number you provide, or be authorised by the account holder to enrol that number. If a number is transferred or reassigned, please tell us so we can stop messaging it.",
  },
  {
    h: "Privacy",
    p: (
      <>
        How we handle the number you give us, including the statement that no mobile information is
        shared with third parties or affiliates for marketing or promotional purposes, is set out in
        our{" "}
        <Link to="/privacy-policy" className="font-semibold text-brand hover:underline">
          Privacy Policy
        </Link>
        .
      </>
    ),
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
        subtitle="These terms are maintained by Excalibur Radon Mitigation and apply to use of this website, to our text messaging programs, and to services we provide."
        crumbs={[{ name: "Terms", path: "/terms" }]}
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
            Questions? Call {business.phoneDisplay} or{" "}
            <WrittenContact linkClassName="font-bold text-brand hover:underline" />.
          </p>
          <p className="mt-6 text-xs text-muted-foreground">Last updated {EFFECTIVE_DATE}.</p>
        </div>
      </section>
    </>
  );
}
