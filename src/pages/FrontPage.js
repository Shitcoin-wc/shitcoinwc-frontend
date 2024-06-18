import React, { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet';
import InclinedSeparator from '../components/ui/InclinedSeparator/InclinedSeparator';
import ParallaxSection from '../pages/sections/ParallaxSection';
import AirdropSection from '../pages/sections/AirdropSection'; 
import Footer from '../components/Footer';

// Lazy load the sections
const FlushForce = lazy(() => import('../pages/sections/FlushForce'));
const PancakeSwap = lazy(() => import('../pages/sections/PancakeSwap'));
const FAQDisplay = lazy(() => import('../pages/sections/FAQDisplay'));

function FrontPage() {
  return (
    <div>
        <Helmet>
        <title>Shitcoin WC - Dump Your Shitcoins and Memecoins with ShitcoinWC!</title>
        <meta name="description" content="Join Shitcoin WC to transform underperforming tokens into valuable assets. Clean up your crypto wallet and enjoy our fun and profitable platform!" />
        <meta name="keywords" content="memecoin, shitcoin, Shitcoin WC, crypto transformation, crypto recycling, underperforming tokens" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@shitcoinwc" />
        <meta name="twitter:title" content="Shitcoin WC - Dump Your Shitcoins and Memecoins with ShitcoinWC!" />
        <meta name="twitter:description" content="Turn your crypto trash into treasure with Shitcoin WC. Join us for a fun and profitable ride!" />
        <meta name="twitter:image" content="https://shitcoinwc.com/twitter-image.jpg" />

        {/* Open Graph (Facebook) */}
        <meta property="og:title" content="Shitcoin WC - Dump Your Shitcoins and Memecoins with ShitcoinWC!" />
        <meta property="og:description" content="Turn your crypto trash into treasure with Shitcoin WC. Join us for a fun and profitable ride!" />
        <meta property="og:image" content="https://shitcoinwc.com/og-image.jpg" />
        <meta property="og:url" content="https://shitcoinwc.com" />
        <meta property="og:type" content="website" />
      </Helmet>
      <ParallaxSection />
      <AirdropSection /> 
      <Suspense fallback={<div>Loading...</div>}>
        <FlushForce />
      </Suspense>
      <InclinedSeparator angle={-3} topColorVar="--color-super-light-peach" bottomColorVar="--color-blue3" />
      <Suspense fallback={<div>Loading...</div>}>
        <PancakeSwap className="bg-blue3" />
      </Suspense>
      <InclinedSeparator angle={2} topColorVar="--color-blue3" bottomColorVar="--color-mint-cream" />
      <Suspense fallback={<div>Loading...</div>}>
        <FAQDisplay className="bg-mint-cream" />
      </Suspense>
      <Footer />
    </div>
  );
}

export default FrontPage;
