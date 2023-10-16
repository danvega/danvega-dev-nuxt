// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/content',
    '@vueuse/nuxt'
  ],
  // Thank You, Debbie - https://debbie.codes/blog/nuxt-lite-youtube-embeds/
  plugins: ['~/plugins/youtube.client.js'],
  build: {
    transpile: ['lite-youtube'],
  },
  vue: {
    compilerOptions: {
      isCustomElement: tag => ['lite-youtube'].includes(tag),
    },
  },
  runtimeConfig: {},
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: '',
  },
  tailwindcss: {
    cssPath: '~assets/styles/tailwind.css',
    configPath: 'tailwind.config.ts',
    exposeConfig: false,
    config: {},
    injectPosition: 0,
    viewer: true
  },
  // production build issue: https://answers.netlify.com/t/javascript-heap-out-of-memory-when-trying-to-build-a-nuxt-app/93138/13
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      cssnano:
          process.env.NODE_ENV === 'production'
              ? { preset: ['default', { discardComments: { removeAll: true } }] }
              : false, // disable cssnano when not in production
    },
  },
  content: {
      // content options
    highlight: {
      theme: {
        // Default theme (same as single string)
        default: 'nord',
        // Theme used if `html.dark`
        dark: 'github-dark',
        // Theme used if `html.sepia`
        sepia: 'monokai'
      },
      // https://github.com/shikijs/shiki/blob/main/docs/languages.md#adding-grammar
      preload: ['java','json','js','ts','css','shell','html','md','yaml','sql','properties','http','groovy']
    }
  },
  css: ['~/node_modules/lite-youtube-embed/src/lite-yt-embed.css'],
  devtools: { enabled: false }
})