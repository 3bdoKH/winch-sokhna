import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail, Clock, Send } from 'lucide-react';
import { phoneNumbers, whatsappNumbers } from '../../data/phoneNumbers';
import FAQPreview from '../../components/faq/FAQ';
import './Contact.css';

const Contact = () => {
  const primaryWhatsapp = whatsappNumbers[0];

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "اتصل بنا | ونش انقاذ السخنة";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('تم إرسال رسالتك بنجاح. سنتواصل معك في أقرب وقت!');
  };

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">اتصل بنا</h1>
          <p className="page-breadcrumb">
            <Link to="/">الرئيسية</Link> / <span>اتصل بنا</span>
          </p>
        </div>
      </div>

      <section className="section bg-light">
        <div className="container">
          <div className="contact-wrapper">
            
            <div className="contact-info-col">
              <h2 className="contact-heading">معلومات التواصل</h2>
              <p className="contact-subheading">نحن متواجدون للرد على استفساراتكم أو لتلقي طلبات الإنقاذ العاجلة على مدار الساعة.</p>
              
              <div className="contact-info-list">
                
                <div className="contact-info-item">
                  <div className="contact-icon-box">
                    <Phone size={24} />
                  </div>
                  <div className="contact-info-text">
                    <h4>أرقام الطوارئ (24/7)</h4>
                    {phoneNumbers.map((num, i) => (
                      <a key={i} href={`tel:${num}`} dir="ltr">{num}</a>
                    ))}
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-icon-box">
                    <Mail size={24} />
                  </div>
                  <div className="contact-info-text">
                    <h4>البريد الإلكتروني</h4>
                    <a href="mailto:info@wench-sokhna.com">info@wench-sokhna.com</a>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-icon-box">
                    <MapPin size={24} />
                  </div>
                  <div className="contact-info-text">
                    <h4>التغطية الرئيسية</h4>
                    <p>العين السخنة، طريق القاهرة - السويس، القاهرة الجديدة، الجيزة، وجميع الطرق السريعة.</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-icon-box">
                    <Clock size={24} />
                  </div>
                  <div className="contact-info-text">
                    <h4>ساعات العمل</h4>
                    <p>مفتوح دائماً - 24 ساعة / 7 أيام في الأسبوع</p>
                  </div>
                </div>

              </div>
              
              <div className="mt-4">
                <a href={`https://wa.me/2${primaryWhatsapp}`} target="_blank" rel="noreferrer" className="btn-primary w-100 text-center justify-content-center">
                  تواصل عبر الواتساب <Send size={18} style={{marginRight: '0.5rem'}}/>
                </a>
              </div>
            </div>

            <div className="contact-form-col">
              <h2 className="contact-heading">أرسل لنا رسالة</h2>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">الاسم بالكامل</label>
                  <input type="text" id="name" placeholder="أدخل اسمك" required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">رقم الهاتف</label>
                  <input type="tel" id="phone" placeholder="أدخل رقمك للتواصل" required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">نوع الخدمة المطلوبة</label>
                  <select id="subject" required>
                    <option value="">-- اختر الخدمة --</option>
                    <option value="rescue">إنقاذ سيارة</option>
                    <option value="transfer">نقل معدات</option>
                    <option value="battery">وصلة بطارية / شحن</option>
                    <option value="fuel">تزويد وقود</option>
                    <option value="tires">تغيير إطارات</option>
                    <option value="other">استفسار عام</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">تفاصيل الرسالة أو الموقع</label>
                  <textarea id="message" rows="5" placeholder="اكتب تفاصيل طلبك أو رسالتك هنا..." required></textarea>
                </div>
                
                <button type="submit" className="btn-secondary w-100">
                  إرسال الرسالة
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Reuse FAQ for the answers to common questions */}
      <FAQPreview />
    </div>
  );
};

export default Contact;
