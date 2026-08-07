/**
 * Long-form copy for the per-city pages at /service-areas/{slug}.
 *
 * Kept out of site-data.ts so that file stays a quick-reference index.
 *
 * TWO RULES THIS FILE EXISTS TO ENFORCE:
 *
 * 1. No sentence here may appear on more than one city. Thirteen pages that
 *    differ only by a swapped city name is a doorway network, and the automated
 *    overlap check in the verification script fails the build if that drifts.
 *    If a new city has nothing specific to say, it does not get a page.
 *
 * 2. No fabricated local statistics. No per-city pCi/L readings, no "X% of homes
 *    in Mason". The repo's own research flags even the Ohio Department of Health
 *    figures as as-retrieved and unverified. Claims here are limited to the built
 *    environment and to how we approach the work, both of which are checkable by
 *    someone who knows the market - which is the point, because they need to be
 *    reviewed before launch.
 *
 * `primaryService` may only point at the two live service pages, which now sit
 * under /services. Every other service path in this repo throws a redirect in
 * beforeLoad, and linking internally to a 301 wastes the link and trips Search
 * Console. Taking the values from ROUTES rather than typing them makes that a
 * compile error rather than a thing to remember.
 */

import { ROUTES } from "./routes";

export type ServiceAreaContent = {
  /** Opens the page. Sets up why this community is its own conversation. */
  intro: string;
  /**
   * Meta description only - never rendered on the page. Exists because `intro`
   * doubles as the visible hero subhead, and prose that reads well under an h1
   * runs far past Google's ~160-char snippet limit. Keep each one 140-158 chars
   * and unique per city: thirteen near-identical descriptions is the duplicate-meta
   * problem rule 1 above already forbids for body copy.
   */
  metaDescription: string;
  /** The built environment: era, foundations, lot conditions. */
  housingStock: string;
  /** How the diagnostics and design actually differ here. */
  whatWeSee: string;
  /** What installation day looks like in this community specifically. */
  installDay: string;
  /** Real, well-known areas within the community. */
  neighborhoods: string[];
  primaryService: typeof ROUTES.radonTesting.path | typeof ROUTES.radonMitigation.path;
  /** Slugs of adjacent communities, for internal linking. */
  nearby: string[];
};

