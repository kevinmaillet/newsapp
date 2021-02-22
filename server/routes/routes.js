const { updateDB, fetchDB } = require('../controllers/dbAccess')
const { getTopNewsArticles, getArticlesByCategory} = require('../api/api')
const { categories } = require('../static/categories');
require('dotenv').config();

const categoryRoute = async (req, res) => {

    if (req.headers.key === process.env.API_KEY) {
        const category = req.params.category;

        if (category === "topHeadlines") {
            const response = await getTopNewsArticles();
            await updateDB(category, response);
    
            res.send(await fetchDB(category));

        } else if (categories.includes(category)) {
            const response = await getArticlesByCategory(category);
            await updateDB(category, response);
        
            res.send(await fetchDB((category)));

        } else if (!categories.includes(category)) {
            const response = await getArticlesByCategory(category);

            res.send(response);
        }
    } else { 
        res.send({error: "Wrong Api Key"})
    }
}

exports.categoryRoute = categoryRoute;