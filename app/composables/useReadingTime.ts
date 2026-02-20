/**
 * Extracts text from Nuxt Content body and estimates reading time.
 * Handles minimark format (v3), AST format, and buffer/array formats.
 * Assumes 200 words per minute average reading speed.
 */

function extractTextFromNode(node: any): string {
  if (!node) return ''
  if (typeof node === 'string') return node

  // Text node
  if (node.type === 'text' && typeof node.value === 'string') {
    return node.value
  }

  // Recursively extract from children
  if (Array.isArray(node.children)) {
    return node.children.map(extractTextFromNode).join(' ')
  }

  // Array of nodes
  if (Array.isArray(node)) {
    return node.map(extractTextFromNode).join(' ')
  }

  // Minimark/minimal with string value
  if (typeof node.value === 'string') {
    return node.value.replace(/[#*_~`\[\]()>|\\{}]/g, ' ')
  }

  // Minimark/minimal with array/buffer value - try to stringify
  if (node.value != null) {
    try {
      const str = String(node.value)
      return str.replace(/[#*_~`\[\]()>|\\{}]/g, ' ')
    } catch {
      return ''
    }
  }

  return ''
}

export function useReadingTime(body: any): { minutes: number; text: string } {
  if (!body) return { minutes: 0, text: '0 min read' }

  try {
    const content = extractTextFromNode(body)
    const words = content.trim().split(/\s+/).filter(Boolean).length
    const minutes = Math.max(1, Math.round(words / 200))

    return {
      minutes,
      text: `${minutes} min read`
    }
  } catch {
    return { minutes: 0, text: '' }
  }
}
