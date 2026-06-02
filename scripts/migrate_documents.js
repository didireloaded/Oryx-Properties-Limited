const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const https = require('https');
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const BASE_URL = 'https://oryxprop.com';
const DOWNLOAD_DIR = path.join(__dirname, '../public/oryx-documents/temp');

if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
}

async function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(destPath);
      });
    }).on('error', (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

function extractYear(text) {
  const match = text.match(/\b(19|20)\d{2}\b/);
  return match ? parseInt(match[0]) : null;
}

async function scrapeDocuments() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  const categories = [
    { name: 'Financial Reports', url: 'https://oryxprop.com/investors/financial-reports/', type: 'report' },
    { name: 'NENS Announcements', url: 'https://oryxprop.com/investors/nens-announcements/', type: 'announcement' },
    { name: 'Circulars', url: 'https://oryxprop.com/investors/circulars/', type: 'circular' },
    { name: 'Debenture Trust Deed', url: 'https://oryxprop.com/investors/debenture-trust-deed/', type: 'governance' },
    { name: 'DMTNP', url: 'https://oryxprop.com/dmtnp/', type: 'governance' }
  ];

  let allDocuments = [];

  for (const cat of categories) {
    console.log(`Scraping category: ${cat.name}`);
    await page.goto(cat.url, { waitUntil: 'networkidle2' });

    // Look for links that are likely documents (e.g. PDF links or text containing 'Download', 'Report', etc.)
    const links = await page.evaluate(() => {
      const anchors = Array.from(document.querySelectorAll('a'));
      return anchors
        .filter(a => {
           const href = a.href.toLowerCase();
           return href.includes('.pdf') || a.innerText.toLowerCase().includes('download') || a.innerText.toLowerCase().includes('report');
        })
        .map(a => ({
          text: a.innerText.trim(),
          href: a.href
        }))
        .filter(link => link.href.startsWith('http') && link.href.includes('oryxprop.com'));
    });
    
    // Remove duplicates
    const uniqueLinks = [];
    const seenHrefs = new Set();
    for(const l of links) {
      if(l.href.includes('.pdf') && !seenHrefs.has(l.href)) {
        seenHrefs.add(l.href);
        uniqueLinks.push(l);
      }
    }

    console.log(`Found ${uniqueLinks.length} PDFs for ${cat.name}`);
    
    for (const link of uniqueLinks) {
      const year = extractYear(link.text) || extractYear(link.href) || new Date().getFullYear();
      let title = link.text || path.basename(link.href);
      if (title.length < 3) title = path.basename(link.href);
      
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const fileName = `${slug}.pdf`;
      const localPath = path.join(DOWNLOAD_DIR, fileName);
      
      console.log(`Downloading: ${title}...`);
      try {
        await downloadFile(link.href, localPath);
        const stats = fs.statSync(localPath);
        const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2) + ' MB';
        
        allDocuments.push({
          title,
          slug,
          category: cat.name,
          year,
          document_type: cat.type,
          original_url: link.href,
          local_path: localPath,
          file_name: fileName,
          file_size: fileSizeInMB,
          published_date: `${year}-01-01`
        });
      } catch (err) {
        console.error(`Failed to download ${link.href}:`, err.message);
      }
    }
  }

  await browser.close();
  
  // Save metadata
  fs.writeFileSync(path.join(DOWNLOAD_DIR, 'metadata.json'), JSON.stringify(allDocuments, null, 2));
  console.log(`Successfully downloaded ${allDocuments.length} documents.`);
  
  // Now upload to Supabase Storage
  console.log('Uploading to Supabase...');
  for (const doc of allDocuments) {
    const fileBuffer = fs.readFileSync(doc.local_path);
    const storagePath = `${doc.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/${doc.file_name}`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('oryx-documents')
      .upload(storagePath, fileBuffer, {
        contentType: 'application/pdf',
        upsert: true
      });
      
    if (uploadError) {
      console.error(`Failed to upload ${doc.file_name}:`, uploadError.message);
      continue;
    }
    
    const { data: publicUrlData } = supabase.storage.from('oryx-documents').getPublicUrl(storagePath);
    const fileUrl = publicUrlData.publicUrl;
    
    // Insert into DB
    const { error: dbError } = await supabase.from('documents').upsert({
      title: doc.title,
      slug: doc.slug,
      category: doc.category,
      year: doc.year,
      published_date: doc.published_date,
      document_type: doc.document_type,
      file_url: fileUrl,
      file_size: doc.file_size
    }, { onConflict: 'slug' });
    
    if (dbError) {
      console.error(`Failed to insert DB record for ${doc.title}:`, dbError.message);
    } else {
      console.log(`Successfully migrated: ${doc.title}`);
    }
  }
  
  console.log('Migration complete!');
}

scrapeDocuments().catch(console.error);
