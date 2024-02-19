const mongoose = require('mongoose');
const { MONGODB_URL } = require('../../config/env-config');

const connectMongoDB = () => {
  mongoose
    .connect(MONGODB_URL)
    .then(() => {
      console.log('MongoDB connected sir!!!');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });
};

module.exports = connectMongoDB;
