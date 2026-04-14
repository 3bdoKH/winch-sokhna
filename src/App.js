import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Layout Components
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import FloatingPhoneIcons from './components/floatingPhoneIcons/FloatingPhoneIcons';

// Pages
import Home from './pages/home/Home';
import About from './pages/about/About';
import Services from './pages/services/Services';
import ServiceAreas from './pages/serviceAreas/ServiceAreas';
import AreaDetails from './pages/areaDetails/AreaDetails';
import Contact from './pages/contact/Contact';
import Articles from './pages/articles/Articles';
import ArticleDetails from './pages/articleDetails/ArticleDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/areas" element={<ServiceAreas />} />
            <Route path="/areas/:areaName" element={<AreaDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:slug" element={<ArticleDetails />} />
          </Routes>
        </div>
        <FloatingPhoneIcons />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
