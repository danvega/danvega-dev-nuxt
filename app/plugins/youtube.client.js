export default defineNuxtPlugin(() => {
  if (process.client) {
    // Dynamically import and initialize lite-youtube-embed
    import('lite-youtube-embed');
  }
})