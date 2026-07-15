const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const express = require('express');

const app = express();
const PORT = 5000;
const buildDir = path.join(__dirname, '../build');

app.use(express.static(buildDir));

// Fallback to index.html for client-side routing
app.use((req, res) => {
  res.sendFile(path.join(buildDir, 'index.html'));
});

const extractUrlsFromSitemap = () => {
  const sitemapPath = path.join(buildDir, 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    console.error('sitemap.xml not found in build directory. Make sure to run generate-sitemap.js first.');
    return [];
  }
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  const urls = [];
  const regex = /<loc>(.*?)<\/loc>/g;
  let match;
  while ((match = regex.exec(sitemapContent)) !== null) {
    const url = match[1];
    // Extract path from the full URL
    const urlPath = url.replace('https://winchelsokhna.com', '');
    if (urlPath && !urls.includes(urlPath)) {
      urls.push(urlPath);
    }
  }
  // Make sure '/' is included if it was skipped or we want to do it first
  if (!urls.includes('/')) urls.unshift('/');
  return urls;
};

const run = async () => {
  const urlsToPrerender = extractUrlsFromSitemap();
  if (urlsToPrerender.length === 0) {
    console.log('No URLs to prerender.');
    return;
  }

  console.log(`Found ${urlsToPrerender.length} URLs to prerender.`);

  const server = app.listen(PORT, async () => {
    console.log(`Local server started on http://localhost:${PORT}`);
    
    let browser;
    try {
      browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });

      const page = await browser.newPage();
      
      // Speed up rendering by aborting non-essential requests
      await page.setRequestInterception(true);
      page.on('request', (req) => {
        const resourceType = req.resourceType();
        if (resourceType === 'image' || resourceType === 'media' || resourceType === 'font' || resourceType === 'stylesheet') {
          req.abort();
        } else {
          req.continue();
        }
      });

      // To avoid prerendering the same file (e.g. root index.html) when it's already modified,
      // we need to be careful. The express static middleware serves index.html for '/'.
      // If we overwrite build/index.html with the prerendered one, subsequent prerenders
      // might serve the prerendered HTML instead of the blank one, which is mostly fine
      // but hydration could get weird. We'll do it anyway, React handles it.

      for (const urlPath of urlsToPrerender) {
        console.log(`Prerendering ${urlPath}...`);
        try {
          const url = `http://localhost:${PORT}${urlPath}`;
          
          await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
          
          // Wait for React to finish rendering (hide fallback loading)
          await page.waitForFunction(() => {
            return !document.body.innerText.includes('جاري التحميل...');
          }, { timeout: 10000 }).catch(() => {});

          const html = await page.content(); // Gets full HTML including DOCTYPE

          const decodedPath = decodeURIComponent(urlPath);
          let dirPath = path.join(buildDir, decodedPath);
          
          if (decodedPath === '/') {
            dirPath = buildDir;
          }
          
          if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
          }

          const targetFilePath = path.join(dirPath, 'index.html');
          fs.writeFileSync(targetFilePath, html);

        } catch (err) {
          console.error(`Failed to prerender ${urlPath}:`, err.message);
        }
      }
      console.log('Prerendering completed.');
    } catch (e) {
      console.error('Error during prerendering:', e);
    } finally {
      if (browser) {
        await browser.close();
      }
      server.close();
    }
  });
};

run();
