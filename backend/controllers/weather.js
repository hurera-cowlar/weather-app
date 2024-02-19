const { apiResponse } = require('../services/apiResponseService');
const { getAllWeatherDataService } = require('../services/weather');
const catchAsync = require('../utils/catchAsync');

/**
 * @swagger
 * /api/v1/weather:
 *   get:
 *     summary: Get all weather data
 *     description: Retrieve all weather data from the database.
 *     tags: [Weather]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 length:
 *                   type: integ er
 *                   example: 3
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/WeatherData'
 *               example:
 *                 message: success
 *                 length: 3
 *                 data:
 *                   - _time: "2024-02-19T10:06:01.492Z"
 *                     city: "New York"
 *                     weather_condition: "Sunny"
 *                     humidval: 51
 *                     tempval: 29
 *                   - _time: "2024-02-19T10:06:01.492Z"
 *                     city: "New York"
 *                     weather_condition: "Cold"
 *                     humidval: 41
 *                     tempval: 21
 *                   - _time: "2024-02-19T10:06:01.492Z"
 *                     city: "New York"
 *                     weather_condition: "Cloudy"
 *                     humidval: 74
 *                     tempval: 20
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerError'
 *
 */
exports.getAllWeatherData = catchAsync(async (req, res) => {
  const weatherData = await getAllWeatherDataService();

  return apiResponse(res, weatherData, 200, (sendLength = true));
});
