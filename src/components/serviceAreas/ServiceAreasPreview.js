import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowLeft } from 'lucide-react';
import { areas } from '../../data/areas';
import './ServiceAreasPreview.css';

const ServiceAreasPreview = () => {
  // Show only top 8 areas for the preview
  const topAreas = areas.slice(0, 8);
  return (
    <section className="service-areas-preview section bg-light">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">مناطق <span className="highlight">التغطية</span></h2>
          <p className="section-subtitle">
            نغطي شبكة واسعة من المحافظات والمدن لضمان الوصول إليك أينما كنت في أسرع وقت.
          </p>
        </div>

        <div className="areas-grid">
          {topAreas.map((areaData, index) => (
            <Link to={`/winch/${areaData.name.replace(/ /g, '-')}`} key={index} className="area-card-preview">
              <MapPin size={24} className="area-icon" />
              <h3 className="area-name">{areaData.name}</h3>
            </Link>
          ))}
        </div>

        <div className="text-center mt-5">
          <Link to="/areas" className="btn-primary">
            تصفح جميع المدن والمناطق
            <ArrowLeft size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreasPreview;
