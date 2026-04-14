import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Truck, Fuel, BatteryCharging, Wrench, Settings, CheckCircle2 } from 'lucide-react';
import './Services.css';

const detailedServices = [
  {
    id: 1,
    title: 'إنقاذ وسحب السيارات',
    icon: <Truck size={48} />,
    desc: 'خدمة أساسية لإنقاذ السيارات المعطلة أو المتعرضة لحوادث. نستخدم أوناش هيدروليكية حديثة (ونش مسطح) تضمن رفع السيارة ونقلها دون أي تلامس يسبب خدوش أو ضرر بالهيكل الخارجي. الخدمة متاحة للسيارات الملاكي، الرياضية المنخفضة، وسيارات الدفع الرباعي.',
    features: ['متاح 24/7', 'تغطية شاملة', 'أوناش حديثة آمنة']
  },
  {
    id: 2,
    title: 'نقل المعدات والآلات',
    icon: <Settings size={48} />,
    desc: 'نمتلك أوناش مجهزة للتعامل مع الأحمال الثقيلة، حيث نقدم خدمات نقل المعدات الزراعية، والصناعية، والمولدات الكهربائية، وحتى الأكشاك ومعدات البناء الخفيفة من وإلى مواقع العمل بكل أمان واحترافية.',
    features: ['روافع قوية', 'تأمين كامل للحمولة', 'سائقين محترفين']
  },
  {
    id: 3,
    title: 'تزويد الوقود على الطريق',
    icon: <Fuel size={48} />,
    desc: 'الكثير منا ينسى متابعة مؤشر البنزين، أو يعلق في زحام مروري وتنفد منه الكمية. نحن نوفر خدمة الدعم السريع لتزويدك بالوقود (بنزين أو سولار) الكافي لوصولك لأقرب محطة وقود لضمان عدم تعطل يومك.',
    features: ['استجابة سريعة', 'أنواع وقود مختلفة', 'تكلفة مناسبة']
  },
  {
    id: 4,
    title: 'شحن وتغيير البطارية',
    icon: <BatteryCharging size={48} />,
    desc: 'مشكلة بسيطة كنفاد البطارية قد تعطلك لساعات. نوفر خدمة عمل "وصلة بطارية" لتشغيل سيارتك مجدداً، أو حتى توفير وطاقم لتغيير البطارية إذا لزم الأمر في مكان تعطل السيارة دون الحاجة لقطرها.',
    features: ['حلول فورية במקום', 'فنيين متخصصين', 'تشخيص العطل الصحيح']
  },
  {
    id: 5,
    title: 'تغيير الإطارات',
    icon: <Wrench size={48} />,
    desc: 'ثقب الإطار على طريق سريع أمر خطير ويحتاج لتعامل فوري. نصلك لفك الإطار التالف وتركيب الإطار الاحتياطي بسرعة وأمان، مع توفر معدات فك هواء كهربائية لتوفير الوقت والجهد في أصعب المواقف.',
    features: ['أمان على الطرق السريعة', 'معدات متطورة', 'توفير الوقت']
  }
];

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "خدماتنا | ونش انقاذ السخنة";
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
                <div className="service-icon-large">
                  {service.icon}
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
    </div>
  );
};

export default Services;
