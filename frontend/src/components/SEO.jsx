import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  path = '', 
  type = 'website',
  image = '/og-image.png'
}) => {
  const baseUrl = 'https://multigameverse.com';
  const fullUrl = `${baseUrl}${path}`;
  const fullTitle = title ? `${title} | Multi Game Verse` : 'Multi Game Verse - Free Classic Arcade Games Online';
  const defaultDescription = 'Play 6 classic arcade games free online - Snake, Tetris, Pac-Man, Wordle, Tic-Tac-Toe & Flappy Bird. No downloads, instant play, mobile-optimized retro gaming experience.';

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      
      {/* Canonical URL - Critical for SEO */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={`${baseUrl}${image}`} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={`${baseUrl}${image}`} />
    </Helmet>
  );
};

export default SEO;
