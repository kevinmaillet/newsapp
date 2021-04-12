import React from 'react';
import Image from './Image';
import moment from 'moment';
import { Article as ArticleType } from '../context/siteContext';

const Article: React.FC<ArticleType> = ({
  publishedAt,
  url,
  image,
  title,
  source,
  // index,
}) => {
  const d = new Date(publishedAt);

  return (
    //Set article--small on odd numbered articles
    <article className="article">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <div className="article__image-container">
          <Image src={image} alt={title} />
        </div>
        <div className="article__text">
          <h4 className="article__date">{moment(d).fromNow()}</h4>
          <h4 className="article__title">
            {title} - {source.name}
          </h4>
        </div>
      </a>
    </article>
  );
};

export default Article;
