import React from 'react';
import './WhatsAppFloat.css';
import { MessageCircle } from 'lucide-react';

const WhatsAppFloat = () => {
  // WhatsApp Number without '+'
  const phoneNumber = "919704845883";
  const defaultMessage = "Hello! I have a question about Puro Nova products.";
  
  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <button 
      className="whatsapp-float-btn" 
      onClick={handleWhatsAppClick}
      aria-label="Chat with us on WhatsApp"
    >
      <div className="whatsapp-icon-wrapper">
        <MessageCircle size={28} color="white" />
      </div>
      <span className="whatsapp-tooltip">Chat with us</span>
    </button>
  );
};

export default WhatsAppFloat;
