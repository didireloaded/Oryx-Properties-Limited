const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedData() {
  console.log("Starting data migration to Supabase...");

  try {
    // 1. Seed Properties
    const propertiesPath = path.join(__dirname, '../src/data/properties.json');
    if (fs.existsSync(propertiesPath)) {
      const properties = JSON.parse(fs.readFileSync(propertiesPath, 'utf8'));
      const { data, error } = await supabase.from('properties').upsert(properties);
      if (error) throw error;
      console.log(`✅ Seeded ${properties.length} properties.`);
    }

    // 2. Seed Timeline
    const timelinePath = path.join(__dirname, '../src/data/timeline.json');
    if (fs.existsSync(timelinePath)) {
      const timeline = JSON.parse(fs.readFileSync(timelinePath, 'utf8'));
      const { data, error } = await supabase.from('timeline').upsert(timeline);
      if (error) throw error;
      console.log(`✅ Seeded ${timeline.length} timeline events.`);
    }
    
    // 3. Seed Team
    const teamPath = path.join(__dirname, '../src/data/team.json');
    if (fs.existsSync(teamPath)) {
      const team = JSON.parse(fs.readFileSync(teamPath, 'utf8'));
      const { error } = await supabase.from('team').upsert(team);
      if (error) throw error;
      console.log(`✅ Seeded ${team.length} team members.`);
    }

    // 4. Seed News
    const newsPath = path.join(__dirname, '../src/data/news.json');
    if (fs.existsSync(newsPath)) {
      const news = JSON.parse(fs.readFileSync(newsPath, 'utf8'));
      const { error } = await supabase.from('news').upsert(news);
      if (error) throw error;
      console.log(`✅ Seeded ${news.length} news articles.`);
    }

    // 5. Seed Dividends
    const dividendsPath = path.join(__dirname, '../src/data/dividends.json');
    if (fs.existsSync(dividendsPath)) {
      const dividends = JSON.parse(fs.readFileSync(dividendsPath, 'utf8'));
      const { error } = await supabase.from('dividends').upsert(dividends);
      if (error) throw error;
      console.log(`✅ Seeded ${dividends.length} dividend records.`);
    }

    // 6. Seed Investor Docs
    const docsPath = path.join(__dirname, '../src/data/investors_docs.json');
    if (fs.existsSync(docsPath)) {
      const docs = JSON.parse(fs.readFileSync(docsPath, 'utf8'));
      const { error } = await supabase.from('investors_docs').upsert(docs);
      if (error) throw error;
      console.log(`✅ Seeded ${docs.length} investor documents.`);
    }

    // 7. Seed Calendar Events
    const calPath = path.join(__dirname, '../src/data/calendar_events.json');
    if (fs.existsSync(calPath)) {
      const cal = JSON.parse(fs.readFileSync(calPath, 'utf8'));
      const { error } = await supabase.from('calendar_events').upsert(cal);
      if (error) throw error;
      console.log(`✅ Seeded ${cal.length} calendar events.`);
    }

    // 8. Seed Sectors
    const sectorsPath = path.join(__dirname, '../src/data/sectors.json');
    if (fs.existsSync(sectorsPath)) {
      const sectors = JSON.parse(fs.readFileSync(sectorsPath, 'utf8'));
      const { error } = await supabase.from('sectors').upsert(sectors);
      if (error) throw error;
      console.log(`✅ Seeded ${sectors.length} sectors.`);
    }

    // 9. Seed Historical Growth
    const growthPath = path.join(__dirname, '../src/data/historical_growth.json');
    if (fs.existsSync(growthPath)) {
      const growth = JSON.parse(fs.readFileSync(growthPath, 'utf8'));
      const { error } = await supabase.from('historical_growth').upsert(growth);
      if (error) throw error;
      console.log(`✅ Seeded ${growth.length} historical growth records.`);
    }
    console.log("Migration completed successfully!");
  } catch (error) {
    console.error("Error during migration:", error);
  }
}

seedData();
