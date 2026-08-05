# Radon Mitigation — Cincinnati, Ohio | Complete Market Data

**Self-contained research file.** Everything needed to act on this market is in this document. No external files, no cross-references, no prior context required.

**Data retrieved:** 2026-08-02 and 2026-08-03 (each table states which)
**Location setting:** `Cincinnati,Ohio,United States` → `location_code 1023626`
**Language:** `en` · **Device:** desktop
**Providers:** DataForSEO (keyword volume, CPC, competition, keyword difficulty, live SERPs) · Google Maps Places (business listings, ratings, review counts) · Firecrawl (site maps, page scrapes)

---

## 0. How to read this file

- **Part 1** is measured data. Every number came back from a logged API call.
- **Part 2** is findings — conclusions tied to specific tables in Part 1.
- **Part 3** is recommendations. **This is judgment, not measurement**, and is labelled as such.
- **Part 4** is gaps and what is explicitly *not* verified.
- **Part 5** is reproduction instructions and API constraints.

**Two conventions that matter:**

1. **"Below threshold" ≠ zero demand.** Google Ads suppresses metrics under a reporting floor. Those keywords return a row with no `search_volume`. They are labelled `below-threshold` and never recorded as `0`. Real demand exists below the floor.
2. **Google Ads buckets close variants into one number.** Where several keywords return identical volume/CPC/competition, they share one demand pool. **These are flagged and must never be summed** — doing so multiplies the same demand.

---

# PART 1 — MEASURED DATA

## 1.1 Keyword dataset

**Source:** DataForSEO `kw_data_google_ads_search_volume` · Cincinnati, en · Retrieved 2026-08-02 and 2026-08-03
**79 unique keywords. 55 returned metrics. 24 below threshold (30%).**

### Bucket A — the largest term (⚠️ shared bucket)

| Keyword | Volume | CPC | Competition | Index | KD |
|---|---|---|---|---|---|
| **`radon mitigation system`** | **480** | **$17.72** | LOW | 29 | — |

The single largest measurable radon keyword. LOW competition at 480/mo.

### Bucket B — cost cluster (⚠️ ALL FOUR SHARE ONE BUCKET — DO NOT SUM)

| Keyword | Volume | CPC | Competition | Index | KD |
|---|---|---|---|---|---|
| `radon removal cost` | 110 | $9.51 | LOW | 14 | **1** |
| `radon system cost` | 110 | $9.51 | LOW | 14 | — |
| `cost of radon mitigation` | 110 | $9.51 | LOW | 14 | — |
| `radon mitigation system cost` | 110 | $9.51 | LOW | 14 | **3** |

**These four are one demand pool of 110/mo, not 440/mo.**

### Bucket C — city service terms

| Keyword | Volume | CPC | Competition | Index | KD |
|---|---|---|---|---|---|
| `radon mitigation cincinnati` | 90 | $16.97 | MEDIUM | **38** | no data |
| `radon mitigation system cincinnati` | 10 | **$31.95** | MEDIUM | 38 | no data |
| `radon mitigation near me` | 20 | $18.23 | MEDIUM | 53 | **46** |
| `radon mitigation ohio` | 10 | — | MEDIUM | 57 | — |
| `radon mitigation companies` | 10 | — | LOW | — | 21 |
| `radon mitigation contractors near me` | 10 | — | — | — | — |
| `radon system installation` | 10 | — | MEDIUM | 43 | — |
| `radon mitigation cost ohio` | 10 | — | LOW | 14 | no data |
| `radon mitigation cost` | 10 | — | MEDIUM | 33 | **4** |
| `radon mitigation price` | 10 | — | MEDIUM | 33 | — |
| `radon abatement cost` | 10 | — | MEDIUM | 33 | — |
| `how much is radon mitigation` | 20 | — | LOW | 28 | **3** |
| `average radon mitigation cost` | 10 | — | — | — | — |
| `radon fan cost` | 10 | — | — | — | — |

### Bucket D — testing (⚠️ shared bucket)

| Keyword | Volume | CPC | Competition | Index | KD |
|---|---|---|---|---|---|
| `radon testing cincinnati` | 50 | $5.27 | LOW | 32 | no data |
| `radon test cincinnati` | 50 | $5.27 | LOW | 32 | — |

