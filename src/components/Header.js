import React, { useState, useEffect } from 'react';
import './header.css';
import logo from '../assets/img/logo.webp';
import LogoBars from '../assets/icons/LogoBars';
import SignIn from '../assets/icons/SignIn';
import ButtonWithIcon from '../components/ui/Buttons/ButtonWithIcon';
import { useDisconnect, useWeb3Modal, useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react';
import { BrowserProvider, Contract, ethers } from 'ethers';
import ShitcoinABI from '../abi/shitcoin.json';
import { ShitcoinContractAddress } from '../config/config';

function Header({ mainnet }) {
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const [visible, setVisible] = useState(true);
  const [userRewards, setUserRewards] = useState(false);
  const [rewardAmount, setRewardAmount] = useState('');
  const [networkName] = useState(mainnet.name); // Set the network name from the prop
  const { open } = useWeb3Modal();
  const { walletProvider } = useWeb3ModalProvider();
  const { address, isConnected } = useWeb3ModalAccount();
  const { disconnect } = useDisconnect();
  const [showPhishingWarning, setShowPhishingWarning] = useState(true);
  const [showTestnetInvite, setShowTestnetInvite] = useState(false);
  const [stopCycle, setStopCycle] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos <= 100);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    getUserRewards();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, visible, isConnected, address]);

  useEffect(() => {
    const header = document.querySelector('.header-outer');
    if (showPhishingWarning || showTestnetInvite) {
      header.style.top = window.innerWidth <= 600 ? '50px' : '45px';
    } else {
      header.style.top = '0px';
    }
  }, [showPhishingWarning, showTestnetInvite]);

  useEffect(() => {
    if (!stopCycle) {
      const phishingTimer = setTimeout(() => {
        setShowPhishingWarning(false);
        setShowTestnetInvite(true);
      }, 2000);

      const testnetTimer = setTimeout(() => {
        setShowTestnetInvite(false);
        setShowPhishingWarning(true);
      }, 7000); // Show testnet invite for 5 seconds

      return () => {
        clearTimeout(phishingTimer);
        clearTimeout(testnetTimer);
      };
    }
  }, [showPhishingWarning, showTestnetInvite, stopCycle]);

  const getButtonContent = () => {
    if (!isConnected) return 'Login'
    else return formatAddress(address)
  }

  const userConnected = async () => {
    if (!isConnected) {
      open();
    }
  }

  const userDisconnected = async () => {
    if (isConnected) {
      disconnect();
    }
  }

  const getUserRewards = async () => {
    try {
      if (!isConnected) {
        setUserRewards(false);
      } else {
        const ethersProvider = new BrowserProvider(walletProvider);
        const signer = await ethersProvider.getSigner();
        const ShitcoinContract = new Contract(ShitcoinContractAddress, ShitcoinABI, signer);
        const userRewards = await ShitcoinContract.getUserRewards(address);
        const amount = ethers.formatUnits(userRewards[0], 18);
        const isRewarded = userRewards[1];
        if (!isRewarded && amount !== '0.0') {
          setUserRewards(true);
          const formattedNumber = Math.round(amount * 100) / 100;
          setRewardAmount(formattedNumber);
        } else setUserRewards(false);
      }
    } catch (error) {
      console.error('Error dumping tokens', error);
    }
  }

  const reedemGSHT = async () => {
    try {
      if (!isConnected) throw Error('User disconnected');
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();
      const ShitcoinContract = new Contract(ShitcoinContractAddress, ShitcoinABI, signer);
      await ShitcoinContract.redeemGSHT();
    } catch (error) {
      console.error('Error redeemGSHT', error);
    }
  }

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const closeWarning = () => {
    setStopCycle(true);
    setShowPhishingWarning(false);
    setShowTestnetInvite(false);
  };

  return (
    <div>
      {showPhishingWarning && (
        <div className="phishing-warning">
          <div className="warning-text">PHISHING WARNING: please make sure you're visiting https://shitcoinwc.com - check the URL carefully.</div>
          <button className="close-warning" onClick={closeWarning}>X</button>
        </div>
      )}
      {showTestnetInvite && (
        <div className="testnet-invite">
          <div className="invite-text">Want free coins? Dive into the testnet!  </div>
          <button className="close-warning" onClick={closeWarning}>X</button>
        </div>
      )}
      <div className={`header-outer ${!visible && 'header-hidden'}`} style={{ top: showPhishingWarning || showTestnetInvite ? (window.innerWidth <= 600 ? '65px' : '45px') : '0px' }}>
        <div className="header-inner">
          <a className="logo flex flex-row items-center whitespace-nowrap w-32 hover:text-dusty-rose" href="/">
            <img src={logo} alt="Logo" style={{ width: '48px', height: 'auto' }} />
            <h5 className="text-button-bg ml-4">Shitcoin WC</h5>
          </a>
          <div className="header-right">
            {userRewards &&
              <div className="hidden md:flex ml-4" onClick={reedemGSHT}>
                <ButtonWithIcon text={`Claim ${rewardAmount} GSHT`} linkTo="" size="sm" tailwindClass="w-auto font-baloo hover:text-button-text hover:bg-dusty-rose button-claim" />
              </div>
            }

            <div className="flex items-center cursor-pointer" onClick={userConnected}>
              {networkName &&
                <div className="hidden md:flex ml-4">
                  <ButtonWithIcon text={networkName} linkTo="" size="sm" tailwindClass="w-auto font-baloo hover:text-button-text hover:bg-dusty-rose" />
                </div>
              }

              <div className="md:hidden w-8"><LogoBars /></div>

              <div className="hidden md:flex ml-4">
                <ButtonWithIcon SvgIcon={getButtonContent() === 'Login' ? SignIn : ''} text={getButtonContent()} linkTo="" size="sm" tailwindClass="w-auto font-baloo hover:text-button-text hover:bg-dusty-rose" />
              </div>

              {isConnected &&
                <div className="hidden md:flex ml-4" onClick={userDisconnected}>
                  <ButtonWithIcon text="Disconnect" linkTo="" size="sm" tailwindClass="w-auto font-baloo hover:text-button-text hover:bg-dusty-rose" />
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
