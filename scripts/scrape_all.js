const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const baseUrl = 'https://oryxprop.com';
const dataDir = path.join(__dirname, '../src/data');
const publicDir = path.join(__dirname, '../public');
const imagesDir = path.join(publicDir, 'images');

// Ensure directories exist
[dataDir, publicDir, imagesDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

async function fetchPage(url) {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      }
    });
    return cheerio.load(response.data);
  } catch (error) {
    console.error(`Error fetching ${url}:`, error.message);
    return null;
  }
}

async function downloadImage(url, destFolder, filename) {
  if (!url) return null;
  // Handle relative URLs
  if (url.startsWith('/')) {
    url = baseUrl + url;
  }
  const destPath = path.join(imagesDir, destFolder);
  if (!fs.existsSync(destPath)) {
    fs.mkdirSync(destPath, { recursive: true });
  }
  const filePath = path.join(destPath, filename);
  
  if (fs.existsSync(filePath)) {
    return `/images/${destFolder}/${filename}`;
  }

  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)',
      }
    });
    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);
    await new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
    return `/images/${destFolder}/${filename}`;
  } catch (err) {
    console.error(`Failed to download ${url}: ${err.message}`);
    return null;
  }
}

async function scrapeLogo() {
  console.log('Scraping Logo...');
  const $ = await fetchPage(baseUrl);
  if (!$) return;
  
  // Try to find the logo
  let logoUrl = '';
  $('img').each((i, el) => {
    const src = $(el).attr('src');
    if (src && src.toLowerCase().includes('logo') && !logoUrl) {
      logoUrl = src;
    }
  });

  if (logoUrl) {
    const localUrl = await downloadImage(logoUrl, 'brand', 'oryx-logo.png');
    console.log(`Logo saved to ${localUrl}`);
  }
}

async function scrapeAbout() {
  console.log('Scraping About (Leadership)...');
  const url = `${baseUrl}/about-oryx-properties/`;
  const $ = await fetchPage(url);
  if (!$) return;

  const leadership = [];
  
  // This is a generic scrape trying to find typical Team member cards.
  // We'll look for blocks of text containing typical titles or names inside team grids.
  // The actual Oryx site has them in specific Divs.
  // If the scrape is generic, we'll extract as much structure as possible.
  
  // We'll save the raw extracted text as a fallback if the DOM is too complex.
  let textContent = $('body').text();
  fs.writeFileSync(path.join(dataDir, 'about_raw.txt'), textContent);
  
  // Attempting to extract images that look like portraits
  const portraitUrls = [];
  $('img').each((i, el) => {
    const src = $(el).attr('src');
    if (src && src.toLowerCase().includes('portrait')) {
      portraitUrls.push(src);
    }
  });
  
  console.log(`Found ${portraitUrls.length} potential portraits.`);
  
  for (let i = 0; i < portraitUrls.length; i++) {
    await downloadImage(portraitUrls[i], 'leadership', `portrait_${i}.jpg`);
  }
}

async function scrapePortfolio() {
  console.log('Scraping Portfolio...');
  const url = `${baseUrl}/portfolio/`;
  const $ = await fetchPage(url);
  if (!$) return;

  const properties = [];
  
  // Fallback raw text save
  fs.writeFileSync(path.join(dataDir, 'portfolio_raw.txt'), $('body').text());
}

async function scrapeNews() {
  console.log('Scraping News/Announcements...');
  const url = `${baseUrl}/news/`; // Assuming this exists or similar
  const $ = await fetchPage(url);
  if ($) {
    fs.writeFileSync(path.join(dataDir, 'news_raw.txt'), $('body').text());
  }
}

async function main() {
  console.log('Starting Scrape Process...');
  await scrapeLogo();
  await scrapeAbout();
  await scrapePortfolio();
  await scrapeNews();
  console.log('Scrape completed.');
}

main();
