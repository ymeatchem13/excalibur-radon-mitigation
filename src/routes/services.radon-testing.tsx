import { createFileRoute } from "@tanstack/react-router";
import heroImage from "@/assets/hero-technician.jpg";
import { ServicePageLayout } from "@/components/site/ServicePageLayout";
import { canonical, ldScript, pageGraph, pageMeta } from "@/lib/seo";
import { ROUTES } from "@/lib/routes";

const { path, crumbs } = ROUTES.radonTesting;

const title = "Radon Testing Cincinnati | EPA Protocol Radon Tests";
const description =
  "Radon testing in Cincinnati with calibrated continuous monitors under EPA closed-house protocol. Clear reports, fast results, and honest next steps.";

export const Route = createFileRoute("/services/radon-testing")({
  head: () => ({
    meta: pageMeta({ title, description, path }),
    links: canonical(path),
    scripts: [
      ldScript(
        pageGraph({
          path,
          name: title,
          description,
          crumbs,
          service: { name: "Radon Testing", description },
        }),
      ),
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <ServicePageLayout
      eyebrow="Radon Testing"
      title="Know your number before you spend a dollar on mitigation"
      subtitle="Calibrated continuous radon monitors, EPA closed-house protocol, and a report written so you can actually act on it."
      crumbs={crumbs}
      path={path}
      // relatedPostSlugs intentionally omitted: the blog is unlisted, so the
      // "Related reading" card would link into a noindexed section.

      image={heroImage}
      imageAlt="Technician placing a continuous radon monitor in a Cincinnati basement"
      sections={[
        {
          heading: "Measurement done the way the EPA describes it",
          paragraphs: [
            "We place a calibrated continuous radon monitor in the lowest livable level of the home and run it for a minimum of 48 hours under closed-house conditions. Continuous monitors log hourly, which means we can see how the level behaves overnight, during weather changes, and while your HVAC cycles. That is detail a single-number charcoal kit cannot give you.",
            "For homeowners who want the most representative picture, we also offer long-term testing that averages exposure over 90 days or more. That is the better choice when you are deciding about a basement you plan to finish rather than reacting to a transaction deadline.",
          ],
        },
        {
          heading: "What your report tells you",
          paragraphs: [
            "You receive the average result in picocuries per liter, the hourly data behind it, the test conditions, and a short interpretation. If the average is at or above 4.0 pCi/L, the EPA recommends fixing the home. Between 2.0 and 4.0 pCi/L, mitigation is worth considering, particularly if the lower level is finished living space.",
            "If your number is low, we will tell you that plainly and recommend retesting in two years. We would rather earn a referral than sell an unnecessary system.",
          ],
        },
        {
          // The testing half of the retired /real-estate-services page. The
          // mitigation half lives on /services/radon-mitigation.
          heading: "Testing on a real estate timeline",
          paragraphs: [
            "Inspection windows are short, so we hold capacity every week for transactions. The 48-hour minimum runs, the device is retrieved, and results go out the same day, which leaves room to negotiate rather than to ask for an extension.",
            "For buyers that means an independent number and a plain explanation of it before you waive anything. For sellers and agents it means pre-listing testing removes a late surprise from the deal, and if a system turns out to be needed, a documented install is a straightforward disclosure rather than a renegotiation.",
          ],
        },
        {
          heading: "Post-mitigation and follow-up testing",
          paragraphs: [
            "Every mitigation system we install is followed by a verification test. That documentation matters at closing and it matters two years from now when someone asks whether the fan is actually accomplishing anything.",
            "We also test homes with existing systems installed by other contractors. Fans wear out, sump lids get opened during plumbing work, and additions change the sub-slab picture.",
          ],
        },
      ]}
      bullets={[
        "Calibrated continuous radon monitor",
        "48-hour minimum EPA closed-house protocol",
        "Hourly data and written interpretation",
        "Long-term (90+ day) testing available",
        "Post-mitigation verification testing",
        "Real estate transaction turnaround",
      ]}
    />
  );
}
