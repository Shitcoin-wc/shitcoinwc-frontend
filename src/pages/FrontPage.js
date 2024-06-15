// FrontPage.js

import React, { Suspense, lazy } from 'react';
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
