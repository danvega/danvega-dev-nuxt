// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  hooks: {
    'build:before': async () => {
      // Generate RSS data during build process
      try {
        const { generateRSSData } = await import('./scripts/generate-rss-data.js')
        await generateRSSData()
        console.log('✅ RSS data generated successfully')
      } catch (error) {
        console.error('❌ Failed to generate RSS data:', error)
      }
    }
  },
  compatibilityDate: "2024-11-13",
  // Nuxt 4 experimental features for enhanced performance
  experimental: {
    // Improved payload extraction and hydration
    payloadExtraction: false,
    // Enhanced client-side navigation
    viewTransition: true,
    // Better component islands
    componentIslands: true,
    // Improved build performance
    buildCache: true,
    // Additional performance features
    treeshakeClientOnly: true,
    emitRouteChunkError: 'automatic'
  },
  // Enhanced build optimization
  optimization: {
    keyedComposables: [
      {
        name: 'useBlogData',
        argumentLength: 0
      },
      {
        name: 'useNewsletterData',
        argumentLength: 0
      }
    ]
  },
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
    },
    build: {
      // Enhanced build optimization for performance
      rollupOptions: {
        output: {
          // Manual chunk splitting for better caching
          manualChunks: (id) => {
            // Skip Nuxt Content from manual chunking to avoid conflicts
            if (id.includes('node_modules')) {
              if (id.includes('vue') && !id.includes('@nuxt')) return 'vendor-vue'
              if (id.includes('@headlessui') || id.includes('@heroicons')) return 'vendor-ui'
              if (id.includes('@vueuse') || id.includes('lodash-es')) return 'vendor-utils'
              if (id.includes('@sentry/vue')) return 'vendor-sentry'
              return 'vendor'
            }
          }
        }
      },
      // Optimize chunk size
      chunkSizeWarningLimit: 1000,
      // Better tree shaking
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
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
    // Enhanced ISR with Nuxt 4 performance optimizations
    '/blog/**': {
      isr: { ttl: 60 * 60 * 24 }, // 24 hour cache for blog posts
      headers: { 'cache-control': 's-maxage=86400, stale-while-revalidate=3600' }
    },
    '/newsletter/**': {
      isr: { ttl: 60 * 60 * 24 }, // 24 hour cache for newsletters
      headers: { 'cache-control': 's-maxage=86400, stale-while-revalidate=3600' }
    },
    // API routes with specific caching
    '/api/feed/**': {
      headers: { 'cache-control': 's-maxage=3600, stale-while-revalidate=600' } // 1 hour cache for feeds
    },
    '/rss.xml': {
      headers: { 'cache-control': 's-maxage=3600' } // 1 hour cache for RSS
    },
    // Archive and listing pages with shorter cache
    '/blog': {
      isr: { ttl: 60 * 60 * 4 }, // 4 hour cache for blog listing
      headers: { 'cache-control': 's-maxage=14400, stale-while-revalidate=1800' }
    },
    '/newsletter': {
      isr: { ttl: 60 * 60 * 4 }, // 4 hour cache for newsletter listing
      headers: { 'cache-control': 's-maxage=14400, stale-while-revalidate=1800' }
    },
    // Static pages prerendered for maximum performance
    '/about': { prerender: true },
    '/speaking': { prerender: true },
    '/courses': { prerender: true },
    '/uses': { prerender: true },
    // Home page with shorter ISR for fresh content
    '/': {
      isr: { ttl: 60 * 60 * 2 }, // 2 hour cache for homepage
      headers: { 'cache-control': 's-maxage=7200, stale-while-revalidate=900' }
    },
    // Redirects and special pages
    '/contact': { redirect: '/about' },
    // Tools and utilities with longer cache
    '/tools/json-to-java-record': { prerender: true }
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      link: [
        // Resource hints for external domains
        { rel: 'dns-prefetch', href: 'https://cdn.usefathom.com' },
        { rel: 'dns-prefetch', href: 'https://browser.sentry-cdn.com' },
        { rel: 'preconnect', href: 'https://cdn.usefathom.com', crossorigin: 'anonymous' },
        // Critical font preloading (add your fonts here)
        // { rel: 'preload', href: '/fonts/your-font.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' }
      ],
      meta: [
        // Performance and SEO optimizations
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#ffffff' },
        // Preload critical above-the-fold images
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      script: [
        {
          src: "https://cdn.usefathom.com/script.js",
          "data-site": process.env.NUXT_PUBLIC_FATHOM_SITE_ID,
          defer: true,
          async: true,
          tagPosition: 'bodyClose'
        }
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
  // Enhanced PostCSS configuration for performance
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      cssnano: process.env.NODE_ENV === 'production'
        ? {
            preset: ['default', {
              discardComments: { removeAll: true },
              normalizeWhitespace: true,
              removeUnusedKeyframes: true,
              mergeLonghand: true,
              discardDuplicates: true
            }]
          }
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
    preset: 'netlify',
    // Enhanced Nitro performance optimizations
    minify: true,
    sourceMap: false,
    // Advanced caching and compression
    compressPublicAssets: {
      gzip: true,
      brotli: true
    },
    // Route-specific optimizations
    routeRules: {
      '/api/**': {
        // API routes with CORS and caching headers
        cors: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      }
    },
    // Enhanced build performance
    rollupConfig: {
      external: ['sharp', 'sqlite3']
    },
    // Enable experimental features for better performance
    experimental: {
      wasm: true
    }
  },
  sitemap: {
    xsl: false
  },
  css: ['./node_modules/lite-youtube-embed/src/lite-yt-embed.css'],
  devtools: { enabled: true }
})