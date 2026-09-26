import fs from 'fs';
import path from 'path';
import { areas } from '../src/data/areas.js';
import { LEGACY_SLUG_REDIRECTS } from '../src/data/legacyRedirects.js';
import { customAreaContent } from '../src/data/sokhnaContent.js';
import { getAreaCustomData } from '../src/data/areaCustomContent.js';
import { slugify, normalizeArabic } from '../src/utils/slugify.js';

const articles = JSON.parse(fs.readFileSync('./src/data/generated-articles.json', 'utf8'));
const sitemap = fs.readFileSync('./public/sitemap.xml', 'utf8');

const targetCustomTitles = {
  'السويس': 'ونش انقاذ السويس 24 ساعة | خصم 50% ووصول 10 دقائق',
  'العين السخنة': 'ونش انقاذ العين السخنة 24 ساعة | خصم 50% ووصول سريع',
  'السخنة': 'ونش انقاذ السخنة 24 ساعة | خصم 50% ووصول سريع',
  'حي الأربعين': 'ونش انقاذ حي الأربعين 24 ساعة | خصم 50% ووصول 10 دقائق',
  'الأربعين': 'ونش انقاذ الأربعين 24 ساعة | خصم 50% ووصول 10 دقائق',
  'حي الجناين': 'ونش انقاذ حي الجناين 24 ساعة | خصم 50% ووصول 10 دقائق',
  'الجناين': 'ونش انقاذ الجناين 24 ساعة | خصم 50% ووصول 10 دقائق',
  'بور توفيق': 'ونش انقاذ بور توفيق 24 ساعة | خصم 50% ووصول 10 دقائق',
  'عتاقة': 'ونش انقاذ عتاقة 24 ساعة | خصم 50% للمصانع والميناء',
  'حي عتاقة': 'ونش انقاذ حي عتاقة 24 ساعة | خدمة سريعة بخصم 50%',
  'عتاقة البلد': 'ونش انقاذ عتاقة البلد 24 ساعة | وصول 10 دقائق بخصم 50%',
  'الأدبية': 'ونش انقاذ الأدبية 24 ساعة | سطحات هيدروليكية والميناء',
  'طريق الأدبية': 'ونش انقاذ طريق الأدبية 24 ساعة | خدمة سريعة 24/7',
  'طريق السويس': 'ونش انقاذ طريق السويس 24 ساعة | خصم 50% وسحب سريع',
  'طريق القاهرة السويس': 'ونش انقاذ طريق القاهرة السويس 24 ساعة | الصحراوي بخصم 50%',
  'طريق السخنة': 'ونش انقاذ طريق السخنة 24 ساعة | خدمة سريعة بخصم 50%',
  'طريق العين السخنة الجديد': 'ونش طريق السخنة الجديد 24 ساعة | خصم 50% وسحب سريع',
  'بورتو السخنة': 'ونش انقاذ بورتو السخنة 24 ساعة | لجميع القرى المحيطة',
  'اميجو العين السخنة': 'ونش انقاذ اميجو السخنة 24 ساعة | خدمة سريعة بالقرى',
  'الجلالة': 'ونش انقاذ الجلالة 24 ساعة | سطحات هيدروليكية للمرتفعات',
  'جبل الجلالة': 'ونش انقاذ جبل الجلالة 24 ساعة | كابلات للمنحنيات والجبل',
  'هضبة الجلالة': 'ونش انقاذ هضبة الجلالة 24 ساعة | خدمة سريعة بالمرتفعات',
  'منتجع الجلالة': 'ونش انقاذ منتجع الجلالة 24 ساعة | سحب آمن بخصم 50%',
  'طريق الجلالة': 'ونش انقاذ طريق الجلالة 24 ساعة | للمنحدرات والمرتفعات',
  'الزعفرانة': 'ونش انقاذ الزعفرانة 24 ساعة | طريق الساحل والبحر الأحمر',
  'طريق الزعفرانة': 'ونش انقاذ طريق الزعفرانة 24 ساعة | استجابة سريعة للطوارئ',
  'وادي حجول طريق السويس': 'ونش انقاذ وادي حجول 24 ساعة | سحب سريع بوصلة المحاجر',
  'عجرود': 'ونش انقاذ عجرود 24 ساعة | كمين عجرود ومدخل السويس',
  'ميناء السويس': 'ونش انقاذ ميناء السويس 24 ساعة | سطحات لبوابات الميناء',
  'جمرك السويس': 'ونش انقاذ جمرك السويس 24 ساعة | ساحات التخليص والميناء',
  'طريق جنيفة': 'ونش انقاذ طريق جنيفة 24 ساعة | سحب سريع ومساعدة فورية',
  'الفرز': 'ونش انقاذ الفرز 24 ساعة | خصم 50% ووصول 10 دقائق',
  'الملاحة': 'ونش انقاذ الملاحة 24 ساعة | خصم 50% ووصول 10 دقائق',
  'الهويس': 'ونش انقاذ الهويس 24 ساعة | خصم 50% ووصول 10 دقائق',
  'عيون موسى': 'ونش انقاذ عيون موسى 24 ساعة | ما بعد نفق أحمد حمدي',
  'راس سدر': 'ونش انقاذ راس سدر 24 ساعة | خصم 50% وسحب آمن بسيناء',
  'أبو زنيمة': 'ونش انقاذ أبو زنيمة 24 ساعة | استجابة سريعة بجنوب سيناء',
  'ابورديس': 'ونش انقاذ ابورديس 24 ساعة | خدمة طوارئ سريعة بجنوب سيناء',
  'محور 30 يوليو': 'ونش انقاذ محور 30 يوليو 24 ساعة | خدمة المحاور الحرة',
  'العريش': 'ونش انقاذ العريش 24 ساعة | خدمة طوارئ ومساعدة على الطريق',
  'شرم الشيخ': 'ونش انقاذ شرم الشيخ 24 ساعة | سطحات حديثة بخصم 50%',
  'طابا': 'ونش انقاذ طابا 24 ساعة | طوارئ خليج العقبة وجنوب سيناء',
};

