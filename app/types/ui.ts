// UI-related types
export interface NavItem {
  name: string
  link: string
}

export interface Photo {
  id: number
  width: number
  height: number
  src: string
  alt: string
}

export interface Course {
  slug: string
  title: string
  /** Trimmed title for the featured editorial layout, where the full title runs too long. */
  shortTitle?: string
  description: string
  link: string
  cover: string
  topic?: string
  platform?: 'YouTube' | 'Udemy' | 'FreeCodeCamp'
  featured?: boolean
}

export interface Post {
  title: string
  description: string
}

export interface ProjectStory {
  // Why the project exists. The problem or itch that started it.
  why: string
  // What got built and how it works.
  built: string
  // The takeaway. Optional because not every project has one yet.
  learned?: string
}

export type ProjectGroup = 'apps' | 'tools' | 'books-and-shows' | 'websites'

export interface Project {
  slug: string
  title: string
  group: ProjectGroup
  // File in /public/images/projects/icons. Without one, a monogram tile is drawn in the accent color.
  icon?: string
  monogram?: string
  accent?: string
  tagline: string
  description: string
  // File in /public/images/projects
  image: string
  // 'browser' wraps the image in a URL bar, 'terminal' in a terminal title bar,
  // 'bare' shows it as is (for screenshots that already include window chrome)
  frame: 'browser' | 'terminal' | 'bare'
  frameLabel?: string
  since: string
  story: ProjectStory
  stats?: { label: string; value: string }[]
  techStack: string[]
  github?: string
  url?: string
  post?: { title: string; url: string }
  status?: 'active' | 'in-progress' | 'archived'
  // Slug of the project that replaced this one
  successor?: string
}