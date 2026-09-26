# Feature Specification: Fix Target Location Pages & Content Ecosystem

**Feature Branch**: `001-fix-target-pages`
**Created**: 2026-09-26
**Status**: Ready for Planning
**Input**: Comprehensive audit and resolution for 32+ targeted winch location landing pages across Suez, Sokhna, Galala, Highways, and Sinai clusters.

---

## User Scenarios & Testing

### User Story 1 - Resolve P0 Sokhna 301 Conflict & Sitemap Integrity (Priority: P1)

As a search engine crawler (Googlebot) and as a driver searching for "ونش انقاذ السخنة", I need clean access to the canonical landing page without 301 redirect collisions or conflicting sitemap entries so that the page ranks at top positions without crawl errors.

**Why this priority**:
Currently `/winch/ونش-انقاذ-السخنة` is listed in `sitemap.xml` and prerendered into `build/`, but immediately 301-redirected to `/winch/ونش-انقاذ-العين-السخنة` in `.htaccess` and `legacyRedirects.js`. Google Search Console marks this as "Page with redirect" and penalizes both queries.

**Independent Test**:
- Running `curl -I /winch/ونش-انقاذ-العين-السخنة` returns `200 OK`.
- Verifying `sitemap.xml` shows only 200 OK canonical URLs.
- Visiting `/winch/ونش-انقاذ-السخنة` cleanly resolves without endless loops or split canonical signals.

**Acceptance Scenarios**:
1. **Given** a visitor navigates to `/winch/ونش-انقاذ-السخنة` or `/winch/ونش-انقاذ-العين-السخنة`, **When** the page renders, **Then** the canonical link and URL match the intended canonical target.
2. **Given** `scripts/generate-sitemap.js` runs, **When** `sitemap.xml` is inspected, **Then** 0 URLs in the sitemap respond with a 301 redirect in `.htaccess`.

---

### User Story 2 - Eliminate Keyword Cannibalization Across Duplicate Entities (Priority: P1)

As a site visitor searching for specific districts (الاربعين, الجناين, عتاقة, طريق السويس, الأدبية), I need each search intent to lead to a single authoritative, high-ranking landing page rather than multiple thin, competing duplicates.

**Why this priority**:
Having both `ونش-انقاذ-الاربعين` and `ونش-انقاذ-حي-الأربعين`, both `ونش-انقاذ-الجناين` and `ونش-انقاذ-حي-الجناين`, three `عتاقة` pages, and multiple road duplicates splits domain authority and suppresses ranking positions.

**Independent Test**:
- In `legacyRedirects.js` and `.htaccess`, duplicate short forms redirect 301 to the primary canonical page (with `sitemapExclude: true` on redirected slugs to prevent sitemap contamination).
- Search engines see only one dedicated canonical page per distinct entity.

**Acceptance Scenarios**:
1. **Given** duplicate entities exist, **When** canonical targets are assigned:
   - `ونش-انقاذ-الاربعين` 301 → `ونش-انقاذ-حي-الأربعين` (canonical, bespoke)
   - `ونش-انقاذ-الجناين` 301 → `ونش-انقاذ-حي-الجناين` (canonical, bespoke)
   - `عتاقة` variants consolidate to `ونش-انقاذ-عتاقة` as the primary hub
2. **Then** secondary slugs are excluded from `sitemap.xml` via `sitemapExclude: true`.

---

### User Story 3 - Add Missing Geographic Entity "أبو زنيمة" (Priority: P2)

As a motorist stranded in Abu Zenima (South Sinai), I need to find a dedicated, localized winch page (`/winch/ونش-انقاذ-ابو-زنيمة`) providing honest arrival times, pricing, and 24/7 emergency dispatch.

**Why this priority**:
Abu Zenima is a vital coastal waypoint between Ras Sudr and Abu Rudeis with high freight traffic and zero current page representation.

**Independent Test**:
- Navigating to `/winch/ونش-انقاذ-ابو-زنيمة` serves a valid 200 OK prerendered page.
- URL appears in `sitemap.xml` and is linked from nearby South Sinai areas.

**Acceptance Scenarios**:
1. **Given** `areas.js`, **When** the new Abu Zenima object is added with coordinates (`29.0411, 33.1044`), **Then** it renders with honest response times (20–30 min), South Sinai emergency tips, and valid nearby links.

---

### User Story 4 - On-Page Head Tag & H1 Dedication Across Targeted Pages (Priority: P2)

As a search engine evaluating on-page relevance, every targeted location page must feature a title of 48–58 characters (zero truncation), a clean entity-only H1, and an optimized meta description (145–160 characters).

