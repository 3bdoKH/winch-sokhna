import React from 'react';
import { Clock, ThumbsUp, Shield, Zap } from 'lucide-react';
import './WhatWeOffer.css';

const WhatWeOffer = () => {
  const offers = [
    {
      id: 1,
      title: 'خدمة 24 ساعة',
      description: 'نعمل على مدار الساعة وطوال أيام الأسبوع لنكون بجانبك في أي وقت تواجه فيه مشكلة على الطريق.',
      icon: <Clock size={36} />
    },
    {
      id: 2,
      title: 'وصول أسرع',
      description: 'لدينا أسطول كبير من الأوناش الموزعة بذكاء لضمان وصولنا إليك في أقصر وقت ممكن.',
      icon: <Zap size={36} />
    },
    {
      id: 3,
      title: 'أمان وثقة',
      description: 'نستخدم أحدث المعدات ونتبع أعلى معايير السلامة لضمان نقل سيارتك بدون أي خدوش أو تلفيات.',
      icon: <Shield size={36} />
    },
    {
      id: 4,
      title: 'أسعار تنافسية',
      description: 'نقدم أفضل الخدمات بأسعار معقولة وتنافسية مع خصومات خاصة للخدمات المستمرة.',
      icon: <ThumbsUp size={36} />
    }
  ];

  return (
    <section className="what-we-offer section">
      <div className="container">

        <div className="offer-wrapper">
          <div className="offer-image-side">
            <img src="/images/2.jpeg" alt="ونش انقاذ اثناء العمل" className="offer-img" />
            <div className="experience-badge">
              <span className="years">15+</span>
              <span className="text-exp">عاماً من<br />الخبرة</span>
            </div>
          </div>

          <div className="offer-content-side">
            <h2 className="section-title">لماذا تختار <span className="highlight">ونش انقاذ السخنة</span>؟</h2>
            <p className="offer-intro">
              لسنا مجرد خدمة سحب سيارات، بل نحن شركاؤك على الطريق في أوقات الأزمات. نلتزم بتقديم خدمة تفوق التوقعات لضمان راحتك.
            </p>

            <div className="offer-list">
              {offers.map(offer => (
                <div key={offer.id} className="offer-item">
                  <div className="offer-icon">
                    {offer.icon}
                  </div>
                  <div>
                    <h3 className="offer-item-title">{offer.title}</h3>
                    <p className="offer-item-desc">{offer.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhatWeOffer;
