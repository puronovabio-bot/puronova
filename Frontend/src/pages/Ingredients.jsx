import React from 'react';

const ingredients = [
  { name: 'Citrus Bio-Enzyme', desc: 'A natural degreaser made from fermented citrus peels. Powerful against grime, gentle on surfaces.' },
  { name: 'Aloe Vera Gel', desc: 'Deeply hydrating and soothing, sustainably harvested to ensure maximum nutrient retention.' },
  { name: 'Neem Bio-Enzyme', desc: 'Traditional antibacterial properties supercharged through our fermentation process.' },
  { name: 'Raw Turmeric', desc: 'Potent antioxidant used in our wellness blends to support a healthy immune response.' },
];

export const Ingredients = () => (
  <div style={{ paddingTop: 'var(--nav-height)' }}>
    <header className="page-header section-padding" style={{ backgroundColor: 'var(--secondary-alt)', textAlign: 'center' }}>
      <div className="container">
        <h1 className="heading-xl mb-4">Ingredients Library</h1>
        <p className="text-lead mx-auto">Radical transparency in every formulation.</p>
      </div>
    </header>

    <section className="section-padding container">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
        {ingredients.map((ing, i) => (
          <div key={i} style={{ padding: '2rem', backgroundColor: 'var(--white)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 className="heading-sm mb-4" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--primary)' }}>{ing.name}</h3>
            <p style={{ color: 'var(--text-light)', lineHeight: '1.6' }}>{ing.desc}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);
