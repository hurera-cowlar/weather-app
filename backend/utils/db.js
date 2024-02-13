const mongoose = require('mongoose');

const connectMongoDB = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log('Database connected sir!!!');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });
};

module.exports = connectMongoDB;
