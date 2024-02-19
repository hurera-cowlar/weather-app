<script setup lang="ts">
import NavbarComp from '@/components/Navbar.vue'
import { useAuthStore } from '@/stores/authStore'
import { onMounted, ref, onBeforeUnmount } from 'vue'
import { getWeather } from '@/api/weather'
import TableComponent from '@/components/Table.vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

import { connectToMQTTBroker, disconnectFromMQTTBroker } from '@/utils/mqtt'

const authStore = useAuthStore()

const weatherDataFromApi = ref(null)

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
      <TableComponent v-else :weatherData="weatherDataFromApi" />
    </div>
  </div>
</template>

<style></style>
