import React, { useEffect } from 'react';
import './About.css';
import SEO from '../components/SEO';
import aboutHero from '../assets/about_hero.png';
import aboutIngredients from '../assets/about_ingredients.png';
import aboutFamily from '../assets/about_family.png';
import aboutTeam from '../assets/about-team-puronova.jpg';

const About = () => {
  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-page">
      <SEO 
        title="About Us" 
        description="Learn about Puro Nova's story, our values, and our mission to provide natural, honest products for everyday homes." 
        url="/about"
      />
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-image">
          <img src={aboutHero} alt="A modern Hyderabad home" className="img-cover" />
        </div>
        <div className="container">
          <div className="about-hero-content reveal">
            <h1 className="heading-lg">A Hyderabad story about everyday homes</h1>
            <p className="text-lead">
              Puro Nova started with a simple, persistent frustration: the products available for everyday cleaning and personal care either worked or were gentle — rarely both, and almost never transparent about what was inside them.
            </p>
          </div>
        </div>
      </section>

      {/* Story Content Section */}
      <section className="about-story section-padding">
        <div className="container about-story-grid">
          <div className="story-text reveal delay-1">
            <p>
              We are a small brand based in Hyderabad, Telangana, making plant-based products for everyday homes. Our range covers three areas where households engage with chemistry every day: home care, personal care, and wellness.
            </p>
            <p>
              The Puro Nova brand architecture is deliberate. NeatCo is our home care range — bio-enzyme powered cleaners that work without harshness. TouchCo is our personal care range — botanical formulas built for daily use. Wellness by Puro Nova is our range of traditional wellness preparations. Heartful Foods is a separate brand in our ecosystem focused on wholesome Indian food.
            </p>
            <p>
              We are FSSAI registered and produce from our facility in Bowrampet, Hyderabad. We produce in small batches — not because we have to, but because we think it matters.
            </p>
            <p>
              We are not an ayurvedic brand in the traditional marketing sense. We don’t use Sanskrit slogans or imagery of women in sarees holding tulsi sprigs. We are a contemporary Indian brand that respects traditional knowledge enough to use it thoughtfully rather than decoratively.
            </p>
            <p>
              Our products are used in homes with children, elderly family members, people with sensitive skin, and people who simply want to understand what they’re bringing into their living spaces. We formulate with all of them in mind.
            </p>
            <p className="highlight-text">
              We believe that natural can mean effective, that transparent can mean trustworthy, and that everyday homes deserve products made with genuine care. That’s what we’re building.
            </p>
          </div>
          
          <div className="story-right-col">
            <div className="story-quote reveal delay-2">
              <blockquote>
                “We started Puro Nova because we couldn’t find products we trusted for our own home. That frustration became our compass.”
              </blockquote>
              <cite>— Hyderabad, Telangana</cite>
            </div>
            <div className="story-team-image reveal delay-3">
              <img src={aboutTeam} alt="The Puro Nova Team" />
            </div>
          </div>
        </div>
      </section>

      {/* Ingredients Section */}
      <section className="about-ingredients section-padding">
        <div className="container ingredients-grid">
          <div className="ingredients-image reveal">
            <img src={aboutIngredients} alt="Thoughtful natural ingredients" className="img-cover radius-lg" />
          </div>
          <div className="ingredients-content reveal delay-1">
            <span className="section-subtitle">What Drives Us</span>
            <h2 className="heading-md">Thoughtful ingredients for everyday homes</h2>
            <p>
              We source botanicals with long safety histories and combine them with modern bio-enzyme technology. The result is a range that genuinely works — without the harshness of conventional alternatives.
            </p>
          </div>
        </div>
      </section>

      {/* Brand Family Section */}
      <section className="about-family section-padding">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-subtitle">Our Ecosystem</span>
            <h2 className="heading-md">Our Brand Family</h2>
          </div>
          
          <div className="family-grid">
            <div className="family-card reveal">
              <h3>NeatCo by Puro Nova</h3>
              <p>Home care. Bio-enzyme powered dish wash, detergent, floor cleaner, and toilet cleaner.</p>
            </div>
            
            <div className="family-card reveal delay-1">
              <h3>TouchCo by Puro Nova</h3>
              <p>Personal care. Face wash, body wash, hand wash, vedic tooth powder, and face pack.</p>
            </div>
            
            <div className="family-card reveal delay-2">
              <h3>Wellness by Puro Nova</h3>
              <p>Traditional wellness. Herbal tea, bio salt liquid, and Amrutha Dhara.</p>
            </div>
            
            <div className="family-card reveal delay-3">
              <h3>Heartful Foods</h3>
              <p>Wholesome food. Dry fruit laddus, sesame laddus, protein powder, jaggery, and papads.</p>
            </div>
          </div>
          
          <div className="family-image reveal delay-1">
            <img src={aboutFamily} alt="Our natural care brand family" className="img-cover radius-lg" />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="about-contact section-padding">
        <div className="container">
          <div className="contact-box reveal glass-panel">
            <h2 className="heading-md text-center">Find Us</h2>
            <div className="contact-info-grid">
              <div className="contact-info-item">
                <h4>Address</h4>
                <p>Tripura landmark2,<br/>Opposite Srk Green Park,<br/>Bowrampet, Hyderabad,<br/>Telangana — 500043</p>
              </div>
              <div className="contact-info-item">
                <h4>Phone</h4>
                <p>+91 80192 32666</p>
              </div>
              <div className="contact-info-item">
                <h4>Email</h4>
                <p><a href="mailto:hello@puronova.in">hello@puronova.in</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
