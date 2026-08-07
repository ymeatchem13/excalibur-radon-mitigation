import { useState, type FormEvent } from "react";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { business } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Enter a valid email address").max(160),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(24),
  city: z.string().trim().min(2, "Let us know your city").max(80),
  service: z.string().trim().min(2).max(80),
  message: z.string().trim().max(1000).optional(),
});

const serviceOptions = [
  "Radon Testing",
  "Residential Mitigation",
  "Commercial Mitigation",
  "New Construction System",
  "Real Estate Transaction",
  "Something Else",
];

/* Netlify's form handler lives at this static file, not at a route. See the
   comment in public/__forms.html for why an SSR app needs it. */
const FORM_ENDPOINT = "/__forms.html";
const FORM_NAME = "quote";

export function QuoteForm({ compact = false }: { compact?: boolean }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    /* Captured before any await: React nulls currentTarget once the synthetic
       event dispatch returns, so reading it after the fetch is a null deref.
       This handler used to be synchronous; it is not anymore. */
    const formData = new FormData(e.currentTarget);

    /* form-name and bot-field ride along here, but z.object strips unknown
       keys rather than erroring, so the schema needs no entry for them. */
    const result = schema.safeParse(Object.fromEntries(formData));
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      /* Field *names*, never field values - "email" is a label, the address the
         visitor typed would be PII. Which field blocks people most often is the
         one thing that makes this event worth firing. */
      trackEvent("form_error", {
        error_type: "validation",
        error_field: String(result.error.issues[0]?.path[0] ?? "unknown"),
      });
      return;
    }
    setErrors({});
    setSubmitting(true);

    /* Built by hand rather than `new URLSearchParams(formData)`: that works at
       runtime, but lib.dom does not type FormData as a valid constructor
       argument under `strict`. This also drops the File branch we never use. */
    const params = new URLSearchParams();
    formData.forEach((value, key) => {
      if (typeof value === "string") params.append(key, value);
    });

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      setSent(true);
      /* The conversion. This form posts by fetch with preventDefault, so there
         is no thank-you URL for a destination-based goal to match - an explicit
         event here is the only way GA4 can ever see a lead.

         `service` and `city` come from the validated payload rather than the
         raw FormData so the values are trimmed and length-capped. Deliberately
         absent: name, email, phone, message. GA4 forbids PII in parameters. */
      trackEvent("generate_lead", {
        service: result.data.service,
        city: result.data.city,
        form_location: compact ? "compact" : "full",
      });
    } catch {
      setErrors({
        form: `That didn't send. Please call ${business.phoneDisplay} or try again.`,
      });
      /* Separates "nobody filled the form in" from "the form is broken" - the
         two look identical in a conversion count that only tracks successes. */
      trackEvent("form_error", { error_type: "network" });
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-3xl border border-border bg-card p-10 text-center shadow-soft">
        <CheckCircle2 className="mx-auto size-12 text-success" aria-hidden="true" />
        <h3 className="mt-4 text-xl font-bold text-navy">Request received</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Thanks. A member of our Cincinnati team will reach out within one business day to confirm
          your free estimate. Need it sooner? Call {business.phoneDisplay}.
        </p>
      </div>
    );
  }

  const field =
    "mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-shadow placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-ring/30";
  const labelCls = "block text-sm font-semibold text-navy";

  return (
    <form
      name={FORM_NAME}
      method="POST"
      action={FORM_ENDPOINT}
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={onSubmit}
      noValidate
      className="rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8"
    >
      <input type="hidden" name="form-name" value={FORM_NAME} />
      {/* Honeypot. `hidden` is display:none, which is what Netlify's own example
          uses. FormData still serializes display:none inputs - only `disabled`
          ones are skipped - so the field reaches Netlify and a bot that fills it
          gets dropped. No layout impact. */}
      <p className="hidden">
        <label>
          Do not fill this out: <input name="bot-field" />
        </label>
      </p>
      <div className={compact ? "grid gap-4" : "grid gap-4 sm:grid-cols-2"}>
        <div>
          <label className={labelCls} htmlFor="qf-name">
            Full name
          </label>
          <input id="qf-name" name="name" className={field} placeholder="Jordan Miller" maxLength={80} />
          {errors["name"] ? <p className="mt-1 text-xs text-destructive">{errors["name"]}</p> : null}
        </div>
        <div>
          <label className={labelCls} htmlFor="qf-phone">
            Phone
          </label>
          <input
            id="qf-phone"
            name="phone"
            type="tel"
            className={field}
            placeholder="(513) 555-0123"
            maxLength={24}
          />
          {errors["phone"] ? <p className="mt-1 text-xs text-destructive">{errors["phone"]}</p> : null}
        </div>
        <div>
          <label className={labelCls} htmlFor="qf-email">
            Email
          </label>
          <input
            id="qf-email"
            name="email"
            type="email"
            className={field}
            placeholder="you@email.com"
            maxLength={160}
          />
          {errors["email"] ? <p className="mt-1 text-xs text-destructive">{errors["email"]}</p> : null}
        </div>
        <div>
          <label className={labelCls} htmlFor="qf-city">
            City / neighborhood
          </label>
          <input id="qf-city" name="city" className={field} placeholder="Mason, OH" maxLength={80} />
          {errors["city"] ? <p className="mt-1 text-xs text-destructive">{errors["city"]}</p> : null}
        </div>
        <div className={compact ? "" : "sm:col-span-2"}>
          <label className={labelCls} htmlFor="qf-service">
            What do you need?
          </label>
          <select id="qf-service" name="service" className={field} defaultValue={serviceOptions[0]}>
            {serviceOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className={compact ? "" : "sm:col-span-2"}>
          <label className={labelCls} htmlFor="qf-message">
            Tell us about your home <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <textarea
            id="qf-message"
            name="message"
            rows={4}
            maxLength={1000}
            className={field}
            placeholder="Foundation type, recent test results, closing date…"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full rounded-xl bg-brand px-6 py-3.5 text-sm font-bold text-brand-foreground shadow-brand transition-transform hover:-translate-y-0.5"
      >
        Request My Free Estimate
      </button>
      {/* Same element, position and size in both states - only the colour and
          the text change, and only when a send actually fails. */}
      <p
        className={
          errors["form"]
            ? "mt-3 text-center text-xs text-destructive"
            : "mt-3 text-center text-xs text-muted-foreground"
        }
      >
        {errors["form"] ?? "We reply within one business day. Your information is never sold or shared."}
      </p>
    </form>
  );
}
