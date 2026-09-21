import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DICTIONARIES, titleOf } from '../src/i18n/index.js';
import { SETTING_VALUES, STORAGE_KEY } from '../src/core/settings.js';
import { DOC_PAGES, ZONE_LANGUAGES, FALLBACK_LANGUAGE, SITE_ROOT } from '../src/core/locale.js';
import { div, tag } from '../src/ui/markup.js';
import { backTilesHtml } from '../src/ui/board.js';
import { splashMarkup, tableMarkup } from '../src/ui/tableView.js';
import { reportMarkup } from '../src/ui/reportView.js';
import { settingsMarkup } from '../src/ui/settingsView.js';
import { helpMarkup } from '../src/ui/helpView.js';
import { AD_PAGES, docMarkup } from '../src/ui/docView.js';

const SITE = 'https://betaori.app';
const ADSENSE_SRC = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
const ADSENSE_CLIENT = 'ca-pub-9410921386046089';
const ADSENSE_SLOTS = ['6622171051', '4362356727'];
const ADSENSE_PUSH = '<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>';
const LOADER_TILES = 4;
const NOT_FOUND = '404';
const OG_LOCALES = { ko: 'ko_KR', ja: 'ja_JP', en: 'en_US' };
const DOC_SCHEMA = { guide: 'Article', privacy: 'WebPage' };
const DEFAULT_LANGUAGE = 'ja';
const APP_KIND = '';
const PAGE_KINDS = [APP_KIND, ...DOC_PAGES.map((name) => `${name}/`)];
const LANGUAGES = Object.keys(DICTIONARIES);
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ENTRY = join(ROOT, 'src', 'main.js');
const STYLESHEETS = ['tokens', 'base', 'components', 'layout'];
const IMPORT_SPECIFIER = /from\s+'([^']+)'/g;
const VERSION_LENGTH = 8;

const absolute = (path) => `${SITE}/${path}`;
const literal = (value) => JSON.stringify(value);
const sitePath = (path) => relative(ROOT, path).split(sep).join('/');
const version = (source) => createHash('sha256').update(source).digest('hex').slice(0, VERSION_LENGTH);
const pagePath = (language, kind) => `${language}/${kind}`;

function alternateTargets(kind) {
  const targets = LANGUAGES.map((language) => [language, absolute(pagePath(language, kind))]);
  return kind === APP_KIND ? [...targets, ['x-default', absolute('')]] : targets;
}

function alternates(kind) {
  return alternateTargets(kind)
    .map(([hreflang, href]) => `<link rel="alternate" hreflang="${hreflang}" href="${href}">`);
}

function appSchema(language, url) {
  const dictionary = DICTIONARIES[language];
  return {
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
  };
}

function docSchema(language, url, name) {
  const dictionary = DICTIONARIES[language];
  const page = dictionary.doc[name];
  return {
    '@type': DOC_SCHEMA[name],
    headline: page.title,
    name: page.title,
    url,
    inLanguage: language,
    image: absolute(`assets/og-${language}.png`),
    description: page.description,
    isPartOf: { '@type': 'WebApplication', name: dictionary.brand, url: absolute(`${language}/`) }
  };
}

function structuredData(schema) {
  const source = JSON.stringify({ '@context': 'https://schema.org', ...schema }, null, 2);
  return `<script type="application/ld+json">\n${source}\n</script>`;
}

function metadata(language, { url, base, kind, title, description, schema, canonical = true }) {
  const image = absolute(`assets/og-${language}.png`);
  return [
    '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">',
    `<title>${title}</title>`,
    `<meta name="description" content="${description}">`,
    ...(canonical ? [`<link rel="canonical" href="${url}">`] : []),
    ...alternates(kind),
    '<meta name="theme-color" content="#FAEDCD">',
    `<link rel="icon" href="${base}assets/icon.svg" type="image/svg+xml">`,
    `<link rel="apple-touch-icon" href="${base}assets/icon-180.png">`,
    '<meta property="og:type" content="website">',
    `<meta property="og:site_name" content="${DICTIONARIES[language].help.name}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:title" content="${title}">`,
    `<meta property="og:description" content="${description}">`,
    `<meta property="og:image" content="${image}">`,
    '<meta property="og:image:width" content="1200">',
    '<meta property="og:image:height" content="630">',
    `<meta property="og:image:alt" content="${title}">`,
    `<meta property="og:locale" content="${OG_LOCALES[language]}">`,
    ...LANGUAGES.filter((code) => code !== language)
      .map((code) => `<meta property="og:locale:alternate" content="${OG_LOCALES[code]}">`),
    '<meta name="twitter:card" content="summary_large_image">',
    `<meta name="twitter:title" content="${title}">`,
    `<meta name="twitter:description" content="${description}">`,
    `<meta name="twitter:image" content="${image}">`,
    structuredData(schema)
  ];
}

function adLoader() {
  return `<script async src="${ADSENSE_SRC}?client=${ADSENSE_CLIENT}" crossorigin="anonymous"></script>`;
}

function adUnit(slot) {
  return tag('aside', { class: 'ad' }, [
    tag('ins', {
      class: 'adsbygoogle ad__unit',
      style: 'display:block',
      'data-ad-client': ADSENSE_CLIENT,
      'data-ad-slot': slot,
      'data-ad-format': 'auto',
      'data-full-width-responsive': 'true'
    }),
    ADSENSE_PUSH
  ]);
}

function overlay(name, content) {
  return tag('div', { class: 'overlay', [`data-${name}`]: true, hidden: true }, content);
}

