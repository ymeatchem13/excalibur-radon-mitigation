import { createFileRoute, redirect } from "@tanstack/react-router";
import { RETIRED_PATHS } from "@/lib/routes";

/*
 * Retired page. Folded into the new-construction section of
 * /services/radon-mitigation. New construction was the strongest of the three
 * secondary services on keyword difficulty ("radon resistant new construction"
 * is KD 11, the lowest measured here) but only about 30 searches a month,
 * against 880 for residential mitigation.
 *
 * See the note on serviceNav in site-data.ts for the full rationale.
 */
const { to, hash } = RETIRED_PATHS["/new-construction"];

export const Route = createFileRoute("/new-construction")({
  beforeLoad: () => {
    throw redirect({ to, hash, statusCode: 301 });
  },
});
