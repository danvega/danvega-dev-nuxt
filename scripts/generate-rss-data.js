import { readdir, readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import matter from 'gray-matter'

// Function to recursively get all markdown files
async function getAllMarkdownFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []

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

async function generateRSSData() {
  try {
    const contentDir = join(process.cwd(), 'content/blog')
    const markdownFiles = await getAllMarkdownFiles(contentDir)
    const posts = []

    console.log(`Processing ${markdownFiles.length} markdown files...`)

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
        console.warn(`Skipping file ${filePath}:`, fileError.message)
        continue
      }
    }

    // Sort by date (newest first) and take top 50
    const sortedPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 50)

    // Write RSS data to TypeScript file for server import
    const tsOutputPath = join(process.cwd(), 'server/api/feed/data.ts')

    const tsContent = `// Auto-generated RSS data - do not edit manually
export const rssData = ${JSON.stringify(sortedPosts, null, 2)} as const
`
    await writeFile(tsOutputPath, tsContent)

    console.log(`Generated RSS data with ${sortedPosts.length} published posts`)
    console.log(`RSS data written to ${tsOutputPath}`)

    return sortedPosts
  } catch (error) {
    console.error('Error generating RSS data:', error)
    return []
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateRSSData()
}

export { generateRSSData }