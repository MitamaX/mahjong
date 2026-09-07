import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DICTIONARIES, titleOf } from '../src/i18n/index.js';

const SITE = 'https://betaori.app';
const OG_LOCALES = { ko: 'ko_KR', ja: 'ja_JP', en: 'en_US' };
const DEFAULT_LANGUAGE = 'ko';
const LANGUAGES = Object.keys(DICTIONARIES);
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const absolute = (path) => `${SITE}/${path}`;

function alternates() {
  return [
    ...LANGUAGES.map((language) => [language, absolute(`${language}/`)]),
    ['x-default', absolute('')]
  ].map(([hreflang, href]) => `<link rel="alternate" hreflang="${hreflang}" href="${href}">`);
}

function structuredData(language, url) {
  const dictionary = DICTIONARIES[language];
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: dictionary.brand,
    alternateName: [dictionary.help.name,
      ...LANGUAGES.filter((code) => code !== language).map((code) => DICTIONARIES[code].brand)],
    url,
    applicationCategory: 'GameApplication',
    operatingSystem: 'Web',
    browserRequirements: 'JavaScript',
    inLanguage: language,
    image: absolute(`assets/og-${language}.png`),
    description: dictionary.description,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' }
  }, null, 2);
}

function head(language, { url, base, canonical }) {
  const dictionary = DICTIONARIES[language];
  const title = titleOf(dictionary);
  const image = absolute(`assets/og-${language}.png`);
  return [
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">',
    `<title>${title}</title>`,
    `<meta name="description" content="${dictionary.description}">`,
    ...(canonical ? [`<link rel="canonical" href="${url}">`] : []),
    ...alternates(),
    '<meta name="theme-color" content="#FAEDCD">',
    `<link rel="icon" href="${base}assets/icon.svg" type="image/svg+xml">`,
    `<link rel="apple-touch-icon" href="${base}assets/icon-180.png">`,
    '<meta property="og:type" content="website">',
    `<meta property="og:site_name" content="${dictionary.help.name}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:title" content="${title}">`,
    `<meta property="og:description" content="${dictionary.description}">`,
    `<meta property="og:image" content="${image}">`,
    '<meta property="og:image:width" content="1200">',
    '<meta property="og:image:height" content="630">',
    `<meta property="og:image:alt" content="${title}">`,
    `<meta property="og:locale" content="${OG_LOCALES[language]}">`,
    ...LANGUAGES.filter((code) => code !== language)
      .map((code) => `<meta property="og:locale:alternate" content="${OG_LOCALES[code]}">`),
    '<meta name="twitter:card" content="summary_large_image">',
    `<meta name="twitter:title" content="${title}">`,
    `<meta name="twitter:description" content="${dictionary.description}">`,
    `<meta name="twitter:image" content="${image}">`,
    `<script type="application/ld+json">\n${structuredData(language, url)}\n</script>`,
    ...['tokens', 'base', 'components', 'layout']
      .map((sheet) => `<link rel="stylesheet" href="${base}styles/${sheet}.css">`)
  ];
}

function page(language, { url, base, canonical, entry }) {
  const { brand, tagline } = DICTIONARIES[language];
  return `<!DOCTYPE html>
<html lang="${language}">
<head>
${head(language, { url, base, canonical }).join('\n')}
</head>
<body>
<main class="app" data-table>
  <div class="splash">
    <h1 class="splash__name">${brand}</h1>
    <p class="splash__tagline">${tagline}</p>
  </div>
</main>
<div class="overlay" data-report hidden></div>
<div class="overlay" data-settings-panel hidden></div>
<div class="overlay" data-help-panel hidden></div>
<div class="overlay" data-loader hidden></div>
<script type="module" src="${base}src/${entry}"></script>
</body>
</html>
`;
}

function sitemap() {
  const links = LANGUAGES
    .map((language) => `      <xhtml:link rel="alternate" hreflang="${language}" href="${absolute(`${language}/`)}"/>`)
    .concat(`      <xhtml:link rel="alternate" hreflang="x-default" href="${absolute('')}"/>`)
    .join('\n');
  const entries = LANGUAGES.map((language) => `    <url>
      <loc>${absolute(`${language}/`)}</loc>
${links}
      <changefreq>monthly</changefreq>
    </url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries}
</urlset>
`;
}

async function emit(path, content) {
  const target = join(ROOT, path);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, content, 'utf8');
  console.log(path);
}

await emit('index.html', page(DEFAULT_LANGUAGE, {
  url: absolute(''),
  base: '',
  canonical: false,
  entry: 'redirect.js'
}));

await Promise.all(LANGUAGES.map((language) => emit(`${language}/index.html`, page(language, {
  url: absolute(`${language}/`),
  base: '../',
  canonical: true,
  entry: 'main.js'
}))));

await emit('sitemap.xml', sitemap());
