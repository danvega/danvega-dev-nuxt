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
            tags: toTags(post.tags),
            author: post.author,
            cover: post.cover,
            video: post.video,
            excerpt: post.excerpt,
            shortDesc: post.description ? clipToWords(post.description) : post.description
          },
          // Derive reading time here rather than shipping every post's parsed
          // body to the client. Consumers only ever used `body` to render a
          // "N min read" label, and serialising 250+ bodies into the payload
          // made every blog page ~6.8MB.
          readingTime: useReadingTime(post.body)
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
            tags: toTags(post.tags),
            author: post.author,
            cover: post.cover,
            video: post.video,
            excerpt: post.excerpt,
            shortDesc: post.description ? clipToWords(post.description) : post.description
          },
          readingTime: useReadingTime(post.body)
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
  // firstPageLimit lets page 1 hold more posts (e.g. featured hero + grid) than later pages
  const usePaginatedBlogPosts = (page: Ref<number>, limit: Ref<number>, tag?: Ref<string | undefined>, firstPageLimit?: Ref<number>) => {
    return useAsyncData<PaginatedResults<BlogPost>>(() => {
      const key = `blog-posts-page-${page.value}-limit-${limit.value}-first-${firstPageLimit?.value ?? limit.value}`
      return tag?.value ? `${key}-tag-${tagKey(tag.value)}` : key
    }, async () => {
      try {
        const { data: allPosts } = await useAllBlogPosts()

        if (!allPosts.value) return { posts: [], totalPages: 0, currentPage: page.value }

        let filteredPosts = allPosts.value

        // Match on the folded key so ?tag=Spring%20Boot also finds the post tagged
        // "Spring boot", and older ?tag=java links keep working.
        if (tag?.value) {
          const wanted = tagKey(tag.value)
          filteredPosts = allPosts.value.filter(post =>
            post.meta?.tags?.some((postTag: string) => tagKey(postTag) === wanted)
          )
        }

        const firstLimit = firstPageLimit?.value ?? limit.value
        const totalPages = filteredPosts.length <= firstLimit
          ? 1
          : 1 + Math.ceil((filteredPosts.length - firstLimit) / limit.value)
        const startIndex = page.value === 1 ? 0 : firstLimit + (page.value - 2) * limit.value
        const endIndex = startIndex + (page.value === 1 ? firstLimit : limit.value)
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
      watch: [page, limit, ...(tag ? [tag] : []), ...(firstPageLimit ? [firstPageLimit] : [])]
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

        // If not found by slug, try by path (posts whose filename differs from
        // the frontmatter slug). Nuxt Content v3 exposes `path`, not `_path`,
        // and only supports SQL operators like LIKE — the old `_path`/`includes`
        // query threw, which turned every not-found URL into a 500 instead of a 404.
        // Every real filename is kebab-case, so anything else can't match a post.
        // The guard also stops SQL LIKE wildcards (`%`, `_`) in a URL from
        // impersonating a real post (e.g. /blog/jackson_3_spring_boot_4).
        if (posts.length === 0 && /^[a-z0-9-]+$/i.test(slug)) {
          posts = await queryCollection('blog')
            .where('path', 'LIKE', `%/${slug}`)
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
            updatedOn: post.updatedOn,
            published: post.published,
            tags: toTags(post.tags),
            author: post.author,
            cover: post.cover,
            video: post.video,
            excerpt: post.excerpt,
            shortDesc: post.description ? clipToWords(post.description) : post.description
          },
          body: post.body
        }
      } catch (err: any) {
        // A missing post is an expected 404, not a server error worth logging.
        if (err?.statusCode !== 404) {
          console.error(`Error fetching blog post ${slug}:`, err)
        }
        throw err
      }
    }, {
      server: true,
      // Enhanced caching for individual posts - let Nuxt handle automatically
    })
  }

  // Topics for the browse page: tag variants folded together, one-offs dropped.
  const useAllTags = () => {
    return useAsyncData<{ name: string; count: number }[]>('blog-all-tags', async () => {
      try {
        const { data: allPosts } = await useAllBlogPosts()
        if (!allPosts.value) return []

        const tagCounts = new Map<string, { name: string; count: number }>()
        for (const post of allPosts.value) {
          // A post carrying both "Java" and "java" is still one post for that topic.
          const seen = new Set<string>()
          for (const tag of post.meta?.tags ?? []) {
            const key = tagKey(tag)
            if (seen.has(key)) continue
            seen.add(key)
            const entry = tagCounts.get(key)
            if (entry) entry.count++
            // Unmapped tags fall back to the casing of the most recent post using
            // them, since `allPosts` is ordered date DESC.
            else tagCounts.set(key, { name: tagDisplayName(tag), count: 1 })
          }
        }

        return Array.from(tagCounts.values())
          .filter(tag => tag.count >= TAG_MIN_POSTS)
          .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
      } catch (err) {
        console.error('Error fetching tags:', err)
        return []
      }
    }, {
      default: () => [],
      server: true
    })
  }

  // Posts in a specific series, ordered by seriesOrder
  const useSeriesPosts = (series: string) => {
    return useAsyncData<{ slug: string; title: string }[]>(`blog-series-${series}`, async () => {
      try {
        const posts = await queryCollection('blog')
          .where('published', '=', true)
          .where('series', '=', series)
          .order('seriesOrder', 'ASC')
          .all()

        return posts.map((post: any) => ({
          slug: post.slug,
          title: post.title
        }))
      } catch (err) {
        console.error(`Error fetching series ${series}:`, err)
        return []
      }
    }, {
      default: () => [],
      server: true
    })
  }

  return {
    useAllBlogPosts,
    useLatestArticles,
    usePaginatedBlogPosts,
    useBlogPost,
    useAllTags,
    useSeriesPosts
  }
}