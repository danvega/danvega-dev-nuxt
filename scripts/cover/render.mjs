#!/usr/bin/env node
// Render an HTML file to a PNG using headless Chrome (no dependencies).
//
// Usage: node scripts/cover/render.mjs <input.html> <output.png> [WxH] [scale]
//   WxH    viewport in CSS pixels (default 2520x1418, a 16:9 cover)
//   scale  device scale factor (default 2 -> 5040x2836 output)

import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const [input, output, size = '2520x1418', scale = '2'] = process.argv.slice(2)
if (!input || !output) {
  console.error('Usage: node scripts/cover/render.mjs <input.html> <output.png> [WxH] [scale]')
  process.exit(1)
}
if (!existsSync(CHROME)) {
  console.error(`Chrome not found at: ${CHROME}`)
  process.exit(1)
}

const [w, h] = size.split('x').map(Number)
const outPath = resolve(output)
mkdirSync(dirname(outPath), { recursive: true })

execFileSync(CHROME, [
  '--headless',
  '--disable-gpu',
  '--hide-scrollbars',
  `--screenshot=${outPath}`,
  `--window-size=${w},${h}`,
  `--force-device-scale-factor=${scale}`,
  `file://${resolve(input)}`
], { stdio: 'pipe' })

console.log(`rendered ${outPath} (${w * Number(scale)}x${h * Number(scale)})`)
