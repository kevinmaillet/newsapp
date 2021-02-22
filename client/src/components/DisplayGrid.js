import React, { useEffect, useState } from "react";
import Article from "./Article";
import SkeletonArticle from './SkeletonArticle'


const DisplayGrid = (props) => {

  const [articles, setArticles] = useState(props.articles)

  useEffect(() => {

    // Remove articles with the same image
  const filteredArr = props.articles.reduce((unique, o) => {
      if (o) {
        if (!unique.some(obj => obj.image === o.image)) {
          unique.push(o);
        }
      }  
        return unique;
  }, []);

    setArticles(filteredArr)

  }, [props.articles])

  const apiClosed = props.apiClosed;


  // const filteredArr = props.articles.reduce((unique, o) => {
  //     if (!unique.some(obj => obj.image === o.image)) {
  //       unique.push(o)
  //     }
  //     return unique;
  // }, []);
  // console.log(filteredArr)

  const displayArticles = articles.map((article, index) => {
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
        <div className="display-grid">
          There are no articles due to api limit being exceeded for the day.
        </div>
      );
    } else {
      return <div className="display-grid">
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
      </div>;
    }
  } else {
    return <div className="display-grid">{displayArticles}</div>;
  }
}

export default DisplayGrid;
