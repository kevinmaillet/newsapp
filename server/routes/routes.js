const { updateDB, fetchDB } = require('../controllers/dbAccess');
const { getTopNewsArticles, getArticlesByCategory } = require('../api/api');
require('dotenv').config();

const categoryRoute = async (req, res) => {
  const category = req.params.category;
  if (!req.headers.key === process.env.API_KEY) {
    res.send({ error: 'Wrong Api Key' });
    return;
  }

  if (category === 'topHeadlines') {
    const response = await getTopNewsArticles();
    updateDB(category, response);
    const dbResponse = await fetchDB(category);
    console.log(response);
    console.log(dbResponse);
    res.send([...response, ...dbResponse]);
    return;
  } else {
    const response = await getArticlesByCategory(category);
    updateDB(category, response);
    const dbResponse = await fetchDB(category);
    res.send([...response, ...dbResponse]);
  }
};

exports.categoryRoute = categoryRoute;
