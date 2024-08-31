import { defineEventHandler } from 'h3'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

export default defineEventHandler(async (event) => {
    // Get the directory of the current file
    const currentDir = path.dirname(fileURLToPath(import.meta.url))

    // Navigate up to the project root (assuming standard Nuxt structure)
    const projectRoot = path.resolve(currentDir, '../../')

    const photosDir = path.join(projectRoot, 'public/images/photos')

    console.log('Project Root:', projectRoot)
    console.log('Photos Directory:', photosDir)

    try {
        const files = await fs.promises.readdir(photosDir)
        const photoFiles = files.filter(file =>
            ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(path.extname(file).toLowerCase())
        )

        const photos = await Promise.all(photoFiles.map(async (file, index) => {
            const filePath = path.join(photosDir, file)
            const stats = await fs.promises.stat(filePath)

            // You might want to use a library like 'image-size' for more accurate dimensions
            // For this example, we'll just return placeholder dimensions
            return {
                id: index + 1,
                filename: file,
                width: 1024,  // placeholder width
                height: 768,  // placeholder height
                alt: `Photo of ${path.parse(file).name}`,
                size: stats.size,
                lastModified: stats.mtime
            }
        }))

        return photos
    } catch (error) {
        console.error('Error reading photos directory:', error)
        event.node.res.statusCode = 500
        return { error: 'Failed to read photos directory' }
    }
})