<script lang="ts" setup>
import NewsletterSignup from "~/components/home/NewsletterSignup.vue";

useHead({
  title: 'Fundamentals of Software Engineering | Dan Vega',
  meta: [
    { name: 'title', content: 'Fundamentals of Software Engineering' },
    { name: 'description', content: 'Bridge the gap between writing code and becoming a true software engineer. Your onboarding guide to the fundamentals that will set you up for a successful career.' },
    { property: 'og:title', content: 'Fundamentals of Software Engineering' },
    { property: 'og:description', content: 'Bridge the gap between writing code and becoming a true software engineer. Your onboarding guide to the fundamentals that will set you up for a successful career.' }
  ]
});
</script>

<template>
  <Container class="mt-16 sm:mt-32">
    <!-- Hero Section -->
    <header class="max-w-4xl">
      <h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
        Fundamentals of Software Engineering
      </h1>
      <p class="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
        Bridge the gap between writing code and becoming a true software engineer.
      </p>
      <p class="mt-4 text-base text-zinc-600 dark:text-zinc-400">
        Boot camps and universities teach you how to write syntactically correct programs, but being a software engineer is about far more than just coding. There's a gap between what early-career engineers are taught and what they need to know to be successful and advance in their careers.
      </p>
      <p class="mt-4 text-base text-zinc-600 dark:text-zinc-400">
        This book bridges that gap. Whether you're a newly minted practitioner from a computer science degree, an intensive boot camp, or self-taught, this is your onboarding guide to the fundamentals that will set you up for a successful career. You'll learn the skills that separate beginners from experienced engineers—from reading and writing maintainable code, to testing and architecture, to career growth and working effectively with AI tools.
      </p>
      <p class="mt-4 text-base text-zinc-600 dark:text-zinc-400">
        Unlike trendy frameworks or the language of the day, these fundamentals will last a lifetime. Even in the era of AI and agentic coding tools, you must have a solid grasp of the fundamentals to wield them properly and advance to more senior roles.
      </p>
    </header>

    <!-- Book Overview Grid -->
    <div class="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
      <!-- Book Cover -->
      <div>
        <div class="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-950/20 p-6 flex items-center justify-center">
          <NuxtImg
            src="/images/books/fose_cover.png"
            alt="Fundamentals of Software Engineering book cover"
            class="w-full max-w-md rounded-lg shadow-lg"
            loading="lazy"
          />
        </div>
      </div>

      <!-- Book Details & CTAs -->
      <div class="space-y-6">
        <!-- Status Card -->
        <div class="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-6 border border-blue-200 dark:border-blue-800">
          <p class="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
            <strong>Status:</strong> Coming Soon
          </p>
          <p class="text-sm text-blue-900 dark:text-blue-300">
            Expected publication date: 2025
          </p>
        </div>

        <!-- Book Info -->
        <div class="rounded-lg border border-zinc-200 dark:border-zinc-700 p-6 space-y-4">
          <div>
            <p class="text-sm font-semibold text-zinc-600 dark:text-zinc-400">Format</p>
            <p class="text-base text-zinc-800 dark:text-zinc-100">Digital & Print</p>
          </div>
          <div>
            <p class="text-sm font-semibold text-zinc-600 dark:text-zinc-400">Pages</p>
            <p class="text-base text-zinc-800 dark:text-zinc-100">Approximately 370 pages</p>
          </div>
          <div>
            <p class="text-sm font-semibold text-zinc-600 dark:text-zinc-400">Authors</p>
            <p class="text-base text-zinc-800 dark:text-zinc-100">Nate Schutta & Dan Vega</p>
          </div>
        </div>

        <!-- CTA Buttons -->
        <div class="flex flex-wrap gap-4">
          <a href="#newsletter" class="rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors">
            Get Updates
          </a>
          <a href="#contents" class="rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-6 py-3 text-base font-semibold text-zinc-800 dark:text-zinc-100 shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors">
            View Contents
          </a>
        </div>
      </div>
    </div>

    <!-- Target Audience Section -->
    <section class="mt-24">
      <h2 class="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
        Who Is This Book For?
      </h2>
      <div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div class="rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900 mb-4">
            <svg class="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-2">
            Aspiring Software Engineers
          </h3>
          <p class="text-base text-zinc-600 dark:text-zinc-400">
            Perfect for those starting their journey in software development who want to build a solid foundation in engineering principles and best practices.
          </p>
        </div>

        <div class="rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900 mb-4">
            <svg class="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-2">
            Experienced Developers
          </h3>
          <p class="text-base text-zinc-600 dark:text-zinc-400">
            Ideal for seasoned developers looking to formalize their knowledge, fill gaps in understanding, or refresh their understanding of core concepts.
          </p>
        </div>

        <div class="rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900 mb-4">
            <svg class="h-6 w-6 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-2">
            Students & Self-Learners
          </h3>
          <p class="text-base text-zinc-600 dark:text-zinc-400">
            Great for computer science students and self-taught programmers who want practical insights alongside theoretical knowledge.
          </p>
        </div>

        <div class="rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900 mb-4">
            <svg class="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-2">
            Team Leads & Architects
          </h3>
          <p class="text-base text-zinc-600 dark:text-zinc-400">
            Valuable for technical leads and architects who need to establish common understanding and best practices across their teams.
          </p>
        </div>
      </div>
    </section>

    <!-- What You'll Learn Section -->
    <section class="mt-24">
      <h2 class="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-4">
        What You'll Learn
      </h2>
      <p class="text-base text-zinc-600 dark:text-zinc-400 max-w-3xl mb-8">
        This book covers essential software engineering concepts with practical examples and real-world applications.
      </p>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div class="rounded-lg bg-zinc-50 dark:bg-zinc-800/50 p-6">
          <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900 mb-4">
            <svg class="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-2">
            Reading & Writing Code
          </h3>
          <p class="text-sm text-zinc-600 dark:text-zinc-400">
            Master strategies for understanding existing codebases and writing maintainable, quality code that your team will thank you for.
          </p>
        </div>

        <div class="rounded-lg bg-zinc-50 dark:bg-zinc-800/50 p-6">
          <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900 mb-4">
            <svg class="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-2">
            Modeling & Testing
          </h3>
          <p class="text-sm text-zinc-600 dark:text-zinc-400">
            Learn to use diagrams and models to design systems, and build confidence through comprehensive automated testing approaches.
          </p>
        </div>

        <div class="rounded-lg bg-zinc-50 dark:bg-zinc-800/50 p-6">
          <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900 mb-4">
            <svg class="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-2">
            UI Design & Data Management
          </h3>
          <p class="text-sm text-zinc-600 dark:text-zinc-400">
            Create usable, accessible interfaces and effectively manage data types, storage, and performance in your applications.
          </p>
        </div>

        <div class="rounded-lg bg-zinc-50 dark:bg-zinc-800/50 p-6">
          <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900 mb-4">
            <svg class="h-6 w-6 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-2">
            Architecture & Production
          </h3>
          <p class="text-sm text-zinc-600 dark:text-zinc-400">
            Understand architectural trade-offs and learn how to deploy and maintain code in real production environments.
          </p>
        </div>

        <div class="rounded-lg bg-zinc-50 dark:bg-zinc-800/50 p-6">
          <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900 mb-4">
            <svg class="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-2">
            Productivity & Learning
          </h3>
          <p class="text-sm text-zinc-600 dark:text-zinc-400">
            Optimize your development workflow and discover effective strategies for continuous skill development as an engineer.
          </p>
        </div>

        <div class="rounded-lg bg-zinc-50 dark:bg-zinc-800/50 p-6">
          <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900 mb-4">
            <svg class="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-2">
            Professional Skills & AI
          </h3>
          <p class="text-sm text-zinc-600 dark:text-zinc-400">
            Master communication, collaboration, career management, and learn how to work effectively with AI tools as a modern engineer.
          </p>
        </div>
      </div>
    </section>

    <!-- Table of Contents -->
    <section id="contents" class="mt-24">
      <h2 class="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-8">
        Table of Contents
      </h2>

      <div class="space-y-8">
        <!-- Part 1 -->
        <div class="rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          <h3 class="text-xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4">
            Part 1: Core Skills
          </h3>
          <ul class="space-y-3 text-base text-zinc-600 dark:text-zinc-400">
            <li class="flex items-start">
              <span class="font-semibold mr-2">1.</span>
              <span>Programmer to Engineer - Making the transition from coding to engineering thinking</span>
            </li>
            <li class="flex items-start">
              <span class="font-semibold mr-2">2.</span>
              <span>Reading Code - Strategies for understanding existing codebases</span>
            </li>
            <li class="flex items-start">
              <span class="font-semibold mr-2">3.</span>
              <span>Writing Code - Best practices for creating maintainable, quality code</span>
            </li>
          </ul>
        </div>

        <!-- Part 2 -->
        <div class="rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          <h3 class="text-xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4">
            Part 2: Technical Practices
          </h3>
          <ul class="space-y-3 text-base text-zinc-600 dark:text-zinc-400">
            <li class="flex items-start">
              <span class="font-semibold mr-2">4.</span>
              <span>Software Modeling - Using diagrams and models to design software systems</span>
            </li>
            <li class="flex items-start">
              <span class="font-semibold mr-2">5.</span>
              <span>Automated Testing - Building confidence through different testing approaches</span>
            </li>
            <li class="flex items-start">
              <span class="font-semibold mr-2">6.</span>
              <span>Working with Existing Code - Safely navigating and changing unknown code</span>
            </li>
          </ul>
        </div>

        <!-- Part 3 -->
        <div class="rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          <h3 class="text-xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4">
            Part 3: Application Development and Design
          </h3>
          <ul class="space-y-3 text-base text-zinc-600 dark:text-zinc-400">
            <li class="flex items-start">
              <span class="font-semibold mr-2">7.</span>
              <span>User Interface Design - Creating usable and accessible interfaces</span>
            </li>
            <li class="flex items-start">
              <span class="font-semibold mr-2">8.</span>
              <span>Working with Data - Managing data types, storage, and performance</span>
            </li>
            <li class="flex items-start">
              <span class="font-semibold mr-2">9.</span>
              <span>Software Architecture - Understanding trade-offs and architectural decisions</span>
            </li>
            <li class="flex items-start">
              <span class="font-semibold mr-2">10.</span>
              <span>To Production - Deploying and maintaining code in real environments</span>
            </li>
          </ul>
        </div>

        <!-- Part 4 -->
        <div class="rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          <h3 class="text-xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4">
            Part 4: Professional Development and Growth
          </h3>
          <ul class="space-y-3 text-base text-zinc-600 dark:text-zinc-400">
            <li class="flex items-start">
              <span class="font-semibold mr-2">11.</span>
              <span>Powering Up Your Productivity - Optimizing your development workflow</span>
            </li>
            <li class="flex items-start">
              <span class="font-semibold mr-2">12.</span>
              <span>Learning to Learn - Effective strategies for continuous skill development</span>
            </li>
            <li class="flex items-start">
              <span class="font-semibold mr-2">13.</span>
              <span>Mastering Soft Skills in the Tech World - Communication and collaboration</span>
            </li>
            <li class="flex items-start">
              <span class="font-semibold mr-2">14.</span>
              <span>Career Management - Planning and navigating your professional path</span>
            </li>
            <li class="flex items-start">
              <span class="font-semibold mr-2">15.</span>
              <span>The AI-Powered Software Engineer - Working effectively with AI tools</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Newsletter Signup -->
    <section id="newsletter" class="mt-24">
      <div class="rounded-lg bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-950/20 border border-blue-200 dark:border-blue-800 p-8">
        <h2 class="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-4">
          Stay Updated
        </h2>
        <p class="text-base text-zinc-600 dark:text-zinc-400 mb-6">
          Want to be notified when the book is released? Sign up for my newsletter to get updates on the book's progress, exclusive previews, and valuable software engineering insights delivered to your inbox.
        </p>
        <NewsletterSignup />
      </div>
    </section>

  </Container>
</template>
