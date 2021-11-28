import React, { useEffect, useContext } from 'react';
import { RouteComponentProps } from 'react-router';
import axios from 'axios';
import { config } from '../config';
import { siteContext } from '../context/siteContext';
const API_KEY = process.env.REACT_APP_API_KEY;

interface RouterProps {
  id: string;
}

interface SearchProps extends RouteComponentProps<RouterProps> {}

const pageWrapper = (WrappedComponent: React.FC) => {
  const NewComponent: React.FC<SearchProps> = (props) => {
    const { setArticles, setapiClosed, setLoading } = useContext(siteContext);
    let userInput = props.match.params.id;
    let category: string;

    if (!userInput) {
      category = 'topHeadlines';
    } else {
      category = userInput;
    }

    useEffect(() => {
      const getArticles = async (): Promise<void> => {
        try {
          setLoading(true);
          await axios
            .post(
              `${config.url}/articles/${category}`,
              { limit: 20, skip: 0 },
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
                setArticles(res.data);
                setLoading(false);
              }
            });
        } catch (err) {
          setapiClosed(true);
        }
      };
      getArticles();
    }, [userInput, setArticles, setLoading, setapiClosed, category]);

    return <WrappedComponent />;
  };
  return NewComponent;
};

export default pageWrapper;
