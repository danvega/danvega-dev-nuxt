// UI-related types
export interface Photo {
  id: number
  width: number
  height: number
  src: string
  alt: string
  rotation?: number // rotation in degrees: 0, 90, 180, 270
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