const mongoose = require('mongoose');
const Article = require('./article.model')

const articlesSchema = mongoose.Schema({
    category: {
        topHeadlines: Array,
        business: Array,
        technology: Array,
        health: Array,
        science: Array,
        entertainment: Array,
        politics: Array,
    } 
});

module.exports = mongoose.model('Articles', articlesSchema);