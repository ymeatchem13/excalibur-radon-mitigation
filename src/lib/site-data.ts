import type { AppPath } from "./routes";
import { ROUTES } from "./routes";

// Canonical origin, no trailing slash. Used to build the absolute URLs that
// Open Graph, canonical links, JSON-LD, and the sitemap all require. Relative
// URLs are silently ignored by social scrapers and rejected by Google's sitemap
// parser. Must match the host actually served (non-www here).
export const SITE_URL = "https://cincinnatiradonsolutions.com";

export const business = {
  name: "Cincinnati Radon Solutions",
  shortName: "Cincinnati Radon Solutions",
  /* These two must stay in sync; nothing enforces it. phoneHref is E.164 with
     no spaces, parentheses or hyphens, because mobile dialers mishandle a
     formatted tel: value. seo.ts derives the schema `telephone` from phoneHref
     rather than restating the digits, so there is no third copy to drift. */
  phoneDisplay: "(513) 854-6650",
  phoneHref: "tel:+15138546650",
  email: "service@cincinnatiradonsolutions.com",
  /* There is deliberately NO address or geo here, and adding placeholder values
     back is worse than leaving them out.

     A fabricated street address misleads visitors, and it actively harms the
     thing it looks like it helps: a Google Business Profile verified against an
     address the business does not occupy gets suspended, not ranked. The site
     is a service-area business - work happens at the customer's property - so
     "no public address" is the accurate description, not a gap.

     When a real, occupied address exists, add it here and change the schema type
     in seo.ts from Organization to a LocalBusiness subtype. That comment marks
     itself as the only other place that needs to change. */
  hours: "Mon to Sat, 7:00 AM to 7:00 PM",
};

/* `to` is AppPath, not string: a typo or a retired path is now a build error
   instead of a runtime 404. Nav links are never type-checked against the router
   otherwise, because Link's `to` accepts a plain string here. */
export type NavItem = { label: string; to: AppPath };

/* Ordered by revenue, not by customer journey. Residential mitigation is the
   core service and the term that dominates search; testing follows it. This
   order drives the header dropdown, the footer Services column, and the
   "Other services" cross-links on every service page. */
/* Two service pages, not five. Keyword data for this market put 80.7% of all
   measurable demand behind residential mitigation and 12.8% behind testing,
   with real estate, commercial and new construction sharing the remaining ~5%
   and 13 of their 15 tested terms returning no measurable volume at all. Those
   three are now sections on /services/radon-mitigation rather than separate URLs,
   which also concentrates page-level backlinks on two pages instead of five.
   The retired paths 301 to their new anchors. */
export const serviceNav: NavItem[] = [
  { label: "Radon Mitigation", to: ROUTES.radonMitigation.path },
  { label: "Radon Testing", to: ROUTES.radonTesting.path },
];

/* Header nav. Home is first so the desktop nav and the mobile sheet render from
   one list instead of hardcoding it twice.

   Contact is deliberately absent: the "Get Free Estimate" button already points
   at /contact, so a nav link would be a duplicate. Use footerNav below if you
   need Contact in a link list.

   Blog is absent on purpose too - the section is unlisted, not deleted. See the
   note on ROUTES.blog in routes.ts before adding it back.

   Services is absent for a different reason: Header already renders a "Services"
   dropdown trigger, so an entry here rendered a second, flat "Services" link
   immediately beside it. The /services hub is reached from the "All Services"
   item inside that dropdown. Do not re-add it. */
export const mainNav: NavItem[] = [
  { label: "Home", to: ROUTES.home.path },
  { label: "Service Areas", to: ROUTES.serviceAreas.path },
  { label: "About", to: ROUTES.about.path },
  { label: "FAQs", to: ROUTES.faqs.path },
];

/* Footer "Company" column. Carries Contact and the legal pages, neither of
   which belongs in the header.

   Services is absent here too: the footer already has its own "Services" column
   built from serviceNav, sitting directly beside this one, so an entry here
   repeated the neighbouring column's heading as a link. */
export const footerNav: NavItem[] = [
  { label: "Service Areas", to: ROUTES.serviceAreas.path },
  { label: "About", to: ROUTES.about.path },
  { label: "FAQs", to: ROUTES.faqs.path },
  { label: "Contact", to: ROUTES.contact.path },
];

