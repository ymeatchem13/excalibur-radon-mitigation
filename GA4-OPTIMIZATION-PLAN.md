# Google Analytics 4 — Setup & Optimization Guide

**Property:** `G-PDTHQ1WPQE` · **Site:** excaliburradon.com
**Last updated:** August 7, 2026

---

## The problem this fixes

Google Analytics has been running on the site since launch, but it was only recording **which pages people visited**. It was not recording **whether anyone actually became a lead**.

That meant there was no way to answer the questions that matter:

- How many estimate requests came in last month?
- Which service pages produce leads, and which just get traffic?
- How many people tap the phone number — and from which button?
- Which cities are actually calling?

The code side of this is now done. This guide covers the settings you still need to click through in the Google Analytics interface, because **some of them cannot be done in code**.

> ### ⚠️ Read this first
> Two settings below are **not retroactive** — they only affect data collected *after* you turn them on. Every day they stay off is data you can never get back:
> - **Data retention** (Step 1) — currently throwing away data after 2 months
> - **Custom dimensions** (Step 4) — service type and city are being collected right now but are invisible in reports until registered
>
> Do those two first, even if you do nothing else today.

---

## What's now being tracked

Three new events fire automatically. You don't have to do anything to make these happen — they're built into the site.

| Event | Fires when | What it tells you |
|---|---|---|
| **`generate_lead`** | Someone successfully submits the estimate form | Your actual lead count, broken down by service and city |
| **`phone_call_click`** | Someone taps or clicks the phone number anywhere on the site | Which call button works — likely your biggest conversion source |
| **`form_error`** | The form fails validation or won't send | Whether you're losing leads to a broken or confusing form |

### The details attached to each event

| Detail | Attached to | Example values |
|---|---|---|
| `service` | `generate_lead` | Radon Testing, Residential Mitigation, Real Estate Transaction |
| `city` | `generate_lead` | Mason, Loveland, Fort Thomas (whatever the visitor typed) |
| `form_location` | `generate_lead` | `full` (homepage, contact page) or `compact` (service & city pages) |
| `link_location` | `phone_call_click` | `header`, `mobile_bar`, `page_hero`, `footer`, `home_hero`, `home_bottom`, `contact` |
| `page_path` | `phone_call_click` | `/service-areas/mason`, `/radon-testing` |
| `error_type` | `form_error` | `validation` (visitor mistake) or `network` (site problem) |
| `error_field` | `form_error` | Which field blocked them — `email`, `phone`, `city` |

### 🔒 A note on privacy

The form collects names, email addresses, and phone numbers. **None of that is ever sent to Google.** Only the service type and city go across, because Google's terms prohibit personal information in analytics, and a property that violates this can be **deleted without warning** — taking all your historical data with it.

This is enforced in the code, not left to memory. The privacy policy has also been updated to disclose Google Analytics by name, since it sets cookies (the old wording only covered the cookieless Ahrefs tool).

---

## Part 1 — Settings to change in Google Analytics

