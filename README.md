# AI Marketing Intelligence Monitor

A showcase project for Demand Spring that demonstrates AI + automation skills through a marketing intelligence monitoring tool.

## Features

- **Multi-Source Aggregation**: Fetches from Reddit, Hacker News, Product Hunt
- **AI-Powered Categorization**: Claude AI categorizes by use case, industry, tool category, maturity
- **Intelligent Insights**: 2-3 sentence summaries for each post
- **Relevance Scoring**: 1-10 B2B relevance scores for prioritization
- **Real-Time Refresh**: Manual trigger for on-demand updates

## Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Supabase (PostgreSQL)
- Anthropic Claude API (Sonnet 4.5)
- Tailwind CSS

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment variables are already set up in `.env.local`**

3. **Run database migration:**
   - Go to your Supabase project → SQL Editor
   - Copy the contents of `supabase/migrations/001_create_feed_items.sql`
   - Paste and click "Run"

4. **Start dev server:**
   ```bash
   npm run dev
   ```

5. **Visit http://localhost:3000**
   - Landing page will show overview
   - Click "View Dashboard"
   - Click "Refresh Feed" to fetch and process content

## Demo Flow

1. **Landing Page**: Clean intro with CTA
2. **Dashboard**: Click "Refresh Feed" button
3. **Watch Processing**: Fetches posts from 3 sources → Claude categorizes → displays results
4. **Explore Content**: View categorized posts with insights and relevance scores

## Business Value for Demand Spring

- **Stay Ahead**: Track AI marketing trends in real-time
- **Client Intelligence**: Understand what B2B marketers are discussing
- **Thought Leadership**: Identify emerging topics for content/services
- **Competitive Research**: Monitor tool launches and trends

## Credits

Built by Joshua Singarayer for Demand Spring