const titleLandmarks = {
  'السويس': 'وصول 10 دقائق بخصم 50%',
  'حي الأربعين': 'وصول 10 دقائق بخصم 50%',
  'حي الجناين': 'وصول 10 دقائق بخصم 50%',
  'بور توفيق': 'وصول 10 دقائق بخصم 50%',
  'الزعفرانة': 'طريق السخنة الزعفرانة والبحر الأحمر',
  'الجلالة': 'المرتفعات والمنحنيات',
  'العين السخنة': 'القرى والبوابات',
  'بورتو السخنة': 'القرى المحيطة',
  'طريق السخنة': 'القاهرة - البحر الأحمر',
  'طريق القاهرة السويس': 'الصحراوي السريع',
};

const honestTimes = {
  'الزعفرانة': '30 إلى 45 دقيقة',
  'طريق الزعفرانة': '30 إلى 45 دقيقة',
  'طريق السخنة الزعفرانة': '30 إلى 45 دقيقة',
  'الجلالة': '15 إلى 20 دقيقة',
  'جبل الجلالة': '15 إلى 20 دقيقة',
  'هضبة الجلالة': '15 إلى 20 دقيقة',
  'طريق الجلالة': '15 إلى 20 دقيقة',
  'منتجع الجلالة': '15 إلى 20 دقيقة',
  'جامعة الجلالة': '15 إلى 20 دقيقة',
  'بوابات الجلالة': '15 إلى 20 دقيقة',
  'أبو زنيمة': '20 إلى 30 دقيقة',
  'ابورديس': '20 إلى 35 دقيقة',
  'عيون موسى': '15 إلى 25 دقيقة',
  'راس سدر': '15 إلى 25 دقيقة',
  'الطور': '25 إلى 40 دقيقة',
  'طابا': '25 إلى 45 دقيقة',
  'العريش': '20 إلى 30 دقيقة',
  'شرم الشيخ': '15 إلى 25 دقيقة',
  'وادي حجول طريق السويس': '15 إلى 25 دقيقة',
  'محور 30 يوليو': '15 إلى 20 دقيقة',
};