async function readModules(path, sources = new Map()) {
  if (sources.has(path)) return sources;
  const source = await readFile(path, 'utf8');
  sources.set(path, source);
  for (const [, specifier] of source.matchAll(IMPORT_SPECIFIER)) {
    await readModules(resolve(dirname(path), specifier), sources);
  }
  return sources;
}

function stamped(sources) {
  return new Map([...sources]
    .map(([path, source]) => [sitePath(path), `${sitePath(path)}?v=${version(source)}`]));
}

function ordered(entries) {
  return new Map([...entries].sort(([left], [right]) => left.localeCompare(right)));
}

async function readStylesheets() {
  return new Map(await Promise.all(STYLESHEETS
    .map((sheet) => join(ROOT, 'styles', `${sheet}.css`))
    .map(async (path) => [path, await readFile(path, 'utf8')])));
}

function importMap(base, modules) {
  const imports = Object.fromEntries([...modules]
    .map(([path, stampedPath]) => [`${base}${path}`, `${base}${stampedPath}`]));
  return `<script type="importmap">\n${JSON.stringify({ imports }, null, 2)}\n</script>`;
}

const styleLinks = (base, styles) =>
  [...styles.values()].map((href) => `<link rel="stylesheet" href="${base}${href}">`);

function assets(base, modules, styles) {
  return [
    importMap(base, modules),
    ...styleLinks(base, styles),
    ...[...modules.values()].map((href) => `<link rel="modulepreload" href="${base}${href}">`)
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
  location.replace(${literal(SITE_ROOT)} + (fromStorage() || fromNavigator() || fromZone() || ${literal(FALLBACK_LANGUAGE)}) + '/');
})();
</script>`;
}

function bodyTag(bodyClass) {
  return bodyClass ? `<body class="${bodyClass}">` : '<body>';
}

function document(language, lines, body, bodyClass = null) {
  return `<!DOCTYPE html>
<html lang="${language}">
<head>
<meta charset="utf-8">
${lines.join('\n')}
</head>
${bodyTag(bodyClass)}
${body.map((line) => `${line}\n`).join('')}</body>
</html>
`;
}

function appPage(language, modules, styles) {
  const dictionary = DICTIONARIES[language];
  const base = '../';
  const url = absolute(pagePath(language, APP_KIND));
  return document(language, [
    ...metadata(language, {
      url,
      base,
      kind: APP_KIND,
      title: titleOf(dictionary),
      description: dictionary.description,
      schema: appSchema(language, url)
    }),
    ...assets(base, modules, styles)
  ], [
    tag('main', { class: 'app', 'data-table': true }, [splashMarkup(dictionary), tableMarkup(dictionary)]),
    overlay('report', reportMarkup(dictionary)),
    overlay('settings-panel', settingsMarkup(dictionary, language)),
    overlay('help-panel', helpMarkup(dictionary)),
    overlay('loader', div('loader', backTilesHtml(LOADER_TILES))),
    `<script type="module" src="${base}${modules.get(sitePath(ENTRY))}"></script>`
  ]);
}

function docPage(language, name, styles) {
  const dictionary = DICTIONARIES[language];
  const base = '../../';
  const kind = `${name}/`;
  const url = absolute(pagePath(language, kind));
  const monetized = AD_PAGES.includes(name);
  return document(language, [
    ...metadata(language, {
      url,
      base,
      kind,
      title: titleOf(dictionary, dictionary.doc[name].title),
      description: dictionary.doc[name].description,
      schema: docSchema(language, url, name)
    }),
    ...styleLinks(base, styles),
    ...(monetized ? [adLoader()] : [])
  ], docMarkup(dictionary, language, name, monetized ? ADSENSE_SLOTS.map(adUnit) : []), 'page');
}

function redirectPage() {
  const dictionary = DICTIONARIES[DEFAULT_LANGUAGE];
  const url = absolute('');
  return document(DEFAULT_LANGUAGE, [
    redirectScript(),
    ...metadata(DEFAULT_LANGUAGE, {
      url,
      base: '',
      kind: APP_KIND,
      title: titleOf(dictionary),
      description: dictionary.description,
      schema: appSchema(DEFAULT_LANGUAGE, url),
      canonical: false
    })
  ], []);
}

function notFoundPage() {
  return document(DEFAULT_LANGUAGE, [
    '<meta name="robots" content="noindex">',
    `<title>${NOT_FOUND}</title>`
  ], [NOT_FOUND]);
}

function sitemapEntry(language, kind) {
  const links = alternateTargets(kind)
    .map(([hreflang, href]) => `      <xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}"/>`)
    .join('\n');
  return `    <url>
      <loc>${absolute(pagePath(language, kind))}</loc>
${links}
      <changefreq>monthly</changefreq>
    </url>`;
}

function sitemap() {
  const entries = PAGE_KINDS
    .flatMap((kind) => LANGUAGES.map((language) => sitemapEntry(language, kind)))
    .join('\n');
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

const modules = ordered(stamped(await readModules(ENTRY)));
const styles = stamped(await readStylesheets());

await emit('index.html', redirectPage());

await Promise.all(LANGUAGES.map((language) => emit(`${language}/index.html`,
  appPage(language, modules, styles))));

await Promise.all(LANGUAGES.flatMap((language) => DOC_PAGES.map((name) =>
  emit(`${language}/${name}/index.html`, docPage(language, name, styles)))));

await emit('404.html', notFoundPage());

await emit('sitemap.xml', sitemap());
