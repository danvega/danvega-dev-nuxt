import * as Sentry from '@sentry/vue'

// Error monitoring only. Replay, tracing, and console-log forwarding were
// removed on purpose: this is a content site, the stack trace is enough,
// and dropping them keeps the client bundle small.
export default defineNuxtPlugin((nuxtApp) => {
    const { public: { sentry } } = useRuntimeConfig()
    // Skip placeholder values like "your-sentry-dsn" from .env templates.
    if (!sentry.dsn?.startsWith('https://')) {
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
        })
    })
})