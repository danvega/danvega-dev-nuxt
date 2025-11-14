export const useWorkshopAuth = () => {
  const authCookie = useCookie('workshop-auth', {
    maxAge: 60 * 60 * 24, // 24 hours
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production'
  })

  const isAuthenticated = computed(() => {
    return authCookie.value === 'authenticated'
  })

  const login = async (password: string) => {
    try {
      const response = await $fetch('/api/workshop-auth', {
        method: 'POST',
        body: { password }
      })

      if (response.authenticated) {
        // The server will set both cookies, but we manually set the client one
        // to ensure it's immediately available
        authCookie.value = 'authenticated'
        return { success: true }
      }

      return { success: false, error: 'Invalid password' }
    } catch (error) {
      return { success: false, error: 'Authentication failed. Please try again.' }
    }
  }

  const logout = () => {
    authCookie.value = null
    // Also clear the server cookie by making a request or just reload
    if (process.client) {
      document.cookie = 'workshop-auth-server=; Max-Age=0; path=/; sameSite=strict'
    }
  }

  return {
    isAuthenticated,
    login,
    logout
  }
}
