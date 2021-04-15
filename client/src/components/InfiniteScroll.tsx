import React, { useState, useContext, useEffect } from 'react';
import { siteContext } from '../context/siteContext';
import ArticleList from './ArticleList';
import { Article as ArticleType } from '../context/siteContext';
import { v4 as uuidv4 } from 'uuid';

interface scrollArticleTypes {
  [key: string]: ArticleType[];
}

const InfiniteScroll: React.FC = () => {
  const [scrollArticles, setScrollArticles] = useState<scrollArticleTypes>({});
  const [articleIndex, setArticleIndex] = useState(0);
  const { articles } = useContext(siteContext);

  const reduceArticles = (arr: ArticleType[]) => {
    let arrCopy = [...arr];
    let obj: any = {};
    for (let i = 0; i < arrCopy.length; i++) {
      obj[i] = arrCopy.splice(0, 21);
    }
    return obj;
  };

  useEffect(() => {
    setScrollArticles(reduceArticles(articles));

    const bottomPage = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setArticleIndex(articleIndex + 1);
      }
    };

    if (articles) {
      window.addEventListener('scroll', bottomPage);
    }

    return () => {
      window.removeEventListener('scroll', bottomPage);
    };
  }, [articleIndex, articles]);

  const iterateArticleList = (index: number) => {
    let arr = [];
    for (let i = 0; i < index + 1; i++) {
      arr.push(
        <ArticleList articles={scrollArticles[i.toString()]} key={uuidv4()} />
      );
    }
    return arr;
  };

  return <>{iterateArticleList(articleIndex)}</>;
};

export default InfiniteScroll;
