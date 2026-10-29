<script lang="ts" setup>
import type { Project, ProjectGroup } from '~/types/ui'
import { ChevronRightIcon } from '@heroicons/vue/20/solid'
import { projects, groupLabels, statusLabels } from '~/data/projects'

useHead({
  title: 'Dan Vega - Projects',
  meta: [
    { name: 'title', content: 'Dan Vega - Projects' },
    { name: 'description', content: 'The projects I have built and the stories behind them, from Mac apps and developer tools to an O\'Reilly book and a weekly Spring show.' },
    { property: 'og:title', content: 'Dan Vega - Projects' },
    { property: 'og:description', content: 'The projects I have built and the stories behind them.' }
  ]
});

const groupOrder: ProjectGroup[] = ['apps', 'tools', 'books-and-shows', 'websites']
const groups = groupOrder.map(key => ({
  key,
  label: groupLabels[key],
  projects: projects.filter(p => p.group === key)
}))
// Modal browsing follows the order the list shows
const ordered = groups.flatMap(g => g.projects)

const earliest = Math.min(...projects.map(p => Number(p.since)))
const inProgress = projects.filter(p => p.status === 'in-progress').length

const statusDots: Record<string, string> = {
  active: 'bg-green-500',
  'in-progress': 'bg-yellow-500',
  archived: 'bg-zinc-400 dark:bg-zinc-500'
}

// The open project lives in the URL (?p=slug) so every story has a shareable link.
// The page is prerendered without a query, so only read it after mount to avoid a hydration mismatch.
const selectedSlug = ref<string | null>(null)
onMounted(() => { selectedSlug.value = new URLSearchParams(window.location.search).get('p') })

const selected = computed<Project | null>(() => ordered.find(p => p.slug === selectedSlug.value) ?? null)
const position = computed(() => (selected.value ? ordered.indexOf(selected.value) + 1 : 0))

// The row that morphs into the modal (and back) during a view transition
const morphSlug = ref<string | null>(null)

function withTransition(update: () => Promise<unknown>) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!document.startViewTransition || reduceMotion) {
    update()
    return
  }
  document.startViewTransition(async () => {
    await update()
    await nextTick()
  })
}

// Update the address bar directly instead of going through the router. Production serves
// /projects/ with a trailing slash, and a router navigation resolves to /projects. Nuxt treats
// that as a new page: it remounts the page and starts its own view transition, which aborts ours
// and freezes the screen. A query change here never needs a navigation.
function setProject(slug: string | null) {
  const url = new URL(window.location.href)
  if (slug) url.searchParams.set('p', slug)
  else url.searchParams.delete('p')
  window.history.replaceState(window.history.state, '', url)
  selectedSlug.value = slug
  return Promise.resolve()
}

// Warm the modal's screenshot on hover or focus so it is usually cached by the time the row is clicked.
// The options mirror the NuxtImg in ProjectFrame so the browser picks the same srcset candidate.
const $img = useImage()
const prefetched = new Set<string>()

function prefetch(project: Project) {
  if (prefetched.has(project.slug)) return
  prefetched.add(project.slug)
  const { src, srcset, sizes } = $img.getSizes(`/images/projects/${project.image}`, {
    sizes: '100vw lg:960px',
    modifiers: { width: '1920', quality: $img.options.quality }
  })
  const image = new Image()
  if (sizes) image.sizes = sizes
  if (srcset) image.srcset = srcset
  image.src = src
}

function open(project: Project) {
  morphSlug.value = project.slug
  withTransition(() => setProject(project.slug))
}

function close() {
  withTransition(() => setProject(null))
}

function show(slug: string) {
  morphSlug.value = slug
  withTransition(() => setProject(slug))
}

function step(offset: number) {
  if (!selected.value) return
  show(ordered[(ordered.indexOf(selected.value) + offset + ordered.length) % ordered.length].slug)
}
</script>

<template>
  <Container class="mt-16 sm:mt-32">
    <header>
      <p class="font-mono text-sm text-green-600 dark:text-green-400">$ ls ~/projects</p>
      <h1 class="mt-4 max-w-[30ch] text-4xl font-bold tracking-tight text-balance text-zinc-800 dark:text-zinc-100 sm:text-5xl">
        Things I've built, and the stories behind them.
      </h1>
      <p class="mt-6 max-w-[48ch] text-lg text-pretty text-zinc-600 dark:text-zinc-400">
        Every project here started with a problem I had. Pick one to read why I built it and what I learned.
      </p>
      <p class="mt-6 font-mono text-sm tabular-nums text-zinc-500">
        {{ projects.length }} projects · building since {{ earliest }} · {{ inProgress }} in progress
      </p>
    </header>

    <div class="mt-16 space-y-14 sm:mt-20">
      <section v-for="group in groups" :key="group.key" :aria-labelledby="`group-${group.key}`">
        <h2 :id="`group-${group.key}`" class="font-mono text-sm uppercase tracking-wide text-zinc-500">
          {{ group.label }}
        </h2>
        <ul role="list" class="mt-4 divide-y divide-zinc-900/5 border-y border-zinc-900/5 dark:divide-white/5 dark:border-white/5">
          <li v-for="project in group.projects" :key="project.slug">
            <button
              type="button"
              class="group -mx-3 flex w-[calc(100%+1.5rem)] items-center gap-4 rounded-xl p-3 text-left hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 dark:hover:bg-zinc-800/50 sm:-mx-4 sm:w-[calc(100%+2rem)] sm:px-4"
              :style="morphSlug === project.slug && !selected ? { viewTransitionName: 'project-card' } : undefined"
              @pointerenter="prefetch(project)"
              @focus="prefetch(project)"
              @click="open(project)"
            >
              <ProjectsProjectIcon
                :project="project"
                :style="morphSlug === project.slug && !selected ? { viewTransitionName: 'project-icon' } : undefined"
              />
              <div class="min-w-0 flex-1">
                <p class="text-base font-semibold text-zinc-800 dark:text-zinc-100">
                  {{ project.title }}
                </p>
                <p class="truncate text-base text-zinc-600 dark:text-zinc-400 sm:text-sm">
                  {{ project.tagline }}
                </p>
              </div>
              <p class="font-mono text-sm tabular-nums text-zinc-500 max-sm:hidden">{{ project.since }}</p>
              <p class="flex w-28 items-center gap-2 font-mono text-sm text-zinc-600 dark:text-zinc-400 max-md:hidden">
                <span class="size-2 shrink-0 rounded-full" :class="statusDots[project.status ?? 'active']" />
                {{ statusLabels[project.status ?? 'active'] }}
              </p>
              <ChevronRightIcon class="size-5 shrink-0 fill-zinc-400 group-hover:fill-zinc-600 dark:group-hover:fill-zinc-300" />
            </button>
          </li>
        </ul>
      </section>
    </div>

    <ProjectsProjectModal
      :project="selected"
      :position="position"
      :total="ordered.length"
      :morph="morphSlug === selected?.slug"
      @close="close"
      @prev="step(-1)"
      @next="step(1)"
      @open="show"
    />
  </Container>
</template>
