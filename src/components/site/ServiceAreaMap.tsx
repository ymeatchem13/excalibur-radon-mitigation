import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { serviceAreaContent } from "@/lib/service-area-content";
import { serviceAreaMapDefault, serviceAreas } from "@/lib/site-data";
import { cityPath } from "@/lib/routes";
import { cn } from "@/lib/utils";

export function ServiceAreaMap({
  heading = "Radon mitigation across Greater Cincinnati",
  initialCity = null,
}: {
  /**
   * Overridable because /service-areas already uses "Serving the Greater
   * Cincinnati Area" as its <h1>; repeating it here gave that page two
   * identical headings. Callers pass something distinct instead.
   */
  heading?: string;
  /**
   * Area `name` to open centred on, so a city page lands on its own community
   * rather than the metro view. Null keeps the full-region default.
   */
  initialCity?: string | null;
}) {
  // null = the full metro view rather than a single community.
  const [active, setActive] = useState<string | null>(initialCity);
  // The map card fills the viewport width on phones, so an un-guarded embed
  // swallows vertical swipes and pans instead of letting the page scroll. Stay
  // inert until the visitor deliberately activates the map.
  const [interactive, setInteractive] = useState(false);

  const view = serviceAreas.find((a) => a.name === active) ?? serviceAreaMapDefault;
  const mapSrc = `https://maps.google.com/maps?ll=${view.lat},${view.lng}&z=${view.zoom}&output=embed`;
  const label = active ?? "Greater Cincinnati Area";

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="relative aspect-4/3 overflow-hidden rounded-3xl border border-border bg-surface shadow-soft">
        <iframe
          // Keying on the src remounts the iframe instead of navigating it, which
          // would otherwise push a history entry on every community change.
          key={mapSrc}
          src={mapSrc}
          title={`Map of ${active ?? "the Greater Cincinnati"} service area`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className={cn("absolute inset-0 size-full border-0", !interactive && "pointer-events-none")}
        />
        {!interactive ? (
          <button
            type="button"
            onClick={() => setInteractive(true)}
            className="absolute inset-0 size-full cursor-pointer"
          >
            <span className="sr-only">Activate the map to pan and zoom</span>
          </button>
        ) : null}
        <div className="pointer-events-none absolute bottom-4 left-4 rounded-2xl bg-background/95 px-4 py-3 shadow-soft backdrop-blur">
          <p className="flex items-center gap-2 text-sm font-bold text-navy" aria-live="polite">
            <MapPin className="size-4 text-brand" aria-hidden="true" />
            {label}
          </p>
          <p className="text-xs text-muted-foreground">{view.note}</p>
        </div>
      </div>

      <div>
        <p className="eyebrow">Coverage</p>
        <h3 className="mt-4 text-2xl font-extrabold text-navy">{heading}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Crews run daily routes across Hamilton, Butler, Warren, and Clermont counties in Ohio and
          Boone, Kenton, and Campbell counties in Kentucky. Select a community to center the map on
          it.
        </p>
        {/* The chip centres the map; the arrow next to it is a real link to the
            community's page. Before this, the whole list was <button>s, so the
            city pages had no crawlable path in from here at all - they were
            reachable only from the hub's card grid. */}
        <ul className="mt-6 flex flex-wrap gap-2">
          {serviceAreas.map((area) => {
            const isActive = area.name === active;
            const linked = Boolean(serviceAreaContent[area.slug]);
            return (
              // `group` so hover lights the whole pill. The two halves are separate
              // controls but read as one chip now that the seam between them is gone,
              // and a half-coloured pill looks like a rendering fault.
              <li key={area.slug} className="group flex items-stretch">
                <button
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActive((prev) => (prev === area.name ? null : area.name))}
                  className={cn(
                    "border px-3.5 py-2 text-sm font-semibold transition-colors",
                    linked ? "rounded-l-full border-r-0" : "rounded-full",
                    isActive
                      ? "border-brand bg-brand text-brand-foreground"
                      : "border-border bg-card text-navy group-hover:border-brand group-hover:text-brand",
                  )}
                >
                  {area.name}
                </button>
                {linked ? (
                  <Link
                    to={cityPath(area.slug)}
                    aria-label={`Radon mitigation in ${area.name}`}
                    className={cn(
                      // border-l-0 mirrors the button's border-r-0: without it the
                      // link's left border draws a divider between name and arrow.
                      "grid place-items-center rounded-r-full border border-l-0 py-2 pr-3 pl-1.5 transition-colors",
                      isActive
                        ? "border-brand bg-brand text-brand-foreground"
                        : "border-border bg-card text-navy group-hover:border-brand group-hover:text-brand",
                    )}
                  >
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                ) : null}
              </li>
            );
          })}
        </ul>
        {active ? (
          <button
            type="button"
            onClick={() => setActive(null)}
            className="mt-5 text-sm font-semibold text-brand underline-offset-4 hover:underline"
          >
            View full service area
          </button>
        ) : null}
      </div>
    </div>
  );
}
