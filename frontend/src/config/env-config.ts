const config = {
  BACKEND_URL: import.meta.env.VITE_BACKEND_URL?.replace(/'/g, ''),
  MQTT_BROKER_HOST: import.meta.env.VITE_MQTT_BROKER_HOST,
  MQTT_BROKER_PORT: import.meta.env.VITE_MQTT_BROKER_PORT,
  MQTT_CLIENT_USERNAME: import.meta.env.VITE_MQTT_CLIENT_USERNAME,
  MQTT_CLIENT_PASSWORD: import.meta.env.VITE_MQTT_CLIENT_PASSWORD,
  MQTT_TOPIC: import.meta.env.VITE_MQTT_TOPIC
}

export default config