const dedicatedH1Areas = [
  'السويس', 'بور توفيق', 'حي الأربعين', 'الأربعين', 'حي الجناين', 'الجناين',
  'العين السخنة', 'السخنة', 'بورتو السخنة', 'اميجو العين السخنة',
  'عتاقة', 'حي عتاقة', 'عتاقة البلد', 'الأدبية',
  'الجلالة', 'جبل الجلالة', 'هضبة الجلالة', 'منتجع الجلالة',
  'الزعفرانة', 'عجرود', 'وادي حجول طريق السويس',
  'ميناء السويس', 'جمرك السويس', 'الفرز', 'الملاحة', 'الهويس',
  'عيون موسى', 'راس سدر', 'أبو زنيمة', 'ابورديس',
  'العريش', 'شرم الشيخ', 'طابا'
];

function getPageMetadata(area) {
  const areaName = area.name;
  const governorate = area.region || "مصر";
  let title = targetCustomTitles[areaName];
  if (!title) {
    const hook = titleLandmarks[areaName] || 'خصم 50% ووصول سريع';
    title = `ونش انقاذ ${areaName} 24 ساعة | ${hook}`;
    if (title.length > 58) {
      title = `ونش انقاذ ${areaName} | خصم 50% خدمة 24/7`;
    }
  }

  const isDedicatedH1 = dedicatedH1Areas.includes(areaName);
  const isRoadPage = areaName.startsWith('طريق') || areaName.startsWith('محور');
  let h1 = `ونش انقاذ سيارات في ${areaName}`;
  if (isDedicatedH1) {
    h1 = `ونش انقاذ سيارات في ${areaName}`;
  } else if (isRoadPage) {
    h1 = `ونش انقاذ ${areaName} — خدمة سريعة على مدار 24 ساعة`;
  } else {
    h1 = `ونش انقاذ سيارات في ${areaName} — ${titleLandmarks[areaName] || governorate}`;
  }

  const customData = getAreaCustomData(areaName, governorate);
  const honestTime = honestTimes[areaName] || '10 إلى 15 دقيقة';

  return {
    title,
    titleLength: title.length,
    h1,
    metaDescription: customData.metaDescription,
    metaDescLength: (customData.metaDescription || '').length,
    honestTime,
    hasBespokeContent: !!customAreaContent[areaName],
    customData
  };
}

// Map each inbound link from areas.js nearby
const inboundNearby = {};
for (const a of areas) {
  if (a.nearby) {
    for (const n of a.nearby) {
      if (!inboundNearby[n]) inboundNearby[n] = [];
      inboundNearby[n].push(a.slug);
    }
  }
}

// Map articles linking to each area
const articleLinks = {};
for (const art of articles) {
  const content = art.content || '';
  for (const a of areas) {
    if (content.includes(`/winch/${encodeURIComponent(a.slug)}`) || content.includes(`/winch/${a.slug}`)) {
      if (!articleLinks[a.slug]) articleLinks[a.slug] = [];
      articleLinks[a.slug].push(art.slug);
    }
  }
}

