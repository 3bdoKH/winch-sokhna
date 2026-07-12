import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Award, Users, Clock, Truck, ShieldCheck, Star, Phone, ArrowLeft } from 'lucide-react';
import Stats from '../../components/stats/Stats';
import WhatWeOffer from '../../components/whatWeOffer/WhatWeOffer';
import { phoneNumbers } from '../../data/phoneNumbers';
import './About.css';

const fleetImages = [
  { src: '/images/12.webp', alt: 'ونش انقاذ على الطريق' },
  { src: '/images/13.webp', alt: 'سحب سيارة تالفة' },
  { src: '/images/14.webp', alt: 'كشف أعطال ميداني' },
  { src: '/images/15.webp', alt: 'نقل سيارة بأمان' },
  { src: '/images/16.webp', alt: 'فريق الإنقاذ' },
  { src: '/images/17.webp', alt: 'ونش مسطح حديث' },
];

const whyUs = [
  { icon: <Clock size={32} />, title: 'استجابة خلال 20 دقيقة', desc: 'نضمن الوصول لموقعك في أسرع وقت ممكن في جميع المناطق.' },
  { icon: <Truck size={32} />, title: 'أسطول متطور', desc: 'أوناش مسطحة هيدروليكية حديثة تحافظ على سيارتك بالكامل.' },
  { icon: <ShieldCheck size={32} />, title: 'أمان وضمان', desc: 'نقدم ضماناً كاملاً للحفاظ على سيارتك دون تلفيات إضافية.' },
  { icon: <Star size={32} />, title: 'خبرة وكفاءة', desc: 'فريق من أمهر السائقين والفنيين بخبرات واسعة في المجال.' },
];

const timeline = [
  { year: '2015', title: 'التأسيس', desc: 'بدأنا بثلاثة أوناش متخصصة في طريق العين السخنة.' },
  { year: '2017', title: 'التوسع الأول', desc: 'توسعنا لتغطية محافظتي السويس والإسماعيلية.' },
  { year: '2019', title: 'تطوير الأسطول', desc: 'أضفنا أوناشاً مسطحة حديثة وفريقاً متخصصاً للتشخيص الإلكتروني.' },
  { year: '2021', title: 'التغطية الوطنية', desc: 'أصبحنا نغطي معظم محافظات مصر بشبكة أوناش واسعة.' },
  { year: '2024', title: 'الرقم الواحد', desc: 'تجاوزنا 5000 عملية إنقاذ ناجحة، محققين أعلى معدلات رضا عملاء.' },
];

const About = () => {
  const primaryPhone = phoneNumbers[0];

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "من نحن | ونش انقاذ السخنة";
  }, []);

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">من نحن</h1>
          <p className="page-breadcrumb">
            <Link to="/">الرئيسية</Link> / <span>من نحن</span>
          </p>
        </div>
      </div>

      {/* Story Section */}
      <section className="section basic-story">
        <div className="container">
          <div className="about-story-grid">
            <div className="story-content">
              <h2 className="section-title">نبذة عن <span className="highlight">ونش انقاذ السخنة</span></h2>
              <p>
                نحن فريق متخصص في الإنقاذ البري وتقديم المساعدة على الطرق بشتى أنواعها. بدأنا رحلتنا بهدف واضح وهو توفير الأمان والسرعة والاحترافية لكل قائد سيارة يواجه مشكلة مفاجئة. ونظراً لطبيعة طريق العين السخنة الحيوي، تخصصنا وكبرنا لنصبح الشبكة الأكبر.
              </p>
              <p>
                اليوم نحن نمتلك أسطولاً من الأوناش المتطورة، وفريقاً من أكفأ السائقين والفنيين القادرين على التعامل مع أحدث السيارات دون تعريضها لخدش واحد. نعمل على مدار الساعة في معظم محافظات مصر لضمان حصولك على الخدمة في أي وقت تريده.
              </p>
              
              <ul className="mission-vision">
                <li>
                  <strong className="mv-title">رؤيتنا:</strong> أن نصبح الخيار الأول والأكثر موثوقية في مصر لتدخلات الطوارئ على الطرق.
                </li>
                <li>
                  <strong className="mv-title">مهمتنا:</strong> انقاذك بأسرع وقت وأقل تكلفة، والحفاظ على سلامتك وسلامة سيارتك وتلبية احتياجاتك التامة.
                </li>
              </ul>
            </div>
            <div className="story-highlights">
              <div className="highlight-card">
                <Award size={40} className="highlight-icon" />
                <span className="highlight-num">+5000</span>
                <span className="highlight-label">عملية إنقاذ ناجحة</span>
              </div>
              <div className="highlight-card">
                <Users size={40} className="highlight-icon" />
                <span className="highlight-num">+50</span>
                <span className="highlight-label">فني ومشغل محترف</span>
              </div>
              <div className="highlight-card">
                <Clock size={40} className="highlight-icon" />
                <span className="highlight-num">24/7</span>
                <span className="highlight-label">خدمة لا تتوقف</span>
              </div>
              <div className="highlight-card">
                <Truck size={40} className="highlight-icon" />
                <span className="highlight-num">+20</span>
                <span className="highlight-label">ونش في الأسطول</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Gallery */}
      <section className="section fleet-gallery-section bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">أسطولنا و<span className="highlight">أعمالنا</span></h2>
            <p className="section-subtitle">صور حقيقية من عمليات الإنقاذ والنقل التي نفذها فريقنا على الطرق المصرية</p>
          </div>
          <div className="fleet-photo-grid">
            {fleetImages.map((img, i) => (
              <div key={i} className={`fleet-photo-item ${i === 0 ? 'featured' : ''}`}>
                <img src={img.src} alt={img.alt} loading="lazy" />
                <div className="fleet-photo-overlay">
                  <span>{img.alt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section timeline-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">مسيرة <span className="highlight">النجاح</span></h2>
            <p className="section-subtitle">رحلتنا من البداية حتى أصبحنا الشبكة الأوسع في مصر</p>
          </div>
          <div className="timeline">
            {timeline.map((item, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-year">{item.year}</div>
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section bg-light why-us-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">لماذا تختار <span className="highlight">ونش السخنة</span>؟</h2>
          </div>
          <div className="why-us-grid">
            {whyUs.map((item, i) => (
              <div key={i} className="why-us-card">
                <div className="why-us-icon">{item.icon}</div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reuse homepage sections */}
      <WhatWeOffer />
      <Stats />

      {/* CTA Banner */}
      <section className="about-cta-section">
        <div className="about-cta-bg" style={{ backgroundImage: 'url(/images/18.webp)' }} />
        <div className="container about-cta-inner">
          <h2>هل أنت في موقف طارئ؟</h2>
          <p>أسرع ونش انقاذ في مصر — اتصل بنا الآن ونصلك في أقل من 30 دقيقة.</p>
          <div className="about-cta-btns">
            <a href={`tel:${primaryPhone}`} className="btn-primary">
              <Phone size={20} />
              اتصل الآن
            </a>
            <Link to="/contact" className="btn-outline-white">
              تواصل معنا
              <ArrowLeft size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
