import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Wrench, Clock, ChevronLeft } from 'lucide-react';
import { phoneNumbers } from '../../data/phoneNumbers';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        
        <div className="footer-col">
          <h3 className="footer-title">ونش انقاذ السخنة</h3>
          <p className="footer-desc">
            خدمات أوناش الإنقاذ الأسرع والأكثر موثوقية في مصر. متواجدون على مدار 24 ساعة لخدمتكم وإنقاذ سياراتكم باحترافية وأمان.
          </p>
          <div className="footer-contact-item">
            <Clock size={20} className="footer-icon" />
            <span>خدمة 24 ساعة / 7 أيام</span>
          </div>
        </div>

        <div className="footer-col">
          <h3 className="footer-title">روابط هامة</h3>
          <ul className="footer-links">
            <li><Link to="/"><ChevronLeft size={16}/> الرئيسية</Link></li>
            <li><Link to="/about"><ChevronLeft size={16}/> من نحن</Link></li>
            <li><Link to="/services"><ChevronLeft size={16}/> خدماتنا</Link></li>
            <li><Link to="/areas"><ChevronLeft size={16}/> مناطق التغطية</Link></li>
            <li><Link to="/contact"><ChevronLeft size={16}/> اتصل بنا</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3 className="footer-title">خدماتنا الرئيسية</h3>
          <ul className="footer-links">
            <li><Link to="/services"><Wrench size={16}/> إنقاذ السيارات</Link></li>
            <li><Link to="/services"><Wrench size={16}/> نقل المعدات</Link></li>
            <li><Link to="/services"><Wrench size={16}/> التزود بالوقود</Link></li>
            <li><Link to="/services"><Wrench size={16}/> وصلة بطارية</Link></li>
            <li><Link to="/services"><Wrench size={16}/> تغيير الاطارات</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3 className="footer-title">تواصل معنا</h3>
          <div className="footer-contact-info">
            {phoneNumbers.map((phone, idx) => (
              <a key={idx} href={`tel:${phone}`} className="footer-contact-item phone-link">
                <Phone size={20} className="footer-icon" />
                <span dir="ltr">{phone}</span>
              </a>
            ))}
            <div className="footer-contact-item mt-3">
              <MapPin size={32} className="footer-icon" />
              <span>نغطي العين السخنة، القاهرة، الجيزة، طريق السويس، والعديد من المحافظات الأخرى.</span>
            </div>
          </div>
        </div>

      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>جميع الحقوق محفوظة &copy; {new Date().getFullYear()} - ونش انقاذ السخنة</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
