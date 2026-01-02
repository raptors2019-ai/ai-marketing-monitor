export async function fetchProductHuntPosts() {
  const url = 'https://www.producthunt.com/feed'

  const response = await fetch(url)

  if (!response.ok) throw new Error(`PH RSS error: ${response.status}`)

  const xml = await response.text()

  const items = xml.match(/<item>[\s\S]*?<\/item>/g) || []

  // Keywords to filter for marketing/AI/B2B relevant products
  const marketingKeywords = [
    'marketing', 'martech', 'automation', 'crm', 'email',
    'analytics', 'b2b', 'sales', 'ai', 'personalization',
    'campaign', 'lead', 'customer', 'engagement', 'data',
    'seo', 'content', 'social media', 'advertising', 'conversion',
    'saas', 'platform', 'tool', 'dashboard', 'insights',
    'optimization', 'workflow', 'integration', 'api', 'intelligence'
  ]

  const filteredItems = items
    .map((item) => {
      const title = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] ||
                    item.match(/<title>(.*?)<\/title>/)?.[1] || ''
      const description = item.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/)?.[1] ||
                         item.match(/<description>(.*?)<\/description>/)?.[1] || ''
      const link = item.match(/<link>(.*?)<\/link>/)?.[1] || ''
      const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || ''

      return {
        title: title.replace(/<!\[CDATA\[|\]\]>/g, '').trim(),
        description: description.replace(/<!\[CDATA\[|\]\]>|<[^>]*>/g, '').trim(),
        link,
        pubDate,
      }
    })
    .filter((item) => {
      // Filter for items that mention marketing/AI/B2B keywords
      const text = `${item.title} ${item.description}`.toLowerCase()
      return marketingKeywords.some(keyword => text.includes(keyword.toLowerCase()))
    })
    .slice(0, 25) // Limit to 25 after filtering

  return filteredItems.map((item) => ({
    source: 'producthunt' as const,
    title: item.title,
    content: item.description, // Include description as content for better Claude analysis
    url: item.link,
    published_at: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString(),
  }))
}
