import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, Loader2, Calendar, Share2, User, Clock, Eye, Tag } from 'lucide-react';
import { articlesAPI } from '../../api/articlesApi';
import './ArticleDetails.css';

const ArticleDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchArticle = async () => {
      try {
        setLoading(true);
        const data = await articlesAPI.getBySlug(slug);
        if (data) {
          setArticle(data);
          document.title = `${data.title} | مدونة ونش انقاذ السخنة`;
        } else {
          setError('المقال غير موجود.');
        }
      } catch (err) {
        console.error('Error fetching article', err);
        setError('حدث خطأ أثناء تحميل المقال. قد يكون المقال غير متاح أو هناك مشكلة بالاتصال.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="article-details-page bg-light">
        <div className="container" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="text-center">
            <Loader2 size={60} className="spinner-icon" style={{ animation: 'spin 1s linear infinite' }} />
            <p className="mt-3">جاري تحميل المقال...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="article-details-page bg-light">
        <div className="container" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
          <h2 style={{ color: 'var(--secondary)' }}>تنبيه!</h2>
          <p>{error || 'هذا المقال غير موجود.'}</p>
          <button className="btn-primary" onClick={() => navigate('/articles')}>العودة لقائمة المقالات</button>
        </div>
      </div>
    );
  }

  return (
    <div className="article-details-page bg-light">
      <article className="container py-5">
        <div className="article-header-nav">
          <button className="btn-back-text" onClick={() => navigate('/articles')}>
            <ArrowRight size={20} /> العودة للمدونة
          </button>
        </div>

        <div className="article-content-wrapper">
          {article.image && (
            <div className="article-hero-image">
              <img src={`https://winchenqaz.com${article.image}`} alt={article.title} />
              {article.category && (
                <span className="hero-category-badge">{article.category}</span>
              )}
              {article.featured && (
                <span className="hero-featured-badge">مقالة مميزة</span>
              )}
            </div>
          )}

          <header className={`article-main-header ${article.image ? 'with-hero' : ''}`}>
            <h1 className="article-main-title">{article.title}</h1>

            <div className="article-meta-info-bar">
              {article.author && (
                <span className="info-badge">
                  <User size={16} /> {article.author}
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
              <p className="article-lead-excerpt">{article.excerpt}</p>
            )}
          </header>

          <div
            className="article-html-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
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
