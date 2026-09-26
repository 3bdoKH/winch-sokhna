# Implementation Tasks: Fix Target Location Pages & Content Ecosystem

**Feature Branch**: `001-fix-target-pages`
**Spec**: [spec.md](file:///d:/work/winch-sokhna/specs/001-fix-target-pages/spec.md) | **Plan**: [plan.md](file:///d:/work/winch-sokhna/specs/001-fix-target-pages/plan.md)

---

## Phase 1: Setup & Data Model Configuration

- [x] **Task 1.1**: Add `ونش-انقاذ-ابو-زنيمة` to `src/data/areas.js` with coordinates (`29.0411, 33.1044`), South Sinai region, hero image, and nearby links.
- [x] **Task 1.2**: Resolve P0 Sokhna 301 redirect collision:
  - In `src/data/areas.js`: add `sitemapExclude: true` to `ونش-انقاذ-السخنة`.
  - In `src/data/areas.js`: enrich keywords of `ونش-انقاذ-العين-السخنة`.
- [x] **Task 1.3**: Consolidate cannibalized duplicate districts in `src/data/areas.js` and `src/data/legacyRedirects.js`:
  - `ونش-انقاذ-الاربعين`: set `sitemapExclude: true`, redirect 301 to `ونش-انقاذ-حي-الأربعين`.
  - `ونش-انقاذ-الجناين`: set `sitemapExclude: true`, redirect 301 to `ونش-انقاذ-حي-الجناين`.
  - `عتاقة`: consolidate `حي عتاقة` and `عتاقة البلد` into `ونش-انقاذ-عتاقة` (set `sitemapExclude: true` on secondaries, redirect 301 to `ونش-انقاذ-عتاقة`).
  - Add Abu Zenima spelling variations to `src/data/legacyRedirects.js`.
- [x] **Task 1.4**: Add full 301 redirect consolidation for `چنيفه` / `جنيفة` variants to `طريق جنيفة`, `ابو رديس` spelling variants to `ابورديس`, and `نفق الشهيد أحمد حمدي` variants to `عيون موسى`.

---

## Phase 2: On-Page Optimization (Titles, H1, Meta Descriptions, Arrival Times)

- [x] **Task 2.1**: Update `src/pages/winchLocation/WinchLocationSEO.js` to add all 32 target entities to `dedicatedH1Areas` for pure, undiluted `<h1>` tags.
- [x] **Task 2.2**: Refactor title formatting in `src/pages/winchLocation/WinchLocationSEO.js`:
  - Enforce concise titles (48–56 characters) across all target areas.
  - Eliminate generic region suffixes like `| الطرق والمحاور السريعة | ونش السخنة`.
- [x] **Task 2.3**: Update honest arrival times in `src/pages/winchLocation/WinchLocationSEO.js` for highway and South Sinai areas (e.g. Abu Zenima, Abu Rudeis, Oyoun Mousa, Taba).
- [x] **Task 2.4**: Dynamic Schema JSON-LD `addressRegion` calibration to accurately assign South Sinai (`جنوب سيناء`) and North Sinai (`شمال سيناء`) instead of default Suez fallback.

---

## Phase 3: Bespoke Anti-Slop Content

- [x] **Task 3.1**: Write authentic bespoke roadside field-guide content and unique FAQs in `src/data/sokhnaContent.js` for:
  - `عتاقة` & `الأدبية`
  - `طريق الجلالة`
  - `وادي حجول طريق السويس`
  - `عجرود`
  * `جمرك السويس` & `ميناء السويس`
  * `عيون موسى` & `أبو زنيمة`
  * `طريق جنيفة`
  * `محور 30 يوليو`
- [x] **Task 3.2**: Optimize meta descriptions in `src/data/sokhnaContent.js` for:
  - `راس سدر` (expand from 98 to 152 chars)
  - `شرم الشيخ` (expand from 106 to 150 chars)
  - `بورتو السخنة` (expand from 119 to 151 chars)
  - `طريق القاهرة السويس` (expand from 109 to 152 chars)
  - `الجلالة` (expand from 110 to 152 chars)
  - `اميجو العين السخنة` (trim from 178 to 154 chars)
- [x] **Task 3.3**: Author bespoke content for `العريش` and `ابورديس` in `src/data/sokhnaContent.js` to break incorrect legacy inheritance from Suez and Ras Sudr, providing authentic 145-155 char meta descriptions.

---

## Phase 4: Supporting Articles & Topic Clusters

- [x] **Task 4.1**: Author 3 high-authority human field-guide articles in `src/data/generated-articles.json` with `localOnly: true` and rich contextual in-body links:
  - `ataka-adabiya-industrial-ports-towing-guide`
  - `galala-mountain-wadi-hagoul-highway-safety-towing`
  - `south-sinai-coastal-highway-towing-guide`
- [x] **Task 4.2**: Verify internal link graph across all 247 articles — 0 broken links (404s) and 0 unnecessary redirect hops.

---

## Phase 5: Verification & Production Build

- [x] **Task 5.1**: Run `scripts/detailed_audit.mjs` to verify zero long titles (> 58 chars), zero 301s in sitemap, and complete entity resolution.
- [x] **Task 5.2**: Run `npm run build` to execute static fetch, sitemap generation, `.htaccess` update, and 100% prerendering.
- [x] **Task 5.3**: Inspect generated build outputs in `build/` and verify integrity.
