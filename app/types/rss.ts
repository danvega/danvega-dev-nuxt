// RSS Feed Types
export interface RSSItem {
  title: string
  description: string
  link: string
  guid: string
  pubDate: string
  author: string
  categories: string[]
}

export interface RSSFeed {
  title: string
  description: string
  link: string
  language: string
  lastBuildDate: string
  managingEditor: string
  webMaster: string
  items: RSSItem[]
}