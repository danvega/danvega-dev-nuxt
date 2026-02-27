import { readdirSync } from 'node:fs'
import { join } from 'node:path'

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif'])

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    return []
  }

  const possibleDirs = [
    join(process.cwd(), 'public', 'images', 'speaking', slug),
    join(process.cwd(), '.output', 'public', 'images', 'speaking', slug)
  ]

  for (const dir of possibleDirs) {
    try {
      const files = readdirSync(dir)
      const images = files
        .filter((file) => {
          const ext = file.substring(file.lastIndexOf('.')).toLowerCase()
          return IMAGE_EXTENSIONS.has(ext)
        })
        .sort()
        .map((filename, index) => ({
          id: index + 1,
          src: `/images/speaking/${slug}/${filename}`,
          alt: filename
            .replace(/^\d+-/, '')
            .replace(/\.[^.]+$/, '')
            .replace(/[-_]/g, ' '),
          filename
        }))

      return images
    } catch {
      // Directory doesn't exist, try next path
    }
  }

  return []
})
