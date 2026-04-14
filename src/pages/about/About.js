import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Stats from '../../components/stats/Stats';
import WhatWeOffer from '../../components/whatWeOffer/WhatWeOffer';
import './About.css';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "من نحن | ونش انقاذ السخنة";
  }, []);

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">من نحن</h1>
          <p className="page-breadcrumb">
            <Link to="/">الرئيسية</Link> / <span>من نحن</span>
          </p>
        </div>
      </div>

      <section className="section basic-story">
        <div className="container">
          <div className="story-wrapper">
            <div className="story-content">
              <h2 className="section-title">نبذة عن <span className="highlight">ونش انقاذ السخنة</span></h2>
              <p>
                نحن فريق متخصص في الإنقاذ البري وتقديم المساعدة على الطرق بشتى أنواعها. بدأنا رحلتنا بهدف واضح وهو توفير الأمان والسرعة والاحترافية لكل قائد سيارة يواجه مشكلة مفاجئة. ونظراً لطبيعة طريق العين السخنة الحيوي، تخصصنا وكبرنا لنصبح الشبكة الأكبر.
              </p>
              <p>
                اليوم نحن نمتلك أسطولاً من الأوناش المتطورة، وفريقاً من أكفأ السائقين والفنيين القادرين على التعامل مع أحدث السيارات دون تعريضها لخدش واحد. نعمل على مدار الساعة في معظم محافظات مصر لضمان حصولك على الخدمة في أي وقت تريده.
              </p>
              
              <ul className="mission-vision">
                <li>
                  <strong className="mv-title">رؤيتنا:</strong> أن نصبح الخيار الأول والأكثر موثوقية في مصر لتدخلات الطوارئ على الطرق.
                </li>
                <li>
                  <strong className="mv-title">مهمتنا:</strong> انقاذك بأسرع وقت وأقل تكلفة، والحفاظ على سلامتك وسلامة سيارتك وتلبية احتياجاتك التامة.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Reuse homepage sections for added value */}
      <WhatWeOffer />
      <Stats />
    </div>
  );
};

export default About;
