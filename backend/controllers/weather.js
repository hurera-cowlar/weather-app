const WeatherModel = require('../models/weather-model');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');


exports.getAllWeatherData = catchAsync(async (req, res) => {
    const allWeatherData = await WeatherModel.find();
  
    res.status(200).json({
      message: 'success',
      data: allWeatherData,
    });
  });