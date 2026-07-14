import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './App.css';

// Layout Components
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import FloatingPhoneIcons from './components/floatingPhoneIcons/FloatingPhoneIcons';

// Pages (Lazy Loaded)
const Home = lazy(() => import('./pages/home/Home'));
const About = lazy(() => import('./pages/about/About'));
const Services = lazy(() => import('./pages/services/Services'));
const ServiceAreas = lazy(() => import('./pages/serviceAreas/ServiceAreas'));
const Contact = lazy(() => import('./pages/contact/Contact'));
const Articles = lazy(() => import('./pages/articles/Articles'));
const ArticleDetails = lazy(() => import('./pages/articleDetails/ArticleDetails'));
const WinchLocationSEO = lazy(() => import('./pages/winchLocation/WinchLocationSEO'));

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="App">
          <Header />
          <div className="main-content">
            <Suspense fallback={<div style={{ padding: '50px', textAlign: 'center' }}>جاري التحميل...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/areas" element={<ServiceAreas />} />
                <Route path="/winch/:location" element={<WinchLocationSEO />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/articles/:slug" element={<ArticleDetails />} />
              </Routes>
            </Suspense>
          </div>
          <FloatingPhoneIcons />
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
