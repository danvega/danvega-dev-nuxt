// Tags come from hand-written frontmatter, so one topic arrives spelled several
// ways ("Spring Boot", "spring boot", "Spring boot"). `tagKey` folds those onto a
// single key; TAG_DISPLAY_NAMES decides how the survivor is spelled. Counts can't
// make that call — the most-used casing is often the wrong one ("spring" outnumbers
// "Spring" 43 to 6.)

// Merges that survive lowercasing: different words, same topic.
const TAG_ALIASES: Record<string, string> = {
  'spring-ai': 'spring ai',
  'artificial intelligence (ai)': 'ai',
  'vue3': 'vue',
  'vuejs': 'vue',
  'nodejs': 'node',
  'node.js': 'node'
}

const TAG_DISPLAY_NAMES: Record<string, string> = {
  'ai': 'AI',
  'angular': 'Angular',
  'aws': 'AWS',
  'blogging': 'Blogging',
  'conference': 'Conference',
  'goals': 'Goals',
  'grails': 'Grails',
  'graphql': 'GraphQL',
  'gridsome': 'Gridsome',
  'groovy': 'Groovy',
  'java': 'Java',
  'javascript': 'JavaScript',
  'mcp': 'MCP',
  'meta': 'Meta',
  'node': 'Node.js',
  'npm': 'npm',
  'software development': 'Software Development',
  'spring': 'Spring',
  'spring ai': 'Spring AI',
  'spring boot': 'Spring Boot',
  'spring boot 4': 'Spring Boot 4',
  'spring data': 'Spring Data',
  'spring framework': 'Spring Framework',
  'spring modulith': 'Spring Modulith',
  'spring security': 'Spring Security',
  'sql': 'SQL',
  'vue': 'Vue',
  'youtube': 'YouTube'
}

// Below this, a tag is a one-off that makes the browse page look padded rather
// than useful. Raise it to show fewer, broader topics.
export const TAG_MIN_POSTS = 3

// The `tags: z.array(z.string())` schema does not reject a scalar, so hand-written
// `tags: courses` reaches us as a string — and iterating a string yields letters,
// which is how tags named "c", "o", "u", "r", "s", "e" once shipped. Coerce once,
// here, so nothing downstream has to care.
export const toTags = (tags: unknown): string[] => {
  const list = Array.isArray(tags) ? tags : [tags]
  return list.filter((tag): tag is string => typeof tag === 'string' && tag.trim() !== '')
}

// The identity of a tag for grouping and filtering. Never render this.
export const tagKey = (tag: string): string => {
  const key = tag.trim().toLowerCase()
  return TAG_ALIASES[key] ?? key
}

// How a tag is spelled on screen and in `?tag=` links.
export const tagDisplayName = (tag: string): string =>
  TAG_DISPLAY_NAMES[tagKey(tag)] ?? tag.trim()
