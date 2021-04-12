import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import DisplayGrid from './DisplayGrid';
import Banner from './Banner';
import { config } from '../config';
import { siteContext } from '../context/siteContext';
import { removeDuplicates } from '../utils/utils';
// import JSONArticles from '../fixtures/articles.json';
const API_KEY = process.env.REACT_APP_API_KEY;

const Home: React.FC = () => {
  const { setArticles, setapiClosed, setLoading } = useContext(siteContext);

  useEffect(() => {
    const getArticles = async (): Promise<void> => {
      try {
        setLoading(true);
        await axios
          .post(
            `${config.url}/articles/topHeadlines`,
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
            } else {
              setArticles(removeDuplicates(res.data));
              setLoading(false);
            }
          });
      } catch (err) {
        setapiClosed(true);
      }
    };
    getArticles();
  }, [setArticles, setLoading, setapiClosed]);

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
      <DisplayGrid />
      <Banner message="We use cookies to analyze this site's traffic to provide a better user experience. By clicking accept you agree to these conditions." />
    </>
  );
};

export default Home;
