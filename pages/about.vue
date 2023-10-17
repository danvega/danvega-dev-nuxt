<script lang="ts" setup="">
useHead({
  title: 'Dan Vega - About Me',
  meta: [
    { name: 'title', content: 'Dan Vega - About Me' },
    { name: 'description', content: 'Hello 👋🏻 My Name is Dan Vega' }
  ]
});
</script>

<template>
  <Container class="mt-16 sm:mt-32">
    <!-- about page div -->
    <div class="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
      <!-- portrait -->
      <div class="lg:pl-20">
        <div class="max-w-xs px-2.5 lg:max-w-none">
          <img alt="" loading="lazy" width="800" height="800" decoding="async" data-nimg="1"
               class="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800" src="/images/dan_portrait.jpg" style="color: transparent;">
        </div>
      </div>
      <!-- about -->
      <div class="lg:order-first lg:row-span-2">
        <h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          Hello 👋🏻 My Name is Dan
        </h1>
        <div class="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
          <p>
            I am a Software Engineer living just outside of one of my favorite
            places in the world, Cleveland, Ohio. I am a self-taught programmer who
            firmly believes that you can accomplish anything in this life if you put
            your mind to it, roll up your sleeves and are willing to put in the
            work.
          </p>
          <p>
            I have been writing software for over 20+ years now and I use my
            knowledge, passion, and influence to help other developers achieve their
            goals. I teach online and currently, have over 160,000 students.
          </p>
          <p>
            In my personal life I am a husband to my best friend in the world and a
            father of two little girls. I enjoy reading, running and lifting weights
            to get me through the week.
          </p>
          <h2 class="font-semibold text-zinc-800 dark:text-zinc-100">My Journey</h2>
          <p>
            My journey to becoming a computer programmer did not start at a fancy university. Thanks to my mom, who made me
            take a typing class in high school, in which I excelled, I became interested in computers. After high school, I
            worked as a landscaper. One day, I decided that this was not life for me. I chose to enroll at a local college for
            a programming certification in Applied Computer Sciences. Once I completed this certification, I did some
            freelancing to hone my skills, and soon after, I landed my first job at a startup in San Francisco! It was
            difficult leaving my friends and family, but I was so excited about this opportunity and quickly packed my bags
            for the West Coast.
          </p>
          <p>
            My educational journey did not stop there. I consider myself a lifelong learner. Having a passion for learning is
            the secret to success in life. While I was living in California, I hired a teaching assistant from UC Berkeley to
            tutor me in computer programming. I spent most of my nights far from home immersing myself in Java programming
            books to advance my skills, which certainly paid off!
          </p>
          <p>
            After two years in San Francisco, I landed a new position back in Cleveland and jumped at the opportunity to move
            back home. I continued to advance to different positions and companies over the years, and here I am, 20+ years
            later, still loving to code every single day.
          </p>

          <h2 class="font-semibold text-zinc-800 dark:text-zinc-100">One thing that has always stuck with me</h2>
          <p>
            One thing that has always stuck with me over the years is how grateful I am for all of the people who taught and
            inspired me. This helped inspire me to share my passion for learning with others. When I discovered online
            teaching, I knew this was my calling to help other people make positive changes in their lives through education.
            As I said in the beginning, if you are willing to put in the work, you can accomplish anything in this life. If
            programming is what you are hoping to learn and work hard on, I am happy to show you the way!
          </p>

          <h2></h2>
          <h2 class="font-semibold text-zinc-800 dark:text-zinc-100">Some other facts about me</h2>
          <p>
            I live just outside of Cleveland, Ohio with my wife Jen, and our 2 daughters Isabella and Juliana. When not
            spending time with my family, I love reading books, listening to podcasts, and watching online courses. I have a
            real thirst for knowledge and it consumes me every day of the week. I also love to run and lift heavy weights,
            which keeps me balanced throughout the week.
          </p>

        </div>
      </div>
      <!-- social icons -->
      <div class="lg:pl-20">
        <ul role="list">
          <li class="flex">
            <a class="group flex text-sm font-medium text-zinc-800 transition hover:text-blue-500 dark:text-zinc-200 dark:hover:text-blue-500" href="https://twitter.com/therealdanvega">
              <svg viewBox="0 0 24 24" aria-hidden="true" class="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-blue-500">
                <path d="M20.055 7.983c.011.174.011.347.011.523 0 5.338-3.92 11.494-11.09 11.494v-.003A10.755 10.755 0 0 1 3 18.186c.308.038.618.057.928.058a7.655 7.655 0 0 0 4.841-1.733c-1.668-.032-3.13-1.16-3.642-2.805a3.753 3.753 0 0 0 1.76-.07C5.07 13.256 3.76 11.6 3.76 9.676v-.05a3.77 3.77 0 0 0 1.77.505C3.816 8.945 3.288 6.583 4.322 4.737c1.98 2.524 4.9 4.058 8.034 4.22a4.137 4.137 0 0 1 1.128-3.86A3.807 3.807 0 0 1 19 5.274a7.657 7.657 0 0 0 2.475-.98c-.29.934-.9 1.729-1.713 2.233A7.54 7.54 0 0 0 22 5.89a8.084 8.084 0 0 1-1.945 2.093Z"></path>
              </svg>
              <span class="ml-4">Follow on Twitter</span>
            </a>
          </li>
          <li class="mt-4 flex">
            <a class="group flex text-sm font-medium text-zinc-800 transition hover:text-blue-500 dark:text-zinc-200 dark:hover:text-blue-500" href="https://www.youtube.com/@danvega">
              <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 fill-zinc-500 transition group-hover:fill-blue-600 dark:fill-zinc-400 dark:group-hover:fill-blue-300">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span class="ml-4">Follow on YouTube</span>
            </a>
          </li>
          <li class="mt-4 flex">
            <a class="group flex text-sm font-medium text-zinc-800 transition hover:text-blue-500 dark:text-zinc-200 dark:hover:text-blue-500" href="https://www.linkedin.com/in/danvega/">
              <svg viewBox="0 0 24 24" aria-hidden="true" class="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-blue-500">
                <path d="M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715zM7.003 8.575a1.546 1.546 0 01-1.548-1.549 1.548 1.548 0 111.547 1.549zm1.336 9.764H5.666V9.75H8.34v8.589zM19.67 3H4.329C3.593 3 3 3.58 3 4.297v15.406C3 20.42 3.594 21 4.328 21h15.338C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3h.003z"></path>
              </svg>
              <span class="ml-4">Follow on LinkedIn</span>
            </a>
          </li>
          <li class="mt-4 flex">
            <a class="group flex text-sm font-medium text-zinc-800 transition hover:text-blue-500 dark:text-zinc-200 dark:hover:text-blue-500" href="https://github.com/danvega/">
              <svg viewBox="0 0 24 24" aria-hidden="true" class="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-blue-500">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.475 2 2 6.588 2 12.253c0 4.537 2.862 8.369 6.838 9.727.5.09.687-.218.687-.487 0-.243-.013-1.05-.013-1.91C7 20.059 6.35 18.957 6.15 18.38c-.113-.295-.6-1.205-1.025-1.448-.35-.192-.85-.667-.013-.68.788-.012 1.35.744 1.538 1.051.9 1.551 2.338 1.116 2.912.846.088-.666.35-1.115.638-1.371-2.225-.256-4.55-1.14-4.55-5.062 0-1.115.387-2.038 1.025-2.756-.1-.256-.45-1.307.1-2.717 0 0 .837-.269 2.75 1.051.8-.23 1.65-.346 2.5-.346.85 0 1.7.115 2.5.346 1.912-1.333 2.75-1.05 2.75-1.05.55 1.409.2 2.46.1 2.716.637.718 1.025 1.628 1.025 2.756 0 3.934-2.337 4.806-4.562 5.062.362.32.675.936.675 1.897 0 1.371-.013 2.473-.013 2.82 0 .268.188.589.688.486a10.039 10.039 0 0 0 4.932-3.74A10.447 10.447 0 0 0 22 12.253C22 6.588 17.525 2 12 2Z"></path>
              </svg>
              <span class="ml-4">Follow on GitHub</span>
            </a>
          </li>
          <li class="mt-4 flex">
            <a class="group flex text-sm font-medium text-zinc-800 transition hover:text-blue-500 dark:text-zinc-200 dark:hover:text-blue-500" href="https://www.instagram.com/thedanvega/">
              <svg viewBox="0 0 24 24" aria-hidden="true" class="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-blue-500">
                <path d="M12 3c-2.444 0-2.75.01-3.71.054-.959.044-1.613.196-2.185.418A4.412 4.412 0 0 0 4.51 4.511c-.5.5-.809 1.002-1.039 1.594-.222.572-.374 1.226-.418 2.184C3.01 9.25 3 9.556 3 12s.01 2.75.054 3.71c.044.959.196 1.613.418 2.185.23.592.538 1.094 1.039 1.595.5.5 1.002.808 1.594 1.038.572.222 1.226.374 2.184.418C9.25 20.99 9.556 21 12 21s2.75-.01 3.71-.054c.959-.044 1.613-.196 2.185-.419a4.412 4.412 0 0 0 1.595-1.038c.5-.5.808-1.002 1.038-1.594.222-.572.374-1.226.418-2.184.044-.96.054-1.267.054-3.711s-.01-2.75-.054-3.71c-.044-.959-.196-1.613-.419-2.185A4.412 4.412 0 0 0 19.49 4.51c-.5-.5-1.002-.809-1.594-1.039-.572-.222-1.226-.374-2.184-.418C14.75 3.01 14.444 3 12 3Zm0 1.622c2.403 0 2.688.009 3.637.052.877.04 1.354.187 1.67.31.421.163.72.358 1.036.673.315.315.51.615.673 1.035.123.317.27.794.31 1.671.043.95.052 1.234.052 3.637s-.009 2.688-.052 3.637c-.04.877-.187 1.354-.31 1.67-.163.421-.358.72-.673 1.036a2.79 2.79 0 0 1-1.035.673c-.317.123-.794.27-1.671.31-.95.043-1.234.052-3.637.052s-2.688-.009-3.637-.052c-.877-.04-1.354-.187-1.67-.31a2.789 2.789 0 0 1-1.036-.673 2.79 2.79 0 0 1-.673-1.035c-.123-.317-.27-.794-.31-1.671-.043-.95-.052-1.234-.052-3.637s.009-2.688.052-3.637c.04-.877.187-1.354.31-1.67.163-.421.358-.72.673-1.036.315-.315.615-.51 1.035-.673.317-.123.794-.27 1.671-.31.95-.043 1.234-.052 3.637-.052Z"></path>
                <path d="M12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm0-7.622a4.622 4.622 0 1 0 0 9.244 4.622 4.622 0 0 0 0-9.244Zm5.884-.182a1.08 1.08 0 1 1-2.16 0 1.08 1.08 0 0 1 2.16 0Z"></path>
              </svg>
              <span class="ml-4">Follow on Instagram</span>
            </a>
          </li>
          <li class="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40 flex">
            <a class="group flex text-sm font-medium text-zinc-800 transition hover:text-blue-500 dark:text-zinc-200 dark:hover:text-blue-500" href="mailto:danvega@gmail.com">
              <svg viewBox="0 0 24 24" aria-hidden="true" class="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-blue-500">
                <path fill-rule="evenodd" d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"></path>
              </svg>
              <span class="ml-4">danvega@gmail.com</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </Container>
</template>