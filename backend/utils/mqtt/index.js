const mqtt = require('mqtt');
const influxClient = require('../db/influxdb');
const { InfluxDB, Point } = require('@influxdata/influxdb-client');

// MQTT broker information
const brokerHost = process.env.MQTT_BROKER_HOST;
// const brokerHost = 'e586d81940394ed89ccc8493d8b32568.s1.eu.hivemq.cloud';
const brokerPort = process.env.MQTT_BROKER_PORT;
// const brokerPort = 8883;
// const clientUsername = 'hivemq.webclient.1707853998095';
const clientUsername = process.env.MQTT_CLIENT_USERNAME;
const clientPassword = process.env.MQTT_CLIENT_PASSWORD;
const topic = process.env.MQTT_TOPIC.toString();
// const topic = 'weather/#';

const clientOptions = {
  host: brokerHost,
  port: brokerPort,
  protocol: 'mqtts',
  username: clientUsername,
  password: clientPassword,
  connectTimeout: 30000,
  clientId: '',
};
console.log("here");
const client = mqtt.connect(clientOptions);

client.on('connect', function () {
  console.log('Connected to MQTT broker');
  client.subscribe(topic);
});

client.on('message', function (topic, message) {
  message = message.toString();
  console.log(`Received message on topic ${topic}: ${message}`);

  const writeApi = influxClient.getWriteApi(
    process.env.INFLUXDB_ORG,
    process.env.INFLUXDB_BUCKET,
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
