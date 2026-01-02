-- Add new columns for strategic insights
ALTER TABLE feed_items
ADD COLUMN IF NOT EXISTS is_spam BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS content_type VARCHAR(50),
ADD COLUMN IF NOT EXISTS strategic_value TEXT,
ADD COLUMN IF NOT EXISTS themes TEXT[]; -- Array of themes

-- Add indexes for filtering
CREATE INDEX IF NOT EXISTS idx_feed_items_is_spam ON feed_items(is_spam);
CREATE INDEX IF NOT EXISTS idx_feed_items_content_type ON feed_items(content_type);

-- Add comment explaining the schema
COMMENT ON COLUMN feed_items.is_spam IS 'True if content is promotional spam or low-value';
COMMENT ON COLUMN feed_items.content_type IS 'Type of content: Discussion, Question, Case Study, News, or Spam';
COMMENT ON COLUMN feed_items.strategic_value IS 'Strategic intelligence for Demand Spring';
COMMENT ON COLUMN feed_items.themes IS 'Array of specific themes extracted from content';
