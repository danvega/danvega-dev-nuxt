<script lang="ts" setup>
import type { Project } from '~/types/ui'

useHead({
  title: 'Dan Vega - Projects',
  meta: [
    { name: 'title', content: 'Dan Vega - Projects' },
    { name: 'description', content: 'A collection of projects I\'ve built and am currently working on.' },
    { property: 'og:title', content: 'Dan Vega - Projects' },
    { property: 'og:description', content: 'A collection of projects I\'ve built and am currently working on.' }
  ]
});

const projects: Project[] = [
  {
    slug: 'danvega-dev',
    title: 'danvega.dev',
    description: 'My personal website and blog built with Nuxt 3. Features blog posts, newsletter archives, speaking events, and courses — all powered by Nuxt Content with markdown.',
    image: 'danvega-dev.png',
    techStack: ['Nuxt 3', 'Vue 3', 'Tailwind CSS', 'TypeScript'],
    github: 'https://github.com/danvega/danvega-dev-nuxt',
    url: 'https://www.danvega.dev',
    status: 'active'
  },
  {
    slug: 'spring-office-hours',
    title: 'Spring Office Hours',
    description: 'The companion website for the Spring Office Hours podcast — a weekly show covering everything Spring and Java in the developer ecosystem.',
    image: 'spring-office-hours.png',
    techStack: [],
    url: 'https://www.springofficehours.io',
    status: 'active'
  },
  {
    slug: 'fundamentals-of-swe',
    title: 'Fundamentals of Software Engineering',
    description: 'Companion site for the Fundamentals of Software Engineering book, providing resources and supplemental content for readers.',
    image: 'fundamentals-of-swe.png',
    techStack: [],
    url: 'https://www.fundamentalsofswe.com',
    status: 'active'
  },
  {
    slug: 'spring-initializr-tui',
    title: 'Spring Initializr TUI',
    description: 'A terminal user interface for scaffolding Spring Boot projects. Browse dependencies, configure your project, and generate a ready-to-go Spring Boot app — all from the terminal.',
    image: 'spring-initializr-tui.png',
    techStack: ['Java', 'TamboUI', 'GraalVM'],
    github: 'https://github.com/danvega/spring-initializr-tui',
    status: 'active'
  },
  {
    slug: 'bytesized-ai',
    title: 'ByteSized AI',
    description: 'An AI-focused newsletter delivering bite-sized insights on artificial intelligence, machine learning, and how developers can leverage AI in their workflows.',
    image: 'bytesized-ai.png',
    techStack: [],
    url: 'https://bytesizedai.dev',
    status: 'active'
  },
  {
    slug: 'dvaas',
    title: 'DVaaS (Dan Vega as a Service)',
    description: 'An MCP server that exposes my entire content ecosystem — blog, YouTube, podcasts, newsletter, and speaking events — to AI assistants and tools.',
    image: 'dvaas.png',
    techStack: ['Spring Boot', 'Spring AI', 'Java'],
    github: 'https://github.com/danvega/dvaas',
    url: 'https://www.danvega.dev/mcp',
    status: 'active'
  },
  {
    slug: 'content-os',
    title: 'Content OS',
    description: 'A content creation lifecycle management application for planning, tracking, and publishing content across multiple platforms.',
    image: 'content-os.png',
    techStack: ['Spring Boot 4', 'Java 25', 'JTE', 'PostgreSQL'],
    status: 'in-progress'
  }
]
</script>

<template>
  <Container class="mt-16 sm:mt-32">
    <header class="max-w-4xl">
      <h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
        Projects I've built and things I'm working on.
      </h1>
      <p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
        A collection of projects that I've created, contribute to, or am actively developing. From open-source tools to content platforms, these are the things I spend my time building.
      </p>
    </header>

    <div class="mt-12">
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <ProjectsProjectCard v-for="project in projects" :key="project.slug" :project="project" />
      </div>
    </div>
  </Container>
</template>
