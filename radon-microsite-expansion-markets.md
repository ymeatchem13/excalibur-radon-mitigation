# Radon Microsite Expansion — Market Selection | Complete Data

**Self-contained research file.** Everything needed to act on this decision is in this document. Companion to `radon-mitigation-cincinnati.md`, which covers the Cincinnati home market; this file covers **where to expand next**.

**Data retrieved:** 2026-08-03
**Location settings:** `United States` (location_code 2840) for cross-city comparison · per-metro city codes for localized demand (listed in Part 5)
**Language:** `en` · **Device:** desktop
**Providers:** DataForSEO (Google Ads search volume, CPC, competition, live SERPs) · Google Maps Places (GBP listings, ratings, review counts)
**Business model assumed:** **lead generation** — leads are brokered to licensed in-market operators. State radon licensing (OH/KY/IN license separately) and drive time therefore do **not** constrain market choice.

---

## 0. How to read this file

- **Part 1** is measured data. Every number came back from a logged API call on 2026-08-03.
- **Part 2** is findings — conclusions tied to specific tables in Part 1.
- **Part 3** is recommendations. **This is judgment, not measurement**, and is labelled as such.
- **Part 4** is gaps and what is explicitly *not* verified.
- **Part 5** is reproduction instructions and API constraints.

**Three conventions that matter:**

1. **"Below threshold" ≠ zero demand.** Google Ads suppresses metrics under a reporting floor. Those keywords return a row with no `search_volume`. They are labelled `below-threshold` and never recorded as `0`. Real demand exists below the floor.
2. **Google Ads buckets close variants into one number.** Where several keywords return identical volume/CPC/competition, they share one demand pool. **These are flagged and must never be summed** — doing so multiplies the same demand.
3. **⚠️ Location scope changes the number.** `radon mitigation cincinnati` returns **210/mo at US scope** but **90/mo at Cincinnati scope** (the figure in `radon-mitigation-cincinnati.md`). Neither is wrong; they measure different things. **Part 1.1 is US scope throughout and Part 1.2 is city scope throughout. Never compare a number across the two tables.**

---

# PART 1 — MEASURED DATA

## 1.1 City-qualified demand — US scope

**Source:** DataForSEO `kw_data_google_ads_search_volume` · `United States`, en · Retrieved 2026-08-03
US scope is used here so every city is measured identically and is directly comparable.

| Keyword | Volume | CPC | Competition | Index |
|---|---|---|---|---|
| `radon mitigation columbus ohio` | **320** | $21.05 | MEDIUM | 53 |
| `radon mitigation cincinnati` *(baseline)* | 210 | $18.20 | MEDIUM | 37 |
| `radon mitigation indianapolis` | **170** | **$31.18** | MEDIUM | 50 |
| `radon mitigation lexington ky` | **140** | $16.19 | **LOW** | **26** |
| `radon testing lexington ky` | 140 ⚠️ | $16.19 ⚠️ | LOW ⚠️ | 26 ⚠️ |
| `radon mitigation louisville ky` | 70 | $16.79 | MEDIUM | 38 |
| `radon mitigation dayton ohio` | 50 | $13.03 | MEDIUM | 55 |
| `radon testing dayton ohio` | 40 | $4.50 | MEDIUM | 55 |
| `radon mitigation akron ohio` | 30 | **$40.79** | MEDIUM | 36 |
| `radon mitigation cleveland ohio` | 20 | $20.02 | MEDIUM | 43 |
| `radon mitigation toledo ohio` | 10 | $12.15 | MEDIUM | 56 |
| `radon mitigation canton ohio` | 10 | $12.42 | MEDIUM | 44 |
| `radon mitigation florence ky` | 10 | — | HIGH | **100** |

⚠️ **SHARED BUCKET — DO NOT SUM.** `radon mitigation lexington ky` and `radon testing lexington ky` returned **identical** volume, CPC, competition index *and all twelve monthly values*. They are **one 140/mo pool, not 280/mo.**

### Below threshold (17 terms — demand exists but is unmeasurable)

