const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const SOURCES = {
  about: 'https://oryxprop.com/about-oryx-properties/',
  properties: 'https://oryxprop.com/our-properties/',
};

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content');

function ensureDirExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

async function scrapeLeadership(page) {
  console.log('Scraping Leadership data...');
  await page.goto(SOURCES.about, { waitUntil: 'networkidle2' });

  const leadershipData = await page.evaluate(() => {
    function extractProfiles(sectionId, category) {
      const section = document.getElementById(sectionId);
      if (!section) return [];
      
      const profiles = section.querySelectorAll('.team-member, .elementor-widget-image-box');
      return Array.from(profiles).map(el => ({
        name: el.querySelector('h3, .elementor-image-box-title') ? el.querySelector('h3, .elementor-image-box-title').innerText : 'Unknown',
        role: el.querySelector('p, .elementor-image-box-description') ? el.querySelector('p, .elementor-image-box-description').innerText : 'Executive',
        image: el.querySelector('img') ? el.querySelector('img').src : '',
        category: category
      }));
    }

    return {
      directors: extractProfiles('Directors', 'director'),
      executives: extractProfiles('Team', 'executive')
    };
  });

  ensureDirExists(path.join(CONTENT_DIR, 'leadership'));

  fs.writeFileSync(
    path.join(CONTENT_DIR, 'leadership', 'data.json'), 
    JSON.stringify(leadershipData, null, 2)
  );
  console.log('Saved Leadership data to CMS.');
}

async function scrapeProperties(page) {
  console.log('Scraping Property Portfolio...');
  await page.goto(SOURCES.properties, { waitUntil: 'networkidle2' });

  const propertyData = await page.evaluate(() => {
    const propertyCards = document.querySelectorAll('.property-item, .elementor-post');
    return Array.from(propertyCards).map(card => ({
      title: card.querySelector('.elementor-post__title') ? card.querySelector('.elementor-post__title').innerText : 'Property Name',
      image: card.querySelector('img') ? card.querySelector('img').src : '',
      sector: card.querySelector('.elementor-post__badge') ? card.querySelector('.elementor-post__badge').innerText : 'Retail',
      link: card.querySelector('a') ? card.querySelector('a').href : '#'
    }));
  });

  ensureDirExists(path.join(CONTENT_DIR, 'portfolio'));
  
  fs.writeFileSync(
    path.join(CONTENT_DIR, 'portfolio', 'properties.json'), 
    JSON.stringify(propertyData, null, 2)
  );
  console.log('Saved ' + propertyData.length + ' properties to CMS.');
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

runMigration();
