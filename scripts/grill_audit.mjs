import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';
import { areas } from '../src/data/areas.js';
import { customAreaContent, areaAliases } from '../src/data/sokhnaContent.js';
import { getAreaCustomData } from '../src/data/areaCustomContent.js';
import { LEGACY_SLUG_REDIRECTS } from '../src/data/legacyRedirects.js';

const targetNames = [
  'ونش انقاذ السويس', 'ونش انقاذ السخنه', 'السويس', 'طريق السويس',
  'جمرك السويس', 'ميناء السويس', 'السخنه', 'طريق السخنه',
  'العين السخنه', 'بورتو السخنه', 'الاربعين', 'الجناين',
  'الزعفرانه', 'عيون موسي', 'ابو رديس', 'وادي حجول',
  'ابو زنيمه', 'چنيفه', 'الادبيه', 'علاقه',
  'الفرز', 'الملاحه', 'بورتوفيق', 'الهويس',
  'اميجو العين السخنه', 'الجلاله', 'طريق الجلاله', 'عجرود',
  'راس سدر', 'محور ٣٠ يوليو', 'العريش', 'شرم الشيخ', 'طابا'
];

console.log('================================================================');
console.log('🔥 GRILLING IMPLEMENTATION: DEEP SYSTEM-WIDE FORENSIC AUDIT 🔥');
console.log('================================================================\n');

const violations = [];

import { normalizeArabic } from '../src/utils/slugify.js';

// 1. Check every target in user prompt
for (const rawName of targetNames) {
  const normName = normalizeArabic(rawName);
  console.log(`\n🔍 Checking Target: "${rawName}" (norm: "${normName}")`);

  // Check alias or legacy redirect
  const redirectTarget = LEGACY_SLUG_REDIRECTS[rawName] || LEGACY_SLUG_REDIRECTS[`ونش-انقاذ-${rawName.replace(/\s+/g, '-')}`];

  // Find area using normalized comparisons
  const matchedAreas = areas.filter(a => {
    const aNorm = normalizeArabic(a.name);
    const aSlugNorm = normalizeArabic(a.slug);
    const targetSlugNorm = normalizeArabic(`ونش-انقاذ-${rawName.replace(/\s+/g, '-')}`);
    
    return aNorm === normName ||
      aSlugNorm === targetSlugNorm ||
      (a.keywords && a.keywords.some(k => normalizeArabic(k) === normName)) ||
      (normName.includes('السويس') && a.slug === 'ونش-انقاذ-السويس' && normName === 'السويس') ||
      (normName.includes('السخنه') && a.slug === 'ونش-انقاذ-العين-السخنة' && (normName === 'السخنه' || normName === 'العين السخنه' || normName === 'ونش انقاذ السخنه')) ||
      (normName.includes('علاقه') && a.slug === 'ونش-انقاذ-عتاقة') ||
      (normName.includes('چنيفه') && a.slug === 'ونش-انقاذ-جنيفة') ||
      (normName.includes('ابو زنيمه') && a.slug === 'ونش-انقاذ-ابو-زنيمة') ||
      (normName.includes('ابو رديس') && a.slug === 'ونش-انقاذ-ابورديس') ||
      (normName.includes('٣٠ يوليو') && a.slug === 'ونش-انقاذ-محور-30-يوليو');
  });

  if (matchedAreas.length === 0) {
    violations.push({
      target: rawName,
      type: 'MISSING_AREA',
      severity: 'CRITICAL',
      details: `Target "${rawName}" matched 0 areas in src/data/areas.js!`
    });
    console.log(`  ❌ MISSING AREA IN areas.js!`);
    continue;
  }

  for (const area of matchedAreas) {
    console.log(`  👉 Area: "${area.name}" (slug: ${area.slug}) | sitemapExclude: ${!!area.sitemapExclude}`);

    // Check custom content mapping
    const customData = getAreaCustomData(area.name, area.region);
    
    // Check if metaDescription mentions the WRONG city/area
    if (customData.metaDescription) {
      if (area.name === 'العريش' && customData.metaDescription.includes('السويس')) {
        violations.push({
          target: area.name,
          slug: area.slug,
          type: 'WRONG_GEO_IN_META',
          severity: 'HIGH',
          details: `العريش meta description mentions "السويس"! (${customData.metaDescription})`
        });
      }
      if (area.name === 'ابورديس' && customData.metaDescription.includes('راس سدر')) {
        violations.push({
          target: area.name,
          slug: area.slug,
          type: 'WRONG_GEO_IN_META',
          severity: 'MEDIUM',
          details: `ابورديس meta description mentions "راس سدر"! (${customData.metaDescription})`
        });
      }
    }

    // Check intro content
    if (customData.intro) {
      if (area.name === 'العريش' && customData.intro.includes('السويس')) {
        violations.push({
          target: area.name,
          slug: area.slug,
          type: 'WRONG_GEO_IN_INTRO',
          severity: 'HIGH',
          details: `العريش intro content mentions "السويس"! (${customData.intro.substring(0, 100)}...)`
        });
      }
    }

    // Check build HTML file
    if (!area.sitemapExclude) {
      const buildPath = path.join('./build/winch', area.slug, 'index.html');
      if (!fs.existsSync(buildPath)) {
        violations.push({
          target: area.name,
          slug: area.slug,
          type: 'MISSING_BUILD_HTML',
          severity: 'CRITICAL',
          details: `Build HTML file does not exist at: ${buildPath}`
        });
        console.log(`    ❌ Missing HTML: ${buildPath}`);
      } else {
        const html = fs.readFileSync(buildPath, 'utf8');
        const $ = cheerio.load(html);

        const title = $('title').text().trim();
        const h1 = $('h1').first().text().trim();
        const metaDesc = $('meta[name="description"]').attr('content') || '';
        const canonical = $('link[rel="canonical"]').attr('href') || '';
        
        // Canonical check
        const expectedCanonical = `https://www.winchelsokhna.com/winch/${encodeURIComponent(area.slug)}`;
        if (canonical !== expectedCanonical && canonical !== `https://www.winchelsokhna.com/winch/${area.slug}`) {
          violations.push({
            target: area.name,
            slug: area.slug,
            type: 'CANONICAL_MISMATCH',
            severity: 'HIGH',
            details: `Expected ${expectedCanonical}, got ${canonical}`
          });
        }

        // Title length check
        if (title.length > 58) {
          violations.push({
            target: area.name,
            slug: area.slug,
            type: 'TITLE_TOO_LONG',
            severity: 'MEDIUM',
            details: `Title is ${title.length} chars (>58): "${title}"`
          });
        }

        // Meta length check
        if (metaDesc.length < 130 || metaDesc.length > 165) {
          violations.push({
            target: area.name,
            slug: area.slug,
            type: 'META_LENGTH_ANOMALY',
            severity: 'LOW',
            details: `Meta description is ${metaDesc.length} chars: "${metaDesc}"`
          });
        }

        // JSON-LD check
        const jsonLdScripts = $('script[type="application/ld+json"]').get();
        if (jsonLdScripts.length === 0) {
          violations.push({
            target: area.name,
            slug: area.slug,
            type: 'MISSING_JSON_LD',
            severity: 'HIGH',
            details: `No JSON-LD schema found in ${buildPath}`
          });
        } else {
          for (const s of jsonLdScripts) {
            try {
              const parsed = JSON.parse($(s).html());
              // Validate schema properties
              if (parsed['@type'] === 'EmergencyService' || parsed['@type'] === 'AutoRepair') {
                if (!parsed.telephone) {
                  violations.push({
                    target: area.name,
                    slug: area.slug,
                    type: 'SCHEMA_MISSING_FIELD',
                    severity: 'MEDIUM',
                    details: 'EmergencyService schema missing telephone'
                  });
                }
              }
            } catch (err) {
              violations.push({
                target: area.name,
                slug: area.slug,
                type: 'INVALID_JSON_LD',
                severity: 'CRITICAL',
                details: `JSON-LD parse error: ${err.message}`
              });
            }
          }
        }
      }
    }
  }
}

