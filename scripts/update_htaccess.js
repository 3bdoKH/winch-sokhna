import { areas } from '../src/data/areas.js';
import { slugify, normalizeArabic } from '../src/utils/slugify.js';
import { LEGACY_SLUG_REDIRECTS } from '../src/data/legacyRedirects.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const added = new Set();
const dynamicRules = [];

const addRule = (fromSlug, canonicalSlug) => {
  const cleanFrom = slugify(fromSlug);
  if (!cleanFrom || cleanFrom === slugify(canonicalSlug) || added.has(cleanFrom)) return;
  added.add(cleanFrom);
  dynamicRules.push(`  RewriteRule ^winch/${cleanFrom}/?$ /winch/${encodeURIComponent(canonicalSlug)} [R=301,L,NE]`);
};

// 0. Explicit Legacy & Consolidated Redirects
for (const [legacyFrom, targetTo] of Object.entries(LEGACY_SLUG_REDIRECTS)) {
  addRule(legacyFrom, targetTo);
}

// Generate spelling mistake & short-form variants for each area
for (const a of areas) {
  const canonical = a.slug;

  // 1. Short form (area name without 'ونش انقاذ')
  addRule(a.name, canonical);

  // 2. Taa Marbuta / Haa variants (ة <-> ه)
  if (a.name.includes('ة')) {
    addRule(a.name.replace(/ة/g, 'ه'), canonical);
    addRule(`ونش-${a.name.replace(/ة/g, 'ه')}`, canonical);
    addRule(`ونش-انقاذ-${a.name.replace(/ة/g, 'ه')}`, canonical);
  }
  if (a.name.includes('ه')) {
    addRule(a.name.replace(/ه/g, 'ة'), canonical);
    addRule(`ونش-${a.name.replace(/ه/g, 'ة')}`, canonical);
    addRule(`ونش-انقاذ-${a.name.replace(/ه/g, 'ة')}`, canonical);
  }

  // 3. Hamza variants (أ/إ/آ <-> ا)
  const deHamzaName = a.name.replace(/[أإآٱ]/g, 'ا');
  if (deHamzaName !== a.name) {
    addRule(deHamzaName, canonical);
    addRule(`ونش-${deHamzaName}`, canonical);
    addRule(`ونش-انقاذ-${deHamzaName}`, canonical);
  }

  // 4. Yaa / Alif Maqsura variants (ى <-> ي)
  if (a.name.includes('ى')) {
    addRule(a.name.replace(/ى/g, 'ي'), canonical);
    addRule(`ونش-${a.name.replace(/ى/g, 'ي')}`, canonical);
    addRule(`ونش-انقاذ-${a.name.replace(/ى/g, 'ي')}`, canonical);
  }
  if (a.name.includes('ي')) {
    addRule(a.name.replace(/ي/g, 'ى'), canonical);
    addRule(`ونش-${a.name.replace(/ي/g, 'ى')}`, canonical);
    addRule(`ونش-انقاذ-${a.name.replace(/ي/g, 'ى')}`, canonical);
  }

  // 5. 'ونش-' prefix only
  addRule(`ونش-${a.name}`, canonical);

  // 6. Keywords
  if (a.keywords) {
    for (const kw of a.keywords) {
      addRule(kw, canonical);
    }
  }
}

const allRulesText = [
  '  # 2.5 Automated Spelling Mistakes & Short-Form 301 Redirects',
  ...dynamicRules
].join('\n');

const htaccessContent = `<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # 1a. Redirect non-www to www (HTTP or HTTPS)
  RewriteCond %{HTTP_HOST} ^winchelsokhna\\.com$ [NC]
  RewriteRule ^ https://www.winchelsokhna.com%{REQUEST_URI} [R=301,L,NE]

  # 1b. Force HTTPS on www
  RewriteCond %{HTTPS} off
  RewriteRule ^ https://www.winchelsokhna.com%{REQUEST_URI} [R=301,L,NE]

  # 2. Skip rewrite for sitemap.xml and robots.txt explicitly
  RewriteRule ^(sitemap\\.xml|robots\\.txt)$ - [L]

  # Proxy /api/* to Node.js backend — must come before SPA fallback
  RewriteCond %{REQUEST_URI} ^/api/
  RewriteRule ^api/(.*)$ http://localhost:5000/api/$1 [P,L]

${allRulesText}

  # 3. Handle React Client-side Routing Fallback — exclude /api/
  RewriteCond %{REQUEST_URI} !^/api/
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>

<IfModule mod_mime.c>
  AddType application/xml .xml
</IfModule>

# Enable Gzip / Brotli Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/x-javascript application/json image/svg+xml
</IfModule>

# Browser Caching & WebP MIME Type
<IfModule mod_expires.c>
  ExpiresActive On
  AddType image/webp .webp
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

# Security Headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
  Header set Strict-Transport-Security "max-age=31536000; includeSubDomains"
</IfModule>
`;

const publicHtaccess = path.join(__dirname, '../public/.htaccess');
fs.writeFileSync(publicHtaccess, htaccessContent);
const buildHtaccess = path.join(__dirname, '../build/.htaccess');
if (fs.existsSync(path.dirname(buildHtaccess))) {
  fs.writeFileSync(buildHtaccess, htaccessContent);
}

console.log(`Successfully generated ${dynamicRules.length} spelling-mistake redirect rules into .htaccess!`);
