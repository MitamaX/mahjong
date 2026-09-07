import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DICTIONARIES, titleOf } from '../src/i18n/index.js';
import { SETTING_VALUES, STORAGE_KEY } from '../src/core/settings.js';
import { ZONE_LANGUAGES, FALLBACK_LANGUAGE } from '../src/core/locale.js';

const SITE = 'https://betaori.app';
const OG_LOCALES = { ko: 'ko_KR', ja: 'ja_JP', en: 'en_US' };
const DEFAULT_LANGUAGE = 'ja';
const LANGUAGES = Object.keys(DICTIONARIES);
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ENTRY = join(ROOT, 'src', 'main.js');
const IMPORT_SPECIFIER = /from\s+'([^']+)'/g;

const absolute = (path) => `${SITE}/${path}`;
const literal = (value) => JSON.stringify(value);
const sitePath = (path) => relative(ROOT, path).split(sep).join('/');

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

function metadata(language, { url, base, canonical }) {
  const dictionary = DICTIONARIES[language];
  const title = titleOf(dictionary);
  const image = absolute(`assets/og-${language}.png`);
  return [
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
    `<script type="application/ld+json">\n${structuredData(language, url)}\n</script>`
  ];
}

async function collectModules(path, collected = new Set()) {
  if (collected.has(path)) return collected;
  collected.add(path);
  const source = await readFile(path, 'utf8');
  for (const [, specifier] of source.matchAll(IMPORT_SPECIFIER)) {
    await collectModules(resolve(dirname(path), specifier), collected);
  }
  return collected;
}

function assets(base, modules) {
  return [
    ...['tokens', 'base', 'components', 'layout']
      .map((sheet) => `<link rel="stylesheet" href="${base}styles/${sheet}.css">`),
    ...modules.map((path) => `<link rel="modulepreload" href="${base}${path}">`)
  ];
}

function redirectScript() {
  return `<script>
(function () {
  var languages = ${literal(SETTING_VALUES.language)};
  var zones = ${literal(ZONE_LANGUAGES)};
  var supported = function (language) {
    return languages.indexOf(language) < 0 ? null : language;
  };
  var fromStorage = function () {
    try {
      return supported((JSON.parse(localStorage.getItem(${literal(STORAGE_KEY)})) || {}).language);
    } catch (unused) {
      return null;
    }
  };
  var fromNavigator = function () {
    var tag = (navigator.languages || [])[0] || navigator.language || '';
    return supported(tag.toLowerCase().split('-')[0]);
  };
  var fromZone = function () {
    try {
      return supported(zones[Intl.DateTimeFormat().resolvedOptions().timeZone]);
    } catch (unused) {
      return null;
    }
  };
  location.replace((fromStorage() || fromNavigator() || fromZone() || ${literal(FALLBACK_LANGUAGE)}) + '/');
})();
</script>`;
}

function document(language, lines, body) {
  return `<!DOCTYPE html>
<html lang="${language}">
<head>
<meta charset="utf-8">
${lines.join('\n')}
</head>
<body>
${body}</body>
</html>
`;
}

function appPage(language, modules) {
  const { brand, tagline } = DICTIONARIES[language];
  const base = '../';
  return document(language, [
    ...metadata(language, { url: absolute(`${language}/`), base, canonical: true }),
    ...assets(base, modules)
  ], `<main class="app" data-table>
  <div class="splash">
    <h1 class="splash__name">${brand}</h1>
    <p class="splash__tagline">${tagline}</p>
  </div>
</main>
<div class="overlay" data-report hidden></div>
<div class="overlay" data-settings-panel hidden></div>
<div class="overlay" data-help-panel hidden></div>
<div class="overlay" data-loader hidden></div>
<script type="module" src="${base}${sitePath(ENTRY)}"></script>
`);
}

function redirectPage() {
  return document(DEFAULT_LANGUAGE, [
    redirectScript(),
    ...metadata(DEFAULT_LANGUAGE, { url: absolute(''), base: '', canonical: false })
  ], '');
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

const modules = [...await collectModules(ENTRY)].map(sitePath).sort();

await emit('index.html', redirectPage());

await Promise.all(LANGUAGES.map((language) => emit(`${language}/index.html`, appPage(language, modules))));

await emit('sitemap.xml', sitemap());
