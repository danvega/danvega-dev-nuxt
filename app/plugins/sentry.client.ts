import * as Sentry from '@sentry/vue'

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
            enableLogs:true,
            integrations: [
                Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] }),
                Sentry.replayIntegration({
                    maskAllText: true,
                    blockAllMedia: true,
                }),
                Sentry.browserTracingIntegration({
                    router,
                    routeLabel: 'path',
                }),
            ],
            // Optimized for production performance
            tracesSampleRate: sentry.environment === 'production' ? 0.05 : 0.2, // Reduced for prod
            // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
            tracePropagationTargets: ['localhost', 'https://danvega.dev'],
            replaysSessionSampleRate: 0.1,
            replaysOnErrorSampleRate: 1.0,
        })
    })
})