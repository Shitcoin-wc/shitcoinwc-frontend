// PancakeSwap.js

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import GlobalContainer from '../../components/ui/GlobalContainer';
import ButtonWithIcon from '../../components/ui/Buttons/ButtonWithIcon';
import shitcoinwc from '../../assets/img/shitcoinwc.webp';
import gshtLogo from '../../assets/icons/logo.webp';
import { TOKEN_ADDRESS, bscanApiKey, bscanApiURL } from '../../config/config'; // Import de la variable de config

const PancakeSwap = ({ className }) => {
  const [holders, setHolders] = useState(null);
  const bscScanLink = `https://testnet.bscscan.com/address/${TOKEN_ADDRESS}`;

  useEffect(() => {
    const fetchHolders = async () => {
      try {
        const response = await axios.get(
          `${bscanApiURL}?module=token&action=tokenholdercount&contractaddress=${TOKEN_ADDRESS}&apikey=${bscanApiKey}`
        );
        if (response.data.status === "1") {
          console.log('Holders:', response.data.result);
          setHolders(response.data.result);
        } else {
          console.error('Error in API response:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching holders:', error);
      }
    };

    fetchHolders();
  }, []);

  return (
    <div className={`PancakeSwap-section pt-48 pb-32 w-full ${className}`}>
      <Helmet>
        <meta name="description" content="Swap any token for GSHT on PancakeSwap for a clutter-free crypto portfolio. Dive into DeFi with GSHT, the heartbeat of the market, and experience a clean sweep in your crypto transactions. Click to swap now!" />
      </Helmet>
      <GlobalContainer>
        <h1 className="mb-14 text-center">Got a load to unload? Dash to dump and swap for GSHT on PancakeSwap</h1>
        <p className="mb-8 text-center">Tired of sifting through token tumbleweeds in your wallet? Dive straight into the action by swapping any token for GSHT directly on PancakeSwap. It's quick, it's easy, and it's your ticket to a clutter-free crypto life. GSHT isn't just another coin; it's the pulse of the market, the heartbeat of your portfolio. Make the smart swap now and watch your crypto health soar. GSHT - where every swap is a clean sweep!</p>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-16">
          <img src={shitcoinwc} alt="Where to shit the shitcoins" className="max-h-[250px] max-w-full object-cover mx-auto mb-8 md:mb-0" />
          
          <div className="flex flex-col justify-center items-center gap-4 md:items-start">
            <h4 className="mb-2 text-center md:text-left sm:mt-8 w-full" style={{ textAlign: 'center' }}>Token Info</h4>
            <div className="table-container overflow-x-auto w-full">
              <table className="table-auto border-collapse mx-auto bg-white shadow-md rounded-lg w-full md:w-[800px]">
                <tbody>
                  <tr className="border-b"><td className="p-2 font-semibold">Market cap:</td><td className="p-2">$1,000,000</td></tr>
                  <tr className="border-b"><td className="p-2 font-semibold">24h Volume:</td><td className="p-2">$---,---</td></tr>
                  <tr className="border-b"><td className="p-2 font-semibold">24h Change:</td><td className="p-2">--%</td></tr>
                  <tr className="border-b"><td className="p-2 font-semibold">Holders:</td><td className="p-2">{holders !== null ? holders : 'Loading...'}</td></tr>
                  <tr><td className="p-2 font-semibold">Circulating Supply:</td><td className="p-2">10,000,000 GSHT</td></tr>
                </tbody>
              </table>
              <div className="view-contract-link w-full text-right mt-4">
                <a href={bscScanLink} target="_blank" rel="noopener noreferrer">View contract on BscScan</a>
              </div>
            </div>
            <div className="w-full flex justify-center">
              <ButtonWithIcon ImgIcon={gshtLogo} text="Buy GSHT" linkTo="https://pancakeswap.finance/swap" size="lg" tailwindClass="w-auto font-baloo" openInNewTab={true} />
            </div>
          </div>
        </div>
      </GlobalContainer>
    </div>
  );
}

export default PancakeSwap;
