import * as Sentry from '@sentry/vue'
// thank you https://www.lichter.io/articles/nuxt3-sentry-recipe/?ref=github-sentry-support-issue
export default defineNuxtPlugin((nuxtApp) => {
    const router = useRouter()
    const { public: { sentry } } = useRuntimeConfig()
    if (!sentry.dsn) {
        return
    }
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
        // Configure this whole part as you need it!
        tracesSampleRate: 0.2, // Change in prod
        // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
        tracePropagationTargets: ['localhost', 'https://danvega.dev'],
        replaysSessionSampleRate: 0.1, // Change in prod
        replaysOnErrorSampleRate: 0.1, // Change in prod if necessary
    })
})