/* Footer "Legal" column. Split out of footerNav so the policy pages sit in
   their own column rather than trailing the company links, which is where
   people look for them. Keep these two lists disjoint - a page in both renders
   twice in the same footer. */
export const legalNav: NavItem[] = [
  { label: "Privacy Policy", to: ROUTES.privacyPolicy.path },
  { label: "Terms of Service", to: ROUTES.terms.path },
  { label: "Accessibility", to: ROUTES.accessibility.path },
];

/* Six cards, two destinations. The four secondary offerings kept their card and
   their sales copy but now deep-link to the section that covers them, so the
   homepage still shows the full range of work without splitting link equity
   across five thin URLs.

   `hash` values must stay in sync with the section headings on the target page:
   they are produced by sectionAnchorId() in ServicePageLayout, which lowercases
   the heading and replaces every non-alphanumeric run with a hyphen. Change a
   heading and the matching hash here has to change with it. */
/* `to`, not `slug`: this field holds a full route path and is passed straight
   into <Link to={...}>. Calling it a slug was misleading and collided with the
   real slug fields on blogPosts and serviceAreas. */
export const services: {
  to: AppPath;
  hash?: string;
  icon: string;
  title: string;
  blurb: string;
}[] = [
  {
    to: ROUTES.radonMitigation.path,
    icon: "home",
    title: "Residential Radon Mitigation",
    blurb:
      "Sub-slab depressurization systems designed around your foundation: basement, crawlspace, slab-on-grade, or a combination.",
  },
  {
    to: ROUTES.radonTesting.path,
    icon: "gauge",
    title: "Radon Testing",
    blurb:
      "Continuous monitor and long-term testing that follows EPA measurement protocols, with a plain-English report you can actually use.",
  },
  {
    to: ROUTES.radonTesting.path,
    hash: "post-mitigation-and-follow-up-testing",
    icon: "clipboard",
    title: "Post-Mitigation Testing",
    blurb:
      "Every installation is followed by a verification test so you have documented proof the system is doing its job.",
  },
  {
    to: ROUTES.radonMitigation.path,
    hash: "radon-mitigation-on-a-real-estate-deadline",
    icon: "key",
    title: "Real Estate Radon Solutions",
    blurb:
      "Transaction-speed testing and mitigation that keeps closings on schedule for buyers, sellers, and agents.",
  },
  {
    to: ROUTES.radonMitigation.path,
    hash: "building-the-system-in-during-new-construction",
    icon: "hammer",
    title: "New Construction Radon Systems",
    blurb:
      "Passive and active rough-in systems installed during the build, when the work is cleanest and least expensive.",
  },
  {
    to: ROUTES.radonMitigation.path,
    hash: "commercial-and-multi-family-buildings",
    icon: "building",
    title: "Commercial Radon Mitigation",
    blurb:
      "Schools, offices, daycares, and multi-family buildings: diagnostics, engineered design, and low-disruption installation.",
  },
];

export const steps = [
  {
    title: "Schedule Inspection",
    body: "Call or send a request and we'll set a visit that fits your week, usually within a few business days.",
  },
  {
    title: "Radon Testing",
    body: "We place a calibrated continuous radon monitor in the lowest livable level and follow EPA closed-house conditions.",
  },
  {
    title: "Custom System Design",
    body: "Diagnostics tell us where the soil gas is moving. We design suction points and routing around your home, not a template.",
  },
  {
    title: "Professional Installation",
    body: "Most systems are installed in a single day, with drop cloths down, sealed penetrations, and a tidy jobsite at the end.",
  },
  {
    title: "Post-Installation Testing",
    body: "A follow-up test confirms the reduction, and you receive documentation for your records or your closing file.",
  },
];

export const whyUs = [
  {
    title: "Locally Owned",
    body: "We live here. Our crews know Cincinnati's limestone shale geology and the housing stock from Hyde Park to Hebron.",
  },
  {
    title: "EPA Best Practices",
    body: "Testing and installation follow current EPA guidance and national radon mitigation standards.",
  },
  {
    title: "Experienced Technicians",
    body: "Systems are installed by trained mitigation technicians, never subcontracted out to whoever is available.",
  },
  {
    title: "Transparent Pricing",
    body: "One written quote before work starts. No day-of add-ons, no pressure, no vague allowances.",
  },
  {
    title: "Fast Scheduling",
    body: "Real estate deadlines don't wait. We hold capacity each week for time-sensitive transactions.",
  },
  {
    title: "Workmanship Warranty",
    body: "Our installations carry a long-term workmanship warranty; specific terms are provided with your written estimate.",
  },
  {
    title: "Clean Installations",
    body: "Straight pipe runs, discreet exterior routing, sealed penetrations, and finished spaces left the way we found them.",
  },
  {
    title: "Excellent Communication",
    body: "Arrival windows you can count on, photos of the finished work, and a person who answers the phone afterward.",
  },
];

