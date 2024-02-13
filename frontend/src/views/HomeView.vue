<script setup>
import NavbarComp from '@/components/Navbar.vue'
import { useAuthStore } from '@/stores/authStore'
import axios from 'axios'
import { onMounted, ref } from 'vue'

const authStore = useAuthStore()
const weatherData = ref([
  {
    city: 'New York',
    temperature: 20,
    weather: 'Sunny',
    humidity: 60
  },
  {
    city: 'Los Angeles',
    temperature: 25,
    weather: 'Partly Cloudy',
    humidity: 55
  },
  {
    city: 'London',
    temperature: 15,
    weather: 'Rainy',
    humidity: 75
  },
  {
    city: 'Paris',
    temperature: 18,
    weather: 'Cloudy',
    humidity: 70
  },
  {
    city: 'Tokyo',
    temperature: 22,
    weather: 'Clear',
    humidity: 65
  }
])

const weatherDataFromApi = ref(null)

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/v1/weather')
    const data = await response.data.data
    weatherDataFromApi.value = data
  } catch (err) {
    console.log(err)
  }
})
</script>

<template>
  <NavbarComp />
  <div class="px-16 mt-5">
    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left rtl:text-right">
        <thead class="text-xs uppercase bg-gray-50 text-gray-700">
          <tr>
            <th scope="col" class="px-6 py-3 bg-[#6b7280]">City</th>
            <th scope="col" class="px-6 py-3 bg-[#6b7280]">Temperature</th>
            <th scope="col" class="px-6 py-3 bg-[#6b7280]">Condition</th>
            <th scope="col" class="px-6 py-3 bg-[#6b7280]">Humidity</th>
          </tr>
        </thead>
        <tbody v-for="(weather, index) in weatherDataFromApi" :key="index">
          <tr class="bg-white border-b">
            <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
              {{ weather.city }}
            </th>
            <td class="px-6 py-4">{{ weather.temperature }}°C</td>
            <td class="px-6 py-4">{{ weather.weather }}</td>
            <td class="px-6 py-4">{{ weather.humidity }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
</style>


