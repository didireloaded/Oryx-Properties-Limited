const fs = require('fs');
const path = require('path');

const rules = [
  { dir: 'src/app/investors', from: /glass-panel-\d+/g, to: 'glass-panel-35' },
  { dir: 'src/components/investors', from: /glass-panel-\d+/g, to: 'glass-panel-35' },
  { dir: 'src/app/csi', from: /glass-panel-\d+/g, to: 'glass-panel-10' },
  { dir: 'src/components/csi', from: /glass-panel-\d+/g, to: 'glass-panel-10' },
  { dir: 'src/app/contact', from: /glass-panel-\d+/g, to: 'glass-panel-20' },
  { dir: 'src/components/contact', from: /glass-panel-\d+/g, to: 'glass-panel-20' },
  { dir: 'src/app/news', from: /glass-panel-\d+/g, to: 'glass-panel-05' },
];

function processDirectory(dir, rule) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath, rule);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.match(rule.from)) {
        content = content.replace(rule.from, rule.to);
        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

for (const rule of rules) {
  processDirectory(rule.dir, rule);
}
console.log('Glass UI audit complete.');
