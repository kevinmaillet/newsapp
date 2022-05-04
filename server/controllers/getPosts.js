const { updateDB, fetchDB } = require('./dbAccess');
const { redisClient } = require('../services/redis');
const { getTopNewsArticles, getArticlesByCategory } = require('../api/api');

const getPosts = async (req, res) => {
  const category = req.params.category;
  const limit = req.body.limit;
  const skip = req.body.skip;
  const client = await redisClient();
  const cache = await client.get(category);

  if (!req.headers.key === process.env.API_KEY) {
    res.send({ error: 'Wrong Api Key' });
    return;
  }

  //Get Landing Page Headlines
  if (category === 'topHeadlines') {
    //if no cache set one for 1 hour

    if (!cache && skip == 0) {
      //Get top new articles from gnews and set in cache
      const response = await getTopNewsArticles();
      await updateDB(category, response);
      const dbResponse = await fetchDB(category, skip, limit);
      await client.set(category, JSON.stringify(dbResponse));
      //expire in 1 hour
      await client.expire(category, 60 * 60 * 1);
    }
    //If skip isnt set and cache is populated
    if (skip === 0 && cache) {
      let cachedArticles = await client.get(category);
      res.send(JSON.parse(cachedArticles));
      return;
    }

    const dbResponse = await fetchDB(category, skip, limit);
    res.send(dbResponse);

    return;
  } else {
    //Get Category Specific Articles

    if (!cache && skip == 0) {
      const response = await getArticlesByCategory(category);
      await updateDB(category, response);
      const dbResponse = await fetchDB(category, skip, limit);
      await client.set(category, JSON.stringify(dbResponse));
      //expire in 2 hours
      await client.expire(category, 60 * 60 * 2);
    }
    //If no skip set then fetch fresh articles from news api
    if (skip === 0 && cache) {
      let cachedArticles = await client.get(category);
      res.send(JSON.parse(cachedArticles));
      return;
    }

    const dbResponse = await fetchDB(category, skip, limit);
    res.send(dbResponse);
  }
};

module.exports = getPosts;
