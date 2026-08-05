import { createFileRoute, redirect } from "@tanstack/react-router";
import { RETIRED_PATHS } from "@/lib/routes";

/*
 * Moved to /services/radon-testing so the URL sits under the /services hub with
 * its sibling. The slug itself is unchanged.
 */
const { to } = RETIRED_PATHS["/radon-testing"];

export const Route = createFileRoute("/radon-testing")({
  beforeLoad: () => {
    throw redirect({ to, statusCode: 301 });
  },
});
