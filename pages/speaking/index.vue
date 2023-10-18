<script setup lang="ts">
useHead({
  title: 'Dan Vega - Speaking',
  meta: [
    { name: 'title', content: 'Dan Vega - Speaking' },
    { name: 'description', content: 'I’ve spoken at events around the world and been interviewed for podcasts and live streams.' }
  ]
});
</script>

<template>
  <Container class="mt-16 sm:mt-32">
    <header class="max-w-4xl">
      <h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
        I’ve spoken at events around the world and been interviewed for podcasts and live streams.
      </h1>
      <p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
        One of my favorite ways to share my ideas is live on stage, where there’s so much more communication bandwidth than there is in writing, and I love
        podcast interviews because they give me the opportunity to answer questions instead of just present my opinions.

        You can view some of my <a href="https://github.com/danvega/abstracts" class="text-blue-500 hover:text-blue-400">abstracts</a> here or my <a href="http://www.youtube.com/danvega" class="text-blue-500 hover:text-blue-400">YouTube channel</a>
        if you want to get an idea of my speaking style. For a full list of past events please check out the <NuxtLink to="/speaking/archives" class="text-blue-500 hover:text-blue-400">archives</NuxtLink>.
        If you would like me to speak at your event please feel free to <NuxtLink to="/about" class="text-blue-500 hover:text-blue-400">contact me</NuxtLink>.
      </p>
    </header>

    <!-- turn into components later on -->
    <div class="mt-16 sm:mt-20">
      <div class="space-y-20">

        <section aria-labelledby=":S1:" class="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div class="grid max-w-3xl grid-cols-1 items-baseline gap-y-8 md:grid-cols-4">
            <h2 class="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Upcoming Talks</h2>
            <div class="md:col-span-3">
              <div class="space-y-16">

                <article class="group relative flex flex-col items-start">
                  <h3 class="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                    <div class="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"></div>
                    <a href="https://springonetour.io/sessions/does-your-api-need-a-rest-check-out-graphql">
                      <span class="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
                      <span class="relative z-10">Does Your API Need a REST? Check Out GraphQL</span>
                    </a>
                  </h3>
                  <p class="relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5">
                    <span class="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
                      <span class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
                    </span>SpringOne Tour, October 17, 2023 - Virtual
                  </p>
                  <p class="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">In this talk, I will cover the basics of GraphQL and how it differs from traditional RESTful API architectures.
                    By the end of this talk, you will have everything you need to build your first GraphQL API in Spring.</p>
                  <div aria-hidden="true" class="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500">
                    Learn More
                    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="ml-1 h-4 w-4 stroke-current">
                      <path d="M6.75 5.75 9.25 8l-2.5 2.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                  </div>
                </article>

                <article class="group relative flex flex-col items-start">
                  <h3 class="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                    <div class="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"></div>
                    <a href="https://learning.oreilly.com/live-events/spring-recipes/0636920095810/">
                      <span class="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
                      <span class="relative z-10">Spring Recipes</span>
                    </a>
                  </h3>
                  <p class="relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5">
                    <span class="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
                      <span class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
                    </span>O'Reilly Learning Platform, October 23, 2023 - Virtual
                  </p>
                  <p class="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">Join Spring experts Nathaniel Schutta and Dan Vega to find concrete solutions for common problems encountered in modern software development, from building APIs to cloud native applications. Spring is constantly evolving and growing, so if you’re unsure about all its resources, you’ll discover them during this plunge into the Spring ecosystem.</p>
                  <div aria-hidden="true" class="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500">
                    Learn More
                    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="ml-1 h-4 w-4 stroke-current">
                      <path d="M6.75 5.75 9.25 8l-2.5 2.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                  </div>
                </article>


                <article class="group relative flex flex-col items-start">
                  <h3 class="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                    <div class="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"></div>
                    <a href="https://2023.connect.tech/session/504968">
                      <span class="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
                      <span class="relative z-10">Building Nuxt 3 Applications powered by Notion</span>
                    </a>
                  </h3>
                  <p class="relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5">
                    <span class="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
                      <span class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
                    </span>ConnectTech, October 24, 2023 - Atlanta, GA
                  </p>
                  <p class="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">In this session, I'll show you what I learned while building and deploying a content site powered by the Notion API. By the end of this session, you will have the knowledge required to start building your own solutions with Nuxt and Notion.</p>
                  <div aria-hidden="true" class="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500">
                    Learn More
                    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="ml-1 h-4 w-4 stroke-current">
                      <path d="M6.75 5.75 9.25 8l-2.5 2.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                  </div>
                </article>

                <article class="group relative flex flex-col items-start">
                  <h3 class="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                    <div class="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"></div>
                    <a href="https://www.vmware.com/explore/eu.html">
                      <span class="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
                      <span class="relative z-10">Accelerating Innovation with Spring</span>
                    </a>
                  </h3>
                  <p class="relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5">
                    <span class="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
                      <span class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
                    </span>VMware Barcelona, November 6-9, 2023 - Barcelona Spain
                  </p>
                  <p class="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">Get ready for an exhilarating celebration of 20 years of Spring. As developers, we all crave speed and agility, and Spring has been our trusted companion on this journey. From its humble beginnings to its second act with Spring Boot, we will look back at how Spring has revolutionized the way we develop software.</p>
                  <div aria-hidden="true" class="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500">
                    Learn More
                    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="ml-1 h-4 w-4 stroke-current">
                      <path d="M6.75 5.75 9.25 8l-2.5 2.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                  </div>
                </article>

                <article class="group relative flex flex-col items-start">
                  <h3 class="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                    <div class="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"></div>
                    <a href="https://codemash.org/">
                      <span class="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
                      <span class="relative z-10">Does Your API Need a REST? Check Out GraphQL</span>
                    </a>
                  </h3>
                  <p class="relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5">
                    <span class="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
                      <span class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
                    </span>CodeMash, January 9-12, 2024 - Sandusky, OH
                  </p>
                  <p class="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">In this talk, I will cover the basics of GraphQL and how it differs from traditional RESTful API architectures.
                    By the end of this talk, you will have everything you need to build your first GraphQL API in Spring.</p>
                  <div aria-hidden="true" class="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500">
                    Learn More
                    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="ml-1 h-4 w-4 stroke-current">
                      <path d="M6.75 5.75 9.25 8l-2.5 2.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                  </div>
                </article>

                <article class="group relative flex flex-col items-start">
                  <h3 class="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                    <div class="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"></div>
                    <a href="https://codemash.org/">
                      <span class="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
                      <span class="relative z-10">The Developer Relations Playbook: How to build bridges by putting people first</span>
                    </a>
                  </h3>
                  <p class="relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5">
                    <span class="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
                      <span class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
                    </span>CodeMash, January 9-12, 2024 - Sandusky, OH
                  </p>
                  <p class="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">Don't miss this opportunity to discover how you can contribute to the tech world in a unique and impactful way. Join us and take the first step towards a rewarding career in Developer Relations!</p>
                  <div aria-hidden="true" class="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500">
                    Learn More
                    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="ml-1 h-4 w-4 stroke-current">
                      <path d="M6.75 5.75 9.25 8l-2.5 2.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                  </div>
                </article>


              </div>
            </div>
          </div>
        </section>

