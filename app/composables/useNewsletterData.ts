// Enhanced newsletter data fetching with Nuxt 4 features
export const useNewsletterData = () => {

  // Shared newsletter posts data
  const useAllNewsletterPosts = () => {
    return useAsyncData('newsletter-posts-all', async () => {
      try {
        const allPosts = await queryCollection('content').all()

        return allPosts.filter(post =>
          post.path?.startsWith('/newsletter') &&
          post.meta?.published === true
        ).sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date))
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
    useNewsletterPost
  }
}