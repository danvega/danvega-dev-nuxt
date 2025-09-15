import * as Sentry from '@sentry/vue'
// thank you https://www.lichter.io/articles/nuxt3-sentry-recipe/?ref=github-sentry-support-issue
export default defineNuxtPlugin((nuxtApp) => {
    const router = useRouter()
    const { public: { sentry } } = useRuntimeConfig()
    if (!sentry.dsn) {
        return
    }

    // Delay initialization to avoid blocking initial page load
    nextTick(() => {
    Sentry.init({
        app: nuxtApp.vueApp,
        dsn: sentry.dsn,
        environment: sentry.environment,
        integrations: [
            new Sentry.BrowserTracing({
                routingInstrumentation: Sentry.vueRouterInstrumentation(router),
            }),
            new Sentry.Replay(),
        ],
        // Optimized for production performance
        tracesSampleRate: sentry.environment === 'production' ? 0.05 : 0.2, // Reduced for prod
        // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
        tracePropagationTargets: ['localhost', 'https://danvega.dev'],
        replaysSessionSampleRate: sentry.environment === 'production' ? 0.02 : 0.1, // Much lower for prod
        replaysOnErrorSampleRate: sentry.environment === 'production' ? 0.05 : 0.1, // Lower for prod
    })
    })
})