export const useSpeakingData = () => {

  const useSpeakingPost = (slug: string) => {
    return useAsyncData(`speaking-post-${slug}`, async () => {
      try {
        const posts = await queryCollection('speaking')
          .where('slug', '=', slug)
          .where('published', '=', true)
          .all()

        if (posts.length === 0) {
          throw createError({
            statusCode: 404,
            statusMessage: 'Talk not found'
          })
        }

        return posts[0]
      } catch (err) {
        console.error(`Error fetching speaking post ${slug}:`, err)
        throw err
      }
    }, {
      server: true
    })
  }

  return {
    useSpeakingPost
  }
}