`radon mitigation northern kentucky` · `radon mitigation west chester ohio` · `radon mitigation mason ohio` · `radon mitigation oxford ohio` · `radon mitigation lebanon ohio` · `radon mitigation covington ky` · `radon mitigation batavia ohio` · `radon mitigation fairfield ohio` · `radon mitigation middletown ohio` · `radon mitigation hamilton ohio` · `radon mitigation springfield ohio` · `radon mitigation fort wayne indiana` · `radon mitigation evansville indiana` · `radon mitigation bloomington indiana` · `radon mitigation huntington wv` · `radon mitigation charleston wv` · `radon mitigation youngstown ohio`

**Every Cincinnati suburb term tested is below threshold** — consistent with finding 2.7 of `radon-mitigation-cincinnati.md`, retested nine months of data later and unchanged.

## 1.2 Localized core-term demand — city scope

**Source:** DataForSEO `kw_data_google_ads_search_volume`, `location_name` set to each city · en · Retrieved 2026-08-03

This measures searches **originating inside** each metro, using non-geo core terms. The searcher's location supplies the geography, so it captures demand the city-qualified terms in 1.1 miss.

| Metro | `radon mitigation` | `radon testing` | `radon mitigation system` | `…near me` |
|---|---|---|---|---|
| Columbus OH | 140 (MED 55) | 390 (HIGH 77) | **1000** (MED 43, $14.65) | 30 (HIGH 79) |
| Indianapolis IN | 70 (MED 51) | 260 (HIGH 94) | 590 (MED 42, $17.48) | 20 (HIGH 71) |
| **Cincinnati OH** *(baseline)* | 70 (MED 44) | 210 (HIGH 80) | 480 (LOW 29, $17.72) | 20 (MED 53) |
| Louisville KY | 50 (LOW 30) | 210 (HIGH 98) | 480 (LOW 32, $14.48) | 10 (LOW 16) |
| Lexington KY | 40 (LOW 31) | 110 (MED 61) | 260 (MED 34, **$30.05**) | 10 (LOW) |
| Dayton OH | 30 (LOW 30) | 90 (HIGH 94) | 260 (MED 36, $9.64) | 20 (LOW 24) |
| Hamilton OH | 20 (MED 37) | 50 (HIGH 69) | 110 (MED 40, $12.54) | 20 (MED 54) |
| Middletown OH | 10 (MED 43) | 30 (HIGH 94) | 70 (MED 48, $10.86) | 10 (MED 34) |
| Springfield OH (Clark) | 10 (HIGH 86) | 20 (HIGH 88) | 40 (HIGH 69, $8.89) | 10 (LOW 12) |
| Florence KY | 10 (LOW) | 10 (HIGH 87) | 40 (LOW 15, $2.99) | 10 |
| Richmond IN | 10 (LOW 5) | 10 (LOW 14) | 10 (MED 37) | 10 |

**`radon mitigation system` is the dominant term in every single market measured** — 2–7× larger than the bare service term everywhere. This replicates finding 2.12 of the Cincinnati dossier across ten additional metros.

**Lexington's `radon mitigation system` CPC of $30.05 is the highest localized CPC measured anywhere in this study**, above Cincinnati's $17.72.

## 1.3 Seasonality

**Source:** DataForSEO 12-month `monthly_searches`, Jul 2025 → Jun 2026 · Retrieved 2026-08-03

`radon mitigation lexington ky` (140/mo):
```
Jul 110  Aug 110  Sep 140  Oct 140  Nov 170  Dec 140
Jan 140  Feb 170  Mar 260  Apr 170  May 140  Jun 140
```
**Trough 110 · Peak 260 · 2.36× swing**

`radon mitigation columbus ohio` (320/mo):
```
Jul 320  Aug 210  Sep 320  Oct 320  Nov 390  Dec 390
Jan 390  Feb 320  Mar 480  Apr 390  May 320  Jun 320
```
**Trough 210 · Peak 480 · 2.29× swing**

`radon mitigation indianapolis` (170/mo):
```
Jul 170  Aug 170  Sep 210  Oct 210  Nov 170  Dec 140
Jan 110  Feb 170  Mar 210  Apr 140  May 140  Jun 110
```
**Trough 110 · Peak 210 · 1.91× swing**

**March is at or tied for the annual peak in all three markets** (Indianapolis ties March with September and October at 210). Demand is otherwise near-flat, matching the Cincinnati pattern (finding 2.11). Results can be judged in any quarter; March is the single best launch-timing target.

