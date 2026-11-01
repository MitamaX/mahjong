import { GUIDE_PAGE } from '../core/locale.js';
import { anchor, classNames, div, escape, outlineNumber, tag } from './markup.js';
import { HREF } from './linkView.js';
import { railHtml } from './railView.js';
import { scrollFrame } from './siteView.js';
import { helpGroupHtml, linesHtml, rankedCasesHtml, termAnchor, termLayerHtml } from './glossary.js';

const PART_PREFIX = 'part-';
const TERM_PAGES = [GUIDE_PAGE];
const RAIL_PAGES = [GUIDE_PAGE];

const partAnchorId = (name) => `${PART_PREFIX}${name}`;

const headingHtml = (title) => tag('h2', { class: 'doc__heading' }, escape(title));

const subheadingHtml = (title) => tag('h3', { class: 'doc__subheading' }, escape(title));

const linkListHtml = (dictionary, names) => div('lines surface',
  names.map((name) => anchor(escape(dictionary.doc.link[name]), HREF[name], 'link')));

const groupHtml = (dictionary, { title, lines, cases }, number) =>
  helpGroupHtml('section', subheadingHtml(`${number} ${title}`), [
    linesHtml(dictionary, lines, classNames('lines', !cases && 'surface'), termAnchor),
    cases && rankedCasesHtml(dictionary, termAnchor)
  ]);

const partHtml = (dictionary, { name, title, lines, groups }, index) => tag('section', {
  class: 'doc__part',
  id: partAnchorId(name)
}, [
  headingHtml(`${outlineNumber(index)}. ${title}`),
  lines && linesHtml(dictionary, lines, 'lines', termAnchor),
  groups.map((group, order) => groupHtml(dictionary, group, outlineNumber(index, order)))
]);

const partRail = (dictionary, name) => railHtml(dictionary.doc[name].parts.map(({ name: part, title }, index) =>
  ({ id: partAnchorId(part), number: outlineNumber(index), title })));

function guideBody(dictionary, ads) {
  const [opening, ...rest] = dictionary.doc.guide.parts.map((part, index) => partHtml(dictionary, part, index));
  return [opening, ads[0], rest, ads[1]];
}

const privacyBody = (dictionary) => dictionary.doc.privacy.sections.map(({ title, lines, links }) =>
  helpGroupHtml('section', headingHtml(title), div('stack', [
    linesHtml(dictionary, lines, 'lines surface', termAnchor),
    links && linkListHtml(dictionary, links)
  ])));

const BODIES = { guide: guideBody, privacy: privacyBody };

export const AD_PAGES = [GUIDE_PAGE];

export const docMarkup = (dictionary, language, { place, name, ads = [] }) =>
  scrollFrame(dictionary, language, place, [
    tag('main', { class: 'doc sheet' }, [
      tag('h1', { class: 'doc__title' }, escape(dictionary.doc[name].title)),
      BODIES[name](dictionary, ads)
    ]),
    RAIL_PAGES.includes(name) && partRail(dictionary, name),
    TERM_PAGES.includes(name) && termLayerHtml(dictionary)
  ]);
