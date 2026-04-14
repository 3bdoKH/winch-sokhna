import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, ShieldCheck, MapPin, Clock } from 'lucide-react';
import { phoneNumbers } from '../../data/phoneNumbers';
import './Hero.css';

const Hero = () => {
  const primaryPhone = phoneNumbers[0];

  return (
    <section className="hero">
      {/* Full-bleed background */}
      <div className="hero-bg">
        <img src="/images/hero.png" alt="" aria-hidden="true" className="hero-bg-img" />
        <div className="hero-overlay" />
      </div>

      {/* Discount corner ribbon */}
      <div className="discount-badge">
        <div className="discount-circle">
          <span className="discount-percent">25%</span>
          <span className="discount-text">خصم</span>
        </div>
      </div>

      {/* Main content */}
      <div className="container hero-container">

        {/* Left trust card */}
        <div className="hero-trust-card">
          <div className="trust-icon-wrap">
            <ShieldCheck size={32} />
          </div>
          <h3 className="trust-title">خدمة موثوقة</h3>
          <p className="trust-desc">أكثر من 5,000 عملية إنقاذ ناجحة في السخنة والمحافظات المجاورة</p>
        </div>

        {/* Right text content */}
        <div className="hero-content">
          {/* 24/7 badge */}
          <div className="hero-badge">
            <span className="badge-dot" />
            <span>خدمة إنقاذ سريعة 24/7</span>
          </div>

          <h1 className="hero-title">
            أسرع <span className="highlight">ونش إنقاذ</span><br />
            في السخنة الآن
          </h1>

          <p className="hero-description">
            نقدم خدمات سحب وإنقاذ احترافية بأسعار تنافسية. فريقنا مجهز بأحدث المعدات لضمان سلامة سيارتك وتوصيلها بأمان.
          </p>

          <div className="hero-actions">
            <a href={`tel:${primaryPhone}`} className="hero-btn-primary">
              <Phone size={20} />
              <span className="btn-text">
                <span className="btn-sub">اطلب مساعدة فورية</span>
                <span className="btn-phone" dir="ltr">{primaryPhone}</span>
              </span>
            </a>
            <Link to="/services" className="hero-btn-outline">
              عرض خدماتنا
              <span className="btn-arrow">›</span>
            </Link>
          </div>
        </div>

      </div>

      {/* Bottom stats bar */}
      <div className="hero-stats-bar">
        <div className="container hero-stats-inner">
          <div className="stat-item">
            <Clock size={18} />
            <span><strong>20 دقيقة</strong> وصول</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <MapPin size={18} />
            <span>تغطية <strong>جميع المحافظات</strong></span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <ShieldCheck size={18} />
            <span><strong>أمان تام</strong> لسيارتك</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
