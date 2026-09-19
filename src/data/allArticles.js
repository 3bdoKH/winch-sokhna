import generatedArticles from './generated-articles.json';

const bySlug = new Map();
(generatedArticles || []).forEach((a) => {
  if (a && a.slug) {
    bySlug.set(a.slug, a);
    try {
      bySlug.set(decodeURIComponent(a.slug), a);
    } catch (e) {}
  }
});

export const getStaticArticleBySlug = (slug) => {
  if (!slug) return null;
  let decoded = slug;
  try {
    decoded = decodeURIComponent(slug);
  } catch (e) {}
  return bySlug.get(slug) || bySlug.get(decoded) || null;
};

export const getAllStaticArticles = () => generatedArticles || [];
