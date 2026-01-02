import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/src/lib/supabase/server'
import { categorizePosts } from '@/src/lib/claude/client'

export async function POST(request: NextRequest) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'ANTHROPIC_API_KEY not configured yet' },
        { status: 503 }
      )
    }

    const supabase = await supabaseServer()

    const { data: unprocessed, error: fetchError } = await supabase
      .from('feed_items')
      .select('*')
      .eq('processed', false)
      .limit(25)

    if (fetchError) throw fetchError
    if (!unprocessed || unprocessed.length === 0) {
      return NextResponse.json({ success: true, message: 'No unprocessed items' })
    }

    const categories = await categorizePosts(
      unprocessed.map(item => ({
        title: item.title,
        content: item.content,
      }))
    )

    const updates = unprocessed.map((item, index) => ({
      ...item, // Keep all original fields
      is_spam: categories[index].is_spam,
      content_type: categories[index].content_type,
      strategic_value: categories[index].strategic_value,
      key_insights: categories[index].key_insight,
      themes: categories[index].themes,
      use_case_type: categories[index].use_case_type,
      industry: categories[index].industry,
      tool_category: categories[index].tool_category,
      maturity_level: categories[index].maturity_level,
      relevance_score: categories[index].relevance_to_b2b,
      processed: true,
    }))

    const { error: updateError } = await supabase
      .from('feed_items')
      .upsert(updates)

    if (updateError) throw updateError

    return NextResponse.json({
      success: true,
      processed: updates.length,
    })
  } catch (error) {
    console.error('Process Claude error:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
