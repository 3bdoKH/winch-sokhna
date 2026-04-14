import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Loader2, Calendar } from 'lucide-react';
import { articlesAPI } from '../../api/articlesApi';
import './ArticlesSection.css';

const ArticlesSection = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await articlesAPI.getAll();
        setArticles(data.slice(0, 3)); // show top 3
      } catch (err) {
        console.error('Error fetching articles', err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  // Safe date formatter
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <section className="articles-preview section bg-light">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">أحدث <span className="highlight">المقالات</span> والنصائح</h2>
          <p className="section-subtitle">
            تابع مدونتنا الخاصة بنصائح القيادة، صيانة السيارات، وطرق التعامل مع الأعطال المفاجئة.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <Loader2 className="spinner-icon" size={40} />
            <p>جاري تحميل المقالات...</p>
          </div>
        ) : articles.length > 0 ? (
          <div className="articles-grid">
            {articles.map((article) => (
              <div key={article.id} className="article-card">
                {article.image && (
                  <div className="article-card-image">
                    <img src={`https://winchenqaz.com${article.image}`} alt={article.title} />
                    {article.category && (
                      <span className="article-badge">{article.category}</span>
                    )}
                  </div>
                )}

                <div className="article-card-body">
                  <div className="article-card-meta">
                    <span className="meta-info">
                      <Calendar size={14} /> {formatDate(article.date)}
                    </span>
                  </div>

                  <h3 className="article-title">{article.title}</h3>
                  <p className="article-excerpt">{article.excerpt}</p>

                  <Link to={`/articles/${article.slug}`} className="article-read-more">
                    اقرأ المزيد <ArrowLeft size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p>لا توجد مقالات متاحة حالياً.</p>
          </div>
        )}

        <div className="text-center mt-5">
          <Link to="/articles" className="btn-secondary">
            تصفح جميع المقالات
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;
