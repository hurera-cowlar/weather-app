import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'
import { loginUser, signUpUser } from '@/api/auth'

import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

interface IAuthStoreState {
  token: string
  isLoggedIn: boolean
  isLoading: boolean
  error: string | null
}

export const useAuthStore = defineStore({
  id: 'auth',
  state: (): IAuthStoreState => ({
    token: '',
    isLoggedIn: false,
    isLoading: false,
    error: null
  }),
  persist: {
    storage: localStorage,
    paths: ['token', 'isLoggedIn']
  },
  actions: {
    async login(email: string, password: string) {
      this.isLoading = true
      try {
        // const data = await axios.post(`http://localhost:5000/api/v1/auth/login`, {
        //   email,
        //   password
        // })
        const data = await loginUser(email, password)
        this.token = data.token
        this.isLoggedIn = true
        localStorage.setItem('token', this.token)
        toast('Successfully Logged In!', {
          theme: 'dark',
          type: 'success',
          position: 'top-center',
          dangerouslyHTMLString: true
        })
        router.push('/')
      } catch (err: any) {
        this.error = err.response.data.message
        console.log(err)
       
      } finally {
        this.isLoading = false
      }
    },
    async signup(name: string, email: string, password: string, phone: string) {
      this.isLoading = true
      try {
        const data = await signUpUser(email, password, name, phone)
        // const data = await axios.post(`http://localhost:5000/api/v1/auth/signup`, {
        //   email,
        //   password,
        //   name,
        //   phoneNumber: phone
        // })
        this.token = data.token
        this.isLoggedIn = true
        localStorage.setItem('token', this.token)
        router.push('/')
      } catch (err: any) {
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
      this.error = null
      toast("Bye, you're logged out", {
        theme: 'dark',
        type: 'success',
        position: 'top-center',
        dangerouslyHTMLString: true,
        "autoClose": 10000,
      })
      router.push('/login')

    }
  }
})
