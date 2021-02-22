import React, { useRef } from 'react';
import fallbacksrc from '../images/news.jpeg'

const Image = (props) => {

  const imgElement = useRef(null);

    const onImgLoad = () => {
      if (imgElement.current.naturalHeight < 10) {
        imgElement.current.src = "../images/news.jpeg"
      } 
    }

    return (
      <img className="img"
        ref={imgElement}
        src={props.src}
        onError={(e) => e.target.src = fallbacksrc}
        onLoad={onImgLoad}
        loading="lazy"
        alt={props.title}
      />
    );
}




export default Image;