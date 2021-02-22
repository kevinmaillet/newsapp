const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const dbConnect = require('./controllers/dbConnect')
const { updateDB, fetchDB } = require('./controllers/dbAccess')
const { getTopNewsArticles, getArticlesByCategory} = require('./api/api')
const cronJob = require('./services/cronJob');
const helmet = require("helmet")


dbConnect();

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

//Runs everyday at 9am, queries news api to update database
cronJob();


app.post('/articles/:category', async (req, res) => {
    if (req.headers.key === process.env.API_KEY) {
        const category = req.params.category;
        if (category === "topHeadlines") {
            const response = await getTopNewsArticles();
            await updateDB(category, response);
    
            res.send(await fetchDB(category));
        } else {
            const response = await getArticlesByCategory(category);
            await updateDB(category, response);
        
            res.send(await fetchDB((category)));
        }
    } else {
        res.send({error: "Wrong Api Key"})
    }
}) 


app.listen(4000, () => {
    console.log("Listening on port 4000")
})

