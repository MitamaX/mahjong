import { GUARD } from '../core/danger.js';
import { SUIT, Tiles } from '../core/tiles.js';
import { tileHtml } from './tileView.js';
import { doraTilesHtml } from './board.js';
import { button, div, escape, html, link, outlineNumber, text } from './markup.js';

const CITE_MARK = 'cite';
const SAFE_MARK = 'best';
const PLUS = '+';
const ARROW = '→';
const LINE_BREAK = '';
const LINK_PATTERN = /\[\[(\w+)(?:\|([^\]]+))?\]\]/g;
const TERM_PREFIX = 'term-';
const NAKA_SUJI = 'nakaSuji';
const KATA_SUJI = 'kataSuji';

export const PANEL_CASES = [GUARD.GENBUTSU, GUARD.HONOR, GUARD.KABE, GUARD.SUJI];
export const GUIDE_CASES = [
  { id: GUARD.GENBUTSU },
  { id: GUARD.HONOR },
  { id: GUARD.KABE },
  { id: GUARD.SUJI, subs: [NAKA_SUJI, KATA_SUJI] },
  { id: GUARD.NO_SUJI }
];

export const GLOSSARY_GROUPS = [
  { name: 'flow', ids: ['turn', 'oya', 'ko', 'dora', 'draw'] },
  { name: 'win', ids: ['agari', 'tenpai', 'shanten', 'ukeire', 'riichi', 'tsumo', 'ron', 'dealIn', 'furiten'] },
  { name: 'wait', ids: ['wait', 'ryanmen', 'kanchan', 'penchan', 'tanki', 'shanpon'] },
  { name: 'defense', ids: ['safeTile', 'genbutsu', 'suji', NAKA_SUJI, KATA_SUJI, 'kabe', 'honor', 'noSuji'] }
];

const man = (rank) => Tiles.indexOf(SUIT.MAN, rank);
const pin = (rank) => Tiles.indexOf(SUIT.PIN, rank);
const sou = (rank) => Tiles.indexOf(SUIT.SOU, rank);
const honor = (rank) => Tiles.indexOf(SUIT.HONOR, rank);

const set = (...tiles) => ({ tiles });
const cite = (...tiles) => ({ tiles, mark: CITE_MARK });
const best = (...tiles) => ({ tiles, mark: SAFE_MARK });
const run = (suit, low) => set(suit(low), suit(low + 1), suit(low + 2));

const EAST = honor(1);
const SOUTH = honor(2);
const WEST = honor(3);
const NORTH = honor(4);
const WHITE = honor(5);
const RED = honor(7);

const MAN_RUN = run(man, 1);
const PIN_RUN = run(pin, 4);
const SOU_RUN = run(sou, 7);
const EAST_PAIR = set(EAST, EAST);
const RED_PAIR = set(RED, RED);

const TANKI_HAND = [MAN_RUN, PIN_RUN, SOU_RUN, set(EAST, EAST, EAST), best(WHITE)];
const WIDE_HAND = [run(man, 2), run(pin, 5), run(sou, 2), best(sou(6), sou(7)), RED_PAIR];
const ONE_AWAY_HAND = [MAN_RUN, PIN_RUN, SOU_RUN, EAST_PAIR, cite(WHITE, RED)];
const TWO_AWAY_HAND = [MAN_RUN, set(pin(4), pin(5)), SOU_RUN, EAST_PAIR, cite(pin(9), WHITE, RED)];
const THREE_AWAY_HAND = [MAN_RUN, set(pin(4), pin(5)), set(sou(8), sou(9)), EAST_PAIR,
  cite(pin(9), sou(2), WHITE, RED)];
const FURITEN_HAND = [run(man, 2), run(man, 6), best(pin(3), pin(4)), run(sou, 2), RED_PAIR];
const WAIT_NOTES = { draw: 'wait' };
const winRows = (note) => [{ hold: TANKI_HAND, draw: [WHITE], notes: { draw: note } }];
const besideSafe = (term) => ({ hold: 'safe', safe: term });

