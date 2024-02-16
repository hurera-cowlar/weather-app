import mqtt from 'mqtt';

const MQTT_BROKER_HOST = 'e586d81940394ed89ccc8493d8b32568.s1.eu.hivemq.cloud'
const MQTT_BROKER_PORT = 8884
const MQTT_CLIENT_USERNAME = 'hivemq.webclient.1707853998095'
const MQTT_CLIENT_PASSWORD = 'E4*lx<0?N8tQ>dF7HBmb'

const clientOptions = {
  host: MQTT_BROKER_HOST,
  port: MQTT_BROKER_PORT,
  protocol: 'mqtts',
  username: MQTT_CLIENT_USERNAME,
  password: MQTT_CLIENT_PASSWORD,
  connectTimeout: 30000,
  clientId: ''
}

const connectUrl = `mqtts://${MQTT_BROKER_HOST}:${MQTT_BROKER_PORT}/mqtt`
const client = mqtt.connect(connectUrl, clientOptions)


export default client;
