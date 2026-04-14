import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { faqs } from '../../data/FAQ';
import './FAQ.css';

const FAQPreview = () => {
  const [openId, setOpenId] = useState(faqs[0].id); // First one open by default

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="faq-section section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">الأسئلة <span className="highlight">الشائعة</span></h2>
          <p className="section-subtitle">
            نجيب هنا عن أكثر تساؤلات عملائنا شيوعاً لضمان الوضوح التام.
          </p>
        </div>

        <div className="faq-container">
          {faqs.map((faq) => (
            <div 
              key={faq.id} 
              className={`faq-item ${openId === faq.id ? 'active' : ''}`}
            >
              <button 
                className="faq-question" 
                onClick={() => toggleAccordion(faq.id)}
                aria-expanded={openId === faq.id}
              >
                <div className="faq-question-text">
                  <HelpCircle size={20} className="faq-icon" />
                  {faq.question}
                </div>
                <ChevronDown 
                  size={20} 
                  className={`faq-chevron ${openId === faq.id ? 'rotate' : ''}`} 
                />
              </button>
              
              <div 
                className="faq-answer-wrapper"
                style={{ 
                  maxHeight: openId === faq.id ? '300px' : '0px',
                  opacity: openId === faq.id ? 1 : 0
                }}
              >
                <div className="faq-answer">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQPreview;
