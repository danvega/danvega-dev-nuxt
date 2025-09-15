// Simple RSS feed using pre-generated data
export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.siteUrl || 'https://www.danvega.dev'

    // Get blog posts from pre-generated data
    let posts: any[] = []
    try {
      const { rssData } = await import('./data')
      posts = rssData.slice(0, 10) // Simple version shows fewer posts
    } catch (importError) {
      posts = []
    }

    // Simple XML escaping
    const escapeXml = (unsafe: string) => {
      if (!unsafe) return ''
      return String(unsafe).replace(/[<>&'"]/g, (c) => {
        switch (c) {
          case '<': return '&lt;'
          case '>': return '&gt;'
          case '&': return '&amp;'
          case "'": return '&apos;'
          case '"': return '&quot;'
          default: return c
        }
      })
    }

    // Generate RSS items
    const rssItems = posts.length > 0 ? posts.map((post: any) => {
      const postUrl = `${baseUrl}${post._path || ''}`
      const pubDate = new Date(post.date || new Date()).toUTCString()

      return `    <item>
      <title>${escapeXml(post.title || 'Untitled')}</title>
      <description>${escapeXml(post.description || '')}</description>
      <link>${postUrl}</link>
      <guid>${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
    </item>`
    }).join('\n') : `    <item>
      <title>Dan Vega's Blog</title>
      <description>Latest articles</description>
      <link>${baseUrl}/blog</link>
      <guid>${baseUrl}/blog</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
    </item>`

    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Dan Vega</title>
    <description>Personal site of Dan Vega</description>
    <link>${baseUrl}</link>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${rssItems}
  </channel>
</rss>`

    setHeader(event, 'content-type', 'application/rss+xml; charset=UTF-8')
    return rssXml
  } catch (error) {
    const config = useRuntimeConfig()
    const baseUrl = config.public.siteUrl || 'https://www.danvega.dev'

    const fallbackRss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Dan Vega</title>
    <description>Personal site of Dan Vega</description>
    <link>${baseUrl}</link>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <item>
      <title>Dan Vega's Blog</title>
      <description>Latest articles</description>
      <link>${baseUrl}/blog</link>
      <guid>${baseUrl}/blog</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
    </item>
  </channel>
</rss>`

    setHeader(event, 'content-type', 'application/rss+xml; charset=UTF-8')
    return fallbackRss
  }
})