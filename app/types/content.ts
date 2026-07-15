// Enhanced TypeScript types for Nuxt 4 content system

export interface BlogPost {
  _id: string
  path?: string
  title: string
  description?: string
  meta?: {
    slug?: string
    date: string
    updatedOn?: string
    published?: boolean
    tags?: string[]
    author?: string
    cover?: string
    video?: string
    excerpt?: string
    shortDesc?: string
  }
  // Only the single post fetched by `useBlogPost` carries a body. List queries
  // omit it and expose `readingTime` instead, so the parsed bodies of every
  // post never reach the client payload.
  body?: {
    children: any[]
    toc?: {
      title: string
      depth: number
      searchDepth: number
      links: Array<{
        id: string
        depth: number
        text: string
      }>
    }
  }
  readingTime?: {
    minutes: number
    text: string
  }
}

export interface NewsletterPost {
  _id: string
  path?: string
  title: string
  description?: string
  meta?: {
    slug?: string
    date?: string
    // Newsletter posts don't have published field
  }
  body?: {
    children: any[]
    toc?: {
      title: string
      depth: number
      searchDepth: number
      links: Array<{
        id: string
        depth: number
        text: string
      }>
    }
  }
}

export interface PaginatedResults<T> {
  posts: T[]
  totalPages: number
  currentPage: number
  totalPosts?: number
}

// Search data type for components
export interface SearchResult {
  title: string
  _path: string
}