const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// require('dotenv').config();
const dbConnect = require('./controllers/dbConnect')
// const { updateDB, fetchDB } = require('./controllers/dbAccess')
// const { getTopNewsArticles, getArticlesByCategory} = require('./api/api')
const cronJob = require('./services/cronJob');
const helmet = require("helmet")
const { categoryRoute } = require('./routes/routes')
// const { categories } = require('./static/categories');


dbConnect();

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

//Runs everyday at 9am, queries news api to update database
cronJob();


app.post('/articles/:category', categoryRoute) 


app.listen(4000, () => {
    console.log("Listening on port 4000")
})

