import React, { useState, useEffect, useCallback } from "react";
import { BrowserProvider, Contract, ethers } from "ethers";
import ShitcoinABI from "../../abi/shitcoin.json";
import ERC20 from "../../abi/ERC20.json";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import axios from "axios";
import ButtonWithIcon from "../../components/ui/Buttons/ButtonWithIcon";
import { FaCopy } from "react-icons/fa";
import "./popupmenucontent.css";
import fallbackImage from "../../assets/img/killedpoop.png";
import {
  ShitcoinContractAddress,
  bscanApiKey,
  bscanApiURL,
} from "../../config/config";
import max from "../../assets/icons/max.png";

function PopupMenuContent() {
  const { address, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [tokenAddress, setTokenAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [tokenBalance, setTokenBalance] = useState(0);
  const [tokenAllowance, setTokenAllowance] = useState(0);
  const [tokenDecimal, setTokenDecimal] = useState(18);
  const [tokens, setTokens] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTokenName, setSelectedTokenName] = useState("Select Crypto");
  const [isTokenApproved, setIsTokenApproved] = useState(false);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        if (!walletProvider || !address) return;

        const ethersProvider = new ethers.BrowserProvider(walletProvider);
        const signer = await ethersProvider.getSigner();
        const response = await axios.get(
          `${bscanApiURL}?module=account&action=tokentx&address=${address}&apikey=${bscanApiKey}`
        );

        const tokenList = response.data.result.reduce((acc, tx) => {
          if (
            !acc.find((token) => token.contractAddress === tx.contractAddress)
          ) {
            acc.push({
              contractAddress: tx.contractAddress,
              tokenName: tx.tokenName,
              iconUrl: `https://cryptologos.cc/logos/${tx.tokenName.toLowerCase()}.png`,
            });
          }
          return acc;
        }, []);
        const tokenListWithBalances = await Promise.all(
          tokenList.map(async (token) => {
            const tokenContract = new Contract(
              token.contractAddress,
              ERC20,
              signer
            );
            const balance = await tokenContract.balanceOf(address);
            const decimal = await tokenContract.decimals();
            return {
              ...token,
              balance: ethers.formatUnits(balance, decimal),
            };
          })
        );

        setTokens(tokenListWithBalances);
      } catch (error) {
        console.log("Error fetching tokens", error);
      }
    };

    fetchTokens();
  }, [walletProvider, address]);

  useEffect(() => {
    if (ethers.isAddress(tokenAddress)) {
      getBalance();
      getAllowance();
    }
  }, [tokenAddress]);

  const getBalance = async () => {
    if (!walletProvider) {
      console.error("Wallet provider not found");
      return;
    }
    try {
      const ethersProvider = new ethers.BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();
      const tokenContract = new ethers.Contract(tokenAddress, ERC20, signer);
      const decimal = await tokenContract.decimals();
      const balance = await tokenContract.balanceOf(address);

      setTokenDecimal(decimal);
      setTokenBalance(balance);
    } catch (error) {
      console.error("Error getting token balance", error);
    }
  };

  const getAllowance = async () => {
    if (!walletProvider) {
      console.error("Wallet provider not found");
      return;
    }
    try {
      const ethersProvider = new ethers.BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();
      const tokenContract = new Contract(tokenAddress, ERC20, signer);
      const allowance = await tokenContract.allowance(
        address,
        ShitcoinContractAddress
      );

      setTokenAllowance(allowance);
      setIsTokenApproved(allowance.toString() !== "0");
    } catch (error) {
      console.error("Error getting token allowance", error);
    }
  };

  const approveToken = async () => {
    if (!walletProvider) {
      console.error("Wallet provider not found");
      return;
    }
    try {
      const ethersProvider = new ethers.BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();
      const tokenContract = new Contract(tokenAddress, ERC20, signer);
      const amountInSmallestUnit = ethers.parseUnits(
        amount.replace(/,/g, ""),
        tokenDecimal
      );
      const approveTx = await tokenContract.approve(
        ShitcoinContractAddress,
        amountInSmallestUnit
      );
      await approveTx.wait();
      getAllowance();
      setIsTokenApproved(true);
    } catch (error) {
      console.error("Error approving token", error);
    }
  };

  const dumpTokens = async () => {
    if (!isConnected) throw Error("User disconnected");
    if (!walletProvider) {
      console.error("Wallet provider not found");
      return;
    }
    try {
      const ethersProvider = new ethers.BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();
      const ShitcoinContract = new Contract(
        ShitcoinContractAddress,
        ShitcoinABI,
        signer
      );

      if (!ShitcoinContract.dumpTokens) {
        throw new Error("dumpTokens function not found in the contract");
      }

      const amountInSmallestUnit = ethers.parseUnits(
        amount.replace(/,/g, ""),
        tokenDecimal
      );

      const gasLimit = await ShitcoinContract.estimateGas.dumpTokens(
        tokenAddress,
        amountInSmallestUnit
      );

      const dumpTokensTx = await ShitcoinContract.dumpTokens(
        tokenAddress,
        amountInSmallestUnit,
        { gasLimit }
      );
      await dumpTokensTx.wait();
    } catch (error) {
      console.error("Error dumping tokens", error);
    }
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleTokenSelect = useCallback(
    async (token) => {
      setTokenAddress(token.contractAddress);
      setSelectedTokenName(token.tokenName);
      setIsDropdownOpen(false);

      try {
        const ethersProvider = new BrowserProvider(walletProvider);
        const signer = await ethersProvider.getSigner();
        const tokenContract = new Contract(
          token.contractAddress,
          ERC20,
          signer
        );
        const decimal = await tokenContract.decimals();
        const balance = await tokenContract.balanceOf(address);
        const allowance = await tokenContract.allowance(
          address,
          ShitcoinContractAddress
        );

        setTokenDecimal(decimal);
        setTokenBalance(balance);
        setTokenAllowance(allowance);
        setAmount("");
      } catch (error) {
        console.error("Error getting token balance and allowance", error);
      }
    },
    [walletProvider, address]
  );

  const setMaxAmount = (e) => {
    e.stopPropagation();
    const formattedBalance = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(parseFloat(ethers.formatUnits(tokenBalance, tokenDecimal)));
    setAmount(formattedBalance.split(".")[0]);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {},
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  const isAmountValid = amount !== "" && !isNaN(amount);

  let amountInSmallestUnit;
  if (isAmountValid) {
    try {
      amountInSmallestUnit = ethers.parseUnits(
        amount.replace(/,/g, ""),
        tokenDecimal
      );
    } catch (error) {
      console.error("Error parsing amount:", error);
    }
  }

  const formatTokenAddress = (address) => {
    if (address.length > 10) {
      return `${address.slice(0, 7)}........${address.slice(-5)}`;
    }
    return address;
  };

  return (
    <div
      className={`flex flex-col items-center space-y-4 ${
        isDropdownOpen ? "dropdown-open" : ""
      }`}
    >
      <div className="wrapper" onClick={toggleDropdown}>
        <div className="toiletroll">
          <div className="roll">{selectedTokenName}</div>
          <div className={`papers ${isDropdownOpen ? "open" : ""}`}>
            {tokens.length > 0 ? (
              tokens
                .filter((token) => token.tokenName)
                .map((token) => (
                  <div
                    key={token.contractAddress}
                    className="paper"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTokenSelect(token);
                    }}
                  >
                    <img
                      src={token.iconUrl}
                      alt={`${token.tokenName} icon`}
                      style={{
                        width: "25px",
                        height: "25px",
                        marginRight: "8px",
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = fallbackImage;
                      }}
                    />
                    <div className="paper-token-info">
                      <div>{token.tokenName}</div>
                      <div>
                        {
                          token.balance
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            .split(".")[0]
                        }
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <div className="paper">
                <span>No tokens found</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedTokenName && selectedTokenName !== "Select Crypto" && (
        <div className="mt-2 flex items-center text-sm text-gray-700 dark:text-gray-200">
          <div className="text-copy">
            <div className="truncate w-48">
              {formatTokenAddress(tokenAddress)}
            </div>
          </div>

          <button
            className="ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            onClick={() => copyToClipboard(tokenAddress)}
          >
            <FaCopy />
          </button>
        </div>
      )}

      <div className="input-wrapper flex items-center w-3/4 p-2 border border-gray-300 rounded-md div-input">
        <input
          type="text"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={tokenBalance === 0}
          className="flex-grow input p-2"
        />
        <div onClick={setMaxAmount}>
          <ButtonWithIcon
            text="Max"
            linkTo=""
            size="sm"
            tailwindClass="center w-auto font-baloo hover:text-button-text hover:bg-dusty-rose button-claim"
            disabled={!tokenAddress}
          />
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        {tokenBalance > 0 && !isTokenApproved ? (
          <div onClick={approveToken}>
            <ButtonWithIcon
              text="Approve"
              linkTo=""
              size="sm"
              tailwindClass="center w-auto font-baloo hover:text-button-text hover:bg-dusty-rose button-claim"
            />
          </div>
        ) : (
          <div onClick={dumpTokens}>
            <ButtonWithIcon
              text="Dump"
              linkTo=""
              size="sm"
              tailwindClass="center w-auto font-baloo hover:text-button-text hover:bg-dusty-rose button-claim"
              disabled={tokenBalance === 0 || !isAmountValid}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default PopupMenuContent;
