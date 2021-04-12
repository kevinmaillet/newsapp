import React, { useEffect, useContext } from 'react';
import { RouteComponentProps } from 'react-router';
import DisplayGrid from './DisplayGrid';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { siteContext } from '../context/siteContext';
import { config } from '../config';
import { removeDuplicates } from '../utils/utils';
import JSONArticles from '../fixtures/articles.json';
const API_KEY = process.env.REACT_APP_API_KEY;

interface RouterProps {
  id: string;
}

interface SearchProps extends RouteComponentProps<RouterProps> {}

const Search: React.FC<SearchProps> = (props) => {
  const { setArticles, setapiClosed, setLoading } = useContext(siteContext);

  let userInput = props.match.params.id;

  useEffect(() => {
    const getArticles = async (): Promise<void> => {
      try {
        setLoading(true);
        await axios
          .post(
            `${config.url}/articles/${userInput}`,
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
  }, [userInput, setArticles, setapiClosed, setLoading]);

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
      <DisplayGrid />
    </>
  );
};

export default Search;
