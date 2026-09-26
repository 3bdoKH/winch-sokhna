/**
 * fetch-articles-static.js - winch-sokhna
 * ------------------------------------------------------------------
 * Build-time step: fetch articles from backend API, bake them into
 * local static JSON + self-hosted images, so that:
 *   1. Articles render synchronously from local files (0ms delay, no loader).
 *   2. generate-sitemap.js includes all relevant article URLs.
 *   3. prerender.js snapshots them into static HTML (build/articles/:slug/index.html).
 */

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const crypto = require('crypto');

const API_BASE = process.env.REACT_APP_API_URL || 'https://winchenqaz.com/api';
const API_URL = `${API_BASE.replace(/\/$/, '')}/articles`;
const DOWNLOAD_TIMEOUT_MS = 20000;

const OUT_JSON = path.join(__dirname, '../src/data/generated-articles.json');
const OUT_INDEX = path.join(__dirname, '../src/data/generated-articles-index.json');
const OUT_RELATED = path.join(__dirname, '../src/data/generated-related.json');
const IMG_DIR = path.join(__dirname, '../public/images/articles');
const HTACCESS_PATH = path.join(__dirname, '../public/.htaccess');

// GONE slugs from .htaccess
let GONE_SLUGS = new Set();
try {
  if (fs.existsSync(HTACCESS_PATH)) {
    const ht = fs.readFileSync(HTACCESS_PATH, 'utf-8');
    const rules = [...ht.matchAll(/\^articles\/([^\/\s?]+)\/\?\$\s+-\s+\[R=410,L\]/g)].map((m) => m[1].toLowerCase());
    GONE_SLUGS = new Set(rules);
  }
} catch (e) {
  console.warn(`[fetch-articles-static] could not parse .htaccess GONE set: ${e.message}`);
}
const isGoneSlug = (slug) => GONE_SLUGS.has(String(slug || '').toLowerCase());

function unwrapGoneLinks(html) {
  const $ = cheerio.load(String(html || ''), { decodeEntities: false });
  let n = 0;
  $('a[href^="/articles/"]').each((_, el) => {
    const href = $(el).attr('href');
    if (!href) return;
    const match = href.match(/\/articles\/([^"\/?]+)\/?/);
    if (!match) return;
    const slug = match[1];
    if (isGoneSlug(slug)) {
      $(el).replaceWith($(el).text());
      n += 1;
    }
  });
  if (n) sanitizeStats.goneLinks += n;
  return $.html();
}

// Site identity & phone numbers for winch-sokhna
const SITE_PHONES = { primary: '01143433875', secondary: '01097950005' };
const FOREIGN_PHONES = ['01055557235', '01553877630', '01063186992', '01070722736'];

const CLAIM_FIXES = [
  [/100\+ ونش/g, '50+ ونش'],
  [/أكثر من 10,000 عميل/g, 'آلاف العملاء الراضين'],
  [/10,000 عميل/g, 'آلاف العملاء'],
  [/أكثر من 500 شركة/g, 'العديد من الشركات'],
  [/500 شركة/g, 'الشركات'],
  [/15\s*عاماً/g, '20 عامًا'],
  [/15\s*عامًا/g, '20 عامًا'],
  [/15\s*عاما/g, '20 عامًا'],
  [/15\s*عام\b/g, '20 عامًا'],
  [/25 موقع استراتيجي/g, 'نقاط تمركز استراتيجية'],
  [/50\+ موقع/g, 'نقاط تمركز'],
];

// Load geo filter config
const GEO_CONFIG = (() => {
  try {
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'geo-filter-config.json'), 'utf-8'));
  } catch (e) {
    console.warn(`[fetch-articles-static] Could not load geo-filter-config.json: ${e.message}`);
    return { corridorTerms: [], ambiguousTerms: [], nonCorridorTerms: [] };
  }
})();

const sanitizeStats = { phones: 0, artifacts: 0, claims: 0, styles: 0, titles: 0, excerptFix: 0, goneLinks: 0, goneDropped: 0, brands: 0 };

