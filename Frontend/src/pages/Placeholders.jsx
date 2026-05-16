import React from 'react';

const PagePlaceholder = ({ title }) => (
  <div style={{ paddingTop: '120px', minHeight: '80vh', textAlign: 'center' }}>
    <div className="container">
      <h1 className="heading-lg" style={{ marginBottom: '2rem' }}>{title}</h1>
      <p className="text-lead" style={{ margin: '0 auto' }}>
        This page is under construction. It will feature premium minimal design in line with Puro Nova's brand.
      </p>
    </div>
  </div>
);

export const Shop = () => <PagePlaceholder title="Shop Puro Nova" />;
export const Philosophy = () => <PagePlaceholder title="Our Philosophy" />;
export const Ingredients = () => <PagePlaceholder title="Ingredients Library" />;
export const Learn = () => <PagePlaceholder title="Learn & Blog" />;
export const About = () => <PagePlaceholder title="About Us" />;
