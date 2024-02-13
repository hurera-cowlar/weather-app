<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/authStore'
import LoadingView from './components/LoadingComp.vue'

const authStore = useAuthStore()
</script>

<template>
  <div v-if="authStore.isLoading">
    <LoadingView />
  </div>
  <RouterView v-else/>
</template>

