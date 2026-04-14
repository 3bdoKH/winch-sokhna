import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { phoneNumbers, whatsappNumbers } from '../../data/phoneNumbers';
import './FloatingPhoneIcons.css';

const FloatingPhoneIcons = () => {
  const primaryPhone = phoneNumbers[0];
  const primaryWhatsapp = whatsappNumbers[0];

  return (
    <div className="floating-icons-container">
      <a 
        href={`https://wa.me/2${primaryWhatsapp}`} 
        className="floating-btn whatsapp-btn"
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle size={28} />
      </a>
      <a 
        href={`tel:${primaryPhone}`} 
        className="floating-btn phone-btn"
        aria-label="Call Now"
      >
        <Phone size={28} />
      </a>
    </div>
  );
};

export default FloatingPhoneIcons;
