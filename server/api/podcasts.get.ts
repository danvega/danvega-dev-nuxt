interface FeedConfig {
  slug: string
  feed: string
  site: string
  // 'site' derives springofficehours.io/episodes/<slug> URLs from episode titles;
  // 'feed' uses the share.transistor.fm link from the RSS item (fundamentalsofswe.com has no episode pages)
  linkStrategy: 'site' | 'feed'
}

export interface PodcastEpisode {
  title: string
  date: string
  dateLabel: string
  duration: string
  url: string
}

export interface PodcastShowFeed {
  slug: string
  episodeCount: number
  episodes: PodcastEpisode[]
}

const FEEDS: FeedConfig[] = [
  {
    slug: 'spring-office-hours',
    feed: 'https://feeds.transistor.fm/spring-office-hours',
    site: 'https://springofficehours.io',
    linkStrategy: 'site'
  },
  {
    slug: 'fundamentals-of-software-engineering',
    feed: 'https://feeds.transistor.fm/fundamentals-of-software-engineering',
    site: 'https://fundamentalsofswe.com',
    linkStrategy: 'feed'
  }
]

const EPISODES_PER_SHOW = 3

function extractTag(xml: string, tag: string): string {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`))
  if (!match) return ''
  return match[1].replace(/^<!\[CDATA\[([\s\S]*?)\]\]>$/, '$1').trim()
}

function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
}

// Transistor slugifies episode titles: lowercase, apostrophes removed, everything else non-alphanumeric to hyphens
function transistorSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function formatDuration(raw: string): string {
  if (!raw) return ''
  let seconds: number
  if (raw.includes(':')) {
    seconds = raw.split(':').reduce((total, part) => total * 60 + Number(part), 0)
  } else {
    seconds = Number(raw)
  }
  if (!Number.isFinite(seconds) || seconds <= 0) return ''
  return `${Math.round(seconds / 60)} min`
}

function parseFeed(xml: string, config: FeedConfig): PodcastShowFeed {
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => m[1])

  const episodes: PodcastEpisode[] = items.slice(0, EPISODES_PER_SHOW).map((item) => {
    const title = decodeEntities(extractTag(item, 'title'))
    const pubDate = new Date(extractTag(item, 'pubDate'))
    const feedLink = extractTag(item, 'link')

    const url = config.linkStrategy === 'site' && title
      ? `${config.site}/episodes/${transistorSlug(title)}`
      : feedLink || config.site

    return {
      title,
      date: pubDate.toISOString().slice(0, 10),
      dateLabel: pubDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'America/New_York' }),
      duration: formatDuration(extractTag(item, 'itunes:duration')),
      url
    }
  })

  return { slug: config.slug, episodeCount: items.length, episodes }
}

export default defineCachedEventHandler(async (): Promise<PodcastShowFeed[]> => {
  const results = await Promise.allSettled(
    FEEDS.map(async (config) => {
      const xml = await $fetch<string>(config.feed, { responseType: 'text' })
      return parseFeed(xml, config)
    })
  )

  // A failed or empty feed is omitted; the page falls back to its static snapshot for that show
  return results
    .filter((r): r is PromiseFulfilledResult<PodcastShowFeed> => r.status === 'fulfilled')
    .map((r) => r.value)
    .filter((show) => show.episodes.length > 0)
}, {
  name: 'podcasts-feeds',
  maxAge: 60 * 60,
  staleMaxAge: 60 * 60 * 24
})
