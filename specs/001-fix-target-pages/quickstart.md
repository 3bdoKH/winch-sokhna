# Quickstart & Verification Guide: Target Pages & Content

## Prerequisites
- Node.js >= 18
- PowerShell or Bash terminal
- Working directory: `d:\work\winch-sokhna`

## Step-by-Step Validation Scenarios

### Scenario 1: Validate Zero Redirects in Sitemap
Run the audit script to assert that every URL in `public/sitemap.xml` returns no redirect target:
```powershell
node -e "
const fs = require('fs');
const { LEGACY_SLUG_REDIRECTS } = require('./src/data/legacyRedirects.js');
const sitemap = fs.readFileSync('./public/sitemap.xml', 'utf8');

let errors = 0;
for (const [from, to] of Object.entries(LEGACY_SLUG_REDIRECTS)) {
  if (sitemap.includes(encodeURIComponent(from)) || sitemap.includes(from)) {
    console.error('FAIL: Redirected slug found in sitemap:', from, '->', to);
    errors++;
  }
}
if (errors === 0) console.log('PASS: 0 redirected URLs found in sitemap.xml');
else process.exit(1);
"
```

### Scenario 2: Validate Target Titles Length (≤ 58 Chars)
Run a script to check that all 32 target pages have titles under 58 characters:
```powershell
node scripts/detailed_audit.mjs
node -e "
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./scripts/audit_output.json', 'utf8'));
let longTitles = 0;
data.forEach(item => {
  item.matchedAreas.forEach(m => {
    if (m.status === 'EXISTS' && !m.sitemapExclude && m.titleLength > 58) {
      console.warn('Long title:', m.slug, m.titleLength, m.title);
      longTitles++;
    }
  });
});
if (longTitles === 0) console.log('PASS: All target active titles <= 58 characters');
"
```

### Scenario 3: Verify Abu Zenima Page Creation
```powershell
node -e "
const { areas } = require('./src/data/areas.js');
const abuZenima = areas.find(a => a.name.includes('زنيمة'));
if (abuZenima) {
  console.log('PASS: Abu Zenima exists in areas.js:', abuZenima.slug, abuZenima.lat, abuZenima.lng);
} else {
  console.error('FAIL: Abu Zenima missing');
  process.exit(1);
}
"
```

### Scenario 4: Full Production Build Verification
```powershell
npm run build
```
Verify:
1. `public/sitemap.xml` and `build/sitemap.xml` are generated.
2. Prerender completes 100% of URLs.
3. 3 new articles appear in `sitemap.xml` and `/articles`.
