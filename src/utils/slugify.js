// Arabic SEO Slugify & Fuzzy Normalization Utility

/**
 * Normalizes Arabic text for tolerant matching of spelling mistakes and orthographic variants.
 * Handles Hamza variants (أ, إ, آ, ٱ, ء, ؤ, ئ), Taa Marbuta (ة/ه), Alif Maqsura (ى/ي),
 * Tashkeel diacritics, tatweel, and spacing/separators.
 */
export const normalizeArabic = (text = '') => {
  if (!text) return '';
  return text
    .toString()
    .trim()
    // Remove diacritics / tashkeel & tatweel
    .replace(/[\u064B-\u065F\u0670\u0640]/g, '')
    // Normalize Hamzas
    .replace(/[أإآٱ]/g, 'ا')
    // Normalize Taa Marbuta to Haa
    .replace(/ة/g, 'ه')
    // Normalize Alif Maqsura to Yaa
    .replace(/ى/g, 'ي')
    // Normalize Hamza on Waw / Yaa
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    // Remove standalone hamza so ميناء and مينا match seamlessly
    .replace(/ء/g, '')
    // Normalize punctuation / separators to single space
    .replace(/[-_.\s]+/g, ' ')
    .trim();
};

/**
 * Strips common Arabic prefix words (like ونش, انقاذ, حي, قرية, مدينة, طريق, محور, etc.)
 * to extract the core location root name.
 */
export const stripCommonPrefixes = (text = '') => {
  let s = normalizeArabic(text);
  const prefixes = [
    'ونش انقاذ سيارات',
    'ونش انقاذ',
    'ونش سيارات',
    'ونش',
    'انقاذ',
    'حي',
    'منطقه',
    'مدينه',
    'قريه',
    'طريق',
    'محور',
    'بوابات',
    'منتجع',
    'جبل',
    'هضبه'
  ];
  for (const p of prefixes) {
    if (s.startsWith(p + ' ')) {
      s = s.slice(p.length + 1).trim();
    }
  }
  return s;
};

/**
 * Standard slugify for creating clean URL-friendly Arabic slugs.
 */
export const slugify = (text = '') => {
  if (!text) return '';
  const normalizedText = text.toString().trim();

  return normalizedText
    .replace(/ /g, '-')
    // Remove characters that are not Arabic letters, English letters, numbers, or dashes
    .replace(/[^\u0600-\u06FFa-zA-Z0-9-]/g, '')
    .replace(/--+/g, '-')    // Replace multiple dashes with single dash
    .replace(/^-+/, '')      // Trim dashes from start
    .replace(/-+$/, '');     // Trim dashes from end
};

/**
 * Fuzzy area resolver that matches ANY spelling mistake, typo, prefix-less short form,
 * or orthographic variant to the correct area in the areasList.
 */
export const findAreaByFuzzySlug = (rawSlug, areasList) => {
  if (!rawSlug || !areasList || !Array.isArray(areasList)) return null;

  let decoded = rawSlug;
  try {
    decoded = decodeURIComponent(rawSlug);
  } catch (e) {
    decoded = rawSlug;
  }

  const clean = decoded.trim().replace(/-/g, ' ');
  const norm = normalizeArabic(decoded);
  const core = stripCommonPrefixes(decoded);

  // 1. Exact slug match
  for (const a of areasList) {
    if (a.slug === decoded || a.slug === rawSlug) return a;
  }

  // 2. Exact name match
  for (const a of areasList) {
    if (a.name === decoded || a.name === clean) return a;
  }

  // 3. Normalized slug / name match (handles hamzas, ة/ه, ى/ي, tashkeel)
  for (const a of areasList) {
    if (normalizeArabic(a.slug) === norm || normalizeArabic(a.name) === norm) {
      return a;
    }
  }

  // 4. Exact match with keywords (normalized)
  for (const a of areasList) {
    if (a.keywords && a.keywords.some(k => normalizeArabic(k) === norm)) {
      return a;
    }
  }

  // 5. Keyword contains input or input contains keyword
  for (const a of areasList) {
    if (a.keywords && a.keywords.some(k => {
      const normK = normalizeArabic(k);
      return normK.includes(norm) || norm.includes(normK);
    })) {
      return a;
    }
  }

  // 6. Core prefix-stripped match against area name
  if (core && core.length >= 3) {
    for (const a of areasList) {
      const aCore = stripCommonPrefixes(a.name);
      if (aCore === core) return a;
    }
  }

  // 7. Core prefix-stripped match against area slug
  if (core && core.length >= 3) {
    for (const a of areasList) {
      const aCoreSlug = stripCommonPrefixes(a.slug);
      if (aCoreSlug === core) return a;
    }
  }

  // 8. Contains match for distinctive location names
  if (core && core.length >= 4) {
    for (const a of areasList) {
      const aNorm = normalizeArabic(a.name);
      if (aNorm.includes(core) || core.includes(aNorm)) return a;
    }
  }

  return null;
};

/**
 * Resolves a slug to an area name, with comprehensive fuzzy error-tolerant fallback.
 */
export const getAreaNameFromSlug = (slug, areasList) => {
  if (!slug) return '';
  const area = findAreaByFuzzySlug(slug, areasList);
  if (area) {
    return area.name;
  }

  let decoded = slug;
  try {
    decoded = decodeURIComponent(slug);
  } catch (e) {
    decoded = slug;
  }
  return decoded.trim().replace(/-/g, ' ');
};