**Why this priority**:
Over 18 target pages suffer from truncated titles (> 65 chars), keyword stuffing in H1 ("— مدينة السويس وأحيائها"), or overly short/long meta descriptions (e.g. Ras Sudr meta is 98 chars, Amigo is 178 chars).

**Acceptance Scenarios**:
1. **Given** any target page in the audit list, **When** its `<title>` is rendered, **Then** length is ≤ 58 characters and contains no double pipes or generic region suffixes.
2. **Given** any target page, **When** its `<h1>` is rendered, **Then** it contains only the pure target entity (e.g. `ونش انقاذ سيارات في الأدبية`).
3. **Given** any target page, **When** its `<meta name="description">` is rendered, **Then** length is strictly 145–160 characters.

---

### User Story 5 - Bespoke Content & Elimination of AI Slop (Priority: P2)

As a stranded driver, I need practical, trustworthy local instructions (landmarks, towing protocols, scam warnings, honest arrival times) rather than generic copy-pasted boilerplate.

**Why this priority**:
Highways and industrial hubs (وادي حجول, كمين عجرود, طريق الجلالة, الأدبية, ميناء السويس, جمرك السويس, طريق جنيفة, عيون موسى) have distinct hazards that generic urban templates do not address.

**Acceptance Scenarios**:
1. **Given** target pages in `sokhnaContent.js`, **When** loaded, **Then** they display verified local advice (e.g. truck lane precautions at Adabiya/Customs, steep slope gear protocols at Galala, wind hazards at Zaafarana).
2. **Given** remote locations, **When** arrival times are presented, **Then** they show honest times (e.g. 20–35 minutes for desert/highway corridors).

---

### User Story 6 - Supporting Field-Guide Articles & Internal Linking (Priority: P3)

As a site visitor reading safety advice, I need relevant, high-quality articles connecting directly to target areas with contextual in-body links, reinforcing topic cluster authority.

**Why this priority**:
Most target pages have 0 supporting blog articles. Creating targeted field guides (e.g. Galala highway safety, Adabiya industrial breakdown guide, Sinai highway crossing guide) funnels contextual PageRank to the landing pages.

**Acceptance Scenarios**:
1. **Given** new articles are created with `localOnly: true`, **When** `npm run build` runs, **Then** the articles survive API re-fetching, attach a single clean footer, and appear in `sitemap.xml`.

---

## Requirements

### Functional Requirements

- **FR-001**: Site MUST resolve the Sokhna entity collision by establishing `ونش-انقاذ-العين-السخنة` as the primary canonical hub and consolidating `ونش-انقاذ-السخنة` with `sitemapExclude: true` and verified 301 redirection.
- **FR-002**: Site MUST eliminate duplicate district pages (`الاربعين`, `الجناين`, `عتاقة البلد`) by redirecting them to their authoritative canonical counterparts (`حي الأربعين`, `حي الجناين`, `عتاقة`) and excluding the secondary slugs from `sitemap.xml`.
- **FR-003**: System MUST introduce `ونش-انقاذ-ابو-زنيمة` with full metadata, local coordinates, and integration into South Sinai nearby links.
- **FR-004**: System MUST ensure all 32 target pages have titles formatted to ≤ 58 characters.
- **FR-005**: System MUST ensure all target pages have pure H1 tags added to `dedicatedH1Areas` in `WinchLocationSEO.js`.
- **FR-006**: System MUST supply customized, slop-free content in `sokhnaContent.js` for key target hubs: (عتاقة, الأدبية, طريق السويس, وادي حجول, طريق الجلالة, عجرود, جمرك السويس, ميناء السويس, عيون موسى, رأس سدر, شرم الشيخ).
- **FR-007**: System MUST provide targeted field-guide articles in `generated-articles.json` (or static pipeline) with contextual in-body links pointing to target pages.
- **FR-008**: System MUST produce 100% clean prerendered static HTML files with matching canonical tags and valid JSON-LD schemas.

---

## Success Criteria

- **SC-001**: Zero URLs in `sitemap.xml` return 301 redirects, 302 redirects, or 404s.
- **SC-002**: 100% of the 32 target pages have titles ≤ 58 characters (zero SERP truncation).
- **SC-003**: 100% of the 32 target pages have meta descriptions between 145 and 160 characters.
- **SC-004**: Zero cannibalization on high-value terms (الأربعين, الجناين, عتاقة, السخنة).
- **SC-005**: `npm run build` completes with 100% prerender success and 0 regressions.
