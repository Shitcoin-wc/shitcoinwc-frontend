// App.js

import './assets/css/global.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BackToTopButton from './components/ui/BackToTopButton/BackToTopButton';
import Header from './components/Header';
import FrontPage from './pages/FrontPage';
// Importez d'autres pages ici
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

// 1. Get projectId
const projectId = '13db58e9ff2c939429afb6c7b3044ec4'

// 2. Set chains
const mainnet = {
  chainId: 97,
  name: 'BNB Smart Chain Testnet',
  currency: 'BNB',
  explorerUrl: 'https://testnet.bscscan.com/',
  rpcUrl: 'https://bsc-testnet-rpc.publicnode.com	'
}

// 3. Create a metadata object
const metadata = {
  name: 'Shitcoin WC',
  description: 'Shitcoin WC - Dump Your Shitcoins and Memecoins with ShitcoinWC',
  url: 'https://shitcoinwc.com', // origin must match your domain & subdomain
  icons: ['https://shitcoinwc.com/static/media/logo.6c501231924e83837d9a.webp']
}

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: '...', // used for the Coinbase SDK
  defaultChainId: 1 // used for the Coinbase SDK
})

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [mainnet],
  projectId,
  themeVariables: {
    '--w3m-z-index':'9999',
  },
  enableAnalytics: true // Optional - defaults to your Cloud configuration
})


function App() {
  return (

    <>
      <Header mainnet={mainnet}/>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        {/* D�finissez d'autres routes ici */}
      </Routes>
      <BackToTopButton />
    </>
    
  );
}

export default App;
