import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DICTIONARIES, titleOf } from '../src/i18n/index.js';
import { SETTING_VALUES, STORAGE_KEY } from '../src/core/settings.js';
import {
  DOC_PAGES, ZONE_LANGUAGES, FALLBACK_LANGUAGE, SITE_ROOT, HOME_KIND, HOME_PAGE, PRACTICE_PAGE, pageKind
} from '../src/core/locale.js';
import { UNITS } from '../src/lessons/catalog.js';
import { LESSON_TEXT } from '../src/i18n/lessons/index.js';
import { div, escape, html, link, tag } from '../src/ui/markup.js';
import { plainLine } from '../src/ui/glossary.js';
import { backTilesHtml } from '../src/ui/board.js';
import { splashMarkup, tableMarkup } from '../src/ui/tableView.js';
import { reportMarkup } from '../src/ui/reportView.js';
import { settingsMarkup } from '../src/ui/settingsView.js';
import { helpMarkup } from '../src/ui/helpView.js';
import { AD_PAGES, docMarkup } from '../src/ui/docView.js';
import { courseMarkup, lessonKind, lessonPageMarkup } from '../src/ui/courseView.js';
import { screenFrame } from '../src/ui/siteView.js';
import { overlayHtml } from '../src/ui/overlayView.js';

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
const PRACTICE_KIND = pageKind(PRACTICE_PAGE);
const PLACED_LESSONS = UNITS.flatMap((unit) => unit.lessons.map((lesson) => ({ unit, lesson })));
const COURSE_KINDS = [HOME_KIND, ...PLACED_LESSONS.map(({ lesson }) => lessonKind(lesson))];
const SITE_KINDS = [PRACTICE_KIND, ...DOC_PAGES.map((name) => pageKind(name))];
const LANGUAGES = Object.keys(DICTIONARIES);
const COURSE_LANGUAGES = Object.keys(LESSON_TEXT);
const PAGE_LANGUAGES = new Map([
  ...COURSE_KINDS.map((kind) => [kind, COURSE_LANGUAGES]),
  ...SITE_KINDS.map((kind) => [kind, LANGUAGES])
]);
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ENTRIES = {
  practice: join(ROOT, 'src', 'main.js'),
  lesson: join(ROOT, 'src', 'lesson.js'),
  site: join(ROOT, 'src', 'site.js')
};
const [COURSE_AD_SLOT] = ADSENSE_SLOTS;
const FIRST_PAGE = 0;
const DESCRIPTION_LIMIT = 160;
const VIEWPORT_META = '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">';
const ICON_LINKS = [
  `<link rel="icon" href="${SITE_ROOT}assets/icon.svg" type="image/svg+xml">`,
  `<link rel="apple-touch-icon" href="${SITE_ROOT}assets/icon-180.png">`
];
const STYLESHEETS = ['tokens', 'base', 'components', 'layout'];
const IMPORT_SPECIFIER = /from\s+'([^']+)'/g;
const VERSION_LENGTH = 8;

const absolute = (path) => `${SITE}/${path}`;
const literal = (value) => JSON.stringify(value);
const sitePath = (path) => relative(ROOT, path).split(sep).join('/');
const version = (source) => createHash('sha256').update(source).digest('hex').slice(0, VERSION_LENGTH);
const pagePath = (language, kind) => `${language}/${kind}`;
const pageAddress = (language, kind) => absolute(pagePath(language, kind));
const placeOf = (kind, section) => ({ kind, section, languages: PAGE_LANGUAGES.get(kind) });
const ogImage = (language) => absolute(`assets/og-${language}.png`);

function withinLimit(sentences) {
  const kept = [];
  for (const sentence of sentences) {
    if (kept.length && [...kept, sentence].join(' ').length > DESCRIPTION_LIMIT) break;
    kept.push(sentence);
  }
  return kept.join(' ');
}

function alternateTargets(kind) {
  const targets = PAGE_LANGUAGES.get(kind).map((language) => [language, pageAddress(language, kind)]);
  return kind === HOME_KIND ? [...targets, ['x-default', absolute('')]] : targets;
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
    image: ogImage(language),
    description: dictionary.description,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' }
  };
}

const siteNode = (language) => ({
  '@type': 'WebSite',
  name: DICTIONARIES[language].brand,
  url: absolute('')
});

