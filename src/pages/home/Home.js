import React, { useEffect } from 'react';
import Hero from '../../components/hero/Hero';
import OurServices from '../../components/ourServices/OurServices';
import ServiceAreasPreview from '../../components/serviceAreas/ServiceAreasPreview';
import WhatWeOffer from '../../components/whatWeOffer/WhatWeOffer';
import Stats from '../../components/stats/Stats';
import Testimonials from '../../components/testimonials/Testimonials';
import FAQPreview from '../../components/faq/FAQ';
import ArticlesSection from '../../components/articles/ArticlesSection';
import ContactSection from '../../components/contact/ContactSection';
import Keywords from '../../components/keywords/Keywords';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "ونش انقاذ السخنة | أسرع ونش سيارات في مصر | 01143433875";
  }, []);

  return (
    <div className="home-page">
      <Hero />
      <OurServices />
      <ContactSection />
      <WhatWeOffer />
      <Stats />
      <ServiceAreasPreview />
      <ArticlesSection />
      <Testimonials />
      <FAQPreview />
      <Keywords />
    </div>
  );
};

export default Home;
