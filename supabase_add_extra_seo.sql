-- Add the new column for the second SEO text block
ALTER TABLE routes ADD COLUMN IF NOT EXISTS extra_seo TEXT;
