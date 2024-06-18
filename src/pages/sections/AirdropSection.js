import React, { useEffect, useState } from 'react';
import './airdropsection.css';
import { Helmet } from 'react-helmet';
import GlobalContainer from '../../components/ui/GlobalContainer';
import ButtonWithIcon from '../../components/ui/Buttons/ButtonWithIcon';
import tiktokIcon from '../../assets/icons/tiktok.png';
import twitterIcon from '../../assets/icons/twitter.png';
import telegramIcon from '../../assets/icons/telegram.png';
import githubIcon from '../../assets/icons/github.png';
import discordIcon from '../../assets/icons/discord.png';
import facebookIcon from '../../assets/icons/facebook.png';
import XIcon from '../../assets/icons/XIcon';
import { getTwitterFollowers } from '../../services/twitterService';

function AirdropSection() {
  const [followers, setFollowers] = useState(0);
  const totalFollowersGoal = 1000;

  useEffect(() => {
    const fetchFollowers = async () => {
      const count = await getTwitterFollowers('ShitcoinWC');
      setFollowers(count);
    };

    fetchFollowers();
  }, []);

  return (
    <div className="Airdrop-section pt-48 pb-32 w-full">
      <Helmet>
        <meta name="description" content="Join the Shitcoin Revolution! In Community We Trust. Degen, Together Strong. Engage with us and be a part of the revolution!" />
      </Helmet>

      <GlobalContainer>
        <h1 className="mb-14 text-center">Join the Shitcoin Revolution! In Community We Trust</h1>
        <h2 className="mb-14 text-center">Degen, Together Strong</h2>

        <div className="social-icons flex justify-center mb-16">
          <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer">
            <img src={tiktokIcon} alt="TikTok" className="mx-2 w-10 h-10" />
          </a>
          <a href="https://x.com/ShitcoinWC" target="_blank" rel="noopener noreferrer">
            <img src={twitterIcon} alt="Twitter" className="mx-2 w-10 h-10" />
          </a>
          <a href="https://telegram.org/" target="_blank" rel="noopener noreferrer">
            <img src={telegramIcon} alt="Telegram" className="mx-2 w-10 h-10" />
          </a>
          <a href="https://discord.gg/XPn5erAQ37" target="_blank" rel="noopener noreferrer">
            <img src={discordIcon} alt="Discord" className="mx-2 w-10 h-10" />
          </a>
          <a href="https://www.facebook.com/shitcoinwc" target="_blank" rel="noopener noreferrer">
            <img src={facebookIcon} alt="Facebook" className="mx-2 w-10 h-10" />
          </a>
          <a href="https://github.com/Shitcoin-wc" target="_blank" rel="noopener noreferrer">
            <img src={githubIcon} alt="GitHub" className="mx-2 w-10 h-10" />
          </a>

        </div>

        <p className="text-center mb-16">
          Ready for some fun? We’re dropping airdrops like it's hot! At every community milestone,
          we reward our holders to keep the excitement alive. Why? Because we believe in celebrating
          our collective journey and incentivizing everyone to stay engaged. Let's make ShitcoinWc
          the first degen community to not only survive but thrive. Join the fun, engage with us,
          and be a part of the revolution! 🚀🌕
        </p>

        <div className="progress-bar w-full bg-gray-300 rounded-full h-6 mb-16 overflow-hidden">
          <div className="progress bg-green-500 h-full text-center text-white" style={{ width: `${Math.min(followers, totalFollowersGoal) / totalFollowersGoal * 100}%` }}>
            {followers} out of {totalFollowersGoal}
          </div>
        </div>

        <table className="table-auto w-full max-w-3xl mx-auto border-collapse">
          <thead>
            <tr>
              <th className="p-2">Tier</th>
              <th className="p-2">Reward</th>
            </tr>
          </thead>
          <tbody>
            {[
              { tier: '1,000', reward: '1% of holding' },
              { tier: '50,000', reward: '1% of holding' },
              { tier: '100,000', reward: '1% of holding' },
              { tier: '250,000', reward: '1% of holding' },
              { tier: '500,000', reward: '1% of holding' },
              { tier: '750,000', reward: '1% of holding' },
              { tier: '1,000,000', reward: '1% of holding' },
              { tier: '5,000,000', reward: '1% of holding' },
              { tier: '10,000,000', reward: '1% of holding' },
            ].map((item, index) => (
              <tr key={index}>
                <td className="p-2 text-center">{item.tier}</td>
                <td className="p-2 text-center">{item.reward}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-center">
          <ButtonWithIcon
            SvgIcon={XIcon}
            text="Share about this project on X"
            linkTo="https://x.com/ShitcoinWC"
            size="lg"
            tailwindClass="w-auto font-baloo mb-4"
            openInNewTab={true}
          />
          <p className="footer-text text-center text-gray-700 text-xl font-bold">Stay connected with us for the latest updates!</p>
        </div>
      </GlobalContainer>
    </div>
  );
}

export default AirdropSection;
