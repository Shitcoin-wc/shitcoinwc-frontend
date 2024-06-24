import React, { useState } from 'react';
import './parallaxsection.css';
import { Helmet } from 'react-helmet';
import ButtonWithIcon from '../../components/ui/Buttons/ButtonWithIcon';
import shitcoinwcImage from '../../assets/img/shitcoinwcImage.webp';
import fond from '../../assets/img/fond.webp';
import ToiletPaper from '../../assets/icons/ToiletPaper';
import FlushLoo from '../../assets/icons/FlushLoo';
import DumpNow from '../../assets/icons/DumpNow';
import { useWeb3Modal, useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react';
import { BrowserProvider, Contract } from 'ethers';
import Popup from '../../components/ui/Popup/Popup';
import PopupMenuContent from './PopupMenuContent';
import ShitcoinABI from '../../abi/shitcoin.json';
import { ShitcoinContractAddress } from '../../config/config';
import Countdown from 'react-countdown';

function ParallaxSection() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const togglePopup = () => setIsPopupOpen(!isPopupOpen);
  const { open } = useWeb3Modal();
  const { address, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const dumpTokens = async () => {
    if (!isConnected) open();
    else setIsPopupOpen(true);
  };

  async function flushTokens() {
    try {
      if (!isConnected) {
        open();
      } else {
        const ethersProvider = new BrowserProvider(walletProvider);
        const signer = await ethersProvider.getSigner();

        // The Contract object
        const ShitcoinContract = new Contract(ShitcoinContractAddress, ShitcoinABI, signer);
        const flushTokens = await ShitcoinContract.flushTokens();

        console.log(flushTokens);
      }
    } catch (error) {
      console.error('Error flushing tokens', error);
    }
  }

  const padZero = (num) => {
    return String(num).padStart(2, '0');
  };

  const renderer = ({ days, hours, minutes, seconds }) => {
    return (
      <div>
        <span className="desktop-text">Live on BSC mainnet in {days}D {padZero(hours)}:{padZero(minutes)}:{padZero(seconds)} </span>
        <span className="mobile-text">Live on BSC mainnet in <br /> {days}D {padZero(hours)}:{padZero(minutes)}:{padZero(seconds)}</span>
      </div>
    );
  };

  return (
    <div
      className="Parallax-section w-full h-full py-24 md:py-0 h-auto md:h-screen flex flex-col justify-center items-center px-1.5 md:px-0"
      style={{ backgroundImage: `url(${fond})` }}
    >
      <Helmet>
        <meta name="description" content="Join the movement to dump your shitcoins with ShitcoinWC - the ultimate destination for making the big flush. With a TVL of 1,000,000, we're leading the charge against worthless cryptocurrencies. Flush, dump your shitcoins, and get ready for a cleaner crypto future. One shitcoin to rule them all!" />
      </Helmet>

      <h1 className="prose text-center">Got Shitcoins? Dump Them Now in WC!</h1>
      <h2 className="text-center mt-4">Flush Your Tokens and Transform Them into GSHT with Shitcoin WC!</h2>
      <h3 className="text-center mb-8 font-bold whitespace-nowrap">
              <Countdown date={new Date('2024-08-01T00:00:00')} renderer={renderer} />
      </h3>
      <div className="content-container flex flex-col items-center justify-center max-w-maxWidth1200 mt-16">
        <div className="w-full flex flex-col md:flex-row gap-20 justify-center md:justify-start">
          <div className="w-full md:w-1/2 flex justify-center items-center overflow-hidden">
            <img src={shitcoinwcImage} alt="Where to shit the shitcoins" className="max-h-[250px] sm:max-h-[200px] md:max-h-[250px] lg:max-h-[300px] max-w-full object-cover" />
          </div>

          <div className="w-full md:w-1/2">
          <h3 className="text-center mb-8 font-bold	whitespace-nowrap	">1,000,000 TVL</h3>
            <div className="flex flex-col flex-wrap justify-center md:justify-start gap-4">
              <div onClick={flushTokens}>
                <ButtonWithIcon SvgIcon={FlushLoo} text="FLUSH IT" size="lg" tailwindClass="w-full font-baloo" headbandText="Soon" />
              </div>

              <div onClick={dumpTokens}>
                <ButtonWithIcon SvgIcon={DumpNow} text="DUMP NOW!" size="lg" tailwindClass="w-full font-baloo" headbandText="Soon" />
              </div>

              <ButtonWithIcon SvgIcon={ToiletPaper} text="TOILET PAPER" linkTo="https://github.com/Shitcoin-wc" size="lg" tailwindClass="w-full font-baloo text-2xs" />
            </div>
          </div>
          <Popup isOpen={isPopupOpen} onClose={togglePopup}>
            <PopupMenuContent />
          </Popup>
        </div>
      </div>
    </div>
  );
}

export default ParallaxSection;
