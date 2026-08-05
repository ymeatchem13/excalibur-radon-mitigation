import { createFileRoute } from "@tanstack/react-router";
import homeExterior from "@/assets/home-exterior.jpg";
import { ServicePageLayout } from "@/components/site/ServicePageLayout";
import { canonical, ldScript, pageGraph, pageMeta } from "@/lib/seo";
import { ROUTES } from "@/lib/routes";

const { path, crumbs } = ROUTES.radonMitigation;

const title = "Radon Mitigation Systems | Cincinnati & N. Kentucky";
const description =
  "Sub-slab depressurization radon mitigation systems for Cincinnati basements, crawlspaces, and slabs. See what a system costs and get a free written quote.";

export const Route = createFileRoute("/services/radon-mitigation")({
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
          service: { name: "Radon Mitigation", description },
        }),
      ),
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <ServicePageLayout
      eyebrow="Radon Mitigation"
      title="A radon system designed around your foundation, not a template"
      subtitle="Diagnostics first, then a radon mitigation system sized and routed for your home, installed cleanly and verified with a follow-up test."
      crumbs={crumbs}
      path={path}
      // relatedPostSlugs intentionally omitted: the blog is unlisted, so the
      // "Related reading" card would link into a noindexed section.

      image={homeExterior}
      imageAlt="Suburban Cincinnati brick home with a discreet white radon mitigation vent pipe along the exterior wall"
      sections={[
        {
          heading: "Diagnostics decide the design",
          paragraphs: [
            "Before we quote a system, we look at how air moves under your slab. Communication testing tells us how far a single suction point can reach through the sub-grade material. Homes over tight clay fill, homes with interior footings dividing the sub-slab area, and homes with mixed foundations often need more than one point.",
            "Skipping that step is the single most common reason a radon system underperforms. A fan running on a poorly placed suction point can still leave you at 4.0 pCi/L.",
          ],
        },
        {
          heading: "What a radon mitigation system costs in Cincinnati",
          paragraphs: [
            "The EPA's Consumer's Guide to Radon Reduction puts a radon reduction system in most homes at roughly $800 to $2,500, and notes the cost depends on the home's size, design, and foundation. Published prices from mitigation companies working the Cincinnati and Dayton market cluster in the same band: $800 to $2,500 is the most commonly posted local range, one local pricing calculator publishes $1,200 to $2,400, and radon testing is commonly quoted between $100 and $300.",
            "Those are market ranges published by the EPA and by other companies, not our price list. What a specific home costs depends on foundation type, how many suction points the sub-slab diagnostics call for, pipe routing, and whether crawlspace membrane or block wall depressurization is part of the design. We give you a firm written quote after an on-site visit, and the number in that quote is the number you pay.",
          ],
        },
        {
          heading: "Every foundation type in the Cincinnati housing stock",
          paragraphs: [
            "Full basements, walk-outs, crawlspaces, slab-on-grade, and the mixed foundations common in homes that have been added onto over decades. Crawlspaces typically get a sealed membrane connected to the suction system; block wall foundations may need wall depressurization in addition to sub-slab work.",
            "We also seal the pathways that make a system work harder than it needs to: the slab-to-wall expansion joint, open sump pits, and unsealed utility penetrations.",
          ],
        },
        {
          // Folded in from the retired /real-estate-services page. The whole
          // real-estate keyword cluster measured below threshold, so it earns a
          // section here rather than a URL of its own; those buyers search the
          // mitigation terms this page already targets.
          heading: "Radon mitigation on a real estate deadline",
          paragraphs: [
            "We hold capacity every week for transactions. A continuous monitor test runs a 48-hour minimum with results the same day the device is retrieved, and mitigation is usually a single-day install followed by verification testing.",
            "The most common problem we see is not a high reading; it is a test started on day nine of a ten-day inspection window. Call us early and the timeline is comfortable. Buyers get an independent measurement and a firm quote to use in negotiation. Sellers and agents get scheduling confirmations, reports, and post-mitigation documentation formatted to drop straight into the transaction file.",
          ],
        },
        {
          // Folded in from the retired /new-construction page.
          heading: "Building the system in during new construction",
          paragraphs: [
            "A radon-resistant rough-in is straightforward while the aggregate is still exposed: a gas-permeable layer, a sealed vapor barrier, a tee in the sub-slab material, and a vertical pipe run through conditioned space to the roofline, labeled at every floor. Done at this stage the system is entirely concealed inside walls and chases, with no exterior pipe and no wall penetration.",
            "After the home is enclosed and mechanicals are running, we test. If the passive stack is holding the level low, nothing more is needed. If not, adding a fan to a properly roughed-in stack is a short visit rather than a retrofit. For production builders we can standardize the detail across a community so every home is roughed in the same way.",
          ],
        },
        {
          // Folded in from the retired /commercial-mitigation page. Kept because
          // it is a sales asset: only one competitor in this market has any
          // commercial content, even though the search demand is unmeasurable.
          heading: "Commercial and multi-family buildings",
          paragraphs: [
            "Commercial measurement follows a different protocol than a house. Ground-contact rooms are tested on a grid, and HVAC behavior is documented because mechanical ventilation frequently drives the pressure relationships that move soil gas indoors. For schools and childcare facilities we work with your administration on placement, timing, and the reporting format your licensing body expects.",
            "Large footprints mean multiple suction points, larger-diameter piping, and fans selected by static pressure and flow rather than by habit. Expansion joints, sub-slab utility trenches, and elevator pits get designed into the system rather than discovered mid-installation. Coring, piping, and electrical work can be phased into evenings, weekends, or scheduled breaks, and post-mitigation measurement is repeated on the same grid so the comparison is defensible.",
          ],
        },
        {
          heading: "What the finished work looks like",
          paragraphs: [
            "Straight, well-supported pipe runs. Exterior routing chosen with the curb appeal of the house in mind, or interior routing through a chase where that is cleaner. A labeled system with a visible manometer so you can confirm at a glance that the fan is drawing.",
            "Drop cloths in finished spaces, cores vacuumed as we drill, and the jobsite left the way we found it. Most homes are finished in four to eight hours.",
          ],
        },
      ]}
      bullets={[
        "Sub-slab communication diagnostics",
        "Single or multi-point suction design",
        "Crawlspace membrane systems",
        "Sump pit sealing and slab crack sealing",
        "Labeled system with manometer",
        "Post-installation verification test",
        "Written workmanship warranty",
        "Typically completed in one day",
        "Priority scheduling for active contracts",
        "New construction rough-in and activation",
        "Engineered multi-point commercial systems",
        "Documentation for closing and warranty files",
      ]}
    />
  );
}
