const cron = require('node-cron');
const { getTopNewsArticles, getArticlesByCategory } = require('../api/api');
const { updateDB } = require('../controllers/dbAccess');
const { categories } = require('../static/categories');

//run everyday 9am

const cronJob = () => {
  cron.schedule('0 9 * * *', async () => {
    // Get Top Headlines and update DB
    const res = await getTopNewsArticles();
    updateDB('topHeadlines', res);

    // Get Categories and update DB
    for (let i = 0; i < categories.length; i++) {
      const res = await getArticlesByCategory(categories[i]);
      updateDB(categories[i], res);
    }

    console.log('Ran cron jobs', new Date());
  });
};

module.exports = cronJob;
