<script setup>
import { useAuthStore } from '@/stores/authStore'
import { ref, watch } from 'vue'

const authStore = useAuthStore()

const loginData = ref({
  email: 'test@gmail.com',
  password: 'test.1234'
})

const handleSubmit = async () => {
  await authStore.login(loginData.value.email, loginData.value.password)
}
</script>

<template>
  <main>
    <div
      class="custom-bg-gradient flex min-h-screen items-center justify-center px-4"
      style="
        background-image: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.8) 0,
            rgba(0, 0, 0, 0) 60%,
            rgba(0, 0, 0, 0.8) 100%
          ),
          url(https://www.un.org/sites/un2.un.org/files/styles/large-article-image-style-16-9/public/field/image/2023/03/52196025795_06f077377a_c.jpg);
        background-size: cover;
      "
    >
      <div class="bg-black w-full rounded-lg bg-backgroundBlack shadow sm:max-w-md md:mt-0 xl:p-0">
        <div class="space-y-4 p-6 sm:p-8 md:space-y-6">
          <h1
            data-testid="login-heading"
            class="text-xl font-bold leading-tight tracking-tight md:text-2xl"
          >
            Log in
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="handleSubmit()">
            <div>
              <label for="email" class="mb-2 block text-sm font-medium">Email</label>
              <input
                type="email"
                id="email"
                class="block w-full rounded-lg border border-gray-300 bg-[#292929] p-2.5 focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
                placeholder="name@service.com"
                v-model="loginData.email"
                required
              />
              <span class="text-sm text-red-500"></span>
            </div>
            <div>
              <label for="password" class="mb-2 block text-sm font-medium">Password</label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                class="block w-full rounded-lg border border-gray-300 bg-[#292929] p-2.5 focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
                v-model="loginData.password"
                required
              />
              <span class="text-sm text-red-500"></span>
            </div>
            <div v-if="authStore.error" class="text-sm text-red-500 text-center">
              {{ authStore.error }}
            </div>
            <div class="flex items-center justify-center">
              <button
                class="text-white my-2 font-medium rounded text-sm md:text-base lg:text-lg px-5 py-2.5 text-center mr-2 inline-flex items-center transition-all focus:ring-4 focus:outline-none bg-primaryRed hover:bg-secondaryRed"
              >
                Submit
              </button>
            </div>
            <p class="text-sm font-light text-gray-500">
              Don't have an account?
              <router-link
                to="/signup"
                class="font-medium text-primaryRed hover:underline opacity-[0.9]"
                >Sign Up</router-link
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>
 