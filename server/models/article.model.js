const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
  category: String,
  title: { type: String, unique: true },
  description: String,
  content: String,
  url: String,
  image: { type: String, unique: true },
  publishedAt: Date,
  source: {
    name: String,
    url: String,
  },
});

module.exports = mongoose.model('Article', articleSchema, 'articles');