export const serviceAreaContent: Record<string, ServiceAreaContent> = {
  "cincinnati-oh": {
    intro:
      "The city's housing stock spans more than a century, and that range is the whole challenge. A 1920s foursquare in Hyde Park and a 1990s infill build a mile away need different diagnostics before anyone picks a suction point.",
    metaDescription:
      "Radon mitigation systems and EPA-protocol testing for Cincinnati, OH homes, from 1920s foursquares to new infill builds. Free quote, verified retest.",
    housingStock:
      "Block and stone foundations dominate the older neighborhoods, usually with open sump pits, unsealed utility chases, and additions poured against an existing wall decades after the original build. Those additions are the detail most often missed: the joint between old pour and new is rarely sealed, and it frequently turns out to be the dominant entry path once smoke testing starts. Hillside lots on both sides of the basin add a routing constraint on top of all that, because the grade that makes the view also decides where a stack can legally and sensibly terminate.",
    whatWeSee:
      "Sealing comes before suction on most city jobs. Open pits get a gasketed, serviceable lid rather than a caulked-down sheet, the slab-to-wall joint gets attention, and only then does the fan get sized against what the slab will actually give up. Reversing that order is how a system ends up loud, expensive to run, and still underperforming — the fan ends up compensating for openings that a tube of sealant would have closed.",
    installDay:
      "Older city homes rarely offer a straight vertical run, so we walk the route with the owner before anything is cut. Interior chases, closet stacks, and unused chimney flues all come into play, and on a narrow lot the discharge point has to clear windows and the neighbouring property line at the same time. Most single-family installs still finish inside a day.",
    neighborhoods: ["Hyde Park", "Oakley", "Northside", "Price Hill", "Clifton", "Mount Lookout"],
    primaryService: ROUTES.radonMitigation.path,
    nearby: ["blue-ash-oh", "anderson-township-oh", "covington-ky"],
  },

  "blue-ash-oh": {
    intro:
      "Blue Ash was built out over a narrow span of years, which makes the diagnostics here unusually predictable — and makes the failure mode predictable too.",
    metaDescription:
      "Radon mitigation and testing for Blue Ash, OH ranches and split-levels, where one suction point rarely covers the whole slab. Free on-site diagnosis.",
    housingStock:
      "Ranches and split-levels over tight sub-slab fill. Slab footprints are often wider than the basement beneath them, and split-level designs put finished rooms directly on grade at one end of the house, which means part of the living space sits on a pour that was never intended to be occupied space. Fill compacted tightly under those slabs resists the lateral movement a single point depends on.",
    whatWeSee:
      "One suction point rarely serves a whole ranch slab. Communication testing usually shows pressure falling away well before it reaches the far corner, so a second point is common — and far cheaper installed on day one than retrofitted after a disappointing retest. Where a split-level puts rooms on grade, that wing generally needs its own treatment rather than being assumed to draw from the main pour.",
    installDay:
      "Attached garages give us something most older neighbourhoods do not: a clean, concealed vertical path with an easy roofline exit. Where that works, nothing visible changes on the front of the house. Slab-on-grade wings sometimes need a short exterior run instead, which we place on the least-seen elevation and match to the trim colour.",
    neighborhoods: ["Cornell", "Summit Park", "Kenwood", "Reed Hartman corridor"],
    primaryService: ROUTES.radonMitigation.path,
    nearby: ["cincinnati-oh", "mason-oh", "loveland-oh"],
  },

  "mason-oh": {
    intro:
      "Most Mason homes went up after radon-resistant rough-ins became routine, so a lot of houses here already have most of a system sitting in the walls. It was simply never turned on.",
    metaDescription:
      "Radon testing and mitigation system activation in Mason, OH. Many homes here have a builder's passive stack already in the walls, never switched on.",
    housingStock:
      "Newer, tighter construction with large basement footprints and sealed membrane beneath the slab. Passive stacks running from the aggregate layer up through the roofline are common in subdivisions built from the 1990s onward. A passive stack is a genuine head start, but it was installed to a builder's rough-in spec rather than to a measured result, and nobody tested the house afterward to find out whether it worked.",
    whatWeSee:
      "The job is usually activation rather than installation: confirm the existing stack genuinely terminates in the aggregate, check the run is sealed end to end through every floor it passes, fit a correctly sized fan, then retest. We have opened rough-ins that stopped in the slab instead of below it, which no fan can fix. A tight building envelope also holds on to whatever the house does pull in, which is why the confirming test is not optional here.",
    installDay:
      "Activating an existing stack is the shortest visit we make, often a few hours rather than a full day, because the pipe already runs where it needs to. The fan mounts outside the conditioned space, the system gets a manometer the owner can actually read, and the follow-up test is scheduled before we leave.",
    neighborhoods: ["Deerfield Township", "Kings Mills", "Western Row", "Mason-Montgomery corridor"],
    primaryService: ROUTES.radonTesting.path,
    nearby: ["west-chester-oh", "blue-ash-oh", "loveland-oh"],
  },

  "west-chester-oh": {
    intro:
      "West Chester puts several foundation types inside a single subdivision, which makes it one of the harder places on our routes to quote without seeing the house.",
    metaDescription:
      "Radon mitigation systems and testing for West Chester, OH homes, where basements, crawlspaces, and slabs often sit under one roof. Free written quote.",
    housingStock:
      "Walk-out basements back onto grade changes, and it is common to find a conditioned basement, a crawlspace, and a slab section all under one roof. Each offers soil gas its own way in, and each responds differently to depressurization. Two houses on the same street, built by the same builder in the same year, can require materially different designs because the lot fell away at a different angle.",
    whatWeSee:
      "Mixed foundations need a combined design: depressurization under the poured section, sealed membrane over the crawlspace, and one fan sized to serve both without starving either. Getting that balance wrong is the most frequent reason a follow-up test comes back higher than the owner expected. We measure each zone separately rather than treating the footprint as one volume.",
    installDay:
      "Crawlspace membrane work is the part that takes the time — it is hands-and-knees labour, and doing it properly means sealing to the wall and around every pier rather than laying sheet and calling it done. Plan for a longer day when a crawl is part of the design, and expect the crawl to be the reason the retest lands where it should.",
    neighborhoods: ["Beckett Ridge", "Union Centre", "Tylersville", "Liberty Township edge"],
    primaryService: ROUTES.radonMitigation.path,
    nearby: ["mason-oh", "fairfield-oh", "hamilton-oh"],
  },

  "loveland-oh": {
    intro:
      "Loveland reaches into three counties and roughly a century of building, so two houses a mile apart can behave nothing alike.",
    metaDescription:
      "Radon testing and mitigation systems for Loveland, OH homes across three counties, where a neighbor's reading tells you little. Diagnostics before design.",
    housingStock:
      "Older homes sit near the Little Miami valley floor while newer subdivisions climb the ground above it. Valley lots bring their own drainage and moisture conditions into the design, and a sump that runs regularly changes both the entry path and the sealing approach. Higher ground behaves more like the newer suburbs to the north, with membrane under the slab and a rough-in already in place.",
    whatWeSee:
      "We treat a test result as the start of the conversation rather than the end of it, because the spread inside one zip code here is wide enough that a neighbour's number tells you very little about your own. Diagnostics before design matter more in Loveland than almost anywhere we work, and we would rather spend an extra hour measuring than guess at a suction point on a house whose behaviour is genuinely hard to predict from the outside.",
    installDay:
      "An active sump gets a sealed, serviceable lid with a viewing port, not a permanent cap — the pump still has to be replaceable without cutting the system apart. Where a home sits low against the valley, we check the discharge height against the surrounding grade so the exhaust is not simply re-entering through a nearby window.",
    neighborhoods: ["Historic downtown", "Miami Trails", "Loveland-Madeira corridor", "Symmes Township edge"],
    primaryService: ROUTES.radonTesting.path,
    nearby: ["milford-oh", "mason-oh", "blue-ash-oh"],
  },

  "milford-oh": {
    intro:
      "Finished lower levels are what usually bring us to Milford. A basement nobody used was one kind of risk conversation; a basement someone sleeps in is another.",
    metaDescription:
      "Radon mitigation systems and EPA-protocol testing for Milford, OH homes with finished lower levels. Clean installs, contained work area, verified retest.",
    housingStock:
      "Clermont County ground drains well, which also means it carries soil gas well. The older sections around Old Milford behave differently from the newer builds spreading through Miami Township, and a finished lower level in either can hide the exact joints and penetrations we most need to reach. Framing, drywall and flooring installed over a slab do not stop soil gas; they only stop you seeing where it arrives.",
    whatWeSee:
      "An occupied lower level raises both the exposure and the standard for the installation. It also constrains it: the diagnostic holes and the suction point have to land somewhere that can be closed up cleanly afterward, which usually means working from a utility room, a closet, or behind existing mechanicals rather than in the middle of a finished floor.",
    installDay:
      "We agree the exact core location with the owner before drilling, because in a finished space that decision is effectively permanent. Dust control matters more here than on a bare slab, so the work area gets contained, and the fan is sized with noise in mind — a system a family can hear from the sofa is one they will eventually unplug.",
    neighborhoods: ["Old Milford", "Miami Township", "Day Heights", "Terrace Park edge"],
    primaryService: ROUTES.radonMitigation.path,
    nearby: ["loveland-oh", "anderson-township-oh", "cincinnati-oh"],
  },

  "anderson-township-oh": {
    intro:
      "Anderson is a routing problem before it is a radon problem. The mitigation design is often straightforward; getting the pipe out of the house without ruining the elevation is not.",
    metaDescription:
      "Radon mitigation and testing in Anderson Township, OH. Hillside and walk-out homes need the pipe routed with care. We plan the run before quoting.",
    housingStock:
      "Hillside lots and walk-out designs mean the back of the house is frequently its most visible side. An exterior stack that would disappear on a flat lot ends up in full view from the yard, the deck, or the street below. Walk-out levels also put finished rooms at grade on the low side, so the part of the house most exposed to the soil is often the part the family uses most.",
    whatWeSee:
      "We plan the exterior run before quoting, not after. Interior routing through a chase or the garage wherever the layout permits it, discreet placement and matched paint where it does not. Homeowners here notice what gets attached to the back of the house, and they are right to — a system that solves the reading and wrecks the elevation has only half worked.",
    installDay:
      "Expect a longer walkthrough than the install itself warrants. We look at the discharge from the deck, from the yard, and from whatever the property below can see, then agree the route before any pipe is cut. Where the grade allows an interior run to the roofline, that is almost always the option we recommend even though it costs us more time.",
    neighborhoods: ["Beechmont", "Clough Pike", "Five Mile", "Newtown", "Mount Washington edge"],
    primaryService: ROUTES.radonMitigation.path,
    nearby: ["milford-oh", "cincinnati-oh", "fort-thomas-ky"],
  },

  "hamilton-oh": {
    intro:
      "Hamilton's century homes are the reason our trucks carry more sealing material than a typical crew needs.",
    metaDescription:
      "Radon mitigation systems and testing for Hamilton, OH century homes. Hollow-block walls need their own treatment, not just sub-slab work. Free quote.",
    housingStock:
      "Stone and block foundations, rubble walls, dirt-floor sections, and additions layered on across generations. Hollow block is the detail that changes everything: the cores form a continuous cavity from footing to sill, which behaves as its own soil-gas pathway entirely independent of the slab. A design that treats only the floor leaves that route wide open.",
    whatWeSee:
      "Wall depressurization alongside the sub-slab work is common here, and it is a different intervention — points enter the block cavity itself rather than the aggregate beneath the floor. That means more diagnostic time before a number can be quoted, and it means the price genuinely depends on what the walls turn out to be. Anyone quoting a century home over the phone is guessing.",
    installDay:
      "Rubble and stone rarely give a clean seal on the first pass, so we budget time to come back to joints once the initial sealing has cured. Dirt-floor sections need membrane before anything else is worth doing. These are the jobs most likely to need a second visit, and we would rather say that upfront than discover it at the retest.",
    neighborhoods: ["Dayton Lane Historic District", "Rossville", "German Village", "Lindenwald", "Highland Park"],
    primaryService: ROUTES.radonMitigation.path,
    nearby: ["fairfield-oh", "west-chester-oh", "mason-oh"],
  },

  "fairfield-oh": {
    intro:
      "In Fairfield, suction point placement decides the result far more than fan size does.",
    metaDescription:
      "Radon mitigation systems and testing for Fairfield, OH slab and shallow-basement homes. Suction point placement decides the result more than fan size.",
    housingStock:
      "Slab-on-grade and shallow-basement construction from the 1960s through the 1980s, often with limited headroom below and few interior routing options to choose between. Sub-slab material from that era varies widely — some pours sit on clean aggregate that moves air readily, others on compacted native soil that barely moves at all — and which one you have is not visible until a hole goes in.",
    whatWeSee:
      "A shallow footprint leaves little margin for a poorly placed point. We run communication tests to find where the sub-slab actually connects before committing to a location, rather than defaulting to the mechanical room because it is the convenient place to put a pipe. On a poor-communication slab the honest answer is sometimes two modest points rather than one aggressive fan.",
    installDay:
      "Low headroom shapes the whole visit: fittings have to be assembled outside the crawl space and carried in, and the horizontal run needs planning so nobody is ducking under it for the next twenty years. Where the slab is the only viable path, we place the riser against a wall rather than in open floor.",
    neighborhoods: ["Nilles Road corridor", "Fairfield Township", "Symmes Road", "Village Green"],
    primaryService: ROUTES.radonMitigation.path,
    nearby: ["hamilton-oh", "west-chester-oh", "cincinnati-oh"],
  },

  // Written as a parent, not a peer. Florence, Covington and Fort Thomas have
  // their own pages, so this one points down to them instead of restating their
  // detail and competing with them for the same queries.
  "northern-kentucky": {
    intro:
      "Boone, Kenton, and Campbell counties get the same crews and the same week's scheduling as our Ohio routes. The river has never been a service boundary for us.",
    metaDescription:
      "Radon mitigation systems and testing across Boone, Kenton, and Campbell counties, KY. Same crews and same week's scheduling as our Ohio routes.",
    housingStock:
      "The three counties differ enough that it is worth reading the page for your own community. Boone leans heavily toward newer subdivision construction, much of it built with a builder's rough-in already in place. Kenton is dominated by historic urban housing with masonry foundations and shared walls. Campbell runs to older homes built into the hillsides above the river, where access rather than diagnostics tends to be the constraint.",
    whatWeSee:
      "Kentucky work follows the same EPA measurement protocol and the same post-installation verification as everything we install across the river, and it is scheduled from the same board rather than treated as an outlying territory. What changes county to county is the building, not the standard we hold the result to.",
    installDay:
      "Crossing the river adds nothing to a quote and nothing to the lead time. If you are not sure which community page applies to your address, the map above is the fastest way to find it, and each of the three linked below covers what that county's housing actually calls for.",
    neighborhoods: ["Boone County", "Kenton County", "Campbell County"],
    primaryService: ROUTES.radonTesting.path,
    nearby: ["florence-ky", "covington-ky", "fort-thomas-ky"],
  },

  "florence-ky": {
    intro:
      "Florence has grown quickly enough that a large share of its housing already carries a builder's passive rough-in waiting to be finished.",
    metaDescription:
      "Radon testing and mitigation for Florence, KY homes. Many carry a builder's passive rough-in that only needs verifying and activating. Free estimate.",
    housingStock:
      "Newer subdivision slabs with under-slab membrane and either a capped stub in the basement or a full passive stack already run to the roofline. Because these were installed as a code-driven rough-in rather than as a response to a measurement, the quality varies with whoever was on site that week — the pipe is usually where it should be, and the connection at the bottom sometimes is not.",
    whatWeSee:
      "Verification comes first. A rough-in that never properly reached the aggregate beneath the slab will not perform regardless of what fan gets bolted to it, and adding suction to a bad connection produces noise instead of results. Where the rough-in is sound, activating it and confirming the outcome is genuinely quick work, and we will tell you which of the two you have before quoting.",
    installDay:
      "A sound rough-in turns this into a short visit: fan, electrical, manometer, and a scheduled retest. Where the stub was never connected properly, the work becomes a normal installation and we say so before starting rather than fitting a fan and hoping. Newer subdivisions also mean attic access is usually straightforward, which keeps the run out of sight.",
    neighborhoods: ["Mall Road corridor", "Houston Road", "Burlington Pike", "Union edge"],
    primaryService: ROUTES.radonTesting.path,
    nearby: ["northern-kentucky", "covington-ky", "cincinnati-oh"],
  },

  "fort-thomas-ky": {
    intro:
      "Fort Thomas homes tend to be older, larger, and built into a slope, which usually points the installation inward rather than outward.",
    metaDescription:
      "Radon mitigation systems and testing for Fort Thomas, KY homes. Older hillside houses usually allow an interior route, leaving the exterior untouched.",
    housingStock:
      "Early twentieth-century construction along the river bluff, with basements cut into the hillside and street-facing elevations owners have every reason to want left alone. Houses of this age and size frequently have more interior vertical space available than newer homes do — old flues, back stairs, and generous closets — which is exactly what an interior route needs.",
    whatWeSee:
      "Interior routing through a closet chase or an unused flue is normally the cleanest answer, keeping the outside of the house untouched. It takes longer to plan than running pipe up an exterior wall and it costs us a slower morning, and on these houses it is the right call almost every time. Cut into a hillside, the below-grade wall area is also larger than the floor plan suggests.",
    installDay:
      "The survey is the long part: finding a vertical path that clears every floor without opening finished ceilings takes patience, and occasionally the answer is that no interior route exists. When that happens we say so and design the least conspicuous exterior run instead rather than forcing a chase through a room somebody uses.",
    neighborhoods: ["Highland Avenue", "Fort Thomas Historic District", "Tower Park", "Inverness"],
    primaryService: ROUTES.radonMitigation.path,
    nearby: ["covington-ky", "northern-kentucky", "anderson-township-oh"],
  },

  "covington-ky": {
    intro:
      "Covington's historic buildings and converted multi-family properties need an installation that respects what the building actually is.",
    metaDescription:
      "Radon mitigation and testing for Covington, KY historic and multi-family buildings, where shared party walls make the building the real boundary.",
    housingStock:
      "Nineteenth-century masonry, shared party walls, buildings subdivided into units at some point in their life, and basements modified repeatedly across a hundred and fifty years. Party walls are the complication that sets this apart: two addresses can share one foundation and one air path, so the building rather than the unit is the real boundary of the problem.",
    whatWeSee:
      "Because a system in one unit can change conditions next door, the diagnostics cover more than the address on the work order, and in a shared building we would rather talk to the neighbour before designing than explain afterward. Preservation constraints frequently decide routing before performance does, and a workable design has to succeed inside them rather than argue with them.",
    installDay:
      "Multi-unit work needs access arranged in advance and often has to be staged around tenants, so the schedule matters as much as the design. In a historic district, exterior work may be constrained by what the property is permitted to change, which we check before quoting rather than discovering with a crew already on site.",
    neighborhoods: ["MainStrasse", "Licking Riverside", "Old Seminary Square", "Wallace Woods", "Latonia"],
    primaryService: ROUTES.radonMitigation.path,
    nearby: ["northern-kentucky", "florence-ky", "fort-thomas-ky"],
  },
};
