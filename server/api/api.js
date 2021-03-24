const axios = require('axios');

//Get top news articles

const getTopNewsArticles = async () => {
  try {
    return await axios
      .get(
        `https://gnews.io/api/v4/top-headlines?country=us&token=db25ec16c61febb76f766b272bf90a25`
      )
      .then((response) => response.data.articles);
  } catch (err) {
    console.log("can't reach api");
  }
};

// Get articles by Category

const getArticlesByCategory = async (category) => {
  try {
    return await axios
      .get(
        `https://gnews.io/api/v4/search?q=${category}&country=us&token=db25ec16c61febb76f766b272bf90a25`
      )
      .then((response) => response.data.articles);
  } catch (err) {
    console.log("can't reach api");
  }
};

exports.getTopNewsArticles = getTopNewsArticles;
exports.getArticlesByCategory = getArticlesByCategory;
