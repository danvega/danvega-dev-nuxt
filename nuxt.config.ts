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
    '/contact': { redirect: '/about' },
    '/api/_content/**': { prerender: false }
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
    highlight: {
      theme: {
        // Default theme (same as single string)
        default: 'github-light',
        // Theme used if `html.dark`
        dark: 'github-dark',
        // Theme used if `html.sepia`
        sepia: 'github-light'
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
          copyright: '2024 by Dan Vega',
          language: 'en',
          link: process.env.BASE_URL || 'https://www.danvega.dev',
          id: process.env.BASE_URL || 'https://www.danvega.dev',
          author: { email: 'danvega@gmail.com', name: 'Dan Vega' },
          feedLinks: {
            rss: `${process.env.BASE_URL}/feed.xml`,
            json: `${process.env.BASE_URL}/feed.json`,
          },
        },
      },
      item: {
        defaults: {
          author: [
            { email: 'danvega@gmail.com', name: 'Dan Vega' },
          ],
        },
        mapping: [
          ['description', 'excerpt'],
          ['link', '_path'],
          ['published', 'date', value => value ? new Date(value) : value],
          ['guid', '_path'],
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
    xsl: false,

  },
  css: ['~/node_modules/lite-youtube-embed/src/lite-yt-embed.css'],
  devtools: { enabled: true }
})