<!--        <section aria-labelledby=":S2:"-->
<!--                 class="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">-->
<!--          <div class="grid max-w-3xl grid-cols-1 items-baseline gap-y-8 md:grid-cols-4"><h2 id=":S2:"-->
<!--                                                                                            class="text-sm font-semibold text-zinc-800 dark:text-zinc-100">-->
<!--            Podcasts</h2>-->
<!--            <div class="md:col-span-3">-->
<!--              <div class="space-y-16">-->
<!--                <article class="group relative flex flex-col items-start">-->
<!--                  <h3 class="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">-->
<!--                    <div-->
<!--                        class="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"></div>-->
<!--                    <a href="#"><span-->
<!--                        class="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl"></span><span-->
<!--                        class="relative z-10">Using design as a competitive advantage</span></a></h3>-->
<!--                  <p class="relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5">-->
<!--                    <span class="absolute inset-y-0 left-0 flex items-center" aria-hidden="true"><span-->
<!--                        class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span></span>Encoding-->
<!--                    Design, July 2022</p>-->
<!--                  <p class="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">How we used world-class-->
<!--                    visual design to attract a great team, win over customers, and get more press for-->
<!--                    Planetaria.</p>-->
<!--                  <div aria-hidden="true"-->
<!--                       class="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500">Listen to-->
<!--                    podcast-->
<!--                    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="ml-1 h-4 w-4 stroke-current">-->
<!--                      <path d="M6.75 5.75 9.25 8l-2.5 2.25" stroke-width="1.5" stroke-linecap="round"-->
<!--                            stroke-linejoin="round"></path>-->
<!--                    </svg>-->
<!--                  </div>-->
<!--                </article>-->
<!--                <article class="group relative flex flex-col items-start">-->
<!--                  <h3 class="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">-->
<!--                    <div-->
<!--                        class="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"></div>-->
<!--                    <a href="#"><span-->
<!--                        class="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl"></span><span-->
<!--                        class="relative z-10">Bootstrapping an aerospace company to $17M ARR</span></a></h3>-->
<!--                  <p class="relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5">-->
<!--                    <span class="absolute inset-y-0 left-0 flex items-center" aria-hidden="true"><span-->
<!--                        class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span></span>The Escape-->
<!--                    Velocity Show, March 2022</p>-->
<!--                  <p class="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">The story of how we-->
<!--                    built one of the most promising space startups in the world without taking any capital from-->
<!--                    investors.</p>-->
<!--                  <div aria-hidden="true"-->
<!--                       class="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500">Listen to-->
<!--                    podcast-->
<!--                    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="ml-1 h-4 w-4 stroke-current">-->
<!--                      <path d="M6.75 5.75 9.25 8l-2.5 2.25" stroke-width="1.5" stroke-linecap="round"-->
<!--                            stroke-linejoin="round"></path>-->
<!--                    </svg>-->
<!--                  </div>-->
<!--                </article>-->
<!--                <article class="group relative flex flex-col items-start">-->
<!--                  <h3 class="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">-->
<!--                    <div-->
<!--                        class="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"></div>-->
<!--                    <a href="#"><span-->
<!--                        class="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl"></span><span-->
<!--                        class="relative z-10">Programming your company operating system</span></a></h3>-->
<!--                  <p class="relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5">-->
<!--                    <span class="absolute inset-y-0 left-0 flex items-center" aria-hidden="true"><span-->
<!--                        class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span></span>How They Work-->
<!--                    Radio, September 2021</p>-->
<!--                  <p class="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">On the importance of-->
<!--                    creating systems and processes for running your business so that everyone on the team knows-->
<!--                    how to make the right decision no matter the situation.</p>-->
<!--                  <div aria-hidden="true"-->
<!--                       class="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500">Listen to-->
<!--                    podcast-->
<!--                    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="ml-1 h-4 w-4 stroke-current">-->
<!--                      <path d="M6.75 5.75 9.25 8l-2.5 2.25" stroke-width="1.5" stroke-linecap="round"-->
<!--                            stroke-linejoin="round"></path>-->
<!--                    </svg>-->
<!--                  </div>-->
<!--                </article>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </section>-->


      </div>
    </div>

  </Container>
</template>