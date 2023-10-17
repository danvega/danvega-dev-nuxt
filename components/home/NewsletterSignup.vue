<script setup lang="ts">

const dataOptions = {
  "settings": {
    "after_subscribe": {
      "action": "message",
      "success_message": "Success! Now check your email to confirm your subscription.",
      "redirect_url": ""
    },
    "analytics": {
      "google": null,
      "facebook": null,
      "segment": null,
      "pinterest": null,
      "sparkloop": null,
      "googletagmanager": null
    },
    "modal": {
      "trigger": "timer",
      "scroll_percentage": null,
      "timer": 5,
      "devices": "all",
      "show_once_every": 15
    },
    "powered_by": {
      "show": true,
      "url": "https://convertkit.com?utm_source=dynamic&amp;utm_medium=referral&amp;utm_campaign=poweredby&amp;utm_content=form"
    },
    "recaptcha": {
      "enabled": false
    },
    "return_visitor": {
      "action": "show",
      "custom_content": ""
    },
    "slide_in": {
      "display_in": "bottom_right",
      "trigger": "timer",
      "scroll_percentage": null,
      "timer": 5,
      "devices": "all",
      "show_once_every": 15
    },
    "sticky_bar": {
      "display_in": "top",
      "trigger": "timer",
      "scroll_percentage": null,
      "timer": 5,
      "devices": "all",
      "show_once_every": 15
    }
  },
  "version": "5"
}

/*
form id: 1352761
data-uid: 52adfca2a6
 data-sv-form="1352761"
 */
</script>

<template>

  <!-- thank you https://sayzlim.net/plain-html-form-convertkit/ -->

  <form action="https://app.convertkit.com/forms/1352761/subscriptions"
        method="post"
        data-sv-form="1352761"
        data-uid="52adfca2a6"
        data-options="{&quot;settings&quot;:{&quot;after_subscribe&quot;:{&quot;action&quot;: &quot;redirect&quot;,&quot;redirect_url&quot;: &quot;https://www.danvega.dev/newsletter/thank-you/;}}}"
        class="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
    <h2 class="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" class="h-6 w-6 flex-none">
        <path d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z" class="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"/>
        <path d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6" class="stroke-zinc-400 dark:stroke-zinc-500"/>
      </svg>
      <span class="ml-3">Stay up to date</span>
    </h2>
    <p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
      Get notified when I publish something new, and unsubscribe at any time.
    </p>
    <div class="mt-6 flex">
      <input
          type="email"
          placeholder="Email address"
          aria-label="Email address"
          required
          class="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
      />
      <button type="submit" class="inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none ml-4 flex-none bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70">
        Join
      </button>
    </div>
  </form>

</template>

