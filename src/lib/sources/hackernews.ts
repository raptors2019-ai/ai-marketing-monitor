import { HNPost } from '@/src/types/feed'

export async function fetchHNPosts() {
  // Multiple search queries to cast a wider net for marketing/AI content
  const queries = [
    'marketing automation',
    'martech',
    'B2B SaaS marketing',
    'marketing AI',
    'personalization engine',
    'lead generation',
    'marketing analytics',
    'customer data platform',
    'email marketing automation',
    'marketing technology',
  ]

  const allHits: HNPost[] = []

  // Fetch results for each query
  for (const query of queries) {
    try {
      // Search stories from last 7 days for relevance
      const url = `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(query)}&tags=story&hitsPerPage=10&numericFilters=created_at_i>${Math.floor(Date.now() / 1000) - 7 * 24 * 60 * 60}`

      const response = await fetch(url)

      if (!response.ok) {
        console.warn(`HN API error for "${query}": ${response.status}`)
        continue
      }

      const data = await response.json()
      allHits.push(...data.hits)

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 300))
    } catch (error) {
      console.warn(`Failed to fetch HN for "${query}":`, error)
      continue
    }
  }

  // Deduplicate by objectID and filter out items without URLs
  const uniqueHits = allHits.filter((hit, index, self) =>
    hit.url && // Must have a URL
    index === self.findIndex((h) => h.objectID === hit.objectID)
  )

  return uniqueHits.slice(0, 25).map((hit: HNPost) => ({
    source: 'hackernews' as const,
    title: hit.title,
    url: hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`,
    author: hit.author,
    published_at: hit.created_at,
  }))
}
