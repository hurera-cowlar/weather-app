const mqtt = require('mqtt');
const influxClient = require('../db/influxdb');
const { InfluxDB, Point } = require('@influxdata/influxdb-client');
const {
  MQTT_BROKER_HOST,
  MQTT_BROKER_PORT,
  MQTT_CLIENT_USERNAME,
  MQTT_CLIENT_PASSWORD,
  MQTT_TOPIC,
  INFLUXDB_ORG,
  INFLUXDB_BUCKET,
} = require('../../config/env-config');

// MQTT broker information
const brokerHost = MQTT_BROKER_HOST;
const brokerPort = MQTT_BROKER_PORT;
const clientUsername = MQTT_CLIENT_USERNAME;
const clientPassword = MQTT_CLIENT_PASSWORD;
const topic = MQTT_TOPIC.toString();

const clientOptions = {
  host: brokerHost,
  port: brokerPort,
  protocol: 'mqtts',
  username: clientUsername,
  password: clientPassword,
  connectTimeout: 30000,
  clientId: '',
};
console.log('here');
const client = mqtt.connect(clientOptions);

client.on('connect', function () {
  console.log('Connected to MQTT broker');
  client.subscribe(topic);
});

client.on('message', function (topic, message) {
  message = message.toString();
  console.log(`Received message on topic ${topic}: ${message}`);

  const writeApi = influxClient.getWriteApi(
    INFLUXDB_ORG,
    INFLUXDB_BUCKET,
    'ns'
  );

  message = JSON.parse(message);

  const point = new Point('weather')
    .tag('city', message.city)
    .tag('weather_condition', message.weather)
    .intField('temperature', message.temperature)
    .intField('humidity', message.humidity);

  writeApi.writePoint(point);
  writeApi.close();
  console.log('Data written to InfluxDB');
});

client.on('error', function (error) {
  console.error('Error occurred:', error);
  client.end();
});

client.on('close', function () {
  console.log('client disconnected');
});

module.exports = client;
