<script setup lang="ts">
// Self-hosted slide viewer. Decks are imported with scripts/import-slides.js.
// Usage in markdown: :slide-deck{slug="kcdc-2026-zero-to-superpowers-claude-code" title="..."}
interface SlideDeck {
  pdf: string
  pdfSize: number
  width: number
  height: number
  slides: Array<{ src: string; text: string }>
}

const props = defineProps({
  slug: {
    type: String,
    required: false,
    description: 'Deck folder under public/slides. Defaults to the current page slug.'
  },
  title: {
    type: String,
    default: 'Slides',
    description: 'Accessible name for the viewer'
  }
})

const route = useRoute()
const deckSlug = computed(() => props.slug || (route.params['slug'] as string))

const { data: deck } = await useFetch<SlideDeck>(`/api/slides/${deckSlug.value}`, {
  key: `slides-${deckSlug.value}`
})

const total = computed(() => deck.value?.slides.length ?? 0)
const current = ref(0)
const slide = computed(() => deck.value?.slides[current.value])
const progress = computed(() => (total.value ? ((current.value + 1) / total.value) * 100 : 0))

const pdfSizeLabel = computed(() => {
  const bytes = deck.value?.pdfSize ?? 0
  return bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`
})

function altFor(index: number) {
  const text = deck.value?.slides[index]?.text ?? ''
  const summary = text.length > 250 ? `${text.slice(0, 247)}...` : text
  return summary ? `Slide ${index + 1}: ${summary}` : `Slide ${index + 1}`
}

function goTo(index: number) {
  if (!total.value) return
  current.value = Math.min(Math.max(index, 0), total.value - 1)
}

const prev = () => goTo(current.value - 1)
const next = () => goTo(current.value + 1)

// Fullscreen (not available on iPhone Safari, so the button hides there)
const viewer = ref<HTMLElement | null>(null)
const canFullscreen = ref(false)
const isFullscreen = ref(false)

function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    viewer.value?.requestFullscreen()
  }
}

function onFullscreenChange() {
  isFullscreen.value = document.fullscreenElement === viewer.value
}

function onKeydown(e: KeyboardEvent) {
  const actions: Record<string, () => void> = {
    ArrowLeft: prev,
    ArrowUp: prev,
    PageUp: prev,
    ArrowRight: next,
    ArrowDown: next,
    PageDown: next,
    ' ': next,
    Home: () => goTo(0),
    End: () => goTo(total.value - 1),
    f: toggleFullscreen
  }
  const action = actions[e.key]
  if (action && !e.metaKey && !e.ctrlKey && !e.altKey) {
    e.preventDefault()
    action()
  }
}

// Click the left third of a slide to go back, anywhere else to go forward
function onStageClick(e: MouseEvent) {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  if (e.clientX - rect.left < rect.width / 3) prev()
  else next()
}

let touchStartX: number | null = null

function onTouchStart(e: TouchEvent) {
  touchStartX = e.touches[0]?.clientX ?? null
}

function onTouchEnd(e: TouchEvent) {
  const endX = e.changedTouches[0]?.clientX
  if (touchStartX === null || endX === undefined) return
  const delta = endX - touchStartX
  if (Math.abs(delta) > 40) {
    if (delta < 0) next()
    else prev()
  }
  touchStartX = null
}

onMounted(() => {
  canFullscreen.value = document.fullscreenEnabled

  // Deep link: ?slide=12
  const requested = Number(route.query['slide'])
  if (Number.isInteger(requested) && requested > 0) goTo(requested - 1)

  document.addEventListener('fullscreenchange', onFullscreenChange)
})

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', onFullscreenChange)
})

watch(current, (index) => {
  // Warm the cache for the neighbors so paging feels instant
  for (const i of [index + 1, index - 1]) {
    const src = deck.value?.slides[i]?.src
    if (src) new Image().src = src
  }

  // Keep the URL shareable without adding history entries
  const url = new URL(window.location.href)
  if (index === 0) url.searchParams.delete('slide')
  else url.searchParams.set('slide', String(index + 1))
  window.history.replaceState(window.history.state, '', url)
})
</script>

<template>
  <div v-if="deck && slide" class="not-prose my-8">
    <div
      ref="viewer"
      tabindex="0"
      role="region"
      aria-roledescription="slide deck"
      :aria-label="title"
      class="overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      :class="isFullscreen
        ? 'flex h-full w-full flex-col bg-black'
        : 'rounded-lg border border-zinc-200 bg-zinc-100 shadow-sm dark:border-zinc-700 dark:bg-zinc-900'"
      @keydown="onKeydown"
    >
      <!-- Slide -->
      <div
        class="relative cursor-pointer select-none"
        :class="isFullscreen ? 'min-h-0 flex-1' : ''"
        :style="isFullscreen ? undefined : { aspectRatio: `${deck.width} / ${deck.height}` }"
        @click="onStageClick"
        @touchstart.passive="onTouchStart"
        @touchend="onTouchEnd"
      >
        <img
          :src="slide.src"
          :alt="altFor(current)"
          :width="deck.width"
          :height="deck.height"
          :loading="current === 0 ? 'lazy' : 'eager'"
          draggable="false"
          class="h-full w-full object-contain"
        >
        <div class="absolute inset-x-0 bottom-0 h-1 bg-black/10 dark:bg-white/10">
          <div class="h-full bg-blue-600 transition-[width] duration-200 dark:bg-blue-400" :style="{ width: `${progress}%` }" />
        </div>
      </div>

      <!-- Controls -->
      <div
        class="flex items-center justify-between gap-2 px-2 py-2 sm:px-3"
        :class="isFullscreen
          ? 'bg-zinc-900 text-zinc-100'
          : 'border-t border-zinc-200 bg-white text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200'"
      >
        <div class="flex items-center gap-1">
          <button
            type="button"
            class="flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent dark:hover:bg-zinc-700"
            :class="isFullscreen && 'hover:bg-zinc-700'"
            aria-label="Previous slide"
            :disabled="current === 0"
            @click="prev"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
          <span class="min-w-[4.5rem] text-center font-mono text-sm tabular-nums" aria-live="polite">
            {{ current + 1 }} / {{ total }}
          </span>
          <button
            type="button"
            class="flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent dark:hover:bg-zinc-700"
            :class="isFullscreen && 'hover:bg-zinc-700'"
            aria-label="Next slide"
            :disabled="current === total - 1"
            @click="next"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        <div class="flex items-center gap-1 sm:gap-2">
          <button
            v-if="canFullscreen"
            type="button"
            class="flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-700"
            :class="isFullscreen && 'hover:bg-zinc-700'"
            :aria-label="isFullscreen ? 'Exit full screen' : 'Full screen'"
            @click="toggleFullscreen"
          >
            <svg v-if="!isFullscreen" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
            </svg>
            <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" />
            </svg>
          </button>
          <a
            :href="deck.pdf"
            download
            :aria-label="`Download PDF (${pdfSizeLabel})`"
            class="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-500"
          >
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            <span class="sm:hidden">PDF</span>
            <span class="hidden sm:inline">Download PDF</span>
            <span class="hidden font-normal text-blue-100 sm:inline">{{ pdfSizeLabel }}</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Every slide's text, for search engines and screen readers -->
    <details class="group mt-3 text-sm text-zinc-600 dark:text-zinc-400">
      <summary class="cursor-pointer select-none font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100">
        Slide text
      </summary>
      <ol class="mt-3 space-y-2 border-l border-zinc-200 pl-4 dark:border-zinc-700">
        <template v-for="(s, i) in deck.slides" :key="s.src">
          <li v-if="s.text">
            <button
              type="button"
              class="text-left hover:text-blue-600 dark:hover:text-blue-400"
              @click="goTo(i); viewer?.focus()"
            >
              <span class="font-mono text-zinc-400 dark:text-zinc-500">{{ i + 1 }}.</span>
              {{ s.text }}
            </button>
          </li>
        </template>
      </ol>
    </details>
  </div>
</template>
