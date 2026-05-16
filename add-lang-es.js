// Add language switcher + hreflang to Spanish HTML files
const fs = require('fs');
const path = require('path');
const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let count = 0;
files.forEach(f => {
  const fp = path.join(dir, f);
  let c = fs.readFileSync(fp, 'utf8');

  // Skip already processed
  if (c.includes('hreflang="en"')) { console.log('Skipping (already done): ' + f); return; }

  const pageName = f.replace('.html', '');
  const esPath = pageName === 'index' ? '' : pageName;

  // Add hreflang tags before <link rel="preconnect"
  const hreflangTags = '\n  <link rel="alternate" hreflang="es" href="https://rodrilopeez.github.io/clinica-saludymas/' + esPath + '">\n  <link rel="alternate" hreflang="en" href="https://rodrilopeez.github.io/clinica-saludymas/en/' + f + '">\n  <link rel="alternate" hreflang="x-default" href="https://rodrilopeez.github.io/clinica-saludymas/' + esPath + '">';
  c = c.replace('<link rel="preconnect" href="https://fonts.googleapis.com">', hreflangTags + '\n  <link rel="preconnect" href="https://fonts.googleapis.com">');

  // Add language switcher before the CTA button
  const langSwitcherES = '<li class="header__lang"><span class="header__lang-current">ES</span><span class="header__lang-sep">|</span><a href="en/' + f + '" class="header__link header__lang-link" title="Switch to English" aria-label="Cambiar a inglés">EN</a></li>';
  c = c.replace('<li><button class="header__link header__link--cta"', langSwitcherES + '\n          <li><button class="header__link header__link--cta"');

  // Add lang switcher CSS before </head>
  const langCSS = '\n  <style>\n    .header__lang { display: flex; align-items: center; gap: 6px; margin-left: 8px; }\n    .header__lang-link { padding: 0 4px !important; opacity: 0.6; font-weight: 500; font-size: 0.9rem; }\n    .header__lang-link:hover { opacity: 1; }\n    .header__lang-current { font-weight: 700; color: var(--blue,#005DAB); font-size: 0.9rem; }\n    .header__lang-sep { opacity: 0.3; font-size: 0.85rem; }\n    @media (max-width: 900px) { .header__lang { padding: 0.5rem 0; border-top: 1px solid var(--gray-200); margin-top: 0.5rem; } }\n  </style>';
  c = c.replace('</head>', langCSS + '\n</head>');

  fs.writeFileSync(fp, c);
  count++;
});
console.log('Updated ' + count + ' Spanish files with lang switcher + hreflang');
