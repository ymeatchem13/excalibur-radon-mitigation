# Rebrand migration notes — Excalibur Radon Mitigation

The site was previously branded **Cincinnati Radon Solutions**. This file records
what is still outstanding after that migration. Delete a section once it is done.

## Unconfirmed business details

These are `null` in `src/lib/site-data.ts` rather than placeholder strings, so
nothing bracketed can ever render or reach structured data. Search tokens are
listed for grep-ability only — they do not appear in the codebase.

| Field | Token | Status | Where it goes when confirmed |
|---|---|---|---|
| Email address | `[EXCALIBUR EMAIL ADDRESS]` | **Missing.** The Google Business Profile lists none. | `business.email` in `src/lib/site-data.ts`. Setting it automatically restores the `mailto:` links in the footer, contact page, and all three legal pages, and adds `email` to the JSON-LD. No other edit needed. |
| Business hours | `[CONFIRMED BUSINESS HOURS]` | **Partial.** The GBP publishes only "Tuesday 8 AM–5 PM" and "Opens 8 AM Wed" — not a full week, so the rest was not invented. | `business.hours`. Setting it replaces the "Call for current hours" fallback in the footer and on `/contact`. Consider adding `openingHours` to `organizationNode` in `src/lib/seo.ts` at the same time. |
| Owner name | `[CONFIRMED OWNER NAME]` | Not used anywhere on the site. No action needed unless you want an About bio. |
| Certifications / licence numbers | `[CONFIRMED CERTIFICATION]` | **Deliberately absent.** No licence, insurance, or certification claim appears anywhere. Do not add one without documentation — Ohio licenses radon testing and mitigation. |

## Verified and in use

- **Phone:** (513) 859-7678 — taken from the live Google Business Profile
  (CID `7683202303292945824`), not invented.
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

## Artwork

### Done

- **Header and footer logos** now use `src/assets/excalibur-radon-logo.webp`.
- **`public/og-image.png`** regenerated: 1200×630, white background, new logo
  centred at 72% frame width.
- The old `src/assets/cincinnati_radiation_logo.webp` has been deleted.

Two logo files exist on purpose:

| File | Role |
|---|---|
| `src/assets/excalibur_logo.webp` | Supplied original, 722×346, 120 KB lossless. **Source of truth — not imported by anything.** Use it to regenerate derivatives. |
| `src/assets/excalibur-radon-logo.webp` | 620×297 lossy q90, 50 KB. **This is what the site imports.** Covers 2.5× retina at the largest render (242 px). |

### Sizing — read before swapping the logo again

The new artwork is **2.09:1**, where the old one was **1.5:1**. The header and
footer heights were retuned so the logo reproduces the approved rendered
**widths** (117/192/242 px unscrolled, 108/167/200 scrolled). Matching the old
*heights* instead would have made it up to 94 px wider and pushed it into the
desktop nav at the `lg` breakpoint.

Measured in-browser after the change: 48 px of slack before the nav at 1024 px,
and the footer logo's opaque content has a 166 px diagonal inside the 192 px
disc. Both components carry comments explaining the arithmetic.

**If the artwork changes again, retune against width, not height.**

### Icons — replaced separately, but worth a second look

`favicon.ico`, `favicon-96x96.png`, `favicon.svg`, `apple-touch-icon.png`, and
both `web-app-manifest-*.png` were regenerated outside this work and now carry
Excalibur artwork. No old branding remains in `public/`.

**Open quality issue:** they use the full *wide* lockup letterboxed into a square,
so the artwork occupies only the middle third of each icon. At 96×96 and smaller
the wordmark is an illegible smudge, and `apple-touch-icon.png` has the same
problem on a home screen.

Square icons want the **shield mark alone**, cropped from the lockup and bled to
the edges — that is the part of the logo that survives at 16–32 px. The source
for that crop is `src/assets/excalibur_logo.webp` (the shield occupies roughly
x 26–200, y 36–311). Not changed here because it was out of scope.

This matters slightly beyond the browser tab: `organizationNode` in
`src/lib/seo.ts` uses `web-app-manifest-512x512.png` as the Organization JSON-LD
`logo`, which is a candidate for a Google knowledge panel.

`public/favicon.svg` is 1.5 MB and is deliberately **not** linked from
`__root.tsx` (browsers prefer SVG when offered, and this one is a raster in an SVG
wrapper). It ships to `dist/` on every deploy for no benefit — delete it or
replace it with a real vector.

Regenerate with Pillow if needed (Python 3.14 + Pillow 12.3 is installed; the
project has no image tooling and does not need any).

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
