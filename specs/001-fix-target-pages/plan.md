# Implementation Plan: Fix Target Location Pages & Content Ecosystem

**Branch**: `001-fix-target-pages` | **Date**: 2026-09-26 | **Spec**: [spec.md](file:///d:/work/winch-sokhna/specs/001-fix-target-pages/spec.md)

## Summary

Execute a comprehensive remediation of the 32+ targeted location landing pages on `winch-sokhna`.
The plan resolves the critical P0 Sokhna 301 redirect collision, consolidates duplicate cannibalizing pages (الأربعين, الجناين, عتاقة), introduces the missing Abu Zenima entity, enforces SERP-optimized title tags (48–56 characters) and clean entity-only H1 tags across all targets, injects bespoke anti-slop field-guide content in `sokhnaContent.js`, and publishes 3 high-authority supporting articles with contextual in-body linking.

---

## Technical Context

**Language/Version**: JavaScript (ES6+), React 19.2.5, Node.js 22.x
**Primary Dependencies**: `react-router-dom` 7.x, `react-helmet-async` 3.x, `puppeteer` (prerendering), `cheerio`
**Storage**: Static JSON (`generated-articles.json`), static JS config arrays (`areas.js`, `sokhnaContent.js`, `legacyRedirects.js`)
**Testing/Validation**: Custom Node assertions, sitemap validation, prerender completeness check
**Target Platform**: Prerendered Static Site hosted on Apache (`.htaccess` rewrites + HTTP/2 + gzip)
**Project Type**: React Static Pre-rendered SPA (SSR equivalent for SEO)
**Performance Goals**: 100% crawlable 200 OK URLs in sitemap, zero 301s in sitemap, Title length 48–56 chars, Meta Description 145–160 chars
**Constraints**: Keep build idempotent (`scripts/fetch-articles-static.js` must preserve `localOnly` articles and prevent duplicate footer stacking)

---

## Constitution Check

*GATE: Passed against Winch-Sokhna Constitution (`.specify/memory/constitution.md`)*
- [x] **Single Entity Dedication**: Titles strictly 48–56 chars, pure H1 without dilution.
- [x] **Sitemap Integrity**: 0 redirected URLs in `sitemap.xml`; all 301s excluded from sitemap.
- [x] **Authentic E-E-A-T**: Honest arrival times (20–45 min for desert/remote areas, 10–15 min for urban hubs).
- [x] **Anti-Slop Standards**: Real localized roadside advice, concrete landmarks, and realistic price tiers.
- [x] **Bidirectional Linking**: 3 new localized articles funneling authority to target clusters.

---

## Project Structure & Modified Files

```text
d:\work\winch-sokhna/
├── src/
│   ├── data/
│   │   ├── areas.js                    # Add Abu Zenima, add sitemapExclude on redirected duplicates
│   │   ├── legacyRedirects.js          # Consolidate duplicate aliases (الأربعين, الجناين, عتاقة)
│   │   ├── sokhnaContent.js            # Add bespoke anti-slop copy & FAQs for target pages
│   │   └── generated-articles.json     # 3 new human field-guide articles (localOnly)
│   └── pages/
│       └── winchLocation/
│           └── WinchLocationSEO.js     # Title & H1 formatter, dedicatedH1Areas, honest times
├── scripts/
│   ├── generate-sitemap.js             # Ensure excluded slugs never enter sitemap.xml
│   └── update_htaccess.js              # Regenerate Apache 301 rules cleanly
└── specs/001-fix-target-pages/
    ├── spec.md
    ├── plan.md
    ├── research.md
    ├── data-model.md
    ├── quickstart.md
    └── contracts/
        └── seo-contracts.md
```

---

## Implementation Phases

### Phase 1: Architectural & Technical SEO Fixes (P0 & P1)
1. **Fix Sokhna 301 Collision**:
   - In `src/data/areas.js`: Mark `ونش-انقاذ-السخنة` with `sitemapExclude: true`.
   - In `legacyRedirects.js`: Keep redirecting `ونش-انقاذ-السخنة` → `ونش-انقاذ-العين-السخنة`.
   - Update keywords of `ونش-انقاذ-العين-السخنة` to fully encompass all Sokhna variants.
2. **Consolidate Cannibalized Districts**:
   - `ونش-انقاذ-الاربعين`: set `sitemapExclude: true`, redirect to `ونش-انقاذ-حي-الأربعين`.
   - `ونش-انقاذ-الجناين`: set `sitemapExclude: true`, redirect to `ونش-انقاذ-حي-الجناين`.
   - `عتاقة`: consolidate `حي عتاقة` and `عتاقة البلد` into `ونش-انقاذ-عتاقة` (mark secondaries with `sitemapExclude: true`, 301 to primary).
3. **Add Abu Zenima**:
   - Add `ونش-انقاذ-ابو-زنيمة` to `src/data/areas.js` with full coords, South Sinai region, and nearby links.
   - Add aliases to `legacyRedirects.js`.

### Phase 2: On-Page Tags & Head Standardization (P2)
1. **Title Length Engine (`WinchLocationSEO.js`)**:
   - Refactor `titleLandmarks` and default title pattern to cap all target titles strictly between 48 and 56 characters.
   - Remove redundant region suffixes (`| الطرق والمحاور السريعة | ونش السخنة`).
2. **H1 Purification**:
   - Add all 32 target entities to `dedicatedH1Areas` so that `<h1>` renders strictly as `ونش انقاذ سيارات في [اسم المنطقة]` without landmark fluff.
3. **Meta Description Optimization**:
   - Expand short metas (< 120 chars: رأس سدر, بورتو السخنة, شرم الشيخ, طريق السويس, الجلالة) to 148–156 chars.
   - Trim oversized metas (> 165 chars: اميجو, طريق السخنة الجديد, وادي حجول, منتجع الجلالة).

### Phase 3: Anti-Slop Bespoke Content Injection (P2)
1. **Expand `src/data/sokhnaContent.js`**:
   - Write authentic roadside field guides for key targets:
     * `عتاقة` & `الأدبية`: Truck lanes, customs clearance, heavy industrial traffic, flatbed winches.
     * `طريق الجلالة`: 10%+ gradients, transmission overheat, brake fade, safety bays, twin-cable winches.
     * `وادي حجول`: Desert quarry junction, cross-connect between Suez & Sokhna, loose gravel protocols.
     * `كمين عجرود`: Suez gateway checkpoint, radiator cooling in queue, emergency pulloff.
     * `عيون موسى` & `أبو زنيمة`: Post-tunnel checkpoint, extreme summer heat, distance towing.
     * `جمرك السويس` & `ميناء السويس`: Port gates, security clearance before tow, flatbed towing.

### Phase 4: Supporting Field-Guide Articles & Internal Linking (P3)
1. Author 3 rich human field-guide articles in `generated-articles.json` with `localOnly: true`:
   - `ataka-adabiya-industrial-ports-towing-guide`: Covering Ataka, Adabiya, Suez Port, Suez Customs.
   - `galala-mountain-wadi-hagoul-highway-safety-towing`: Covering Galala Road, Wadi Hagoul, Agroud.
   - `south-sinai-coastal-highway-towing-guide`: Covering Oyoun Mousa, Ras Sudr, Abu Zenima, Abu Rudeis.
2. Ensure contextual in-body anchor links connect directly to targeted `/winch/:slug` landing pages.

### Phase 5: Verification & Production Build
1. Run `scripts/detailed_audit.mjs` to ensure 0 title truncations and 0 sitemap errors.
2. Run `npm run build` to execute static articles fetch, sitemap generation, `.htaccess` update, and 100% prerender pass.