Go to [analytics.google.com](https://analytics.google.com) and click the **gear icon (Admin)** in the bottom-left corner.

Steps are ordered by impact. Steps 1 and 5 can be done right now. **Steps 3 and 4 require the site to be deployed first** — Google won't show you an event it has never seen.

---

### Step 1 — Extend data retention to 14 months 🔴 Do this first

**Admin → Data collection and modification → Data retention**

Change **Event data retention** from `2 months` to `14 months`. Click **Save**.

**Why it matters:** Google's default throws away detailed data after 8 weeks. With 14 months you can compare this April to last April — which is how you find out whether the spring real-estate season is actually growing. This does not restore what's already gone, so the sooner the better.

---

### Step 2 — Turn OFF "Form interactions"

**Admin → Data collection and modification → Data streams →** click your web stream **→ Enhanced measurement →** gear icon

Untick **Form interactions**. Leave everything else on.

**Why it matters:** Google's automatic form tracking would count the same submission a second time, alongside the accurate `generate_lead` event. Two different numbers for the same thing is worse than one.

While you're in this panel, **confirm "Page changes based on browser history events" is ON**. The site is a single-page app — without that setting, Google only records the first page of every visit and nothing after it.

---

### Step 3 — Mark your Key Events ⏳ After deploy

**Admin → Data display → Events**

Find `generate_lead` and `phone_call_click` in the list and switch on **"Mark as key event"** for both.

**Why it matters:** This promotes them from "things that happened" to "conversions," which makes them appear in the main reports and in the conversion column everywhere.

> **Don't see them?** They only appear once each event has fired at least once. Submit a test form and tap the phone number on the live site, then wait up to 24 hours.

---

### Step 4 — Register the custom details ⏳ After deploy 🔴 Important

**Admin → Data display → Custom definitions → Create custom dimension**

Create **six**, all with scope **Event**:

| Dimension name | Event parameter |
|---|---|
| Service Requested | `service` |
| Lead City | `city` |
| Form Location | `form_location` |
| Call Link Location | `link_location` |
| Call Page Path | `page_path` |
| Form Error Type | `error_type` |

**Why it matters:** This is the step people skip, and it quietly wastes everything else. Google collects these details either way — but until you register them here, **they cannot appear in any report**. You'd see "12 leads" with no way to learn that 9 were real-estate transactions in Mason.

Not retroactive. Only data collected after you save these will be usable.

---

### Step 5 — Filter out your own visits

**Two parts, and the second is the one everyone forgets.**

**Part A — Define your IP:**
Admin → Data streams → your web stream → **Configure tag settings** → **Show more** → **Define internal traffic** → **Create**. Enter your office/home IP address (search Google for "what is my IP"). Save.

**Part B — Activate the filter:**
Admin → **Data collection and modification → Data filters** → click **Internal Traffic** → change from **Testing** to **Active**. Save.

**Why it matters:** Google creates this filter switched off. Without Part B, every time you or your team browse the site you're inflating your own numbers — which is especially distorting on a site with modest traffic.

---

### Step 6 — Connect Google Search Console

**Admin → Product links → Search Console links → Link**

**Why it matters:** Puts the actual Google search terms people used before landing on the site directly into your Analytics reports. Given the SEO work in this project, this is the link between "we rank for this" and "this earns money."

---

### Step 7 — Set the attribution window

**Admin → Data display → Attribution settings**

- Reporting attribution model: **Data-driven**
- Acquisition conversion lookback window: **90 days**

**Why it matters:** Nobody gets a radon quote the day they first hear about radon — especially real-estate deals. The default 30-day window credits those leads to "direct" instead of the search or page that actually earned them.

---

### Step 8 — Reporting identity

**Admin → Data display → Reporting identity →** select **Blended**

Gives the most accurate visitor counts across phones and desktops.

---

### Step 9 — Leave Google Signals OFF ✋

**Admin → Data collection and modification → Data collection**

If Google Signals is on, consider turning it off.

**Why it matters:** It adds age and gender estimates, but in exchange Google starts **hiding rows** in your reports whenever a group is too small to anonymize. At local-business traffic levels that suppression costs you far more visibility than the demographics are worth.

---

## Part 2 — What you'll be able to see

Once Steps 3 and 4 are done and data has accumulated for a few days:

**Reports → Engagement → Events**, then add a custom dimension as the secondary column.

| Question | Where to look |
|---|---|
| How many leads this month? | `generate_lead` event count |
| Which service sells? | `generate_lead` × **Service Requested** |
| Which cities to target? | `generate_lead` × **Lead City** |
| Is the mobile call bar earning its space? | `phone_call_click` × **Call Link Location** |
| Which city pages actually convert? | `phone_call_click` × **Call Page Path** |
| Do compact forms convert worse? | `generate_lead` × **Form Location** |
| Is the form broken? | `form_error` with `error_type = network` |
| Which field loses people? | `form_error` × `error_field` |

---

## Part 3 — Verifying it works

### Quickest check — DebugView

1. Install the **Google Analytics Debugger** Chrome extension and switch it on.
2. Visit **excaliburradon.com**, submit the estimate form, then click the phone number.
3. In Analytics: **Admin → DebugView**.
4. You should see `generate_lead` and `phone_call_click` appear within seconds.
5. **Click each event and check the parameters.** Confirm `service` and `city` are there — and confirm **no name, email, or phone number appears anywhere**. This is the most important check on this page.

### Also confirm

- **Test on a phone as well as a desktop.** The mobile call bar only exists below 768px wide and the header phone link only exists above it — a desktop-only test silently skips two of the seven call buttons.
- **Dev traffic is excluded.** Analytics no longer loads at all when a developer runs the site locally, so test submissions can't reach your live numbers.

---

## Part 4 — When you start running Google Ads

Nothing in the code needs to change. The event was deliberately named `generate_lead` — Google's own standard name — so it imports straight into Google Ads as a conversion.

When there's an Ads account:

1. Link it: **Admin → Product links → Google Ads links**
2. In Google Ads: **Goals → Conversions → Import → Google Analytics 4**
3. Import both `generate_lead` and `phone_call_click`

Only then does it make sense to add a value per lead so Ads can optimize toward revenue rather than raw volume.

---

## Technical reference

For whoever maintains the site:

| File | Role |
|---|---|
| `src/lib/analytics.ts` | The only place events are sent from. Event names are a closed TypeScript union — a typo won't compile. |
| `src/components/site/CallLink.tsx` | Every phone link on the site. Reads the number from `site-data.ts`, so it can't drift. |
| `src/components/site/QuoteForm.tsx` | Fires `generate_lead` on success, `form_error` on failure. |
| `src/routes/__root.tsx` | Loads the Google tag — **only in production builds**, and only when the ID is set. |
| `netlify.toml` | Holds `VITE_GA_MEASUREMENT_ID`. A measurement ID is public, not a secret. |
| `src/vite-env.d.ts` | Declares that variable so Vite can inline it at build time. Add a line here for any new `VITE_*` variable — see the comment for why bracket access silently breaks the build. |
| `src/routes/privacy-policy.tsx` | Discloses Google Analytics and its cookies. |

**Adding a new phone CTA:** use `<CallLink location="...">`, and add the new location to the union in `CallLink.tsx`.

**⚠️ If `VITE_GA_MEASUREMENT_ID` is ever removed from `netlify.toml`**, the build still succeeds and silently ships with no analytics at all. There's no error to catch it — so after changing that file, view the deployed page source and confirm `googletagmanager.com/gtag/js` is present.
