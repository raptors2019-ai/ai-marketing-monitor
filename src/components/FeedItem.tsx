'use client'

import { FeedItem as FeedItemType } from '@/src/types/feed'

const sourceColors = {
  reddit: 'bg-orange-100 text-orange-700',
  hackernews: 'bg-amber-100 text-amber-700',
  producthunt: 'bg-red-100 text-red-700',
}

const sourceIcons = {
  reddit: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
    </svg>
  ),
  hackernews: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M0 0v24h24V0H0zm12.2 13.9l-2.9 5.8H7.5l3.3-6.5-3.5-6.3H9l2.7 5.1 2.7-5.1h1.7l-3.5 6.3 3.3 6.5h-1.8l-2.9-5.8z"/>
    </svg>
  ),
  producthunt: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M13.604 8.4h-3.405V12h3.405a1.8 1.8 0 0 0 0-3.6zM12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm1.604 14.4h-3.405V18H7.801V6h5.803a4.2 4.2 0 1 1 0 8.4z"/>
    </svg>
  ),
}

export function FeedItem({ item }: { item: FeedItemType }) {
  const sourceColor = sourceColors[item.source] || 'bg-gray-100 text-gray-700'
  const sourceIcon = sourceIcons[item.source]

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200 overflow-hidden group">
      <div className="p-6">
        {/* Header with title and source */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <h3 className="text-xl font-bold text-[#262626] flex-1 leading-tight">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#65BC4B] transition-colors group-hover:underline"
            >
              {item.title}
            </a>
          </h3>
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 ${sourceColor}`}>
            {sourceIcon}
            <span className="capitalize">{item.source === 'hackernews' ? 'HN' : item.source === 'producthunt' ? 'PH' : item.source}</span>
          </div>
        </div>

        {/* Content Type Badge */}
        {item.content_type && (
          <div className="mb-3">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
              item.content_type === 'Question' ? 'bg-blue-100 text-blue-700' :
              item.content_type === 'Discussion' ? 'bg-green-100 text-green-700' :
              item.content_type === 'Case Study' ? 'bg-purple-100 text-purple-700' :
              'bg-gray-100 text-gray-700'
            }`}>
              {item.content_type === 'Question' && '❓'}
              {item.content_type === 'Discussion' && '💬'}
              {item.content_type === 'Case Study' && '📊'}
              {item.content_type === 'News' && '📰'}
              {item.content_type}
            </span>
          </div>
        )}

        {/* Strategic Intelligence */}
        {item.key_insights && (
          <div className="mb-4 p-4 bg-[#65BC4B]/5 border-l-4 border-[#65BC4B] rounded">
            <div className="flex items-start gap-2 mb-2">
              <svg className="w-4 h-4 text-[#65BC4B] mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
              </svg>
              <div className="flex-1">
                <p className="text-xs font-semibold text-[#65BC4B] uppercase mb-1">Strategic Insight</p>
                <p className="text-gray-700 text-sm leading-relaxed font-medium">{item.key_insights}</p>
              </div>
            </div>
          </div>
        )}

        {/* Strategic Value */}
        {item.strategic_value && (
          <div className="mb-4 p-3 bg-amber-50 border-l-4 border-amber-400 rounded">
            <div className="flex items-start gap-2">
              <svg className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
              </svg>
              <div className="flex-1">
                <p className="text-xs font-semibold text-amber-700 uppercase mb-1">Why This Matters</p>
                <p className="text-gray-700 text-xs leading-relaxed">{item.strategic_value}</p>
              </div>
            </div>
          </div>
        )}

        {/* Themes */}
        {item.themes && item.themes.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="text-xs text-gray-500 font-semibold">Themes:</span>
            {item.themes.map((theme, idx) => (
              <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                {theme}
              </span>
            ))}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {item.use_case_type && (
            <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full font-medium border border-blue-200">
              {item.use_case_type}
            </span>
          )}
          {item.industry && (
            <span className="text-xs bg-[#65BC4B]/10 text-[#65BC4B] px-3 py-1.5 rounded-full font-medium border border-[#65BC4B]/20">
              {item.industry}
            </span>
          )}
          {item.tool_category && (
            <span className="text-xs bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full font-medium border border-purple-200">
              {item.tool_category}
            </span>
          )}
          {item.maturity_level && (
            <span className="text-xs bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full font-medium border border-amber-200">
              {item.maturity_level}
            </span>
          )}
        </div>

        {/* Footer with author and relevance score */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>{item.author || 'Unknown'}</span>
          </div>
          {item.relevance_score && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 font-medium">B2B Relevance</span>
              <div className="flex items-center gap-1 bg-[#65BC4B] text-white px-3 py-1 rounded-full">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span className="font-bold">{item.relevance_score}/10</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
