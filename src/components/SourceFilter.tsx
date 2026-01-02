'use client'

import { useState } from 'react'
import { FeedItem as FeedItemComponent } from './FeedItem'
import { FeedItem as FeedItemType } from '@/src/types/feed'

type Source = 'reddit' | 'hackernews' | 'producthunt'

interface SourceFilterProps {
  items: FeedItemType[]
}

export function SourceFilter({ items }: SourceFilterProps) {
  // Track selected sources - empty array means "show all"
  const [selectedSources, setSelectedSources] = useState<Source[]>([])

  // Count items by source
  const counts = {
    reddit: items.filter(item => item.source === 'reddit').length,
    hackernews: items.filter(item => item.source === 'hackernews').length,
    producthunt: items.filter(item => item.source === 'producthunt').length,
  }

  // Toggle source selection
  const toggleSource = (source: Source) => {
    setSelectedSources(prev => {
      if (prev.includes(source)) {
        // Remove from selection
        return prev.filter(s => s !== source)
      } else {
        // Add to selection
        return [...prev, source]
      }
    })
  }

  // Filter items: if nothing selected, show all; otherwise show only selected
  const filteredItems = selectedSources.length === 0
    ? items
    : items.filter(item => selectedSources.includes(item.source))

  const sourceButtons: Array<{ key: Source; label: string; icon: string; color: string }> = [
    { key: 'reddit', label: 'Reddit', icon: '🔴', color: 'bg-orange-100 text-orange-800 hover:bg-orange-200 border-orange-300' },
    { key: 'hackernews', label: 'Hacker News', icon: '🟧', color: 'bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-300' },
    { key: 'producthunt', label: 'Product Hunt', icon: '🟥', color: 'bg-red-100 text-red-800 hover:bg-red-200 border-red-300' },
  ]

  return (
    <div>
      {/* Filter Buttons */}
      <div className="mb-6 bg-white rounded-lg shadow-md p-4 border border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span className="text-sm font-semibold text-gray-700 uppercase">Filter by Source</span>
          </div>
          {selectedSources.length > 0 && (
            <button
              onClick={() => setSelectedSources([])}
              className="text-xs text-gray-600 hover:text-[#65BC4B] font-semibold underline"
            >
              Clear filters
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          {sourceButtons.map(({ key, label, icon, color }) => {
            const isSelected = selectedSources.includes(key)
            return (
              <button
                key={key}
                onClick={() => toggleSource(key)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all border-2
                  ${isSelected
                    ? 'bg-[#65BC4B] text-white shadow-md ring-2 ring-[#65BC4B] ring-offset-2 border-[#65BC4B]'
                    : `${color} border-transparent`
                  }
                `}
              >
                {/* Checkbox indicator */}
                <div className={`
                  w-4 h-4 rounded border-2 flex items-center justify-center
                  ${isSelected
                    ? 'bg-white border-white'
                    : 'bg-white border-gray-400'
                  }
                `}>
                  {isSelected && (
                    <svg className="w-3 h-3 text-[#65BC4B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span>{icon}</span>
                <span>{label}</span>
                <span className={`
                  ml-1 px-2 py-0.5 rounded-full text-xs font-bold
                  ${isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-white/60'
                  }
                `}>
                  {counts[key]}
                </span>
              </button>
            )
          })}
        </div>

        {/* Status text */}
        <div className="mt-3 text-xs text-gray-600">
          {selectedSources.length === 0 ? (
            <span>Showing all sources • Click to filter specific sources</span>
          ) : (
            <span>
              Showing {selectedSources.length} source{selectedSources.length > 1 ? 's' : ''} •
              {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-[#65BC4B]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">SHOWING INSIGHTS</p>
            <p className="text-3xl font-bold text-[#262626]">{filteredItems.length}</p>
            {filteredItems.length !== items.length && (
              <p className="text-xs text-gray-500 mt-1">of {items.length} total</p>
            )}
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 mb-1">SORTED BY</p>
            <p className="text-lg font-semibold text-[#65BC4B]">Relevance Score</p>
          </div>
        </div>
      </div>

      {/* Feed Items */}
      {filteredItems.length > 0 ? (
        <div className="space-y-6">
          {filteredItems.map((item) => (
            <FeedItemComponent key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <div className="max-w-md mx-auto">
            <p className="text-gray-600 text-lg mb-2">No insights for selected sources</p>
            <p className="text-gray-500 text-sm">Try selecting different sources or clearing the filter</p>
          </div>
        </div>
      )}
    </div>
  )
}