## 1.4 Map-pack / Google Business Profile field

**Source:** Google Maps `maps_search_places`, one free-text query per metro · Retrieved 2026-08-03

| Market | Operators returned | Review counts (desc) | Median top-5 |
|---|---|---|---|
| **Akron OH** | **2** | 6, 3 | **~5** |
| **Lexington KY** | 7 | 107, 42, 18, 12, 9, 1, 0 | **18** |
| Cincinnati OH *(baseline, from prior dossier)* | 8 | 140, 80, 26, 22, 18 | 26 |
| Louisville KY | 4 | 662ᵍ, 594ᵍ, 71, 7 | 39 *(specialists only)* |
| Columbus OH | 6 | 359, 234, 95, 40, 35 | 95 |
| Indianapolis IN | 7 | 423ʰ, 106, 100, 73, 22 | 100 |
| Dayton OH | 3 local + Cincinnati spillover | 168, 139, 26 | 139 |

ᵍ **Waterproofing generalists, not radon specialists** — GuardianPro (4.9/662) and Aqua Lock (4.7/594) are basement/waterproofing firms that also offer radon. The only radon-first operators in Louisville are Protect Environmental (4.9/71, a national brand) and Radon Systems of KY (5.0/**7**). Louisville's specialist-only median is **39**.

ʰ **Home-inspection firm, not a mitigation specialist** — Safe Home Inspections & Safe Air Radon (5.0/423). Indianapolis's mitigation-specialist tier is 106 / 100 / 73.

### Named operators by market

- **Akron:** Akron Radon Pros LLC (5.0/6) · Radon Solutions, Copley (5.0/3)
- **Lexington:** Alpha Radon Remediation (4.9/107) · Radon Delete (5.0/42) · Central Kentucky Radon (5.0/18) · Bluegrass Radon Systems (4.6/12) · Advanced Radon Services, Wilmore (5.0/9) · Radon Protection Services (5.0/1) · Radon Solutions (0 reviews)
- **Louisville:** GuardianPro (4.9/662ᵍ) · Aqua Lock (4.7/594ᵍ) · Protect Environmental (4.9/71) · Radon Systems of Ky (5.0/7)
- **Columbus:** Radon Reaperz®, Delaware (5.0/359) · Radon Be Gone (4.9/234) · Radon Pros, Grove City (5.0/95) · ProCheck Radon Systems (5.0/40) · The Radon Wizard, Sunbury (5.0/35) · Safe Check Radon, Dublin (5.0/23). *Ohio Radon Mitigation, Alexandria OH (5.0/**218**) also serves this market but surfaced on a different query and is **excluded from the median** — including it would raise Columbus's median top-5 from 95 to 218.*
- **Indianapolis:** Safe Home Inspections & Safe Air Radon (5.0/423ʰ) · Great Lakes Radon (5.0/106) · Radon Environmental, Carmel (4.7/100) · Anderson Radon and Vapor (5.0/73) · ALARA Property Services (5.0/22) · Healthy Radon Solutions, Carmel (5.0/14) · Advanced Home Solutions, Plainfield (5.0/6)
- **Dayton:** Radon Technology Inc (4.9/168) · Environmental Doctor (4.8/139) · Dayton Radon (4.8/26) — plus Guardian Radon (Fairfield, 80) and Alpha Radon (Cincinnati, 140) ranking into the market

**Calibration:** the Cincinnati dossier established a Cincinnati tree-service median top-5 of **287 reviews** as an example of a market too fortified to enter. Every market in this table except Columbus, Indianapolis and Dayton sits an order of magnitude below that.

## 1.5 Verified local packs

**Source:** DataForSEO `serp_organic_live_advanced`, keyword `radon mitigation`, depth 10, desktop · Retrieved 2026-08-03

These are the **true 3-pack** as returned in the SERP, not the Maps proxy used in 1.4.

### 1.5.1 Lexington, KY

| Pos | Type | Entity | Rating / reviews |
|---|---|---|---|
| 1 | **AI Overview** | (async — content not retrievable) | — |
| 1–3 | **Local Pack** | Alpha Radon Remediation (`alpha-radon.com`) | 4.9 / **107** |
| | | Radon Delete (`radondelete.com`) | 5.0 / **42** |
| | | Central Kentucky Radon (`centralkentuckyradon.com`) | 5.0 / **18** |

**Below the single 107-review incumbent, the pack collapses to 42 and 18.**

⚠️ **Alpha Radon Remediation is a Cincinnati company** (10963 Canal Rd, Cincinnati OH 45241 — 4.9/140) that has built a **separate Lexington GBP to 107 reviews** at 114 Pasadena Dr, Lexington KY 40503. **The Cincinnati → Lexington expansion has already been executed successfully by a direct competitor.**

### 1.5.2 Middletown, OH

| Pos | Type | Entity | Rating / reviews | Actually located in |
|---|---|---|---|---|
| 1–3 | **Local Pack** | Guardian Radon Removal LLC | 4.9 / 80 | **Fairfield OH** |
| | | Radon Technology, Inc. | 4.9 / 168 | **Dayton OH** |
| | | Alpha Radon Remediation | 4.9 / 140 | **Cincinnati OH** |

**Zero Middletown-based operators exist.** The entire pack is out-of-town spillover from three different metros.

Organic results for the same query were entirely national/informational — CDC (#1), sosradon.org (#2), Reddit (#3), EPA (#4), radontech.com (#5), Airthings (#6), Wikipedia (#7). Only one commercial operator ranks organically, and it is in Dayton.

## 1.6 Opportunity scoring

Formula, stated so the ranking is auditable rather than asserted:

```
Raw score      = (city-term volume × CPC) ÷ competition index          [Part 1.1]
Pack weakness  = 26 ÷ median top-5 review count                        [Part 1.4]
                 (26 = Cincinnati baseline, so Cincinnati = 1.00)
Adjusted score = Raw score × Pack weakness
```

| Market | Vol | CPC | Comp | Raw | Median reviews | Weakness | **Adjusted** |
|---|---|---|---|---|---|---|---|
| Akron OH | 30 | $40.79 | 36 | 34.0 | ~4.5 | 5.78 | **196.5** ⚠️ |
| **Lexington KY** | 140 | $16.19 | 26 | 87.2 | 18 | 1.44 | **125.6** |
| *Cincinnati OH (baseline)* | 210 | $18.20 | 37 | 103.3 | 26 | 1.00 | *103.3* |
| Columbus OH | 320 | $21.05 | 53 | 127.1 | 95 | 0.27 | **34.3** |
| Indianapolis IN | 170 | $31.18 | 50 | 106.0 | 100 | 0.26 | **27.6** |
| Louisville KY | 70 | $16.79 | 38 | 30.9 | 39 | 0.67 | **20.7** |
| Cleveland OH | 20 | $20.02 | 43 | 9.3 | not measured | — | — |
| Dayton OH | 50 | $13.03 | 55 | 11.8 | 139 | 0.19 | **2.2** |
| Canton OH | 10 | $12.42 | 44 | 2.8 | not measured | — | — |
| Toledo OH | 10 | $12.15 | 56 | 2.2 | not measured | — | — |

⚠️ **Akron's score is unstable and is overridden in Part 3.** Its weakness multiplier of 5.78 is computed from a sample of **two listings**, and its $40.79 CPC rests on a 30/mo auction — precisely the statistical volatility flagged as gap 10 in the Cincinnati dossier. The formula is reported unmodified; the judgment that overrides it is stated openly in Part 3.

**Note that only Lexington scores above the Cincinnati baseline.** Every other candidate is a worse market than the one already being built.

---

# PART 2 — FINDINGS

*Each finding cites the table above that supports it.*

**2.1 — Lexington is the only expansion market that scores better than Cincinnati itself.** (§1.6) Adjusted 125.6 against Cincinnati's 103.3. Every other candidate scores below the home market, several by an order of magnitude.

**2.2 — Lexington carries the lowest competition index of any market measured.** (§1.1) Index **26**, against Cincinnati 37, Louisville 38, Akron 36, Indianapolis 50, Columbus 53, Dayton 55. It is also the only LOW-competition city term among the major metros.

**2.3 — The Cincinnati → Lexington expansion is already proven by a direct competitor.** (§1.5.1) Alpha Radon Remediation runs a Cincinnati GBP (140 reviews) *and* a Lexington GBP (107 reviews). This is not a hypothesis about whether the crossover works; a competitor has already executed it.

**2.4 — Lexington's pack is one incumbent deep.** (§1.5.1) Below Alpha Radon's 107 reviews the verified 3-pack drops to 42 and 18, and the wider field to 12, 9, 1, 0. Displacing position 3 requires roughly 20 reviews.

**2.5 — Volume and competition are inversely related across this region.** (§1.1, §1.4) Columbus has the largest demand (320/mo, 1000/mo localized) and the strongest pack (359/234/95/40/35). Dayton is nearest and has the second-weakest demand with the strongest median pack (139). There is no market offering both high volume and a weak field.

**2.6 — Louisville's field is generalists, not radon specialists.** (§1.4) The two dominant listings (662 and 594 reviews) are waterproofing companies. Only two radon-first operators exist and one holds **7 reviews**. A radon-specialist brand has an uncontested positioning lane, though total demand is modest at 70/mo.

**2.7 — Indianapolis carries the highest lead value of any major market.** (§1.1) $31.18 CPC, 68% above Lexington and 71% above Cincinnati. Its largest GBP is a home inspector, not a mitigator (§1.4).

**2.8 — Dayton is the trap.** (§1.1, §1.4) It is the closest market and therefore the intuitive first choice, but it has 50/mo demand, the highest competition index in the region (55), a 168-review incumbent, a 139-review second, and `radontech.com` already ranks page one on the *national* cost term (per the prior dossier §1.4.4). It scores **2.2** — the worst of any measured metro. Under a lead-gen model, its proximity is worth nothing.

**2.9 — Every Cincinnati suburb term remains below threshold.** (§1.1) Seventeen terms tested, including all nine suburb/NKY variants. This independently re-confirms finding 2.7 and recommendation 3.4 of `radon-mitigation-cincinnati.md`.

**2.10 — Middletown has no local operator at all.** (§1.5.2) The verified 3-pack is filled entirely by businesses in Fairfield, Dayton and Cincinnati. This is a **proximity opportunity for a Google Business Profile**, not a microsite opportunity — the city term is below threshold (§1.1).

**2.11 — `radon mitigation system` dominates in all eleven metros measured.** (§1.2) It runs 2–7× the bare service term everywhere, peaking at 1000/mo in Columbus. Any microsite template built from this research should be architected around that term, not around `radon mitigation {city}`.

**2.12 — Every market peaks in March.** (§1.3) Swings of 1.91×–2.36×. Launch timing should target indexation before March.

**2.13 — Florence KY is actively contested despite trivial volume.** (§1.1) 10/mo at competition index **100** — the only HIGH-competition term in the entire city-qualified dataset. It is already inside the main site's service area and should stay there.

---

# PART 3 — RECOMMENDATIONS

> ⚠️ **This section is judgment, not measurement.** Parts 1–2 are data. What follows is interpretation and could reasonably be argued differently.

## Build order

### 1 — Lexington, KY · **BUILD FIRST**

The only market that outscores Cincinnati (2.1), at the lowest competition index measured (2.2), against a pack that is one incumbent deep (2.4). The Cincinnati→Lexington crossover is already proven by Alpha Radon (2.3). Localized `radon mitigation system` CPC is $30.05, the highest anywhere (§1.2).

Target `radon mitigation system` as the primary term (2.11), `radon mitigation lexington ky` as the city head term. Remember the shared bucket: the 140/mo pool covers mitigation *and* testing queries — do not plan as though there are 280.

### 2 — Columbus, OH · **BUILD SECOND**

Largest demand pool in the region by a wide margin — 320/mo city term, **1000/mo** on localized `radon mitigation system` (§1.2). The offset is the strongest GBP field measured (359/234/95/40/35, plus a 218-review operator outside the counted set). This is a volume play that should not be attempted until the template has proven itself somewhere easier, which is exactly why it follows Lexington rather than leading.

### 3 — Indianapolis, IN · **BUILD THIRD**

Highest lead value of any major market at $31.18 CPC (2.7), 170/mo, and a field whose largest listing is a home inspector rather than a mitigator. Under a lead-gen model, CPC is the closest available proxy for what a lead resells for, which makes this the highest revenue-per-lead market on the list.

### 4 — Louisville, KY · **BUILD FOURTH**

Modest demand (70/mo) but a genuinely uncontested specialist lane — the incumbents are waterproofing generalists and the only radon-first local operator has 7 reviews (2.6). Cheap to enter, and a KY sister market to Lexington, which lets one set of Kentucky operator relationships serve two microsites.

### 5 — Akron, OH · **WILDCARD, TEST ONLY**

**The scoring model ranks Akron first at 196.5 and I am overriding it.** (§1.6) The multiplier is derived from a two-listing sample and the $40.79 CPC rests on a 30/mo auction. What is *not* in doubt is that the market contains only two radon operators holding **6 and 3 reviews** — the emptiest field found anywhere in this study. Treat it as a cheap option: if a template exists by then, launching costs little and 30/mo against a 6-review incumbent may convert well. Do not build it before markets 1–4, and do not resource it as though the 196.5 is real.

### 6 — Dayton, OH · **BUILD LAST OR SKIP**

Scores 2.2, the worst of any measured metro (2.8). It will feel wrong to skip the nearest city; skip it anyway, or leave it until everything else is running. Proximity has no value in a lead-gen model, and this is the most fortified near market.

## Do not build

| Market | Reason |
|---|---|
| **All Cincinnati suburbs** — West Chester, Mason, Oxford, Lebanon, Batavia, Fairfield, Hamilton, Covington, Northern Kentucky | Every term below threshold (§1.1), and three competitors already run 22–40-page location networks (prior dossier §1.6). Confirms recommendation 3.4 of that file. |
| **Middletown OH** | City term below threshold. The empty local pack (§1.5.2) is a **GBP proximity opportunity for the main Cincinnati site**, not a microsite. |
| **Florence KY** | 10/mo at competition index **100** (2.13). Already inside the main site's service area. |
| **Springfield OH (Clark Co)** | City term below threshold; every core term returns HIGH competition on 10–40/mo (§1.2). |
| **Richmond IN** | Everything at 10/mo or null (§1.2). |
| **Cleveland, Canton, Toledo OH** | Raw scores of 9.3, 2.8, 2.2 (§1.6) — and all three sit outside the Cincinnati orbit entirely. |
| **Fort Wayne, Evansville, Bloomington IN · Huntington, Charleston WV · Youngstown OH** | All below threshold (§1.1). |

## Cross-cutting

**3.1 — Architect the template around `radon mitigation system`, not `radon mitigation {city}`.** (2.11) It is the dominant term in all eleven metros measured, by 2–7×. This carries the Cincinnati dossier's recommendation 3.2 into every expansion market.

**3.2 — Build one template, deploy it six times.** The existing repo hardcodes city identity across roughly ten files with no config-driven abstraction. Before building microsite #1, extract city identity into a single config module — otherwise each new market repeats the same ten-file edit and the error rate compounds.

**3.3 — Target indexation before March.** (2.12) Every market peaks in March with a ~2× swing.

**3.4 — Licensing sits with the operator, not with you.** Under the lead-gen model, KY and IN radon licensure is the receiving operator's obligation. **Secure the operator relationship in a market before building its microsite**, not after — an unsold lead has no value, and the Kentucky pair (Lexington + Louisville) can likely share one relationship.

**3.5 — The honest summary: only one of these is clearly good.** Lexington is the sole market that beats the home market on the data. Columbus and Indianapolis are large but fortified. Louisville and Akron are cheap options. Dayton is a trap. A disciplined reading of this file builds Lexington, measures it for two quarters, and only then decides whether the template is worth replicating.

---

# PART 4 — GAPS AND WHAT IS NOT VERIFIED

1. **No first-party data was available.** GA4 returned `503 Reauthentication is needed` on every attempt (2026-08-03). Google Search Console has **no property for `cincinnatiradonsolutions.com`** — the site is unlaunched. **No GA4 or GSC data informs any conclusion in this file.** Section 1.7 is reserved for it and is currently empty.
2. **Map-pack rosters for Columbus, Indianapolis, Louisville, Dayton and Akron come from `maps_search_places`**, which returns a **ranked subset, not a census**. Only **Lexington and Middletown** were verified against the true `local_pack` (§1.5). Operator counts elsewhere are minimums.
3. **Keyword difficulty was not run for any candidate city.** DataForSEO KD is country-scoped only and offers no city option, so it would not have distinguished between these markets.
4. **Review counts are single-date snapshots. Review velocity was not measured.** A competitor growing fast in any of these markets would not appear.
5. **No competitor site inventories were mapped for any expansion market.** Page counts, location networks and cost-page quality are known only for Cincinnati, from the prior dossier. It is **not known** whether Lexington's Alpha Radon has a location network, a cost calculator, or a thin brochure site.
6. **Akron's $40.79 CPC and 5.78 weakness multiplier are both statistically fragile** — a 30/mo auction and a two-listing sample respectively. This is the single least reliable row in the study.
7. **Louisville's "specialists only" median of 39 is a judgment call**, not a measurement. It excludes GuardianPro and Aqua Lock on the grounds that they are waterproofing firms. Including them gives a median of 332.5 and moves Louisville below Dayton.
8. **AI Overview content could not be retrieved.** Present on the Lexington SERP; the provider returned it asynchronously and the content is not readable.
9. **Desktop only. Single-date SERP snapshots.** Mobile SERPs weight the local pack more heavily, and pack composition varies by the searcher's position within a metro.
10. **No lead-value, close-rate or lead-resale-price data exists.** CPC is used as a proxy for lead value throughout Part 3. That proxy is untested against what these leads actually sell for.
11. **Population, housing stock and EPA radon zone were not measured** for any market and form no part of the scoring.
12. **The Cincinnati baseline row in §1.4 is carried from the prior dossier** (retrieved 2026-08-02), not re-measured on 2026-08-03.

## 1.7 First-party data — *reserved, not yet collected*

To be populated once `gcloud auth application-default login` has been run. Planned pulls: `mcp__ga4__get_account_summaries` to identify any relevant property, then `city` / `region` dimensions against `sessions` and `keyEvents` to test whether observed geography corroborates the ranking above. **If no radon property exists, that will be recorded here as a finding rather than left implied.**

---

# PART 5 — REPRODUCTION

```
Cross-city scope:  United States                     (location_code 2840)
Language:          en
Device:            desktop
Retrieved:         2026-08-03
```

**City location codes used in §1.2:**

| City | Code | | City | Code |
|---|---|---|---|---|
| Cincinnati, OH | 1023626 | | Hamilton, OH | 1023732 |
| Columbus, OH | 1023640 | | Middletown, OH | 1023838 |
| Dayton, OH | 1023657 | | Springfield, Clark County, OH | 1024005 |
| Lexington, KY | 1017818 | | Florence, KY | 1017760 |
| Louisville, KY | 1017825 | | Richmond, IN | 1017281 |
| Indianapolis, IN | 1017146 | | | |

| Purpose | Tool | Notes |
|---|---|---|
| Volume / CPC / competition / seasonality | DataForSEO `kw_data_google_ads_search_volume` | **Caps at 10 results per call.** Keywords limited to 10 words. `location_name` must be hierarchical and exact — `Springfield,Ohio,United States` **errors (40501)**; the correct string is `Springfield,Clark County,Ohio,United States` |
| Resolving location strings | DataForSEO `kw_data_google_ads_locations` | Use whenever a `location_name` errors; ambiguous city names are disambiguated by county |
| Local pack + organic | DataForSEO `serp_organic_live_advanced` | depth 10. **Returns ~110k characters per call** — exceeds tool output limits and spills to a file. Grep the saved file for `"type": "local_pack"`, `"title":`, `"votes_count":` rather than reading it whole. AI Overview content is async and unreadable |
| GBP / operators | Google Maps `maps_search_places` | Free-text queries such as `radon mitigation company in {city}, {state}`. **Do NOT use `maps_search_nearby`** — it rejects trade keywords with `Unsupported types` |
| First-party analytics | `mcp__ga4__*` | **Blocked 2026-08-03.** Requires `gcloud auth application-default login` |

**Avoid** DataForSEO `business_data_business_listings_search` — per the prior dossier it returned 176,958 characters for 20 results and matched categories loosely.

---

*End of file. Everything above is self-contained. Data retrieved 2026-08-03. Companion file: `radon-mitigation-cincinnati.md`.*
