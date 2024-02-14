<script setup>
import NavbarComp from '@/components/Navbar.vue'
import { useAuthStore } from '@/stores/authStore'
import axios from 'axios'
import { onMounted, ref } from 'vue'

const authStore = useAuthStore()

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
            <th scope="col" class="px-6 text-center py-3 w-[%] bg-[#6b7280] font-bold">City</th>
            <th scope="col" class="px-6 text-center py-3 w-[%] bg-[#6b7280] font-bold">Condition</th>
            <th scope="col" class="px-6 text-center py-3 w-[%] bg-[#6b7280] font-bold">Temperature</th>
            <th scope="col" class="px-6 text-center py-3 w-[%] bg-[#6b7280] font-bold">Humidity</th>
            <th scope="col" class="px-6 text-center py-3 w-[%] bg-[#6b7280] font-bold">Time</th>
          </tr>
        </thead>
        <tbody v-for="(weather, index) in weatherDataFromApi" :key="index">
          <tr class="bg-white border-b">
            <th scope="row" class="px-6 text-center py-4 font-medium whitespace-nowrap">
              {{ weather.city }}
            </th>
            <!-- <td class="px-6 text-center py-4 w-[%]">{{ weather.city }}°C</td> -->
            <td class="px-6 text-center py-4 w-[%]">{{ weather.weather_condition }}</td>
            <td class="px-6 text-center py-4 w-[%]">{{ weather.tempval }}°C</td>
            <td class="px-6 text-center py-4 w-[%]">{{ weather.humidval }}</td>
            <td class="px-6 text-center py-4 w-[%]">{{ new Date(weather._time).toLocaleString() }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
</style>


