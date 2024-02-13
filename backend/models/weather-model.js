const mongoose = require('mongoose');

// Define the schema
const weatherSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
    },
    temperature: {
      type: Number,
      required: true,
    },
    weather: {
      type: String,
      required: true,
      enum: ['Sunny', 'Partly Cloudy', 'Rainy', 'Cloudy', 'Clear']
    },
    humidity: {
      type: Number,
      required: true,
    },
  },
  { collection: 'weather' }
);

const Weather = mongoose.model('Weather', weatherSchema, 'weather');

module.exports = Weather;
