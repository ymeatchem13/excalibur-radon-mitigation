/* Thin typed wrapper over the gtag.js queue installed by the root route.
   Every analytics call in the app goes through here so the event names and
   parameter shapes live in exactly one place. */

/* GA4 rejects nested objects and arrays in event params - only scalars survive
   the wire format, so the type stops a nested payload at compile time rather
   than silently dropping it in production. */
type GtagParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: GtagParams) => void;
  }
}

/* Event names are a closed set on purpose: a typo in a string literal produces
   a second, near-identical event in GA4 that quietly splits the numbers, and
   nothing in the UI flags it. Adding a case here is the deliberate step.

   `generate_lead` is a GA4 *recommended* name, spelled exactly as Google
   defines it. That is what lets it import into Google Ads as a standard
   conversion later with no reconfiguration - a custom name would not. There is
   no recommended name for a phone tap, so that one has to be custom. */
type AnalyticsEvent = "generate_lead" | "phone_call_click" | "form_error";

/**
 * Send an event to GA4.
 *
 * NEVER pass name, email, phone or street address in `params`. Google's terms
 * prohibit PII in event parameters and a violating property can be purged
 * without warning - which would take the historical data with it. The quote
 * form collects all three; only `service` and `city` are safe to send.
 */
export function trackEvent(name: AnalyticsEvent, params?: GtagParams) {
  /* This app is server-rendered, so component modules execute on the server
     too, where `window` does not exist. */
  if (typeof window === "undefined") return;

  try {
    /* Optional call, not a thrown error: in dev the root route omits the gtag
       script entirely (see __root.tsx), so `gtag` is legitimately undefined and
       every call here is a no-op. That is the intended dev behaviour - no flag
       or environment check is needed at the call sites. */
    window.gtag?.("event", name, params);
  } catch {
    /* Swallowed deliberately. QuoteForm fires the lead event inside the same
       try block that handles a failed submission, so an exception escaping
       here would show the visitor "that didn't send" for a request that
       actually succeeded. Measurement must never break the thing it measures,
       and a lost event is not worth telling anyone about. */
  }
}

/**
 * Current path, for events fired from components that appear on many routes.
 * Returns an empty string during SSR, which `trackEvent` never sends anyway.
 */
export function currentPath(): string {
  if (typeof window === "undefined") return "";
  return window.location.pathname;
}
