<script lang="ts" setup>
useHead({
  title: 'Workshop Login | Dan Vega',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
});

const route = useRoute()
const router = useRouter()
const { login } = useWorkshopAuth()

const password = ref('')
const error = ref('')
const loading = ref(false)

const handleLogin = async () => {
  error.value = ''
  loading.value = true

  try {
    const result = await login(password.value)

    if (result.success) {
      const redirect = route.query.redirect as string || '/workshop'
      // Use navigateTo with external: true to force a full page reload
      // This ensures the cookie is properly read by the middleware
      await navigateTo(redirect, { external: true })
    } else {
      error.value = result.error || 'Invalid password'
      password.value = ''
    }
  } catch (e) {
    error.value = 'An error occurred. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Container class="mt-16 sm:mt-32">
    <div class="max-w-md mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          Workshop Access
        </h1>
        <p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          This page is password-protected. Please enter the password that was shared with workshop attendees.
        </p>
      </div>

      <div class="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 p-8">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="password" class="block text-sm font-semibold text-zinc-800 dark:text-zinc-100 mb-2">
              Password
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              autocomplete="off"
              class="w-full rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 px-4 py-3 text-base text-zinc-800 dark:text-zinc-100 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              :disabled="loading"
            />
          </div>

          <div v-if="error" class="rounded-lg bg-red-50 dark:bg-red-950/30 p-4 border border-red-200 dark:border-red-800">
            <p class="text-sm text-red-900 dark:text-red-300">
              {{ error }}
            </p>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Authenticating...' : 'Access Workshop' }}
          </button>
        </form>
      </div>

      <div class="mt-6 text-center">
        <p class="text-sm text-zinc-600 dark:text-zinc-400">
          Don't have the password? It should have been provided at the start of the workshop.
        </p>
      </div>
    </div>
  </Container>
</template>
