import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";

import heroHome from "@/assets/hero-home-dusk.jpg";
import radonDiagram from "@/assets/radon-diagram.jpg";
import { Reveal } from "@/components/site/Reveal";
import { CtaBand, SectionHeading } from "@/components/site/PageHero";
import { QuoteForm } from "@/components/site/QuoteForm";
import { ServiceAreaMap } from "@/components/site/ServiceAreaMap";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { CallLink } from "@/components/site/CallLink";
import { serviceIcons } from "@/components/site/service-icons";
import { business, faqs, services, stats, steps, trustBadges, whyUs } from "@/lib/site-data";
import { canonical, ldScript, pageGraph, pageMeta } from "@/lib/seo";
import { ROUTES } from "@/lib/routes";

// "Cincinnati Radon Mitigation Systems" nests both target phrases as contiguous
// substrings: "Cincinnati Radon Mitigation" (90/mo) and "Radon Mitigation
// Systems" (480/mo, LOW competition). Do not insert a comma or "in" between the
// city and the service words; that splits the first phrase and loses it.
const title = "Excalibur Radon Mitigation | Cincinnati, OH";
const description =
  "Radon mitigation systems and EPA-protocol radon testing for Greater Cincinnati and Northern Kentucky homes. Certified installs, verified results, free quotes.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: pageMeta({ title, description, path: "/" }),
    links: [
      ...canonical("/"),
      { rel: "preload", as: "image", href: heroHome, fetchPriority: "high" },
    ],
    // No FAQPage schema here on purpose. /faqs is the single FAQPage for the
    // site; emitting a second node with the same six questions makes the two
    // URLs compete for one rich result and splits the topical signal. The
    // accordion below stays for readers.
    //
    // No crumbs either: home is the root of the trail, so a BreadcrumbList
    // pointing only at itself carries no information.
    scripts: [ldScript(pageGraph({ path: "/", name: title, description }))],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy text-navy-foreground">
        <img
          src={heroHome}
          alt="Two-story suburban home lit at dusk, typical of the Cincinnati-area homes Excalibur fits with radon mitigation systems"
          width={2000}
          height={1364}
          fetchPriority="high"
          className="absolute inset-0 size-full object-cover object-[55%_45%]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-linear-to-r from-navy/85 via-navy/70 to-navy/70 lg:via-navy/60 lg:to-navy/30"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-navy/35 to-navy/0 to-50%"
        />

        <div className="container-page relative flex min-h-[34rem] items-center py-16 md:py-24 lg:min-h-[min(44rem,calc(100svh_-_8.25rem))]">
          <div className="w-full">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center rounded-full bg-brand/30 px-3.5 py-1.5 text-xs font-bold tracking-[0.12em] uppercase"
            >
              Cincinnati&apos;s Radon Specialists
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.05] md:text-5xl lg:text-6xl"
            >
              Protect Your Cincinnati Home From Radon
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-6 max-w-2xl text-base leading-relaxed text-navy-foreground/85 md:text-lg"
            >
              Professional radon mitigation solutions that reduce indoor radon levels and help
              protect your home and family, designed around your foundation, installed in a day, and
              verified with a post-installation test.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                to="/contact"
                className="rounded-xl bg-brand px-6 py-3.5 text-sm font-bold text-brand-foreground shadow-brand transition-transform hover:-translate-y-0.5"
              >
                Get Free Estimate
              </Link>
              <CallLink
                location="home_hero"
                className="inline-flex items-center gap-2 rounded-xl border border-navy-foreground/25 px-6 py-3.5 text-sm font-bold transition-colors hover:bg-navy-foreground/10"
              >
                <Phone className="size-4" aria-hidden="true" />
                Call {business.phoneDisplay}
              </CallLink>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="mt-10 flex max-w-2xl flex-wrap gap-x-5 gap-y-3"
            >
              {trustBadges.map((badge) => (
                <li
                  key={badge}
                  className="flex items-center gap-2 text-sm font-semibold text-navy-foreground/90"
                >
                  <CheckCircle2 className="size-4 text-success" aria-hidden="true" />
                  {badge}
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-surface py-14 md:py-20">
        <div className="container-page grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.06}
              className="h-full rounded-3xl border border-border bg-card p-7 shadow-soft"
            >
              <p className="font-display text-4xl font-extrabold text-brand">{stat.value}</p>
              <p className="mt-3 text-base font-bold text-navy">{stat.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{stat.sub}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Why radon matters */}
      <section className="section-y">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <img
              src={radonDiagram}
              alt="Cutaway illustration of radon soil gas entering a home through basement slab cracks and being vented outside by a mitigation pipe"
              width={1408}
              height={1008}
              loading="lazy"
              className="w-full rounded-3xl object-cover shadow-lift"
            />
          </Reveal>
          <Reveal delay={0.08}>
            <p className="eyebrow">Why Radon Matters</p>
            <h2 className="mt-4 text-3xl font-extrabold text-navy md:text-4xl">
              An invisible gas that Ohio Valley soil produces in abundance
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              <p>
                Radon is a colorless, odorless radioactive gas released as uranium in soil and rock
                breaks down. You cannot see it, smell it, or taste it. The only way to know your
                level is to test.
              </p>
              <p>
                Much of Southwest Ohio and Northern Kentucky sits in an EPA radon zone associated
                with elevated indoor readings. The region&apos;s glacial soils and limestone-shale
                bedrock both generate radon and give it pathways into basements through slab cracks,
                sump pits, block walls, and utility penetrations.
              </p>
              {/* Every figure here is EPA/CDC-published and attributed in-sentence.
                  Keep the attribution if this copy is ever edited: the numbers are
                  only defensible while the source is named. */}
              <p>
                The EPA identifies radon as the second leading cause of lung cancer in the United
                States, linked to roughly 21,000 deaths a year, and the leading cause among people
                who have never smoked. The risk compounds for smokers: radon and cigarette smoke
                together carry a higher risk than either one alone.
              </p>
              <p>
                Mitigation reverses the pressure that pulls soil gas indoors. A sealed suction point
                beneath the slab, connected to a continuously running fan and vented above the
                roofline, routes the gas outside before it ever reaches your living space.
              </p>
            </div>
            {/* Was a link into /blog/what-is-radon. The blog is unlisted now, so
                this points at /faqs instead, which opens with the same "What is
                radon?" question and is indexed. */}
            {/* Secondary, not the crimson primary: this goes to the FAQs, and a
                second solid brand button would compete with the Get Free Estimate
                CTAs for the same attention.

                aria-label because "Learn more" is the seventh identical link text
                on this page - the six service cards below use it too - and a
                screen reader listing links gets seven indistinguishable entries
                without it. The visible label stays "Learn more". */}
            <Link
              to={ROUTES.faqs.path}
              aria-label="Learn more about radon in the FAQs"
              className="mt-7 inline-flex items-center gap-2 rounded-xl border border-navy/15 bg-secondary px-6 py-3.5 text-sm font-bold text-navy transition-colors hover:bg-accent"
            >
              Learn more
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* The risk, and the fix. The section above explains what radon is; this one
          answers the two questions a homeowner actually has next - how bad is it,
          and can it be fixed - side by side so the reassurance lands with the
          risk rather than pages away from it.

          Wording is deliberate. No "permanent", no "safe levels", no "increases
          your home's value": those are the unverifiable claims stripped during the
          rebrand, and they are not coming back in through a new section. */}
      <section className="bg-surface section-y">
        <div className="container-page">
          <SectionHeading
            eyebrow="The Risk, And The Fix"
            title="Radon is a serious problem with a solved answer"
            intro="Nobody wants to hear their home has a radioactive gas problem. The useful part is that radon is one of the few household hazards with a well-understood engineering fix and a test that proves it worked."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <Reveal className="h-full rounded-3xl border border-border bg-card p-7 shadow-soft md:p-9">
              <h3 className="text-xl font-extrabold text-navy md:text-2xl">Why it matters</h3>
              <ul className="mt-6 space-y-4">
                {[
                  "The EPA ranks radon the second leading cause of lung cancer in the US.",
                  "You cannot see it, smell it, or taste it. Testing is the only way to know.",
                  "Exposure adds up over years, and it affects everyone in the household.",
                  "For smokers the risk is higher still, beyond either factor on its own.",
                ].map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground md:text-base"
                  >
                    <span
                      className="mt-2 size-2 shrink-0 rounded-full bg-brand"
                      aria-hidden="true"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal
              delay={0.08}
              className="h-full rounded-3xl border border-border bg-card p-7 shadow-soft md:p-9"
            >
              <h3 className="text-xl font-extrabold text-navy md:text-2xl">
                What mitigation actually does
              </h3>
              <ul className="mt-6 space-y-4">
                {[
                  "A properly designed system lowers indoor radon, confirmed by a post-mitigation test.",
                  "It treats the whole house, not a single room or the basement alone.",
                  "You keep the result and the system details in writing, ready for a future sale.",
                  "The fan is quiet, draws about as much power as a light bulb, and runs continuously.",
                ].map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground md:text-base"
                  >
                    <CheckCircle2
                      className="mt-0.5 size-5 shrink-0 text-success"
                      aria-hidden="true"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-surface section-y">
        <div className="container-page">
          <SectionHeading
            eyebrow="Services"
            title="Radon mitigation systems for every kind of building"
            intro="From a single-family basement in Oakley to a multi-building commercial campus, every project starts with diagnostics and ends with a verified result."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => {
              const Icon = serviceIcons[service.icon]!;
              return (
                <Reveal
                  key={service.title}
                  delay={(i % 3) * 0.06}
                  className="group h-full rounded-3xl border border-border bg-card p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
                >
                  <span className="grid size-12 place-items-center rounded-2xl bg-brand-soft text-brand">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-navy">{service.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {service.blurb}
                  </p>
                  <Link
                    to={service.to}
                    // Spread conditionally: tsconfig sets exactOptionalPropertyTypes,
                    // so passing hash={undefined} is an error where the prop is
                    // declared as an optional string.
                    {...(service.hash ? { hash: service.hash } : {})}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:gap-2.5"
                  >
                    Learn more
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-y">
        <div className="container-page">
          <SectionHeading
            eyebrow="How It Works"
            title="Five steps from first call to verified result"
            intro="No surprises, no guesswork. Here's exactly what working with our Cincinnati crews looks like."
          />
          <ol className="mt-14 grid gap-6 md:grid-cols-5">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.06} className="relative h-full">
                <div className="flex items-center gap-3 md:block">
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-navy font-display text-base font-extrabold text-navy-foreground">
                    {i + 1}
                  </span>
                  <span
                    aria-hidden="true"
                    className="hidden h-px w-full bg-border md:mt-6 md:block"
                  />
                </div>
                <h3 className="mt-4 text-base font-bold text-navy md:mt-6">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-navy text-navy-foreground section-y">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="inline-flex rounded-full bg-brand/20 px-3.5 py-1.5 text-xs font-bold tracking-[0.12em] uppercase">
              Why Choose Us
            </p>
            <h2 className="mt-4 text-3xl font-extrabold md:text-4xl">
              The details homeowners notice after the crew leaves
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((item, i) => (
              <Reveal
                key={item.title}
                delay={(i % 4) * 0.05}
                className="h-full rounded-3xl border border-navy-foreground/10 bg-navy-soft/40 p-6"
              >
                <CheckCircle2 className="size-5 text-success" aria-hidden="true" />
                <h3 className="mt-4 text-base font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-foreground/70">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Service area */}
      <section className="bg-surface section-y">
        <div className="container-page">
          <ServiceAreaMap />
          <p className="mt-8 text-center text-sm text-muted-foreground">
            <Link to="/service-areas" className="font-bold text-brand hover:underline">
              See every community we serve
            </Link>{" "}
            across Greater Cincinnati and Northern Kentucky.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-y">
        <div className="container-page">
          <SectionHeading
            eyebrow="FAQ"
            title="Radon questions we hear every week"
            intro="Straight answers about testing, cost, timelines, and how the systems actually perform."
          />
          <div className="mt-10">
            <FaqAccordion items={faqs} />
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            More questions?{" "}
            <Link to="/faqs" className="font-bold text-brand hover:underline">
              Read all our radon mitigation FAQs
            </Link>
            , including what a system costs and how long an install takes.
          </p>
        </div>
      </section>

      {/* Final CTA + form */}
      <section id="estimate" className="bg-surface section-y">
        <div className="container-page grid items-start gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Free Estimate</p>
            <h2 className="mt-4 text-3xl font-extrabold text-navy md:text-4xl">
              Schedule Your Free Radon Estimate
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Send a few details about your home and we&apos;ll follow up within one business day with
              pricing, scheduling, and a clear explanation of what your system would look like.
            </p>
            <ul className="mt-8 space-y-3.5">
              {[
                "Written quote before any work begins",
                "Most systems installed in a single day",
                "Post-mitigation test included",
                "Serving Ohio and Northern Kentucky",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm font-semibold text-navy">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
            <CallLink
              location="home_bottom"
              className="mt-8 inline-flex items-center gap-2 text-lg font-extrabold text-brand"
            >
              <Phone className="size-5" aria-hidden="true" />
              {business.phoneDisplay}
            </CallLink>
          </Reveal>
          <Reveal delay={0.08}>
            <QuoteForm />
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Not sure whether you need a test or a system?"
        body="Call and describe your home. We'll tell you honestly which one makes sense."
      />
    </>
  );
}
