<script setup>
import { useAuthStore } from '@/stores/authStore'
import { ref } from 'vue'

const authStore = useAuthStore()
</script>

<template>
  <nav class="bg-black sticky w-full z-20 top-0 start-0 border-b-2 border-primaryRed">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <router-link to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <span class="self-center text-2xl font-semibold whitespace-nowrap text-primaryRed"
          >WeatherHub</span
        >
      </router-link>
      <div class="flex justify-between gap-10">
        <router-link to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
          <span
            class="self-center text-lg font-semibold whitespace-nowrap text-primaryRed hover:underline"
            >Home</span
          >
        </router-link>
        <router-link to="/weather-charts" class="flex items-center space-x-3 rtl:space-x-reverse">
          <span
            class="self-center text-lg font-semibold whitespace-nowrap text-primaryRed hover:underline"
            >Charts</span
          >
        </router-link>
      </div>
      <template v-if="authStore.isLoggedIn">
        <div class="flex items-center gap-5 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <p class="font-medium text-white">Hello User</p>
          <button
            @click="authStore.logout()"
            type="button"
            class="text-white bg-primaryRed hover:bg-secondaryRed font-medium rounded-lg text-sm px-4 py-2 text-center"
          >
            Log out
          </button>
        </div>
      </template>
      <template v-else>
        <router-link to="/login">
          <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              class="text-white bg-primaryRed hover:bg-secondaryRed font-medium rounded-lg text-sm px-4 py-2 text-center"
            >
              Log In
            </button>
          </div>
        </router-link>
      </template>
    </div>
  </nav>
</template>
