// server/api/photos.ts

import { defineEventHandler } from 'h3'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

export default defineEventHandler(async (event) => {

    function findPhotosDirectory() {
        const possiblePaths = [
            // Local development & some server setups
            path.resolve(process.cwd(), 'public/images/photos'),
            // Netlify Functions
            path.resolve(process.cwd(), 'images/photos'),
            // Fallback to current file's location
            path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../public/images/photos')
        ];

        for (const possiblePath of possiblePaths) {
            if (fs.existsSync(possiblePath)) {
                return possiblePath;
            }
        }

        throw new Error('Could not find photos directory');
    }

    try {
        const photosDir = findPhotosDirectory();
        const files = await fs.promises.readdir(photosDir);
        const photoFiles = files.filter(file =>
            ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(path.extname(file).toLowerCase())
        );

        const photos = await Promise.all(photoFiles.map(async (file, index) => {
            const filePath = path.join(photosDir, file);
            const stats = await fs.promises.stat(filePath);

            return {
                id: index + 1,
                filename: file,
                src: `/images/photos/${file}`,
                width: 1024,  // placeholder width
                height: 768,  // placeholder height
                alt: `Photo of ${path.parse(file).name}`,
                size: stats.size,
                lastModified: stats.mtime
            };
        }));

        return photos;
    } catch (error) {
        console.error('Detailed error in photos API:', error);
        if (error instanceof Error) {
            console.error('Error name:', error.name);
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
        }
        event.node.res.statusCode = 500;
        return { error: 'Failed to read photos directory', details: error instanceof Error ? error.message : String(error) };
    }
});