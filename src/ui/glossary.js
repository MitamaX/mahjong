import { GUARD } from '../core/danger.js';
import { parseFigure } from '../core/lesson.js';
import { TERM_FIGURES } from '../lessons/terms.js';
import { figureHtml, figureStyle } from './figureView.js';
import { button, classNames, div, escape, html, link, outlineNumber, tag, text } from './markup.js';

const LINE_BREAK = '';
const LINK_PATTERN = /\[\[(\w+)(?:\|([^\]]+))?\]\]/g;
const TERM_PREFIX = 'term-';
const CLOSE_MARK = '×';
const CLEARED_HASH = '#none';
const NAKA_SUJI = 'nakaSuji';
const KATA_SUJI = 'kataSuji';

export const PANEL_CASES = [GUARD.GENBUTSU, GUARD.HONOR, GUARD.KABE, GUARD.SUJI];
const GUIDE_CASES = [
  { id: GUARD.GENBUTSU },
  { id: GUARD.HONOR },
  { id: GUARD.KABE },
  { id: GUARD.SUJI, subs: [NAKA_SUJI, KATA_SUJI] },
  { id: GUARD.NO_SUJI }
];

const GLOSSARY_GROUPS = [
  { name: 'tiles', ids: ['suited', 'honor', 'man', 'pin', 'sou', 'winds', 'dragons'] },
  {
    name: 'flow',
    ids: ['shimocha', 'toimen', 'kamicha', 'oya', 'ko', 'hand', 'wall', 'draw', 'turn', 'discard', 'dora', 'indicator']
  },
  { name: 'melds', ids: ['agari', 'meld', 'run', 'triplet', 'pair', 'tenpai'] },
  { name: 'build', ids: ['build', 'taatsu', 'toitsu', 'ukeire', 'shanten', 'block', 'fiveBlocks', 'isolated', 'menzen'] },
  { name: 'waits', ids: ['wait', 'ryanmen', 'kanchan', 'penchan', 'tanki', 'shanpon'] },
  { name: 'riichi', ids: ['riichi', 'declare', 'tsumogiri', 'tsumo', 'ron', 'dealIn', 'furiten'] },
  {
    name: 'defense',
    ids: ['betaori', 'safeTile', 'genbutsu', 'suji', NAKA_SUJI, KATA_SUJI, 'kabe', 'noSuji', 'seen', 'chase']
  }
];

const FIGURES = Object.fromEntries(Object.entries(TERM_FIGURES).map(([id, spec]) => [id, parseFigure(spec)]));
const CARD_FIGURE = 'term-figure';
const CASE_FIGURE = 'case__figure';

export const TERM_FIGURE_STYLE = figureStyle(...Object.values(FIGURES));

export const termOf = (dictionary, id) => dictionary.glossary.term[id];

export const termIds = (dictionary) => Object.keys(dictionary.glossary.term);

const termAnchorId = (id) => `${TERM_PREFIX}${id}`;

const termLabel = (dictionary, id, label) => escape(label ?? termOf(dictionary, id).name);

export const inlineName = (dictionary, id) => termOf(dictionary, id).name.toLowerCase();

export const termButton = (dictionary, id, label) =>
  button(termLabel(dictionary, id, label), { class: 'link', 'data-term': id });

export const termAnchor = (dictionary, id, label) =>
  link(termLabel(dictionary, id, label), `#${termAnchorId(id)}`, 'link');

export const helpGroupHtml = (name, heading, body) => tag(name, { class: 'help__group' }, [heading, body]);

export const sectionHtml = (title, body) => helpGroupHtml('div', text(title, 'caption'), body);

export const captionOf = (dictionary, fallback = () => null) => (key) => termOf(dictionary, key)?.name ?? fallback(key);

const termFigureHtml = (dictionary, id, className) =>
  id in FIGURES && figureHtml(FIGURES[id], { class: className }, captionOf(dictionary));

const linkLabel = (dictionary, id, label) => label ?? inlineName(dictionary, id);

export const plainLine = (dictionary, source) =>
  source.replace(LINK_PATTERN, (unused, id, label) => linkLabel(dictionary, id, label));

export function lineHtml(dictionary, source, linkTerm) {
  const parts = [];
  let read = 0;
  for (const match of source.matchAll(LINK_PATTERN)) {
    if (match.index > read) parts.push(escape(source.slice(read, match.index)));
    parts.push(linkTerm(dictionary, match[1], linkLabel(dictionary, match[1], match[2])));
    read = match.index + match[0].length;
  }
  if (read < source.length) parts.push(escape(source.slice(read)));
  return html(['<span>', parts, '</span>']);
}

export const linesHtml = (dictionary, lines, className, linkTerm) => div(className, lines.map((line) =>
  (line === LINE_BREAK ? div('lines__break') : lineHtml(dictionary, line, linkTerm))));

const caseBodyHtml = (dictionary, id, linkTerm) => [
  div('row', [
    text(termOf(dictionary, id).name, 'case__name'),
    termFigureHtml(dictionary, id, CASE_FIGURE)
  ]),
  lineHtml(dictionary, termOf(dictionary, id).text, linkTerm)
];

export const guardCaseHtml = (dictionary, id, linkTerm) => div('case surface', caseBodyHtml(dictionary, id, linkTerm));

const rankEntries = (cases) => cases.flatMap(({ id, subs = [] }, index) => [
  { id, number: outlineNumber(index) },
  ...subs.map((sub, order) => ({ id: sub, number: outlineNumber(index, order) }))
]);

const RANKED_CASES = rankEntries(GUIDE_CASES);

export const CASE_FIGURE_STYLE = figureStyle(...RANKED_CASES.map(({ id }) => FIGURES[id]));

export const rankedCasesHtml = (dictionary, linkTerm) => tag('div', { class: 'rank', style: CASE_FIGURE_STYLE },
  RANKED_CASES.map(({ id, number }) => div('rank__item surface', [
    text(number, 'rank__number'),
    div('case', caseBodyHtml(dictionary, id, linkTerm))
  ])));

export const articleBodyHtml = (dictionary, id, linkTerm) => [
  termFigureHtml(dictionary, id, CARD_FIGURE),
  lineHtml(dictionary, termOf(dictionary, id).text, linkTerm)
];

const termCardHtml = (dictionary, id) => tag('article', { class: 'term', id: termAnchorId(id) }, [
  div('term__head', [
    tag('h3', { class: 'article__title' }, escape(termOf(dictionary, id).name)),
    link(CLOSE_MARK, CLEARED_HASH, 'term__close', { 'aria-label': dictionary.close })
  ]),
  articleBodyHtml(dictionary, id, termAnchor)
]);

export const termLayerHtml = (dictionary, modifier) => tag('aside', {
  class: classNames('term-layer', modifier),
  style: TERM_FIGURE_STYLE
}, termIds(dictionary).map((id) => termCardHtml(dictionary, id)));

export const glossaryIndexHtml = (dictionary, linkTerm) =>
  GLOSSARY_GROUPS.map(({ name, ids }) => sectionHtml(dictionary.glossary.group[name],
    div('index surface', ids.map((id) => linkTerm(dictionary, id)))));
