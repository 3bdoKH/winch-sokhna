import React from 'react';
import './Keywords.css';

const Keywords = () => {
  const seoKeywords = [
    "ونش انقاذ السخنة", "ارخص ونش انقاذ", "رقم ونش سيارات",
    "اسرع ونش انقاذ", "ونش إنقاذ القاهرة", "ونش انقاذ طريق السويس",
    "تغيير اطارات", "تزويد وقود", "انقاذ سيارات 24 ساعة",
    "ونش مسطح", "ونش رفع سيارات", "ارقام ونش انقاذ السخنه",
    "خدمة المساعدة على الطريق", "ونش انقاذ الجيزة", "ارخص ونش سيارات"
  ];

  return (
    <section className="keywords-section bg-light">
      <div className="container">
        <h3 className="sr-only">الكلمات الدليلية للبحث</h3>
        <div className="keywords-container">
          {seoKeywords.map((keyword, index) => (
            <span key={index} className="keyword-tag">
              #{keyword}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Keywords;
