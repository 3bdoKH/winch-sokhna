import fs from 'fs';
import { areas } from '../src/data/areas.js';
import { LEGACY_SLUG_REDIRECTS } from '../src/data/legacyRedirects.js';

const validSlugs = new Set(areas.map(a => a.slug));
const articles = JSON.parse(fs.readFileSync('./src/data/generated-articles.json', 'utf8'));

let brokenCount = 0;
let redirectCount = 0;

for (const art of articles) {
  const content = art.content || '';
  const regex = /href=["']\/winch\/([^"']+)["']/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const raw = match[1];
    const decoded = decodeURIComponent(raw);
    if (!validSlugs.has(decoded)) {
      if (LEGACY_SLUG_REDIRECTS[decoded]) {
        console.log(`⚠️ Redirected link in [${art.slug}] -> "${decoded}" -> redirects to "${LEGACY_SLUG_REDIRECTS[decoded]}"`);
        redirectCount++;
      } else {
        console.log(`❌ BROKEN LINK (404) in [${art.slug}] -> "${decoded}"`);
        brokenCount++;
      }
    }
  }
}

console.log(`\nChecked ${articles.length} articles:`);
console.log(`- Broken links (404): ${brokenCount}`);
console.log(`- Redirected links: ${redirectCount}`);
