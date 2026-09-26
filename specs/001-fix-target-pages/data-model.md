# Phase 1 Data Model: Location Entities, SEO Metadata & Articles

## 1. Area Entity (`src/data/areas.js`)

Each location object represents either an active landing page or an explicitly excluded/redirected legacy alias.

```typescript
interface Area {
  slug: string;              // Unique Arabic URL slug, e.g. "ونش-انقاذ-ابو-زنيمة"
  name: string;              // Primary Arabic entity display name, e.g. "أبو زنيمة"
  keywords: string[];        // Targeted exact-match Arabic search queries
  lat: number;               // Precise decimal latitude
  lng: number;               // Precise decimal longitude
  region: string;            // Geographic category / governorate
  heroImage: string;         // WebP relative image path, e.g. "images/15.webp"
  nearby: string[];          // Array of target slugs for internal cross-linking
  sitemapExclude?: boolean;  // When true, sitemap and prerender skip this entry
}
```

### Validation Rules
- `slug` must be non-empty and hyphen-separated without special symbols.
- `lat` and `lng` must match physical geography.
- `sitemapExclude` MUST be set to `true` if `LEGACY_SLUG_REDIRECTS` redirects this slug to another URL.
- `nearby` must only reference slugs that exist in `areas.js` and resolve to 200 OK pages.

---

## 2. Bespoke Content Entity (`src/data/sokhnaContent.js`)

Provides human field-guide content and custom FAQs, overriding generic algorithmic templates.

```typescript
interface BespokeAreaContent {
  metaDescription: string;   // 145–158 characters, strictly enforced
  heroSubtitle: string;      // Concise under-H1 hook with direct phone number
  emergencyAdvice: string;   // Contextual street/checkpoint safety procedures
  commonCauses: Array<{      // 3 realistic breakdown causes specific to geography
    cause: string;
    tip: string;
  }>;
  customFaqs?: Array<{       // 2 unique, non-duplicative FAQs answering local questions
    q: string;
    a: string;
  }>;
}
```

---

## 3. Article Entity (`src/data/generated-articles.json`)

Supports local authority clusters.

```typescript
interface Article {
  id: string | number;
  slug: string;              // Clean Latin/Arabic slug, e.g. "ataka-adabiya-industrial-ports-towing-guide"
  title: string;             // Click-worthy, human editorial title
  excerpt: string;           // 120-160 char summary
  content: string;           // HTML content with contextual links to /winch/:slug
  date: string;              // ISO YYYY-MM-DD
  updatedAt: string;         // ISO YYYY-MM-DD
  image: string;             // Local WebP path
  category: string;          // e.g. "سلامة الطرق" or "أدلة السحب"
  sitemapEligible: boolean;  // true
  localOnly: boolean;        // true (protects against API re-fetch overwrite)
}
```
