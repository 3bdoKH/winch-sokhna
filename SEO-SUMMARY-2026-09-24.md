# Site Work Summary — 2026-09-24
**Site:** https://www.winchelsokhna.com (winch-sokhna — React SPA, prerendered static build)
**Goal:** Lift the السويس location page from position ~65 into the top 10, then apply the same treatment to حي الأربعين, حي الجناين, and بور توفيق.

---

## 1. Initial diagnosis — why the السويس page sat at ~65

Single-page SEO audit of `/winch/ونش-انقاذ-السويس` (live HTML parsed head-to-foot) found:

| # | Finding | Detail |
|---|---------|--------|
| 1 | **Keyword dilution in H1** | `ونش انقاذ سيارات في السويس — الكورنيش والأربعين وفيصل` split one page across 4 entities that each own a dedicated page |
| 2 | **Title too long + diluted** | 65 chars (truncates in SERP), mentioned الكورنيش |
| 3 | **Meta too short + stuffed** | 114 chars (target 150–160), stuffed الكورنيش/ميدان الأربعين |
| 4 | **Duplicate FAQs** | Q1≈Q4 (phone number), Q2≈Q5 (arrival time) — thin-content signal; FAQPage schema earns no rich result since May 2026 anyway |
| 5 | **Template body copy** | Services/steps/prices identical across all areas except `areaName` swap — weak for a competitive city head term |
| 6 | **Cannibalization web** | Parent + ~10 child pages (`حي السويس`, `السويس الجديدة`, `الأربعين`, `فيصل`, `الكورنيش`…) competing for `السويس` queries |

Score card at audit time: On-Page 62 · Content 78 · Technical 81 · Schema 85 · Images 80.

---

## 2. السويس page — dedication fixes

**`src/pages/winchLocation/WinchLocationSEO.js`**
- `titleLandmarks['السويس']`: `الكورنيش والأربعين وفيصل` → `وصول 10 دقائق بخصم 50%`
- Title: `ونش انقاذ السويس 24 ساعة | خدمة سريعة داخل أحياء السويس والكورنيش` (65) → **`ونش انقاذ السويس 24 ساعة | خصم 50% ووصول 10 دقائق`** (49)
- H1: `ونش انقاذ سيارات في السويس — الكورنيش والأربعين وفيصل` → **`ونش انقاذ سيارات في السويس`** (entity-only; later generalized into the `dedicatedH1Areas` set — §6)
- Gallery image alts: dropped the landmark stuffing → `سطحة هيدروليكية تسحب … في السويس صورة N`

**`src/data/sokhnaContent.js` (السويس block)**
- `heroSubtitle`: removed `والكورنيش والأربعين وفيصل`
- `metaDescription`: 114 → **158 chars**, السويس-only, keeps phone + timing + services + discount
- FAQs: replaced the 2 intent-duplicate customs with unique ones (عتاقة/الجناين/القاهرة coverage; intra-city pricing logic) → 3 base + 2 unique, no overlap

---

## 3. Full-site structural audit (no-skips review)

Checked live against source: routing (`src/App.js` → `/winch/:location`), canonical generation (encoded, self-referencing, matches sitemap), www→HTTPS + trailing-slash handling (`public/.htaccess`), sitemap (live 2026-09-19: 6 core + 100 winch + ~66 articles, hub/district/road priority tiers correct, image NS present), `robots.txt`, prerender pipeline (`scripts/prerender.js` → 100 `build/winch/*` dirs), breadcrumbs vs `BreadcrumbList` schema, geo/schema blocks, image dimensions/CLS, `og:locale`/robots minors. Two findings mattered:

**P0 — sitemap listed a URL the server 301s.**
`/winch/ونش-انقاذ-حي-السويس` was in the sitemap **and** 301-redirected to `/winch/ونش-انقاذ-السويس` via `src/data/legacyRedirects.js:116-120` + `.htaccess:129-131`, while `areas.js` kept it as a separate page with identical coords and overlapping keywords. Google sees "Page with redirect" + split signals on exactly the السويس cluster.

**Decision:** keep both areas as separate pages (per owner). Applied the keep-both variant:
- `legacyRedirects.js`: deleted the 5 `حي-السويس → السويس` collapse entries (kept generic `سيارات-السويس`/`ونش-سيارات-السويس` → parent); added a comment guard against re-adding
- `areas.js`: removed `ونش انقاذ حي السويس` from the **parent's** keywords (child owns it now); gave حي-السويس distinct coords `29.9712,32.5550` (was identical `29.9668,32.5498`) — ⚠️ district-center estimate, replace with the exact point if available
- `.htaccess` is regenerated from source on every build, so the fix propagates automatically (verified post-build: **0 collapse rules**)

---

## 4. Supporting article #1 — السويس

**`/articles/suez-city-breakdown-what-to-do`** — "عربيتك عطلت جوه السويس؟ اتصرف صح في أول 5 دقايق"
Human field-guide style (concrete الأربعين-noon scene, 30–50 m triangle rule with reasoning, 4-point dispatcher script, real 300–600 pricing, roaming-winch scam warning, fix-on-site vs must-tow triage). No AI-slop markers, no inline styles. 5,611 chars, eligible, clean slug, existing local image. Shortest path to sidebar visibility: most-recent article site-wide.
**Links to the السويس page:** 2 contextual in-body + auto footer.

