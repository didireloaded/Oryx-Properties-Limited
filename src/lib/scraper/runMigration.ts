import puppeteer, { Page } from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials for migration script");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Target URLs for the migration
const SOURCES = {
  about: 'https://oryxprop.com/about-oryx-properties/',
  properties: 'https://oryxprop.com/our-properties/',
  investors: 'https://oryxprop.com/investors/',
};

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content');

// Helper to ensure content directories exist
function ensureDirExists(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

async function scrapeLeadership(page: Page) {
  console.log('Scraping Leadership data...');
  await page.goto(SOURCES.about, { waitUntil: 'networkidle2' });

  const leadershipData = await page.evaluate(() => {
    // Note: The actual DOM selectors would need to match the live site.
    // This is a robust fallback implementation for the migration pipeline.
    const extractProfiles = (sectionId: string, category: string) => {
      const section = document.getElementById(sectionId);
      if (!section) return [];
      
      const profiles = section.querySelectorAll('.team-member, .elementor-widget-image-box');
      return Array.from(profiles as NodeListOf<HTMLElement>).map((el: HTMLElement) => ({
        name: el.querySelector('h3, .elementor-image-box-title')?.textContent?.trim() || 'Unknown',
        role: el.querySelector('p, .elementor-image-box-description')?.textContent?.trim() || 'Executive',
        image: el.querySelector('img')?.src || '',
        category
      }));
    };

    return {
      directors: extractProfiles('Directors', 'director'),
      executives: extractProfiles('Team', 'executive')
    };
  });

  // Ensure content directory exists
  ensureDirExists(path.join(CONTENT_DIR, 'leadership'));

  // Save the scraped data locally for backup
  fs.writeFileSync(
    path.join(CONTENT_DIR, 'leadership', 'data.json'), 
    JSON.stringify(leadershipData, null, 2)
  );
  
  // Format data for Supabase 'team' table
  const supabaseTeamData = [
    ...leadershipData.directors.map(d => ({ name: d.name, role: d.role, category: d.category, image: d.image })),
    ...leadershipData.executives.map(e => ({ name: e.name, role: e.role, category: e.category, image: e.image }))
  ];

  if (supabaseTeamData.length > 0) {
    const { error } = await supabase.from('team').upsert(supabaseTeamData, { onConflict: 'id' });
    if (error) console.error("Error upserting team to Supabase:", error);
    else console.log('Saved Leadership data to Supabase!');
  }
}

async function scrapeProperties(page: Page) {
  console.log('Scraping Property Portfolio...');
  await page.goto(SOURCES.properties, { waitUntil: 'networkidle2' });

  const propertyData = await page.evaluate(() => {
    const propertyCards = document.querySelectorAll('.property-item, .elementor-post');
    return Array.from(propertyCards as NodeListOf<HTMLElement>).map((card: HTMLElement) => ({
      title: card.querySelector('.elementor-post__title')?.textContent?.trim() || 'Property Name',
      image: card.querySelector('img')?.src || '',
      sector: card.querySelector('.elementor-post__badge')?.textContent?.trim() || 'Retail',
      link: card.querySelector('a')?.href || '#'
    }));
  });

  ensureDirExists(path.join(CONTENT_DIR, 'portfolio'));
  
  fs.writeFileSync(
    path.join(CONTENT_DIR, 'portfolio', 'properties.json'), 
    JSON.stringify(propertyData, null, 2)
  );

  // Push to Supabase properties table
  const supabaseProperties = propertyData.map(p => ({
    id: p.title.replace(/\s+/g, '-').toLowerCase(), // Naive ID generation
    name: p.title,
    location: 'Namibia', // Placeholder
    type: p.sector,
    image: p.image,
    available: false,
    isLeasing: false
  }));

  if (supabaseProperties.length > 0) {
    const { error } = await supabase.from('properties').upsert(supabaseProperties, { onConflict: 'id' });
    if (error) console.error("Error upserting properties to Supabase:", error);
    else console.log(`Saved ${supabaseProperties.length} properties to Supabase!`);
  }
}

async function runMigration() {
  console.log('Starting Oryx Data Migration Pipeline...');
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await scrapeLeadership(page);
    await scrapeProperties(page);
    console.log('Data Migration Complete. Local CMS Seeded.');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await browser.close();
  }
}

// Execute migration
runMigration();
