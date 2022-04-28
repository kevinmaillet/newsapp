const { updateDB, fetchDB } = require('./dbAccess');
const { redisClient } = require('../services/redis');
const { getTopNewsArticles, getArticlesByCategory } = require('../api/api');

const getPosts = async (req, res) => {
  const category = req.params.category;
  const limit = req.body.limit;
  const skip = req.body.skip;
  const client = await redisClient();

  if (!req.headers.key === process.env.API_KEY) {
    res.send({ error: 'Wrong Api Key' });
    return;
  }

  //Get Landing Page Headlines
  if (category === 'topHeadlines') {
    const inCache = await client.get(category);
    //set category to expiring redis key
    if (!inCache) {
      await client.set(category, 'true');
      //expire in 1 hour
      await client.expire(category, 60 * 60 * 1);
    }
    //If no skip set then fetch fresh articles from news api
    if (skip === 0 && !inCache) {
      const response = await getTopNewsArticles();
      await updateDB(category, response);
    }

    const dbResponse = await fetchDB(category, skip, limit);
    res.send(dbResponse);
    return;
  } else {
    //Get Category Specific Articles
    const inCache = await client.get(category);

    if (!inCache) {
      await client.set(category, 'true');
      //expire in 2 hours
      await client.expire(category, 60 * 60 * 2);
    }
    //If no skip set then fetch fresh articles from news api
    if (skip === 0 && !inCache) {
      const response = await getArticlesByCategory(category);
      await updateDB(category, response);
    }
    const dbResponse = await fetchDB(category, skip, limit);
    res.send(dbResponse);
  }
};

module.exports = getPosts;
