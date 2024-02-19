<script setup lang="ts">
import { PropType } from 'vue'

interface WeatherData {
  city: string
  weather_condition: string
  tempval: number
  humidval: number
  _time: string
}

const props = defineProps<{
  weatherData: WeatherData[]
}>()
</script>

<template>
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
    <tbody v-for="(weather, index) in weatherData" :key="index">
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
</template>
