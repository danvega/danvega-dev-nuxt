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
            // The DSN is public (this repo is open source) and forks that keep it
            // send their errors here — only accept events from our own pages.
            allowUrls: [/https?:\/\/(www\.)?danvega\.dev/, /localhost/],
            ignoreErrors: [
                // View Transitions API aborts (viewTransition: true wraps every
                // navigation): the animation is skipped but navigation completes.
                'Transition was aborted',
                'Transition was skipped',
                'View transition update callback timed out',
                'Skipping view transition',
                'Skipped ViewTransition',
                // Users on a tab from a previous deploy requesting purged assets;
                // Nuxt already recovers by reloading on chunk errors.
                /Failed to fetch dynamically imported module/,
                /error loading dynamically imported module/,
                /\/_nuxt\/builds\/(meta\/[\w-]+\.json|latest\.json)/,
                // Browser-extension code erroring inside our pages.
                'zp_token is not defined',
                'crusoe is not defined',
            ],
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