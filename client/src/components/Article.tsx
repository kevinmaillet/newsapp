import React from 'react';
import Image from './Image';
import moment from 'moment';
import { Article as ArticleType } from '../context/siteContext';

const Article: React.FC<ArticleType> = (props) => {
  const d = new Date(props.publishedAt);

  return (
    <article className="article">
      <a href={props.url} target="_blank" rel="noopener noreferrer">
        <div className="article__image-container">
          <Image src={props.image} alt={props.title} />
        </div>
        <div className="article__text">
          <h4 className="article__date">{moment(d).fromNow()}</h4>
          <h4 className="article__title">
             {props.title} - {props.source.name}
          </h4>
        </div>
      </a>
    </article>
  );
};

export default Article;
