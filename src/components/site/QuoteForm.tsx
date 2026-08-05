import { useState, type FormEvent } from "react";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { business } from "@/lib/site-data";

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

export function QuoteForm({ compact = false }: { compact?: boolean }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const result = schema.safeParse(data);
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    setSent(true);
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
      onSubmit={onSubmit}
      noValidate
      className="rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8"
    >
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
        className="mt-6 w-full rounded-xl bg-brand px-6 py-3.5 text-sm font-bold text-brand-foreground shadow-brand transition-transform hover:-translate-y-0.5"
      >
        Request My Free Estimate
      </button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        We reply within one business day. Your information is never sold or shared.
      </p>
    </form>
  );
}
