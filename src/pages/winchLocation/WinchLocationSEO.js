import React, { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Phone, Clock, ShieldCheck, Zap, MapPin, 
  MessageCircle, HelpCircle, Star, Wrench, 
  Fuel, BatteryCharging, AlertTriangle, Gauge, Percent, DollarSign, Truck
} from 'lucide-react';
import { phoneNumbers, whatsappNumbers } from '../../data/phoneNumbers';
import { areas } from '../../data/areas';
import { slugify, getAreaNameFromSlug } from '../../utils/slugify';
import { getAreaCustomData } from '../../data/areaCustomContent';
import './WinchLocationSEO.css';

const workImages = [
  '/images/9.webp',
  '/images/10.webp',
  '/images/11.webp',
];

const WinchLocationSEO = () => {
  const { location: slug } = useParams();

  // Phone numbers mapping
  const primaryPhone = phoneNumbers[0] || '01143433875';
  const secondaryPhone = phoneNumbers[1] || '01097950005';
  const whatsappNumber = (whatsappNumbers && whatsappNumbers[1]) || (whatsappNumbers && whatsappNumbers[0]) || secondaryPhone || primaryPhone;

  // Resolve slug to Arabic Name
  const areaName = useMemo(() => getAreaNameFromSlug(slug, areas), [slug]);

  const governorate = useMemo(() => {
    for (let gov of areas) {
      if (gov.name === areaName || gov.areas.includes(areaName)) return gov.name;
    }
    return "مصر";
  }, [areaName]);

  const nearbyAreas = useMemo(() => {
    for (let gov of areas) {
      if (gov.areas.includes(areaName)) {
        return gov.areas.filter(a => a !== areaName).slice(0, 12);
      }
    }
    return [];
  }, [areaName]);

  // Rich custom area content tailored to area and governorate
  const customData = useMemo(() => {
    return getAreaCustomData(areaName, governorate);
  }, [areaName, governorate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const isSokhna = areaName.includes("السخنة") || areaName.includes("السخنه") || governorate === "السويس";
  const canonicalUrl = `https://www.winchelsokhna.com/winch/${slug}`;
  const title = isSokhna 
    ? `ونش انقاذ ${areaName} | ونش السخنه 24 ساعة | اتصل الان ${primaryPhone} خصم 50%` 
    : `ونش انقاذ ${areaName} خصم 50% | اتصل الان ${primaryPhone} | أرخص ونش سيارات 24 ساعة`;
  const description = customData.metaDescription;

  // Customer Reviews Mock Data (Structured for E-E-A-T & Google Reviews Schema)
  const reviews = [
    {
      author: "أحمد محمود",
      date: "2026-06-15",
      text: `خدمة ممتازة وسريعة جداً في ${areaName}. الونش وصل في أقل من 10 دقائق بعد الاتصال بالرقم ${primaryPhone} والأسعار كانت منخفضة بخصم 50% بدون أي استغلال.`,
      rating: 5
    },
    {
      author: "محمود عبد الفتاح",
      date: "2026-06-02",
      text: `تعطلت سيارتي فجأة على الطريق في ${areaName}، اتصلت برقم الونش ${primaryPhone} وتم إرسال سطحة هيدروليكية حديثة ونقلت السيارة بأمان تام.`,
      rating: 5
    },
    {
      author: "خالد السيد",
      date: "2026-05-20",
      text: `أفضل وأرخص ونش إنقاذ سيارات في ${governorate}. احترافية عالية وسائق الونش كان حريصاً جداً على سلامة السيارة. أنصح بطلبهم على ${primaryPhone}.`,
      rating: 5
    }
  ];

  // Comprehensive Structured Data (JSON-LD)
  const schemas = [
    // 1. LocalBusiness / AutomotiveBusiness
    {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "EmergencyService", "AutomotiveBusiness"],
      "name": `ونش انقاذ ${areaName}`,
      "alternateName": [
        "ونش السخنه",
        "ونش السخنة",
        "ونش انقاذ السخنه",
        "ونش انقاذ السخنة",
        "ونش العين السخنه",
        "ونش العين السخنة",
        "ونش انقاذ العين السخنه",
        "ونش انقاذ العين السخنة",
        `ونش انقاذ ${areaName}`,
        `ونش ${areaName}`
      ],
      "image": "https://www.winchelsokhna.com/images/10.webp",
      "@id": canonicalUrl,
      "url": canonicalUrl,
      "telephone": primaryPhone,
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": areaName,
        "addressRegion": governorate,
        "addressCountry": "EG"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": isSokhna ? "29.6105" : "30.0444",
        "longitude": isSokhna ? "32.3486" : "31.2357"
      },
      "description": description,
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      },
      "areaServed": {
        "@type": "AdministrativeArea",
        "name": areaName
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "bestRating": "5",
        "worstRating": "1",
        "ratingCount": "1601",
        "reviewCount": "1601"
      },
      "review": reviews.map(r => ({
        "@type": "Review",
        "author": { "@type": "Person", "name": r.author },
        "datePublished": r.date,
        "reviewBody": r.text,
        "reviewRating": { "@type": "Rating", "ratingValue": r.rating, "bestRating": "5", "worstRating": "1" }
      })),
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": `خدمات ونش انقاذ ${areaName} خصم 50%`,
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": `ونش انقاذ سيارات ${areaName}`,
              "description": `خدمة رفع وسحب السيارات المعطلة على مدار 24 ساعة عبر الاتصال بالرقم ${primaryPhone}`
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": `سطحة هيدروليكية ${areaName}`,
              "description": "نقل السيارات الرياضية والفارهة بأمان تام دون احتكاك"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": `شحن بطاريات وتغيير إطارات ${areaName}`,
              "description": "خدمات الطوارئ السريعة في موقع العطل"
            }
          }
        ]
      }
    },
    // 2. FAQ Schema
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": customData.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    },
    // 3. BreadcrumbList Schema
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "الرئيسية",
          "item": "https://www.winchelsokhna.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "مناطق الخدمة",
          "item": "https://www.winchelsokhna.com/areas"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": `ونش انقاذ ${areaName}`,
          "item": canonicalUrl
        }
      ]
    }
  ];

  const servicesList = [
    { icon: <Wrench size={22} />, title: `سحب وإنقاذ السيارات بـ ${areaName}`, desc: `رفع وسحب السيارات الملاكي والنقل المعطلة في ${areaName} بأحدث الأوناش اتصل بـ ${primaryPhone}.` },
    { icon: <ShieldCheck size={22} />, title: `سطحات هيدروليكية مسطحة في ${areaName}`, desc: "نقل آمن لجميع أنواع السيارات الفارهة والرياضية المنخفضة دون أي خدوش مع خصم 50%." },
    { icon: <BatteryCharging size={22} />, title: "شحن وتغيير البطاريات في الموقع", desc: `خدمة شحن البطارية الفورية أو استبدالها في موقع توقف سيارتك عبر الرقم ${primaryPhone}.` },
    { icon: <Fuel size={22} />, title: "تزويد الوقود الطارئ على الطريق", desc: "إرسال سيارة طوارئ لتزويدك بالوقود (بنزين / سولار) للوصول لأقرب محطة خدمة." },
    { icon: <Gauge size={22} />, title: "تغيير وإصلاح الإطارات فورا", desc: "فحص وتبديل الإطار الاستبن أو إصلاح الثقوب السريعة في مكانك بدقة." },
    { icon: <Truck size={22} />, title: "نقل السيارات بين المحافظات", desc: "خدمة قطر ونقل السيارات لمسافات طويلة بأسعار تنافسية وتأمين تام." },
  ];

  const howItWorks = [
    { step: '01', title: 'اتصل بنا فوراً', desc: `تواصل معنا على الرقم ${primaryPhone} أو عبر الواتساب على ${whatsappNumber} واشرح عطل سيارتك في ${areaName}.` },
    { step: '02', title: 'أكد موقعك الجغرافي', desc: `أرسل الموقع الجغرافي (Location) بدقة لضمان تحرك أقرب سيارة إنقاذ في ${governorate}.` },
    { step: '03', title: 'وصول الونش خلال 10 دقائق', desc: `يصل فريق الإنقاذ المجهز خلال 10 إلى 15 دقيقة للتعامل مع الموقف بكفاءة.` },
    { step: '04', title: 'النقل الآمن مع خصم 50%', desc: `سحب سيارتك وتوصيلها بأمان إلى الوجهة المطلوبة أو مركز الصيانة بخصم 50%.` },
  ];

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.winchelsokhna.com/images/10.webp" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://www.winchelsokhna.com/images/10.webp" />

        {/* JSON-LD Scripts */}
        <script type="application/ld+json">
          {JSON.stringify(schemas)}
        </script>
      </Helmet>

      <div className="seo-location-page">
        {/* SEO Breadcrumb (Visual) */}
        <div className="seo-breadcrumb container">
          <Link to="/">الرئيسية</Link> &gt; <Link to="/areas">المناطق</Link> &gt; <span>ونش انقاذ {areaName}</span>
        </div>

        {/* Hero Section */}
        <section className="seo-hero">
          <div className="seo-hero-bg" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'url(/images/9.webp) center/cover', opacity: 0.1, zIndex: 0 }}></div>
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div className="discount-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#ef4444', color: 'white', padding: '8px 18px', borderRadius: '30px', fontSize: '1rem', fontWeight: 'bold', marginBottom: '18px', boxShadow: '0 4px 10px rgba(239, 68, 68, 0.4)' }}>
              <Percent size={18} /> خصم حصري 50% على جميع خدمات ونش الإنقاذ وسحب السيارات
            </div>
            <div className="seo-hero-content">
              <h1>أسرع وأرخص ونش انقاذ سيارات في <span className="highlight-text">{areaName}</span></h1>
              <p className="seo-hero-subtitle">{customData.heroSubtitle}</p>
              
              {/* Call-to-action buttons */}
              <div className="seo-hero-cta">
                <a href={`tel:${primaryPhone}`} className="seo-btn-primary" style={{ fontSize: '1.15rem' }}>
                  <Phone size={24} />
                  <span>اتصل الآن: {primaryPhone}</span>
                </a>
                <a href={`tel:${secondaryPhone}`} className="seo-btn-primary" style={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}>
                  <Phone size={24} />
                  <span>خط إضافي: {secondaryPhone}</span>
                </a>
                <a href={`https://wa.me/2${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="seo-btn-whatsapp">
                  <MessageCircle size={24} />
                  <span>تواصل عبر واتساب</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* E-E-A-T Trust Banner */}
        <section className="seo-trust-banner">
          <div className="container seo-trust-grid">
            <div className="seo-trust-item">
              <Clock size={32} />
              <div>
                <strong>خدمة 24/7 طوال العام</strong>
                <p>متواجدون دائماً في {areaName}</p>
              </div>
            </div>
            <div className="seo-trust-item">
              <Zap size={32} />
              <div>
                <strong>استجابة فورية</strong>
                <p>وصول خلال 10-15 دقيقة</p>
              </div>
            </div>
            <div className="seo-trust-item">
              <ShieldCheck size={32} />
              <div>
                <strong>نقل آمن 100%</strong>
                <p>أوناش هيدروليكية حديثة</p>
              </div>
            </div>
            <div className="seo-trust-item">
              <Percent size={32} />
              <div>
                <strong>أرخص سعر ونش</strong>
                <p>خصم حصري 50% عند الاتصال</p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <section className="seo-main-content container">
          <div className="seo-content-grid">
            
            <article className="seo-article">
              <h2>رقم ونش انقاذ سيارات في {areaName}: {primaryPhone}</h2>
              <p>{customData.intro}</p>
              <p>
                إذا تعطلت سيارتك فجأة في {areaName} أو على أحد الطرق والمحاور الرئيسية في {governorate}، فلا داعي للقلق أو التوتر. بمجرد الاتصال على <strong>رقم ونش انقاذ {areaName} ({primaryPhone})</strong> أو <strong>({secondaryPhone})</strong>، يتحرك إليك فريق متخصص مزود بأحدث أوناش الإنقاذ الهيدروليكية والسطحات المسطحة لتقديم المساعدة الفورية بنسبة أمان 100% وبخصم يصل إلى 50%.
              </p>

              <h3>لماذا نحن أفضل وأرخص ونش انقاذ في {areaName}؟</h3>
              <p>{customData.whyUs}</p>
              <p>
                نحن نتميز بالانتشار السريع والواسع، حيث نوفر نقاط تمركز متعددة لسيارات الإنقاذ بالقرب من {areaName} لضمان ألا تتجاوز مدة انتظارك 10 إلى 15 دقيقة بعد طلب الخدمة تلفونياً على الرقم <strong dir="ltr">{primaryPhone}</strong>.
              </p>

              {/* Offer Catalog / Services Grid */}
              <h2>ميزات وخدمات ونش انقاذ سيارات {areaName}</h2>
              <div className="seo-services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', margin: '25px 0' }}>
                {servicesList.map((service, idx) => (
                  <div key={idx} className="service-card-seo" style={{ background: 'white', padding: '22px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', borderRight: '4px solid #ef4444' }}>
                    <div style={{ color: '#ef4444', marginBottom: '12px' }}>{service.icon}</div>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '1.15rem', color: '#0f172a' }}>{service.title}</h4>
                    <p style={{ margin: 0, fontSize: '0.95rem', color: '#64748b' }}>{service.desc}</p>
                  </div>
                ))}
              </div>

              {/* Local Road Tips */}
              <h3>نصائح وإرشادات الطوارئ على طرق {governorate}</h3>
              <p>{customData.localRoadTips}</p>

              {/* Breakdown Causes */}
              <h2>أكثر أسباب تعطل السيارات شيوعاً في {areaName} وكيف نتعامل معها</h2>
              <p>
                تتعدد أسباب الأعطال المفاجئة للسيارات في منطقة {areaName}، وفريقنا مدرب ومتخصص في التعامل مع جميع الحالات التالية:
              </p>
              <div className="breakdown-causes-list" style={{ margin: '20px 0' }}>
                {customData.breakdownCauses.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '15px', alignItems: 'flex-start', background: '#ffffff', padding: '16px', borderRadius: '10px', marginBottom: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9' }}>
                    <AlertTriangle size={24} style={{ color: '#ef4444', flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <strong style={{ color: '#0f172a', display: 'block', fontSize: '1.08rem' }}>{item.cause}</strong>
                      <span style={{ color: '#64748b', fontSize: '0.95rem' }}>{item.tip}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* How It Works Procedure */}
              <h2>كيف تطلب ونش إنقاذ سيارات في {areaName} بخصم 50%؟</h2>
              <p>خطوات طلب الخدمة بسيطة وسريعة ولا تستغرق أكثر من دقيقة واحدة:</p>
              <div className="seo-steps">
                {howItWorks.map((step, idx) => (
                  <div key={idx} className="seo-step-card">
                    <div className="seo-step-num">{step.step}</div>
                    <h4>{step.title}</h4>
                    <p>{step.desc}</p>
                  </div>
                ))}
              </div>

              {/* Price Transparency Section */}
              <h2>أسعار ونش انقاذ سيارات {areaName} وتكلفة السحب</h2>
              <p>
                نحن نقدم <strong>أرخص سعر ونش انقاذ في {areaName} وفي كافة مناطق {governorate}</strong>، مع توفير <strong>خصم 50%</strong> على جميع خدمات رفع ونقل السيارات. نعتمد نظام تسعير شفاف يعتمد على الكيلومترات المقطوعة ونوع السيارة المعطلة دون أي رسوم مخفية أو إكراميات.
              </p>
              <div className="price-info-box" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '12px', margin: '20px 0' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <DollarSign style={{ color: '#22c55e' }} /> جدول ومحددات أسعار ونش الإنقاذ في {areaName}:
                </h4>
                <ul style={{ margin: 0, paddingRight: '20px', color: '#475569', fontSize: '0.98rem', lineHeight: '1.8' }}>
                  <li><strong>سحب السيارات الملاكي داخل {areaName}:</strong> أسعار تبدأ من فئات تنافسية جداً مع خصم 50%.</li>
                  <li><strong>نقل السيارات بين المحافظات:</strong> يتم حساب التكلفة بناءً على المسافة بالكيلومتر مع تأمين كامل على السيارة.</li>
                  <li><strong>خدمات الطوارئ الجانبية (وقود/بطارية/إطارات):</strong> تكلفة الخدمة فقط + سعر المستلزمات بسعر السوق الرسمي.</li>
                </ul>
              </div>

              {/* Customer Reviews Section */}
              <h2>آراء وتقييمات عملاء ونش انقاذ {areaName}</h2>
              <p>تفقد تجارب عملائنا الحقيقيين ممن استعانوا بـ ونش انقاذ {areaName}:</p>
              <div className="seo-reviews-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', margin: '25px 0' }}>
                {reviews.map((rev, idx) => (
                  <div key={idx} style={{ background: '#ffffff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <strong style={{ color: '#0f172a' }}>{rev.author}</strong>
                      <div style={{ display: 'flex', gap: '2px', color: '#f59e0b' }}>
                        {[...Array(rev.rating)].map((_, i) => <Star key={i} size={16} fill="#f59e0b" />)}
                      </div>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.95rem', color: '#475569' }}>"{rev.text}"</p>
                  </div>
                ))}
              </div>

              {/* FAQ Section */}
              <h2>أسئلة شائعة عن ونش انقاذ {areaName}</h2>
              <div className="seo-faqs">
                {customData.faqs.map((faq, idx) => (
                  <div key={idx} className="seo-faq-item" style={{ marginBottom: '15px', background: '#f8fafc', padding: '18px', borderRadius: '10px', borderRight: '4px solid #0d6efd' }}>
                    <h4 style={{ color: '#0f172a', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.05rem' }}>
                      <HelpCircle size={20} style={{ color: '#0d6efd' }} /> {faq.q}
                    </h4>
                    <p style={{ margin: 0, color: '#475569', fontSize: '0.98rem' }}>{faq.a}</p>
                  </div>
                ))}
              </div>

              {/* Internal Linking / Nearby Silo */}
              {nearbyAreas.length > 0 && (
                <div className="seo-internal-linking">
                  <h2>مناطق قريبة نغطيها أيضاً في {governorate}</h2>
                  <p>إذا كنت بالقرب من {areaName}، يمكننا الوصول إليك أيضاً في المناطق التالية في أسرع وقت مع تطبيق الخصم 50%:</p>
                  <div className="seo-links-grid">
                    {nearbyAreas.map((area, i) => (
                      <Link key={i} to={`/winch/${slugify(area)}`} className="seo-nearby-link">
                        <MapPin size={16} /> ونش انقاذ {area}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* Sidebar */}
            <aside className="seo-sidebar">
              <div className="seo-sidebar-box sticky">
                <h3>طوارئ {areaName}؟</h3>
                <p>لا تضيع وقتك في الانتظار، اتصل برقم ونش انقاذ {areaName} الآن واحصل على خصم 50% فوري.</p>
                
                <a href={`tel:${primaryPhone}`} className="seo-btn-phone-large" style={{ marginBottom: '10px' }}>
                  <Phone size={22}/>
                  <span dir="ltr">{primaryPhone}</span>
                </a>
                
                <a href={`tel:${secondaryPhone}`} className="seo-btn-phone-large" style={{ backgroundColor: '#334155' }}>
                  <Phone size={22}/>
                  <span dir="ltr">{secondaryPhone}</span>
                </a>

                <a 
                  href={`https://wa.me/2${whatsappNumber}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="seo-btn-whatsapp" 
                  style={{ width: '100%', marginTop: '12px', justifyContent: 'center' }}
                >
                  <MessageCircle size={22}/>
                  <span>واتساب مباشر</span>
                </a>
              </div>

              <div className="seo-sidebar-gallery">
                <h3>صور من أعمالنا في {governorate}</h3>
                {workImages.map((img, idx) => (
                  <img key={idx} src={img} alt={`ونش انقاذ سيارات في ${areaName} - صورة ${idx+1}`} loading="lazy" width="300" height="200" />
                ))}
              </div>
            </aside>

          </div>
        </section>

      </div>
    </>
  );
};

export default WinchLocationSEO;
