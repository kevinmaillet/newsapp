import React, { useState } from 'react';

interface BannerTypes {
  message: string;
}

const Banner: React.FC<BannerTypes> = ({ message }) => {
  const [showBanner, setShowBanner] = useState(true);

  const handleClick = () => {
    setShowBanner(!showBanner);
  };
  return (
    <div className={showBanner ? 'banner' : 'banner--hidden'}>
      <div className="banner__content-wrapper">
        <div className="banner__text">{message}</div>
        <div className="banner__button-container">
          <button onClick={handleClick} className="banner__button">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
