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

function getStaticArticles() {
  try {
    const articlesPath = path.join(__dirname, '../src/data/generated-articles.json');
    if (fs.existsSync(articlesPath)) {
      const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
      if (Array.isArray(articles)) {
        return articles.filter(a => a.sitemapEligible !== false);
      }
    }
  } catch (err) {
    console.warn('Could not read generated-articles.json for sitemap:', err.message);
  }
  return [];
}

async function buildSitemap() {
  const allAreas = await getAreas();
  const articles = getStaticArticles();

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
  const hubSlugs = new Set(["ونش-انقاذ-السويس", "ونش-انقاذ-العين-السخنة", "ونش-انقاذ-الجلالة", "ونش-انقاذ-بورتو-السخنة", "ونش-انقاذ-الزعفرانة", "ونش-انقاذ-بور-توفيق"]);
  const fmtDate = (d) => d.toISOString().split('T')[0];
  const now = new Date();
  const hubDate = fmtDate(now);
  const districtDate = fmtDate(new Date(now.getTime() - 24 * 3600 * 1000));
  const roadDate = fmtDate(new Date(now.getTime() - 2 * 24 * 3600 * 1000));
  for (const area of allAreas) {
    const slug = slugify(area.slug || area.name);
    if (!slug) continue;
    const isHub = hubSlugs.has(area.slug);
    const isHighway = area.region === "الطرق والمحاور السريعة";
    const priority = isHub ? "0.8" : isHighway ? "0.5" : "0.6";
    const changefreq = isHub ? "weekly" : "monthly";
    const lastmod = isHub ? hubDate : isHighway ? roadDate : districtDate;
    xml += `  <url>
    <loc>${baseUrl}/winch/${encodeURIComponent(slug)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <image:image>
      <image:loc>${baseUrl}/${area.heroImage || 'images/10.webp'}</image:loc>
      <image:title>ونش انقاذ ${area.name}</image:title>
    </image:image>
  </url>\n`;
  }

  if (articles.length > 0) {
    xml += `\n  <!-- Curated Guides & Relevant Articles -->\n`;
    for (const article of articles) {
      const slug = slugify(decodeURIComponent(article.slug).replace(/[|:?*<>]/g, ''));
      if (!slug) continue;
      const lastmod = article.updatedAt ? article.updatedAt.split('T')[0] : (article.date ? article.date.split('T')[0] : today);
      const imgPath = article.image ? (article.image.startsWith('http') ? article.image : `${baseUrl}${article.image.startsWith('/') ? article.image : `/${article.image}`}`) : `${baseUrl}/images/10.webp`;
      const cleanTitle = (article.title || 'مقال ونش انقاذ').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
      xml += `  <url>
    <loc>${baseUrl}/articles/${encodeURIComponent(slug)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <image:image>
      <image:loc>${imgPath}</image:loc>
      <image:title>${cleanTitle}</image:title>
    </image:image>
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

  console.log(`Generated sitemap.xml with ${coreRoutes.length + allAreas.length + articles.length} URLs`);

  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);
  if (fs.existsSync(buildDir)) {
    fs.writeFileSync(path.join(buildDir, 'robots.txt'), robotsTxt);
  }
  console.log('Generated robots.txt');
}

buildSitemap();

