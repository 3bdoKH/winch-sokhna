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
import SEO from '../../components/seo/SEO';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home-page">
      <SEO
        title="ونش انقاذ العين السخنة | ونش السخنه | ونش انقاذ السخنه 24/7 | 01143433875"
        description="أسرع ونش انقاذ العين السخنة و ونش السخنه 24 ساعة. إذا تعطلت سيارتك وتبحث عن ونش انقاذ السخنه أو ونش العين السخنه وسحب سيارات بأرخص سعر وخصم 50% اتصل بنا 01143433875."
        path="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": "https://www.winchelsokhna.com/#website",
              "url": "https://www.winchelsokhna.com",
              "name": "ونش انقاذ العين السخنة",
              "description": "أسرع ونش انقاذ العين السخنة و ونش السخنه 24 ساعة. سحب إنقاذ سيارات بخصم 50%.",
              "inLanguage": "ar"
            },
            {
              "@type": "Organization",
              "@id": "https://www.winchelsokhna.com/#organization",
              "name": "ونش انقاذ العين السخنة",
              "url": "https://www.winchelsokhna.com",
              "logo": "https://www.winchelsokhna.com/images/10.webp",
              "telephone": "01143433875"
            },
            {
              "@type": "AutomotiveBusiness",
              "@id": "https://www.winchelsokhna.com/#localbusiness",
              "name": "ونش انقاذ العين السخنة - ونش السخنه",
              "alternateName": [
                "ونش السخنه",
                "ونش السخنة",
                "ونش انقاذ السخنه",
                "ونش انقاذ السخنة",
                "ونش العين السخنه",
                "ونش العين السخنة",
                "ونش انقاذ العين السخنه",
                "ونش انقاذ العين السخنة"
              ],
              "url": "https://www.winchelsokhna.com",
              "telephone": "01143433875",
              "priceRange": "$$",
              "image": "https://www.winchelsokhna.com/images/10.webp",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "العين السخنة",
                "addressRegion": "السويس",
                "addressCountry": "EG"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "29.6105",
                "longitude": "32.3486"
              },
              "description": "أسرع ونش انقاذ العين السخنة و ونش السخنه 24 ساعة. سحب إنقاذ سيارات في السخنة والقرى السياحية وطريق الجلالة بخصم 50%. اتصل الان 01143433875.",
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                "opens": "00:00",
                "closes": "23:59"
              },
              "areaServed": [
                { "@type": "AdministrativeArea", "name": "العين السخنة" },
                { "@type": "AdministrativeArea", "name": "طريق السخنة" },
                { "@type": "AdministrativeArea", "name": "بورتو السخنة" },
                { "@type": "AdministrativeArea", "name": "الجلالة" }
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5.0",
                "bestRating": "5",
                "worstRating": "1",
                "ratingCount": "1850",
                "reviewCount": "1850"
              }
            }
          ]
        }}
      />
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
