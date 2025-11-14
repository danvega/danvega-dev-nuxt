export default defineNuxtRouteMiddleware((to) => {
  // On server, check the httpOnly cookie
  if (process.server) {
    const authCookie = useCookie('workshop-auth-server')
    if (authCookie.value !== 'authenticated') {
      return navigateTo(`/workshop/login?redirect=${encodeURIComponent(to.fullPath)}`)
    }
  }

  // On client, check the client-readable cookie
  if (process.client) {
    const authCookie = useCookie('workshop-auth')
    if (authCookie.value !== 'authenticated') {
      return navigateTo(`/workshop/login?redirect=${encodeURIComponent(to.fullPath)}`)
    }
  }
})
