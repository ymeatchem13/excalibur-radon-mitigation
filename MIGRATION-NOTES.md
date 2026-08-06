# Rebrand migration notes — Excalibur Radon Mitigation

The site was previously branded **Cincinnati Radon Solutions**. This file records
what is still outstanding after that migration. Delete a section once it is done.

## Unconfirmed business details

These are `null` in `src/lib/site-data.ts` rather than placeholder strings, so
nothing bracketed can ever render or reach structured data. Search tokens are
listed for grep-ability only — they do not appear in the codebase.

| Field | Token | Status | Where it goes when confirmed |
|---|---|---|---|
| Email address | — | ✅ **Resolved.** `excaliburradonmitigation@gmail.com`, taken from the client "Protect Your Family" infographic (`src/assets/excalibur_protect.webp`). Wired into `business.email`; mailto links and the JSON-LD `email` field are live again. |
| Business hours | — | ✅ **Resolved.** Mon–Fri 8 AM–5 PM, Sat/Sun closed, taken from the live Google Business Profile (CID `7683202303292945824`) once it published a full week. Wired into `business.hours`, which retired the "Call for current hours" fallback in the footer and on `/contact`; `openingHours: "Mo-Fr 08:00-17:00"` is live on `organizationNode` in `src/lib/seo.ts`. |
| Owner name | `[CONFIRMED OWNER NAME]` | Not used anywhere on the site. No action needed unless you want an About bio. |
| Certifications / licence numbers | `[CONFIRMED CERTIFICATION]` | **Deliberately absent.** No licence, insurance, or certification claim appears anywhere. Do not add one without documentation — Ohio licenses radon testing and mitigation. |

## Verified and in use

- **Email:** excaliburradonmitigation@gmail.com — from the client infographic. Lowercased for
  display; Gmail local parts are case-insensitive.

- **Phone:** (513) 859-7678 — taken from the live Google Business Profile
  (CID `7683202303292945824`), not invented.
- **Hours:** Mon–Fri 8 AM–5 PM; Saturday and Sunday closed — from the same Google
  Business Profile. Rendered in the footer and on `/contact` from `business.hours`,
  and asserted as `openingHours` in the JSON-LD. Closed days are expressed by
  omission in both places, so update `site-data.ts` and `seo.ts` together.
- **Address:** 5644 Windridge Drive, Cincinnati, OH 45248 — asserted in
  structured data only. It is rendered on no page. See the caveat on
  `organizationNode` in `src/lib/seo.ts` before changing that.
- **Facebook:** https://www.facebook.com/people/Excalibur-Radon-Mitigation/61590681853378/
- **Google Maps:** https://www.google.com/maps?cid=7683202303292945824

## Manual steps still required

1. **Enable Netlify form detection.** Netlify → Site → Forms → *Enable form
   detection*, then redeploy. This is off by default for all sites created after
   2023-04-12, and no amount of code makes the form work without it.
2. **Set the form notification email** in the Netlify UI once step 1 is done.
   Until then submissions are stored but nobody is notified.
3. **Verify the form POST works in production.** It cannot be tested locally —
   `/__forms.html` 404s under `vite dev`, which the form's error branch handles.
   Submit a real entry after deploying and confirm it appears in Netlify's Forms
   tab. If it does not, see the fallbacks noted in the handover report.
4. **Replace the logo artwork** — see below.

## Artwork and brand palette

The client replaced the logo a second time. The current mark is the **silver sword
lockup** with crimson accents; the earlier navy/blue shield is gone, and the site's
whole colour system was re-keyed to match it.

### Logo files — which is which

| File | Role |
|---|---|
| `src/assets/excalibur_radon_logo.webp` | **Current client original.** 500×500 canvas, only a 443×187 band of it is opaque. Source of truth; not imported. |
| `src/assets/excalibur-radon-logo.webp` | 443×187 lossy q90, 21 KB. **This is what the site imports** (header + footer). Cropped to content from the file above. |
| `src/assets/excalibur_logo.webp` | Superseded previous logo (shield). Kept only as history — safe to delete. |

### The constraint that shapes everything

The artwork is **silver on transparency**, median luminance 83%. It scores **1.8:1 on
white** and **10.9:1 on the near-black**. It cannot go on a light surface.

