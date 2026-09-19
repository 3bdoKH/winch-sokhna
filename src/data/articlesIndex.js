import generatedIndex from './generated-articles-index.json';

export const allArticlesIndex = generatedIndex || [];

export const getRelatedStaticArticles = (currentSlug, count = 3) => {
  return allArticlesIndex
    .filter((a) => a.slug !== currentSlug)
    .slice(0, count);
};

export const getRecentArticles = (count = 3) => {
  return allArticlesIndex.slice(0, count);
};