*Both share one 50/mo pool.*

| Keyword | Volume | CPC | Competition | Index | KD |
|---|---|---|---|---|---|
| `radon detector` | 50 | $0.71 | HIGH | 100 | 8 |
| `home radon test` | 20 | $0.96 | HIGH | 75 | — |
| `radon inspection` | 10 | — | MEDIUM | 56 | — |
| `radon inspection cincinnati` | 10 | — | — | — | no data |
| `radon inspection cost` | 10 | — | LOW | 14 | no data |
| `radon test cost` | 10 | $4.33 | MEDIUM | 40 | — |
| `radon testing ohio` | 10 | — | LOW | **8** | — |
| `radon testing near me` | 10 | $2.49 | HIGH | 100 | — |
| `professional radon testing` | 10 | — | HIGH | 75 | — |
| `free radon test kit ohio` | 10 | — | LOW | — | — |
| `radon test results` | 10 | — | — | — | — |
| `radon home inspection` | 10 | — | — | — | — |
| **`radon test kit`** | **590** | **$0.48** | LOW | 21 | — |

⚠️ `radon test kit` at 590/mo is **product-purchase intent** ($0.48 CPC), not hire-a-contractor intent. Do not count it as service demand.

### Bucket E — informational / health

| Keyword | Volume | CPC | Competition | Index | KD |
|---|---|---|---|---|---|
| `what is radon` | 90 | $3.55 | LOW | 11 | **43** |
| `radon gas` | 50 | $0.63 | LOW | 20 | — |
| `radon map ohio` | 20 | — | LOW | **1** | no data |
| `radon in basement` | 10 | $0.12 | LOW | 21 | **1** |
| `safe radon level` | 10 | — | LOW | 20 | **37** |
| `radon symptoms` | 10 | — | LOW | 6 | — |
| `radon health effects` | 10 | — | LOW | 17 | — |
| `radon lung cancer` | 10 | — | LOW | — | — |
| `high radon levels` | 10 | — | LOW | 14 | — |
| `how does radon enter a home` | 10 | — | LOW | — | — |
| `radon levels ohio` | 10 | — | LOW | 14 | — |

### Bucket F — technical

| Keyword | Volume | CPC | Competition | Index |
|---|---|---|---|---|
| `radon fan` | 20 | $0.06 | HIGH | 100 |
| `radon sump pump` | 10 | — | HIGH | 71 |
| `passive radon system` | 10 | — | HIGH | 74 |
| `active radon system` | 10 | $0.65 | HIGH | 100 |
| `radon mitigation crawl space` | 10 | — | — | — |
| `radon mitigation diy` | 10 | — | LOW | — |
| `radon system maintenance` | 10 | — | — | — |
| `sub slab depressurization` | 10 | — | — | — |
| `radon mitigation how it works` | 10 | — | LOW | — |

### Bucket G — geography

| Keyword | Volume | CPC | Competition | Index |
|---|---|---|---|---|
| `radon mitigation dayton ohio` | 10 | $3.60 | LOW | 29 |
| `radon mitigation columbus ohio` | 10 | — | MEDIUM | 50 |
| `radon mitigation florence ky` | 10 | — | HIGH | 100 |

**All other Cincinnati suburb terms returned below threshold**, including: West Chester, Mason, Blue Ash, Loveland, Anderson Township, Milford, Northern Kentucky.

### Below threshold (24 keywords — demand exists but is unmeasurable)

`radon removal cincinnati` · `radon abatement cincinnati` · `radon company cincinnati` · `radon contractor cincinnati` · `radon services cincinnati` · `radon reduction cincinnati` · `radon remediation cincinnati` · `radon mitigation cost calculator` · `radon testing cost ohio` · `radon test before selling` · `radon disclosure ohio` · `radon contingency` · `does radon affect home value` · `radon real estate` · `radon test home purchase` · `seller pay for radon mitigation` · `buying house with radon` · `radon mitigation west chester` · `radon mitigation mason ohio` · `radon testing blue ash` · `radon mitigation loveland ohio` · `radon mitigation anderson township` · `radon mitigation northern kentucky` · `radon mitigation milford ohio`

