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
              "description": "أسرع ونش انقاذ العين السخنة و ونش السخنه 24 ساعة. سحب إنقاذ سيارات وخدمات مساعدة على الطريق.",
              "inLanguage": "ar"
            },
            {
              "@type": "Organization",
              "@id": "https://www.winchelsokhna.com/#organization",
              "name": "ونش انقاذ العين السخنة",
              "url": "https://www.winchelsokhna.com",
              "logo": "https://www.winchelsokhna.com/images/10.webp",
              "telephone": "+201143433875"
            },
            {
              "@type": ["EmergencyService", "AutomotiveBusiness"],
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
              "telephone": "+201143433875",
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
              "description": "أسرع خدمة ونش انقاذ وسحب سيارات على مدار 24 ساعة في العين السخنة، طريق الجلالة، طريق الزعفرانة، وطريق القطامية - السخنة. اتصل الآن 01143433875.",
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                "opens": "00:00",
                "closes": "23:59"
              },
              "areaServed": [
                { "@type": "AdministrativeArea", "name": "العين السخنة" },
                { "@type": "AdministrativeArea", "name": "السويس" },
                { "@type": "AdministrativeArea", "name": "الجلالة" },
                { "@type": "AdministrativeArea", "name": "الزعفرانة" },
                { "@type": "AdministrativeArea", "name": "بور توفيق" },
                { "@type": "AdministrativeArea", "name": "بورتو السخنة" },
                { "@type": "AdministrativeArea", "name": "طريق العين السخنة" },
                { "@type": "AdministrativeArea", "name": "طريق الجلالة" },
                { "@type": "AdministrativeArea", "name": "طريق الزعفرانة" }
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "خدمات ونش إنقاذ السيارات في العين السخنة",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "ونش إنقاذ وسحب سيارات السخنة",
                      "description": "سحب ونقل السيارات المعطلة وحوادث الطرق على مدار 24 ساعة"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "سطحات هيدروليكية لنقل السيارات",
                      "description": "نقل آمن للسيارات الحديثة والرياضية والفارهة بدون احتكاك"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "خدمات الطوارئ والمساعدة على الطريق",
                      "description": "تزويد الوقود، شحن وتبديل البطاريات، وتغيير الإطارات في موقع العطل"
                    }
                  }
                ]
              }
            },
            {
              "@type": "SiteNavigationElement",
              "@id": "https://www.winchelsokhna.com/#navigation",
              "name": "أقسام ونش انقاذ السخنة",
              "hasPart": [
                { "@type": "WebPage", "name": "الرئيسية", "url": "https://www.winchelsokhna.com/" },
                { "@type": "WebPage", "name": "خدماتنا", "url": "https://www.winchelsokhna.com/services" },
                { "@type": "WebPage", "name": "مناطق التغطية", "url": "https://www.winchelsokhna.com/areas" },
                { "@type": "WebPage", "name": "المقالات والنصائح", "url": "https://www.winchelsokhna.com/articles" },
                { "@type": "WebPage", "name": "اتصل بنا", "url": "https://www.winchelsokhna.com/contact" }
              ]
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
