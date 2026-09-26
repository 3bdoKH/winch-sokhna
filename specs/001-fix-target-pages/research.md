# Phase 0 Research & Technical Decisions: Target Location Pages & SEO Architecture

## 1. Sokhna Slug Canonicalization & Redirect Collision (P0)

### Background & Problem
In `areas.js`, both `ونش-انقاذ-العين-السخنة` and `ونش-انقاذ-السخنة` exist.
`generate-sitemap.js` included `/winch/ونش-انقاذ-السخنة`.
However, `legacyRedirects.js` mapped `"ونش-انقاذ-السخنة": "ونش-انقاذ-العين-السخنة"` and generated an Apache 301 rule:
`RewriteRule ^winch/ونش-انقاذ-السخنة/?$ /winch/ونش-انقاذ-العين-السخنة [R=301,L,NE]`.
Google Search Console detects that a URL submitted in `sitemap.xml` responds with a 301 redirect.

### Options Evaluated
1. **Option A (Separate Pages)**: Remove the 301 redirect and let `ونش-انقاذ-السخنة` be a standalone page.
   * *Drawback*: "السخنة" and "العين السخنة" represent the exact same physical destination and search intent in Egyptian colloquial Arabic. Creating two standalone pages causes severe Google keyword cannibalization.
2. **Option B (Consolidate to Canonical Hub with Sitemap Exclusion - RECOMMENDED)**:
   * Maintain `ونش-انقاذ-العين-السخنة` as the primary canonical hub (it already has 248 internal article links and top domain authority).
   * Mark `ونش-انقاذ-السخنة` in `areas.js` with `sitemapExclude: true`.
   * Keep the 301 redirect from `/winch/ونش-انقاذ-السخنة` to `/winch/ونش-انقاذ-العين-السخنة`.
   * Ensure `scripts/prerender.js` does not waste build time generating an index.html that is immediately redirected.
   * Add keywords `ونش انقاذ السخنة` and `ونش السخنة` to the primary page's meta and schema alternate names.

### Decision
Adopt **Option B**. Eliminates sitemap crawl error, unites link equity onto one authoritative URL, and captures all search variants.

---

## 2. Cannibalization Strategy for Duplicate Districts & Roads

### Findings
- **الأربعين**: `حي الأربعين` (bespoke, rank-ready) vs `الأربعين` (thin template).
- **الجناين**: `حي الجناين` (bespoke, rural guide) vs `الجناين` (thin template).
- **عتاقة**: `حي عتاقة`, `عتاقة`, `عتاقة البلد` (3 competing thin pages).
- **الأدبية**: `الأدبية` vs `طريق الأدبية`.

### Decision
- **حي الأربعين & حي الجناين**: Designate `ونش-انقاذ-حي-الأربعين` and `ونش-انقاذ-حي-الجناين` as canonical. Redirect `ونش-انقاذ-الاربعين` → `حي-الأربعين` and `ونش-انقاذ-الجناين` → `حي-الجناين` with `sitemapExclude: true`.
- **عتاقة**: Consolidate `عتاقة` as the primary hub (`ونش-انقاذ-عتاقة`). Map `حي-عتاقة` and `عتاقة-البلد` via 301 redirect to `ونش-انقاذ-عتاقة` (with `sitemapExclude: true`).
- **الأدبية**: Keep `ونش-انقاذ-الأدبية` as the district/port hub and `ونش-انقاذ-طريق-الأدبية` as the highway corridor, but differentiate their titles and H1 tags so they do not compete.

---

## 3. Abu Zenima (أبو زنيمة) Integration

### Analysis
Between Ras Sudr (KM 60 post-tunnel) and Abu Rudeis (KM 150), Abu Zenima (KM 115) sits at the junction of the coastal highway and Wadi Feiran road. Heavy mineral extraction trucks and passenger traffic create frequent breakdown calls.

### Decision
Add `ونش-انقاذ-ابو-زنيمة`:
- Coordinates: `29.0411, 33.1044`
- Region: `جنوب سيناء ومحاور القناة`
- Honest arrival time: `20 إلى 30 دقيقة`
- Price range: `600–1200 EGP` (inter-city / desert tier)
- Hero image: `images/15.webp`
- Nearby links: `['ونش-انقاذ-راس-سدر', 'ونش-انقاذ-ابورديس', 'ونش-انقاذ-عيون-موسى']`
- Full entry in `legacyRedirects.js` for spelling variants (`ابو-زنيمة`, `أبو-زنيمة`, `ابوزنيمة`).

---

## 4. Title Tag & Meta Description Standardization Engine

### Problem
Current template pattern produces titles like:
`ونش انقاذ طريق العين السخنة الجديد 24 ساعة | الطرق والمحاور السريعة | ونش السخنة` (80 characters — cut off by 20 characters in SERP).

### Decision & Formulation
Implement a dynamic title truncation guard in `WinchLocationSEO.js`:
- Formula for standard areas:
  `ونش انقاذ ${areaName} 24 ساعة | ${shortHook}`
- Where `shortHook` is curated per area or generated to ensure total length is **between 48 and 56 characters**.
- For H1: Add all target areas to `dedicatedH1Areas` so that H1 is clean and entity-pure:
  `ونش انقاذ سيارات في ${areaName}` (or for highways: `ونش انقاذ ${areaName} 24 ساعة`).
- For Meta Descriptions: All target descriptions written to **strictly 145–158 characters**.

---

## 5. Supporting Field-Guide Articles Architecture

### Cluster Strategy
To inject real domain authority and internal PageRank without AI slop, author 3 comprehensive field guides using the established human field-guide style:

1. **Article 1: Industrial, Port & Heavy Corridor (عتاقة، الأدبية، ميناء السويس، جمرك السويس)**
   - Slug: `ataka-adabiya-industrial-ports-towing-guide`
   - Angle: Breakdown protocols around container terminals, truck blind spots, port gate towing permits, and avoiding unlicensed touts.
   - Internal links: In-body contextual links to `الأدبية`, `عتاقة`, `ميناء السويس`, `جمرك السويس`.

2. **Article 2: Mountain, Gradients & High-Speed Highway (طريق الجلالة، وادي حجول، عجرود)**
   - Slug: `galala-mountain-wadi-hagoul-highway-safety-towing`
   - Angle: Brake fade prevention on 10%+ grades, emergency pulloff bays, hydraulic flatbed requirements for AWD/low-clearance luxury vehicles, Wadi Hagoul bypass hazards.
   - Internal links: In-body contextual links to `طريق الجلالة`, `الجلالة`, `وادي حجول`, `عجرود`.

3. **Article 3: South Sinai Coastal Transit (عيون موسى، رأس سدر، أبو زنيمة، أبو رديس)**
   - Slug: `south-sinai-coastal-highway-towing-guide`
   - Angle: Post-Ahmed Hamdy tunnel checkpoint dynamics, heat stress on cooling systems, emergency location sharing without mile markers, towing logistics between Ras Sudr and Abu Zenima.
   - Internal links: In-body contextual links to `عيون موسى`, `راس سدر`, `أبو زنيمة`, `ابورديس`.

Each article marked `localOnly: true` so the automated API fetcher (`scripts/fetch-articles-static.js`) preserves them and attaches the clean footer.
