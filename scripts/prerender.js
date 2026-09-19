const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const express = require('express');

const app = express();
const PORT = 5000;
const buildDir = path.join(__dirname, '../build');
const publicDir = path.join(__dirname, '../public');

// Fallback to _template.html for client-side routing during prerender
const templatePath = path.join(buildDir, '_template.html');

const extractUrlsFromSitemap = () => {
  let sitemapPath = path.join(buildDir, 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    sitemapPath = path.join(publicDir, 'sitemap.xml');
  }
  if (!fs.existsSync(sitemapPath)) {
    console.error('sitemap.xml not found in build or public directory. Make sure to run generate-sitemap.js first.');
    return [];
  }
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  const urls = [];
  const regex = /<loc>(.*?)<\/loc>/g;
  let match;
  while ((match = regex.exec(sitemapContent)) !== null) {
    const url = match[1];
    const urlPath = url.replace('https://www.winchelsokhna.com', '').replace('https://winchelsokhna.com', '');
    if (urlPath && !urls.includes(urlPath)) {
      urls.push(urlPath);
    }
  }
  if (!urls.includes('/')) urls.unshift('/');
  return urls;
};

/**
 * Sanitize pre-rendered HTML to remove duplicate meta tags.
 * React Helmet injects page-specific tags, but the original index.html
 * may still have leftover tags. This keeps the LAST occurrence of each
 * (which is the Helmet-injected one) and removes earlier duplicates.
 */
function sanitizeHtml(html) {
  const duplicateTags = [
    { regex: /<title>[^<]*<\/title>/gi },
    { regex: /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/gi },
    { regex: /<link\s+[^>]*rel="canonical"[^>]*\/?>/gi },
    { regex: /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/gi },
    { regex: /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/gi },
    { regex: /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/gi },
    { regex: /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/gi },
    { regex: /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/gi },
    { regex: /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/gi },
    { regex: /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/gi },
    { regex: /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/gi }
  ];

  for (const item of duplicateTags) {
    const matches = html.match(item.regex);
    if (matches && matches.length > 1) {
      for (let i = 0; i < matches.length - 1; i++) {
        html = html.replace(matches[i], '');
      }
    }
  }

  return html;
}

const run = async () => {
  if (!fs.existsSync(buildDir)) {
    console.error('Build directory does not exist. Please run react-scripts build first.');
    return;
  }

  const origIndexHtml = path.join(buildDir, 'index.html');
  if (!fs.existsSync(origIndexHtml)) {
    console.error('index.html not found in build directory.');
    return;
  }

  // Backup index.html to _template.html so Express static fallback won't fail when index.html is overwritten
  fs.copyFileSync(origIndexHtml, templatePath);

  app.use(express.static(buildDir));
  app.use((req, res) => {
    res.sendFile(templatePath);
  });

  const urlsToPrerender = extractUrlsFromSitemap();
  if (urlsToPrerender.length === 0) {
    console.log('No URLs to prerender.');
    if (fs.existsSync(templatePath)) fs.unlinkSync(templatePath);
    return;
  }

  console.log(`Found ${urlsToPrerender.length} URLs to prerender.`);

  const server = app.listen(PORT, async () => {
    console.log(`Local prerender server started on http://localhost:${PORT}`);
    
    let browser;
    try {
      browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
      });

      const page = await browser.newPage();
      await page.setRequestInterception(true);
      page.on('request', (req) => {
        const resourceType = req.resourceType();
        if (resourceType === 'image' || resourceType === 'media' || resourceType === 'font') {
          req.abort();
        } else {
          req.continue();
        }
      });

      let idx = 0;
      for (const urlPath of urlsToPrerender) {
        idx++;
        try {
          const url = `http://localhost:${PORT}${urlPath}`;
          await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
          
          // Wait for main content or header to mount properly
          await page.waitForSelector('h1, .article-details-page, .seo-hero, .hero, .page-header, .seo-article', { timeout: 8000 }).catch(() => {});
          
          // Ensure Suspense loading fallback is gone
          await page.waitForFunction(() => !document.body.innerText.includes('جاري التحميل...'), { timeout: 5000 }).catch(() => {});

          // Short delay for react-helmet-async head injection to settle
          await new Promise(resolve => setTimeout(resolve, 400));

          const pageTitle = await page.evaluate(() => document.title);
          let html = await page.content();

          // Deduplicate meta and title tags
          html = sanitizeHtml(html);
          if (pageTitle) {
            html = html.replace(/<title>[^<]*<\/title>/, `<title>${pageTitle}</title>`);
          }

          const decodedPath = decodeURIComponent(urlPath).trim().replace(/[|:*?"<>]/g, '');
          let dirPath = path.join(buildDir, decodedPath);
          
          if (decodedPath === '/' || !decodedPath) {
            dirPath = buildDir;
          }
          
          if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
          }

          const targetFilePath = path.join(dirPath, 'index.html');
          fs.writeFileSync(targetFilePath, html);

          if (idx % 20 === 0 || idx === urlsToPrerender.length) {
            console.log(`[${idx}/${urlsToPrerender.length}] Prerendered: ${urlPath}`);
          }
        } catch (err) {
          console.error(`[${idx}/${urlsToPrerender.length}] Failed to prerender ${urlPath}:`, err.message);
        }
      }
      console.log('Prerendering completed successfully.');
    } catch (e) {
      console.error('Error during prerendering:', e);
      process.exitCode = 1;
    } finally {
      if (browser) {
        await browser.close().catch(() => {});
      }
      server.close();
      if (fs.existsSync(templatePath)) {
        fs.unlinkSync(templatePath);
      }
      process.exit(process.exitCode || 0);
    }
  });
};

run();

