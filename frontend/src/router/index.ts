import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import WeatherChart from '../views/WeatherChart.vue'
import HomePage from '../views/HomeView.vue'
import { useAuthStore } from '../stores/authStore';

import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/weather-charts',
      name: 'weather-charts',
      component: WeatherChart,
      meta: { requiresAuth: true }
    },
    {
      path: '/weather-chart',
      name: 'weather-chart',
      component: WeatherChart,
      meta: { requiresAuth: true }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    toast("You need to log in first!", {
      "theme": "dark",
      "type": "warning",
      "position": "top-center",
      "dangerouslyHTMLString": true
    })
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
