import { createFileRoute, redirect } from "@tanstack/react-router";
import { RETIRED_PATHS } from "@/lib/routes";

/*
 * Retired page. The real estate radon keyword cluster measured almost entirely
 * below Google Ads' reporting threshold (9 of 10 tested terms returned no
 * volume), so the content now lives as a section on /services/radon-mitigation
 * rather than on a URL of its own. Those customers do exist, they just search
 * the mitigation terms while under contract.
 *
 * Kept as a permanent redirect rather than deleted so the path never 404s for
 * anything already linking to it, and so the anchor lands the visitor on the
 * section that replaced the page instead of the top of a long page.
 */
const { to, hash } = RETIRED_PATHS["/real-estate-services"];

export const Route = createFileRoute("/real-estate-services")({
  beforeLoad: () => {
    throw redirect({ to, hash, statusCode: 301 });
  },
});
