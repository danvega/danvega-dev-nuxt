// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-13",
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/content',
    '@vueuse/nuxt',
    '@nuxtjs/sitemap',
    '@nuxt/image'
  ],
  // Thank You, Debbie - https://debbie.codes/blog/nuxt-lite-youtube-embeds/
  plugins: [
      '~/plugins/youtube.client.js',
      '~/plugins/sentry.client.ts'
  ],
  build: {
    transpile: ['lite-youtube'],
  },
  vite: {
    vue: {
      script: {
        propsDestructure: true
      },
      template: {
        compilerOptions: {
          isCustomElement: tag => tag === 'lite-youtube'
        }
      }
    }
  },
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      urlSchema: 'http',
      urlDomain: 'localhost:3000',
      urlBase: 'http://localhost:3000',
      sentry: {
        dsn: '',
        environment: 'development',
      },
      fathom: {
        siteId: ''
      }
    },
  },
  routeRules: {
    '/blog/**': { isr: true },
    '/newsletter/**': { isr: true },
    '/about': { prerender: true },
    '/speaking': { prerender: true },
    '/courses': { prerender: true },
    '/uses': { prerender: true },
    '/contact': { redirect: '/about' }
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      script: [
        {src: "https://cdn.usefathom.com/script.js" , "data-site": process.env.NUXT_PUBLIC_FATHOM_SITE_ID, defer: true, tagPosition: 'bodyClose'}
      ],
    }
  },
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
      // Let Nuxt Content handle serverless automatically - zero configuration
      build: {
          markdown: {
              highlight: {
                  theme: {
                      default: 'github-light',
                      dark: 'github-dark',
                      sepia: 'github-light'
                  },
                  langs: ['java','json','js','ts','css','shell','html','md','yaml','sql','properties','http','groovy']
              }
          }
      }
  },
  image: {
    provider: process.env.NODE_ENV === 'production' ? 'netlify' : 'ipx',
    domains: ['danvega.dev', 'www.danvega.dev']
  },
  nitro: {
    preset: 'netlify'
    // Let Nuxt Content handle serverless configuration automatically
  },
  sitemap: {
    xsl: false
  },
  css: ['~/node_modules/lite-youtube-embed/src/lite-yt-embed.css'],
  devtools: { enabled: true }
})