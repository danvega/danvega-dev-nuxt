export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const workshopPassword = config.workshopPassword

  if (!workshopPassword) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Workshop password not configured'
    })
  }

  if (body.password === workshopPassword) {
    // Set httpOnly cookie for server-side validation
    setCookie(event, 'workshop-auth-server', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 24 hours
    })

    // Set client-readable cookie for client-side checks
    setCookie(event, 'workshop-auth', 'authenticated', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 24 hours
    })

    return { authenticated: true }
  }

  return { authenticated: false }
})
