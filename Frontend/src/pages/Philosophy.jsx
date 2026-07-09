import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import './Philosophy.css';
import heroImg from '../assets/philosophy_hero.png';
import principlesImg from '../assets/philosophy_principles.png';
import natureScienceImg from '../assets/philosophy_nature_science.png';

const Philosophy = () => {
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
    <div className="philosophy-page">
      <SEO 
        title="Our Philosophy" 
        description="Read about Puro Nova's commitment to plant-based formulations, bio-enzyme technology, and honest ingredients." 
        url="/philosophy"
      />
      {/* Hero Banner */}
      <section className="philosophy-hero">
        <div className="philosophy-hero-image">
          <img src={heroImg} alt="Modern Natural Living" className="img-cover" />
        </div>
        <div className="container">
          <div className="philosophy-hero-content reveal">
            <h1 className="heading-lg">Our Philosophy</h1>
            <p className="text-lead">
              How and why we make what we make. Modern Natural Living isn’t a tagline we came up with in a branding session. It’s the actual organising principle behind every product decision we make.
            </p>
          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section className="principles-section section-padding">
        <div className="container">
          <div className="section-header reveal text-center">
            <span className="section-subtitle">Core Values</span>
            <h2 className="heading-md">Five principles that guide us</h2>
          </div>
          
          <div className="principles-grid">
            <div className="principles-image reveal">
              <img src={principlesImg} alt="Careful formulation" className="img-cover radius-lg shadow-md" />
            </div>
            
            <div className="principles-list">
              <div className="principle-item reveal delay-1">
                <div className="principle-number">01</div>
                <div className="principle-content">
                  <h3>We don’t add what we can’t explain</h3>
                  <p>Every ingredient in every product has a clear, articulable purpose. If we can’t explain why it’s there in plain language, it doesn’t belong. This is our first and most important principle.</p>
                </div>
              </div>
              
              <div className="principle-item reveal delay-2">
                <div className="principle-number">02</div>
                <div className="principle-content">
                  <h3>Traditional knowledge is valid knowledge</h3>
                  <p>Centuries of accumulated observational practice across Ayurveda, Siddha, and household traditions represent meaningful evidence. We draw on it — and we don’t feel the need to apologise for doing so.</p>
                </div>
              </div>
              
              <div className="principle-item reveal delay-3">
                <div className="principle-number">03</div>
                <div className="principle-content">
                  <h3>We formulate for the whole family</h3>
                  <p>Our products are used in homes with children, elderly family members, and people with sensitive skin. We keep that reality front of mind. Not as a marketing claim — as a design constraint.</p>
                </div>
              </div>
              
              <div className="principle-item reveal delay-4">
                <div className="principle-number">04</div>
                <div className="principle-content">
                  <h3>Small-batch integrity over scale</h3>
                  <p>We produce in small batches. It limits how fast we grow. It also means fresher products, tighter QC, and the kind of care that gets lost when production is industrialised.</p>
                </div>
              </div>
              
              <div className="principle-item reveal delay-5">
                <div className="principle-number">05</div>
                <div className="principle-content">
                  <h3>No hollow claims</h3>
                  <p>We don’t say chemical-free (everything is chemistry), toxin-free (context matters), or 100% natural (some processing is necessary). We say what we mean: plant-based, bio-enzyme powered, free from harsh additives.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nature and Science Section */}
      <section className="nature-science-section section-padding">
        <div className="container nature-science-grid">
          <div className="ns-content reveal">
            <span className="section-subtitle">What We Believe</span>
            <h2 className="heading-md">Nature and science are not opposites</h2>
            <p>
              We believe the best formulations draw on both. Traditional botanical knowledge gives us generations of safe use data. Modern understanding of biochemistry tells us why it works.
            </p>
            <p>
              Every ingredient in our products sits at that intersection — chosen because it has a clear, explainable purpose and a long record of safe use.
            </p>
          </div>
          <div className="ns-image reveal delay-1">
            <img src={natureScienceImg} alt="Nature and science" className="img-cover radius-lg shadow-md" />
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="comparison-section section-padding">
        <div className="container">
          <div className="comparison-grid reveal">
            <div className="comparison-col avoid">
              <h3>What We Avoid Saying</h3>
              <ul>
                <li><i className="fa-solid fa-xmark"></i> Chemical-free</li>
                <li><i className="fa-solid fa-xmark"></i> Toxin-free</li>
                <li><i className="fa-solid fa-xmark"></i> 100% safe</li>
                <li><i className="fa-solid fa-xmark"></i> Miracle formula</li>
                <li><i className="fa-solid fa-xmark"></i> Cures or heals anything</li>
              </ul>
            </div>
            
            <div className="comparison-col instead">
              <h3>What We Say Instead</h3>
              <ul>
                <li><i className="fa-solid fa-check"></i> Plant-based</li>
                <li><i className="fa-solid fa-check"></i> Bio-enzyme powered</li>
                <li><i className="fa-solid fa-check"></i> Thoughtfully formulated</li>
                <li><i className="fa-solid fa-check"></i> Family-conscious</li>
                <li><i className="fa-solid fa-check"></i> Free from harsh additives</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="philosophy-cta section-padding">
        <div className="container text-center reveal">
          <h2 className="heading-md">Our Ingredient Promise</h2>
          <p className="cta-text">
            Every ingredient has a reason to be there. We source botanicals, herbs, and bio-enzymes that have been used in Indian households for centuries. Turmeric, neem, aloe vera, citrus enzymes — each with a well-understood function.
          </p>
          <p className="cta-text highlight">
            No fillers. No marketing ingredients. If we can’t explain it plainly, it doesn’t go in.
          </p>
          <div className="cta-box">
            <h3>Read about our ingredients</h3>
            <p>Every ingredient we use has a story. We tell it.</p>
            <Link to="/ingredients" className="btn btn-primary mt-4">Explore Ingredients ➔</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export { Philosophy };
export default Philosophy;
