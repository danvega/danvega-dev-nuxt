import { readdir, readFile } from 'fs/promises'
import { join } from 'path'
import matter from 'gray-matter'

// Function to recursively get all markdown files
async function getAllMarkdownFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true })
  const files: string[] = []

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      const subFiles = await getAllMarkdownFiles(fullPath)
      files.push(...subFiles)
    } else if (entry.name.endsWith('.md')) {
      files.push(fullPath)
    }
  }

  return files
}

// RSS feed using file system approach (works in development, fallback for serverless)
export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.siteUrl || 'https://www.danvega.dev'

    // Get blog posts using file system approach
    let posts: any[] = []
    try {
      const contentDir = join(process.cwd(), 'content/blog')
      const markdownFiles = await getAllMarkdownFiles(contentDir)

      // Process all markdown files
      for (const filePath of markdownFiles) {
        try {
          const content = await readFile(filePath, 'utf8')
          const { data } = matter(content)

          if (data.published === true) {
            const relativePath = filePath.replace(contentDir, '').replace(/\.md$/, '')
            const urlPath = `/blog${relativePath}`

            posts.push({
              title: data.title,
              description: data.description,
              date: data.date,
              author: data.author || 'Dan Vega',
              _path: urlPath,
              slug: data.slug,
              tags: Array.isArray(data.tags) ? data.tags : []
            })
          }
        } catch (fileError) {
          // Skip problematic files
          continue
        }
      }

      // Sort by date (newest first) and take top 20
      posts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 20)
    } catch (fsError) {
      // Fallback to empty array if file system fails (e.g., serverless environment)
      posts = []
    }

    // Function to escape XML characters
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

    // Generate RSS items from posts
    const rssItems = posts.length > 0 ? posts.map((post: any) => {
      const postUrl = `${baseUrl}${post._path || ''}`
      const pubDate = new Date(post.date || new Date()).toUTCString()
      const categories = post.tags && Array.isArray(post.tags) ? post.tags.map((tag: string) =>
        `      <category>${escapeXml(tag)}</category>`
      ).join('\n') : ''

      return `    <item>
      <title>${escapeXml(post.title || 'Untitled')}</title>
      <description>${escapeXml(post.description || '')}</description>
      <link>${postUrl}</link>
      <guid>${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>hello@danvega.dev (${escapeXml(post.author || 'Dan Vega')})</author>
${categories}
    </item>`
    }).join('\n') : `    <item>
      <title>Dan Vega&apos;s Blog</title>
      <description>Latest articles and tutorials on Java, Spring, and web development</description>
      <link>${baseUrl}/blog</link>
      <guid>${baseUrl}/blog</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <author>hello@danvega.dev (Dan Vega)</author>
    </item>`

    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Dan Vega</title>
    <description>Personal site of Dan Vega - Spring Developer Advocate, Content Creator</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>hello@danvega.dev (Dan Vega)</managingEditor>
    <webMaster>hello@danvega.dev (Dan Vega)</webMaster>
${rssItems}
  </channel>
</rss>`

    setHeader(event, 'content-type', 'application/rss+xml; charset=UTF-8')
    setHeader(event, 'cache-control', 's-maxage=86400')

    return rssXml
  } catch (error) {
    // Fallback RSS if anything fails
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
      <description>Latest articles and tutorials</description>
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