import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, url, image }) => {
  const defaultTitle = "Puro Nova | Modern Natural Living";
  const defaultDescription = "Discover our range of herbal personal care and eco-friendly home care products, crafted from nature for a healthier lifestyle.";
  const siteUrl = "https://www.puronova.in";
  const defaultImage = `${siteUrl}/og-image.jpg`; // Fallback to a default image

  const seoTitle = title ? (title.includes('Puro Nova') ? title : `${title} | Puro Nova`) : defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoUrl = url ? `${siteUrl}${url}` : siteUrl;
  const seoImage = image || defaultImage;

  return (
    <Helmet>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={seoUrl} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
      
      {/* Canonical Link */}
      <link rel="canonical" href={seoUrl} />
    </Helmet>
  );
};

export default SEO;
