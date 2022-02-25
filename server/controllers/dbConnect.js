const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = () => {
  try {
    // Connect to the MongoDB cluster
    mongoose.connect(
      process.env.MONGO_ATLAS,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      },
      () => console.log(' Mongoose is connected')
    );
  } catch (e) {
    console.log('could not connect');
  }
};

module.exports = dbConnect;