const courseNode = (language) => ({
  '@type': 'CollectionPage',
  name: DICTIONARIES[language].course.title,
  url: pageAddress(language, HOME_KIND)
});

function courseSchema(language) {
  return {
    ...courseNode(language),
    inLanguage: language,
    image: ogImage(language),
    description: DICTIONARIES[language].course.description
  };
}

function lessonSchema(language, url, copy, description) {
  return {
    '@type': 'LearningResource',
    learningResourceType: 'Lesson',
    name: copy.title,
    url,
    inLanguage: language,
    image: ogImage(language),
    description,
    isPartOf: courseNode(language)
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
    image: ogImage(language),
    description: page.description,
    isPartOf: siteNode(language)
  };
}

function structuredData(schema) {
  const source = JSON.stringify({ '@context': 'https://schema.org', ...schema }, null, 2);
  return `<script type="application/ld+json">\n${source}\n</script>`;
}

function metadata(language, { url, kind, title: rawTitle, description: rawDescription, schema, canonical = true }) {
  const image = ogImage(language);
  const title = escape(rawTitle);
  const description = escape(rawDescription);
  return [
    VIEWPORT_META,
    `<title>${title}</title>`,
    `<meta name="description" content="${description}">`,
    ...(canonical ? [`<link rel="canonical" href="${url}">`] : []),
    ...alternates(kind),
    '<meta name="theme-color" content="#FAEDCD">',
    ...ICON_LINKS,
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
    ...PAGE_LANGUAGES.get(kind).filter((code) => code !== language)
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

function siteBody(dictionary, entry, content, overlays = []) {
  return [content, overlays, settingsMarkup(dictionary), entryScript(entry)];
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

function importMap(modules) {
  const imports = Object.fromEntries([...modules]
    .map(([path, stampedPath]) => [`${SITE_ROOT}${path}`, `${SITE_ROOT}${stampedPath}`]));
  return `<script type="importmap">\n${JSON.stringify({ imports }, null, 2)}\n</script>`;
}

const styleLinks = (styles) =>
  [...styles.values()].map((href) => `<link rel="stylesheet" href="${SITE_ROOT}${href}">`);

const entryScript = ({ path, modules }) =>
  `<script type="module" src="${SITE_ROOT}${modules.get(sitePath(path))}"></script>`;

function assets(entry, styles) {
  return [
    importMap(entry.modules),
    ...styleLinks(styles),
    ...[...entry.modules.values()].map((href) => `<link rel="modulepreload" href="${SITE_ROOT}${href}">`)
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
${body.map(html).filter(Boolean).map((line) => `${line}\n`).join('')}</body>
</html>
`;
}

function practicePage(language, entry, styles) {
  const dictionary = DICTIONARIES[language];
  const url = pageAddress(language, PRACTICE_KIND);
  const stage = tag('main', { class: 'stage screen__body' },
    tag('div', { class: 'app', 'data-table': true }, [splashMarkup(dictionary), tableMarkup(dictionary)]));
  return document(language, [
    ...metadata(language, {
      url,
      kind: PRACTICE_KIND,
      title: titleOf(dictionary),
      description: dictionary.description,
      schema: appSchema(language, url)
    }),
    ...assets(entry, styles)
  ], siteBody(dictionary, entry, screenFrame(dictionary, language, placeOf(PRACTICE_KIND, PRACTICE_PAGE), stage), [
    reportMarkup(dictionary),
    helpMarkup(dictionary, language),
    overlayHtml('loader', div('loader', backTilesHtml(LOADER_TILES)))
  ]));
}

function coursePage(language, entry, styles) {
  const dictionary = DICTIONARIES[language];
  return document(language, [
    ...metadata(language, {
      url: pageAddress(language, HOME_KIND),
      kind: HOME_KIND,
      title: titleOf(dictionary, dictionary.course.title),
      description: dictionary.course.description,
      schema: courseSchema(language)
    }),
    ...assets(entry, styles),
    adLoader()
  ], siteBody(dictionary, entry, courseMarkup(dictionary, language, {
    place: placeOf(HOME_KIND, HOME_PAGE),
    copy: LESSON_TEXT[language],
    ad: adUnit(COURSE_AD_SLOT)
  })), 'page');
}

function lessonPage(language, { unit, lesson }, entry, styles) {
  const dictionary = DICTIONARIES[language];
  const copy = LESSON_TEXT[language];
  const lessonCopy = copy.lessons[lesson.id];
  const kind = lessonKind(lesson);
  const url = pageAddress(language, kind);
  const description = withinLimit(lesson.beats
    .filter((beat) => beat.page === FIRST_PAGE)
    .map((beat) => plainLine(dictionary, lessonCopy.beats[beat.id])));
  return document(language, [
    ...metadata(language, {
      url,
      kind,
      title: titleOf(dictionary, lessonCopy.title),
      description,
      schema: lessonSchema(language, url, lessonCopy, description)
    }),
    ...assets(entry, styles)
  ], siteBody(dictionary, entry, lessonPageMarkup(dictionary, language, {
    place: placeOf(kind, HOME_PAGE),
    unit,
    lesson,
    copy
  })));
}

function docPage(language, name, entry, styles) {
  const dictionary = DICTIONARIES[language];
  const kind = pageKind(name);
  const url = pageAddress(language, kind);
  const monetized = AD_PAGES.includes(name);
  return document(language, [
    ...metadata(language, {
      url,
      kind,
      title: titleOf(dictionary, dictionary.doc[name].title),
      description: dictionary.doc[name].description,
      schema: docSchema(language, url, name)
    }),
    ...assets(entry, styles),
    ...(monetized ? [adLoader()] : [])
  ], siteBody(dictionary, entry, docMarkup(dictionary, language, {
    place: placeOf(kind, name),
    name,
    ads: monetized ? ADSENSE_SLOTS.map(adUnit) : []
  })), 'page');
}

function redirectPage() {
  const dictionary = DICTIONARIES[DEFAULT_LANGUAGE];
  const url = absolute('');
  return document(DEFAULT_LANGUAGE, [
    redirectScript(),
    ...metadata(DEFAULT_LANGUAGE, {
      url,
      kind: HOME_KIND,
      title: titleOf(dictionary, dictionary.course.title),
      description: dictionary.course.description,
      schema: { ...courseSchema(DEFAULT_LANGUAGE), url },
      canonical: false
    })
  ], []);
}

function notFoundPage(styles) {
  return document(DEFAULT_LANGUAGE, [
    VIEWPORT_META,
    '<meta name="robots" content="noindex">',
    `<title>${NOT_FOUND}</title>`,
    ...ICON_LINKS,
    ...styleLinks(styles)
  ], [tag('main', { class: 'splash page__center' }, [
    tag('h1', { class: 'splash__name' }, NOT_FOUND),
    link(escape(DICTIONARIES[DEFAULT_LANGUAGE].help.name), SITE_ROOT, 'btn btn--accent')
  ])], 'page');
}

function sitemapEntry(language, kind) {
  const links = alternateTargets(kind)
    .map(([hreflang, href]) => `      <xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}"/>`)
    .join('\n');
  return `    <url>
      <loc>${pageAddress(language, kind)}</loc>
${links}
      <changefreq>monthly</changefreq>
    </url>`;
}

function sitemap() {
  const entries = [...PAGE_LANGUAGES]
    .flatMap(([kind, languages]) => languages.map((language) => sitemapEntry(language, kind)))
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

async function readEntry(path) {
  return { path, modules: ordered(stamped(await readModules(path))) };
}

const practiceEntry = await readEntry(ENTRIES.practice);
const lessonEntry = await readEntry(ENTRIES.lesson);
const siteEntry = await readEntry(ENTRIES.site);
const styles = stamped(await readStylesheets());

await emit('index.html', redirectPage());

await Promise.all(COURSE_LANGUAGES.flatMap((language) => [
  emit(`${language}/index.html`, coursePage(language, siteEntry, styles)),
  ...PLACED_LESSONS.map((placed) => emit(`${language}/${lessonKind(placed.lesson)}index.html`,
    lessonPage(language, placed, lessonEntry, styles)))
]));

await Promise.all(LANGUAGES.flatMap((language) => [
  emit(`${language}/${PRACTICE_KIND}index.html`, practicePage(language, practiceEntry, styles)),
  ...DOC_PAGES.map((name) => emit(`${language}/${pageKind(name)}index.html`, docPage(language, name, siteEntry, styles)))
]));

await emit('404.html', notFoundPage(styles));

await emit('sitemap.xml', sitemap());