**Note the real-estate cluster is almost entirely below threshold** — 7 of 8 terms. See Finding 2.6.

---

## 1.2 Keyword difficulty

**Source:** DataForSEO `dataforseo_labs_bulk_keyword_difficulty` · Retrieved 2026-08-02 and 2026-08-03
⚠️ **KD is US-national scope.** DataForSEO offers no city-scoped option. For city-qualified phrases this is a proxy, not a Cincinnati measurement.

| Keyword | KD |
|---|---|
| `radon removal cost` | **1** |
| `radon in basement` | **1** |
| `how much is radon mitigation` | **3** |
| `radon mitigation system cost` | **3** |
| `radon mitigation cost` | **4** |
| `radon detector` | 8 |
| `radon mitigation companies` | 21 |
| `safe radon level` | 37 |
| `what is radon` | **43** |
| `radon mitigation near me` | **46** |

**Returned no KD value** (consistent with thin SERP data): `radon mitigation cincinnati`, `radon testing cincinnati`, `radon mitigation system cincinnati`, `radon mitigation cost ohio`, `radon system cost`, `cost of radon mitigation`, `radon inspection cost`, `radon map ohio`.

---

## 1.3 Seasonality

**Source:** DataForSEO 12-month `monthly_searches`, Jul 2025 → Jun 2026 · Retrieved 2026-08-02

`radon mitigation cincinnati`:
```
Jul 40   Aug 40   Sep 70   Oct 90   Nov 90   Dec 90
Jan 70   Feb 90   Mar 110  Apr 110  May 110  Jun 90
```
**Trough 40 · Peak 110 · 2.75× swing**

`radon mitigation system` (480/mo term):
```
Jul 390  Aug 390  Sep 480  Oct 590  Nov 590  Dec 480
Jan 480  Feb 390  Mar 480  Apr 480  May 480  Jun 320
```
**Trough 320 · Peak 590 · 1.84× swing**

Demand is close to flat year-round, with a mild autumn/winter lift (radon concentrations rise when homes are sealed in cold weather, and Ohio promotes January as Radon Action Month — *inference, not measured*).

---

## 1.4 SERP composition

**Source:** DataForSEO `serp_organic_live_advanced` · Cincinnati, en, desktop, depth 10

### 1.4.1 `radon mitigation cincinnati` — retrieved 2026-08-02

| Pos | Type | Entity |
|---|---|---|
| 1–3 | **Local Pack** | Velocity Radon (4.8★/22) · Guardian Radon (4.9★/80) · Excalibur Radon (5.0★/10) |
| **4** | **organic** | **cincinnatiradon.com — local independent** |
| 5 | organic | Reddit r/cincinnati |
| 6 | PAA | 4 questions (2 cost, 1 local prevalence, 1 insurance) |
| 7 | organic | radonspecialties.com (since 1987) |
| 8 | organic | geiler.com (The Geiler Company) |
| 9 | organic | BBB directory |
| 10 | organic | Yelp directory |
| 11 | organic | alpha-radon.com |
| 12 | organic | guardianradonremoval.com |
| 13 | organic | northamericanradon.com |

**No AI Overview. No national franchises. 2 directories. First organic = a local independent.**

PAA included *"How common is radon in Cincinnati?"* answered on-SERP by an **Ohio Department of Health** PDF.

### 1.4.2 `radon mitigation cost cincinnati` — retrieved 2026-08-03

| Pos | Type | Entity | Published price |
|---|---|---|---|
| 1 | **AI Overview** | (async — content not retrievable) | — |
| 2 | organic | Reddit r/cincinnati | — |
| 3 | PAA | 4 questions | — |
| 4 | organic | **geiler.com** | **$800–$2,500** |
| 5 | organic | **cincinnatiradon.com/radon-mitigation.html** | **"few hundred to ~$2,000"** |
| 6 | forums | Reddit + Facebook | — |
| 7 | organic | **contractorplus.app** (aggregator) | **$2,365.74–$4,731.48** |
| 8 | organic | northamericanradon.com | — |
| 9 | organic | **radonmitigationcincinnati.com** | **$100–$300 (testing)** |
| 10 | organic | **cincinnatiradonpros.com/calculator** | **$1,200–$2,400** |
| 11 | organic | **radontech.com** (Dayton) | **$800–$2,500** |
| 12–14 | **Local Pack (demoted)** | Guardian (80) · Velocity (22) · Omega (3.4★/17) | — |

