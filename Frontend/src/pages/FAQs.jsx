import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import './FAQs.css';

const faqs = [
  {
    question: "What are bio-enzymes and how do they clean?",
    answer: "Bio-enzymes are natural proteins produced by beneficial bacteria that break down complex waste into simpler, harmless substances. They naturally cut through grease, dirt, and stains without the need for harsh chemicals, making them safe for your family and the environment."
  },
  {
    question: "Are your products safe for babies and pets?",
    answer: "Yes! Our products are formulated with plant-based ingredients and are free from harsh additives. We use natural cleaning agents that are gentle on surfaces, skin, and completely safe for homes with babies and pets."
  },
  {
    question: "What is your shipping timeline?",
    answer: "Orders are typically processed within 24-48 hours. Standard delivery takes 3-7 business days depending on your location. You will receive a tracking link via email once your order is dispatched."
  },
  {
    question: "Do you accept returns or exchanges?",
    answer: "Due to the hygiene, safety, and natural composition of our products, all sales are final. We do not accept returns or exchanges to maintain our strict quality standards. However, if you receive a damaged or incorrect item, please contact us within 48 hours for a resolution."
  },
  {
    question: "How should I store Puro Nova products?",
    answer: "Our natural products should be stored in a cool, dry place away from direct sunlight. Since we avoid artificial preservatives, extreme heat or direct sunlight may affect the natural ingredients, though the efficacy remains intact."
  },
  {
    question: "What is the shelf life of your products?",
    answer: "Most of our products have a shelf life of 12-24 months from the date of manufacture. Please check the specific product label for the exact expiration date and best before recommendations."
  },
  {
    question: "Why do your products foam less than commercial brands?",
    answer: "Commercial brands use artificial foaming agents (like SLS/SLES) which don't actually improve cleaning. We use natural, coconut-based surfactants that create a mild, gentle lather but clean just as effectively, if not better, while being kinder to your skin and the planet."
  },
  {
    question: "Are your food products natural?",
    answer: "Yes, our Heart-full Foods range uses high-quality, traditionally processed ingredients. Our dry fruit laddus are made with pure cow ghee and contain absolutely no refined sugar."
  },
  {
    question: "Can I use your floor cleaner on marble or wooden floors?",
    answer: "Absolutely. Our Floor Cleaner is pH-balanced and made with gentle bio-enzymes, making it completely safe and effective for all types of flooring including marble, wood, granite, and tiles."
  },
  {
    question: "Do your products contain artificial fragrances?",
    answer: "No, we do not use synthetic fragrances. The pleasant scent in our products comes entirely from natural essential oils, natural extracts, and the natural aroma of the ingredients themselves."
  }
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faqs-page">
      <SEO 
        title="Frequently Asked Questions" 
        description="Find answers to common questions about Puro Nova products, ingredients, shipping, and return policies." 
        url="/faqs"
      />
      <div className="faqs-header">
        <div className="container">
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions about our products, ingredients, and policies.</p>
        </div>
      </div>
      
      <div className="container">
        <div className="faqs-container">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${openIndex === index ? 'active' : ''}`}
            >
              <button 
                className="faq-question" 
                onClick={() => toggleAccordion(index)}
              >
                {faq.question}
                <i className={`fa-solid fa-chevron-down faq-icon ${openIndex === index ? 'rotate' : ''}`}></i>
              </button>
              <div 
                className="faq-answer-wrapper"
                style={{ 
                  maxHeight: openIndex === index ? '500px' : '0',
                  opacity: openIndex === index ? 1 : 0
                }}
              >
                <div className="faq-answer">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="faqs-contact">
          <h3>Still have questions?</h3>
          <p>We're here to help! Reach out to our support team.</p>
          <a href="/contact" className="btn btn-primary">Contact Us</a>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
