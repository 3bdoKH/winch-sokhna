import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';

const buildDir = './build';

const testSlugs = [
  'ونش-انقاذ-العين-السخنة',
  'ونش-انقاذ-ابو-زنيمة',
  'ونش-انقاذ-عتاقة',
  'ونش-انقاذ-الأدبية',
  'ونش-انقاذ-طريق-الجلالة',
  'ونش-انقاذ-وادي-حجول',
  'ونش-انقاذ-عجرود',
  'ونش-انقاذ-عيون-موسى',
  'ونش-انقاذ-حي-الأربعين',
  'ونش-انقاذ-حي-الجناين',
  'ونش-انقاذ-بور-توفيق',
  'ونش-انقاذ-طابا'
];

const testArticleSlugs = [
  'ataka-adabiya-industrial-ports-towing-guide',
  'galala-mountain-wadi-hagoul-highway-safety-towing',
  'south-sinai-coastal-highway-towing-guide'
];

console.log('=== VERIFYING STATIC BUILD OUTPUTS ===\n');

for (const slug of testSlugs) {
  // Check both raw and encoded paths
  const encoded = encodeURIComponent(slug);
  const possiblePaths = [
    path.join(buildDir, 'winch', slug, 'index.html'),
    path.join(buildDir, 'winch', encoded, 'index.html')
  ];

  const htmlPath = possiblePaths.find(p => fs.existsSync(p));
  if (!htmlPath) {
    console.error(`❌ MISSING BUILD HTML for: ${slug}`);
    continue;
  }

  const html = fs.readFileSync(htmlPath, 'utf8');
  const $ = cheerio.load(html);

  const title = $('title').text().trim();
  const h1 = $('h1').first().text().trim();
  const metaDesc = $('meta[name="description"]').attr('content') || '';
  const canonical = $('link[rel="canonical"]').attr('href') || '';
  const fileSize = fs.statSync(htmlPath).size;

  console.log(`✅ [${slug}]`);
  console.log(`   Path: ${htmlPath} (${fileSize} bytes)`);
  console.log(`   Title: "${title}" (length: ${title.length})`);
  console.log(`   H1: "${h1}"`);
  console.log(`   Meta: "${metaDesc}" (length: ${metaDesc.length})`);
  console.log(`   Canonical: ${canonical}\n`);
}

console.log('=== VERIFYING SUPPORTING FIELD-GUIDE ARTICLES ===\n');

for (const artSlug of testArticleSlugs) {
  const htmlPath = path.join(buildDir, 'articles', artSlug, 'index.html');
  if (!fs.existsSync(htmlPath)) {
    console.error(`❌ MISSING ARTICLE HTML: ${artSlug}`);
    continue;
  }

  const html = fs.readFileSync(htmlPath, 'utf8');
  const $ = cheerio.load(html);

  const title = $('title').text().trim();
  const h1 = $('h1').first().text().trim();
  const metaDesc = $('meta[name="description"]').attr('content') || '';
  const fileSize = fs.statSync(htmlPath).size;
  const internalLinks = $('a[href*="/winch/"]').map((_, el) => $(el).attr('href')).get();

  console.log(`✅ [Article: ${artSlug}]`);
  console.log(`   Title: "${title}"`);
  console.log(`   H1: "${h1}"`);
  console.log(`   File Size: ${fileSize} bytes`);
  console.log(`   Internal Links to /winch/: ${internalLinks.length} links found:`);
  internalLinks.forEach(l => console.log(`      -> ${l}`));
  console.log('\n');
}

// Check that excluded 301 slugs are NOT in sitemap
const sitemap = fs.readFileSync('./public/sitemap.xml', 'utf8');
const redirectedSlugs = [
  'ونش-انقاذ-السخنة',
  'ونش-انقاذ-الاربعين',
  'ونش-انقاذ-الجناين',
  'ونش-انقاذ-حي-عتاقة',
  'ونش-انقاذ-عتاقة-البلد',
  'ونش-انقاذ-طريق-الزعفرانة'
];

console.log('=== SITEMAP INVARIANT CHECK ===');
let sitemapClean = true;
for (const r of redirectedSlugs) {
  if (sitemap.includes(r) || sitemap.includes(encodeURIComponent(r))) {
    console.error(`❌ SITEMAP CONTAINS REDIRECTED SLUG: ${r}`);
    sitemapClean = false;
  }
}
if (sitemapClean) {
  console.log('✅ PASS: All 301 redirected slugs are 100% excluded from sitemap.xml!\n');
}
