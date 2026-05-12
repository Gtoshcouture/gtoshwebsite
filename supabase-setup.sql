-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)

-- Products table (each product stored as JSONB for flexibility)
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Orders table
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Key-value store for settings, shipping profiles, media, subscribers, reviews, etc.
CREATE TABLE admin_config (
  key TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Allow public access (anon key) — fine for admin-only data
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_products" ON products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "public_orders" ON orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "public_admin_config" ON admin_config FOR ALL USING (true) WITH CHECK (true);
