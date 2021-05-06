const express = require('express');
const cors = require('cors');
const dbConnect = require('./controllers/dbConnect');
const cronJob = require('./services/cronJob');
const helmet = require('helmet');
const categoryRoute = require('./routes/categoryRoute');

dbConnect();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

//Runs everyday at 9am, queries news api to update database
cronJob();

app.use(categoryRoute);

app.listen(4000, () => {
  console.log('Listening on port 4000');
});
