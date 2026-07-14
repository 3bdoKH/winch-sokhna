import React, { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Phone, Clock, ShieldCheck, Zap, CheckCircle2, MapPin, MessageCircle } from 'lucide-react';
import { phoneNumbers, whatsappNumbers } from '../../data/phoneNumbers';
import { areas } from '../../data/areas';
import { slugify, getAreaNameFromSlug } from '../../utils/slugify';
import { SeededRandom } from '../../utils/seededRandom';
import { seoContentPool } from '../../data/seoContentPool';
import './WinchLocationSEO.css';

const workImages = [
  '/images/9.webp',
  '/images/10.webp',
  '/images/11.webp',
];

const WinchLocationSEO = () => {
  const { location: slug } = useParams();

  // Phone numbers mapping
  const primaryPhone = phoneNumbers[0] || '01000000000';
  const whatsappNumber = (whatsappNumbers && whatsappNumbers[1]) || (whatsappNumbers && whatsappNumbers[0]) || phoneNumbers[1] || primaryPhone;

  // Resolve slug to Arabic Name
  const areaName = useMemo(() => getAreaNameFromSlug(slug, areas), [slug]);

  // If area is not found or invalid, we can redirect or show 404. Assuming we found it.
  
  const governorate = useMemo(() => {
    for (let gov of areas) {
      if (gov.name === areaName || gov.areas.includes(areaName)) return gov.name;
    }
    return "مصر";
  }, [areaName]);

  const nearbyAreas = useMemo(() => {
    for (let gov of areas) {
      if (gov.areas.includes(areaName)) {
        // Find nearby, filter self, and deterministic sort based on string
        return gov.areas.filter(a => a !== areaName).slice(0, 8);
      }
    }
    return [];
  }, [areaName]);

  // Deterministic Content Generation using SeededRandom
  const seoContent = useMemo(() => {
    const rng = new SeededRandom(areaName);
    return {
      intro: rng.pick(seoContentPool.heroIntros),
      body: rng.pick(seoContentPool.heroBodies),
      whyUs: rng.pick(seoContentPool.whyChooseUs),
      service: rng.pick(seoContentPool.serviceDescriptions),
      cta: rng.pick(seoContentPool.callToActions),
      conclusion: rng.pick(seoContentPool.conclusion),
      // Shuffle testimonials to avoid duplicate content penalty
      testimonialIndex1: Math.floor(rng.next() * 5), 
      testimonialIndex2: Math.floor(rng.next() * 5),
    };
  }, [areaName]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const siteName = "ونش انقاذ سيارات السخنة";
  const canonicalUrl = `https://winchelsokhna.com/winch/${slug}`;
  const title = `ونش انقاذ ${areaName} | ونش سيارات 24 ساعة | ${siteName}`;
  const description = `محتاج ونش انقاذ في ${areaName}؟ اتصل الآن بـ ${siteName} على ${primaryPhone}. خدمة سحب وإنقاذ سيارات 24 ساعة، وصول سريع خلال 15 دقيقة في ${governorate}. ${seoContent.intro}`;

  // Structured Data (JSON-LD)
  const schemas = [
    // 1. LocalBusiness
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": `ونش انقاذ ${areaName}`,
      "image": "https://winchelsokhna.com/images/10.webp",
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
        "latitude": "30.0444", // Ideally dynamic, but fallback to general Egypt/Cairo area
        "longitude": "31.2357"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      },
      "areaServed": {
        "@type": "AdministrativeArea",
        "name": areaName
      }
    },
    // 2. FAQ Schema
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `كم تستغرق الاستجابة لونش انقاذ في ${areaName}؟`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `في معظم الحالات، يصل ونش الإنقاذ إلى ${areaName} في غضون 15 إلى 30 دقيقة من لحظة الاتصال.`
          }
        },
        {
          "@type": "Question",
          "name": `هل الخدمة متاحة 24 ساعة في ${areaName}؟`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `نعم، خدمة الإنقاذ في ${areaName} متاحة على مدار الساعة، 7 أيام في الأسبوع.`
          }
        }
      ]
    },
    // 3. BreadcrumbList
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "الرئيسية",
          "item": "https://winchelsokhna.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "مناطق الخدمة",
          "item": "https://winchelsokhna.com/areas"
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

  const howItWorks = [
    { step: '01', title: 'اتصل بنا', desc: `تواصل معنا هاتفياً أو عبر الواتساب واشرح عطل سيارتك في ${areaName}.` },
    { step: '02', title: 'أكد موقعك', desc: `أرسل الموقع (Location) بدقة لضمان وصولنا بأسرع وقت في ${governorate}.` },
    { step: '03', title: 'وصول الونش', desc: `يصل فريق الإنقاذ المجهز خلال دقائق معدودة للتعامل مع الموقف.` },
    { step: '04', title: 'النقل الآمن', desc: `سحب سيارتك وتوصيلها بأمان إلى الوجهة المطلوبة أو ورشة الإصلاح.` },
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
        <meta property="og:image" content="https://winchelsokhna.com/images/10.webp" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://winchelsokhna.com/images/10.webp" />

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
            <div className="seo-hero-content">
              <h1>أفضل ونش انقاذ في <span className="highlight-text">{areaName}</span></h1>
              <p className="seo-hero-subtitle">{seoContent.intro} {seoContent.body}</p>
              <div className="seo-hero-cta">
                <a href={`tel:${primaryPhone}`} className="seo-btn-primary">
                  <Phone size={24} />
                  <span>اتصل الآن {primaryPhone}</span>
                </a>
                <a href={`https://wa.me/2${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="seo-btn-whatsapp">
                  <MessageCircle size={24} />
                  <span>تواصل واتساب</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* E-E-A-T Trust Metrics */}
        <section className="seo-trust-banner">
          <div className="container seo-trust-grid">
            <div className="seo-trust-item">
              <Clock size={32} />
              <div>
                <strong>خدمة 24/7</strong>
                <p>متواجدون دائماً في {areaName}</p>
              </div>
            </div>
            <div className="seo-trust-item">
              <Zap size={32} />
              <div>
                <strong>استجابة فورية</strong>
                <p>وصول خلال 15 - 30 دقيقة</p>
              </div>
            </div>
            <div className="seo-trust-item">
              <ShieldCheck size={32} />
              <div>
                <strong>نقل آمن 100%</strong>
                <p>أوناش هيدروليكية حديثة</p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <section className="seo-main-content container">
          <div className="seo-content-grid">
            
            <article className="seo-article">
              <h2>لماذا تختار خدمة سحب سيارات {areaName}؟</h2>
              <p>{seoContent.whyUs}</p>
              <p>{seoContent.service}</p>
              
              <h3>خدماتنا المتوفرة في {areaName}</h3>
              <ul className="seo-services-list">
                <li><CheckCircle2 size={18}/> ونش انقاذ سيارات ملاكي ونقل بـ {areaName}.</li>
                <li><CheckCircle2 size={18}/> تغيير الإطارات وشحن البطارية في موقع العطل.</li>
                <li><CheckCircle2 size={18}/> سحب السيارات المعطلة على طرق {governorate}.</li>
                <li><CheckCircle2 size={18}/> فتح السيارات المغلقة بدون خدش.</li>
              </ul>

              <h2>كيفية طلب المساعدة على الطريق في {areaName}؟</h2>
              <div className="seo-steps">
                {howItWorks.map((step, idx) => (
                  <div key={idx} className="seo-step-card">
                    <div className="seo-step-num">{step.step}</div>
                    <h4>{step.title}</h4>
                    <p>{step.desc}</p>
                  </div>
                ))}
              </div>

              <h3>{seoContent.conclusion}</h3>
              <p>{seoContent.cta}</p>

              {/* Internal Linking / Nearby Silo */}
              {nearbyAreas.length > 0 && (
                <div className="seo-internal-linking">
                  <h2>مناطق قريبة نغطيها أيضاً</h2>
                  <p>إذا كنت بالقرب من {areaName}، يمكننا الوصول إليك أيضاً في المناطق التالية:</p>
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
                <p>لا تضيع وقتك، اتصل بأقرب سيارة انقاذ لموقعك الآن.</p>
                <a href={`tel:${primaryPhone}`} className="seo-btn-phone-large">
                  <Phone size={24}/>
                  {primaryPhone}
                </a>
              </div>
              <div className="seo-sidebar-gallery">
                <h3>أحدث أعمالنا</h3>
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
