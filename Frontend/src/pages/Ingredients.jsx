import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import './Ingredients.css';
import ingredientsHero from '../assets/ingredients_hero.png';
import citrusImg from '../assets/ingredient_citrus.png';
import aloeImg from '../assets/ingredient_aloe.png';
import turmericImg from '../assets/ingredient_turmeric.png';
import guargumImg from '../assets/ingredient_guargum.png';
import jaggeryImg from '../assets/ingredient_jaggery.png';

const Ingredients = () => {
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

  const getSlug = (name) => name.toLowerCase().replace(/ /g, '-').replace(/[&]/g, 'and');

  const ingredients = [
    {
      id: 1,
      name: "Citrus Bio-Enzyme",
      scientific: "Natural Fermentation",
      description: "Bio-enzymes are natural catalysts produced through fermentation of citrus peels and natural materials. They help break down grease, stains, and odors naturally without harsh chemicals.",
      usedIn: 3,
      image: citrusImg
    },
    {
      id: 2,
      name: "Aloe Vera Gel",
      scientific: "Aloe barbadensis Miller",
      description: "Aloe vera has been used for centuries across cultures for its soothing, hydrating, and skin-calming properties. Rich in vitamins and antioxidants, it supports gentle daily skincare.",
      usedIn: 2,
      image: aloeImg
    },
    {
      id: 3,
      name: "Raw Turmeric & Neem",
      scientific: "Curcuma longa & Azadirachta indica",
      description: "Used across Indian traditions for centuries, these botanicals bring natural antibacterial and antioxidant benefits. Neem offers powerful cleansing while turmeric supports healthy skin and wellness.",
      usedIn: 2,
      image: turmericImg
    },
    {
      id: 4,
      name: "Guar Gum",
      scientific: "Cyamopsis tetragonoloba",
      description: "A natural thickener derived from guar beans, guar gum gives our formulations smooth texture and stability without relying on synthetic additives.",
      usedIn: 4,
      image: guargumImg
    }
  ];

  return (
    <div className="ingredients-page">
      <SEO 
        title="Ingredient Library" 
        description="An honest guide to every botanical, enzyme, and natural active we use in Puro Nova products." 
        url="/ingredients"
      />
      {/* Hero Banner */}
      <section className="ingredients-hero">
        <div className="ingredients-hero-image">
          <img src={ingredientsHero} alt="Botanical laboratory" className="img-cover" />
        </div>
        <div className="container">
          <div className="ingredients-hero-content reveal">
            <h1 className="heading-lg">The Ingredient Library</h1>
            <p className="text-lead">
              We believe you should know exactly what goes into every product you bring into your home. This is our ingredient library — an honest guide to every botanical, enzyme, and natural active we use.
            </p>
          </div>
        </div>
      </section>

      {/* Ingredients Grid */}
      <section className="ingredients-list-section section-padding">
        <div className="container">
          <div className="ingredients-grid">
            {ingredients.map((item, index) => (
              <Link to={`/ingredients/${getSlug(item.name)}`} style={{textDecoration: 'none', color: 'inherit'}} key={item.id}>
                <div
                  className={`ingredient-card reveal delay-${index % 3 + 1} ${!item.image ? 'text-only-card' : ''}`}
                >
                  {item.image && (
                    <div className="ingredient-image-wrapper">
                      <img src={item.image} alt={item.name} className="img-cover" />
                    </div>
                  )}
                  <div className="ingredient-info">
                    <h2 className="ingredient-name">{item.name}</h2>
                    <span className="ingredient-scientific">{item.scientific}</span>
                    <p className="ingredient-desc">{item.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Ingredients;
