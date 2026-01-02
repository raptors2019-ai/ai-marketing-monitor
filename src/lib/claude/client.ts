import Anthropic from '@anthropic-ai/sdk'

export function getClaudeClient() {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY not set')
  }

  return new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  })
}

export async function categorizePosts(posts: Array<{title: string, content?: string}>) {
  const client = getClaudeClient()

  const prompt = `You are analyzing social media posts for Demand Spring, a B2B marketing consultancy specializing in AI and marketing automation.

CRITICAL: Filter out spam and promotional content. Focus on REAL discussions, questions, and insights.

Posts to analyze:
${posts.map((p, i) => `${i+1}. Title: ${p.title}\n   Content: ${p.content || 'N/A'}`).join('\n\n')}

For each post, analyze and return:

1. **is_spam**: true/false - Is this promotional spam, course advertising, or low-value content?
2. **content_type**: One of:
   - "Discussion" - Real conversation about challenges/solutions
   - "Question" - Someone asking for help/advice
   - "Case Study" - Real-world example or experience
   - "News" - Industry news or product launch
   - "Spam" - Promotional/advertising content

3. **strategic_value**: What makes this valuable to Demand Spring?
   - What pain point does it reveal?
   - What trend does it indicate?
   - What opportunity does it suggest?
   - If spam/low-value, explain why it should be filtered

4. **key_insight**: ONE clear sentence about the strategic intelligence (not just a summary of the post)
   Examples:
   - GOOD: "B2B marketers struggle with measuring ROI from AI tools, indicating need for better analytics frameworks"
   - BAD: "Post discusses AI marketing tools"

5. **themes**: Array of specific themes (e.g., "AI adoption barriers", "Data privacy concerns", "Personalization at scale")

6. **use_case_type**: One of [Strategy, Automation, Content, Analytics, Other]
7. **industry**: One of [SaaS, FinServ, Healthcare, Manufacturing, General]
8. **tool_category**: One of [Marketing Automation, AI SDR, Analytics, CRM, Other]
9. **maturity_level**: One of [Experimental, Early Adoption, Mainstream, Mature]
10. **relevance_to_b2b**: Integer 1-10 (give 1-3 to spam/promotional content)

Return ONLY valid JSON array:
[
  {
    "is_spam": false,
    "content_type": "Question",
    "strategic_value": "Reveals gap in market for...",
    "key_insight": "One sentence insight",
    "themes": ["theme1", "theme2"],
    "use_case_type": "Strategy",
    "industry": "SaaS",
    "tool_category": "Marketing Automation",
    "maturity_level": "Early Adoption",
    "relevance_to_b2b": 8
  }
]`

  const response = await client.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 8192,
    messages: [{ role: 'user', content: prompt }],
  })

  const text = response.content[0].type === 'text' ? response.content[0].text : ''

  const jsonMatch = text.match(/\[[\s\S]*\]/)
  if (!jsonMatch) throw new Error('No valid JSON in response')

  return JSON.parse(jsonMatch[0])
}
