import type { Project } from '~/types/ui'

// Draft stories pulled from blog posts and newsletters. Dan should edit these in his own words.
export const projects: Project[] = [
  {
    slug: 'clearing',
    title: 'Clearing',
    group: 'apps',
    icon: 'clearing.png',
    tagline: 'A to-do list tells you what. Clearing tells you when.',
    description: 'A calm Mac planner that holds everything that needs me, so my head doesn\'t have to.',
    image: 'clearing.jpg',
    frame: 'browser',
    frameLabel: 'clearingplanner.com',
    since: '2026',
    story: {
      why: 'I run a job, a content business, conference travel, a family, and a house. My work lived in a Notion calendar. The rest of my life lived in an Apple Notes list. Neither one told me what needed attention, so my head kept checking.',
      built: 'A Mac app that opens to one screen: what needs me. Overdue, due soon, planned for this week, and the inbox. Around it sit a timeline of my day, time blocks, a weekly review, and an end-of-day shutdown. An iPhone version is next.',
      learned: 'It borrows from Cal Newport\'s deep work and the GTD capture habit, without enforcing either. Rituals are tools to use when they help, not rules.'
    },
    stats: [
      { label: 'Commits', value: '405' },
      { label: 'Platform', value: 'macOS' }
    ],
    techStack: ['Swift', 'SwiftUI'],
    url: 'https://clearingplanner.com',
    status: 'in-progress'
  },
  {
    slug: 'publishwell',
    title: 'Publishwell',
    group: 'apps',
    icon: 'publishwell.svg',
    tagline: 'A studio of tools for creators. Stop starting from scratch.',
    description: 'Focused apps for the work around creating, sharing one account so what you save in one app helps in the next.',
    image: 'publishwell.jpg',
    frame: 'browser',
    frameLabel: 'publishwell.studio',
    since: '2026',
    story: {
      why: 'Creators handle the creative work and every production task around it. Photos, references, drafts, and plans end up scattered. So every new project starts from scratch.',
      built: 'A suite of focused apps that share one account and one database. Thumbnail Studio comes first. Publishing Pipeline, Scheduler, and Sponsors are next. It replaces Content OS, the private app I built just for me.'
    },
    stats: [
      { label: 'Commits', value: '627' },
      { label: 'Apps', value: '4' }
    ],
    techStack: ['Spring Boot 4', 'Java', 'Spring Modulith', 'PostgreSQL'],
    status: 'in-progress'
  },
  {
    slug: 'pressworks',
    title: 'Pressworks',
    group: 'apps',
    icon: 'pressworks.png',
    tagline: 'Make your Java app look as good as it works.',
    description: 'A store of designed page templates for Java developers, ready to drop into the app they already run.',
    image: 'pressworks.jpg',
    frame: 'browser',
    frameLabel: 'pressworks.dev',
    since: '2026',
    story: {
      why: 'Java developers can build the backend, but making it look good is another story. The good template stores serve React. The ones that serve Java sell dated Bootstrap admin themes. So we grab a theme everyone recognizes, port an HTML template to Thymeleaf by hand, or ship something ugly.',
      built: 'A store of complete, designed page templates. Each one ships in four formats: plain HTML, Thymeleaf, FreeMarker, and JTE. You keep your controllers and your wiring and drop in the view layer. Some templates are free. You can buy one, or subscribe to all of them.'
    },
    stats: [
      { label: 'Formats', value: '4' },
      { label: 'Commits', value: '430' }
    ],
    techStack: ['Spring Boot', 'Java', 'Thymeleaf', 'JTE', 'Stripe'],
    url: 'https://pressworks.dev',
    status: 'active'
  },
  {
    slug: 'content-os',
    title: 'Content OS',
    group: 'apps',
    icon: 'content-os.png',
    tagline: 'The app I could never justify building, until AI changed the math.',
    description: 'A private app that runs every video, blog post, and newsletter I publish, from first idea to distribution.',
    image: 'content-os.jpg',
    frame: 'browser',
    frameLabel: 'Content OS',
    since: '2026',
    story: {
      why: 'I tracked my content across Notion, Gmail, Google Calendar, and GitHub. It worked, sort of. It was a pile of separate pieces held together with willpower. I always knew I could build one app to replace it. I just never had a reason to spend that much time on software for one user.',
      built: 'I built it over eight months with Claude Code doing most of the typing. Every piece of content starts as an idea, gets promoted to a project, and moves across a board from pre-production to done. It also has an MCP server, so Claude can operate the app too.',
      learned: 'Personal software shrinks the stakes, the scale, and the scope. That freedom lets you move fast. AI did not just speed up a project I was already doing. It made a project exist that never would have.'
    },
    stats: [
      { label: 'Lines of code', value: '80k' },
      { label: 'Commits', value: '310' },
      { label: 'Users', value: '1' }
    ],
    techStack: ['Java 25', 'Spring Boot 4', 'Spring AI', 'JTE', 'PostgreSQL'],
    post: { title: 'I Built My Own Content OS With Claude Code', url: '/blog/content-os-claude-code-spring-boot' },
    status: 'archived',
    successor: 'publishwell'
  },
  {
    slug: 'kiln-theme',
    title: 'Kiln',
    group: 'tools',
    icon: 'kiln-theme.svg',
    tagline: 'A warm theme for IntelliJ, inspired by Claude Code.',
    description: 'A dark and light theme for JetBrains IDEs with charcoal and cream surfaces and a clay accent.',
    image: 'kiln.jpg',
    frame: 'bare',
    since: '2026',
    story: {
      why: 'Claude Code is one of my favorite tools, and I love how it looks. I wanted that same warmth in the IDE I live in all day.',
      built: 'Kiln comes in dark and light, with charcoal and cream surfaces, a clay orange accent, and calm syntax colors. The light theme is my favorite. It is easy on the eyes.',
      learned: 'This is something I would not have been able to build before AI. What a time it is to be a builder.'
    },
    techStack: ['IntelliJ IDEA'],
    github: 'https://github.com/danvega/kiln-theme',
    post: { title: 'dev2next, a Warm IntelliJ Theme, and a Retweet from Tim Ferriss', url: '/newsletter/dev2next-a-warm-intellij-theme-and-a-retweet-from-tim-ferriss' },
    status: 'active'
  },
  {
    slug: 'fundamentals-of-swe',
    title: 'Fundamentals of Software Engineering',
    group: 'books-and-shows',
    icon: 'fundamentals-of-swe.jpg',
    tagline: 'An O\'Reilly book that started with a reply to a tweet.',
    description: 'A book for new software engineers about everything beyond just coding, co-written with Nate Schutta.',
    image: 'fundamentals-of-swe.jpg',
    frame: 'browser',
    frameLabel: 'fundamentalsofswe.com',
    since: '2024',
    story: {
      why: 'I have wanted to write a book for as long as I can remember. I knew if I did, I wanted it to be an O\'Reilly book. In March 2024 I tweeted my goals for the year. My friend Nate Schutta replied. He was looking for a co-author.',
      built: 'Fifteen chapters across core skills, technical practices, design, and career growth. It came out in December 2025. The companion site holds the book, our podcast, and resources for readers.',
      learned: 'I juggled it with a full-time job and a family. Nothing worth doing comes easy. If you don\'t have patience, don\'t sign up for a book.'
    },
    stats: [
      { label: 'Chapters', value: '15' },
      { label: 'Publisher', value: 'O\'Reilly' }
    ],
    techStack: [],
    url: 'https://www.fundamentalsofswe.com',
    post: { title: 'The Fundamentals of Software Engineering is now Available', url: '/newsletter/2025/12/09/fundamentals-of-software-engineering' },
    status: 'active'
  },
  {
    slug: 'spring-office-hours',
    title: 'Spring Office Hours',
    group: 'books-and-shows',
    icon: 'spring-office-hours.png',
    tagline: 'A little experiment with a friend that turned into a weekly show.',
    description: 'A weekly live show and podcast about Spring and the Java ecosystem, co-hosted with DaShaun Carter.',
    image: 'spring-office-hours.jpg',
    frame: 'browser',
    frameLabel: 'springofficehours.io',
    since: '2022',
    story: {
      why: 'DaShaun and I started streaming on our own Twitch and YouTube channels. We wanted a place to share what was new in Spring, demo some code, and answer questions live.',
      built: 'It grew into a weekly show, then a podcast, then its own website. Every Monday we go live, and every episode lands in your podcast player.',
      learned: 'My favorite part is hearing from you. Your questions show us the real problems developers are facing.'
    },
    stats: [
      { label: 'Episodes', value: '140+' },
      { label: 'Live', value: 'Mondays' }
    ],
    techStack: [],
    url: 'https://www.springofficehours.io',
    status: 'active'
  },
  {
    slug: 'spring-initializr-tui',
    title: 'Spring Initializr TUI',
    group: 'tools',
    monogram: '>_',
    accent: '#18181b',
    tagline: 'Seven steps to start a project was six too many.',
    description: 'A terminal UI for creating Spring Boot projects without ever leaving the command line.',
    image: 'spring-initializr-tui.jpg',
    frame: 'bare',
    since: '2026',
    story: {
      why: 'To start a project I opened a browser, filled out start.spring.io, downloaded a zip, unzipped it, opened my IDE, opened a terminal, and started Claude Code. I was already living in the terminal. Leaving it just to create a project felt silly.',
      built: 'I saw the TamboUI announcement on a flight home from Dallas. I opened Claude Code on my phone and started building right there. The TUI is another client for the same API the Initializr website uses. It ships as a GraalVM native executable, so it starts instantly.',
      learned: 'You don\'t have to rewrite a tool to make it fit your workflow. Sometimes you just need a new front door.'
    },
    techStack: ['Java', 'TamboUI', 'GraalVM'],
    github: 'https://github.com/danvega/spring-initializr-tui',
    post: { title: 'Building a Spring Initializr Terminal UI with Java', url: '/blog/spring-initializr-tui' },
    status: 'active'
  },
  {
    slug: 'raycast-spring-initializr',
    title: 'Spring Initializr for Raycast',
    group: 'tools',
    icon: 'raycast-spring-initializr.png',
    tagline: 'A new Spring Boot app, straight from the Raycast launcher.',
    description: 'A Raycast extension that creates Spring Boot projects without opening a browser.',
    image: 'raycast-spring-initializr.jpg',
    frame: 'bare',
    since: '2024',
    story: {
      why: 'Raycast is one of my favorite Mac apps. I always wanted to build an extension for its store, but I didn\'t know what to build, and I\'m not a React developer. Then I noticed there was no Spring Initializr extension.',
      built: 'An extension that creates a new Spring Boot app right from the Raycast launcher. It pulls its options from the same API the Initializr website and IDE plugins use, so it never needs an update when a new version ships. Claude helped me with the React.',
      learned: 'Being one more client for an existing API is a great pattern. I used the same approach again for the Spring Initializr TUI.'
    },
    stats: [
      { label: 'Installs', value: '141' }
    ],
    techStack: ['TypeScript', 'React', 'Raycast API'],
    github: 'https://github.com/danvega/raycast-spring-initializr',
    url: 'https://www.raycast.com/danvega/spring-initializr',
    post: { title: 'CodeMash 2025 and a new way to bootstrap your Spring applications', url: '/newsletter/codemash-2025-preview' },
    status: 'active'
  },
  {
    slug: 'dvaas',
    title: 'DVaaS',
    group: 'tools',
    monogram: 'MCP',
    accent: '#2563eb',
    tagline: 'Dan Vega as a Service. My whole content library, one MCP server away.',
    description: 'An MCP server that exposes my blog, YouTube, podcasts, newsletter, and speaking events to AI assistants.',
    image: 'dvaas.jpg',
    frame: 'browser',
    frameLabel: 'danvega.dev/mcp',
    since: '2025',
    story: {
      why: 'LLMs are trained on data up to a certain date. Ask one about my recent content and it comes up empty. I wanted any AI assistant to be able to find what I have published, right up to today.',
      built: 'A Spring AI MCP server with tools across my videos, posts, talks, newsletters, and podcast episodes. It runs over the Streamable HTTP transport, so you can connect to it with a URL.',
      learned: 'The bigger point is how easy it is to build your own MCP server in Java and Spring, for whatever your use case is.'
    },
    stats: [
      { label: 'Tools', value: '21' }
    ],
    techStack: ['Spring Boot', 'Spring AI', 'Java'],
    github: 'https://github.com/danvega/dvaas',
    url: 'https://www.danvega.dev/mcp',
    status: 'active'
  },
  {
    slug: 'danvega-dev',
    title: 'danvega.dev',
    group: 'websites',
    icon: 'danvega-dev.jpg',
    tagline: 'Where I document what I learn and share it with you.',
    description: 'My personal website and blog, built with Nuxt and written in markdown.',
    image: 'danvega-dev.jpg',
    frame: 'browser',
    frameLabel: 'danvega.dev',
    since: '2017',
    story: {
      why: 'I wanted one place to document my journey as I learn new things. If a post helps one person solve a problem, it was worth writing.',
      built: 'Everything you are reading is markdown in a Git repo. Nuxt Content turns it into pages, feeds, and a sitemap. It is also where I try out new ideas before I teach them.'
    },
    stats: [
      { label: 'Blog posts', value: '278+' }
    ],
    techStack: ['Nuxt', 'Vue', 'Tailwind CSS', 'TypeScript'],
    github: 'https://github.com/danvega/danvega-dev-nuxt',
    url: 'https://www.danvega.dev',
    status: 'active'
  },
  {
    slug: 'thisismymomoir',
    title: 'This Is My Momoir',
    group: 'websites',
    icon: 'thisismymomoir.png',
    tagline: 'My wife\'s blog, with a writing app built just for her.',
    description: 'Jen Vega\'s blog about life as a mom of two, with a custom admin so she can write without touching Git.',
    image: 'thisismymomoir.jpg',
    frame: 'browser',
    frameLabel: 'thisismymomoir.com',
    since: '2023',
    story: {
      why: 'My wife, Jen, writes about life as a mom of two girls. She is a writer, not a developer. She edited posts in Decap CMS, which was clunky, and Netlify deprecated the Git Gateway it depended on.',
      built: 'A Nuxt blog with its own private admin. Jen signs in with Google, writes in an editor that feels like Google Docs, adds photos, and clicks Publish. A few minutes later the post is live. Reader comments that she approves are next.'
    },
    stats: [
      { label: 'Commits', value: '180' }
    ],
    techStack: ['Nuxt', 'Nuxt Content', 'Tailwind CSS', 'Netlify'],
    url: 'https://thisismymomoir.com',
    status: 'active'
  }
]

export const statusLabels: Record<string, string> = {
  active: 'Active',
  'in-progress': 'In progress',
  archived: 'Retired'
}

export const groupLabels: Record<string, string> = {
  apps: 'Apps',
  tools: 'Developer tools',
  'books-and-shows': 'Books and shows',
  websites: 'Websites'
}
