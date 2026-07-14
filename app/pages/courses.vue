<script lang="ts" setup>
import type { Course } from '~/types/ui'

useHead({
  title: 'Dan Vega - Courses',
  meta: [
    { name: 'title', content: 'Dan Vega - Courses' },
    { name: 'description', content: 'If you want to learn something new check out one of my courses.' }
  ]
});

const courses : Course[] = [
  {
    slug: 'ai-for-java-developers',
    title: 'AI for Java Developers: Full Course / Workshop on Getting Started with Spring AI',
    shortTitle: 'AI for Java Developers',
    description: 'Every Java Developer is now an AI Developer. Transform your Java skills for the AI era with this comprehensive 5.5-hour Spring AI masterclass!',
    link: 'https://www.youtube.com/watch?v=FzLABAppJfM',
    cover: 'ai_for_java_developers.png',
    topic: 'Spring AI',
    platform: 'YouTube',
    featured: true
  },
  {
    slug: 'graphql-for-java-developers',
    title: 'GraphQL for Java Developers',
    description: 'Learn how to build scalable GraphQL APIs with Java 26 and Spring Boot 4. This course walks you through schema-first development, batch loading, unions, Query by Example, AOT repositories, and more.',
    link: 'https://www.youtube.com/playlist?list=PLZV0a2jwt22u5DEFwYSzOM7mg6AjL90hw',
    cover: 'graphql-java-developers.jpg',
    topic: 'GraphQL',
    platform: 'YouTube'
  },
  {
    slug: 'spring-boot-3-tutorial',
    title: 'Spring Boot Tutorial for Beginners - 2023 Crash Course using Spring Boot 3',
    description: 'Welcome to this Spring Boot Crash Course! In this video, you\'ll gain the foundational knowledge of Spring Boot and how to hit the ground running with the Spring Framework. We\'ll discuss key concepts of the Spring Framework such as Beans, Application Context, Inversion of Control, Dependency Injection, and more.',
    link: 'https://youtu.be/UgX5lgv4uVM',
    cover: 'spring_boot_3.jpeg',
    topic: 'Spring Boot',
    platform: 'YouTube'
  },
  {
    slug: 'free-code-camp-spring-boot',
    title: 'Building Web Applications with Spring Boot (FreeCodeCamp)',
    description: 'The course is designed to guide beginners through the nuances of web application development using Spring Boot 3, the cornerstone framework for Java applications. It\'s a blend of theory and practical application, where you start from the grassroots and ascend to creating sophisticated web applications.',
    link: 'https://youtu.be/31KTdfRH6nY',
    cover: 'fcc_javaspringboot.png',
    topic: 'Spring Boot',
    platform: 'FreeCodeCamp'
  },
  {
    slug: 'java-getting-started',
    title: 'Getting Started with Java',
    description: 'Everything you need to know about setting up your local development environment.',
    link: 'https://www.youtube.com/playlist?list=PLZV0a2jwt22sSlfykcq8PDK0K5o-ZIpit',
    cover: 'java-free-udemy.jpg',
    topic: 'Java',
    platform: 'YouTube'
  },
  {
    slug: 'apache-groovy',
    title: 'The Complete Apache Groovy Course',
    description: 'Everything you need to know to get started with the Groovy Programming Language',
    link: 'https://www.udemy.com/course/apache-groovy/?referralCode=7FB8CB67D3D3D17CF1EA',
    cover: 'apache-groovy.jpg',
    topic: 'Groovy',
    platform: 'Udemy'
  },
  {
    slug: 'spring-boot-2',
    title: 'Getting Started with Spring Boot 2',
    description: 'Learn how to build a real application using Spring Framework 5 & Spring Boot 2',
    link: 'https://www.udemy.com/course/spring-boot-2/?referralCode=ECB6B9F8EF104672AF4A',
    cover: 'spring-boot-2-udemy.jpg',
    topic: 'Spring Boot',
    platform: 'Udemy'
  },
  {
    slug: 'spring-boot',
    title: 'Learn Spring Boot',
    description: 'Spring Boot gives you all the power of the Spring Framework without all of the complexity.',
    link: 'https://www.udemy.com/course/spring-boot-intro/?referralCode=2B0F1F9DE0DC40C97DC5',
    cover: 'spring-boot-udemy.jpg',
    topic: 'Spring Boot',
    platform: 'Udemy'
  },
  {
    slug: 'angular-4-java-developers',
    title: 'Angular 4 Java Developers',
    description: 'Learn how to build Spring Boot & Angular apps by building a real world application with JHipster.',
    link: 'https://www.udemy.com/course/angular-4-java-developers/?referralCode=A41B357F43F549BB7722',
    cover: 'angular-4-java-developers.jpg',
    topic: 'Angular',
    platform: 'Udemy'
  },
  {
    slug: 'vue-for-beginners',
    title: 'Vue for Beginners: Up and running with Vue',
    description: 'A beginner\'s guide to learn the basics of the JavaScript Framework Vue.js.',
    link: 'https://www.udemy.com/course/vue-intro/?referralCode=E9DECFF78CA706D7A68A',
    cover: 'vue_udemy_cover.png',
    topic: 'Vue',
    platform: 'Udemy'
  },
];

const featuredCourse = courses.find(course => course.featured);
const remainingCourses = courses.filter(course => !course.featured);
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

    <div class="mt-16 sm:mt-20">
      <CoursesFeatured v-if="featuredCourse" :course="featuredCourse" />

      <div class="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <CoursesCard
          v-for="(course, index) in remainingCourses"
          :key="course.slug"
          :course="course"
          :eager="index < 3"
        />
      </div>
    </div>

  </Container>
</template>