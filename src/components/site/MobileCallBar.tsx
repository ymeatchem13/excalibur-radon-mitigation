import { Link } from "@tanstack/react-router";
import { CalendarCheck, Phone } from "lucide-react";
import { business } from "@/lib/site-data";

export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 p-3 backdrop-blur md:hidden">
      <div className="flex gap-2">
        <a
          href={business.phoneHref}
          className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-brand text-sm font-bold text-brand-foreground shadow-brand"
        >
          <Phone className="size-4" aria-hidden="true" />
          Call Now
        </a>
        <Link
          to="/contact"
          className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-navy/15 bg-secondary text-sm font-bold text-navy"
        >
          <CalendarCheck className="size-4" aria-hidden="true" />
          Free Estimate
        </Link>
      </div>
    </div>
  );
}
