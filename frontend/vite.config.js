import { fileURLToPath, URL } from 'node:url'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  console.log(process.env.VITE_BACKEND_URL)
  console.log("herer");
  return defineConfig({
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    define: {
      VITE_BACKEND_URL: process.env.VITE_BACKEND_URL,
      VITE_MQTT_BROKER_HOST: process.env.MQTT_BROKER_HOST,
      VITE_MQTT_BROKER_PORT: process.env.MQTT_BROKER_PORT,
      VITE_MQTT_CLIENT_USERNAME: process.env.MQTT_CLIENT_USERNAME,
      VITE_MQTT_CLIENT_PASSWORD: process.env.MQTT_CLIENT_PASSWORD,
      VITE_MQTT_TOPIC: process.env.MQTT_TOPIC,
    },

    server: {
      host: true,
      port: 5173
    },
    preview: {
      host: true,
      port: 5173
    }
  })
}