// Map centers for the coverage map. These drive a keyless Google Maps embed
// (?ll=lat,lng&z=zoom&output=embed), which centers on the coordinate with no
// marker and no place card, the right treatment for a service-area map, since
// a pin would read as a business location. Centering by coordinate rather than
// by search string also means Google's geocoder is never in the render path.
//
// Coordinates were taken from Google's own resolution of each place name; the
// default center sits south of downtown so the frame includes both the Ohio
// suburbs and the Northern Kentucky counties.
export const serviceAreaMapDefault = {
  lat: 39.05,
  lng: -84.51,
  zoom: 9,
  note: "Hamilton, Butler, Warren, Clermont, Boone, Kenton & Campbell counties",
};

// `state` exists so JSON-LD `areaServed` can name a region without inferring it
// from the county string. `region: true` marks the one entry that is a multi-county
// area rather than a municipality, so schema can type it AdministrativeArea.
// `slug` is written out rather than derived from `name`: "Northern Kentucky" is a
// region, not a municipality, and does not slug cleanly with a state suffix.
// It drives /service-areas/{slug}, so it is a published URL - do not rename one
// without adding a redirect.
export type ServiceArea = {
  name: string;
  slug: string;
  note: string;
  state: string;
  region?: boolean;
  lat: number;
  lng: number;
  zoom: number;
  /** One-line local-conditions summary. Shown on the /service-areas hub card. */
  blurb: string;
};

export const serviceAreas: ServiceArea[] = [
  {
    name: "Cincinnati",
    slug: "cincinnati-oh",
    note: "Hamilton County",
    state: "OH",
    lat: 39.1031,
    lng: -84.512,
    zoom: 11,
    blurb:
      "From Hyde Park and Oakley to Price Hill and Northside, much of the city's housing stock has block foundations and open sump pits, the two entry points we seal most often.",
  },
  {
    name: "Blue Ash",
    slug: "blue-ash-oh",
    note: "Hamilton County",
    state: "OH",
    lat: 39.232,
    lng: -84.3783,
    zoom: 13,
    blurb:
      "Ranches and split-levels over tight sub-slab fill frequently need two suction points to reach the whole slab.",
  },
  {
    name: "Mason",
    slug: "mason-oh",
    note: "Warren County",
    state: "OH",
    lat: 39.3601,
    lng: -84.3099,
    zoom: 13,
    blurb:
      "Newer, tighter construction with large basement footprints. Passive stacks are common here and often need activation.",
  },
  {
    name: "West Chester",
    slug: "west-chester-oh",
    note: "Butler County",
    state: "OH",
    lat: 39.3321,
    lng: -84.4173,
    zoom: 12,
    blurb:
      "Walk-out basements and mixed foundations where crawlspace membrane work is often part of the design.",
  },
  {
    name: "Loveland",
    slug: "loveland-oh",
    note: "Clermont County",
    state: "OH",
    lat: 39.2689,
    lng: -84.2638,
    zoom: 13,
    blurb:
      "Older homes near the river valley sit alongside newer subdivisions. We see a wide spread of readings in the same zip code.",
  },
  {
    name: "Milford",
    slug: "milford-oh",
    note: "Clermont County",
    state: "OH",
    lat: 39.1753,
    lng: -84.2944,
    zoom: 13,
    blurb:
      "Clermont County soils transmit soil gas readily; finished lower levels here are a frequent mitigation trigger.",
  },
  {
    name: "Anderson Township",
    slug: "anderson-township-oh",
    note: "Hamilton County",
    state: "OH",
    lat: 39.0902,
    lng: -84.3437,
    zoom: 12,
    blurb:
      "Hillside lots and walk-outs mean pipe routing takes planning to stay discreet on the elevation.",
  },
  {
    name: "Hamilton",
    slug: "hamilton-oh",
    note: "Butler County",
    state: "OH",
    lat: 39.3989,
    lng: -84.5588,
    zoom: 12,
    blurb:
      "Century homes with stone and block foundations that benefit from wall depressurization alongside sub-slab work.",
  },
  {
    name: "Fairfield",
    slug: "fairfield-oh",
    note: "Butler County",
    state: "OH",
    lat: 39.3455,
    lng: -84.5603,
    zoom: 13,
    blurb: "Slab-on-grade and shallow basements where suction point placement decides the result.",
  },
  // Spans three counties, so center inland from Covington and pull the zoom out.
  {
    name: "Northern Kentucky",
    slug: "northern-kentucky",
    note: "Boone / Kenton / Campbell",
    state: "KY",
    region: true,
    lat: 38.98,
    lng: -84.53,
    zoom: 10,
    blurb:
      "Boone, Kenton, and Campbell county homes across the river: same crews, same-week scheduling.",
  },
  {
    name: "Florence",
    slug: "florence-ky",
    note: "Boone County",
    state: "KY",
    lat: 38.9989,
    lng: -84.6266,
    zoom: 13,
    blurb:
      "Fast-growing subdivisions with newer slabs and rough-ins we can activate and verify quickly.",
  },
  {
    name: "Fort Thomas",
    slug: "fort-thomas-ky",
    note: "Campbell County",
    state: "KY",
    lat: 39.0751,
    lng: -84.4472,
    zoom: 13,
    blurb: "Older hillside homes where interior routing is usually the cleanest option.",
  },
  {
    name: "Covington",
    slug: "covington-ky",
    note: "Kenton County",
    state: "KY",
    lat: 39.0837,
    lng: -84.5086,
    zoom: 13,
    blurb: "Historic homes and multi-family buildings needing careful, low-impact installation.",
  },
];

