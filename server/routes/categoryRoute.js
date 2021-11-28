const express = require('express');
const router = express.Router();
const { updateDB, fetchDB } = require('../controllers/dbAccess');
const { getTopNewsArticles, getArticlesByCategory } = require('../api/api');
require('dotenv').config();

router.post('/articles/:category', async (req, res) => {
  const category = req.params.category;
  const limit = req.body.limit;
  const skip = req.body.skip;

  if (!req.headers.key === process.env.API_KEY) {
    res.send({ error: 'Wrong Api Key' });
    return;
  }

  //Get Landing Page Headlines
  if (category === 'topHeadlines') {
    //If no skip set then fetch fresh articles from news api
    if (skip === 0) {
      const response = await getTopNewsArticles();
      await updateDB(category, response);
    }

    const dbResponse = await fetchDB(category, skip, limit);
    res.send(dbResponse);
    return;
  } else {
    //Get Category Specific Articles
    //If no skip set then fetch fresh articles from news api
    if (skip === 0) {
      const response = await getArticlesByCategory(category);
      await updateDB(category, response);
    }
    const dbResponse = await fetchDB(category, skip, limit);
    res.send(dbResponse);
  }
});

module.exports = router;
