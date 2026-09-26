import fs from 'fs';

const data = JSON.parse(fs.readFileSync('./scripts/audit_output.json', 'utf8'));

const start = parseInt(process.argv[2] || '0', 10);
const end = parseInt(process.argv[3] || String(data.length), 10);

data.slice(start, end).forEach((item, idx) => {
  const num = start + idx + 1;
  console.log(`=== [${num}] Target: ${item.targetKey} ===`);
  item.matchedAreas.forEach(m => {
    if (m.status === 'MISSING_IN_AREAS_JS') {
      console.log(`   ❌ NOT DEFINED IN areas.js: ${m.slug} | Redirect: ${m.redirectTarget || 'NONE'} | Sitemap: ${m.inSitemap}`);
    } else {
      const red = m.redirectTarget ? `⚠️ REDIRECTS TO: ${m.redirectTarget}` : '✅ ACTIVE PAGE';
      const sm = m.inSitemap ? 'Sitemap: YES' : (m.sitemapExclude ? 'Sitemap: EXCLUDED (sitemapExclude:true)' : 'Sitemap: NO');
      const bes = m.hasBespokeContent ? 'Bespoke Content: YES' : 'Template Copy: YES';
      console.log(`   👉 Slug: ${m.slug} (${m.name}) | ${red} | ${sm} | Prerender: ${m.prerendered}`);
      console.log(`      Title (${m.titleLength}ch): "${m.title}"`);
      console.log(`      H1: "${m.h1}"`);
      console.log(`      Meta (${m.metaDescLength}ch): "${m.metaDesc}"`);
      console.log(`      Content: ${bes} | Time: ${m.honestTime} | InboundNearby: ${m.inboundNearbyCount} | Articles: ${m.articlesLinkingCount}`);
      if (m.buildHtmlInfo) {
        console.log(`      Build Title (${m.buildHtmlInfo.titleLength}ch): "${m.buildHtmlInfo.title}"`);
        console.log(`      Build H1: "${m.buildHtmlInfo.h1}"`);
        console.log(`      Build Canonical: "${m.buildHtmlInfo.canonical}"`);
      }
    }
  });
  console.log('');
});