export const FIGURES = {
  turn: [{ hold: [cite(EAST, SOUTH, WEST, NORTH)] }],
  oya: [{ hold: [cite(EAST)] }],
  ko: [{ hold: [cite(SOUTH, WEST, NORTH)] }],
  dora: [{ hold: [cite(man(3))], rack: true, safe: [man(4)], notes: { hold: 'indicator', safe: 'dora' } }],
  agari: winRows('wait'),
  tenpai: [{ hold: WIDE_HAND, draw: [sou(5), sou(8)], notes: WAIT_NOTES }],
  shanten: [
    { hold: THREE_AWAY_HAND, shanten: 3 },
    { hold: TWO_AWAY_HAND, shanten: 2 },
    { hold: ONE_AWAY_HAND, shanten: 1 }
  ],
  ukeire: [{ hold: [cite(pin(5), pin(6))], draw: [pin(4), pin(7)], notes: { draw: 'ukeire' } }],
  riichi: [{ hold: [cite(man(5))], turned: true, notes: { hold: 'declare' } }],
  tsumo: [{ hold: WIDE_HAND, draw: [sou(5)], notes: { draw: 'tsumo' } }],
  ron: winRows('ron'),
  dealIn: winRows('dealIn'),
  furiten: [{ hold: FURITEN_HAND, safe: [pin(2), pin(5)], notes: { safe: 'furiten' } }],
  wait: [{ hold: WIDE_HAND, safe: [sou(5), sou(8)], notes: { safe: 'wait' } }],
  ryanmen: [{ hold: [cite(pin(3), pin(4))], draw: [pin(2), pin(5)], notes: WAIT_NOTES }],
  kanchan: [{ hold: [cite(pin(3), pin(5))], draw: [pin(4)], notes: WAIT_NOTES }],
  penchan: [{ hold: [cite(pin(1), pin(2))], draw: [pin(3)], notes: WAIT_NOTES }],
  tanki: [{ hold: [cite(pin(5))], draw: [pin(5)], notes: WAIT_NOTES }],
  shanpon: [{ hold: [cite(pin(3), pin(3)), cite(pin(5), pin(5))], draw: [pin(3), pin(5)], notes: WAIT_NOTES }],
  genbutsu: [{ hold: [cite(pin(5))], safe: [pin(5)], notes: { hold: 'discard', safe: 'safe' } }],
  suji: [{ hold: [cite(man(4))], safe: [man(1), man(7)], notes: besideSafe('suji') }],
  nakaSuji: [{ hold: [cite(man(2), man(8))], safe: [man(5)], notes: besideSafe('nakaSuji') }],
  kataSuji: [{ hold: [cite(man(2))], safe: [man(5)], notes: besideSafe('kataSuji') }],
  kabe: [{ hold: [cite(sou(3), sou(3), sou(3), sou(3))], safe: [sou(2)], notes: { hold: 'kabe' } }],
  honor: [{ hold: [cite(WEST, WEST, WEST)], safe: [WEST], notes: { hold: 'seen' } }]
};

const figuresOf = (id) => FIGURES[id] ?? [];

export const termOf = (dictionary, id) => dictionary.glossary.term[id];

export const termIds = (dictionary) => Object.keys(dictionary.glossary.term);

export const termAnchorId = (id) => `${TERM_PREFIX}${id}`;

const termLabel = (dictionary, id, label) => escape(label ?? termOf(dictionary, id).name);

export const termButton = (dictionary, id, label) =>
  button(termLabel(dictionary, id, label), { class: 'link', 'data-term': id });

export const termAnchor = (dictionary, id, label) =>
  link(termLabel(dictionary, id, label), `#${termAnchorId(id)}`, 'link');

const tileRow = (tiles, mark, turned) =>
  div('tile-row', tiles.map((tile) => tileHtml(tile, { mark, turned })));

const groupHtml = ({ tiles, mark }, { turned, rack } = {}) =>
  (rack ? div('rack rack--figure', doraTilesHtml(tiles[0], mark)) : tileRow(tiles, mark, turned));

const handHtml = (groups, options) => div('hand-figure', groups.map((group) => groupHtml(group, options)));

export const sectionHtml = (title, body) => div('help__group', [text(title, 'caption'), body]);

const noteLabel = (dictionary, note) => dictionary.annotation[note] ?? termOf(dictionary, note).name;

const annotatedHtml = (dictionary, body, note) => (note
  ? div('annotated', [body, text(noteLabel(dictionary, note), 'caption annotated__note')])
  : body);

export function figureParts(dictionary, { hold, draw, safe, turned, rack, shanten, notes = {} }) {
  const annotate = (body, part) => annotatedHtml(dictionary, body, notes[part]);
  return html([
    shanten !== undefined && text(dictionary.shantenMark(shanten), 'caption'),
    annotate(handHtml(hold, { turned, rack }), 'hold'),
    draw && [text(PLUS, 'op'), annotate(tileRow(draw, SAFE_MARK), 'draw')],
    safe && [text(ARROW, 'op'), annotate(tileRow(safe, SAFE_MARK), 'safe')]
  ]);
}

export const figureRows = (dictionary, id) =>
  figuresOf(id).map((row) => div('row', figureParts(dictionary, row)));

export function lineHtml(dictionary, source, linkTerm) {
  const parts = [];
  let read = 0;
  for (const match of source.matchAll(LINK_PATTERN)) {
    if (match.index > read) parts.push(escape(source.slice(read, match.index)));
    parts.push(linkTerm(dictionary, match[1], match[2]));
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
    figuresOf(id).map((row) => figureParts(dictionary, row))
  ]),
  lineHtml(dictionary, termOf(dictionary, id).text, linkTerm)
];

export const guardCaseHtml = (dictionary, id, linkTerm) => div('case surface', caseBodyHtml(dictionary, id, linkTerm));

const rankEntries = (cases) => cases.flatMap(({ id, subs = [] }, index) => [
  { id, number: outlineNumber(index) },
  ...subs.map((sub, order) => ({ id: sub, number: outlineNumber(index, order) }))
]);

export const rankedCasesHtml = (dictionary, cases, linkTerm) => div('rank', rankEntries(cases).map(({ id, number }) =>
  div('rank__item surface', [
    text(number, 'rank__number'),
    div('case', caseBodyHtml(dictionary, id, linkTerm))
  ])));

export const articleBodyHtml = (dictionary, id, linkTerm) => [
  figureRows(dictionary, id),
  lineHtml(dictionary, termOf(dictionary, id).text, linkTerm)
];

export const glossaryIndexHtml = (dictionary, linkTerm) =>
  GLOSSARY_GROUPS.map(({ name, ids }) => sectionHtml(dictionary.glossary.group[name],
    div('index surface', ids.map((id) => linkTerm(dictionary, id)))));
