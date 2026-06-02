const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://oryxprop.com/about-oryx-properties/', { waitUntil: 'networkidle2' });

  const team = await page.evaluate(() => {
    const results = [];
    // The wpm_6310_team_style_1 div has:
    // .wpm_6310_team_style_1_img img (src)
    // .wpm_6310_team_style_1_title (name)
    // .wpm_6310_team_style_1_designation (role)
    // .wpm_6310_team_style_1_popup_content (bio text)

    const containers = document.querySelectorAll('.wpm_6310_team_style_1');
    containers.forEach(c => {
      const imgEl = c.querySelector('.wpm_6310_team_style_1_img img');
      const titleEl = c.querySelector('.wpm_6310_team_style_1_title');
      const roleEl = c.querySelector('.wpm_6310_team_style_1_designation');
      const bioEl = c.querySelector('.wpm_6310_team_style_1_popup_content');

      if (titleEl && imgEl) {
        results.push({
          name: titleEl.innerText.trim(),
          role: roleEl ? roleEl.innerText.trim() : '',
          image: imgEl.src,
          bio: bioEl ? bioEl.innerText.trim() : ''
        });
      }
    });
    return results;
  });

  fs.writeFileSync('team_scrape.json', JSON.stringify(team, null, 2));
  await browser.close();
})();
