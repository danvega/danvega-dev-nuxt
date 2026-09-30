import { execFileSync } from 'child_process'
import { copyFile, mkdir, mkdtemp, readdir, readFile, rm, stat, writeFile } from 'fs/promises'
import { existsSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'

// Import a slide deck PDF for a talk:
//   node scripts/import-slides.js <path/to/deck.pdf> <talk-slug>
//
// Writes public/slides/<slug>/ with the PDF (for download), one WebP per
// slide, and slides.json (dimensions + per-slide text for alt text and SEO).
// Then regenerates server/data/slides.ts. Needs poppler and webp:
//   brew install poppler webp
// PDFs over 20MB are shrunk for the download copy if Ghostscript is
// installed (brew install ghostscript). Slide images always render from
// the original.

const SLIDE_WIDTH = 1920
const WEBP_QUALITY = '80'
const COMPRESS_OVER_BYTES = 20 * 1024 * 1024

const slidesRoot = join(process.cwd(), 'public', 'slides')

function run(cmd, args) {
  return execFileSync(cmd, args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
}

function hasCommand(cmd) {
  try {
    execFileSync('which', [cmd], { stdio: 'ignore' })
    return true
  } catch {
    return false
  }
}

// Copy the PDF people download, shrinking big ones with Ghostscript.
// Keeps the original if compression fails or doesn't help.
async function writeDownloadPdf(pdfPath, dest) {
  const { size } = await stat(pdfPath)
  if (size > COMPRESS_OVER_BYTES && hasCommand('gs')) {
    try {
      execFileSync('gs', ['-q', '-dNOPAUSE', '-dBATCH', '-dSAFER', '-sDEVICE=pdfwrite',
        '-dCompatibilityLevel=1.6', '-dPDFSETTINGS=/ebook', `-sOutputFile=${dest}`, pdfPath], { stdio: 'ignore' })
      const { size: compressed } = await stat(dest)
      if (compressed < size) {
        console.log(`Compressed download PDF from ${(size / 1e6).toFixed(1)}MB to ${(compressed / 1e6).toFixed(1)}MB`)
        return compressed
      }
    } catch {
      // fall through to a plain copy
    }
  } else if (size > COMPRESS_OVER_BYTES) {
    console.warn(`PDF is ${(size / 1e6).toFixed(1)}MB. Install Ghostscript to shrink it: brew install ghostscript`)
  }
  await copyFile(pdfPath, dest)
  return size
}

function cleanText(text) {
  return text.replace(/\s+/g, ' ').trim()
}

export async function importSlides(pdfPath, slug) {
  if (!existsSync(pdfPath)) {
    throw new Error(`PDF not found: ${pdfPath}`)
  }

  const outDir = join(slidesRoot, slug)
  await rm(outDir, { recursive: true, force: true })
  await mkdir(outDir, { recursive: true })

  const pdfName = `${slug}.pdf`
  const pdfSize = await writeDownloadPdf(pdfPath, join(outDir, pdfName))

  const info = run('pdfinfo', [pdfPath])
  const pages = Number(info.match(/Pages:\s+(\d+)/)?.[1])
  const [, w, h] = info.match(/Page size:\s+([\d.]+) x ([\d.]+)/) ?? []
  const width = SLIDE_WIDTH
  const height = Math.round(SLIDE_WIDTH * (Number(h) / Number(w)))

  // Render every page to PNG, then encode as WebP
  const tmp = await mkdtemp(join(tmpdir(), 'slides-'))
  run('pdftoppm', ['-png', '-scale-to-x', String(width), '-scale-to-y', String(height), pdfPath, join(tmp, 'page')])
  const pngs = (await readdir(tmp)).filter((f) => f.endsWith('.png')).sort()

  const slides = []
  for (const [i, png] of pngs.entries()) {
    const n = i + 1
    const filename = `${String(n).padStart(3, '0')}.webp`
    run('cwebp', ['-quiet', '-q', WEBP_QUALITY, join(tmp, png), '-o', join(outDir, filename)])
    const text = cleanText(run('pdftotext', ['-f', String(n), '-l', String(n), pdfPath, '-']))
    slides.push({ src: `/slides/${slug}/${filename}`, text })
  }
  await rm(tmp, { recursive: true, force: true })

  if (slides.length !== pages) {
    throw new Error(`Expected ${pages} slides, rendered ${slides.length}`)
  }

  const deck = { pdf: `/slides/${slug}/${pdfName}`, pdfSize, width, height, slides }
  await writeFile(join(outDir, 'slides.json'), JSON.stringify(deck, null, 2) + '\n')
  console.log(`Imported ${slides.length} slides into ${outDir}`)

  await generateSlidesManifest()
}

// Collect every public/slides/<slug>/slides.json into one TS module the
// server route can import (public/ isn't readable from the Netlify function)
export async function generateSlidesManifest() {
  const manifest = {}

  if (existsSync(slidesRoot)) {
    const entries = await readdir(slidesRoot, { withFileTypes: true })
    for (const entry of entries.filter((e) => e.isDirectory()).sort((a, b) => a.name.localeCompare(b.name))) {
      const file = join(slidesRoot, entry.name, 'slides.json')
      if (existsSync(file)) {
        manifest[entry.name] = JSON.parse(await readFile(file, 'utf8'))
      }
    }
  }

  const outputDir = join(process.cwd(), 'server', 'data')
  await mkdir(outputDir, { recursive: true })
  const outputPath = join(outputDir, 'slides.ts')
  await writeFile(outputPath, `// Auto-generated slide deck manifest - do not edit manually
// Regenerate with: node scripts/import-slides.js <deck.pdf> <talk-slug>
export interface SlideDeck {
  pdf: string
  pdfSize: number
  width: number
  height: number
  slides: Array<{ src: string; text: string }>
}

export const slideDecks: Record<string, SlideDeck> = ${JSON.stringify(manifest, null, 2)}
`)
  console.log(`Generated slides manifest: ${Object.keys(manifest).length} decks`)
  return manifest
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const [pdfPath, slug] = process.argv.slice(2)
  if (!pdfPath || !slug) {
    console.error('Usage: node scripts/import-slides.js <path/to/deck.pdf> <talk-slug>')
    process.exit(1)
  }
  importSlides(pdfPath, slug).catch((error) => {
    console.error(error.message)
    process.exit(1)
  })
}
