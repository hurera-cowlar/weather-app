<script setup lang="ts">
import NavbarComp from '@/components/Navbar.vue'
import { useAuthStore } from '@/stores/authStore'
import axios from 'axios'
import { onMounted, ref, onBeforeUnmount } from 'vue'
import client from '@/utils/mqtt'
import config from '../config/env-config'
import { getWeather } from '@/api/weather'

import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const authStore = useAuthStore()

const weatherDataFromApi = ref(null)

const MQTT_TOPIC = config.MQTT_TOPIC

onMounted(async () => {
  if (
    authStore.isLoggedIn
      ? toast('Welcome!', {
          theme: 'dark',
          type: 'success',
          position: 'top-center',
          dangerouslyHTMLString: true
        })
      : toast('You need to login first!', {
          theme: 'dark',
          type: 'info',
          position: 'top-center',
          dangerouslyHTMLString: true
        })
  )
    client.on('connect', () => {
      console.log('Connected to MQTT broker')
      client.subscribe(MQTT_TOPIC)
    })

  client.on('message', (topic: string, payload: any) => {
    console.log(`Received message on topic ${topic}: ${payload.toString()}`)
    const newdata = JSON.parse(payload)
    const updated = {
      _time: new Date().toISOString(),
      city: newdata['city'],
      weather_condition: newdata['weather'],
      humidval: newdata['humidity'],
      tempval: newdata['temperature']
    }
    weatherDataFromApi.value = [...weatherDataFromApi.value, { ...updated }]
  })

  try {
    const response = await getWeather()
    // const response = await axios.get('http://localhost:5000/api/v1/weather')
    const data = await response.data
    weatherDataFromApi.value = data
  } catch (err) {
    console.log(err)
    toast(`Oops! There has been a server error! Try again later`, {
      theme: 'dark',
      type: 'error',
      position: 'top-center',
      dangerouslyHTMLString: true
    })
  }
})

onBeforeUnmount(() => {
  if (client) {
    client.end()
    console.log('Disconnected from MQTT broker')
  }
})
</script>

<template>
  <NavbarComp />
  <div class="px-16 mt-5">
    <div class="relative overflow-x-auto">
      <div v-if="weatherDataFromApi == null" class="h-[80vh] flex justify-center items-center">
        <h1>No data found. Please start the publisher :(</h1>
      </div>
      <div
        v-else-if="weatherDataFromApi?.length === 0"
        class="h-[80vh] flex justify-center items-center"
      >
        <h1>No data found. Please start the publisher :(</h1>
      </div>
      <table v-else class="w-full text-sm text-left rtl:text-right">
        <thead class="text-xs uppercase bg-gray-50 text-gray-700">
          <tr>
            <th scope="col" class="px-6 text-center py-3 w-[%] bg-[#6b7280] font-bold">City</th>
            <th scope="col" class="px-6 text-center py-3 w-[%] bg-[#6b7280] font-bold">
              Condition
            </th>
            <th scope="col" class="px-6 text-center py-3 w-[%] bg-[#6b7280] font-bold">
              Temperature
            </th>
            <th scope="col" class="px-6 text-center py-3 w-[%] bg-[#6b7280] font-bold">Humidity</th>
            <th scope="col" class="px-6 text-center py-3 w-[%] bg-[#6b7280] font-bold">Time</th>
          </tr>
        </thead>
        <tbody v-for="(weather, index) in weatherDataFromApi" :key="index">
          <tr class="bg-white border-b">
            <th scope="row" class="px-6 text-center py-4 font-medium whitespace-nowrap">
              {{ weather.city }}
            </th>
            <td class="px-6 text-center py-4 w-[%]">{{ weather.weather_condition }}</td>
            <td class="px-6 text-center py-4 w-[%]">{{ weather.tempval }}°C</td>
            <td class="px-6 text-center py-4 w-[%]">{{ weather.humidval }}</td>
            <td class="px-6 text-center py-4 w-[%]">
              {{ new Date(weather._time).toLocaleString() }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style></style>
