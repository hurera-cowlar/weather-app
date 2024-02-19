<template>
  <Navbar />
  <div v-if="weatherDataFromApi === null" class="h-[80vh] flex justify-center items-center">
    <h1>No data found. Please start the publisher :(</h1>
  </div>
  <div
    v-else-if="weatherDataFromApi?.length === 0"
    class="h-[80vh] flex justify-center items-center"
  >
    <h1>No data found. Please start the publisher :(</h1>
  </div>
  <div v-else class="flex flex-col justify-center items-center pt-24">
    <div class="sm:w-[70%] md:w-[30%] flex flex-col justify-center items-center px-11">
      <h1 class="sm:text-lg md:text-4xl font-bold mb-14 text-center">Weather Condition</h1>
      <DoughnutChart
        v-if="weatherDataFromApi"
        :data="weatherCondValues"
        :options="weatherCondOptions"
        :key=0
      />
    </div>
    <div class="w-[85%] sm:w-[60%] flex flex-col justify-center items-center px-11 pt-20">
      <h1 class="sm:text-lg md:text-4xl font-bold mb-14">Temperature</h1>
      <LineChart
        v-if="weatherDataFromApi"
        :data="temperatureValues"
        :options="tempOptions"
        :key=1
      />
    </div>
    <div class="sm:w-[85%] md:w-[60%] flex flex-col justify-center items-center px-11 py-20">
      <h1 class="sm:text-lg md:text-4xl font-bold mb-14">Humidity</h1>
      <LineChart
        v-if="weatherDataFromApi"
        :data="humidityValues"
        :options="humidityOptions"
        :key=2
      />
    </div>
  </div>
</template>

<script setup>
import { Doughnut } from 'vue-chartjs'
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { Line } from 'vue-chartjs'
import client from '../utils/mqtt'
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'
import Navbar from '@/components/Navbar.vue'
import { getWeather } from '@/api/weather'
import config from '@/config/env-config'
import { tempOptions, humidityOptions, weatherCondOptions } from '@/config/chart-options'
import LineChart from '@/components/LineChart.vue'
import DoughnutChart from '@/components/DoughnutChart.vue'

import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

import { connectToMQTTBroker, disconnectFromMQTTBroker } from '@/utils/mqtt'

const MQTT_TOPIC = config.MQTT_TOPIC
const weatherDataFromApi = ref(null)
const temperatureValues = ref(null)
const humidityValues = ref(null)
const weatherCondValues = ref(null)

const authStore = useAuthStore()

watch(weatherDataFromApi, (newValue, oldValue) => {
  console.log('here')
  const newValue_ = [...newValue]
  const timeArray = []
  const temperatureArray = []
  const humidityArrray = []
  const weatherCondArray = []
  const weatherCount = {}

  newValue.forEach((item) => {
    const condition = item.weather_condition
    weatherCount[condition] = (weatherCount[condition] || 0) + 1
  })

  const { keys, values } = Object.entries(weatherCount).reduce(
    (acc, [key, value]) => {
      acc.keys.push(key)
      acc.values.push(value)
      return acc
    },
    { keys: [], values: [] }
  )

  weatherCondValues.value = {
    labels: [...keys],
    datasets: [
      {
        borderColor: 'black',
        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
        data: [...values]
      }
    ]
  }

  for (const item of newValue_) {
    timeArray.push(
      new Date(item._time)
        .toString()
        .toLocaleString()
        .replace(/\s*GMT\+\d+\s*\(.*\)/, '')
    )
    temperatureArray.push(item.tempval)
    humidityArrray.push(item.humidval)
    weatherCondArray.push(item.weather_condition)
  }

  temperatureValues.value = {
    labels: [...timeArray],
    datasets: [
      {
        label: 'Temperature',
        backgroundColor: 'red',
        borderColor: 'orange',
        data: [...temperatureArray]
      }
    ]
  }
  humidityValues.value = {
    labels: [...timeArray],
    datasets: [
      {
        label: 'Humidity',
        backgroundColor: 'blue',
        borderColor: 'pink',
        data: [...humidityArrray]
      }
    ]
  }
})

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
    connectToMQTTBroker(weatherDataFromApi)

  try {
    const response = await getWeather()
    const data = await response.data
    weatherDataFromApi.value = data
    console.log(weatherDataFromApi.value)
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
  disconnectFromMQTTBroker()
})
</script>
