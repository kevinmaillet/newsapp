import React from 'react';
import pageWrapper from './pageWrapper';
import { Helmet } from 'react-helmet';
import DisplayGrid from './DisplayGrid';
import Banner from './Banner';

const Home: React.FC = () => {
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

export default pageWrapper(Home);
