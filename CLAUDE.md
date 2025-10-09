# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Dan Vega's personal website built with Nuxt 3. It's a blog-focused site with content management via Nuxt Content, featuring articles, newsletters, speaking information, and courses.

## Development Commands

- `npm run dev` - Start development server
- `npm run local` - Start development server with local environment (.env.local)
- `npm run build` - Build for production
- `npm run generate` - Generate static site
- `npm run preview` - Preview production build

## Architecture

### Content Management
- **Nuxt Content**: Primary content management system
- **Blog posts**: Located in `content/blog/` with nested year/month/day structure
- **Newsletter**: Located in `content/newsletter/`
- **Markdown**: All content written in markdown with frontmatter

### Key Directories
- `pages/` - Vue.js pages using Nuxt 3 file-based routing
- `components/` - Vue components organized by feature (blog/, home/, content/)
- `content/` - Markdown content files for blog posts and newsletters
- `assets/styles/` - Tailwind CSS configuration

### Tech Stack
- **Nuxt 3** - Main framework
- **Vue 3** - Component framework with Composition API
- **Tailwind CSS** - Styling framework
- **Nuxt Content** - Content management
- **TypeScript** - Type safety
- **Headless UI** - Accessible UI components
- **Hero Icons** - Icon system

### Key Modules & Plugins
- `@nuxtjs/tailwindcss` - Tailwind integration
- `@nuxtjs/color-mode` - Dark/light mode support
- `@nuxt/content` - Content management system
- `nuxt-feedme` - RSS/JSON feed generation
- `@vueuse/nuxt` - Vue composition utilities
- `nuxt-simple-sitemap` - XML sitemap generation
- `@nuxt/image` - Image optimization (Netlify provider)

### Routing Configuration
- Blog posts: `/blog/**` with ISR (Incremental Static Regeneration)
- Newsletter: `/newsletter/**` with ISR
- Static pages: `/about`, `/speaking`, `/courses`, `/uses` are prerendered
- Redirect: `/contact` → `/about`

### Content Structure
- Blog posts use syntax highlighting for multiple languages (Java, JavaScript, TypeScript, etc.)
- YouTube embeds via lite-youtube-embed for performance
- Custom content components for alerts (Error, Success, Warning) and embeds
- RSS/Atom/JSON feeds automatically generated from blog content

### Styling
- Dark/light mode with system preference detection
- Tailwind CSS with custom configuration
- Typography plugin for markdown content rendering
- Color mode class suffix configuration

### Performance
- ISR for blog and newsletter content
- Image optimization via Netlify
- Lite YouTube embeds for performance
- CSS optimization with cssnano in production

## Documentation Access

When working with Vue, Vite, or Nuxt, fetch the latest documentation using the context7 MCP server for up-to-date information:

- **Vue 3**: Use `mcp__context7_fetch` with `vue` to get current Vue 3 documentation
- **Vite**: Use `mcp__context7_fetch` with `vite` to get current Vite documentation
- **Nuxt 3/4**: Use `mcp__context7_fetch` with `nuxt` to get current Nuxt documentation

This ensures you have the most recent API changes, best practices, and feature updates when implementing changes to the codebase.

## Design System & UI Patterns

### Layout Components

**Container Component**
- Use `<Container>` component for consistent page layout and max-width constraints
- Apply top margin classes: `mt-16 sm:mt-32` for main content sections
- Container automatically handles responsive padding and centering

**Section Spacing**
- Top-level sections: `mt-24` or `space-y-24` for major section breaks
- Subsections: `mt-12` or `mt-16` for content within sections
- Content blocks: `mt-6` or `mt-8` for related content
- Element spacing: `mt-2` or `mt-4` for small gaps

### Typography Hierarchy

**Page Headers**
```vue
<h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
  <!-- Can go up to text-5xl or text-6xl for hero sections -->
</h1>
```

**Section Headings**
```vue
<h2 class="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
```

**Subsection Headings**
```vue
<h3 class="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
<!-- or for cards/smaller contexts -->
<h4 class="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
```

**Body Text**
```vue
<p class="text-base text-zinc-600 dark:text-zinc-400">
<!-- or for larger intro text -->
<p class="text-lg text-zinc-600 dark:text-zinc-400">
<!-- or for smaller supporting text -->
<p class="text-sm text-zinc-600 dark:text-zinc-400">
```

### Card Components

**Basic Card with Border**
```vue
<div class="rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
  <!-- Card content -->
</div>
```

**Card with Background**
```vue
<div class="rounded-lg bg-zinc-50 dark:bg-zinc-800/50 p-6">
  <!-- Card content -->
</div>
```

**Interactive Card with Hover**
```vue
<div class="rounded-lg border border-zinc-200 dark:border-zinc-700 p-6 hover:border-blue-400 dark:hover:border-blue-600 transition-colors">
  <!-- Card content -->
</div>
```

**Card with Gradient Background**
```vue
<div class="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-950/20 p-6">
  <!-- Use different colors: purple-50, green-50, orange-50 for variety -->
</div>
```

### Grid Layouts

**Responsive Grids**
```vue
<!-- 2-column responsive -->
<div class="grid grid-cols-1 gap-6 md:grid-cols-2">

<!-- 3-column responsive -->
<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
<!-- or with intermediate breakpoint -->
<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

<!-- 4-column responsive -->
<div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
```

