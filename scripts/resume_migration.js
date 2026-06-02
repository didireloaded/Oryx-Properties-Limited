const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const DOWNLOAD_DIR = path.join(__dirname, '../public/oryx-documents/temp');

async function migrateToSupabase() {
  const metadataPath = path.join(DOWNLOAD_DIR, 'metadata.json');
  if (!fs.existsSync(metadataPath)) {
    console.error('No metadata.json found. Run the full scraper first.');
    return;
  }

  const allDocuments = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
  console.log(`Found ${allDocuments.length} documents in metadata.json.`);
  console.log('Uploading to Supabase...');

  for (const doc of allDocuments) {
    if (!fs.existsSync(doc.local_path)) {
      console.warn(`File not found locally: ${doc.local_path}, skipping...`);
      continue;
    }

    const fileBuffer = fs.readFileSync(doc.local_path);
    const storagePath = `${doc.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/${doc.file_name}`;
    
    // Upload file
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('oryx-documents')
      .upload(storagePath, fileBuffer, {
        contentType: 'application/pdf',
        upsert: true
      });
      
    if (uploadError && uploadError.statusCode !== '409') { // Ignore "already exists" errors if using upsert fails on some storage settings
      console.error(`Failed to upload ${doc.file_name}:`, uploadError.message);
      continue;
    }
    
    const { data: publicUrlData } = supabase.storage.from('oryx-documents').getPublicUrl(storagePath);
    const fileUrl = publicUrlData.publicUrl;
    
    // Check if it already exists in DB
    const { data: existing } = await supabase
      .from('documents')
      .select('id')
      .eq('slug', doc.slug)
      .limit(1);

    if (existing && existing.length > 0) {
      console.log(`Updating existing record: ${doc.title}`);
      const { error: dbError } = await supabase.from('documents')
        .update({
          title: doc.title,
          category: doc.category,
          year: doc.year,
          published_date: doc.published_date,
          document_type: doc.document_type,
          file_url: fileUrl,
          file_size: doc.file_size
        })
        .eq('slug', doc.slug);
      
      if (dbError) console.error(`Failed to update DB record for ${doc.title}:`, dbError.message);
      else console.log(`Successfully updated: ${doc.title}`);
    } else {
      console.log(`Inserting new record: ${doc.title}`);
      const { error: dbError } = await supabase.from('documents').insert({
        title: doc.title,
        slug: doc.slug,
        category: doc.category,
        year: doc.year,
        published_date: doc.published_date,
        document_type: doc.document_type,
        file_url: fileUrl,
        file_size: doc.file_size
      });
      
      if (dbError) console.error(`Failed to insert DB record for ${doc.title}:`, dbError.message);
      else console.log(`Successfully inserted: ${doc.title}`);
    }
  }
  
  console.log('Migration complete!');
}

migrateToSupabase().catch(console.error);
