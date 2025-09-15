import { readdir, readFile, stat } from 'fs/promises'
import { join } from 'path'
import matter from 'gray-matter'

// Local type definitions for the RSS feed
interface BlogPost {
  title?: string;
  description?: string;
  slug?: string;
  date: string;
  published: boolean;
  author?: string;
  tags?: string[];
  _path?: string;
  body?: string;
}

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

// Function to get all blog posts with frontmatter
async function getAllBlogPosts(contentDir: string): Promise<BlogPost[]> {
  const markdownFiles = await getAllMarkdownFiles(contentDir)
  const posts: BlogPost[] = []

  for (const filePath of markdownFiles) {
    const content = await readFile(filePath, 'utf8')
    const { data, content: body } = matter(content)

    // Only include published posts
    if (data.published === true) {
      // Create path from file structure
      const relativePath = filePath.replace(contentDir, '').replace(/\.md$/, '')
      const urlPath = `/blog${relativePath}`

      posts.push({
        title: data.title,
        description: data.description,
        slug: data.slug,
        date: data.date,
        published: data.published,
        author: data.author,
        tags: Array.isArray(data.tags) ? data.tags : [],
        _path: urlPath,
        body
      })
    }
  }

  // Sort by date, newest first
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.siteUrl || 'https://www.danvega.dev'

  // Get all blog posts by scanning the content directory
  const contentDir = join(process.cwd(), 'content/blog')
  const posts = await getAllBlogPosts(contentDir)

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