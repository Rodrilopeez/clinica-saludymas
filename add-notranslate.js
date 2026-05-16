// Add Google notranslate meta tag to all HTML files
const fs = require('fs');
const path = require('path');

const dirs = [
  path.join(__dirname),
  path.join(__dirname, 'en')
];

let count = 0;
dirs.forEach(dir => {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
  files.forEach(f => {
    const fp = path.join(dir, f);
    let c = fs.readFileSync(fp, 'utf8');
    if (c.includes('google" content="notranslate"')) {
      console.log('SKIP: ' + f);
      return;
    }
    // Insert after charset meta tag
    c = c.replace(
      '<meta charset="UTF-8">',
      '<meta charset="UTF-8">\n  <meta name="google" content="notranslate">'
    );
    fs.writeFileSync(fp, c);
    console.log('FIXED: ' + f);
    count++;
  });
});
console.log('\nDone. Fixed ' + count + ' files.');
