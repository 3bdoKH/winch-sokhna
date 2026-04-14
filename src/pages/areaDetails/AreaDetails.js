import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Phone, Clock, ShieldCheck, Zap, AlertTriangle, ArrowRight } from 'lucide-react';
import { phoneNumbers } from '../../data/phoneNumbers';
import { areas } from '../../data/areas';
import './AreaDetails.css';

const AreaDetails = () => {
  const { areaName } = useParams();
  const primaryPhone = phoneNumbers[0];

  // Helper to find the governorate context to make content richer
  const findGovernorate = (area) => {
    for (let gov of areas) {
      if (gov.name === area || gov.areas.includes(area)) {
        return gov.name;
      }
    }
    return "مصر"; 
  };

  const governorate = findGovernorate(areaName);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `رقم ونش انقاذ ${areaName} | أسرع سيارة انقاذ في ${governorate}`;
  }, [areaName, governorate]);

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

              <h3>خطوات التعامل مع تعطل سيارتك في {areaName}</h3>
              <ul className="advice-list">
                <li><AlertTriangle size={18} /> حاول التوقف في مكان آمن على يمين الطريق.</li>
                <li><AlertTriangle size={18} /> قم بتشغيل إشارات الإنتظار (الانتظار).</li>
                <li><AlertTriangle size={18} /> اتصل فوراً برقم ونش {areaName} المخصص للإنقاذ: <strong dir="ltr">{primaryPhone}</strong></li>
                <li><AlertTriangle size={18} /> تواصل معنا لتحديد موقعك الجغرافي عبر واتساب بدقة.</li>
              </ul>
              
              <h2>أسعار ونش انقاذ سيارات {areaName}</h2>
              <p>
                نحن نقدم أرخص سعر ونش انقاذ في {areaName} ومحافظة {governorate} بدون أي مصاريف مخفية. يتم تحديد السعر بناءاً على موقعك، المسافة المطلوبة لنقل السيارة، ونوع المشكلة، ومع توفر خصم الـ 25% ستكون التكلفة هي الأنسب لك بالتأكيد.
              </p>
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
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default AreaDetails;
