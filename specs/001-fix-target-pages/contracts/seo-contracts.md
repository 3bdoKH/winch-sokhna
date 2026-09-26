# SEO Interface & Build Contracts

## 1. URL Resolution & Redirect Contract

```text
Request: GET /winch/:slug
1. Decode URI component.
2. Check LEGACY_SLUG_REDIRECTS[slug].
   - IF mapped: Return 301 Permanent Redirect to /winch/:canonicalSlug.
3. Lookup slug in areas.js (exact match OR findAreaByFuzzySlug).
   - IF not found: Return 404 Not Found Page (NoIndex).
   - IF found:
     - Check if area.sitemapExclude is true:
       - Served with self-referencing canonical or canonical pointing to parent hub.
     - Serve 200 OK HTML with:
       * <title> (Length: 45–58 characters)
       * <meta name="description"> (Length: 145–160 characters)
       * <h1> (Pure entity without region suffix)
       * <link rel="canonical" href="https://www.winchelsokhna.com/winch/:canonicalSlug">
       * JSON-LD @graph containing EmergencyService, Organization, FAQPage, BreadcrumbList
```

## 2. Sitemap Invariant Contract

```text
Invariant:
∀ url ∈ sitemap.xml:
  HTTP_STATUS(url) == 200
  REDIRECT_TARGET(url) == null
  CANONICAL_URL(url) == url
```

Any build where `sitemap.xml` contains a URL that triggers an Apache `RewriteRule [R=301]` or client-side redirect is considered **FAILED**.

## 3. Prerender Output Contract

```text
Directory: /build/winch/:encodedSlug/index.html
Pre-condition:
  - area.sitemapExclude != true
Post-condition:
  - index.html contains fully rendered SSR markup including h1, p, structured JSON-LD schemas.
  - File size > 25,000 bytes.
```