export const faqs = [
  {
    q: "What is radon?",
    a: "Radon is a naturally occurring radioactive gas produced as uranium in soil and rock breaks down. It has no color, odor, or taste, and it moves from the ground into homes through foundation cracks, sump pits, utility penetrations, and porous block walls.",
  },
  {
    q: "Is radon dangerous?",
    a: "The EPA identifies long-term radon exposure as the leading cause of lung cancer among people who have never smoked, and recommends taking action at indoor levels of 4.0 pCi/L or higher. Risk depends on the level and how long you're exposed, which is why testing is the only way to know where your home stands.",
  },
  {
    q: "How long does installation take?",
    a: "Most single-family homes are completed in a single visit of four to eight hours. Larger homes, multiple foundation types, or crawlspace encapsulation can extend into a second day. We give you the expected timeline in writing before we start.",
  },
  {
    q: "How much does a radon mitigation system cost?",
    a: "The EPA's Consumer's Guide to Radon Reduction puts a radon reduction system in most homes at roughly $800 to $2,500, and notes the price depends on the home's size, design, and foundation. Published prices from Cincinnati and Dayton area mitigation companies land in the same place: $800 to $2,500 is the most commonly posted local range, and one local pricing calculator publishes $1,200 to $2,400. Radon testing is commonly quoted locally between $100 and $300. Those are market ranges published by the EPA and by other companies, not our price list. What your home costs depends on foundation type, how many suction points the diagnostics call for, and pipe routing, so we give you a firm written quote after an on-site visit rather than a number over the phone we'd have to revise later.",
  },
  {
    q: "Do I need testing afterward?",
    a: "Yes. A post-mitigation test is how you confirm the system actually reduced the level in your home. We include verification testing with every installation and provide documentation you can keep or hand to a buyer.",
  },
  {
    q: "Will the system increase my electric bill?",
    a: "Very little. A modern radon fan draws roughly the same power as a household light bulb and runs continuously, which typically works out to a few dollars per month. Sealing and proper fan sizing keep conditioned-air loss minimal.",
  },
];

export const stats = [
  { value: "4.0 pCi/L", label: "EPA Action Level", sub: "The EPA recommends fixing homes at or above this reading" },
  { value: "1 in 15", label: "U.S. Homes Affected", sub: "EPA estimate of homes with elevated indoor radon" },
  { value: "ANSI/AARST", label: "Installation Standard", sub: "The national consensus standard we build systems to" },
  { value: "1 Day", label: "Typical Installation", sub: "Most residential systems finish in a single visit" },
];

