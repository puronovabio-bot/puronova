import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';
import './IngredientDetails.css';

import citrusImg from '../assets/ingredient_citrus.png';
import aloeImg from '../assets/ingredient_aloe.png';
import turmericImg from '../assets/ingredient_turmeric.png';
import guargumImg from '../assets/ingredient_guargum.png';
import jaggeryImg from '../assets/ingredient_jaggery.png';

const ingredientsData = [
  {
    id: 1,
    name: "Citrus Bio-Enzyme",
    scientific: "Natural Fermentation",
    description: "Bio-enzymes are natural catalysts produced through fermentation of citrus peels and natural materials. They help break down grease, stains, and odors naturally without harsh chemicals.",
    extendedDetails: "Our bio-enzymes are cultured slowly to ensure maximum potency. When used in cleaning, they continue to work long after application, breaking down microscopic grime and maintaining a truly clean environment without leaving harmful residues.",
    usedIn: 3,
    image: citrusImg
  },
  {
    id: 2,
    name: "Aloe Vera Gel",
    scientific: "Aloe barbadensis Miller",
    description: "Aloe vera has been used for centuries across cultures for its soothing, hydrating, and skin-calming properties. Rich in vitamins and antioxidants, it supports gentle daily skincare.",
    extendedDetails: "We source pure, unadulterated aloe vera extract that retains its natural polysaccharides. It acts as a perfect natural moisturizer and humectant, pulling hydration into the skin while calming inflammation.",
    usedIn: 2,
    image: aloeImg
  },
  {
    id: 3,
    name: "Raw Turmeric & Neem",
    scientific: "Curcuma longa & Azadirachta indica",
    description: "Used across Indian traditions for centuries, these botanicals bring natural antibacterial and antioxidant benefits. Neem offers powerful cleansing while turmeric supports healthy skin and wellness.",
    extendedDetails: "The synergy between neem and turmeric is a cornerstone of traditional skincare. We use raw, potent extracts to ensure the active compounds like curcumin and nimbin are preserved to deliver their full protective benefits.",
    usedIn: 2,
    image: turmericImg
  },
  {
    id: 4,
    name: "Guar Gum",
    scientific: "Cyamopsis tetragonoloba",
    description: "A natural thickener derived from guar beans, guar gum gives our formulations smooth texture and stability without relying on synthetic additives.",
    extendedDetails: "By utilizing guar gum, we avoid synthetic polymers often found in conventional products. It binds our natural ingredients together effectively and leaves no sticky or toxic residue on your skin or surfaces.",
    usedIn: 4,
    image: guargumImg
  }
];

const IngredientDetails = () => {
  const { slug } = useParams();
  const getSlug = (name) => name.toLowerCase().replace(/ /g, '-').replace(/[&]/g, 'and');
  
  const ingredient = ingredientsData.find(i => getSlug(i.name) === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [ingredient]);

  if (!ingredient) {
    return (
      <div className="container" style={{ padding: '160px 0', textAlign: 'center' }}>
        <h2>Ingredient not found</h2>
        <Link to="/ingredients" className="btn btn-primary" style={{ marginTop: '20px' }}>Back to Library</Link>
      </div>
    );
  }

  return (
    <div className="ingredient-details-page">
      <SEO 
        title={ingredient.name} 
        description={ingredient.description} 
        url={`/ingredients/${slug}`}
        image={ingredient.image}
      />
      <div className="container">
        <Link to="/ingredients" className="back-link">
          <ArrowLeft size={18} /> Back to Library
        </Link>
        
        <div className="ingredient-details-grid">
          <div className="ingredient-image-col">
            <div className="ingredient-image-large">
              <img src={ingredient.image} alt={ingredient.name} />
            </div>
          </div>
          
          <div className="ingredient-info-col">
            <span className="ingredient-scientific-large">{ingredient.scientific}</span>
            <h1 className="ingredient-title-large">{ingredient.name}</h1>
            
            <div className="ingredient-desc-large">
              <p>{ingredient.description}</p>
              <p>{ingredient.extendedDetails}</p>
            </div>
            
            <div className="ingredient-stats">
              <div className="stat-box">
                <span className="stat-label">Used In</span>
                <span className="stat-value">{ingredient.usedIn} Products</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">Origin</span>
                <span className="stat-value">Natural Extract</span>
              </div>
            </div>
            
            <div className="ingredient-action">
              <Link to="/shop" className="btn btn-primary">Shop Products</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
