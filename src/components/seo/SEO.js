import React from 'react';
import { Helmet } from 'react-helmet-async';

const DEFAULT_DOMAIN = 'https://www.winchelsokhna.com';
const DEFAULT_IMAGE = `${DEFAULT_DOMAIN}/images/10.webp`;
const DEFAULT_SITE_NAME = 'ونش انقاذ السخنة';

const SEO = ({
  title,
  description,
  path = '',
  canonicalUrl,
  image = DEFAULT_IMAGE,
  type = 'website',
  jsonLd,
}) => {
  const cleanPath = path ? (path.startsWith('/') ? path : `/${path}`) : '';
  const finalCanonicalUrl = canonicalUrl || `${DEFAULT_DOMAIN}${cleanPath}`;
  const fullImageUrl = image.startsWith('http')
    ? image
    : `${DEFAULT_DOMAIN}${image.startsWith('/') ? '' : '/'}${image}`;

  return (
    <Helmet>
      {/* Primary HTML Meta Tags */}
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={finalCanonicalUrl} />

      {/* Open Graph Tags */}
      <meta property="og:site_name" content={DEFAULT_SITE_NAME} />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={finalCanonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={fullImageUrl} />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={fullImageUrl} />

      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
