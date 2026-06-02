// Run this file using node: `node scripts/seedSupabase.js`
// Ensure you have NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (or SERVICE_ROLE_KEY) set in your environment.
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase URL or Key in environment variables. Cannot seed database.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log('Reading local properties.json...');
  const propertiesPath = path.join(__dirname, '..', 'src', 'data', 'properties.json');
  const propertiesData = JSON.parse(fs.readFileSync(propertiesPath, 'utf-8'));

  console.log(`Found ${propertiesData.length} properties. Seeding to Supabase...`);

  const { data, error } = await supabase
    .from('properties')
    .upsert(propertiesData, { onConflict: 'id' });

  if (error) {
    console.error('Error seeding data:', error);
  } else {
    console.log('Successfully seeded database!');
  }
}

seed();