That is why the header is dark and why the footer's white disc was removed — the disc
existed to make the *old* dark logo legible and would now hide this one. **If the logo
is ever replaced with a dark-ink version, both of those decisions have to be reversed.**

### Palette

Near-black `#0A0A0A` · crimson `#A82830` · silver `#C0C0C0` · body `#3F3F46` · page `#FAFAFA`.

The dark is a fully **neutral** near-black (OKLCH chroma 0), deliberately matching the
logo's achromatic silver. Do not reintroduce a blue cast.

All tokens live in `:root` in `src/styles.css`; ~240 utility usages across 22 files resolve
through `var()` and needed no edits. Two things do **not** follow `:root` and must be
updated by hand on any future palette change:

1. The three shadows in the `@theme` block — they hardcode OKLCH literals because
   `@theme inline` cannot alpha-modify a `var()`.
2. `theme-color` in `src/routes/__root.tsx` and `theme_color`/`background_color` in
   `public/site.webmanifest`.

`--brand` crimson is only **2.4:1 on the near-black**, so it must never be text on a dark
surface. `--brand-on-dark` (`#E06A75`, 6.12:1) exists for exactly that and is what the
dark header's nav links use.

`--destructive` is deliberately a rust `#C2410C`, not a crimson: `--brand` is already red,
and an error sharing its hue would read as a call to action. Success stays green.

Verified with an automated audit over 252 rendered elements across two pages: **0 contrast
failures**.

### Sizing — read before swapping the logo again

Each logo so far has had a different aspect ratio (1.5:1 → 2.09:1 → **2.369:1**). Heights
are always derived to reproduce the approved rendered **widths** — 114/190/237 unscrolled,
104/171/199 scrolled. Matching the old *heights* instead widens the logo until it collides
with the desktop nav at `lg`. Measured after this change: 190 px wide with 41 px of slack
before the nav at 1024 px.

**If the artwork changes again, retune against width, not height.**

### Icons

`favicon.ico`, `favicon-96x96.png`, `apple-touch-icon.png`, and both
`web-app-manifest-*.png` are near-black `#0A0A0A` squares carrying the **sword rotated 45°**.

The rotation is deliberate and was approved: the sword is a 6.15:1 sliver, so horizontally
it renders as an unreadable scratch below ~96 px. Rotated it fills the square and stays
legible at 48 px. Only the square icons are rotated — the header, footer, and social image
all use the mark in its original orientation.

`public/favicon.svg` is 1.5 MB, still shows the **previous** shield logo, and is deliberately
**not** linked from `__root.tsx`. It ships to `dist/` for no benefit — delete it or replace
it with a real vector.

### Known limitations

- **Resolution.** Only 443×187 of real artwork exists. That is under 2× for retina at the
  largest header render (237 px), and the social image upscales ~1.6×. Worth requesting a
  vector or higher-resolution original.
- **The tagline reads "WE SLASH YOUR RADON LEVEL GUARANTEED."** That is a guarantee claim
  baked into the artwork — the same class of claim deliberately stripped from the copy,
  `/terms`, and the whyUs cards during the rebrand. It cannot be fixed in code and should
  be raised with the client.

Regenerate derivatives with Pillow (Python 3.14 + Pillow 12.3 is installed; the project has
no image tooling and needs none).

## Domain

`SITE_URL` is `https://excaliburradonmitigation.netlify.app`. Every canonical
tag, Open Graph URL, sitemap entry, and JSON-LD `@id` derives from it.

If a custom domain is bought later, `SITE_URL` changes again and **every `@id` in
the schema graph changes with it**, resetting any entity consolidation Google has
built. If a domain purchase is plausible at all, do it before launch.

## Repo conventions worth knowing

- **Do not run `npm run format`.** The repo has CRLF blobs committed with no
  `.gitattributes`, and Prettier defaults to LF. `prettier --write .` rewrites
  ~9,500 lines across the whole tree.
- **`npm run lint` is red at baseline** for the same reason. Use
  `npm run lint 2>&1 | grep -v 'prettier/prettier'` — that is clean apart from 7
  pre-existing `react-refresh` warnings.
- `npx tsc --noEmit` is the real gate. It passes.
- Per `AGENTS.md`, never force-push, rebase, amend, or squash pushed commits —
  the branch syncs back to Lovable.
