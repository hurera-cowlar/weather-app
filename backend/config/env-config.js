require('dotenv').config()

module.exports = {
  MONGODB_URL: process.env.MONGODB_URL,
  BACKEND_PORT: process.env.BACKEND_PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '10m',
  MQTT_BROKER_HOST: process.env.MQTT_BROKER_HOST,
  MQTT_BROKER_PORT: process.env.MQTT_BROKER_PORT || 8883,
  MQTT_CLIENT_USERNAME: process.env.MQTT_CLIENT_USERNAME,
  MQTT_CLIENT_PASSWORD: process.env.MQTT_CLIENT_PASSWORD,
  MQTT_TOPIC: process.env.MQTT_TOPIC || 'weather/#',
  INFLUXDB_HOST: process.env.INFLUXDB_HOST,
  INFLUXDB_TOKEN: process.env.INFLUXDB_TOKEN,
  INFLUXDB_ORG: process.env.INFLUXDB_ORG,
  INFLUXDB_BUCKET: process.env.INFLUXDB_BUCKET,
}
