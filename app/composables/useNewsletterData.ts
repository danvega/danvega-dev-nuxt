// Enhanced newsletter data fetching with Nuxt 4 features
export const useNewsletterData = () => {

  // Shared newsletter posts data
  const useAllNewsletterPosts = () => {
    return useAsyncData('newsletter-posts-all', async () => {
      try {
        const allPosts = await queryCollection('content').all()

        return allPosts.filter(post =>
          post.path?.startsWith('/newsletter')
        ).sort((a, b) => {
          // Extract date from path: /newsletter/YYYY/MM/DD/slug for sorting
          const extractDateFromPath = (path) => {
            const match = path?.match(/\/newsletter\/(\d{4})\/(\d{2})\/(\d{2})\//)
            if (match) {
              return new Date(`${match[1]}-${match[2]}-${match[3]}`)
            }
            return new Date(0) // fallback to epoch
          }

          const dateA = extractDateFromPath(a.path)
          const dateB = extractDateFromPath(b.path)
          return dateB - dateA // newest first
        })
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

    return useAsyncData(() => `latest-newsletter-posts-${limitRef.value}`, async () => {
      try {
        const { data: allPosts } = await useAllNewsletterPosts()
        return allPosts.value?.slice(0, limitRef.value) || []
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
    return useAsyncData(`newsletter-post-${slug}`, async () => {
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