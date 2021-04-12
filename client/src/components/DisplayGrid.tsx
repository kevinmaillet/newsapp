import React, { useContext } from 'react';
import { siteContext } from '../context/siteContext';
import Article from './Article';
import SkeletonArticle from './SkeletonArticle';
import { Article as ArticleType } from '../context/siteContext';

const DisplayGrid: React.FC = () => {
  const { articles, isLoading, apiClosed } = useContext(siteContext);

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

  if (isLoading) {
    return (
      <main className="display-grid">
        <SkeletonArticle />
        <SkeletonArticle />
        <SkeletonArticle />
        <SkeletonArticle />
        <SkeletonArticle />
        <SkeletonArticle />
        <SkeletonArticle />
        <SkeletonArticle />
        <SkeletonArticle />
        <SkeletonArticle />
        <SkeletonArticle />
        <SkeletonArticle />
      </main>
    );
  }
  if (apiClosed) {
    return (
      <main className="display-grid">
        There are no articles due to api limit being exceeded for the day.
      </main>
    );
  } else {
    return <main className="display-grid">{displayArticles}</main>;
  }
};

export default DisplayGrid;
