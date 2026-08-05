import { createFileRoute } from "@tanstack/react-router";
import { CtaBand, PageHero } from "@/components/site/PageHero";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { faqs } from "@/lib/site-data";
import { canonical, ldScript, pageGraph, pageMeta } from "@/lib/seo";

const extraFaqs = [
  {
    q: "How loud is a radon fan?",
    a: "A correctly sized fan mounted outside or in an attic is barely audible indoors. Most homeowners describe a faint airflow sound near the pipe. We size the fan to the system rather than defaulting to the largest available.",
  },
  {
    q: "Can radon come from my well water?",
    a: "It can, though soil gas is the dominant pathway in this region. If you're on a private well and your indoor levels stay elevated after mitigation, we'll recommend water testing to rule it out.",
  },
  {
    q: "Does a mitigation system hurt resale value?",
    a: "The opposite, in our experience. A documented system with a low post-mitigation test result removes an unknown from the transaction and is viewed by most buyers as a completed improvement.",
  },
  {
    q: "How long do radon fans last?",
    a: "Most manufacturers rate residential fans for several years of continuous operation, and many run considerably longer. Check the manometer periodically and retest every two years or after any fan replacement.",
  },
];

const allFaqs = [...faqs, ...extraFaqs];

// Group the flat list under real <h2> headings. Without this the page outline is
// an <h1> followed by ten bare <h3> accordion triggers (Radix renders each
// AccordionHeader as an h3), which skips a level. Grouping is by keyword rather
// than exact question text so rewording a question in site-data cannot silently
// drop it from the page: the first matching group wins, and anything unmatched
// falls through to the final group.
const GROUP_MATCHERS: { heading: string; match: RegExp }[] = [
  { heading: "Radon basics", match: /what is radon|dangerous/i },
  {
    heading: "Radon mitigation system cost and installation",
    match: /cost|how long does installation/i,
  },
  { heading: "Testing and verification", match: /testing afterward|well water/i },
];

const LEFTOVER_HEADING = "Living with your radon mitigation system";

const faqGroups = (() => {
  const remaining = [...allFaqs];
  const groups = GROUP_MATCHERS.map(({ heading, match }) => {
    const items: typeof allFaqs = [];
    for (let i = remaining.length - 1; i >= 0; i--) {
      if (match.test(remaining[i]!.q)) items.unshift(...remaining.splice(i, 1));
    }
    return { heading, items };
  }).filter((g) => g.items.length > 0);

  if (remaining.length > 0) groups.push({ heading: LEFTOVER_HEADING, items: remaining });
  return groups;
})();

const title = "Radon Mitigation FAQs | Cost, Testing & What Radon Is";
const description =
  "What radon is, what a radon mitigation system costs, how long installs take, safe radon levels, and post-mitigation testing, for Cincinnati homeowners.";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: pageMeta({ title, description, path: "/faqs" }),
    links: canonical("/faqs"),
    scripts: [
      ldScript(
        pageGraph({
          path: "/faqs",
          name: title,
          description,
          type: "FAQPage",
          crumbs: [{ name: "FAQs", path: "/faqs" }],
          faqs: allFaqs,
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
        eyebrow="FAQs"
        title="Radon questions, answered plainly"
        subtitle="If your question isn't here, call us. We'd rather spend ten minutes explaining than have you guess."
        crumbs={[{ name: "FAQs", path: "/faqs" }]}
      />
      <section className="section-y">
        <div className="container-page space-y-12">
          {faqGroups.map((group) => (
            <div key={group.heading}>
              <h2 className="mx-auto mb-5 w-full max-w-3xl text-2xl font-extrabold text-navy md:text-3xl">
                {group.heading}
              </h2>
              <FaqAccordion items={group.items} />
            </div>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
