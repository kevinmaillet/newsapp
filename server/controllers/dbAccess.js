const Article = require('../models/article.model');

const updateDB = (category, articles) => {
  for (let i = 0; i < articles.length; i++) {
    Article.findOne({ title: articles[i].title }, (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result) {
        console.log('this is a duplicate');
      } else {
        let article = new Article({
          category: category,
          title: articles[i].title,
          description: articles[i].description,
          content: articles[i].content,
          url: articles[i].url,
          image: articles[i].image,
          publishedAt: articles[i].publishedAt,
          source: {
            name: articles[i].source.name,
            url: articles[i].source.url,
          },
        });

        article.save(function (err, doc) {
          if (err) return console.error(err);
          console.log('Document inserted successfully!');
        });
      }
    });
  }
};

const fetchDB = async (category) => {
  const data = await Article.find({ category: category }, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
  return data;
};

exports.updateDB = updateDB;
exports.fetchDB = fetchDB;
