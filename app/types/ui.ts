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