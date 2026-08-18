import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Loader2, Calendar, Clock, User } from 'lucide-react';
import { articlesAPI } from '../../api/articlesApi';
import SEO from '../../components/seo/SEO';
import { cleanText as cleanPhone } from '../../utils/cleanText';
import './Articles.css';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchArticles = async () => {
      try {
        const data = await articlesAPI.getAll();
        setArticles(data);
      } catch (err) {
        console.error('Error fetching articles', err);
        setError('حدث خطأ أثناء تحميل المقالات. يرجى المحاولة لاحقاً.');
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="page-wrapper bg-light">
      <SEO
        title="مدونة ونصائح | ونش انقاذ السخنة"
        description="اقرأ أحدث المقالات والنصائح حول إنقاذ السيارات، التعامل مع الأعطال المفاجئة على الطرق، والقيادة الآمنة."
        path="/articles"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Blog",
              "@id": "https://www.winchelsokhna.com/articles#blog",
              "url": "https://www.winchelsokhna.com/articles",
              "name": "مدونة ونش انقاذ السخنة",
              "description": "اقرأ أحدث المقالات والنصائح حول إنقاذ السيارات والقيادة الآمنة."
            },
            {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "الرئيسية", "item": "https://www.winchelsokhna.com/" },
                { "@type": "ListItem", "position": 2, "name": "المقالات", "item": "https://www.winchelsokhna.com/articles" }
              ]
            }
          ]
        }}
      />
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">مكتبة المقالات والنصائح</h1>
          <nav aria-label="Breadcrumb" className="page-breadcrumb">
            <Link to="/">الرئيسية</Link> / <span>المقالات</span>
          </nav>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">نصائح من <span className="highlight">خبراء</span> الإنقاذ</h2>
            <p className="section-subtitle">
              إرشادات للقيادة الآمنة، معلومات عن صيانة السيارات دليلك الشامل على الطريق.
            </p>
          </div>

          {loading ? (
            <div className="articles-loader">
              <Loader2 size={60} className="spinner-icon" />
              <p>جاري تحميل المقالات...</p>
            </div>
          ) : error ? (
            <div className="articles-error">
              <p>{error}</p>
              <button className="btn-primary" onClick={() => window.location.reload()}>تحديث الصفحة</button>
            </div>
          ) : articles.length > 0 ? (
            <div className="articles-list-grid">
              {articles.map((article) => (
                <div key={article.id} className="article-list-card">
                  {article.image && (
                    <Link to={`/articles/${article.slug}`} className="article-list-image">
                      <img src={`https://winchenqaz.com${article.image}`} alt={cleanPhone(article.title)} width="400" height="250" loading="lazy" />
                      {article.category && (
                        <span className="article-badge-main">{article.category}</span>
                      )}
                    </Link>
                  )}

                  <div className="article-card-body">
                    <div className="article-meta-row">
                      <div className="meta-group flex-wrap">
                        {article.date && (
                          <span className="meta-info"><Calendar size={14} /> {formatDate(article.date)}</span>
                        )}
                        {article.author && (
                          <span className="meta-info"><User size={14} /> {cleanPhone(article.author)}</span>
                        )}
                        {article.read_time && (
                          <span className="meta-info"><Clock size={14} /> {article.read_time}</span>
                        )}
                      </div>
                    </div>

                    <h3 className="article-title-lg">
                      <Link to={`/articles/${article.slug}`}>{cleanPhone(article.title)}</Link>
                    </h3>

                    <p className="article-excerpt-lg">{cleanPhone(article.excerpt)}</p>

                    <div className="article-footer-row">
                      <Link to={`/articles/${article.slug}`} className="btn-secondary read-more-btn">
                        اقرأ المقال كاملاً <ArrowLeft size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p>عفواً، لا توجد مقالات متاحة في الوقت الحالي.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Articles;
