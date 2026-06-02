
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

-- Insert Storage Bucket (needs to be run in Supabase SQL editor as well, or manually created)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('oryx-documents', 'oryx-documents', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policy for oryx-documents
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'oryx-documents');
