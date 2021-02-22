const Articles = require('../models/articles.model');

const updateDB = (category, articles) => {
    Articles.findOneAndUpdate({_id : '6031b962c955cc4ec996f88a'}, {
        $addToSet: {[`category.${category}`]: articles}
    },
    {upsert: true},
    function (err, data) {
        if (err) {
            console.log(err)
        }
    });
}

const fetchDB = async (category) => {
    const data = await Articles.find({ _id: '6031b962c955cc4ec996f88a'},  (err, data) => {
        if (err) {
            console.log(err)
        } 
     });

     return data[0].category[category];
}


exports.updateDB = updateDB;
exports.fetchDB = fetchDB;