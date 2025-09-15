import { rssData } from '../api/feed/data'

// Get the type from the actual rssData
type BlogPost = typeof rssData[number]

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.siteUrl || 'https://www.danvega.dev'

  // Use pre-generated RSS data from build time
  const posts = rssData

  // Function to format date for RSS
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toUTCString()
  }

  // Function to escape XML characters
  const escapeXml = (unsafe: string) => {
    return unsafe.replace(/[<>&'"]/g, (c) => {
      switch (c) {
        case '<': return '&lt;'
        case '>': return '&gt;'
        case '&': return '&amp;'
        case '\'': return '&apos;'
        case '"': return '&quot;'
        default: return c
      }
    })
  }

  // Function to create post URL from path
  const createPostUrl = (path: string) => {
    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    return `${baseUrl}/${cleanPath}`
  }

  // Generate RSS XML
  const rssItems = posts.map((post: BlogPost) => {
    const postUrl = createPostUrl(post._path || '')
    const pubDate = formatDate(post.date)
    const categories = post.tags && post.tags.length > 0 ? post.tags.map((tag: string) =>
      `      <category>${escapeXml(tag)}</category>`
    ).join('\n') : ''

    return `    <item>
      <title>${escapeXml(post.title || '')}</title>
      <description>${escapeXml(post.description || '')}</description>
      <link>${postUrl}</link>
      <guid>${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>${escapeXml(post.author || 'Dan Vega')}</author>
${categories}
    </item>`
  }).join('\n')

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Dan Vega</title>
    <description>Personal site of Dan Vega</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>danvega@gmail.com (Dan Vega)</managingEditor>
    <webMaster>danvega@gmail.com (Dan Vega)</webMaster>
${rssItems}
  </channel>
</rss>`

  // Set proper headers and return RSS XML
  setHeader(event, 'content-type', 'application/rss+xml; charset=UTF-8')
  setHeader(event, 'cache-control', 's-maxage=86400') // Cache for 24 hours

  return rssXml
})