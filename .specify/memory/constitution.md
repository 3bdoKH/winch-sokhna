# Winch-Sokhna SEO & Architecture Constitution

## Core Principles

### I. Single Entity Dedication (Zero Keyword Dilution & Cannibalization)
Every location landing page (`/winch/:location`) must own exactly ONE physical geographic entity.
- Titles, H1 tags, and meta descriptions must never dilute into sibling districts or parent cities.
- Duplicate pages targeting the same physical entity (e.g. `الأربعين` vs `حي الأربعين`, `الجناين` vs `حي الجناين`, `عتاقة` vs `حي عتاقة`) must be eliminated via 301 canonical consolidation or strict entity separation.
- Title lengths must be strictly between 45 and 58 characters to guarantee zero truncation in Google SERP on mobile and desktop.

### II. Technical Sitemap-Redirect Integrity (Zero 301s in Sitemap)
A URL listed in `sitemap.xml` must NEVER respond with a 301 redirect, 302 redirect, or 404.
- Every URL in `sitemap.xml` must serve a 200 OK prerendered static document with matching canonical URL.
- If an entity is redirected in `legacyRedirects.js` or `.htaccess`, it MUST have `sitemapExclude: true` or be removed from `areas.js`.
- Prerendering (`scripts/prerender.js`) must generate clean, valid HTML matching the canonical URL.

### III. Authentic E-E-A-T & Honest Real-World Constraints
- Arrival times, emergency protocols, and price ranges must accurately reflect reality.
- Remote desert/mountain/coastal stretches (e.g., الزعفرانة, طريق الجلالة, عيون موسى, أبو رديس, طابا) must declare honest arrival times (e.g. 20–45 minutes) instead of false 10-minute urban promises.
- Custom content must describe real landmarks, roads, traffic hazards, towing truck types (flatbed hydraulic), and local scam warnings (e.g. workshop touts, roaming winches).

### IV. Anti-Slop Content Standards
- No generic, repetitive filler phrases or AI slop ("تعتبر من أهم المحاور الحيوية", "نحن الأفضل بلا منازع").
- Content must use concrete, direct Arabic field-guide language with actionable emergency steps, local street names, and clear pricing logic.

### V. Bidirectional Internal Linking & Topic Clusters
- Every location hub page must be supported by contextual inbound links from relevant blog articles and adjacent areas (`nearby`).
- Location articles in `/articles/:slug` must maintain a single, clean footer linking up to the parent hub or target area, with idempotent build scripts that prevent footer stacking.

## Governance

- All SEO changes must pass prerender validation (`npm run build`).
- Any new area added must have distinct geographic coordinates, clean slug, honest response time, and verified nearby relations.

**Version**: 1.0.0 | **Ratified**: 2026-09-26
