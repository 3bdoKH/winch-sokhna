import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, Home, Info, Wrench, MapPin, MessageSquare, BookOpen } from 'lucide-react';
import { phoneNumbers } from '../../data/phoneNumbers';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { name: 'الرئيسية', path: '/', icon: <Home size={18} /> },
    { name: 'خدماتنا', path: '/services', icon: <Wrench size={18} /> },
    { name: 'مناطق التغطية', path: '/areas', icon: <MapPin size={18} /> },
    { name: 'من نحن', path: '/about', icon: <Info size={18} /> },
    { name: 'المقالات', path: '/articles', icon: <BookOpen size={18} /> },
    { name: 'اتصل بنا', path: '/contact', icon: <MessageSquare size={18} /> }
  ];

  const primaryPhone = phoneNumbers[0];

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo">
          <span className="logo-text">ونش انقاذ<span className="logo-highlight"> السخنة</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link 
                  to={link.path} 
                  className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <a href={`tel:${primaryPhone}`} className="btn-primary d-none-mobile">
            <Phone size={18} />
            {primaryPhone}
          </a>
          <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle Menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-list">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link 
                to={link.path} 
                className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.icon}
                {link.name}
              </Link>
            </li>
          ))}
          <li>
            <a href={`tel:${primaryPhone}`} className="mobile-nav-link call-btn">
              <Phone size={18} />
              اتصل الآن: {primaryPhone}
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
