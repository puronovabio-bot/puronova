import React from 'react';

export const Philosophy = () => (
  <div style={{ paddingTop: 'var(--nav-height)' }}>
    <header className="page-header section-padding" style={{ backgroundColor: 'var(--secondary-alt)', textAlign: 'center' }}>
      <div className="container">
        <h1 className="heading-xl mb-4">Our Philosophy</h1>
        <p className="text-lead mx-auto">How and why we make what we make.</p>
      </div>
    </header>

    <section className="section-padding container">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
        <div>
          <img src="https://images.unsplash.com/photo-1615397323214-e5e6e3c0b05b?q=80&w=1974&auto=format&fit=crop" alt="Nature and Science" className="img-cover" style={{ borderRadius: 'var(--radius-lg)' }} />
        </div>
        <div>
          <h2 className="heading-md mb-4">Nature + Science</h2>
          <p className="mb-4 text-lead">We believe that true wellness comes from aligning traditional botanical wisdom with modern scientific validation.</p>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '1.1rem' }}>
            <li><strong>Bio-Enzyme Powered:</strong> Harnessing nature's deep cleaning forces.</li>
            <li><strong>Family-Conscious:</strong> Safe enough for the smallest hands.</li>
            <li><strong>Small-Batch Quality:</strong> Crafted with intention and care.</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
);
