// Enhanced data fetching composables using Nuxt 4 features
import type { BlogPost, PaginatedResults, BlogDataComposable } from '~/types/content'

export const useBlogData = (): BlogDataComposable => {

  // Shared blog posts data with reactive caching
  const useAllBlogPosts = () => {
    return useAsyncData<BlogPost[]>('blog-posts-all', async () => {
      try {
        const allPosts = await queryCollection('content').all()

        return allPosts.filter((post): post is BlogPost =>
          post.path?.startsWith('/blog') &&
          post.meta?.published === true
        ).sort((a, b) => new Date(b.meta?.date || 0).getTime() - new Date(a.meta?.date || 0).getTime())
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

  // Latest articles with reactive refresh
  const useLatestArticles = (limit: number = 3) => {
    const limitRef = ref(limit)

    return useAsyncData<BlogPost[]>(() => `latest-articles-${limitRef.value}`, async () => {
      try {
        const { data: allPosts } = await useAllBlogPosts()
        return allPosts.value?.slice(0, limitRef.value) || []
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
          filteredPosts = allPosts.value.filter(post =>
            post.meta?.tags?.includes(tag.value)
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
        const { data: allPosts } = await useAllBlogPosts()

        const post = allPosts.value?.find(post =>
          post.meta?.slug === slug || post.path?.endsWith(`/${slug}`)
        )

        if (!post) {
          throw createError({
            statusCode: 404,
            statusMessage: 'Post not found'
          })
        }

        return post
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