**Card Grids**
```vue
<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
  <div class="rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
    <!-- Card 1 -->
  </div>
  <div class="rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
    <!-- Card 2 -->
  </div>
</div>
```

### Callout Boxes

**Info Callout (Blue)**
```vue
<div class="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-6 border border-blue-200 dark:border-blue-800">
  <p class="text-sm text-blue-900 dark:text-blue-300">
    <strong>Note:</strong> Your callout message here
  </p>
</div>
```

**Success Callout (Green)**
```vue
<div class="rounded-lg bg-green-50 dark:bg-green-950/30 p-6 border border-green-200 dark:border-green-800">
  <p class="text-sm text-green-900 dark:text-green-300">
    <strong>Success:</strong> Your message here
  </p>
</div>
```

**Warning/Alert (Yellow/Orange)**
```vue
<div class="rounded-lg bg-yellow-50 dark:bg-yellow-950/30 p-6 border border-yellow-200 dark:border-yellow-800">
  <p class="text-sm text-yellow-900 dark:text-yellow-300">
    <strong>Warning:</strong> Your message here
  </p>
</div>
```

### Code Blocks

**Inline Code**
```vue
<code class="text-base font-mono text-blue-600 dark:text-blue-400">
  code snippet here
</code>
```

**Code Block with Dark Background**
```vue
<div class="rounded-lg bg-zinc-900 p-6 overflow-x-auto">
  <pre class="text-sm text-zinc-100"><code>{
  "example": "code"
}</code></pre>
</div>
```

**Code Display Box**
```vue
<div class="rounded-lg bg-zinc-100 dark:bg-zinc-800 p-6">
  <p class="text-sm font-semibold text-zinc-600 dark:text-zinc-400 mb-2">Label</p>
  <code class="text-base font-mono text-blue-600 dark:text-blue-400 break-all">
    https://example.com/api
  </code>
</div>
```

### Buttons & CTAs

**Primary Button (Blue)**
```vue
<a href="#" class="rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors">
  Button Text
</a>
```

**Secondary Button (Dark)**
```vue
<a href="#" class="rounded-md bg-zinc-800 dark:bg-zinc-700 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-zinc-700 dark:hover:bg-zinc-600 transition-colors">
  Button Text
</a>
```

**Outline Button**
```vue
<a href="#" class="rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-6 py-3 text-base font-semibold text-zinc-800 dark:text-zinc-100 shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors">
  Button Text
</a>
```

**Button Group**
```vue
<div class="flex flex-wrap gap-4">
  <!-- Multiple buttons here -->
</div>
<!-- Or centered -->
<div class="flex flex-wrap justify-center gap-4">
  <!-- Multiple buttons here -->
</div>
```

### Icons

**Icon with Card Header**
```vue
<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
  <svg class="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <!-- SVG path -->
  </svg>
</div>
```

**Icon Color Variants**
- Blue: `bg-blue-100 dark:bg-blue-900` + `text-blue-600 dark:text-blue-400`
- Green: `bg-green-100 dark:bg-green-900` + `text-green-600 dark:text-green-400`
- Purple: `bg-purple-100 dark:bg-purple-900` + `text-purple-600 dark:text-purple-400`
- Orange: `bg-orange-100 dark:bg-orange-900` + `text-orange-600 dark:text-orange-400`

### Color Palette

**Primary Colors**
- Blue: Primary actions, links, highlights (`blue-600`, `blue-400`)
- Zinc: Neutrals, text, borders (`zinc-800`, `zinc-600`, `zinc-400`)

**Category/Accent Colors**
- Red: YouTube, important (`red-600`)
- Green: Success, positive actions (`green-600`)
- Purple: Special features (`purple-600`)
- Orange: Warnings, podcasts (`orange-600`)

**Text Colors**
- Headings: `text-zinc-800 dark:text-zinc-100`
- Body: `text-zinc-600 dark:text-zinc-400`
- Subtle: `text-zinc-500 dark:text-zinc-500`
- Links: `text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300`

**Background Colors**
- Cards: `bg-zinc-50 dark:bg-zinc-800/50`
- Borders: `border-zinc-200 dark:border-zinc-700`
- Callouts: `bg-{color}-50 dark:bg-{color}-950/30` with matching borders

### SEO & Meta Tags

**Standard Page Meta**
```vue
<script lang="ts" setup>
useHead({
  title: 'Page Title | Dan Vega',
  meta: [
    { name: 'title', content: 'Page Title' },
    { name: 'description', content: 'Page description for SEO' },
    { property: 'og:title', content: 'Page Title' },
    { property: 'og:description', content: 'Page description for social sharing' }
  ]
});
</script>
```

### Accessibility & Best Practices

- Always include dark mode variants for colors
- Use semantic HTML (`header`, `section`, `nav`)
- Include `aria-labelledby` for sections when appropriate
- Use `transition-colors` for smooth hover effects
- Ensure sufficient color contrast (zinc-600/400 for body text)
- Make buttons and links keyboard accessible
- Use `break-all` for long URLs/code that might overflow
- Include `overflow-x-auto` on code blocks for horizontal scrolling