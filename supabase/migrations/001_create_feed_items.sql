CREATE TABLE feed_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source VARCHAR(50) NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  url TEXT NOT NULL UNIQUE,
  author VARCHAR(255),
  published_at TIMESTAMPTZ,

  use_case_type VARCHAR(100),
  industry VARCHAR(100),
  tool_category VARCHAR(100),
  maturity_level VARCHAR(50),
  key_insights TEXT,
  relevance_score INT,

  processed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_feed_items_source ON feed_items(source);
CREATE INDEX idx_feed_items_use_case ON feed_items(use_case_type);
CREATE INDEX idx_feed_items_industry ON feed_items(industry);
CREATE INDEX idx_feed_items_published ON feed_items(published_at DESC);
CREATE INDEX idx_feed_items_relevance ON feed_items(relevance_score DESC);
