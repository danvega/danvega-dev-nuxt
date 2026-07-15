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

export interface Project {
  slug: string
  title: string
  description: string
  image: string
  techStack: string[]
  github?: string
  url?: string
  status?: 'active' | 'in-progress' | 'archived'
}