**Pipeline hardening (`scripts/fetch-articles-static.js`)** — required, found during this work:
- Added `localOnly` preservation: the build refetches articles from the live API on every run, which would have wiped hand-written articles. Flagged entries are re-attached with a fresh footer.
- Fixed footer-stacking bug: reprocessing a snapshot appended a second `api-related-services` footer to **all 244 articles** on every rebuild. Rebuilds are now idempotent (strip-then-append).

**Internal linking audit → fixes (`src/data/areas.js` nearby):**
Already linking: auto-footers on all 23 سويس-mentioning articles, homepage Keywords, ServiceAreasPreview, بور توفيق + الأربعين → parent. **Fixed missing:** الكورنيش, فيصل, عتاقة had zero link up to السويس → parent added first in each nearby (all targets verified resolvable).

---

## 5. Same treatment — حي الأربعين, حي الجناين, بور توفيق

### 5a. حي الأربعين (worst of the three)
- Title was **66 chars** with double pipes + dead region text → `ونش انقاذ حي الأربعين 24 ساعة | خصم 50% ووصول 10 دقائق` (54)
- H1 → entity-only. Meta → 151 chars. Wrote the missing custom content block (live copy was 100% template, incl. a `تعد حي الأربعين` grammar bug): souq/ميدان الأربعين dynamics, short-tow-to-district-workshops cost angle, workshop-tout scam warning, 2 unique FAQs.

### 5b. حي الجناين (template copy + orphaned from parent)
- Same title/H1 dedication (53-char title), custom rural-north copy (غرز protocol, قرية عامر/الهويس reference points, WhatsApp live-location instructions, long-tow-to-Suez pricing logic). Meta 151, 2 unique FAQs.
- **Fixed:** nearby had no parent link → `ونش-انقاذ-السويس` added first (inbound from قرية عامر/أبو سيال verified).

### 5c. بور توفيق (content already strong, head tags weren't)
- Title was 65 (truncates) stuffing الكورنيش → 52-char dedicated. H1 dropped `— الميناء والكورنيش` (port context stays in body). Meta ~120 → 159. FAQ dedup (replaced duplicate "رقم بور توفيق السريع" with a بوابة-الميناء question).
- Refactored the one-off السويس H1 special-case into **`dedicatedH1Areas = ['السويس', 'بور توفيق', 'حي الأربعين', 'حي الجناين']`**, used by both H1 and gallery alts. (Post-build cleanup: removed a leftover duplicate `بور توفيق` key in `titleLandmarks` — behavior-identical, warning-only.)

### 5d. Supporting articles #2–#4 (one per page)
| Slug | Title | Angle | In-body links |
|---|---|---|---|
| `arbain-district-suez-winch-guide` | عطلت في حي الأربعين؟… | workshop touts, short tow, market parking | 2 → حي الأربعين |
| `ganayen-district-suez-winch-guide` | غرزت في الجناين؟… | no-digging rule, addressing without addresses, night safety | 2 → حي الجناين |
| `port-taufiq-suez-winch-guide` | واقف عند بوابات الميناء؟… | gate numbers, truck lanes, photo-before-tow | 2 → بور توفيق |

Each ~2,700–3,200 chars, eligible, `localOnly`, existing local images, single footer (→ parent السويس), all in the 5 most-recent (sidebar-visible). Slop-marker scan clean.

---

## 6. Production build (ran 2026-09-24)

`npm run build` completed: API returned **256 articles → 248 saved, 70 sitemap-eligible** (was 66; +4 new), **sitemap 176 URLs**, **838 htaccess rules**, **prerender 176/176** ✅. `build/` = **30,649 files**.

Post-build verification (all passing):
- All 4 hand articles present + eligible + single footer (guard survived a real API refetch)
- All 4 dedicated titles in prerendered HTML; both new article pages prerendered
- 0 collapse rules in regenerated `.htaccess`; all 4 new slugs in sitemap
- 38-check suite on the 3 pages (titles/H1 set/alts/metas/nearby/custom blocks/articles) green

---

## 7. Changed files (git diff)

- `src/pages/winchLocation/WinchLocationSEO.js` — dedicated titles/H1/alts (+`dedicatedH1Areas`)
- `src/data/sokhnaContent.js` — السويس trim + حي الأربعين/حي الجناين blocks + بور توفيق meta/FAQ
- `src/data/areas.js` — keyword de-overlap, حي-السويس coords, parent links (الكورنيش/فيصل/عتاقة/حي الجناين)
- `src/data/legacyRedirects.js` — removed حي-السويس collapse
- `scripts/fetch-articles-static.js` — `localOnly` guard + idempotent footers
- `src/data/generated-articles.json` / `generated-articles-index.json` / `generated-related.json` — +4 articles (248 total)

---

## 8. Still to do (owner)

1. **Deploy** `build/` (in progress via FileZilla at handoff) — ensure `.htaccess` + `sitemap.xml` transfer; then spot-check the السويس title live
2. **GSC → Request Indexing** on 8 URLs: 4 location pages + 4 new articles
3. Confirm/replace the حي-السويس coords estimate (`29.9712,32.5550`)
4. Optional, recommended: footer hub links to السويس/السخنة/الجلالة/بور توفيق (hubs currently get no direct homepage authority); `og:locale ar_EG`; sidebar article image dimensions (CLS)
5. Ranking movement takes days–weeks post-indexing — track the `ونش انقاذ السويس` query (impressions/CTR/position) before judging top-10 entry
