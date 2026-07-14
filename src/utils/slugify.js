// Arabic SEO Slugify Utility

export const slugify = (text) => {
  if (!text) return '';
  const normalizedText = text.trim();

  // For Arabic SEO, we keep the Arabic characters.
  // We simply replace spaces with dashes and remove English non-word characters
  // but keep Arabic letters.
  return normalizedText
    .replace(/ /g, '-')
    // Remove characters that are not Arabic letters, English letters, numbers, or dashes
    .replace(/[^\u0600-\u06FFa-zA-Z0-9-]/g, '')
    .replace(/--+/g, '-')    // Replace multiple dashes with single dash
    .replace(/^-+/, '')      // Trim dashes from start
    .replace(/-+$/, '');     // Trim dashes from end
};

export const getAreaNameFromSlug = (slug, areasList) => {
  if (!slug) return '';
  
  // First, un-slugify the basic dashes to spaces to see if it perfectly matches an area
  const maybeName = slug.replace(/-/g, ' ');
  
  if (areasList && Array.isArray(areasList)) {
    for (const gov of areasList) {
      if (gov.name === maybeName || slugify(gov.name) === slug) return gov.name;
      for (const area of gov.areas) {
        if (area === maybeName || slugify(area) === slug) return area;
      }
    }
  }
  
  try {
    return decodeURIComponent(slug).replace(/-/g, ' ');
  } catch (e) {
    return maybeName;
  }
};
