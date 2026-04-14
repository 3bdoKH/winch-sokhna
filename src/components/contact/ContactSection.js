import React from 'react';
import { Phone, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { phoneNumbers } from '../../data/phoneNumbers';
import './ContactSection.css';

const ContactSection = () => {
  const primaryPhone = phoneNumbers[0];

  return (
    <section className="contact-preview section">
      <div className="container">
        <div className="contact-preview-banner">
          <div className="contact-preview-content">
            <h2>هل تحتاج إلى مساعدة فورية الآن؟</h2>
            <p>
              فريقنا متواجد على مدار 24 ساعة بأحدث الأوناش المجهزة لخدمتك في العين السخنة وكافة الطرق السريعة. بمكالمة واحدة نكون عندك.
            </p>
            <div className="contact-preview-actions">
              <a href={`tel:${primaryPhone}`} className="btn-primary">
                <Phone size={20} />
                اتصل الآن: {primaryPhone}
              </a>
              <Link to="/contact" className="btn-secondary">
                طرق تواصل أخرى
                <ArrowLeft size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
