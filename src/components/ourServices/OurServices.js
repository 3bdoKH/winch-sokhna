import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Fuel, BatteryCharging, Wrench, Settings, ArrowLeft } from 'lucide-react';
import './OurServices.css';

const servicesList = [
  {
    id: 1,
    title: 'إنقاذ السيارات',
    description: 'نوفر أوناش حديثة مجهزة لإنقاذ وسحب كافة أنواع السيارات بآمان تام دون التسبب في أي خدوش.',
    icon: <Truck size={40} />
  },
  {
    id: 2,
    title: 'نقل المعدات',
    description: 'نقل آمن للمعدات الثقيلة والآلات من وإلى مواقع العمل والشركات بكفاءة عالية.',
    icon: <Settings size={40} />
  },
  {
    id: 3,
    title: 'التزود بالوقود',
    description: 'نفد الوقود في منتصف الطريق؟ نصل إليك بسرعة لتزويدك بالوقود اللازم لاستكمال رحلتك.',
    icon: <Fuel size={40} />
  },
  {
    id: 4,
    title: 'وصلة بطارية',
    description: 'حلول سريعة لأعطال البطارية وشحنها في مكانك لضمان عدم تعطل يومك.',
    icon: <BatteryCharging size={40} />
  },
  {
    id: 5,
    title: 'تغيير الاطارات',
    description: 'خدمة تبديل الإطارات المثقوبة أو التالفة على الطرق السريعة بأسرع وقت ممكن.',
    icon: <Wrench size={40} />
  }
];

const OurServices = () => {
  return (
    <section className="services-overview section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">خدمات <span className="highlight">الطوارئ</span> والإنقاذ</h2>
          <p className="section-subtitle">
            نحن هنا لنقدم لك مجموعة متكاملة من خدمات الدعم على الطريق لتلبية كافة احتياجاتك الطارئة بأسرع وقت وأقل تكلفة.
          </p>
        </div>

        <div className="services-grid">
          {servicesList.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon-wrapper">
                {service.icon}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <Link to="/services" className="btn-secondary read-more-btn">
            عرض كافة التفاصيل
            <ArrowLeft size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OurServices;
