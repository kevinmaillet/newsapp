import React, { useRef } from 'react';
import fallbacksrc from '../images/news.jpeg';

interface ImageProps {
  src: string;
  alt: string;
}

const Image: React.FC<ImageProps> = (props) => {
  const imgElement = useRef<HTMLImageElement>(null);

  const onImgLoad = (): void => {
    if (imgElement && imgElement.current) {
      if (imgElement.current.naturalHeight < 10) {
        imgElement.current.src = '../images/news.jpeg';
      }
    }
  };

  return (
    <img
      className="img"
      ref={imgElement}
      src={props.src}
      onError={(e: any) => (e.target.src = fallbacksrc)}
      onLoad={onImgLoad}
      loading="lazy"
      alt={props.alt}
    />
  );
};

export default Image;
