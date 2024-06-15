// FlusForce.js

import React from 'react';
import { Helmet } from 'react-helmet';
import './flushforce.css';
import GlobalContainer from '../../components/ui/GlobalContainer';
import LockedLiquidityFortress from '../../assets/icons/LockedLiquidityFortress';
import ImmutableWealthWaves from '../../assets/icons/ImmutableWealthWaves';
import FairLaunchFiesta from '../../assets/icons/FairLaunchFiesta';
import CommunityPowerPlay from '../../assets/icons/CommunityPowerPlay';
import AutoLiquidityLagoon from '../../assets/icons/AutoLiquidityLagoon';
import TrashToTreasure from '../../assets/icons/TrashToTreasure';

function FlusForce({ className }) { // Add className as a prop
  return (

    <div className={`FlusForce-section bg-super-light-peach  py-32 text-center w-full `}>

      <Helmet>
        <meta name="description" content="Join Flush Force, the ultimate community-powered cryptocurrency movement! With locked liquidity, immutable supply, and a fair launch, we're setting the stage for a market revolution. No presales, no whales-just equity for all. Embrace the power of unity with Flush Force and make your mark in the crypto world." />
      </Helmet>
    
      <GlobalContainer>

        <h1 className="mb-14 text-center">Flush Force: One Token to Rule the Flow!</h1>
        <p className="mb-4">Forget the forgettable-this is the call to unite under the mightiest flush! Secure, fair, and community-powered, we're the rebellion set to skyrocket into the top 10. Locked liquidity? Like a vault. Immutable supply? Sealed tighter than a toilet lid. Every flush fuels our rise, no presales, no whales, just pure, unadulterated equity. It's time to concentrate our efforts, rally the flush army, and claim our spot at the market's peak. Join the movement where every contribution makes waves.</p>
        <h5 className="mb-16">This is it-Flush Force, where we conquer together!</h5>

        <div className="grid md:grid-cols-2 gap-x-6 gap-y-4">
        
          <div className="tuile-1">
            <div className="tuile-2">
              <div className="tuile-3">
                <LockedLiquidityFortress />
              </div>
              <div className="tuile-4">
                <h6 className="tuile-7">Locked Liquidity Fortress</h6>
                <p className="tuile-5">No Rugs, Just Riches!</p>
              </div>
            </div>
            <p className="tuile-6">With liquidity locked for 5 years, sleep easy knowing your investment is secure.</p>
          </div>

          <div className="tuile-1">
            <div className="tuile-2">
              <div className="tuile-3">
                <ImmutableWealthWaves />
              </div>
              <div className="tuile-4">
                <h6 className="tuile-7">Immutable Wealth Waves</h6>
                <p className="tuile-5">What’s Minted Stays Minted!</p>
              </div>
            </div>
            <p className="tuile-6">Your GSHT stash is sealed by code, forever unaltered, forever yours.</p>
          </div>

          <div className="tuile-1">
            <div className="tuile-2">
              <div className="tuile-3">
                <FairLaunchFiesta />
              </div>
              <div className="tuile-4">
                <h6 className="tuile-7">Fair Launch Fiesta</h6>
                <p className="tuile-5">Zero Presale, Zero Team allocation, Pure Potential!</p>
              </div>
            </div>
            <p className="tuile-6">Everyone starts on the same block. Fair play, full throttle from the get-go.</p>
          </div>

          <div className="tuile-1">
            <div className="tuile-2">
              <div className="tuile-3">
                <CommunityPowerPlay />
              </div>
              <div className="tuile-4">
                <h6 className="tuile-7">Community Power Play</h6>
                <p className="tuile-5">By the Degens, For the Degens!</p>
              </div>
            </div>
            <p className="tuile-6">Amplify your voice, join the unstoppable force of community-driven crypto power.</p>
          </div>

          <div className="tuile-1">
            <div className="tuile-2">
              <div className="tuile-3">
                <AutoLiquidityLagoon />
              </div>
              <div className="tuile-4">
                <h6 className="tuile-7">Auto-Liquidity Lagoon</h6>
                <p className="tuile-5">Effortless Earnings, Liquid Dreams!</p>
              </div>
            </div>
            <p className="tuile-6">Watch your assets flow and grow, no stagnation, just solid returns.</p>
          </div>

          <div className="tuile-1">
            <div className="tuile-2">
              <div className="tuile-3">
                <TrashToTreasure />
              </div>
              <div className="tuile-4">
                <h6 className="tuile-7">Trash to Treasure</h6>
                <p className="tuile-5">Flush Away the Old, Bring in the Gold!</p>
              </div>
            </div>
            <p className="tuile-6">Transform underperforming tokens into GSHT gold with each flush.</p>
          </div>

        </div>

      </GlobalContainer>
    
    </div>

  );
}

export default FlusForce;
