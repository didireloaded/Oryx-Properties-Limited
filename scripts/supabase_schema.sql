-- Supabase Schema for Oryx Properties

-- 1. Properties Table (already created)
CREATE TABLE IF NOT EXISTS public.properties (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL,
  gla TEXT,
  occupancy INTEGER,
  valuation TEXT,
  manager TEXT,
  wale TEXT,
  yield TEXT,
  available BOOLEAN DEFAULT false,
  description TEXT,
  image TEXT,
  tenants JSONB DEFAULT '[]'::jsonb,
  "availableSpaces" JSONB DEFAULT '[]'::jsonb,
  "isLeasing" BOOLEAN DEFAULT false
);

ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
-- Drop policy if exists to avoid errors on rerun
DROP POLICY IF EXISTS "Allow public read access" ON public.properties;
DROP POLICY IF EXISTS "Allow public read access on properties" ON public.properties;
CREATE POLICY "Allow public read access on properties" ON public.properties FOR SELECT USING (true);

-- 2. Timeline Table
CREATE TABLE IF NOT EXISTS public.timeline (
  year INTEGER PRIMARY KEY,
  value BIGINT NOT NULL,
  "formattedValue" TEXT NOT NULL,
  event TEXT NOT NULL,
  impact TEXT NOT NULL,
  "isMilestone" BOOLEAN DEFAULT false
);

ALTER TABLE public.timeline ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access on timeline" ON public.timeline;
CREATE POLICY "Allow public read access on timeline" ON public.timeline FOR SELECT USING (true);

-- 3. Team Table (Optional, based on team.json structure)
CREATE TABLE IF NOT EXISTS public.team (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  category TEXT NOT NULL,
  bio TEXT,
  quals TEXT,
  image TEXT
);

ALTER TABLE public.team ENABLE ROW LEVEL SECURITY;
-- 4. News Table (Optional, based on news.json structure)
CREATE TABLE IF NOT EXISTS public.news (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  date DATE NOT NULL,
  excerpt TEXT,
  link TEXT,
  image TEXT,
  category TEXT,
  type TEXT
);

ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access on news" ON public.news;
CREATE POLICY "Allow public read access on news" ON public.news FOR SELECT USING (true);

-- 5. Investors Table (for Annual Reports, etc.)
CREATE TABLE IF NOT EXISTS public.investors_docs (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  year INTEGER NOT NULL,
  category TEXT NOT NULL,
  link TEXT NOT NULL,
  size TEXT
);

ALTER TABLE public.investors_docs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access on investors_docs" ON public.investors_docs;
CREATE POLICY "Allow public read access on investors_docs" ON public.investors_docs FOR SELECT USING (true);

-- 6. Dividends Table
CREATE TABLE IF NOT EXISTS public.dividends (
  year INTEGER PRIMARY KEY,
  dps NUMERIC NOT NULL,
  yield NUMERIC NOT NULL
);

ALTER TABLE public.dividends ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access on dividends" ON public.dividends;
CREATE POLICY "Allow public read access on dividends" ON public.dividends FOR SELECT USING (true);

-- 7. Calendar Events Table
CREATE TABLE IF NOT EXISTS public.calendar_events (
  id SERIAL PRIMARY KEY,
  date TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT
);

ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access on calendar_events" ON public.calendar_events;
CREATE POLICY "Allow public read access on calendar_events" ON public.calendar_events FOR SELECT USING (true);

-- 8. Sectors Table (Asset Performance)
CREATE TABLE IF NOT EXISTS public.sectors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  share NUMERIC NOT NULL,
  occ NUMERIC NOT NULL,
  assets INTEGER NOT NULL,
  top JSONB DEFAULT '[]'::jsonb
);

ALTER TABLE public.sectors ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access on sectors" ON public.sectors;
CREATE POLICY "Allow public read access on sectors" ON public.sectors FOR SELECT USING (true);

-- 9. Historical Growth Table
CREATE TABLE IF NOT EXISTS public.historical_growth (
  year INTEGER PRIMARY KEY,
  value NUMERIC NOT NULL,
  cap NUMERIC NOT NULL,
  occ NUMERIC NOT NULL,
  div NUMERIC NOT NULL,
  props INTEGER NOT NULL
);

ALTER TABLE public.historical_growth ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access on historical_growth" ON public.historical_growth;
CREATE POLICY "Allow public read access on historical_growth" ON public.historical_growth FOR SELECT USING (true);

-- 10. Inquiries Table (Contact & Leasing Forms)
CREATE TABLE IF NOT EXISTS public.inquiries (
  id SERIAL PRIMARY KEY,
  type TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
-- For inserting inquiries (publicly accessible since it's a contact form)
DROP POLICY IF EXISTS "Allow public insert on inquiries" ON public.inquiries;
CREATE POLICY "Allow public insert on inquiries" ON public.inquiries FOR INSERT TO public WITH CHECK (true);
-- For reading inquiries (admin only, but we'll restrict to authenticated for now)
DROP POLICY IF EXISTS "Allow authenticated read on inquiries" ON public.inquiries;
CREATE POLICY "Allow authenticated read on inquiries" ON public.inquiries FOR SELECT TO authenticated USING (true);

-- 11. Documents Table
CREATE TABLE IF NOT EXISTS public.documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT,
  category TEXT NOT NULL,
  year INTEGER,
  published_date DATE,
  description TEXT,
  document_type TEXT,
  file_url TEXT NOT NULL,
  file_size TEXT,
  page_count INTEGER,
  thumbnail TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access on documents" ON public.documents;
CREATE POLICY "Allow public read access on documents" ON public.documents FOR SELECT USING (true);

-- Storage Bucket (needs to be run in Supabase SQL editor as well, or manually created)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('oryx-documents', 'oryx-documents', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policy for oryx-documents
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'oryx-documents');
