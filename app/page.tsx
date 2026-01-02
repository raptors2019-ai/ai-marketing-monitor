import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="inline-block px-4 py-2 bg-[#65BC4B]/10 rounded-full mb-6">
              <p className="text-[#65BC4B] font-semibold text-sm">AI-POWERED INTELLIGENCE</p>
            </div>

            <h1 className="text-6xl font-bold mb-6 text-[#262626] leading-tight">
              AI Marketing Intelligence Monitor
            </h1>

            <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto leading-relaxed">
              Track AI marketing trends, tools, and discussions relevant to B2B marketers in real-time.
            </p>

            <p className="text-lg text-[#65BC4B] font-semibold mb-10">
              Built for Demand Spring
            </p>

            <Link
              href="/dashboard"
              className="inline-block px-10 py-4 bg-[#65BC4B] text-white rounded-lg text-lg font-semibold hover:bg-[#5aab42] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#262626]">
            Comprehensive Market Intelligence
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-[#65BC4B]">
              <div className="w-12 h-12 bg-[#65BC4B]/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#65BC4B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#262626]">Multi-Source Aggregation</h3>
              <p className="text-gray-600">Pulls content from Reddit, Hacker News, and Product Hunt automatically</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-[#65BC4B]">
              <div className="w-12 h-12 bg-[#65BC4B]/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#65BC4B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#262626]">AI-Powered Insights</h3>
              <p className="text-gray-600">Claude AI categorizes by use case, industry, and provides key insights</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-[#65BC4B]">
              <div className="w-12 h-12 bg-[#65BC4B]/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#65BC4B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#262626]">Relevance Scoring</h3>
              <p className="text-gray-600">1-10 B2B relevance scores help prioritize what matters most</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#65BC4B] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Marketing Intelligence?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Discover how AI-driven insights can elevate your B2B marketing strategy
          </p>
          <Link
            href="/dashboard"
            className="inline-block px-10 py-4 bg-white text-[#65BC4B] rounded-lg text-lg font-semibold hover:bg-gray-50 transition-all shadow-lg"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  )
}
