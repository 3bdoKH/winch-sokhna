const fs = require('fs');
const path = require('path');

// Arabic SEO Slugify Utility for the sitemap generator
const slugify = (text) => {
  if (!text) return '';
  const normalizedText = text.trim();

  // For Arabic SEO, we keep the Arabic characters.
  return normalizedText
    .replace(/ /g, '-')
    // Remove characters that are not Arabic letters, English letters, numbers, or dashes
    .replace(/[^\u0600-\u06FFa-zA-Z0-9-]/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

// We must read areas from the compiled or source JS file. Since it's ES module syntax, 
// we'll read it as text and parse it simply using regex for a build script.
const areasFilePath = path.join(__dirname, '../src/data/areas.js');
const areasFileContent = fs.readFileSync(areasFilePath, 'utf-8');

// A very hacky but effective way to extract string arrays from the specific file structure
const extractAreas = (content) => {
  const areas = [];
  const regex = /"([^"]+)"/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const word = match[1].trim();
    // basic filter out of keys like 'name'
    if (word.length > 2 && !word.match(/^[a-zA-Z]+$/)) {
      areas.push(word);
    }
  }
  // Make unique
  return [...new Set(areas)];
};

const allAreas = extractAreas(areasFileContent);
const baseUrl = 'https://winchelsokhna.com';

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Core Pages -->
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/services</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/areas</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Dynamic Location Pages -->
${allAreas.map(area => {
  const slug = slugify(area);
  if (!slug) return '';
  return `  <url>
    <loc>${baseUrl}/winch/${encodeURIComponent(slug)}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
}).join('\n')}
</urlset>`;

const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml);
console.log(`Generated sitemap.xml with ${allAreas.length + 5} URLs`);

const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);
console.log('Generated robots.txt');
