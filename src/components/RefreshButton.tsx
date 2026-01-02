'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function RefreshButton() {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<string>('')
  const router = useRouter()

  const handleRefresh = async () => {
    setLoading(true)
    setStatus('Fetching posts...')

    try {
      // Step 1: Fetch new posts
      const fetchRes = await fetch('/api/fetch-feed', { method: 'POST' })
      const fetchData = await fetchRes.json()
      console.log('Fetch result:', fetchData)

      if (!fetchData.success) {
        throw new Error(fetchData.error || 'Failed to fetch posts')
      }

      setStatus('Analyzing with AI...')

      // Step 2: Process with Claude (if API key is configured)
      const processRes = await fetch('/api/process-claude', { method: 'POST' })
      const processData = await processRes.json()
      console.log('Process result:', processData)

      if (!processData.success) {
        throw new Error(processData.error || 'Failed to process with AI')
      }

      setStatus('Complete!')

      // Refresh the page to show new data
      setTimeout(() => {
        router.refresh()
        setStatus('')
      }, 500)

      // Show success message
      if (fetchData.count > 0) {
        alert(`✅ Success! Processed ${fetchData.count} new posts with AI insights.`)
      } else {
        alert('✅ Feed is up to date. No new posts found.')
      }
    } catch (error) {
      console.error('Refresh error:', error)
      setStatus('')
      alert(`❌ Error: ${error instanceof Error ? error.message : 'Failed to refresh feed'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        onClick={handleRefresh}
        disabled={loading}
        className="flex items-center gap-2 px-6 py-3 bg-[#65BC4B] text-white rounded-lg font-semibold hover:bg-[#5aab42] disabled:bg-gray-400 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:transform-none"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Processing...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Refresh Feed</span>
          </>
        )}
      </button>
      {status && (
        <span className="text-sm text-gray-600 animate-pulse">{status}</span>
      )}
    </div>
  )
}
