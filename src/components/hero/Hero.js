import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, ShieldCheck, Zap, Percent } from 'lucide-react';
import { phoneNumbers } from '../../data/phoneNumbers';
import './Hero.css';

const Hero = () => {
  const primaryPhone = phoneNumbers[0];

  return (
    <section className="hero">
      <div className="container hero-container">

        <div className="hero-content">
          <div className="discount-tag">
            <Percent size={18} />
            <span>خصم 25% على جميع الخدمات اليوم!</span>
          </div>

          <h1 className="hero-title">
            أسرع ونش إنقاذ سيارات في <span className="highlight">السخنة</span> وجميع المحافظات
          </h1>

          <p className="hero-description">
            نقدم خدمات إنقاذ السيارات، نقل المعدات، وتغيير الإطارات على مدار 24 ساعة. نصلك أينما كنت بأقصى سرعة لضمان سلامتك وسلامة سيارتتك.
          </p>

          <div className="hero-features">
            <div className="hero-feature">
              <Zap size={24} className="feature-icon" />
              <span>وصول سريع</span>
            </div>
            <div className="hero-feature">
              <ShieldCheck size={24} className="feature-icon" />
              <span>أمان تام</span>
            </div>
          </div>

          <div className="hero-actions">
            <a href={`tel:${primaryPhone}`} className="btn-primary hero-btn">
              <Phone size={24} />
              <span className="btn-text">
                <span className="btn-sub">اتصل الآن للإنقاذ</span>
                <span className="btn-phone" dir="ltr">{primaryPhone}</span>
              </span>
            </a>
            <Link to="/services" className="btn-secondary hero-btn-outline">
              تصفح خدماتنا
            </Link>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <img src="/images/hero.png" alt="ونش انقاذ السخنة" className="hero-img" />
        </div>

      </div>
    </section>
  );
};

export default Hero;
