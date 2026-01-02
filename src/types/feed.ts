export interface FeedItem {
  id: string
  source: 'reddit' | 'hackernews' | 'producthunt'
  title: string
  content?: string
  url: string
  author?: string
  published_at?: string

  // AI Analysis
  is_spam?: boolean
  content_type?: string
  strategic_value?: string
  key_insights?: string
  themes?: string[]

  // Categories
  use_case_type?: string
  industry?: string
  tool_category?: string
  maturity_level?: string
  relevance_score?: number

  processed: boolean
  created_at: string
}

export interface RedditPost {
  data: {
    title: string
    selftext: string
    url: string
    author: string
    created_utc: number
    permalink: string
  }
}

export interface HNPost {
  title: string
  url: string
  author: string
  created_at: string
  objectID: string
}
