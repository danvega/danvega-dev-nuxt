// Enhanced data fetching composables using Nuxt 4 features
import type { BlogPost, PaginatedResults, BlogDataComposable } from '~/types/content'

// Helper function to clip description to 100 words
const clipToWords = (description: string, wordLimit: number = 50): string => {
  const words = description.split(' ')
  if (words.length <= wordLimit) {
    return description
  }
  return words.slice(0, wordLimit).join(' ') + '...'
}

export const useBlogData = (): BlogDataComposable => {

  // Shared blog posts data with reactive caching
  const useAllBlogPosts = () => {
    return useAsyncData<BlogPost[]>('blog-posts-all', async () => {
      try {
        const allPosts = await queryCollection('blog')
          .where('published', '=', true)
          .order('date', 'DESC')
          .all()

        return allPosts.map((post: any): BlogPost => ({
          _id: post._id || '',
          path: post._path || post.path,
          title: post.title || '',
          description: post.description,
          meta: {
            slug: post.slug,
            date: post.date,
            published: post.published,
            tags: post.tags,
            author: post.author,
            cover: post.cover,
            video: post.video,
            excerpt: post.excerpt,
            shortDesc: post.description ? clipToWords(post.description) : post.description
          },
          body: post.body
        }))
      } catch (err) {
        console.error('Error fetching blog posts:', err)
        return []
      }
    }, {
      default: () => [],
      server: true,
      // Enhanced caching - let Nuxt handle caching automatically
    })
  }

  // Latest articles with optimized query - only loads the needed posts
  const useLatestArticles = (limit: number = 3) => {
    const limitRef = ref(limit)

    return useAsyncData<BlogPost[]>(() => `latest-articles-${limitRef.value}-v3`, async () => {
      try {
        // Use queryCollection with the defined blog collection
        const posts = await queryCollection('blog')
          .where('published', '=', true)
          .order('date', 'DESC')
          .limit(limitRef.value)
          .all()

        return posts.map((post: any): BlogPost => ({
          _id: post._id || '',
          path: post._path || post.path,
          title: post.title || '',
          description: post.description,
          meta: {
            slug: post.slug,
            date: post.date,
            published: post.published,
            tags: post.tags,
            author: post.author,
            cover: post.cover,
            video: post.video,
            excerpt: post.excerpt,
            shortDesc: post.description ? clipToWords(post.description) : post.description
          },
          body: post.body
        }))
      } catch (err) {
        console.error('Error fetching latest articles:', err)
        return []
      }
    }, {
      default: () => [],
      server: true,
      // Reactive key - will refetch when limit changes
      watch: [limitRef]
    })
  }

  // Blog posts with pagination and filtering
  const usePaginatedBlogPosts = (page: Ref<number>, limit: Ref<number>, tag?: Ref<string | undefined>) => {
    return useAsyncData<PaginatedResults<BlogPost>>(() => {
      const key = `blog-posts-page-${page.value}-limit-${limit.value}`
      return tag?.value ? `${key}-tag-${tag.value}` : key
    }, async () => {
      try {
        const { data: allPosts } = await useAllBlogPosts()

        if (!allPosts.value) return { posts: [], totalPages: 0, currentPage: page.value }

        let filteredPosts = allPosts.value

        // Apply tag filter if provided
        if (tag?.value) {
          const tagValue = tag.value
          filteredPosts = allPosts.value.filter(post =>
            post.meta?.tags?.includes(tagValue)
          )
        }

        const totalPages = Math.ceil(filteredPosts.length / limit.value)
        const startIndex = (page.value - 1) * limit.value
        const endIndex = startIndex + limit.value
        const posts = filteredPosts.slice(startIndex, endIndex)

        return {
          posts,
          totalPages,
          currentPage: page.value,
          totalPosts: filteredPosts.length
        }
      } catch (err) {
        console.error('Error fetching paginated blog posts:', err)
        return { posts: [], totalPages: 0, currentPage: page.value }
      }
    }, {
      default: () => ({ posts: [], totalPages: 0, currentPage: page.value }),
      server: true,
      // Reactive keys - will refetch when page, limit, or tag changes
      watch: [page, limit, ...(tag ? [tag] : [])]
    })
  }

  // Single blog post with enhanced caching
  const useBlogPost = (slug: string) => {
    return useAsyncData<BlogPost>(`blog-post-${slug}`, async () => {
      try {
        // Try to find by slug first
        let posts = await queryCollection('blog')
          .where('slug', '=', slug)
          .where('published', '=', true)
          .all()

        // If not found by slug, try by path
        if (posts.length === 0) {
          posts = await queryCollection('blog')
            .where('_path', 'includes', `/${slug}`)
            .where('published', '=', true)
            .all()
        }

        if (posts.length === 0) {
          throw createError({
            statusCode: 404,
            statusMessage: 'Post not found'
          })
        }

        const post = posts[0]

        return {
          _id: post._id || '',
          path: post._path || post.path,
          title: post.title || '',
          description: post.description,
          meta: {
            slug: post.slug,
            date: post.date,
            published: post.published,
            tags: post.tags,
            author: post.author,
            cover: post.cover,
            video: post.video,
            excerpt: post.excerpt,
            shortDesc: post.description ? clipToWords(post.description) : post.description
          },
          body: post.body
        }
      } catch (err) {
        console.error(`Error fetching blog post ${slug}:`, err)
        throw err
      }
    }, {
      server: true,
      // Enhanced caching for individual posts - let Nuxt handle automatically
    })
  }

  return {
    useAllBlogPosts,
    useLatestArticles,
    usePaginatedBlogPosts,
    useBlogPost
  }
}