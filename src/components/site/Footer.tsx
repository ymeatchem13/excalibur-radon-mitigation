import { Link } from "@tanstack/react-router";
import { Mail, Phone } from "lucide-react";
import { business, footerNav, legalNav, serviceNav } from "@/lib/site-data";
import logoUrl from "@/assets/excalibur-radon-logo.webp";

export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground">
      {/* container-full, not container-page: the footer runs edge-to-edge with a
          gutter rather than stopping at the 1280px content column. */}
      <div className="container-full grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <div>
          {/* No light plate here any more. The previous artwork was dark on
              transparency and needed a white disc to be legible against the dark
              footer; this one is silver on transparency and scores 9.8:1 sitting
              directly on it. A white disc would now hide the logo, not reveal
              it. If the artwork ever goes dark again, bring the plate back. */}
          <Link to="/" className="inline-flex shrink-0 items-center">
            <img
              src={logoUrl}
              alt={`${business.name} home page`}
              width={443}
              height={187}
              loading="lazy"
              decoding="async"
              className="h-20 w-auto"
            />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-navy-foreground/70">
            Radon testing and EPA-compliant mitigation systems for homes and businesses across
            Greater Cincinnati and Northern Kentucky.
          </p>
          <p className="mt-4 text-xs font-semibold tracking-widest text-navy-foreground/60 uppercase">
            Radon Only · EPA Guidance · Free Quotes
          </p>
        </div>

        <div>
          {/* Deliberately <p>, not <h2>. The footer renders on every page, so a
              heading here injects itself into every page's outline and, on
              short pages, outnumbers the real content headings. */}
          <p className="text-sm font-bold tracking-widest uppercase">Services</p>
          <ul className="mt-4 space-y-2.5 text-sm text-navy-foreground/75">
            {serviceNav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="transition-colors hover:text-brand-foreground hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-bold tracking-widest uppercase">Company</p>
          <ul className="mt-4 space-y-2.5 text-sm text-navy-foreground/75">
            {footerNav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="transition-colors hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-bold tracking-widest uppercase">Legal</p>
          <ul className="mt-4 space-y-2.5 text-sm text-navy-foreground/75">
            {legalNav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="transition-colors hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-bold tracking-widest uppercase">Contact</p>
          <ul className="mt-4 space-y-3 text-sm text-navy-foreground/75">
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <a href={business.phoneHref} className="font-bold text-navy-foreground">
                {business.phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {business.email ? (
                <a href={`mailto:${business.email}`} className="break-all hover:underline">
                  {business.email}
                </a>
              ) : (
                <Link to="/contact" className="hover:underline">
                  Send us a message
                </Link>
              )}
            </li>
            {/* No address row: this is a service-area business with no public
                premises, and the bottom bar below already states the region, so
                repeating it here would duplicate the claim inside one footer.
                The /contact page carries the service-area detail. */}
            <li className="text-navy-foreground/60">{business.hours ?? "Call for current hours"}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-navy-foreground/10">
        <div className="container-full flex flex-col gap-2 py-6 text-xs text-navy-foreground/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {business.name}. All rights reserved.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
            <p>Serving the Greater Cincinnati Area, including Northern Kentucky.</p>
            {/* rel="noopener" only, deliberately not "noreferrer": noreferrer
                would strip the Referer header and hide the referral traffic this
                credit is meant to send.

                Anchor is the brand name, not "Cincinnati Web Design Company".
                This link is sitewide and templated across client sites, so a
                keyword-rich anchor repeated on every page is the pattern
                Google's link-spam guidance describes - and the exposure lands on
                the receiving domain, not this one. A branded anchor keeps the
                credit and the link without that. Do not "optimise" it back. */}
            <p>
              Site by{" "}
              <a
                href="https://cincinnatiwebdesigns.com"
                target="_blank"
                rel="noopener"
                className="font-semibold text-navy-foreground/80 transition-colors hover:text-brand-foreground hover:underline"
              >
                Cincinnati Web Designs
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
