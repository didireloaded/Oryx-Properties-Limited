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
  console.log('Starting migration script...');
  try {
    const urlsToScrape = [
      `${baseUrl}/`,
      `${baseUrl}/portfolio/retail/`,
      `${baseUrl}/portfolio/industrial/`,
      `${baseUrl}/portfolio/office/`
    ];

    let foundImages = [];

    for (const url of urlsToScrape) {
      console.log(`Scraping ${url}`);
      try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        
        $('img').each((i, el) => {
          const src = $(el).attr('src');
          if (src && !src.includes('logo') && !src.includes('icon') && src.includes('wp-content/uploads')) {
            foundImages.push(src);
          }
        });
        
        const divsWithBg = $('div[style*="background-image"]');
        divsWithBg.each((i, el) => {
          const style = $(el).attr('style');
          const match = style.match(/url\(['"]?(.*?)['"]?\)/);
          if (match && match[1]) {
             if (match[1].includes('wp-content/uploads')) {
                foundImages.push(match[1]);
             }
          }
        });
      } catch(e) {
        console.error(`Error scraping ${url}:`, e.message);
      }
    }

    foundImages = [...new Set(foundImages)]; // Deduplicate
    console.log(`Found ${foundImages.length} potential property images.`);
    
    // We specifically want images of Maerua Mall, Dunes Mall, Gustav Voigts, Urban Village
    const keywords = ['maerua', 'dunes', 'gustav', 'urban', 'property', 'mall', 'retail', 'industrial', 'office'];
    let count = 0;
    
    for (const src of foundImages) {
      const lowerSrc = src.toLowerCase();
      let isRelevant = keywords.some(kw => lowerSrc.includes(kw));
      // If we don't have enough, just download some good looking jpgs
      if (isRelevant || (src.endsWith('.jpg') && count < 10)) {
         let imgUrl = src.startsWith('http') ? src : `${baseUrl}${src}`;
         const filename = path.basename(src).split('?')[0];
         await downloadImage(imgUrl, filename);
         count++;
      }
    }
    console.log(`Downloaded ${count} images successfully.`);
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

scrape();
