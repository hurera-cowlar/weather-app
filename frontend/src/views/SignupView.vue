<script setup>
import { useAuthStore } from '@/stores/authStore'
import { ref } from 'vue'

const authStore = useAuthStore()

const signupData = ref({
  email: 'test11@gmail.com',
  password: 'test.1234',
  name: 'Jane Doe',
  phone: '9876543210'
})
const handleSubmit = async () => {
  await authStore.signup(
    signupData.value.name,
    signupData.value.email,
    signupData.value.password,
    signupData.value.phone
  )
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
      <div class="w-full rounded-lg bg-backgroundBlack shadow sm:max-w-md md:mt-0 xl:p-0">
        <div class="space-y-4 p-6 sm:p-8 md:space-y-6">
          <h1
            data-testid="login-heading"
            class="text-xl font-bold leading-tight tracking-tight md:text-2xl"
          >
            Sign up
          </h1>
          <form @submit="handleSubmit()" class="space-y-4 md:space-y-6">
            <div>
              <label for="email" class="mb-2 block text-sm font-medium">Email</label>
              <input
                type="email"
                id="email"
                class="block w-full rounded-lg border border-gray-300 bg-[#292929] p-2.5 focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
                placeholder="name@service.com"
                v-model="signupData.email"
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
                v-model="signupData.password"
              />
              <span class="text-sm text-red-500"></span>
            </div>
            <div>
              <label for="name" class="mb-2 block text-sm font-medium">Name</label>
              <input
                type="name"
                id="name"
                placeholder="John Doe"
                class="block w-full rounded-lg border border-gray-300 bg-[#292929] p-2.5 focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
                v-model="signupData.name"
              />
              <span class="text-sm text-red-500"></span>
            </div>
            <div>
              <label for="phone" class="mb-2 block text-sm font-medium">Phone Number</label>
              <input
                type="phone"
                id="phone"
                placeholder="923487203355"
                class="block w-full rounded-lg border border-gray-300 bg-[#292929] p-2.5 focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
                v-model="signupData.phone"
              />
              <span class="text-sm text-red-500"></span>
            </div>
            <div class="text-sm text-red-500"></div>
            <div class="flex items-center justify-center">
              <button
                class="text-white my-2 font-medium rounded text-sm md:text-base lg:text-lg px-5 py-2.5 text-center mr-2 inline-flex items-center transition-all focus:ring-4 focus:outline-none bg-primaryRed hover:bg-secondaryRed"
              >
                Submit
              </button>
            </div>
            <p class="text-sm font-light text-gray-500">
              Already have an account?
              <router-link
                to="/login"
                class="font-medium text-primaryRed hover:underline opacity-[0.9]"
                >Log In</router-link
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>
 