function sanitizeHtml(html) {
  let s = String(html || '');
  const localStats = { phones: 0, artifacts: 0, claims: 0, styles: 0, brands: 0 };
  FOREIGN_PHONES.forEach((num) => {
    const replacement = SITE_PHONES.primary;
    const hits = (s.match(new RegExp(num, 'g')) || []).length;
    if (hits) { s = s.split(num).join(replacement); localStats.phones += hits; }
  });
  // Replace competitor / foreign branding
  const brandBefore = s.length;
  s = s.replace(/WinchEnqaz\.com/gi, 'ونش انقاذ السخنة')
       .replace(/winchenqaz/gi, 'ونش انقاذ السخنة')
       .replace(/ونش انقاذ السويس/g, 'ونش انقاذ السخنة والسويس');
  if (s.length !== brandBefore) localStats.brands += 1;

  // RAG/citation leakage
  const ragBefore = s.length;
  s = s
    .replace(/:contentReference\[oaicite:\d+\]/g, '')
    .replace(/contentReference\[oaicite:\d+\]/g, '')
    .replace(/\[oaicite:\d+\]/g, '')
    .replace(/:contentReference[^\s<]*/g, '');
  if (s.length !== ragBefore) localStats.artifacts += 1;

  CLAIM_FIXES.forEach(([re, to]) => {
    const hits = (s.match(re) || []).length;
    if (hits) { s = s.replace(re, to); localStats.claims += hits; }
  });

  const styleHits = (s.match(/\sstyle="[^"]*"/g) || []).length;
  if (styleHits) { s = s.replace(/\sstyle="[^"]*"/g, ''); localStats.styles += styleHits; }
  return { html: s, stats: localStats };
}

function cleanTitle(raw) {
  const { html: t } = sanitizeHtml(String(raw || '').trim());
  let title = t;
  title = title.replace(/01[0-9]{9}/g, '');
  title = title.replace(/\s+/g, ' ').replace(/\s*\|\s*/g, ' | ').trim();
  title = title.replace(/^(\|\s*)+/, '').replace(/(\s*\|)+$/, '').trim();
  title = title.replace(/(\|\s*){2,}/g, '| ');
  if (title.length > 70) {
    title = title.slice(0, 67).trim() + '…';
  }
  return title;
}

function cleanExcerpt(raw, slug, contentPlain) {
  const { html: e } = sanitizeHtml(String(raw || '').trim());
  let excerpt = e;
  if (!excerpt || excerpt === slug || [...excerpt].length < 40) {
    excerpt = contentPlain.slice(0, 160).trim();
    sanitizeStats.excerptFix += 1;
  }
  if (excerpt.length > 160) {
    excerpt = excerpt.slice(0, 157).trim() + '…';
  }
  return excerpt;
}

const CORRIDOR_TERMS = GEO_CONFIG.corridorTerms || [];
const AMBIGUOUS_TERMS = GEO_CONFIG.ambiguousTerms || [];
const NON_CORRIDOR_TERMS = GEO_CONFIG.nonCorridorTerms || [];

const hasAny = (text, terms) => terms.some((t) => text.includes(t));
const titleExcerpt = (article) => `${article.title || ''}\n${article.excerpt || ''}`;

function isGeoEligible(article) {
  const text = titleExcerpt(article);
  if (hasAny(text, CORRIDOR_TERMS)) return true;
  if (hasAny(text, NON_CORRIDOR_TERMS)) return false;
  if (hasAny(text, AMBIGUOUS_TERMS)) return text.includes('السويس') || text.includes('السخنة');
  return true; // generic guide (batteries, tires, overheating, fuel, safe towing)
}

const AREA_LINKS = {
  default: [
    ['/winch/ونش-انقاذ-العين-السخنة', 'ونش انقاذ العين السخنة – تغطية القرى والمنتجعات'],
    ['/winch/ونش-انقاذ-الجلالة', 'ونش طريق الجلالة – مجهز للمرتفعات والمنحدرات'],
    ['/winch/ونش-انقاذ-الزعفرانة', 'ونش طريق الزعفرانة – استجابة سريعة على الطريق الساحلي'],
    ['/winch/ونش-انقاذ-السويس', 'ونش انقاذ السويس – داخل المدينة والكورنيش']
  ],
};

function relatedLinksFor(article) {
  const text = `${article.title || ''} ${article.excerpt || ''}`;
  const linkMap = new Map();
  if (/سخنة|بورتو|تلال|دوم/i.test(text)) linkMap.set('/winch/ونش-انقاذ-العين-السخنة', 'ونش انقاذ العين السخنة – وصول 10-15 دقيقة');
  if (/جلالة/i.test(text)) linkMap.set('/winch/ونش-انقاذ-الجلالة', 'ونش طريق الجلالة – مجهز للمنحدرات');
  if (/زعفرانة|غارب|طواحين/i.test(text)) linkMap.set('/winch/ونش-انقاذ-الزعفرانة', 'ونش الزعفرانة – دعم سريع على الطريق الساحلي');
  if (/سويس|أدبية|عتاقة|أربعين|توفيق/i.test(text)) linkMap.set('/winch/ونش-انقاذ-السويس', 'ونش انقاذ السويس – وصول 10-15 دقيقة');
  if (/سيناء|سدر|زنيمة|رديس|موسى/i.test(text)) linkMap.set('/winch/ونش-انقاذ-راس-سدر', 'ونش جنوب سيناء ورأس سدر – وصول سريع 24 ساعة');

  for (const [href, label] of AREA_LINKS.default) {
    if (!linkMap.has(href)) linkMap.set(href, label);
  }
  return Array.from(linkMap.entries()).slice(0, 3);
}

function relatedFooter(article) {
  const items = relatedLinksFor(article)
    .map(([href, label]) => `<li><a href="${href}">${label}</a></li>`)
    .join('\n');
  return `\n<div class="api-related-services"><h3>خدمات ونش إنقاذ ذات صلة</h3><ul>\n${items}\n<li><a href="/articles">جميع مقالات ونقاط السلامة</a></li>\n</ul>\n<p>للطوارئ على مدار الساعة اتصل <a href="tel:${SITE_PHONES.primary}">${SITE_PHONES.primary}</a> أو <a href="tel:${SITE_PHONES.secondary}">${SITE_PHONES.secondary}</a></p></div>`;
}

const GUIDE_SLUGS = new Set([
  'sokhna-road-breakdown-steps',
  'sokhna-village-gate-entry-guide',
  'galala-mountain-road-safety',
  'zaafarana-wind-road-guide',
  'cairo-suez-road-breakdown-guide',
  'quick-action-guide-highway-breakdown',
  'how-to-choose-safe-tow-truck',
  'engine-overheating-mountain-descent-tips',
  'safe-car-battery-jump-start',
  'coastal-desert-tire-repair-guide',
  'flatbed-vs-wheel-lift-which-winch',
  'change-car-battery-yourself',
  'tire-replacement-signs-guide',
  'engine-overheat-emergency-steps',
  'choose-trusted-winch-no-scam',
  'car-stuck-in-sand-recovery',
  'oil-light-on-while-driving',
  'out-of-fuel-desert-road-guide',
  'ataka-adabiya-industrial-ports-towing-guide',
  'galala-mountain-wadi-hagoul-highway-safety-towing',
  'south-sinai-coastal-highway-towing-guide'
]);

const SLUG_BLOCKLIST = new Set([
  '-24-',
  'best-fastest-car-recove',
  'omplete-guide-car-recovery',
  'est-fastest-car-rescue-services',
  'verything-about-best-car-rescue-services',
  'tawing-service-third-settlement',
  'tahgom-alkhames-towing-service',
  'car-rescue-winch-egypt-',
  'winch-rescue-reh'
]);

const DOORWAY_PREFIXES = ['winch-cars-', 'winch-enqaz-', 'winch-rescue-', 'car-rescue-'];
const INCLUDE_DOORWAY = process.env.INCLUDE_DOORWAY_IN_SITEMAP === '1';

const isBlockedSlug = (slug) => {
  if (!slug || typeof slug !== 'string') return true;
  if (GUIDE_SLUGS.has(slug)) return false;
  if (/[|:*?"<> %]/.test(slug)) return true;
  const lower = slug.toLowerCase();
  if (SLUG_BLOCKLIST.has(slug) || SLUG_BLOCKLIST.has(lower)) return true;
  return false;
};

const isDoorwaySlug = (slug) =>
  DOORWAY_PREFIXES.some((p) => slug.toLowerCase().startsWith(p));

const isSitemapEligible = (article) => {
  if (isBlockedSlug(article.slug)) return false;
  if (GUIDE_SLUGS.has(article.slug)) return true;
  if (!article.title || !article.content) return false;
  if (String(article.content).length < 800) return false;
  if (!INCLUDE_DOORWAY && isDoorwaySlug(article.slug)) return false;
  if (!isGeoEligible(article)) return false;
  return true;
};

const extFromUrl = (url) => {
  const m = /\.([a-zA-Z0-9]+)(?:[?#]|$)/.exec(url || '');
  if (!m) return null;
  const ext = m[1].toLowerCase();
  return ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext) ? ext : null;
};

const remoteImageUrl = (image) => {
  if (!image || typeof image !== 'string') return null;
  if (image.startsWith('http')) return image;
  if (image.startsWith('/')) return `https://winchenqaz.com${image}`;
  return `https://winchenqaz.com/${image}`;
};

async function downloadImage(url, destPath, timeoutMs = DOWNLOAD_TIMEOUT_MS) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 1024) throw new Error('file too small, likely error page');
    fs.writeFileSync(destPath, buf);
    return true;
  } catch (e) {
    clearTimeout(timer);
    throw e;
  }
}

async function run() {
  console.log(`[fetch-articles-static] GET ${API_URL}`);
  let live = null;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000);
    const res = await fetch(API_URL, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      live = await res.json();
    }
  } catch (err) {
    console.log(`[fetch-articles-static] Remote API fetch failed/timeout: ${err.message}. Trying local fallback snapshot.`);
  }

  // If remote API is offline, use local cached snapshot from winchelsuez or previous OUT_JSON
  if (!Array.isArray(live) || live.length === 0) {
    const winchelSuezSnapshot = 'd:/work/winchelsuez/src/data/generated-articles.json';
    if (fs.existsSync(winchelSuezSnapshot)) {
      console.log(`[fetch-articles-static] Using fallback articles snapshot from ${winchelSuezSnapshot}`);
      live = JSON.parse(fs.readFileSync(winchelSuezSnapshot, 'utf-8'));
    } else if (fs.existsSync(OUT_JSON)) {
      console.log(`[fetch-articles-static] Using previous snapshot from ${OUT_JSON}`);
      live = JSON.parse(fs.readFileSync(OUT_JSON, 'utf-8'));
    }
  }

  if (!Array.isArray(live) || live.length === 0) {
    console.error('[fetch-articles-static] Could not obtain articles data from API or fallback.');
    if (!fs.existsSync(OUT_JSON)) fs.writeFileSync(OUT_JSON, '[]');
    if (!fs.existsSync(OUT_INDEX)) fs.writeFileSync(OUT_INDEX, '[]');
    if (!fs.existsSync(OUT_RELATED)) fs.writeFileSync(OUT_RELATED, '{}');
    return;
  }

  console.log(`[fetch-articles-static] processing ${live.length} articles...`);
  if (!fs.existsSync(IMG_DIR)) fs.mkdirSync(IMG_DIR, { recursive: true });

  const seen = new Set();
  const out = [];
  let downloaded = 0;
  let reused = 0;
  let remoteFallback = 0;

  for (const a of live) {
    const slug = String(a.slug || '').trim();
    if (isBlockedSlug(slug) || seen.has(slug)) continue;
    if (isGoneSlug(slug)) { sanitizeStats.goneDropped += 1; continue; }
    seen.add(slug);

    const remote = remoteImageUrl(a.image || a.remoteImage);
    let localImage = null;

    // Check if we can copy image from winchelsuez public/images/articles if it exists locally!
    const winchelSuezImg = path.join('d:/work/winchelsuez/public/images/articles', `${slug}.jpg`);
    const winchelSuezImgWebp = path.join('d:/work/winchelsuez/public/images/articles', `${slug}.webp`);

    if (remote) {
      const ext = extFromUrl(remote) || 'jpg';
      const dest = path.join(IMG_DIR, `${slug}.${ext}`);
      if (fs.existsSync(dest) && fs.statSync(dest).size > 1024) {
        reused += 1;
        localImage = `/images/articles/${slug}.${ext}`;
      } else if (fs.existsSync(winchelSuezImgWebp)) {
        fs.copyFileSync(winchelSuezImgWebp, path.join(IMG_DIR, `${slug}.webp`));
        reused += 1;
        localImage = `/images/articles/${slug}.webp`;
      } else if (fs.existsSync(winchelSuezImg)) {
        fs.copyFileSync(winchelSuezImg, path.join(IMG_DIR, `${slug}.jpg`));
        reused += 1;
        localImage = `/images/articles/${slug}.jpg`;
      } else {
        try {
          await downloadImage(remote, dest, 5000);
          downloaded += 1;
          localImage = `/images/articles/${slug}.${ext}`;
        } catch (e) {
          remoteFallback += 1;
          localImage = remote;
        }
      }
    }

    const rawTitle = String(a.title || '').trim();
    const title = cleanTitle(rawTitle);
    if (title !== rawTitle) sanitizeStats.titles += 1;
    const { html: bodySanitized, stats: bodyStats } = sanitizeHtml(String(a.content || ''));
    // Strip any previously appended related footer so rebuilds stay idempotent
    // (reprocessing a snapshot must not stack duplicate footers).
    const bodyNoFooter = bodySanitized.replace(/\n?<div class="api-related-services">[\s\S]*$/, '').trim();
    const bodyHtml = unwrapGoneLinks(bodyNoFooter);
    Object.keys(bodyStats).forEach((k) => { sanitizeStats[k] += bodyStats[k]; });
    const bodyPlain = bodyHtml.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const excerpt = cleanExcerpt(String(a.excerpt || '').trim(), slug, bodyPlain);

    const tags = Array.isArray(a.tags)
      ? a.tags.map((t) => {
          const { html: tagHtml, stats: tagStats } = sanitizeHtml(String(t));
          Object.keys(tagStats).forEach((k) => { sanitizeStats[k] += tagStats[k]; });
          return tagHtml;
        })
      : [];

    const baseArticle = {
      id: a.id ?? null,
      slug,
      title,
      excerpt,
      content: bodyHtml,
      category: String(a.category || 'دليل إرشادي'),
      tags,
      image: localImage || remote || '/images/10.webp',
      remoteImage: remote,
      date: a.date || a.created_at || '2026-03-01',
      updatedAt: a.updated_at || a.updatedAt || a.date || '2026-03-15',
      readTime: a.read_time || a.readTime || '5 دقائق',
      views: a.views ?? null,
      author: 'فريق ونش انقاذ السخنة',
      featured: !!a.featured,
    };
    baseArticle.content = bodyHtml + relatedFooter(baseArticle);
    out.push(baseArticle);
  }

  // Preserve locally-authored articles (localOnly:true) across rebuilds.
  // If the remote API / fallback snapshot does not include them, re-attach
  // them here with a fresh related footer (stripping any stale one first
  // so footers never stack up on repeated builds).
  try {
    if (fs.existsSync(OUT_JSON)) {
      const prev = JSON.parse(fs.readFileSync(OUT_JSON, 'utf-8'));
      for (const p of (Array.isArray(prev) ? prev : [])) {
        if (p && p.localOnly === true && p.slug && !seen.has(p.slug)) {
          seen.add(p.slug);
          const stripped = String(p.content || '').replace(/\n?<div class="api-related-services">[\s\S]*$/, '').trim();
          const merged = { ...p, content: stripped };
          merged.content = stripped + relatedFooter(merged);
          out.push(merged);
        }
      }
    }
  } catch (e) {
    console.warn(`[fetch-articles-static] Could not preserve local articles: ${e.message}`);
  }

  const withFlags = out.map((a) => ({ ...a, sitemapEligible: isSitemapEligible(a) }));
  withFlags.sort((x, y) => String(y.updatedAt || y.date || '').localeCompare(String(x.updatedAt || x.date || '')));

  fs.writeFileSync(OUT_JSON, JSON.stringify(withFlags, null, 1));

  const index = withFlags.map(({ content, ...rest }) => rest);
  fs.writeFileSync(OUT_INDEX, JSON.stringify(index, null, 1));

  const KEEP_AREAS = [
    ['العين السخنة', ['السخنة', 'سخنة', 'بورتو']],
    ['الجلالة', ['الجلالة', 'جلالة']],
    ['الزعفرانة', ['الزعفرانة', 'زعفرانة', 'طواحين']],
    ['السويس', ['السويس', 'سويس', 'أربعين', 'فيصل', 'توفيق']],
    ['طريق السخنة', ['طريق السخنة']],
  ];

  const related = {};
  KEEP_AREAS.forEach(([area, terms]) => {
    const hits = withFlags
      .filter((a) => {
        if (!a.sitemapEligible) return false;
        const te = `${a.title || ''}\n${a.excerpt || ''}`;
        return terms.some((t) => te.includes(t));
      })
      .map((a) => a.slug)
      .slice(0, 6);
    if (hits.length) related[area] = hits;
  });
  fs.writeFileSync(OUT_RELATED, JSON.stringify(related, null, 1));

  const eligible = withFlags.filter((a) => a.sitemapEligible).length;
  const doorway = withFlags.filter((a) => isDoorwaySlug(a.slug)).length;
  const geoExcluded = withFlags.filter((a) => !GUIDE_SLUGS.has(a.slug) && !isDoorwaySlug(a.slug) && !isBlockedSlug(a.slug) && !isGeoEligible(a)).length;

  console.log(`[fetch-articles-static] saved ${withFlags.length} articles -> ${path.relative(process.cwd(), OUT_JSON)}`);
  console.log(`[fetch-articles-static] sitemap-eligible: ${eligible} (doorway: ${doorway}, geo-excluded: ${geoExcluded})`);
  console.log(`[fetch-articles-static] images: ${downloaded} downloaded, ${reused} reused, ${remoteFallback} remote fallback`);
}

run().catch((err) => {
  console.error('[fetch-articles-static] Error:', err);
  process.exit(1);
});
