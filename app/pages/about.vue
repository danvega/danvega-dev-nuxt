<script lang="ts" setup="">
useHead({
  title: 'Dan Vega - About Me',
  meta: [
    { name: 'title', content: 'Dan Vega - About Me' },
    { name: 'description', content: 'Hello 👋🏻 My Name is Dan Vega' }
  ]
});

const intro = [
  'I am a Software Engineer living just outside of one of my favorite places in the world, Cleveland, Ohio. I am a self-taught programmer who firmly believes that you can accomplish anything in this life if you put your mind to it, roll up your sleeves and are willing to put in the work.',
  'Today I am a Java Champion and a Spring Developer Advocate at Broadcom, where I get to spend my days working with Spring and the community around it. I have been writing software for 25+ years, and I still get the same kick out of solving a hard problem that I did on day one.',
  'Most of what I learn ends up here in one form or another. I write, I record videos for YouTube, I send a newsletter, and I speak at conferences and user groups whenever I get the chance. This site is where I document that journey, and my hope is that something I share here saves you an afternoon or teaches you something you can use tomorrow.'
];

const sections = [
  {
    title: 'My Journey',
    body: [
      'My journey to becoming a computer programmer did not start at a fancy university. Thanks to my mom, who made me take a typing class in high school, in which I excelled, I became interested in computers. After high school, I worked as a landscaper. One day, I decided that this was not life for me. I chose to enroll at a local college for a programming certification in Applied Computer Sciences. Once I completed this certification, I did some freelancing to hone my skills, and soon after, I landed my first job at a startup in San Francisco! It was difficult leaving my friends and family, but I was so excited about this opportunity and quickly packed my bags for the West Coast.',
      'My educational journey did not stop there. I consider myself a lifelong learner. Having a passion for learning is the secret to success in life. While I was living in California, I hired a teaching assistant from UC Berkeley to tutor me in computer programming. I spent most of my nights far from home immersing myself in Java programming books to advance my skills, which certainly paid off!',
      'After two years in San Francisco, I landed a new position back in Cleveland and jumped at the opportunity to move back home. I continued to advance to different positions and companies over the years, and here I am, 25+ years later, still loving to code every single day.'
    ]
  },
  {
    title: 'One thing that has always stuck with me',
    body: [
      'One thing that has always stuck with me over the years is how grateful I am for all of the people who taught and inspired me. This helped inspire me to share my passion for learning with others. When I discovered online teaching, I knew this was my calling to help other people make positive changes in their lives through education. As I said in the beginning, if you are willing to put in the work, you can accomplish anything in this life. If programming is what you are hoping to learn and work hard on, I am happy to show you the way!'
    ]
  },
  {
    title: 'Some other facts about me',
    body: [
      'I live just outside of Cleveland, Ohio with my wife Jen, and our 2 daughters Isabella and Juliana. When not spending time with my family, I love reading books, listening to podcasts, and watching online courses. I have a real thirst for knowledge and it consumes me every day of the week. I also love to run and lift heavy weights, which keeps me balanced throughout the week.'
    ]
  }
];
</script>

<template>
  <Container class="mt-16 sm:mt-32">
    <!-- header band -->
    <div class="grid grid-cols-1 items-center gap-10 sm:grid-cols-[14rem_1fr] sm:gap-12">
      <div class="relative w-44 sm:w-auto">
        <div class="absolute -inset-3 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-500/10 dark:to-purple-500/10"></div>
        <NuxtImg
          src="/images/dan_portrait.jpg"
          class="relative aspect-square w-full rounded-2xl object-cover shadow-lg"
          loading="lazy"
          alt="Dan Vega"/>
      </div>
      <div>
        <p class="font-mono text-sm text-green-600 dark:text-green-400">$ whoami --verbose</p>
        <h1 class="mt-4 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          Hello 👋🏻 My Name is Dan
        </h1>
        <p class="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          Java Champion, Spring Developer Advocate, author, husband and #GirlDad, based just outside Cleveland, Ohio.
        </p>
      </div>
    </div>

    <!-- story: one centered reading column -->
    <div class="mx-auto mt-16 max-w-2xl border-t border-zinc-200 pt-16 dark:border-zinc-700">
      <div class="space-y-7 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
        <p v-for="(p, i) in intro" :key="`intro-${i}`" class="first:text-xl first:text-zinc-700 dark:first:text-zinc-300">{{ p }}</p>
        <p>
          I am also an author. Nate Schutta and I wrote
          <a href="https://fundamentalsofswe.com/"
             class="font-medium text-blue-600 transition-colors hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">Fundamentals of Software Engineering</a>
          for O'Reilly, our attempt to close the gap between writing syntactically correct code and actually being a
          software engineer. It covers the things nobody hands you on day one: reading and writing maintainable code,
          testing, architecture, working alongside AI tools, and growing a career.
        </p>
        <p>
          In my personal life I am a husband to my best friend in the world and a father of two little girls. I enjoy
          reading, running and lifting weights to get me through the week.
        </p>
      </div>

      <section v-for="(section, i) in sections" :key="`section-${i}`" class="mt-14">
        <h2 class="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">{{ section.title }}</h2>
        <div class="mt-5 space-y-7 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          <p v-for="(p, j) in section.body" :key="`section-${i}-${j}`">{{ p }}</p>
        </div>
      </section>

      <!-- say hello -->
      <div class="mt-16 border-t border-zinc-200 pt-10 dark:border-zinc-700">
        <h2 class="text-xl font-semibold text-zinc-800 dark:text-zinc-100">Say hello</h2>
        <p class="mt-2 text-base text-zinc-600 dark:text-zinc-400">
          You can find me in most of the usual places below, or send me an email at
          <a href="mailto:danvega@gmail.com"
             class="font-medium text-blue-600 transition-colors hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">danvega@gmail.com</a>.
        </p>
        <SocialIcons/>
      </div>
    </div>
  </Container>
</template>
