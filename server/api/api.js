const axios = require('axios');
require('dotenv').config();
const apiKey = process.env.NEWS_API_KEY;

//Get top news articles

const getTopNewsArticles = async () => {
  try {
    return await axios
      .get(`https://gnews.io/api/v4/top-headlines?country=us&token=${apiKey}`)
      .then((response) => response.data.articles);
  } catch (err) {
    console.log("can't reach api");
    return [];
  }
};

// Get articles by Category

const getArticlesByCategory = async (category) => {
  try {
    return await axios
      .get(
        `https://gnews.io/api/v4/search?q=${category}&country=us&token=${apiKey}`
      )
      .then((response) => response.data.articles);
  } catch (err) {
    console.log("can't reach api");
    return [];
  }
};

exports.getTopNewsArticles = getTopNewsArticles;
exports.getArticlesByCategory = getArticlesByCategory;
