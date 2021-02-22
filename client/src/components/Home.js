import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Helmet } from "react-helmet";
import DisplayGrid from "./DisplayGrid";
const API_KEY = process.env.REACT_APP_API_KEY;
const SERVER = process.env.SERVER;


const Home = () => {
  const [articles, setArticles] = useState([]);
  const [apiClosed, setapiClosed] = useState(false)

  useEffect(() => {
//   if (sessionStorage.getItem("news") === null) {
//     fetch(`https://gnews.io/api/v4/top-headlines?country=us&token=${API_KEY}`)
//     .then((response) => response.json())
//     .then((data) => {
//       if (data.errors) {
//         setArticles([]);
//         setapiClosed(true);
//       } else {
//         setArticles(data.articles)
//         sessionStorage.setItem('news', JSON.stringify(data.articles))
//       }
//     });
// } else {
//     setArticles(JSON.parse(sessionStorage.getItem("news")));
//   }
  const getArticles = async () => {
    try {
      await axios.post( `${`http://localhost:4000/` || SERVER}articles/topHeadlines`, {}, {
        headers: {
          Key: API_KEY
        }
      }).then((res) => {
        // setArticles(res.data);
        console.log(res)
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

  }, [])



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
        <DisplayGrid
          articles={articles}
          apiClosed={apiClosed}
        />
      </>
    );
}

export default Home;
