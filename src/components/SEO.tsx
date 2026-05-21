import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  type?: string;
  image?: string;
  url?: string;
}

export function SEO({ 
  title, 
  description, 
  type = 'website',
  image = 'https://www.ginashe.academy/gda_institutional_seal_cyan.png',
  url
}: SEOProps) {
  const fullTitle = `${title} | Ginashe Academy`;

  // Determine canonical URL dynamically based on current location if not explicitly provided
  const canonicalUrl = url || (typeof window !== 'undefined' 
    ? `https://www.ginashe.academy${window.location.pathname}`
    : 'https://www.ginashe.academy/');

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}

