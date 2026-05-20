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
  url = 'https://www.ginashe.academy/'
}: SEOProps) {
  const fullTitle = `${title} | Ginashe Academy`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
