import { supabaseServer } from '@/src/lib/supabase/server'
import { FeedItem } from '@/src/components/FeedItem'
import { RefreshButton } from '@/src/components/RefreshButton'
import { SourceFilter } from '@/src/components/SourceFilter'
import Link from 'next/link'

export default async function Dashboard() {
  const supabase = await supabaseServer()

  const { data: items, error } = await supabase
    .from('feed_items')
    .select('*')
    .eq('processed', true)
    .eq('is_spam', false) // Filter out spam!
    .gte('relevance_score', 5) // Only show items with relevance >= 5
    .order('relevance_score', { ascending: false, nullsFirst: false })
    .order('published_at', { ascending: false })
    .limit(50)

  if (error) {
    console.error('Database error:', error)
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-red-500">
            <h1 className="text-3xl font-bold mb-4 text-[#262626]">Error Loading Feed</h1>
            <p className="text-red-600 mb-4">Database error: {error.message}</p>
            <p className="text-gray-600">
              Make sure you've run the database migration in Supabase SQL Editor.
            </p>
            <Link
              href="/"
              className="inline-block mt-6 px-6 py-3 bg-[#65BC4B] text-white rounded-lg font-semibold hover:bg-[#5aab42] transition-all"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="inline-block">
                <h1 className="text-3xl font-bold text-[#262626] hover:text-[#65BC4B] transition-colors">
                  AI Marketing Intelligence Monitor
                </h1>
              </Link>
              <p className="text-gray-600 mt-1 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-[#65BC4B] rounded-full"></span>
                Track B2B marketing AI trends from Reddit, HN, and Product Hunt
              </p>
            </div>
            <RefreshButton />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {items && items.length > 0 ? (
          <SourceFilter items={items} />
        ) : (
          <div className="text-center py-20 bg-white rounded-lg shadow-md">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-[#65BC4B]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-[#65BC4B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#262626] mb-3">No Insights Yet</h3>
              <p className="text-gray-600 mb-6">
                Click the "Refresh Feed" button above to fetch the latest AI marketing content and generate insights.
              </p>
              <div className="inline-block px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-600">
                <span className="font-semibold">Tip:</span> The first refresh may take a moment as we analyze the content
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            Powered by Claude AI • Built for{' '}
            <span className="text-[#65BC4B] font-semibold">Demand Spring</span>
          </p>
        </div>
      </div>
    </div>
  )
}
