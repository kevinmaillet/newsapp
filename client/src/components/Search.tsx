import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import DisplayGrid from './DisplayGrid';
import axios from 'axios';
import { Helmet } from 'react-helmet';
const API_KEY = process.env.REACT_APP_API_KEY;

interface RouterProps {
  id: string;
}

interface SearchProps extends RouteComponentProps<RouterProps> {}

const Search: React.FC<SearchProps> = (props) => {
  const [articles, setArticles] = useState([]);
  const [apiClosed, setapiClosed] = useState(false);

  let userInput = props.match.params.id;

  useEffect(() => {
    const getArticles = async () => {
      try {
        await axios
          .post(
            `https://api.newsapp.today/articles/${userInput}`,
            {},
            {
              headers: {
                Key: API_KEY,
              },
            }
          )
          .then((res) => {
            // setArticles(res.data);
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
  }, [userInput]);

  //Capatalize page title
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
      <DisplayGrid articles={articles} apiClosed={apiClosed} />
    </>
  );
};

export default Search;