const auditTargets = [
  { key: 'ونش انقاذ السويس', query: 'السويس', checkSlugs: ['ونش-انقاذ-السويس', 'ونش-انقاذ-حي-السويس'] },
  { key: 'ونش انقاذ السخنه', query: 'السخنة', checkSlugs: ['ونش-انقاذ-السخنة', 'ونش-انقاذ-العين-السخنة'] },
  { key: 'السويس', query: 'السويس', checkSlugs: ['ونش-انقاذ-السويس', 'ونش-انقاذ-حي-السويس'] },
  { key: 'طريق السويس', query: 'طريق السويس', checkSlugs: ['ونش-انقاذ-طريق-السويس', 'ونش-انقاذ-طريق-القاهرة-السويس'] },
  { key: 'جمرك السويس', query: 'جمرك السويس', checkSlugs: ['ونش-انقاذ-جمرك-السويس'] },
  { key: 'ميناء السويس', query: 'ميناء السويس', checkSlugs: ['ونش-انقاذ-ميناء-السويس'] },
  { key: 'السخنه', query: 'السخنة', checkSlugs: ['ونش-انقاذ-السخنة'] },
  { key: 'طريق السخنه', query: 'طريق السخنة', checkSlugs: ['ونش-انقاذ-طريق-السخنة', 'ونش-انقاذ-طريق-العين-السخنة-الجديد'] },
  { key: 'العين السخنه', query: 'العين السخنة', checkSlugs: ['ونش-انقاذ-العين-السخنة'] },
  { key: 'بورتو السخنه', query: 'بورتو السخنة', checkSlugs: ['ونش-انقاذ-بورتو-السخنة'] },
  { key: 'الاربعين', query: 'الاربعين', checkSlugs: ['ونش-انقاذ-حي-الأربعين', 'ونش-انقاذ-الاربعين'] },
  { key: 'الجناين', query: 'الجناين', checkSlugs: ['ونش-انقاذ-حي-الجناين', 'ونش-انقاذ-الجناين'] },
  { key: 'الزعفرانه', query: 'الزعفرانة', checkSlugs: ['ونش-انقاذ-الزعفرانة', 'ونش-انقاذ-طريق-الزعفرانة'] },
  { key: 'عيون موسي', query: 'عيون موسى', checkSlugs: ['ونش-انقاذ-عيون-موسى'] },
  { key: 'ابو رديس', query: 'ابورديس', checkSlugs: ['ونش-انقاذ-ابورديس'] },
  { key: 'وادي حجول', query: 'وادي حجول', checkSlugs: ['ونش-انقاذ-وادي-حجول'] },
  { key: 'ابو زنيمه', query: 'ابو زنيمة', checkSlugs: ['ونش-انقاذ-ابو-زنيمة', 'ونش-انقاذ-أبو-زنيمة'] },
  { key: 'چنيفه', query: 'جنيفة', checkSlugs: ['ونش-انقاذ-طريق-جنيفة', 'ونش-انقاذ-جنيفة'] },
  { key: 'الادبيه', query: 'الأدبية', checkSlugs: ['ونش-انقاذ-الأدبية', 'ونش-انقاذ-طريق-الأدبية'] },
  { key: 'علاقه', query: 'علاقه', checkSlugs: ['علاقه', 'ونش-انقاذ-علاقه'] },
  { key: 'عتاقة (تصحيح علاقه)', query: 'عتاقة', checkSlugs: ['ونش-انقاذ-عتاقة', 'ونش-انقاذ-حي-عتاقة', 'ونش-انقاذ-عتاقة-البلد'] },
  { key: 'الفرز', query: 'الفرز', checkSlugs: ['ونش-انقاذ-الفرز'] },
  { key: 'الملاحه', query: 'الملاحة', checkSlugs: ['ونش-انقاذ-الملاحة'] },
  { key: 'بورتوفيق', query: 'بور توفيق', checkSlugs: ['ونش-انقاذ-بور-توفيق'] },
  { key: 'الهويس', query: 'الهويس', checkSlugs: ['ونش-انقاذ-الهويس'] },
  { key: 'اميجو العين السخنه', query: 'اميجو العين السخنة', checkSlugs: ['ونش-انقاذ-اميجو-العين-السخنة'] },
  { key: 'الجلاله', query: 'الجلالة', checkSlugs: ['ونش-انقاذ-الجلالة', 'ونش-انقاذ-منتجع-الجلالة', 'ونش-انقاذ-هضبة-الجلالة', 'ونش-انقاذ-جبل-الجلالة'] },
  { key: 'طريق الجلاله', query: 'طريق الجلالة', checkSlugs: ['ونش-انقاذ-طريق-الجلالة'] },
  { key: 'عجرود', query: 'عجرود', checkSlugs: ['ونش-انقاذ-عجرود'] },
  { key: 'راس سدر', query: 'راس سدر', checkSlugs: ['ونش-انقاذ-راس-سدر'] },
  { key: 'محور ٣٠ يوليو', query: 'محور 30 يوليو', checkSlugs: ['ونش-انقاذ-محور-30-يوليو'] },
  { key: 'العريش', query: 'العريش', checkSlugs: ['ونش-انقاذ-العريش'] },
  { key: 'شرم الشيخ', query: 'شرم الشيخ', checkSlugs: ['ونش-انقاذ-شرم-الشيخ'] },
  { key: 'طابا', query: 'طابا', checkSlugs: ['ونش-انقاذ-طابا'] }
];

