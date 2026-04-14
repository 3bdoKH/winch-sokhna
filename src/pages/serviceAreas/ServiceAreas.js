import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ChevronLeft } from 'lucide-react';
import { areas } from '../../data/areas';
import './ServiceAreas.css';

const ServiceAreas = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "دليل مناطق التغطية | ونش انقاذ السخنة";
  }, []);

  return (
    <div className="page-wrapper bg-light">
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">مناطق التغطية لخدماتنا</h1>
          <p className="page-breadcrumb">
            <Link to="/">الرئيسية</Link> / <span>مناطق التغطية</span>
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">نحن بالقرب منك دائماً</h2>
            <p className="section-subtitle">
              نقدم خدمات الإنقاذ وقطر السيارات في شبكة واسعة من المحافظات والمدن، اختر منطقتك لمعرفة التفاصيل والاتصال.
            </p>
          </div>

          <div className="governorates-list">
            {areas.map((gov, index) => (
              <div key={index} className="governorate-card">
                <h3 className="governorate-title">
                  <MapPin size={24} className="gov-icon" />
                  محافظة {gov.name}
                </h3>
                <ul className="areas-list">
                  {gov.areas.map((area, idx) => (
                    <li key={idx}>
                      <Link to={`/areas/${encodeURIComponent(area)}`} className="area-link">
                        <ChevronLeft size={16} />
                        ونش انقاذ {area}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceAreas;
