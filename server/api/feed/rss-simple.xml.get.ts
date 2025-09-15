// Simple RSS feed without gray-matter dependency for serverless compatibility
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.siteUrl || 'https://www.danvega.dev'

  // Hardcoded sample RSS for testing - replace with actual content later
  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Dan Vega</title>
    <description>Personal site of Dan Vega</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>danvega@gmail.com (Dan Vega)</managingEditor>
    <webMaster>danvega@gmail.com (Dan Vega)</webMaster>
    <item>
      <title>Test RSS Feed</title>
      <description>This is a test RSS feed to verify serverless deployment works</description>
      <link>${baseUrl}/test</link>
      <guid>${baseUrl}/test</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <author>danvega@gmail.com (Dan Vega)</author>
    </item>
  </channel>
</rss>`

  // Set proper headers and return RSS XML
  setHeader(event, 'content-type', 'application/rss+xml; charset=UTF-8')
  setHeader(event, 'cache-control', 's-maxage=86400') // Cache for 24 hours

  return rssXml
})