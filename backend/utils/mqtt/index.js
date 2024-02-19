const mqtt = require('mqtt')
const {
  MQTT_BROKER_HOST,
  MQTT_BROKER_PORT,
  MQTT_CLIENT_USERNAME,
  MQTT_CLIENT_PASSWORD,
  MQTT_TOPIC,
} = require('../../config/env-config')
const { writeWeatherDataService } = require('../../services/weather')

// MQTT broker information
const brokerHost = MQTT_BROKER_HOST
const brokerPort = MQTT_BROKER_PORT
const clientUsername = MQTT_CLIENT_USERNAME
const clientPassword = MQTT_CLIENT_PASSWORD
const topic = MQTT_TOPIC.toString()

const clientOptions = {
  host: brokerHost,
  port: brokerPort,
  protocol: 'mqtts',
  username: clientUsername,
  password: clientPassword,
  connectTimeout: 30000,
  clientId: '',
}
const client = mqtt.connect(clientOptions)

client.on('connect', function () {
  console.log('Connected to MQTT broker')
  client.subscribe(topic)
})

client.on('message', function (topic, message) {
  message = message.toString()
  console.log(`Received message on topic ${topic}: ${message}`)
  message = JSON.parse(message)
  writeWeatherDataService(message) //Writing weather data to influxDB service
  console.log('Data written to InfluxDB')
})

client.on('error', function (error) {
  console.error('Error occurred:', error)
  client.end()
})

client.on('close', function () {
  console.log('client disconnected')
})

module.exports = client
