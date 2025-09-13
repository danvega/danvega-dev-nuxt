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