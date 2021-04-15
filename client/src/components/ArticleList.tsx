import React from 'react';
import Article from './Article';
import { Article as ArticleType } from '../context/siteContext';

interface ArticleListProps {
  articles: ArticleType[];
}

const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
  const displayArticles = articles?.map(
    (article: ArticleType, index: number) => {
      return (
        <Article
          key={index}
          url={article.url}
          image={article.image}
          title={article.title}
          description={article.description}
          publishedAt={article.publishedAt}
          source={article.source}
          // index={index}
        />
      );
    }
  );

  return <>{displayArticles}</>;
};

export default React.memo(ArticleList);
