import React from 'react';
import { Link } from 'react-router-dom';
import { slugify } from '../../utils/slugify';
import { LEGACY_SLUG_REDIRECTS } from '../../data/legacyRedirects';
import { areas } from '../../data/areas';
import './Keywords.css';

const Keywords = () => {
  const seoKeywords = [
    "ونش انقاذ العين السخنة",
    "ونش انقاذ السخنة",
    "ونش انقاذ بورتو السخنة",
    "ونش انقاذ الجلالة",
    "ونش انقاذ جبل الجلالة",
    "ونش انقاذ طريق السخنة",
    "ونش انقاذ السويس",
    "ونش انقاذ الزعفرانة",
    "ونش انقاذ طريق الزعفرانة",
    "ونش انقاذ بور توفيق",
    "ونش انقاذ ميناء السويس",
    "ونش انقاذ طريق القاهرة السويس",
    "ونش انقاذ طريق الجلالة",
    "ونش سيارات العين السخنة",
    "ارخص ونش انقاذ السخنة"
  ];

  return (
    <section className="keywords-section bg-light">
      <div className="container">
        <h2 className="keywords-heading">الكلمات الأكثر بحثاً عن أوناش الإنقاذ في العين السخنة</h2>
        <div className="keywords-container">
          {seoKeywords.map((keyword, index) => {
            const rawSlug = slugify(keyword);
            const canonicalSlug = LEGACY_SLUG_REDIRECTS[rawSlug] || rawSlug;
            const targetArea = areas.find(a => a.slug === canonicalSlug);
            const areaLabel = targetArea ? targetArea.name : 'العين السخنة';
            return (
              <Link 
                key={index} 
                to={`/winch/${encodeURIComponent(canonicalSlug)}`} 
                className="keyword-tag"
                title={`خدمة ${keyword} — ${areaLabel}`}
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
