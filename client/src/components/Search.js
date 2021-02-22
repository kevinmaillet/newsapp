import React, { useState, useEffect } from "react";
import DisplayGrid from "./DisplayGrid";
import axios from 'axios';
import { Helmet } from "react-helmet";
const API_KEY = process.env.REACT_APP_API_KEY;


const Search = (props) => {
  const [articles, setArticles] = useState([]);
  const [apiClosed, setapiClosed] = useState(false)

  let userInput = props.match.params.id;

  useEffect(() => {
    // window.scrollTo(0, 0);
    // if (sessionStorage.getItem(userInput) === null) {
    // fetch(
    //   `https://gnews.io/api/v4/search?q=${userInput}&country=us&token=${API_KEY}`
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data.errors) {
    //       setArticles([]);
    //       setapiClosed(true);
    //     } else {
    //       setArticles(data.articles)
    //       sessionStorage.setItem(userInput, JSON.stringify(data.articles))
    //     }
    //   });
    // } else {
    //   setArticles(JSON.parse(sessionStorage.getItem(userInput)));
    // }
    const getArticles = async () => {
      try {
          await axios.post(`http://localhost:4000/articles/${userInput}`, {}, {
            headers: {
              Key: API_KEY
            }
          }).then((res) => {
            // setArticles(res.data);
            if (!res.data) {
              setapiClosed(true);
              setArticles([]);
            } else {
              setArticles(res.data);
            }
        })
      }
      catch(err) {
        setapiClosed(true);
        setArticles([]);
      }
    } 
    getArticles();


  }, [userInput])

    let pageTitle = window.location.pathname.substring(1);

    const capTitle = (string) => {
      let split = string.split("");
      split[0] = split[0].toUpperCase();
      return split.join("");
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
        <DisplayGrid
          articles={articles}
          apiClosed={apiClosed}
        />
      </>
    );
}

export default Search;
