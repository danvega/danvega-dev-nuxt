// UI-related types
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
  description: string
  link: string
  cover: string
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