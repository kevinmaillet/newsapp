import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import DisplayGrid from './DisplayGrid';
import { config } from '../config';
const URL = config;
const API_KEY = process.env.REACT_APP_API_KEY;

const Home: React.FC = () => {
  const [articles, setArticles] = useState([]);
  const [apiClosed, setapiClosed] = useState(false);

  useEffect(() => {
    const getArticles = async (): Promise<void> => {
      try {
        await axios
          .post(
            `${URL}/articles/topHeadlines`,
            {},
            {
              headers: {
                Key: API_KEY,
              },
            }
          )
          .then((res) => {
            if (!res.data) {
              setapiClosed(true);
              setArticles([]);
            } else {
              //Reverse articles so newest are first
              res.data.reverse();
              //Use only first 20 articles
              const firstTwenty = res.data.slice(0, 20);
              //reverse articles so newest are first
              setArticles(firstTwenty);
            }
          });
      } catch (err) {
        setapiClosed(true);
        setArticles([]);
      }
    };
    getArticles();
  }, []);

  return (
    <>
      <Helmet>
        <title>Newsapp - Top Headlines</title>
        <meta
          name="Top US Headlines"
          content="Breaking Top US News Headlines."
        />
        <meta
          name="keywords"
          content="news, breaking-news, top categories, us-news, headlines, top headlines"
        />
      </Helmet>
      <DisplayGrid articles={articles} apiClosed={apiClosed} />
    </>
  );
};

export default Home;
