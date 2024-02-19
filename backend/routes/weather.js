const express = require('express')
const weatherController = require('../controllers/weather')

const router = express.Router()

router.route('/').get(weatherController.getAllWeatherData)

module.exports = router
