const Article = require('../models/article.model');

const updateDB = async (category, articles = []) => {
  //Check if article from api is already in db, if not then add to db.
  const checkExisitingAndUpdate = async (article) => {
    const existingArticle = await Article.findOne({ title: article.title });
    console.log(existingArticle);
    if (existingArticle) {
      console.log('This is a duplicate');
      return;
    }

    let newArticle = new Article({
      category: category,
      title: article.title,
      description: article.description,
      content: article.content,
      url: article.url,
      image: article.image,
      publishedAt: article.publishedAt,
      source: {
        name: article.source.name,
        url: article.source.url,
      },
    });

    await newArticle.save();
    console.log('Document Inserted Successfully!');
  };
  //Map over api response and update mongoDB
  for (let i = 0; i < articles.length; i++) {
    await checkExisitingAndUpdate(articles[i]);
  }
};

const fetchDB = async (category) => {
  //Get articles by category
  return await Article.find({
    $or: [
      { category: category },
      { content: { $regex: category, $options: 'i' } },
    ],
  }).sort({ publishedAt: -1 });
};

exports.updateDB = updateDB;
exports.fetchDB = fetchDB;
