import mqtt from 'mqtt';
import config from '../config/env-config';
import { Ref, ref } from 'vue';

enum MqttProtols {
  mqtts = 'mqtts',
}

interface IClientOptions {
  host: string,
  port: number,
  protocol: MqttProtols,
  username: string,
  password: string,
  connectTimeout: number,
  clientId: string
}

const clientOptions: IClientOptions = {
  host: config.MQTT_BROKER_HOST,
  port: config.MQTT_BROKER_PORT,
  protocol: MqttProtols.mqtts,
  username: config.MQTT_CLIENT_USERNAME,
  password: config.MQTT_CLIENT_PASSWORD,
  connectTimeout: 30000,
  clientId: ''
}

const connectUrl = `mqtts://${config.MQTT_BROKER_HOST}:${config.MQTT_BROKER_PORT}/mqtt`
let client = null

const MQTT_TOPIC = config.MQTT_TOPIC

export const connectToMQTTBroker = (weatherDataFromApi: Ref<any>) => {

  client = mqtt.connect(connectUrl, clientOptions)

  client.on('connect', () => {
    console.log('Connected to MQTT broker');
    client.subscribe(MQTT_TOPIC);
  });

  client.on('message', (topic: string, payload: Buffer) => {
    console.log(`Received message on topic ${topic}: ${payload.toString()}`);
    const newdata = JSON.parse(payload.toString());
    const updated = {
      _time: new Date().toISOString(),
      city: newdata['city'],
      weather_condition: newdata['weather'],
      humidval: newdata['humidity'],
      tempval: newdata['temperature']
    };
    weatherDataFromApi.value = [...weatherDataFromApi.value, { ...updated }]

  });

  client.on('error', (error) => {
    console.error('Error occurred:', error);
    client?.end();
  });

  client.on('close', () => {
    console.log('Client disconnected');
  });
};

export const disconnectFromMQTTBroker = () => {
  if (client) {
    client.end();
    console.log('Disconnected from MQTT broker');
  }
};



export default client;
