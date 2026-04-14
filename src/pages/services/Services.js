import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Truck, Fuel, BatteryCharging, Wrench, Settings, CheckCircle2, Phone, Route, SearchCode, ShieldCheck, Clock, Star, ArrowLeft } from 'lucide-react';
import { phoneNumbers } from '../../data/phoneNumbers';
import './Services.css';

const detailedServices = [
  {
    id: 1,
    title: 'إنقاذ وسحب السيارات',
    icon: <Truck size={48} />,
    desc: 'خدمة أساسية لإنقاذ السيارات المعطلة أو المتعرضة لحوادث. نستخدم أوناش هيدروليكية حديثة (ونش مسطح) تضمن رفع السيارة ونقلها دون أي تلامس يسبب خدوش أو ضرر بالهيكل الخارجي. الخدمة متاحة للسيارات الملاكي، الرياضية المنخفضة، وسيارات الدفع الرباعي.',
    features: ['متاح 24/7', 'تغطية شاملة', 'أوناش حديثة آمنة'],
    image: '/images/1.jpeg'
  },
  {
    id: 2,
    title: 'نقل المعدات والآلات',
    icon: <Settings size={48} />,
    desc: 'نمتلك أوناش مجهزة للتعامل مع الأحمال الثقيلة، حيث نقدم خدمات نقل المعدات الزراعية، والصناعية، والمولدات الكهربائية، وحتى الأكشاك ومعدات البناء الخفيفة من وإلى مواقع العمل بكل أمان واحترافية.',
    features: ['روافع قوية', 'تأمين كامل للحمولة', 'سائقين محترفين'],
    image: '/images/2.jpeg'
  },
  {
    id: 3,
    title: 'تزويد الوقود على الطريق',
    icon: <Fuel size={48} />,
    desc: 'الكثير منا ينسى متابعة مؤشر البنزين، أو يعلق في زحام مروري وتنفد منه الكمية. نحن نوفر خدمة الدعم السريع لتزويدك بالوقود (بنزين أو سولار) الكافي لوصولك لأقرب محطة وقود لضمان عدم تعطل يومك.',
    features: ['استجابة سريعة', 'أنواع وقود مختلفة', 'تكلفة مناسبة'],
    image: '/images/3.jpeg'
  },
  {
    id: 4,
    title: 'شحن وتغيير البطارية',
    icon: <BatteryCharging size={48} />,
    desc: 'مشكلة بسيطة كنفاد البطارية قد تعطلك لساعات. نوفر خدمة عمل "وصلة بطارية" لتشغيل سيارتك مجدداً، أو حتى توفير وطاقم لتغيير البطارية إذا لزم الأمر في مكان تعطل السيارة دون الحاجة لقطرها.',
    features: ['حلول فورية في المكان', 'فنيين متخصصين', 'تشخيص العطل الصحيح'],
    image: '/images/4.jpeg'
  },
  {
    id: 5,
    title: 'تغيير الإطارات',
    icon: <Wrench size={48} />,
    desc: 'ثقب الإطار على طريق سريع أمر خطير ويحتاج لتعامل فوري. نصلك لفك الإطار التالف وتركيب الإطار الاحتياطي بسرعة وأمان، مع توفر معدات فك هواء كهربائية لتوفير الوقت والجهد في أصعب المواقف.',
    features: ['أمان على الطرق السريعة', 'معدات متطورة', 'توفير الوقت'],
    image: '/images/5.jpeg'
  },
  {
    id: 6,
    title: 'نقل السيارات لمسافات طويلة',
    icon: <Route size={48} />,
    desc: 'هل اشتريت سيارة في مدينة أخرى وتريد نقلها؟ أو تحتاج لنقل سيارتك لورشة متخصصة بعيدة؟ نوفر خدمة نقل السيارات لمسافات طويلة بين المحافظات على أوناش مسطحة مغطاة تحمي سيارتك من الأتربة والخدوش طوال الرحلة.',
    features: ['نقل بين المحافظات', 'أوناش مسطحة مغطاة', 'تأمين أثناء النقل'],
    image: '/images/6.jpeg'
  },
  {
    id: 7,
    title: 'كشف الأعطال والتشخيص الإلكتروني',
    icon: <SearchCode size={48} />,
    desc: 'لا تعرف ما المشكلة في سيارتك؟ يصلك فنيونا المؤهلون بأجهزة تشخيص الأعطال الإلكترونية لقراءة كودات الأعطال بدقة، وتحديد المشكلة الحقيقية قبل أن تتفاقم. نوفر تقريراً مفصلاً بالعطل والحل المقترح.',
    features: ['تشخيص إلكتروني دقيق', 'فنيين معتمدين', 'تقرير مفصل بالأعطال'],
    image: '/images/7.jpeg'
  }
];

const whyChooseUs = [
  { icon: <Clock size={36} />, title: 'استجابة فورية', desc: 'وصول خلال 20 دقيقة في المتوسط' },
  { icon: <ShieldCheck size={36} />, title: 'أمان مضمون', desc: 'أوناش مسطحة حديثة لا تخدش سيارتك' },
  { icon: <Star size={36} />, title: '+5000 عميل راضٍ', desc: 'سجل حافل من الثقة والاحترافية' }
];

const Services = () => {
  const primaryPhone = phoneNumbers[0];

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "خدماتنا | ونش انقاذ السخنة";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'جميع خدمات ونش انقاذ السخنة: سحب سيارات، تزويد وقود، شحن بطاريات، تغيير إطارات، نقل معدات، وكشف أعطال. خدمة 24 ساعة 7 أيام.');
    }
  }, []);

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">خدمات الإنقاذ والدعم</h1>
          <p className="page-breadcrumb">
            <Link to="/">الرئيسية</Link> / <span>خدماتنا</span>
          </p>
        </div>
      </div>

      {/* Why Choose Us Bar */}
      <section className="why-choose-bar">
        <div className="container">
          <div className="why-choose-grid">
            {whyChooseUs.map((item, i) => (
              <div key={i} className="why-choose-item">
                <div className="why-choose-icon">{item.icon}</div>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">حلول متكاملة في <span className="highlight">الطوارئ</span></h2>
            <p className="section-subtitle">
              نحن نقدم الدعم الكامل لك ولعائلتك ولسيارتك على أي طريق وفي أي وقت لضمان رحلة آمنة.
            </p>
          </div>

          <div className="detailed-services-list">
            {detailedServices.map((service) => (
              <div key={service.id} className="detailed-service-card">
                <div className="service-image-thumb">
                  <img src={service.image} alt={service.title} loading="lazy" />
                  <div className="service-icon-large">
                    {service.icon}
                  </div>
                </div>
                <div className="service-card-content">
                  <h3 className="service-title-lg">{service.title}</h3>
                  <p className="service-desc-full">{service.desc}</p>
                  <ul className="service-features-list">
                    {service.features.map((feature, i) => (
                      <li key={i}>
                        <CheckCircle2 size={18} className="check-icon" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="services-cta-section">
        <div className="services-cta-bg" style={{ backgroundImage: 'url(/images/8.jpeg)' }} />
        <div className="container services-cta-content">
          <h2>محتاج مساعدة؟ نحن هنا الآن</h2>
          <p>لا تتردد. فريقنا جاهز على مدار الساعة لإنقاذك في أي مكان.</p>
          <div className="services-cta-btns">
            <a href={`tel:${primaryPhone}`} className="btn-primary">
              <Phone size={20} />
              اتصل الآن: <span dir="ltr">{primaryPhone}</span>
            </a>
            <Link to="/areas" className="btn-outline-white">
              اعرف منطقتك
              <ArrowLeft size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
