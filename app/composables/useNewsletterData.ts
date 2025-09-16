// Enhanced newsletter data fetching with Nuxt 4 features
import type { NewsletterPost, NewsletterDataComposable } from '~/types/content'

export const useNewsletterData = (): NewsletterDataComposable => {

  // Shared newsletter posts data
  const useAllNewsletterPosts = () => {
    return useAsyncData<NewsletterPost[]>('newsletter-posts-all', async () => {
      try {
        const allPosts = await queryCollection('newsletter')
          .order('date', 'DESC')
          .all()

        return allPosts.map((post: any): NewsletterPost => ({
          _id: post._id || '',
          path: post._path || post.path,
          title: post.title || '',
          description: post.description,
          meta: {
            slug: post.slug,
            date: post.date
          },
          body: post.body
        }))
      } catch (err) {
        console.error('Error fetching newsletter posts:', err)
        return []
      }
    }, {
      default: () => [],
      server: true,
      // Enhanced caching - let Nuxt handle automatically
    })
  }

  // Latest newsletter posts with limit
  const useLatestNewsletterPosts = (limit: number = 10) => {
    const limitRef = ref(limit)

    return useAsyncData<NewsletterPost[]>(() => `latest-newsletter-posts-${limitRef.value}`, async () => {
      try {
        const allPosts = await queryCollection('newsletter')
          .order('date', 'DESC')
          .limit(limitRef.value)
          .all()

        return allPosts.map((post: any): NewsletterPost => ({
          _id: post._id || '',
          path: post._path || post.path,
          title: post.title || '',
          description: post.description,
          meta: {
            slug: post.slug,
            date: post.date
          },
          body: post.body
        }))
      } catch (err) {
        console.error('Error fetching latest newsletter posts:', err)
        return []
      }
    }, {
      default: () => [],
      server: true,
      // Reactive key - will refetch when limit changes
      watch: [limitRef]
    })
  }

  // Single newsletter post
  const useNewsletterPost = (slug: string) => {
    return useAsyncData<NewsletterPost>(`newsletter-post-${slug}`, async () => {
      try {
        const { data: allPosts } = await useAllNewsletterPosts()

        const post = allPosts.value?.find(post =>
          post.meta?.slug === slug || post.path?.endsWith(`/${slug}`)
        )

        if (!post) {
          throw createError({
            statusCode: 404,
            statusMessage: 'Newsletter post not found'
          })
        }

        return post
      } catch (err) {
        console.error(`Error fetching newsletter post ${slug}:`, err)
        throw err
      }
    }, {
      server: true
    })
  }

  return {
    useAllNewsletterPosts,
    useLatestNewsletterPosts,
    useNewsletterPost
  }
}