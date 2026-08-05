import { createFileRoute, redirect } from "@tanstack/react-router";
import { RETIRED_PATHS } from "@/lib/routes";

/*
 * Retired page. Folded into the commercial section of /services/radon-mitigation.
 * Every commercial radon term tested returned below-threshold volume, so this is
 * a sales asset rather than a search play: worth saying on the site because only
 * one competitor in this market covers commercial at all, but not worth a
 * separate URL.
 *
 * See the note on serviceNav in site-data.ts for the full rationale.
 */
const { to, hash } = RETIRED_PATHS["/commercial-mitigation"];

export const Route = createFileRoute("/commercial-mitigation")({
  beforeLoad: () => {
    throw redirect({ to, hash, statusCode: 301 });
  },
});
