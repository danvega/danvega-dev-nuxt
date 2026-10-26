<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/20/solid'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/vue/16/solid'
import type { Project } from '~/types/ui'
import { projects, statusLabels } from '~/data/projects'

const { project, position, total, morph = false } = defineProps<{
  project: Project | null
  position: number
  total: number
  // When true the panel and icon carry view-transition names so the clicked row morphs into them
  morph?: boolean
}>()

const emit = defineEmits<{ close: []; prev: []; next: []; open: [slug: string] }>()

const successor = computed(() => projects.find(p => p.slug === project?.successor) ?? null)

// Focus the panel itself on open so the close button doesn't start with a focus ring
const panel = ref<HTMLElement | null>(null)

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowRight') emit('next')
  if (event.key === 'ArrowLeft') emit('prev')
}

const statusDots: Record<string, string> = {
  active: 'bg-green-500',
  'in-progress': 'bg-yellow-500',
  archived: 'bg-zinc-400 dark:bg-zinc-500'
}
</script>

<template>
  <Dialog :open="!!project" class="relative z-50" :initial-focus="panel" @close="emit('close')">
    <div class="fixed inset-0 bg-zinc-950/40 backdrop-blur-sm dark:bg-zinc-950/70" aria-hidden="true" />

    <div class="fixed inset-0 overflow-y-auto overscroll-contain">
      <div class="flex min-h-full items-end justify-center sm:items-center sm:p-6">
        <DialogPanel
          v-if="project"
          ref="panel"
          tabindex="-1"
          class="project-modal relative outline-none w-full max-w-3xl rounded-t-3xl bg-white p-3 shadow-2xl ring-1 ring-zinc-900/10 dark:bg-zinc-900 dark:shadow-none dark:ring-white/10 sm:rounded-3xl"
          :style="morph ? { viewTransitionName: 'project-card' } : undefined"
          @keydown="onKeydown"
        >
          <ProjectsProjectFrame :project="project" eager />

          <div class="p-3 pt-6 sm:p-5 sm:pt-8">
            <div class="flex items-start gap-4">
              <ProjectsProjectIcon
                :project="project"
                size="lg"
                :style="morph ? { viewTransitionName: 'project-icon' } : undefined"
              />
              <div class="min-w-0 flex-1">
                <DialogTitle as="h2" class="text-2xl font-bold tracking-tight text-balance text-zinc-800 dark:text-zinc-100 sm:text-3xl">
                  {{ project.title }}
                </DialogTitle>
                <p class="mt-1 text-lg text-pretty text-zinc-600 dark:text-zinc-400 sm:text-base">
                  {{ project.tagline }}
                </p>
              </div>
              <button
                type="button"
                class="relative -m-1 shrink-0 rounded-full p-1 hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:hover:bg-zinc-800"
                @click="emit('close')"
              >
                <span class="absolute left-1/2 top-1/2 size-12 -translate-x-1/2 -translate-y-1/2 [@media(pointer:fine)]:hidden" aria-hidden="true" />
                <span class="sr-only">Close</span>
                <XMarkIcon class="size-5 fill-zinc-500 dark:fill-zinc-400" />
              </button>
            </div>

            <!-- Replaced by another project -->
            <div
              v-if="successor"
              class="mt-6 flex items-center gap-4 rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-800/50"
            >
              <ProjectsProjectIcon :project="successor" />
              <p class="min-w-0 flex-1 text-base text-pretty text-zinc-600 dark:text-zinc-400 sm:text-sm">
                {{ project.title }} is shut down. It lives on in <strong class="font-semibold text-zinc-800 dark:text-zinc-100">{{ successor.title }}</strong>.
              </p>
              <button
                type="button"
                class="shrink-0 font-mono text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                @click="emit('open', successor.slug)"
              >
                ./open <span aria-hidden="true">&rarr;</span>
              </button>
            </div>

            <!-- Facts -->
            <dl class="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-y border-zinc-900/10 py-4 font-mono text-sm dark:border-white/10">
              <div>
                <dt class="text-zinc-500">status</dt>
                <dd class="mt-1 flex items-center gap-2 text-zinc-800 dark:text-zinc-100">
                  <span class="size-2 shrink-0 rounded-full" :class="statusDots[project.status ?? 'active']" />
                  {{ statusLabels[project.status ?? 'active'] }}
                </dd>
              </div>
              <div>
                <dt class="text-zinc-500">since</dt>
                <dd class="mt-1 tabular-nums text-zinc-800 dark:text-zinc-100">{{ project.since }}</dd>
              </div>
              <div v-for="stat in project.stats" :key="stat.label">
                <dt class="text-zinc-500">{{ stat.label.toLowerCase() }}</dt>
                <dd class="mt-1 tabular-nums text-zinc-800 dark:text-zinc-100">{{ stat.value }}</dd>
              </div>
            </dl>

            <!-- Story -->
            <dl class="mt-8 space-y-6">
              <div>
                <dt class="text-base font-semibold text-zinc-800 dark:text-zinc-100">Why I built it</dt>
                <dd class="mt-2 text-base text-pretty text-zinc-600 dark:text-zinc-400">{{ project.story.why }}</dd>
              </div>
              <div>
                <dt class="text-base font-semibold text-zinc-800 dark:text-zinc-100">What I built</dt>
                <dd class="mt-2 text-base text-pretty text-zinc-600 dark:text-zinc-400">{{ project.story.built }}</dd>
              </div>
              <div v-if="project.story.learned">
                <dt class="text-base font-semibold text-zinc-800 dark:text-zinc-100">What I learned</dt>
                <dd class="mt-2 text-base text-pretty text-zinc-600 dark:text-zinc-400">{{ project.story.learned }}</dd>
              </div>
            </dl>

            <p v-if="project.techStack.length" class="mt-8 font-mono text-sm text-blue-600 dark:text-blue-400">
              {{ project.techStack.join(' · ') }}
            </p>
            <ProjectsProjectLinks :project="project" class="mt-4" />

            <!-- Browse -->
            <div class="mt-10 flex items-center justify-between gap-4 border-t border-zinc-900/10 pt-5 dark:border-white/10">
              <button
                type="button"
                class="flex items-center gap-1.5 rounded-md py-2 pl-2 pr-3 font-mono text-sm text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 sm:py-1.5"
                @click="emit('prev')"
              >
                <ArrowLeftIcon class="size-4 shrink-0 fill-current" />
                prev
              </button>
              <p class="font-mono text-sm tabular-nums text-zinc-500">
                {{ position }} / {{ total }}
                <span class="max-sm:hidden"> · ← → to browse, esc to close</span>
              </p>
              <button
                type="button"
                class="flex items-center gap-1.5 rounded-md py-2 pl-3 pr-2 font-mono text-sm text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 sm:py-1.5"
                @click="emit('next')"
              >
                next
                <ArrowRightIcon class="size-4 shrink-0 fill-current" />
              </button>
            </div>
          </div>
        </DialogPanel>
      </div>
    </div>
  </Dialog>
</template>

<style>
/* Fallback entrance when the browser has no View Transitions */
@supports not (view-transition-name: none) {
  .project-modal {
    animation: project-modal-in 200ms ease-out;
  }
}

@keyframes project-modal-in {
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.98);
  }
}

::view-transition-group(project-card),
::view-transition-group(project-icon) {
  animation-duration: 320ms;
  animation-timing-function: cubic-bezier(0.2, 0, 0, 1);
}
</style>