export const trustBadges = ["Licensed", "Insured", "Locally Owned", "Free Estimates"];

export type BlogPost = {
  slug: string;
  /** Editorial headline. Used as the <h1>. Length is unconstrained. */
  title: string;
  /**
   * Shorter title for the <title> tag only, where Google truncates around 60
   * characters. Set it when `title` is longer than that; the <h1> always keeps
   * the full editorial version.
   */
  seoTitle?: string;
  description: string;
  date: string;
  readingTime: string;
  image: string;
  body: { heading: string; paragraphs: string[] }[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "what-is-radon",
    title: "What Is Radon? A Plain-English Guide for Cincinnati Homeowners",
    seoTitle: "What Is Radon? A Plain-English Guide for Homeowners",
    description:
      "Radon is invisible, odorless, and common in Ohio soil. Here's what it actually is, how it gets into a house, and what the numbers on a test report mean.",
    date: "2026-06-18",
    readingTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=70",
    body: [
      {
        heading: "Where radon comes from",
        paragraphs: [
          "Radon is a radioactive gas produced when uranium decays. Uranium is present in trace amounts in nearly all soil and rock. In the Ohio Valley, glacial till and the limestone-shale bedrock underneath much of Hamilton, Butler, Warren, and Clermont counties tend to produce and transmit more radon than the national average.",
          "Because radon is a gas, it moves. It migrates through soil pore spaces toward areas of lower pressure, and in cool weather a heated house is exactly that: a low-pressure zone pulling air, and soil gas, up through the foundation.",
        ],
      },
      {
        heading: "How it enters a home",
        paragraphs: [
          "The usual entry points are unglamorous: the gap where the slab meets the foundation wall, shrinkage cracks in poured concrete, open sump pits, floor drains, hollow block wall cavities, and the penetrations cut for plumbing and electrical.",
          "Two identical houses on the same street can test very differently. Foundation type, soil permeability, HVAC configuration, and how tightly the house is sealed all change the result, which is why a neighbor's test is not a substitute for your own.",
        ],
      },
      {
        heading: "Reading your test result",
        paragraphs: [
          "Results are reported in picocuries per liter, abbreviated pCi/L. The EPA recommends taking action at 4.0 pCi/L or higher and notes that reductions are still worth considering between 2.0 and 4.0 pCi/L.",
          "There is no threshold below which radon is understood to be entirely risk-free, so the practical goal of mitigation is to get the level as low as reasonably achievable, typically well under 2.0 pCi/L on a properly designed radon mitigation system.",
        ],
      },
    ],
  },
  {
    slug: "how-radon-mitigation-works",
    title: "How Radon Mitigation Works: Inside a Sub-Slab Depressurization System",
    seoTitle: "How a Radon Mitigation System Works, Step by Step",
    description:
      "A radon system is simple in principle and specific in execution. Here's what each component does and why placement matters more than parts.",
    date: "2026-05-29",
    readingTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=70",
    body: [
      {
        heading: "The core idea",
        paragraphs: [
          "Nearly every residential system is a sub-slab depressurization system. A suction point is cored through the slab, a small pit is excavated in the aggregate beneath it, and a continuously running fan pulls soil gas from under the foundation and vents it above the roofline.",
          "The fan doesn't just remove gas; it reverses the pressure relationship between the soil and your basement. Instead of the house drawing soil gas in, the system holds a slight negative pressure under the slab so the gas travels out through the pipe.",
        ],
      },
      {
        heading: "Why placement beats hardware",
        paragraphs: [
          "Any competent installer can source the same pipe and fans. What separates a system that quietly underperforms from one that actually pulls the level down is diagnostics: measuring communication under the slab to learn how far a single suction point can reach through the sub-grade material.",
          "Homes over poorly draining clay fill, homes with interior footings that divide the sub-slab area, and homes with mixed foundations frequently need more than one suction point. Skipping that step is the most common reason a system underperforms.",
        ],
      },
      {
        heading: "What you should see when it's done",
        paragraphs: [
          "A labeled system, a visible manometer showing the fan is drawing, sealed sump lid and slab penetrations, pipe pitched to drain condensate back to the pit, and a discharge that terminates above the eave and away from windows.",
          "You should also receive a post-mitigation test. Without it, you have a fan running and no evidence of what it accomplished.",
        ],
      },
    ],
  },
  {
    slug: "radon-levels-in-cincinnati",
    title: "Radon Levels in Cincinnati: What the Regional Data Tells Homeowners",
    seoTitle: "Radon Levels in Cincinnati and Ohio: What Data Shows",
    description:
      "Why Southwest Ohio and Northern Kentucky see elevated readings so often, and which foundation types tend to test highest.",
    date: "2026-05-07",
    readingTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=1200&q=70",
    body: [
      {
        heading: "A regional geology problem",
        paragraphs: [
          "Much of Southwest Ohio sits in an EPA radon zone associated with elevated indoor readings. The Ordovician limestone and shale beneath the region, combined with glacial deposits north of the river, create both a radon source and pathways for it to travel.",
          "That's a regional tendency, not a guarantee. Individual homes in the same subdivision routinely differ by several pCi/L.",
        ],
      },
      {
        heading: "Which homes test high",
        paragraphs: [
          "Full basements used as living space are the most common finding, particularly older homes with block foundation walls, open sump pits, or unsealed utility penetrations.",
          "Newer, tighter homes are not exempt. Reduced natural air exchange means whatever soil gas does enter is diluted less, so a well-built 2015 house can read higher than the 1955 one next door.",
        ],
      },
      {
        heading: "What to do with that information",
        paragraphs: [
          "Test first. A short-term test with a continuous monitor gives you a defensible number in a couple of days, and it costs a fraction of what people assume.",
          "If the result is at or above 4.0 pCi/L, the EPA recommends fixing the home. Between 2.0 and 4.0, mitigation is a reasonable choice, especially if the basement is finished space where your family spends real time.",
        ],
      },
    ],
  },
  {
    slug: "when-should-you-test-your-home",
    title: "When Should You Test Your Home for Radon?",
    description:
      "Season, occupancy, renovations, and real estate deadlines all affect timing. Here's a practical schedule.",
    date: "2026-04-15",
    readingTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=70",
    body: [
      {
        heading: "The short answer",
        paragraphs: [
          "Test every two years, and again any time something significant changes about the house: a new HVAC system, a finished basement, foundation work, new windows, or a major air-sealing project.",
          "Heating season generally produces the highest readings because the stack effect is strongest, but modern continuous monitors under closed-house conditions produce usable results year-round.",
        ],
      },
      {
        heading: "Triggers that should move testing up your list",
        paragraphs: [
          "You're about to finish a basement. You've moved a bedroom, office, or playroom to a lower level. You're buying or selling. You've never tested. A neighbor tested high. Any one of those is enough.",
          "If you already have a mitigation system, retest every two years and after any fan replacement. Fans are mechanical and eventually wear out.",
        ],
      },
    ],
  },
  {
    slug: "buying-a-home-read-this-first",
    title: "Buying a Home in Cincinnati? Read This Before You Waive the Radon Test",
    seoTitle: "Buying a Home? Do Not Waive the Radon Test",
    description:
      "Radon is one of the least expensive inspection items to resolve and one of the easiest to mishandle under a deadline. Here's how to handle it.",
    date: "2026-03-22",
    readingTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=70",
    body: [
      {
        heading: "Don't skip it to look competitive",
        paragraphs: [
          "In a tight market, buyers strip contingencies to strengthen an offer. Radon is a poor place to economize: testing is inexpensive relative to the transaction, and mitigation costs are a small fraction of what most buyers imagine.",
          "Testing during the inspection period also gives you documentation that follows the property, which is useful when you eventually sell.",
        ],
      },
      {
        heading: "How the timeline usually works",
        paragraphs: [
          "A continuous monitor test runs a minimum of 48 hours under closed-house conditions, with results the same day the device is retrieved. If mitigation is negotiated, installation is usually a single day, followed by a verification test.",
          "The failure mode we see most often is starting the test too late in the inspection window. Schedule it in the first few days, not the last.",
        ],
      },
      {
        heading: "Negotiating the repair",
        paragraphs: [
          "Sellers commonly agree to install a system or credit the buyer. Either is workable. Just make sure the agreement specifies a post-mitigation test result, not merely that a system was installed.",
          "If the home already has a system, ask for the original post-mitigation report and have the level re-verified. A fan that is running is not proof that a level is low.",
        ],
      },
    ],
  },
];
