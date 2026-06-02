const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const baseUrl = 'https://oryxprop.com';
const imagesDir = path.join(__dirname, '../public/images/portfolio');

// Ensure directory exists
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

async function downloadImage(url, filename) {
  try {
    console.log(`Downloading ${filename} from ${url}`);
    const response = await axios({
      url,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      responseType: 'stream',
    });
    const writer = fs.createWriteStream(path.join(imagesDir, filename));
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  } catch (err) {
    console.error(`Failed to download ${url}: ${err.message}`);
  }
}

async function scrape() {
  console.log('Starting Master Migration script...');
  
  // Directly download known assets based on the curl test
  const knownAssets = [
    { url: 'https://oryxprop.com/wp-content/uploads/2023/08/Brand-X-Dunes-Mall_0145-min-700x840.jpg', name: 'dunes_mall.jpg' },
    { url: 'https://oryxprop.com/wp-content/uploads/2022/10/Dagbreek-school-Fortitude-Property-Group-27-700x840.jpg', name: 'dagbreek.jpg' },
    { url: 'https://oryxprop.com/wp-content/uploads/2023/08/OryxProp_SM_PostTemplates-007-1-700x840.jpg', name: 'industrial_1.jpg' }
  ];

  for(const asset of knownAssets) {
     await downloadImage(asset.url, asset.name);
  }

  try {
    const urlsToScrape = [
      `${baseUrl}/portfolio/`,
      `${baseUrl}/about-oryx-properties/`
    ];

    let foundImages = [];

    for (const url of urlsToScrape) {
      console.log(`Scraping ${url}`);
      try {
        const response = await axios.get(url, {
          headers: {
             'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
          }
        });
        const $ = cheerio.load(response.data);
        
        $('img').each((i, el) => {
          const src = $(el).attr('src');
          if (src && !src.includes('logo') && !src.includes('icon') && src.includes('wp-content/uploads')) {
            foundImages.push(src);
          }
        });
      } catch(e) {
        console.error(`Error scraping ${url}:`, e.message);
      }
    }

    foundImages = [...new Set(foundImages)]; // Deduplicate
    console.log(`Found ${foundImages.length} potential property images.`);
    
    let count = 0;
    
    for (const src of foundImages) {
      const lowerSrc = src.toLowerCase();
      // Look for maerua or gustav
      if (lowerSrc.includes('maerua') || lowerSrc.includes('gustav') || lowerSrc.includes('urban') || (lowerSrc.includes('jpg') && count < 15)) {
         let imgUrl = src.startsWith('http') ? src : `${baseUrl}${src}`;
         const filename = path.basename(src).split('?')[0];
         // Only download if we don't have it
         if(!knownAssets.find(k => k.name === filename)) {
             await downloadImage(imgUrl, filename);
             count++;
         }
      }
    }
    console.log(`Downloaded ${count} additional images successfully.`);
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

scrape();