**Local Pack demoted to position 12.** PAA question *"Is radon a problem in Cincinnati, Ohio?"* is answered on-SERP by **radonmitigationcincinnati.com/ohio-radon-levels-by-zip-code/** — a local competitor owns that answer.

**Five separate sites publish specific dollar figures on this SERP.**

### 1.4.3 `radon testing cincinnati` — retrieved 2026-08-03

| Pos | Type | Entity |
|---|---|---|
| 1–3 | **Local Pack** | North American Radon (5.0★/26) · Guardian (4.9★/80) · Velocity (4.8★/22) |
| 4 | organic | geiler.com |
| 5 | PAA | 4 questions — **one answered by Angi**, one by Marion Public Health |
| 6 | organic | **odh.ohio.gov (Ohio Dept of Health)** |
| 7 | organic | cincinnatiradon.com |
| 8 | organic | northamericanradon.com |
| 9 | organic | **npiweb.com (National Property Inspections)** |
| 10 | organic | Reddit |
| 11 | organic | **swat-radon.com (SWAT Environmental, multi-state)** |
| 12 | organic | **wini.com (WIN Home Inspection)** |
| 13 | organic | mobileradondiagnostics.com |

⚠️ **The PAA states the Ohio Department of Health provides FREE radon test kits to Ohio homeowners** (via EPA grant). Two home-inspection franchises (NPI, WIN) compete here.

### 1.4.4 `radon mitigation system cost` — retrieved 2026-08-02

| Pos | Type | Entity |
|---|---|---|
| 1 | AI Overview | (async) |
| 2 | organic | Reddit r/Homebuilding |
| 3 | PAA | 4 questions, all cost/value |
| 4 | organic | sosradon.org (National Radon Program Services, nonprofit) |
| 5 | forums | Reddit + Facebook groups |
| 6 | organic | radonseal.com (product vendor) |
| 7 | video | 3 YouTube results |
| 8 | perspectives | Facebook group posts |
| 9 | organic | **EPA.gov** |
| 10 | organic | **radontech.com** — "How Much Does Radon Mitigation Cost in Dayton Ohio" |
| 11 | organic | University of Nevada Reno extension |

**No lead-generation aggregators** (no HomeGuide, Thumbtack, Angi, ProMatcher). Field is government, nonprofit, academic, product vendor, forums — plus one local operator.

---

## 1.5 Google Business Profile field

**Source:** Google Maps `maps_search_places` (Cincinnati-biased, 25km) + DataForSEO Local Pack · Retrieved 2026-08-02, 2026-08-03

| Business | Rating | Reviews | Location |
|---|---|---|---|
| Alpha Radon Remediation | 4.9 | **140** | 10963 Canal Rd Ste 2, Cincinnati OH 45241 |
| Guardian Radon Removal LLC | 4.9 | **80** | 330 Beech Ave, Fairfield OH 45014 |
| North American Radon | 5.0 | 26 | 7737 Laurel Ave #43497, Cincinnati OH 45243 |
| Velocity Radon Mitigation | 4.8 | 22 | not shown |
| Radon Specialties Co | 4.8 | 18 | 4940 Nutmeg Knoll, Cincinnati OH 45244 |
| **Omega Radon Mitigation LLC** | **3.4** | 17 | 500 Mt Hope Ave Apt 103, Cincinnati OH 45204 |
| Mobile Radon Diagnostics LLC | 4.7 | 14 | 5802 Wayside Ave, Cincinnati OH 45230 |
| Excalibur Radon Mitigation | 5.0 | 10 | not shown |

**Median of top 5: 26 reviews.**
**Total operators found: 8.** One holds a 3.4★ rating and still ranks in the Local Pack.

Also named but without captured GBP data: **Simply Radon** (recommended on Reddit), **Yeti Radon Cincinnati** (in related searches), **SWAT Environmental** (multi-state), **Cincinnati Radon Pros**, **Radon Mitigation Cincinnati**.

### Benchmark for calibration — Cincinnati tree service, same tool, same date

| Business | Rating | Reviews |
|---|---|---|
| S.B. Tree Service | 5.0 | 476 |
| Maxwell's Tree Service | 5.0 | 317 |
| Jacob's Tree Experts | 5.0 | 287 |
| Gregory Forrest Lester | 4.9 | 281 |
| Wilson Tree Service | 5.0 | 216 |

**Median of top 5: 287.** Radon's moat is **~11× weaker** than a market independently measured as too fortified to enter.

---

## 1.6 Competitor websites

**Source:** Firecrawl `firecrawl_map` and `firecrawl_scrape` · Retrieved 2026-08-02, 2026-08-03

### Site inventory

| Domain | URLs mapped | Service pages | Location pages | Cost content | Notable |
|---|---|---|---|---|---|
| `cincinnatiradon.com` | **14** | 2 | **0** | none | Ranks #1 organic. Flat `.html`. 4 blog posts |
| `guardianradonremoval.com` | **40+** | 3 | **40+** (`/sap/radon-mitigation/{city}`, 3 states) | none | Hibu template. **Unreplaced placeholders live** |
| `cincinnatiradonpros.com` | **40** | **6** | **22** | **`/calculator`** | Most complete site in the market |
| `radonmitigationcincinnati.com` | **40** | 3 | **28** | zip-code page | Owns a PAA answer |
| `radontech.com` (Dayton) | not mapped | — | — | **city cost page** | Ranks page 1 on national cost term |

### `cincinnatiradonpros.com` — the most sophisticated competitor

Services: `radon-mitigation-systems` · `radon-testing` · `crawl-space-radon` · **`real-estate-radon`** · **`commercial-radon`** · `system-repair`
Plus: `/calculator` · `/diagnosis` · `/faq` · `/gallery` · `/reviews` · `/areas`
22 area pages: Cincinnati, Hyde Park, Mariemont, Norwood, Madeira, Mason, West Chester, Blue Ash, Anderson Township, Loveland, Milford, Montgomery, Indian Hill, Kenwood, Sycamore Township, Covington, Newport, Bellevue, Fort Thomas, Highland Heights, Cold Spring, Crescent Springs

### `radonmitigationcincinnati.com` — 28 location pages

Pattern `/{city}-radon`: Wyoming, White Oak, West Chester, Terrace Park, Sharonville, Saylor Park, Over-the-Rhine, Oakley, Norwood, North Bend, Mt Healthy, Mount Washington, Liberty Township, Kenwood, Hyde Park, Harrison, Hamilton, Finneytown, Green Hills, Forest Park, Fairfield, Delhi, Colerain, Cleves, Cheviot, Bridgetown, Blue Ash, Amberly Village, Anderson, Batavia
Blog: are-radon-mitigation-systems-necessary · how-are-radon-mitigation-systems-installed · when-to-install-a-radon-mitigation-system · older-homes-radon
Plus `/ohio-radon-levels-by-zip-code` — **cited as a PAA answer on the cost SERP**

### Measured page: `radontech.com/radon-mitigation-cost-in-dayton-ohio/` — ~1,600 words

The page proving a local operator can rank page one on a national cost term. Structure:

```
H1  How Much Does Radon Mitigation Cost in Dayton Ohio? Full Pricing Guide
H2  Understanding Radon and Its Risks
H2  The Importance of Radon Testing
H2  Average Cost of Radon Mitigation in Dayton, Ohio   → $800–$2,500
    H3  Breakdown of Costs
        Initial assessment/testing      $100 – $300
        Sub-slab depressurization       $800 – $1,500
        Sump hole radon reduction     $1,000 – $2,500
        Block wall suction            $1,200 – $2,800
        Energy drain system           $1,500 – $3,000
        Permits and inspections          $50 – $200
        Maintenance/monitoring       $30 – $100 / year
    H3  Factors Affecting Costs (5 factors)
H2  Choosing the Right Professional (5 subsections)
H2  DIY Radon Mitigation: Is It Feasible? (pros/cons)
H2  Tips to Save on Costs (5 tips)
H2  Long-Term Benefits (4 benefits)
H2  FAQ (4 questions)
H2  Taking the Next Steps + CTA
```

**Its qualifying form is the most detailed in the market** — captures: contact preference (email/text/call), full address, year home built, sump pump y/n, foundation type (basement/crawlspace/both/other), home type (ranch/two-story/bi/tri/quad), test-or-mitigation-or-both, prior test y/n + date + tester + level, **role (buyer/seller/buyer's agent/seller's agent/homeowner)**, **"Is this for a real estate transaction?" y/n**, and a **file upload for the radon report**.

Platform: WordPress + Elementor 4.1.5.
Quality defects observed: the "Transparent Pricing" section repeats the "Comprehensive Services" text verbatim, and "Compare Multiple Quotes" repeats a sentence from the DIY section — copy-paste errors shipped live.

### Measured page: `guardianradonremoval.com/sap/radon-mitigation/blue-ash-oh`

A programmatic location page. **Shipping with unreplaced template placeholders visible in production:**
- `Announcement Banner` · `Optional CTA (not hyoperlinked)` [sic — typo in their template]
- `Request Lorem Epsom`
- `Title or Question` × 3 with `Describe the item or answer the question so that site visitors who are interested get more information.`
- `Bullet text` × 10
- `Gallery Heading H2` · `Button` × 8

It also contains a **wrong-city offer**: a Blue Ash page advertising "$50 off … in Liberty Township and Mason, OH."

Real content present: state licences (**Testing RS605, Mitigation RC378**), lifetime warranty, guaranteed post-mitigation below **2.5 pCi/L**, 30+ years, 24/7, family-owned, veterans discount. Platform: Hibu.

---

## 1.7 Authoritative external facts

**Ohio Department of Health** (`odh.ohio.gov`), surfaced as a ranking result and PAA answer:
- Elevated indoor radon has been found in homes in **every county of Ohio**
- Approximately **50% of all Ohio homes tested annually show elevated levels**
- **Ohio provides FREE radon test kits** to homeowners via an EPA grant
- Ohio operates a **Radon Education and Licensing Program** — mitigation and testing are licensed activities

**EPA** (`epa.gov/radon/how-much-can-radon-mitigation-system-cost`) ranks page 1 for the national cost term.
**`radonmitigationcincinnati.com/ohio-radon-levels-by-zip-code/`**, cited in a PAA: EPA Zone 1 covers Cincinnati and Hamilton County, with readings above 8 pCi/L.

*These are third-party claims recorded as retrieved. Verify against primary sources before publishing any of them.*

---

# PART 2 — FINDINGS

*Each finding cites the table above that supports it.*

**2.1 — The Google Business Profile moat is genuinely weak.** (§1.5) Median top-5 of **26 reviews**, against 287 in a market independently measured as unenterable. Only 8 operators. One ranks in the Local Pack at 3.4★. Five of eight hold under 30 reviews.

**2.2 — Organic access is unusually good for a local service.** (§1.4.1) On `radon mitigation cincinnati`, the first organic result is a **local independent at position 4** — not Reddit, not a directory, not a franchise. No AI Overview. Only two directories on page one.

**2.3 — Cost keywords carry very low difficulty.** (§1.2) `radon removal cost` KD **1**, `how much is radon mitigation` KD **3**, `radon mitigation system cost` KD **3**, `radon mitigation cost` KD **4**.

**2.4 — The national cost SERP has no lead-gen aggregators.** (§1.4.4) `radon mitigation system cost` is contested by EPA.gov, a nonprofit, a university extension, a product vendor, Reddit — and one local operator at #10. No HomeGuide, Thumbtack, Angi or ProMatcher.

**2.5 — ⚠️ CORRECTION: local cost content is more contested than the national SERP suggests.** (§1.4.2) On the *Cincinnati-scoped* cost query, **five sites publish specific dollar figures**: Geiler ($800–$2,500), cincinnatiradon (few hundred–$2,000), radonmitigationcincinnati ($100–$300 testing), **cincinnatiradonpros via a dedicated `/calculator` page ($1,200–$2,400)**, and radontech ($800–$2,500). An aggregator (`contractorplus.app`) also ranks with $2,365–$4,731. **An earlier assessment that "no local competitor publishes prices" was based only on the non-cost SERP and is wrong.**

**2.6 — The real-estate cluster is not measurable.** (§1.1) Seven of eight transaction keywords are below threshold — `radon test before selling`, `radon disclosure ohio`, `radon contingency`, `does radon affect home value`, `radon real estate`, `radon test home purchase`, `seller pay for radon mitigation`, `buying house with radon`. Radon demand is widely assumed to be transaction-triggered; **that assumption is not supported by measurable search volume here.** Competitors nonetheless build for it (cincinnatiradonpros has `/services/real-estate-radon`; radontech's form asks buyer/seller/agent role).

**2.7 — Suburb terms are effectively non-existent.** (§1.1 Bucket G) Every Cincinnati suburb radon term tested returned below threshold. Only Dayton, Columbus and Florence KY registered, at 10/mo each.

**2.8 — ⚠️ Three competitors already run full location networks.** (§1.6) `cincinnatiradonpros.com` (22 area pages, 6 service pages, calculator, FAQ, gallery, reviews), `radonmitigationcincinnati.com` (28 location pages, blog, zip-code page), `guardianradonremoval.com` (40+ across three states). **This market is more actively contested than the top-3 organic results suggest.** These sites rank at positions 9–12, not 4–8 — they were invisible until the cost SERP was pulled.

**2.9 — Incumbent execution is poor despite the page counts.** (§1.6) The #1 organic result is a **14-page flat-`.html` site with no pricing page and no service-area page**. Guardian's location pages ship **unreplaced template placeholders** (`Request Lorem Epsom`, `Bullet text`, `Title or Question`) and a wrong-city offer. Even radontech's ranking page contains duplicated copy-paste paragraphs.

**2.10 — Free state test kits undercut the testing keyword.** (§1.7, §1.4.3) Ohio gives away radon test kits, and the Ohio DoH page ranks #6 on `radon testing cincinnati`. Two home-inspection franchises (NPI, WIN) also compete there. The testing half of this market is structurally weaker than the mitigation half.

**2.11 — Demand is near-flat year-round.** (§1.3) 2.75× swing on the city term, 1.84× on the 480/mo term. Results can be judged in any quarter.

**2.12 — The largest keyword was hiding in plain sight.** (§1.1) `radon mitigation system` — **480/mo, $17.72 CPC, LOW competition (index 29)** — is 5× the city head term and was not in the original keyword set.

---

# PART 3 — RECOMMENDATIONS

> ⚠️ **This section is judgment, not measurement.** Parts 1–2 are data. What follows is interpretation and could reasonably be argued differently.

**3.1 — The opportunity is real but narrower than a first pass suggests.** The weak GBP moat (2.1), low KD (2.3) and good organic access (2.2) are genuine. But three competitors already run 20–40-page sites with location networks and a cost calculator (2.8). This is not an empty market — it is a market where **execution quality is low and page count is already high**. Competing on page count would be competing on their terms and losing.

**3.2 — Target `radon mitigation system` (480/mo, LOW competition) as the primary term**, not `radon mitigation cincinnati` (90/mo). It is 5× larger, LOW competition, and $17.72 CPC. No competitor site observed appears built around it.

**3.3 — Build one exceptional cost page, not a cost page plus 25 location pages.** The model exists and is measurable (§1.6, radontech ~1,600 words with an itemised cost table by mitigation method). Beat it on: honest itemised ranges, Cincinnati-specific cost drivers, and error-free copy. Competitors ship duplicated paragraphs and Lorem placeholders (2.9).

**3.4 — Do not build a suburb location network.** No suburb term is measurable (2.7) and three competitors already saturate that lane (2.8). Entering it means being the fourth near-identical set of city pages.

**3.5 — Consider commercial and multi-family as the differentiator.** Only one competitor has a commercial page. All keyword demand there is below threshold, so this is a *sales* asset, not a search play.

**3.6 — Weight mitigation over testing.** Free state kits and home-inspection franchises compress the testing side (2.10). Mitigation carries the higher ticket and higher CPC.

**3.7 — Copy radontech's qualifying form.** (§1.6) Foundation type, sump pump, year built, prior test results, and buyer/seller/agent role are genuinely useful qualifying fields, and the real-estate-transaction flag segments lead types at no cost.

**3.8 — Licensing is a hard prerequisite.** Ohio licenses radon testing and mitigation (§1.7); Guardian publishes licence numbers RS605/RC378. **You cannot operate this without certification.** The viable routes are lead generation or partnership with a licensed operator.

**3.9 — Verify before committing budget.** The strongest remaining unknown is whether a new site can actually displace `cincinnatiradonpros.com`, which is well-built and already ranks for the cost term with a calculator.

---

# PART 4 — GAPS AND WHAT IS NOT VERIFIED

1. **KD is US-national, not Cincinnati-scoped.** No city-level option exists in the data source.
2. **Eight city-qualified keywords returned no KD at all** — the SERPs are too thin for the provider to compute it.
3. **Review counts are single-date snapshots.** **Review velocity was not measured.** A fast-growing competitor would not appear in §1.5.
4. **`maps_search_places` returns a ranked subset, not a census.** Eight operators is a **minimum**, not a total. Five further named operators (Simply Radon, Yeti Radon, SWAT, Cincinnati Radon Pros, Radon Mitigation Cincinnati) lack captured GBP data.
5. **Only two pages were scraped in full** (radontech's cost page, Guardian's Blue Ash page). Word counts and headings for `cincinnatiradonpros.com`, `radonmitigationcincinnati.com` and `cincinnatiradon.com` are **not measured** — their page *inventories* are known, their page *quality* is not.
6. **`cincinnatiradonpros.com/calculator` was not examined.** It is the most directly competitive asset to the recommended play and its content is unknown.
7. **AI Overview content could not be retrieved.** The provider returned `asynchronous_ai_overview: true` on all four SERPs; presence is confirmed, content is not.
8. **Desktop only.** Mobile SERPs typically weight the Local Pack more heavily.
9. **Single-date SERP snapshots.** Local Pack composition varies by searcher position within the metro.
10. **CPC at 10–20/mo volume is statistically volatile.** `radon mitigation system cincinnati` at $31.95 rests on a thin auction sample.
11. **No licensing, insurance or regulatory research was performed.** The Ohio licensing requirement is noted from a competitor's site and a government page title — **not verified against the Ohio Department of Health directly.**
12. **No backlink or domain-authority analysis** was performed on any competitor.
13. **All third-party statistics in §1.7 are as-retrieved**, including the "50% of Ohio homes" and "8 pCi/L Zone 1" figures. **Verify against primary sources before publishing.**
14. **No revenue, margin, close-rate or job-value data.** Ticket values are not measured anywhere in this file.

---

# PART 5 — REPRODUCTION

```
Location:   Cincinnati,Ohio,United States   (location_code 1023626)
Language:   en
Device:     desktop
Retrieved:  2026-08-02, 2026-08-03
```

| Purpose | Tool | Notes |
|---|---|---|
| Volume / CPC / competition / seasonality | DataForSEO `kw_data_google_ads_search_volume` | **Caps at 10 results per call** — a 50-keyword request silently returns 10. **Keywords limited to 10 words**; longer strings error with code 40501 |
| Keyword difficulty | DataForSEO `dataforseo_labs_bulk_keyword_difficulty` | **Country-scope only**; accepts no city |
| SERPs | DataForSEO `serp_organic_live_advanced` | depth 10; AI Overview content returns async and is not retrievable |
| GBP / operators | Google Maps `maps_search_places` | Free-text queries. **Do NOT use `maps_search_nearby`** — it rejects trade keywords with `Unsupported types` and accepts only Google Places types |
| Site inventory | Firecrawl `firecrawl_map` | Returns indexed/discoverable URLs only |
| Page content | Firecrawl `firecrawl_scrape` | `onlyMainContent: true`, markdown format |

**Avoid** DataForSEO `business_data_business_listings_search` — it returned 176,958 characters for 20 results and matched categories loosely. `maps_search_places` gives the same signal cleanly.

---

*End of file. Everything above is self-contained. Data retrieved 2026-08-02 and 2026-08-03.*
