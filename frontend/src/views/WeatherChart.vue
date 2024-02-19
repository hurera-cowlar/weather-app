<template>
  <Navbar />
  <div class="flex flex-col justify-center items-center pt-24">
    <div class="sm:w-[70%] md:w-[30%] flex flex-col justify-center items-center px-11">
      <h1 class="sm:text-lg md:text-4xl font-bold mb-14">Weather Condition</h1>
      <Doughnut v-if="weatherDataFromApi" :data="weatherCondValues" :options="weatherCondOptions" />
    </div>
    <div class="w-[85%] sm:w-[60%] flex flex-col justify-center items-center px-11 pt-20">
      <h1 class="sm:text-lg md:text-4xl font-bold mb-14">Temperature</h1>
      <Line v-if="weatherDataFromApi" :data="temperatureValues" :options="tempOptions" />
    </div>
    <div class="sm:w-[85%] md:w-[60%] flex flex-col justify-center items-center px-11 py-20">
      <h1 class="sm:text-lg md:text-4xl font-bold mb-14">Humidity</h1>
      <Line v-if="weatherDataFromApi" :data="humidityValues" :options="humidityOptions" />
    </div>
  </div>
</template>

<script setup>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { Line } from 'vue-chartjs'
import client from '../utils/mqtt'
import axios from 'axios'
import Navbar from '@/components/Navbar.vue'
import { getWeather } from '@/api/weather'
import config from '@/config/env-config'

const MQTT_TOPIC = config.MQTT_TOPIC
const weatherDataFromApi = ref(null)
const temperatureValues = ref(null)
const humidityValues = ref(null)
const weatherCondValues = ref(null)

watch(weatherDataFromApi, (newValue, oldValue) => {
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

const tempOptions = {
  responsive: true,

  scales: {
    y: {
      display: true,
      title: {
        display: true,
        text: 'Temperature (C)'
      },
      grid: {
        color: '#1d1d1d',
        backgroundColor: 'white'
      },
      min: -60,
      max: 60,
      ticks: {
        stepSize: 10,
        maxTicksLimit: 12
      }
    },
    x: {
      display: true,
      title: {
        display: true,
        text: 'Date & Time'
      },

      grid: {
        color: '#1d1d1d'
      }
    }
  }
}
const humidityOptions = {
  responsive: true,
  scales: {
    y: {
      display: true,
      title: {
        display: true,
        text: 'Humidity ( g.m-3)'
      },
      grid: {
        color: '#1d1d1d',
        backgroundColor: 'white'
      },
      min: 0,
      max: 100,
      ticks: {
        stepSize: 10,
        maxTicksLimit: 10
      }
    },
    x: {
      display: true,
      title: {
        display: true,
        text: 'Date & Time'
      },

      grid: {
        color: '#1d1d1d'
      }
    }
  }
}

const weatherCondOptions = {
  responsive: true
}

onMounted(async () => {
  client.on('connect', () => {
    console.log('Connected to MQTT broker')
    client.subscribe(MQTT_TOPIC)
  })

  client.on('message', (topic, payload) => {
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
    // const response = await axios.get('http://localhost:5000/api/v1/weather')
    const response = await getWeather();
    const data = await response.data
    weatherDataFromApi.value = data
    console.log(weatherDataFromApi.value)
  } catch (err) {
    console.log(err)
  }
})

onBeforeUnmount(() => {
  if (client) {
    client.end()
    console.log('Disconnected from MQTT broker')
  }
})

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
</script>