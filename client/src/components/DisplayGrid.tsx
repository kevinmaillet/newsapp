import React, { useEffect, useState } from 'react';
import Article from './Article';
import SkeletonArticle from './SkeletonArticle';

interface Source {
  name: string;
  url: string;
}

interface Article {
  url: string;
  image: string;
  title: string;
  description: string;
  publishedAt: Date;
  source: Source;
}

interface DisplayProps {
  articles: Article[];
  apiClosed: boolean;
}

const DisplayGrid: React.FC<DisplayProps> = (props) => {
  const [articles, setArticles] = useState(props.articles);

  useEffect(() => {
    // Remove articles with the same image or same title
    const filteredArr = props.articles.reduce((unique: Article[], o) => {
      if (o) {
        if (
          !unique.some((obj) => obj.image === o.image || obj.title === o.title)
        ) {
          unique.push(o);
        }
      }
      return unique;
    }, []);

    filteredArr.sort(
      (a: Article, b: Article) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    setArticles(filteredArr);
  }, [props.articles]);

  const { apiClosed } = props;

  const displayArticles = articles.map((article: Article, index: number) => {
    if (!article) {
      return null;
    }
    return (
      <Article
        key={index}
        link={article.url}
        image={article.image}
        title={article.title}
        description={article.description}
        publishedAt={article.publishedAt}
        source={article.source}
      />
    );
  });

  if (props.articles.length === 0) {
    if (apiClosed) {
      return (
        <main className="display-grid">
          There are no articles due to api limit being exceeded for the day.
        </main>
      );
    } else {
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
  } else {
    return <main className="display-grid">{displayArticles}</main>;
  }
};

export default DisplayGrid;
