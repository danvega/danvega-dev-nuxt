// Enhanced TypeScript types for Nuxt 4 content system

export interface BlogPost {
  _id: string
  path?: string
  title: string
  description?: string
  meta?: {
    slug?: string
    date: string
    published: boolean
    tags?: string[]
    author?: string
    cover?: string
    video?: string
    excerpt?: string
    shortDesc?: string
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

// Type-safe data fetching return types
export interface BlogDataComposable {
  useAllBlogPosts: () => ReturnType<typeof useAsyncData<BlogPost[]>>
  useLatestArticles: (limit?: number) => ReturnType<typeof useAsyncData<BlogPost[]>>
  usePaginatedBlogPosts: (
    page: Ref<number>,
    limit: Ref<number>,
    tag?: Ref<string | undefined>
  ) => ReturnType<typeof useAsyncData<PaginatedResults<BlogPost>>>
  useBlogPost: (slug: string) => ReturnType<typeof useAsyncData<BlogPost>>
}

export interface NewsletterDataComposable {
  useAllNewsletterPosts: () => ReturnType<typeof useAsyncData<NewsletterPost[]>>
  useLatestNewsletterPosts: (limit?: number) => ReturnType<typeof useAsyncData<NewsletterPost[]>>
  useNewsletterPost: (slug: string) => ReturnType<typeof useAsyncData<NewsletterPost>>
}

// Search data type for components
export interface SearchResult {
  title: string
  _path: string
}