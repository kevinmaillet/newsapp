import React, { useState, useContext, useEffect } from 'react';
import { siteContext } from '../context/siteContext';
import ArticleList from './ArticleList';
import axios from 'axios';
import { config } from '../config';
const API_KEY = process.env.REACT_APP_API_KEY;

const InfiniteScroll: React.FC = () => {
  const { articles, setArticles, setapiClosed } = useContext(siteContext);
  const [isLoading, setLoading] = useState(false);
  const [isBottom, setBottom] = useState(false);
  const [debounce, setDebounce] = useState(false);

  //Set Event Listeners for Bottom of The Page
  useEffect(() => {
    const bottomPage = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setTimeout(() => {
          setBottom(true);
        }, 1 * 1000);
      } else {
        setBottom(false);
      }
    };

    window.addEventListener('scroll', bottomPage);

    return () => {
      window.removeEventListener('scroll', bottomPage);
    };
  }, []);

  //When Bottom of page fetch more articles from API
  useEffect(() => {
    if (isBottom && !debounce) {
      setLoading(true);
      getAdditionalArticles();
      setDebounce(true);
      //To Prevent edge case of api getting called multiple times if page is moved up and down while isBottom is triggered
      setTimeout(() => {
        setDebounce(false);
      }, 2 * 1000);
    }
    // eslint-disable-next-line
  }, [isBottom]);

  //Get Additional articles and set them in state.
  const getAdditionalArticles = async (): Promise<void> => {
    try {
      await axios
        .post(
          `${config.url}/articles${
            window.location.pathname === '/'
              ? '/topHeadlines'
              : window.location.pathname
          }`,
          { limit: 20, skip: articles.length },
          {
            headers: {
              Key: API_KEY,
            },
          }
        )
        .then((res) => {
          if (!res.data) {
            setapiClosed(true);
          } else {
            setArticles([...articles, ...res.data]);
          }
        });
    } catch (err) {
      setapiClosed(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ArticleList articles={articles}></ArticleList>
      {isLoading && (
        <div style={{ paddingTop: `2rem`, width: `100%` }}>
          <h3 style={{ textAlign: `center` }}>Loading More Articles...</h3>
        </div>
      )}
    </>
  );
};

export default InfiniteScroll;
