import { queryCollection } from '@nuxt/content/server'

// Feeds the sitemap the canonical bare-slug URL (/blog/<slug>) for every
// published blog post. This matches the site's internal links and the
// rel=canonical tag, so Google gets one consistent URL per post instead of
// discovering the dated /blog/YYYY/MM/DD/<slug> paths on its own.
export default defineSitemapEventHandler(async (event) => {
  const posts = await queryCollection(event, 'blog')
    .where('published', '=', true)
    .select('slug', 'date')
    .all()

  return posts
    .filter((post) => post.slug)
    .map((post) =>
      asSitemapUrl({
        loc: `/blog/${post.slug}`,
        lastmod: post.date,
      })
    )
})
