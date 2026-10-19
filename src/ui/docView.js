import { DOC_PAGES } from '../core/locale.js';
import { SETTING_VALUES } from '../core/settings.js';
import { LANGUAGE_NAMES } from '../i18n/index.js';
import { anchor, classNames, div, escape, link, outlineNumber, tag } from './markup.js';
import { HREF } from './linkView.js';
import {
  GUIDE_CASES,
  articleBodyHtml,
  linesHtml,
  rankedCasesHtml,
  termAnchor,
  termAnchorId,
  termIds,
  termOf
} from './glossary.js';

const HOME_PATH = '../';
const SITE_PATH = '../../';
const CLOSE_MARK = '×';
const PART_PREFIX = 'part-';
const CLEARED_HASH = '#none';
const ACTIVE_CLASS = 'btn--on';
const [GUIDE_PAGE, PRIVACY_PAGE] = DOC_PAGES;
const TERM_PAGES = [GUIDE_PAGE];
const NAV_PAGES = [GUIDE_PAGE];

const siblingPath = (name) => `${HOME_PATH}${name}/`;
const translationPath = (language, name) => `${SITE_PATH}${language}/${name}/`;

const otherPages = (name) => DOC_PAGES.filter((page) => page !== name);

const partAnchorId = (name) => `${PART_PREFIX}${name}`;

const headingHtml = (title) => tag('h2', { class: 'doc__heading' }, escape(title));

const sectionHtml = (title, body) => tag('section', { class: 'help__group' }, [headingHtml(title), body]);

const linkListHtml = (dictionary, names) => div('lines surface',
  names.map((name) => anchor(escape(dictionary.doc.link[name]), HREF[name], 'link')));

const termCardHtml = (dictionary, id) => tag('article', { class: 'term', id: termAnchorId(id) }, [
  div('term__head', [
    tag('h3', { class: 'article__title' }, escape(termOf(dictionary, id).name)),
    link(CLOSE_MARK, CLEARED_HASH, 'term__close', { 'aria-label': dictionary.close })
  ]),
  articleBodyHtml(dictionary, id, termAnchor)
]);

const termLayerHtml = (dictionary) => tag('aside', { class: 'term-layer' },
  termIds(dictionary).map((id) => termCardHtml(dictionary, id)));

const groupHtml = (dictionary, { title, lines, cases }, number) => tag('section', { class: 'help__group' }, [
  tag('h3', { class: 'doc__subheading' }, escape(`${number} ${title}`)),
  linesHtml(dictionary, lines, classNames('lines', !cases && 'surface'), termAnchor),
  cases && rankedCasesHtml(dictionary, GUIDE_CASES, termAnchor)
]);

const partHtml = (dictionary, { name, title, lines, groups }, index) => tag('section', {
  class: 'doc__part',
  id: partAnchorId(name)
}, [
  headingHtml(`${outlineNumber(index)}. ${title}`),
  lines && linesHtml(dictionary, lines, 'lines', termAnchor),
  groups.map((group, order) => groupHtml(dictionary, group, outlineNumber(index, order)))
]);

const navHtml = (dictionary, name) => tag('nav', { class: 'doc__nav' }, [
  div('segment segment--wide', dictionary.doc[name].parts.map(({ name: part, title }) =>
    link(escape(title), `#${partAnchorId(part)}`, 'btn'))),
  link(escape(dictionary.doc.home), HOME_PATH, 'btn btn--accent')
]);

function guideBody(dictionary, ads) {
  const [opening, ...rest] = dictionary.doc.guide.parts.map((part, index) => partHtml(dictionary, part, index));
  return [opening, ads[0], rest, ads[1]];
}

const privacyBody = (dictionary) => [
  dictionary.doc.privacy.sections.map(({ title, lines, links }) =>
    sectionHtml(title, div('stack', [
      linesHtml(dictionary, lines, 'lines surface', termAnchor),
      links && linkListHtml(dictionary, links)
    ]))),
  footHtml(dictionary, PRIVACY_PAGE)
];

const BODIES = { guide: guideBody, privacy: privacyBody };

const barHtml = (dictionary, language, name) => tag('header', { class: 'doc__bar' }, [
  link(escape(dictionary.brand), HOME_PATH, 'doc__brand'),
  div('segment', SETTING_VALUES.language.map((code) =>
    link(escape(LANGUAGE_NAMES[code]), translationPath(code, name),
      classNames('btn', code === language && ACTIVE_CLASS))))
]);

const footHtml = (dictionary, name) => tag('footer', { class: 'split' }, [
  link(escape(dictionary.doc.home), HOME_PATH, 'btn btn--wide btn--accent'),
  otherPages(name).map((page) =>
    link(escape(dictionary.doc[page].nav), siblingPath(page), 'btn btn--wide'))
]);

export const AD_PAGES = [GUIDE_PAGE];

export const docMarkup = (dictionary, language, name, ads = []) => [
  barHtml(dictionary, language, name),
  NAV_PAGES.includes(name) && navHtml(dictionary, name),
  tag('main', { class: 'doc' }, [
    tag('h1', { class: 'doc__title' }, escape(dictionary.doc[name].title)),
    BODIES[name](dictionary, ads)
  ]),
  TERM_PAGES.includes(name) && termLayerHtml(dictionary)
].filter(Boolean);
