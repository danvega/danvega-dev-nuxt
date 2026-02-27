import { readdir, writeFile, mkdir } from 'fs/promises'
import { join, extname } from 'path'

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif'])

async function generateSpeakingPhotos() {
  try {
    const speakingDir = join(process.cwd(), 'public', 'images', 'speaking')
    const entries = await readdir(speakingDir, { withFileTypes: true })
    const manifest = {}

    for (const entry of entries) {
      if (!entry.isDirectory()) continue

      const slug = entry.name
      const slugDir = join(speakingDir, slug)
      const files = await readdir(slugDir)

      const images = files
        .filter((file) => IMAGE_EXTENSIONS.has(extname(file).toLowerCase()))
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

      if (images.length > 0) {
        manifest[slug] = images
      }
    }

    // Write manifest as a TS file the server route can import
    const outputDir = join(process.cwd(), 'server', 'data')
    await mkdir(outputDir, { recursive: true })

    const outputPath = join(outputDir, 'speaking-photos.ts')
    const tsContent = `// Auto-generated speaking photo manifest - do not edit manually
export const speakingPhotos: Record<string, Array<{ id: number; src: string; alt: string; filename: string }>> = ${JSON.stringify(manifest, null, 2)}
`
    await writeFile(outputPath, tsContent)

    const totalPhotos = Object.values(manifest).reduce((sum, photos) => sum + photos.length, 0)
    console.log(`Generated speaking photos manifest: ${Object.keys(manifest).length} talks, ${totalPhotos} photos`)
    console.log(`Written to ${outputPath}`)

    return manifest
  } catch (error) {
    console.error('Error generating speaking photos manifest:', error)
    return {}
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateSpeakingPhotos()
}

export { generateSpeakingPhotos }
