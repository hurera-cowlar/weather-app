const { getAllWeatherDataService } = require('../services/weather');
const catchAsync = require('../utils/catchAsync');

exports.getAllWeatherData = catchAsync(async (req, res) => {

  const weatherData = await getAllWeatherDataService();

  res.status(200).json({
    message: 'success',
    length: weatherData.length,
    data: weatherData,
  });
});
