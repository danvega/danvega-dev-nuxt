const urlSchema = process.env.URL_SCHEMA || 'http'
const urlDomain = process.env.URL_DOMAIN || 'localhost:3000'
const urlBase = process.env.URL_BASE || `${urlSchema}://${urlDomain}`

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/content',
    'nuxt-feedme',
    '@vueuse/nuxt',
    'nuxt-simple-sitemap',
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
      }
    }
  },
  runtimeConfig: {
    public: {
      urlSchema,
      urlDomain,
      urlBase,
      sentry: {
        dsn: 'https://192a6edf487cb3f69aa56e4cefbcfc75@o268705.ingest.sentry.io/4506073654099968',
        environment: 'development',
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
        {src: "https://cdn.usefathom.com/script.js" , "data-site": "ZWNSJLZA", defer: true, tagPosition: 'bodyClose'}
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
  feedme: {
    feeds: {
      '/feed.atom': { content: true },
      '/feed.json': { content: true },
      '/feed.xml': { content: true },
      '/rss.xml': { revisit: '1h', type: 'rss2', content: true },
    },
    content: {
      feed: {
        defaults: {
          title: 'Dan Vega',
          description: 'Personal site of Dan Vega',
          copyright: '2023 by Dan Vega',
          link: urlBase,
          id: urlBase,
          author: { email: 'danvega@gmail.com', name: 'Dan Vega' },
        },
      },
      item: {
        defaults: {
          author: [
            { email: 'danvega@gmail.com', name: 'Dan Vega' },
          ],
        },
        mapping: [
          // Description is used in Feed, so you point Feed object field to yours post field
          ['description', 'excerpt'],
          // Same
          ['link', '_path'],
          // Taking published from date, wrapping value by Date object as described in Readme
          ['published', 'date', value => value ? new Date(value) : value],
        ],
        query: {
          limit: 200,
          where: [
            {_path: /^\/blog\/.*$/ }
          ]
        },
      }
    }
  },
  image: {
    provider: 'netlify',
    netlify: {
      baseURl: process.env.IMAGES_URL
    }
  },
  sitemap: {
    strictNuxtContentPaths: true,
    xsl: false
  },
  css: ['~/node_modules/lite-youtube-embed/src/lite-yt-embed.css'],
  devtools: { enabled: true }
})