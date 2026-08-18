const fs = require('fs');
const path = require('path');

// Arabic SEO Slugify Utility for the sitemap generator
const slugify = (text) => {
  if (!text) return '';
  const normalizedText = text.trim();

  return normalizedText
    .replace(/ /g, '-')
    .replace(/[^\u0600-\u06FFa-zA-Z0-9-]/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

async function getAreas() {
  try {
    const module = await import('../src/data/areas.js');
    return module.areas;
  } catch (err) {
    console.error('Failed to import areas.js:', err);
    return [];
  }
}
const baseUrl = 'https://www.winchelsokhna.com';
const today = new Date().toISOString().split('T')[0];

async function fetchArticleSlugs() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    const res = await fetch('https://winchenqaz.com/api/articles', { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        return data
          .map(a => a.slug)
          .filter(Boolean)
          .map(slug => slugify(decodeURIComponent(slug).replace(/[|:?*<>]/g, '')));
      }
    }
  } catch (err) {
    console.log('Sitemap build: Could not fetch dynamic articles from API (offline or timeout). Proceeding with core + area routes.');
  }
  return [];
}

async function buildSitemap() {
  const allAreas = await getAreas();
  const articleSlugs = await fetchArticleSlugs();

  const coreRoutes = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/services', priority: '0.9', changefreq: 'weekly' },
    { url: '/areas', priority: '0.9', changefreq: 'weekly' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/contact', priority: '0.8', changefreq: 'monthly' },
    { url: '/articles', priority: '0.8', changefreq: 'weekly' },
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <!-- Core Static Pages -->
`;

  for (const route of coreRoutes) {
    xml += `  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>\n`;
  }

  xml += `\n  <!-- Dynamic Location Landing Pages -->\n`;
  for (const area of allAreas) {
    const slug = slugify(area.slug || area.name);
    if (!slug) continue;
    xml += `  <url>
    <loc>${baseUrl}/winch/${encodeURIComponent(slug)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <image:image>
      <image:loc>${baseUrl}/${area.heroImage || 'images/10.webp'}</image:loc>
      <image:title>ونش انقاذ ${area.name}</image:title>
    </image:image>
  </url>\n`;
  }

  if (articleSlugs.length > 0) {
    xml += `\n  <!-- Dynamic Articles -->\n`;
    for (const slug of articleSlugs) {
      xml += `  <url>
    <loc>${baseUrl}/articles/${encodeURIComponent(slug)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
    }
  }

  xml += `</urlset>`;

  const publicDir = path.join(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);

  const buildDir = path.join(__dirname, '../build');
  if (fs.existsSync(buildDir)) {
    fs.writeFileSync(path.join(buildDir, 'sitemap.xml'), xml);
  }

  console.log(`Generated sitemap.xml with ${coreRoutes.length + allAreas.length + articleSlugs.length} URLs`);

  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
Host: www.winchelsokhna.com
`;
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);
  if (fs.existsSync(buildDir)) {
    fs.writeFileSync(path.join(buildDir, 'robots.txt'), robotsTxt);
  }
  console.log('Generated robots.txt');
}

buildSitemap();

