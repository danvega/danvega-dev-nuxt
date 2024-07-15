<script lang="ts" setup>

useHead({
  title: 'Dan Vega - Courses',
  meta: [
    { name: 'title', content: 'Dan Vega - Courses' },
    { name: 'description', content: 'If you want to learn something new check out one of my courses.' }
  ]
});

const courses : Course[] = [
  {
    slug: 'free-code-camp-spring-boot',
    title: 'Building Web Applications with Spring Boot (FreeCodeCamp)',
    description: 'The course is designed to guide beginners through the nuances of web application development using Spring Boot 3, the cornerstone framework for Java applications. It\'s a blend of theory and practical application, where you start from the grassroots and ascend to creating sophisticated web applications.',
    link: 'https://youtu.be/31KTdfRH6nY',
    cover: 'fcc_javaspringboot.png'
  },
  {
    slug: 'spring-boot-3-tutorial',
    title: 'Spring Boot Tutorial for Beginners - 2023 Crash Course using Spring Boot 3',
    description: 'Welcome to this Spring Boot Crash Course! In this video, you\'ll gain the foundational knowledge of Spring Boot and how to hit the ground running with the Spring Framework. We\'ll discuss key concepts of the Spring Framework such as Beans, Application Context, Inversion of Control, Dependency Injection, and more.',
    link: 'https://youtu.be/UgX5lgv4uVM',
    cover: 'spring_boot_3.jpeg'
  },
  {
    slug: 'vue-for-beginners',
    title: 'Vue for Beginners: Up and running with Vue',
    description: 'A beginner\'s guide to learn the basics of the JavaScript Framework Vue.js.',
    link: 'https://www.udemy.com/course/vue-intro/?referralCode=E9DECFF78CA706D7A68A',
    cover: 'vue_udemy_cover.png'
  },
  {
    slug: 'apache-groovy',
    title: 'The Complete Apache Groovy Course',
    description: 'Everything you need to know to get started with the Groovy Programming Language',
    link: 'https://www.udemy.com/course/apache-groovy/?referralCode=7FB8CB67D3D3D17CF1EA',
    cover: 'apache-groovy.jpg'
  },
  {
    slug: 'spring-boot-2',
    title: 'Getting Started with Spring Boot 2',
    description: 'Learn how to build a real application using Spring Framework 5 & Spring Boot 2',
    link: 'https://www.udemy.com/course/spring-boot-2/?referralCode=ECB6B9F8EF104672AF4A',
    cover: 'spring-boot-2-udemy.jpg'
  },
  {
    slug: 'spring-boot',
    title: 'Learn Spring Boot',
    description: 'Spring Boot gives you all the power of the Spring Framework without all of the complexity.',
    link: 'https://www.udemy.com/course/spring-boot-intro/?referralCode=2B0F1F9DE0DC40C97DC5',
    cover: 'spring-boot-udemy.jpg'
  },
  {
    slug: 'angular-4-java-developers',
    title: 'Angular 4 Java Developers',
    description: 'Learn how to build Spring Boot & Angular apps by building a real world application with JHipster.',
    link: 'https://www.udemy.com/course/angular-4-java-developers/?referralCode=A41B357F43F549BB7722',
    cover: 'angular-4-java-developers.jpg'
  },
  {
    slug: 'java-getting-started',
    title: 'Getting Started with Java',
    description: 'Everything you need to know about setting up your local development environment.',
    link: 'https://www.udemy.com/course/angular-4-java-developers/?referralCode=A41B357F43F549BB7722',
    cover: 'java-free-udemy.jpg'
  },
];
</script>

<template>
  <Container class="mt-16 sm:mt-32">
    <header class="max-w-4xl">
      <h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
       If you want to learn something new check out one of my courses.
      </h1>
      <p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
        Below you will find a list of courses that I currently have available. I put a lot of effort and passion into each one of my courses and I hope that shows. If you're interested in a topic that I don't have listed here please contact me.</p>
    </header>

    <div class="mt-4 sm:mt-6">
      <div class="md:pl-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="mt-4 space-y-7 text-base text-zinc-600 dark:text-zinc-400" v-for="course in courses" :key="course.slug">
            <a :href="course.link">
            <NuxtImg
                :src="`/images/courses/${course.cover}`"
                :alt="course.title"
                class="w-full rounded-2xl transition-transform duration-300 ease-in-out hover:scale-110"/>
            </a>
            <h2 class="font-semibold text-zinc-800 dark:text-zinc-100">{{ course.title }}</h2>
            <p>{{ course.description }}</p>
            <a :href="course.link">
              <div aria-hidden="true" class="relative z-10 mt-4 flex items-center text-sm font-medium text-blue-500">
                Learn More
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="ml-1 h-4 w-4 stroke-current">
                  <path d="M6.75 5.75 9.25 8l-2.5 2.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>

  </Container>
</template>