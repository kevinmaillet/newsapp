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
    await updateDB(category, response);
    res.send(await fetchDB(category));
    return;
  } else {
    const response = await getArticlesByCategory(category);
    await updateDB(category, response);
    res.send(await fetchDB(category));
  }
};

exports.categoryRoute = categoryRoute;
