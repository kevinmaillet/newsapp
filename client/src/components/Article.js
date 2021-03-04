import React from "react";
import Image from './Image'




const Article = (props) => {

    const d = new Date(props.publishedAt)

      return (
        <article className="article">
          <a href={props.link} target="_blank" rel="noopener noreferrer">
            <div className="article__image-container">
              <Image src={props.image} />
            </div>
            <div className="article__text">
              <h4 className="article__title">{props.title} - {props.source.name}</h4>
              <h4 className="article__date">{d.toDateString()}</h4>
            </div>
          </a>
        </article>
      );
  }

export default Article;
