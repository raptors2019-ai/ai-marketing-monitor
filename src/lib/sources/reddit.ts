import { RedditPost } from '@/src/types/feed'

export async function fetchRedditPosts(subreddit: string, keywords: string[]) {
  // Focus on high-quality, discussion-focused subreddits
  // Avoid general "marketing" which has too much spam
  const subreddits = [
    'B2BMarketing',           // B2B specific discussions
    'MarketingAutomation',    // Marketing automation talks
    'digital_marketing',      // Digital marketing strategies
    'PPC',                    // Paid marketing discussions
    'SEO',                    // SEO discussions often mention AI
    'analytics',              // Marketing analytics
    'MarTech',                // Marketing technology
  ]

  const allPosts = []

  // Spam detection keywords - auto-reject posts with these
  const spamKeywords = [
    'udemy', 'course', 'free course', '$', 'to free', 'discount',
    'limited time', 'enroll', 'certification', 'learn how to',
    'step by step', 'beginner', 'masterclass', 'training',
    'get certified', 'coupon'
  ]

  for (const sub of subreddits) {
    try {
      // Use .json endpoint with better headers to avoid 403
      const url = `https://www.reddit.com/r/${sub}/new.json?limit=10`

      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; DemandSpringBot/1.0; +https://demandspring.com)',
          'Accept': 'application/json'
        },
        next: { revalidate: 3600 } // Cache for 1 hour
      })

      if (!response.ok) {
        console.warn(`Reddit r/${sub} returned ${response.status}, skipping...`)
        continue
      }

      const data = await response.json()

      const posts = data.data.children
        .filter((child: { data: RedditPost['data'] }) => {
          const text = `${child.data.title} ${child.data.selftext}`.toLowerCase()

          // REJECT spam first
          if (spamKeywords.some(spam => text.includes(spam))) {
            return false
          }

          // REJECT promotional subreddits
          if (child.data.subreddit?.toLowerCase().includes('udemy') ||
              child.data.subreddit?.toLowerCase().includes('free') ||
              child.data.subreddit?.toLowerCase().includes('course')) {
            return false
          }

          // ACCEPT if it mentions our keywords OR marketing/AI topics
          return keywords.some(keyword => text.includes(keyword.toLowerCase())) ||
                 text.includes('marketing automation') ||
                 text.includes('b2b') ||
                 text.includes('ai marketing') ||
                 text.includes('personalization') ||
                 text.includes('lead generation')
        })
        .map((child: { data: RedditPost['data'] }) => ({
          source: 'reddit' as const,
          title: child.data.title,
          content: child.data.selftext || '',
          url: `https://reddit.com${child.data.permalink}`,
          author: child.data.author,
          published_at: new Date(child.data.created_utc * 1000).toISOString(),
        }))

      allPosts.push(...posts)

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500))
    } catch (error) {
      console.warn(`Failed to fetch from r/${sub}:`, error)
      continue
    }
  }

  // Return unique posts (deduplicate by URL)
  const uniquePosts = allPosts.filter((post, index, self) =>
    index === self.findIndex((p) => p.url === post.url)
  )

  return uniquePosts.slice(0, 25) // Limit to 25 total
}
