import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    token: '',
    isLoggedIn: false,
    isLoading: false,
    error: ref(null)
  }),
  persist: {
    storage: localStorage,
    paths: ['token', 'isLoggedIn']
  },
  actions: {
    async login(email, password) {
      this.isLoading = true
      try {
        const data = await axios.post(`http://localhost:5000/api/v1/auth/login`, {
          email,
          password
        })
        this.token = data.data.token
        this.isLoggedIn = true
        localStorage.setItem('token', this.token)
        router.push('/')
      } catch (err) {
        this.error = err.response.data.message
        console.log(err)
      } finally {
        this.isLoading = false
      }
    },
    async signup(name, email, password, phone) {
      this.isLoading = true
      try {
        const data = await axios.post(`http://localhost:5000/api/v1/auth/signup`, {
          name,
          email,
          password,
          phoneNumber: phone
        })
        this.token = data.data.token
        this.isLoggedIn = true
        localStorage.setItem('token', this.token)
        router.push('/')
      } catch (err) {
        this.error = err.response.data.message
        console.log(err)
      } finally {
        this.isLoading = false
      }
    },
    async logout() {
      this.token = ''
      this.isLoggedIn = false
      this.isLoading = false
      this.error = ref(null)
      router.push('/login')
    }
  }
})
