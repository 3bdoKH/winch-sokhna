import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, Calendar, Share2, User, Clock, Eye, Tag } from 'lucide-react';
import { getStaticArticleBySlug } from '../../data/allArticles';
import SEO from '../../components/seo/SEO';
import { cleanText } from '../../utils/cleanText';
import './ArticleDetails.css';

const ArticleDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const article = getStaticArticleBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (!article) {
    return (
      <div className="article-details-page bg-light">
        <div className="container" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
          <h2 style={{ color: 'var(--secondary)' }}>عذراً، هذا المقال غير متوفر</h2>
          <p>الصفحة التي تبحث عنها غير موجودة أو تم نقلها.</p>
          <button className="btn-primary" onClick={() => navigate('/articles')}>العودة لقائمة المقالات</button>
        </div>
      </div>
    );
  }

  const cleanTitle = cleanText(article.title);
  const cleanExcerpt = cleanText(article.excerpt);

  return (
    <div className="article-details-page bg-light">
      <SEO
        title={`${cleanTitle} | مدونة ونش انقاذ السخنة`}
        description={cleanExcerpt || cleanTitle}
        path={`/articles/${slug}`}
        image={article.image ? (article.image.startsWith('http') ? article.image : `https://www.winchelsokhna.com${article.image}`) : undefined}
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BlogPosting",
              "@id": `https://www.winchelsokhna.com/articles/${slug}#article`,
              "headline": cleanTitle,
              "description": cleanExcerpt || cleanTitle,
              "image": article.image ? (article.image.startsWith('http') ? article.image : `https://www.winchelsokhna.com${article.image}`) : "https://www.winchelsokhna.com/images/10.webp",
              "datePublished": article.date || new Date().toISOString(),
              "author": {
                "@type": "Person",
                "name": cleanText(article.author) || "ونش انقاذ السخنة"
              },
              "publisher": {
                "@type": "Organization",
                "name": "ونش انقاذ السخنة",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.winchelsokhna.com/images/10.webp"
                }
              },
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://www.winchelsokhna.com/articles/${slug}`
              }
            },
            {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "الرئيسية", "item": "https://www.winchelsokhna.com/" },
                { "@type": "ListItem", "position": 2, "name": "المقالات", "item": "https://www.winchelsokhna.com/articles" },
                { "@type": "ListItem", "position": 3, "name": cleanTitle, "item": `https://www.winchelsokhna.com/articles/${slug}` }
              ]
            }
          ]
        }}
      />
      <article className="container py-5">
        <div className="article-header-nav">
          <button className="btn-back-text" onClick={() => navigate('/articles')}>
            <ArrowRight size={20} /> العودة للمدونة
          </button>
        </div>

        <div className="article-content-wrapper">
          {article.image && (
            <div className="article-hero-image">
              <img src={article.image.startsWith('http') ? article.image : article.image} alt={cleanTitle} width="800" height="450" />
              {article.category && (
                <span className="hero-category-badge">{article.category}</span>
              )}
              {article.featured && (
                <span className="hero-featured-badge">مقالة مميزة</span>
              )}
            </div>
          )}

          <header className={`article-main-header ${article.image ? 'with-hero' : ''}`}>
            <h1 className="article-main-title">{cleanTitle}</h1>

            <div className="article-meta-info-bar">
              {article.author && (
                <span className="info-badge">
                  <User size={16} /> {cleanText(article.author)}
                </span>
              )}
              {article.date && (
                <span className="info-badge">
                  <Calendar size={16} /> {formatDate(article.date)}
                </span>
              )}
              {article.read_time && (
                <span className="info-badge">
                  <Clock size={16} /> {article.read_time}
                </span>
              )}
              {article.views !== undefined && (
                <span className="info-badge">
                  <Eye size={16} /> {article.views} مشاهدة
                </span>
              )}
              <button
                className="info-badge action"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('تم نسخ رابط المقال للمشاركة');
                }}
              >
                <Share2 size={16} /> مشاركة
              </button>
            </div>

            {article.excerpt && (
              <p className="article-lead-excerpt">{cleanExcerpt}</p>
            )}
          </header>

          <div
            className="article-html-content"
            dangerouslySetInnerHTML={{ __html: cleanText(article.content) }}
          />

          {article.tags && article.tags.length > 0 && (
            <div className="article-tags-wrapper">
              <h4 className="tags-title"><Tag size={20} /> الوسوم الدلالية:</h4>
              <div className="tags-list">
                {article.tags.map((tag, index) => (
                  <span key={index} className="article-tag">#{tag}</span>
                ))}
              </div>
            </div>
          )}

          <footer className="article-footer">
            <div className="share-section">
              <h3>هل وجدت هذا المقال مفيداً؟</h3>
              <p>شاركه مع أصدقائك لتعم الفائدة والتوعية بالطرق السليمة على الطريق.</p>
              <div className="share-buttons">
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noreferrer" className="btn-primary share-btn fb">شارك على فيسبوك</a>
                <a href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${article.title}`} target="_blank" rel="noreferrer" className="btn-primary share-btn tw">غرد على تويتر</a>
                <a href={`https://wa.me/?text=${article.title} - ${window.location.href}`} target="_blank" rel="noreferrer" className="btn-primary share-btn wa">شارك عبر واتساب</a>
              </div>
            </div>
          </footer>
        </div>
      </article>
    </div>
  );
};

export default ArticleDetails;