const results = [];

for (const target of auditTargets) {
  const itemResult = {
    targetKey: target.key,
    query: target.query,
    matchedAreas: []
  };

  for (const slug of target.checkSlugs) {
    const area = areas.find(a => a.slug === slug || slugify(a.slug) === slugify(slug));
    const isRedirected = LEGACY_SLUG_REDIRECTS[slug] || null;
    
    // Check if in sitemap
    const sitemapPresent = sitemap.includes(`/winch/${encodeURIComponent(slug)}`) || sitemap.includes(`/winch/${slug}`);
    
    // Check if prerendered in build
    const buildPath = path.join('./build/winch', slug, 'index.html');
    const buildExists = fs.existsSync(buildPath);
    let buildHtmlInfo = null;
    if (buildExists) {
      const html = fs.readFileSync(buildPath, 'utf8');
      const titleMatch = html.match(/<title>([^<]*)<\/title>/);
      const metaMatch = html.match(/<meta name="description" content="([^"]*)"/);
      const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
      const cleanH1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : null;
      const canonicalMatch = html.match(/<link rel="canonical" href="([^"]*)"/);
      buildHtmlInfo = {
        title: titleMatch ? titleMatch[1] : null,
        titleLength: titleMatch ? titleMatch[1].length : 0,
        metaDescription: metaMatch ? metaMatch[1] : null,
        metaLength: metaMatch ? metaMatch[1].length : 0,
        h1: cleanH1,
        canonical: canonicalMatch ? canonicalMatch[1] : null,
        fileSize: html.length
      };
    }

    if (area) {
      const meta = getPageMetadata(area);
      itemResult.matchedAreas.push({
        status: 'EXISTS',
        slug: area.slug,
        name: area.name,
        region: area.region,
        coords: { lat: area.lat, lng: area.lng },
        sitemapExclude: !!area.sitemapExclude,
        inSitemap: sitemapPresent,
        prerendered: buildExists,
        buildHtmlInfo,
        redirectTarget: isRedirected,
        title: meta.title,
        titleLength: meta.titleLength,
        h1: meta.h1,
        metaDesc: meta.metaDescription,
        metaDescLength: meta.metaDescLength,
        honestTime: meta.honestTime,
        hasBespokeContent: meta.hasBespokeContent,
        nearbyCount: (area.nearby || []).length,
        nearbyList: area.nearby || [],
        inboundNearbyCount: (inboundNearby[area.slug] || []).length,
        inboundNearbyList: inboundNearby[area.slug] || [],
        articlesLinkingCount: (articleLinks[area.slug] || []).length,
        articlesLinkingList: articleLinks[area.slug] || []
      });
    } else {
      itemResult.matchedAreas.push({
        status: 'MISSING_IN_AREAS_JS',
        slug: slug,
        redirectTarget: isRedirected,
        inSitemap: sitemapPresent,
        prerendered: buildExists
      });
    }
  }

  results.push(itemResult);
}

fs.writeFileSync('./scripts/audit_output.json', JSON.stringify(results, null, 2));
console.log('Audit complete! Saved to scripts/audit_output.json');
