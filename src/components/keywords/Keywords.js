import React from 'react';
import { Link } from 'react-router-dom';
import { slugify } from '../../utils/slugify';
import { LEGACY_SLUG_REDIRECTS } from '../../data/legacyRedirects';
import './Keywords.css';

const Keywords = () => {
  const seoKeywords = [
    "ونش السخنه",
    "ونش انقاذ السخنه",
    "ونش العين السخنه",
    "ونش انقاذ العين السخنه",
    "ونش انقاذ العين السخنة",
    "ونش السخنة",
    "ونش العين السخنة",
    "ونش انقاذ السخنة",
    "رقم ونش انقاذ السخنة",
    "ونش انقاذ بورتو السخنة",
    "ونش انقاذ الجلالة",
    "ونش انقاذ طريق السخنة",
    "ارخص ونش انقاذ السخنة",
    "ونش سيارات العين السخنة",
    "ونش انقاذ السويس"
  ];

  return (
    <section className="keywords-section bg-light">
      <div className="container">
        <h2 className="keywords-heading">الكلمات الأكثر بحثاً عن أوناش الإنقاذ في العين السخنة</h2>
        <div className="keywords-container">
          {seoKeywords.map((keyword, index) => {
            const rawSlug = slugify(keyword);
            const canonicalSlug = LEGACY_SLUG_REDIRECTS[rawSlug] || rawSlug;
            return (
              <Link 
                key={index} 
                to={`/winch/${encodeURIComponent(canonicalSlug)}`} 
                className="keyword-tag"
                title={`خدمة ${keyword}`}
              >
                #{keyword}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Keywords;
