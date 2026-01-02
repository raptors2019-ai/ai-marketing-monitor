import { NextRequest, NextResponse } from 'next/server'
import { fetchRedditPosts } from '@/src/lib/sources/reddit'
import { fetchHNPosts } from '@/src/lib/sources/hackernews'
import { fetchProductHuntPosts } from '@/src/lib/sources/producthunt'
import { supabaseServer } from '@/src/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const [redditPosts, hnPosts, phPosts] = await Promise.all([
      fetchRedditPosts('marketing', ['AI', 'automation', 'B2B']),
      fetchHNPosts(),
      fetchProductHuntPosts(),
    ])

    const allPosts = [...redditPosts, ...hnPosts, ...phPosts]

    const supabase = await supabaseServer()

    const { data, error } = await supabase
      .from('feed_items')
      .upsert(
        allPosts.map(post => ({
          ...post,
          processed: false,
        })),
        { onConflict: 'url', ignoreDuplicates: true }
      )
      .select()

    if (error) throw error

    return NextResponse.json({
      success: true,
      count: data?.length || 0,
      message: `Fetched ${allPosts.length} posts, inserted ${data?.length || 0} new items`,
    })
  } catch (error) {
    console.error('Fetch feed error:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
