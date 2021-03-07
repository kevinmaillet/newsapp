const { updateDB, fetchDB } = require('../controllers/dbAccess');
const { getTopNewsArticles, getArticlesByCategory } = require('../api/api');
require('dotenv').config();

const categoryRoute = async (req, res) => {
  if (req.headers.key === process.env.API_KEY) {
    const category = req.params.category;

    if (category === 'topHeadlines') {
      const response = await getTopNewsArticles();
      await updateDB(category, response);

      res.send(await fetchDB(category));
    } else {
      const response = await getArticlesByCategory(category);
      await updateDB(category, response);

      res.send(await fetchDB(category));
    }
  } else {
    res.send({ error: 'Wrong Api Key' });
  }
};

exports.categoryRoute = categoryRoute;
