import { createFileRoute, redirect } from "@tanstack/react-router";
import { RETIRED_PATHS } from "@/lib/routes";

/*
 * Moved to /services/radon-mitigation.
 *
 * Two changes at once: the page gained a /services parent so the URL reflects
 * the site's actual hierarchy, and it dropped "residential" from the slug.
 * "Radon mitigation" is the term this market searches; "residential" is a
 * qualifier essentially nobody types, and it read as an exclusion to the
 * commercial and multi-family buyers the page also serves.
 */
const { to } = RETIRED_PATHS["/residential-mitigation"];

export const Route = createFileRoute("/residential-mitigation")({
  beforeLoad: () => {
    throw redirect({ to, statusCode: 301 });
  },
});
