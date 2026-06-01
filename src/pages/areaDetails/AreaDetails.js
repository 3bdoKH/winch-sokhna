import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Phone, Clock, ShieldCheck, Zap, AlertTriangle, ArrowRight, CheckCircle2, HelpCircle, ChevronDown, MapPin, Wrench, Fuel, BatteryCharging, Route, ChevronLeft, Star, ThumbsUp, CarFront, Gauge, MessageCircle } from 'lucide-react';
import { phoneNumbers, whatsappNumbers } from '../../data/phoneNumbers';
import { areas } from '../../data/areas';
import './AreaDetails.css';

const workImages = [
  '/images/9.jpeg',
  '/images/10.jpeg',
  '/images/11.jpeg',
];

const AreaDetails = () => {
  const { areaName } = useParams();
  const primaryPhone = phoneNumbers[0];
  const whatsappNumber = (whatsappNumbers && whatsappNumbers[1]) || (whatsappNumbers && whatsappNumbers[0]) || phoneNumbers[1] || phoneNumbers[0];
  const [openFaq, setOpenFaq] = useState(null);

  const findGovernorate = (area) => {
    for (let gov of areas) {
      if (gov.name === area || gov.areas.includes(area)) {
        return gov.name;
      }
    }
    return "مصر";
  };

  const getNearbyAreas = (area) => {
    for (let gov of areas) {
      if (gov.areas.includes(area)) {
        return gov.areas.filter(a => a !== area).slice(0, 8);
      }
    }
    return [];
  };

  const governorate = findGovernorate(areaName);
  const nearbyAreas = getNearbyAreas(areaName);

  const faqs = [
    {
      q: `كم تستغرق الاستجابة لونش انقاذ في ${areaName}؟`,
      a: `في معظم الحالات، يصل ونش الإنقاذ إلى ${areaName} في غضون 15 إلى 30 دقيقة من لحظة الاتصال، وذلك حسب موقعك الدقيق وكثافة المرور. لدينا وحدات متمركزة في نقاط استراتيجية لضمان أسرع استجابة ممكنة.`
    },
    {
      q: `هل الخدمة متاحة 24 ساعة في ${areaName}؟`,
      a: `نعم، خدمة الإنقاذ في ${areaName} متاحة على مدار الساعة، 7 أيام في الأسبوع، 365 يوم في السنة. لا فرق بين يوم وليلة أو عطلة رسمية — فريقنا دائماً جاهز.`
    },
    {
      q: `ما أنواع السيارات التي يمكن سحبها في ${areaName}؟`,
      a: `نتعامل مع جميع أنواع السيارات في ${areaName}: الملاكي، الدفع الرباعي، السيارات الرياضية المنخفضة، الميني باص، وحتى سيارات النقل الخفيف. أوناشنا المسطحة تضمن الرفع الآمن دون أي تلامس بالهيكل.`
    },
    {
      q: `كم يبلغ سعر ونش الانقاذ في ${areaName}؟`,
      a: `السعر يتحدد بناءً على المسافة المطلوبة، نوع السيارة، وطبيعة العطل. نقدم أسعاراً تنافسية شفافة بدون مصاريف مخفية، مع خصم يصل إلى 25%. اتصل بنا للحصول على سعر فوري.`
    },
    {
      q: `هل يمكن سحب سيارتي بعد حادث في ${areaName}؟`,
      a: `بالتأكيد. فريقنا متخصص في التعامل مع سيارات ما بعد الحوادث في ${areaName} بكل احترافية وحرص. نستخدم أوناشاً مسطحة هيدروليكية لرفع السيارة دون إلحاق أي أضرار إضافية بها.`
    },
  ];

  const servicesList = [
    { icon: <Wrench size={18} />, label: 'سحب وإنقاذ السيارات' },
    { icon: <Fuel size={18} />, label: 'تزويد وقود على الطريق' },
    { icon: <BatteryCharging size={18} />, label: 'شحن وتغيير البطارية' },
    { icon: <Wrench size={18} />, label: 'تغيير الإطارات' },
    { icon: <Route size={18} />, label: 'نقل لمسافات طويلة' },
    { icon: <Zap size={18} />, label: 'كشف الأعطال الإلكتروني' },
  ];

  const howItWorks = [
    { step: '01', title: 'اتصل بنا', desc: `اتصل بنا أو أرسل موقعك عبر واتساب، وسيرد عليك مندوبنا فوراً لتسجيل بلاغك في ${areaName}.` },
    { step: '02', title: 'أكد موقعك', desc: `أرسل لنا موقعك على الخريطة ليتمكن فريقنا من الوصول إليك بدقة في ${areaName} دون تأخير.` },
    { step: '03', title: 'وصول سريع', desc: `يصلك أقرب ونش انقاذ في ${areaName} خلال 15-30 دقيقة جاهزاً بكل المعدات اللازمة.` },
    { step: '04', title: 'حل المشكلة', desc: `نحل مشكلة سيارتك في المكان أو ننقلها لأقرب ورشة متخصصة بأمان تام.` },
  ];

  const breakdownCauses = [
    { icon: <BatteryCharging size={22} />, cause: 'نفاد البطارية أو موتها', tip: 'الأكثر شيوعاً، يحدث غالباً في الصباح أو بعد ترك الأنوار مضاءة.' },
    { icon: <Gauge size={22} />, cause: 'نفاد الوقود المفاجئ', tip: 'يحدث على الطرق السريعة خاصةً، ونحن نصلك بالوقود في مكانك.' },
    { icon: <CarFront size={22} />, cause: 'ثقب أو انفجار الإطار', tip: 'خطير على الطريق السريع — توقف بأمان واتصل بنا فوراً.' },
    { icon: <Wrench size={22} />, cause: 'عطل مفاجئ في المحرك', tip: 'لا تحاول تشغيل السيارة بالقوة — أوقفها وانتظر فريقنا.' },
    { icon: <Zap size={22} />, cause: 'أعطال كهربائية أو إلكترونية', tip: 'فريقنا مجهز بأجهزة تشخيص لكشف الكود الإلكتروني للعطل.' },
    { icon: <AlertTriangle size={22} />, cause: 'حوادث وتصادمات', tip: 'نتعامل مع السيارات المتضررة بحذر تام دون إلحاق مزيد من الضرر.' },
  ];

  const testimonials = [
    {
      name: 'محمد أحمد',
      rating: 5,
      text: `خدمة ممتازة! الونش وصل خلال 20 دقيقة في ${areaName} وسحب سيارتي بكل احترافية. الأسعار منطقية جداً.`,
      date: 'منذ أسبوعين'
    },
    {
      name: 'سارة محمود',
      rating: 5,
      text: `انقطعت بطاريتي في منتصف الليل في ${areaName} وكنت خايفة جداً، لكن الفريق وصل بسرعة وساعدني. شكراً جزيلاً.`,
      date: 'منذ شهر'
    },
    {
      name: 'عمر حسين',
      rating: 5,
      text: `نقلوا سيارتي من ${areaName} للورشة بأمان وبسعر معقول. الونش المسطح لم يخدش السيارة بالمرة. سأتصل بهم مرة أخرى بالتأكيد.`,
      date: 'منذ 3 أسابيع'
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `رقم ونش انقاذ ${areaName} | أسرع سيارة انقاذ في ${governorate}`;

    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = `ونش انقاذ ${areaName} - خدمة سحب سيارات 24 ساعة في ${areaName} و${governorate}. اتصل الآن للحصول على أسرع استجابة وأفضل سعر. رقم ونش ${areaName}: ${primaryPhone}`;

    // JSON-LD Structured Data
    const existingScript = document.getElementById('area-jsonld');
    if (existingScript) existingScript.remove();

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'area-jsonld';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": `ونش انقاذ ${areaName}`,
      "description": `خدمة ونش انقاذ وسحب سيارات في ${areaName}، ${governorate}. متاح 24 ساعة.`,
      "telephone": primaryPhone,
      "areaServed": {
        "@type": "AdministrativeArea",
        "name": areaName
      },
      "openingHours": "Mo-Su 00:00-23:59",
      "priceRange": "$$",
      "serviceType": "مساعدة على الطريق، سحب سيارات",
    });
    document.head.appendChild(script);

    return () => {
      const s = document.getElementById('area-jsonld');
      if (s) s.remove();
    };
  }, [areaName, governorate, primaryPhone]);

  return (
    <div className="area-details-page">
      {/* Dynamic Hero Section */}
      <div className="area-hero">
        <div className="container">
          <Link to="/areas" className="btn-back">
            <ArrowRight size={18} />
            العودة للمناطق
          </Link>
          <div className="area-hero-content">
            <h1>ونش انقاذ <span className="highlight">{areaName}</span></h1>
            <p className="area-hero-subtitle">
              إذا تعطلت سيارتك في {areaName} أو أي منطقة قريبة في {governorate}، نحن هنا لتقديم المساعدة الفورية. اتصل بأفضل خدمة نقل سيارات 24 ساعة.
            </p>
            <a href={`tel:${primaryPhone}`} className="btn-primary call-cta">
              <Phone size={24} />
              اطلب ونش {areaName} الآن
            </a>
          </div>
        </div>
      </div>

      <section className="section bg-light">
        <div className="container">
          <div className="seo-content-wrapper">
            <div className="main-article">
              <h2>هل تبحث عن ونش انقاذ في {areaName}؟</h2>
              <p>
                تُعد منطقة {areaName} من المناطق الحيوية، وأعطال السيارات فيها قد تسبب تعطيلاً كبيراً لمشاويرك. لذلك وفرنا أسطولاً من سيارات الإنقاذ والأوناش المجهزة للتعامل مع أي عطل طارئ لسيارتك في {areaName}. بمكالمة واحدة فقط، يصلك فريق الدعم الخاص بنا في وقت قياسي.
              </p>

              <h3>لماذا نحن الخيار الأفضل للانقاذ في {areaName}؟</h3>
              <p>
                نمتاز بالسرعة والاحترافية. عندما تقوم بالاتصال برقم ونش انقاذ {areaName}، يتم توجيه أقرب ونش لموقعك فوراً. الأوناش التابعة لنا حديثة ولن تتسبب في أي خدش للسيارة، سواء كانت سيارة ملاكي، رياضية، أو حتى نقل.
              </p>

              <div className="features-grid-seo">
                <div className="seo-feature">
                  <Zap size={32} className="seo-icon" />
                  <h4>وصول خلال دقائق</h4>
                  <p>لدينا تمركزات أوناش جاهزة في {areaName} لسرعة الاستجابة.</p>
                </div>
                <div className="seo-feature">
                  <Clock size={32} className="seo-icon" />
                  <h4>خدمة 24 ساعة</h4>
                  <p>سواء في النهار أو بعد منتصف الليل، خدماتنا في {areaName} لا تتوقف.</p>
                </div>
                <div className="seo-feature">
                  <ShieldCheck size={32} className="seo-icon" />
                  <h4>أمان لسيارتك</h4>
                  <p>نقل آمن لسيارتك بنسبة 100% لتجنب أي تلفيات إضافية.</p>
                </div>
              </div>

              {/* How It Works */}
              <h2>كيف تطلب ونش انقاذ في {areaName}؟</h2>
              <p>العملية بسيطة وسريعة، لا تحتاج إلا إلى مكالمة واحدة:</p>
              <div className="how-it-works-steps">
                {howItWorks.map((step, i) => (
                  <div key={i} className="how-step">
                    <div className="step-number">{step.step}</div>
                    <div className="step-content">
                      <h4>{step.title}</h4>
                      <p>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Services Available */}
              <h3>الخدمات المتاحة في {areaName}</h3>
              <div className="services-checklist">
                {servicesList.map((s, i) => (
                  <div key={i} className="checklist-item">
                    <CheckCircle2 size={20} className="check-green" />
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>

              {/* Middle CTA Section */}
              <div className="area-content-cta">
                <div className="cta-header-row">
                  <p className="cta-description">
                    خدمة نقل السيارات 24/7 — اتصل بنا من <span className="cta-area-name">{areaName}</span> وسنكون عندك خلال دقائق
                  </p>
                  <div className="cta-icon-holder">
                    <Phone className="cta-phone-icon" size={32} />
                  </div>
                </div>
                <div className="cta-buttons-row">
                  <a href={`tel:${primaryPhone}`} className="cta-btn cta-btn-phone">
                    <Phone size={20} />
                    <span dir="ltr">{primaryPhone}</span>
                  </a>
                  {whatsappNumber && (
                    <a 
                      href={`https://wa.me/2${whatsappNumber}`} 
                      className="cta-btn cta-btn-whatsapp"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle size={20} />
                      <span dir="ltr">{whatsappNumber}</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Common Breakdown Causes */}
              <h2>أشهر أسباب تعطل السيارات في {areaName}</h2>
              <p>تعرف على أكثر الأعطال شيوعاً في {governorate} وكيف يتعامل فريقنا معها:</p>
              <div className="breakdown-causes-grid">
                {breakdownCauses.map((item, i) => (
                  <div key={i} className="breakdown-cause-card">
                    <div className="breakdown-icon">{item.icon}</div>
                    <div>
                      <h4>{item.cause}</h4>
                      <p>{item.tip}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h3>خطوات التعامل مع تعطل سيارتك في {areaName}</h3>
              <ul className="advice-list">
                <li><AlertTriangle size={18} /> حاول التوقف في مكان آمن على يمين الطريق.</li>
                <li><AlertTriangle size={18} /> قم بتشغيل إشارات الإنتظار (فلاشر).</li>
                <li><AlertTriangle size={18} /> اتصل فوراً برقم ونش {areaName}: <strong dir="ltr">{primaryPhone}</strong></li>
                <li><AlertTriangle size={18} /> تواصل معنا لتحديد موقعك الجغرافي عبر واتساب بدقة.</li>
              </ul>

              <h2>أسعار ونش انقاذ سيارات {areaName}</h2>
              <p>
                نحن نقدم أرخص سعر ونش انقاذ في {areaName} ومحافظة {governorate} بدون أي مصاريف مخفية. يتم تحديد السعر بناءاً على موقعك، المسافة المطلوبة لنقل السيارة، ونوع المشكلة، ومع توفر خصم الـ 25% ستكون التكلفة هي الأنسب لك بالتأكيد.
              </p>
              <div className="price-factors">
                <div className="price-factor-item">
                  <span className="price-label">نقل بين المحافظات</span>
                  <span className="price-value">حسب المسافة</span>
                </div>
                <div className="price-factor-item">
                  <span className="price-label">تزويد وقود</span>
                  <span className="price-value">بسعر السوق + خدمة</span>
                </div>
              </div>

              {/* Local Trust Stats */}
              <div className="local-trust-bar">
                <div className="trust-stat">
                  <ThumbsUp size={24} />
                  <span><strong>+500</strong> عميل راضٍ من {governorate}</span>
                </div>
                <div className="trust-stat">
                  <Clock size={24} />
                  <span>متوسط استجابة <strong>20 دقيقة</strong></span>
                </div>
                <div className="trust-stat">
                  <ShieldCheck size={24} />
                  <span><strong>100%</strong> أمان مضمون لسيارتك</span>
                </div>
              </div>

              {/* FAQ Section */}
              <h2>أسئلة شائعة عن ونش انقاذ {areaName}</h2>
              <div className="faq-list-areas">
                {faqs.map((faq, i) => (
                  <div key={i} className={`faq-item-areas ${openFaq === i ? 'open' : ''}`}>
                    <button className="faq-question-areas" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                      <HelpCircle size={20} className="faq-q-icon-areas" />
                      <span>{faq.q}</span>
                      <ChevronDown size={20} className="faq-chevron-areas" />
                    </button>
                    <div className="faq-answer-areas">
                      <p>{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Testimonials */}
              <h2>آراء عملائنا في {areaName} و{governorate}</h2>
              <p>لا تأخذ كلمتنا فقط — اقرأ تجارب عملائنا الحقيقيين:</p>
              <div className="testimonials-area">
                {testimonials.map((t, i) => (
                  <div key={i} className="testimonial-area-card">
                    <div className="ta-header">
                      <div className="ta-avatar">{t.name.charAt(0)}</div>
                      <div>
                        <strong className="ta-name">{t.name}</strong>
                        <div className="ta-stars">
                          {[...Array(t.rating)].map((_, s) => (
                            <Star key={s} size={14} className="star-filled" />
                          ))}
                        </div>
                      </div>
                      <span className="ta-date">{t.date}</span>
                    </div>
                    <p className="ta-text">{t.text}</p>
                  </div>
                ))}
              </div>

              {/* Nearby Areas */}
              {nearbyAreas.length > 0 && (
                <div className="nearby-areas-section">
                  <h3>
                    <MapPin size={20} className="nearby-icon" />
                    مناطق قريبة من {areaName}
                  </h3>
                  <div className="nearby-areas-grid">
                    {nearbyAreas.map((area, i) => (
                      <Link key={i} to={`/areas/${encodeURIComponent(area)}`} className="nearby-area-link">
                        <ChevronLeft size={14} />
                        ونش {area}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="sidebar">
              <div className="contact-box">
                <h3>تحتاج مساعدة فورية؟</h3>
                <p>مندوبونا بانتظار اتصالك طوال 24 ساعة لتقديم الدعم لسيارتك في {areaName}.</p>
                <div className="contact-numbers">
                  {phoneNumbers.map((num, i) => (
                    <a key={i} href={`tel:${num}`} className="side-phone-btn">
                      <Phone size={20} />
                      <span dir="ltr">{num}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Image Gallery */}
              <div className="sidebar-gallery">
                <h4 className="gallery-title">من أعمالنا على الطريق</h4>
                <div className="gallery-grid">
                  {workImages.map((img, i) => (
                    <div key={i} className="gallery-img-wrap">
                      <img src={img} alt={`عمل ونش انقاذ ${areaName} ${i + 1}`} loading="lazy" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default AreaDetails;
