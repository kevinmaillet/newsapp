const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
        title: String,
        description: String,
        content: String,
        url: String,
        image: String,
        publishedAt: Date,
        source: {
            name: String,
            url: String
        }
})


module.exports = mongoose.model('Article', articleSchema);