import React from 'react';
import pageWrapper from './pageWrapper';
import DisplayGrid from './DisplayGrid';
import { Helmet } from 'react-helmet';

const Search: React.FC = () => {
  let pageTitle = window.location.pathname.substring(1);

  const capTitle = (string: string) => {
    let split = string.split('');
    split[0] = split[0].toUpperCase();
    return split.join('');
  };

  return (
    <>
      <Helmet>
        <title>Newsapp - {capTitle(pageTitle)}</title>
        <meta
          name="Top US Categories"
          content="Breaking Top US News Headlines."
        />
        <meta
          name="keywords"
          content={`news, breaking-news, top categories, us-news, headlines, ${pageTitle}`}
        />
      </Helmet>
      <DisplayGrid />
    </>
  );
};

export default pageWrapper(Search);