// 2. Check all articles internal links
console.log('\n🔍 Checking Articles Internal Links Integrity...');
const articles = JSON.parse(fs.readFileSync('./src/data/generated-articles.json', 'utf8'));
const allAreaSlugs = new Set(areas.map(a => a.slug));

for (const art of articles.slice(0, 10)) {
  const content = art.content || '';
  const linkMatches = [...content.matchAll(/href=["']\/winch\/([^"']+)["']/g)];
  for (const m of linkMatches) {
    const linkedSlug = decodeURIComponent(m[1]);
    if (!allAreaSlugs.has(linkedSlug)) {
      // Check if redirect
      const isRedir = LEGACY_SLUG_REDIRECTS[linkedSlug];
      violations.push({
        target: art.slug,
        type: 'BROKEN_INTERNAL_LINK_IN_ARTICLE',
        severity: isRedir ? 'MEDIUM' : 'CRITICAL',
        details: `Article "${art.slug}" links to non-existent area slug: "${linkedSlug}" (isRedirect: ${!!isRedir} -> ${isRedir})`
      });
    }
  }
}

console.log('\n================================================================');
console.log(`🔥 TOTAL VIOLATIONS / MISTAKES FOUND: ${violations.length} 🔥`);
console.log('================================================================\n');

for (let i = 0; i < violations.length; i++) {
  const v = violations[i];
  console.log(`[${i + 1}] [${v.severity}] ${v.type} (${v.target || v.slug})`);
  console.log(`    Details: ${v.details}\n`);
}
