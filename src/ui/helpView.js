import { GUARD } from '../core/danger.js';
import { SUIT, Tiles } from '../core/tiles.js';
import { PanelView, panelMarkup } from './panelView.js';
import { tileHtml } from './tileView.js';
import { doraTilesHtml } from './board.js';
import { anchor, button, classNames, div, escape, html, tag, text } from './markup.js';
import { iconSvg } from './iconView.js';

const CITE_MARK = 'cite';
const SAFE_MARK = 'best';
const PLUS = '+';
const EQUAL = '=';
const BACK = '←';
const LINK_PATTERN = /\[\[(\w+)(?:\|([^\]]+))?\]\]/g;
const TABS = ['basic', 'defense', 'terms', 'info'];
const TEXT_SECTIONS = ['control', 'flow'];
const DEFENSE_CASES = [GUARD.GENBUTSU, GUARD.HONOR, GUARD.KABE, GUARD.SUJI];
const STACK_CLASS = 'help__stack';
const ACTIVE_CLASS = 'btn--on';
const REPOSITORY = { label: 'MitamaX/mahjong', href: 'https://github.com/MitamaX/mahjong' };
const INFO_LINKS = [
  { name: 'issues', label: 'Issues', href: `${REPOSITORY.href}/issues` },
  { name: 'art', label: 'FluffyStuff', href: 'https://github.com/FluffyStuff/riichi-mahjong-tiles' },
  { name: 'license', label: 'CC0 1.0', href: 'https://creativecommons.org/publicdomain/zero/1.0/' }
];
const GLOSSARY_GROUPS = [
  { name: 'flow', ids: ['turn', 'oya', 'ko', 'dora', 'draw'] },
  { name: 'win', ids: ['agari', 'tenpai', 'shanten', 'ukeire', 'riichi', 'tsumo', 'ron', 'dealIn', 'furiten'] },
  { name: 'wait', ids: ['wait', 'ryanmen', 'kanchan', 'penchan', 'tanki', 'shanpon'] },
  { name: 'defense', ids: ['safeTile', 'genbutsu', 'suji', 'kabe', 'honor', 'noSuji'] }
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
const WIN_ROWS = [{ hold: TANKI_HAND, draw: [WHITE] }];

const FIGURES = {
  turn: [{ hold: [cite(EAST, SOUTH, WEST, NORTH)] }],
  oya: [{ hold: [cite(EAST)] }],
  ko: [{ hold: [cite(SOUTH, WEST, NORTH)] }],
  dora: [{ hold: [cite(man(3))], rack: true, safe: [man(4)] }],
  agari: WIN_ROWS,
  tenpai: [{ hold: WIDE_HAND, draw: [sou(5), sou(8)] }],
  shanten: [
    { hold: THREE_AWAY_HAND, shanten: 3 },
    { hold: TWO_AWAY_HAND, shanten: 2 },
    { hold: ONE_AWAY_HAND, shanten: 1 }
  ],
  ukeire: [{ hold: [cite(pin(5), pin(6))], draw: [pin(4), pin(7)] }],
  riichi: [{ hold: [cite(man(5))], turned: true }],
  tsumo: [{ hold: WIDE_HAND, draw: [sou(5)] }],
  ron: WIN_ROWS,
  dealIn: WIN_ROWS,
  furiten: [{ hold: FURITEN_HAND, safe: [pin(2), pin(5)] }],
  wait: [{ hold: WIDE_HAND, safe: [sou(5), sou(8)] }],
  ryanmen: [{ hold: [cite(pin(3), pin(4))], draw: [pin(2), pin(5)] }],
  kanchan: [{ hold: [cite(pin(3), pin(5))], draw: [pin(4)] }],
  penchan: [{ hold: [cite(pin(1), pin(2))], draw: [pin(3)] }],
  tanki: [{ hold: [cite(pin(5))], draw: [pin(5)] }],
  shanpon: [{ hold: [cite(pin(3), pin(3)), cite(pin(5), pin(5))], draw: [pin(3), pin(5)] }],
  genbutsu: [{ hold: [cite(pin(5))], safe: [pin(5)] }],
  suji: [{ hold: [cite(man(4))], safe: [man(1), man(7)] }],
  kabe: [{ hold: [cite(sou(3), sou(3), sou(3), sou(3))], safe: [sou(2)] }],
  honor: [{ hold: [cite(WEST, WEST, WEST)], safe: [WEST] }],
  noSuji: [{ hold: [cite(man(3))], safe: [man(5)] }]
};

const term = (dictionary, id) => dictionary.glossary.term[id];

const tileRow = (tiles, mark, turned) =>
  div('tile-row', tiles.map((tile) => tileHtml(tile, { mark, turned })));

const groupHtml = ({ tiles, mark }, { turned, rack } = {}) =>
  (rack ? div('rack rack--figure', doraTilesHtml(tiles[0], mark)) : tileRow(tiles, mark, turned));

const handHtml = (groups, options) => div('hand-figure', groups.map((group) => groupHtml(group, options)));

const sectionHtml = (title, body) => div('help__group', [text(title, 'caption'), body]);

const termLink = (dictionary, id, label) =>
  button(escape(label ?? term(dictionary, id).name), { class: 'link', 'data-term': id });

function figureParts(dictionary, { hold, draw, safe, turned, rack, shanten }) {
  return html([
    shanten !== undefined && text(dictionary.shantenMark(shanten), 'caption'),
    handHtml(hold, { turned, rack }),
    draw && [text(PLUS, 'op'), tileRow(draw, SAFE_MARK)],
    safe && [text(EQUAL, 'op'), tileRow(safe, SAFE_MARK)]
  ]);
}

const figureRows = (dictionary, id) =>
  (FIGURES[id] ?? []).map((row) => div('row', figureParts(dictionary, row)));

function lineHtml(dictionary, source) {
  const parts = [];
  let read = 0;
  for (const match of source.matchAll(LINK_PATTERN)) {
    if (match.index > read) parts.push(escape(source.slice(read, match.index)));
    parts.push(termLink(dictionary, match[1], match[2]));
    read = match.index + match[0].length;
  }
  if (read < source.length) parts.push(escape(source.slice(read)));
  return tag('span', {}, parts);
}

const linesHtml = (dictionary, lines, className) =>
  div(className, lines.map((line) => lineHtml(dictionary, line)));

const guardCase = (dictionary, id) => div('case surface', [
  div('row', [
    text(term(dictionary, id).name, 'case__name'),
    FIGURES[id].map((row) => figureParts(dictionary, row))
  ]),
  lineHtml(dictionary, term(dictionary, id).text)
]);

const articleHtml = (dictionary, id) => tag('div', { class: 'article surface', 'data-article': id, hidden: true }, [
  div('row', [
    button(BACK, { class: 'link', 'data-back': true }),
    text(term(dictionary, id).name, 'article__title')
  ]),
  figureRows(dictionary, id),
  lineHtml(dictionary, term(dictionary, id).text)
]);

const basicPane = (dictionary) => [
  text(dictionary.help.name, 'help__name'),
  linesHtml(dictionary, dictionary.help.intro, 'lines'),
  TEXT_SECTIONS.map((name) => sectionHtml(dictionary.help[name].title,
    linesHtml(dictionary, dictionary.help[name].lines, 'lines surface')))
];

const defensePane = (dictionary) =>
  div('guide', DEFENSE_CASES.map((id) => guardCase(dictionary, id)));

const termsPane = (dictionary) => [
  tag('div', { class: STACK_CLASS, 'data-glossary': true }, GLOSSARY_GROUPS.map(({ name, ids }) =>
    sectionHtml(dictionary.glossary.group[name],
      div('index surface', ids.map((id) => termLink(dictionary, id)))))),
  Object.keys(dictionary.glossary.term).map((id) => articleHtml(dictionary, id))
];

const infoPane = (dictionary) => [
  text(dictionary.help.name, 'help__name'),
  anchor([iconSvg('github'), escape(REPOSITORY.label)], REPOSITORY.href, 'btn btn--wide btn--brand'),
  div('info surface', INFO_LINKS.map(({ name, label, href }) => div('option', [
    text(dictionary.help.info[name], 'option__label'),
    anchor(escape(label), href, 'link')
  ])))
];

const PANES = { basic: basicPane, defense: defensePane, terms: termsPane, info: infoPane };

const paneHtml = (dictionary, name) => tag('div', {
  class: STACK_CLASS,
  'data-pane': name,
  hidden: name !== TABS[0]
}, PANES[name](dictionary));

export const helpMarkup = (dictionary) => panelMarkup({
  modifier: 'panel--help',
  title: dictionary.help.title,
  close: dictionary.close
}, [
  tag('div', { class: 'segment segment--wide' },
    TABS.map((name) => button(escape(dictionary.help.tab[name]), {
      class: classNames('btn', name === TABS[0] && ACTIVE_CLASS),
      'data-tab': name
    }))),
  tag('div', { class: 'help', 'data-help-body': true }, TABS.map((name) => paneHtml(dictionary, name)))
]);

export class HelpView extends PanelView {
  constructor(root) {
    super(root);
    this.tab = TABS[0];
    this.article = null;
    this.trail = [];
    this.body = this.node('help-body');
    this.root.addEventListener('click', (event) => this.dispatch(event.target.closest('[data-tab], [data-term], [data-back]')));
  }

  dispatch(node) {
    if (!node) return;
    if (node.dataset.tab) return this.openTab(node.dataset.tab);
    if (node.dataset.term) return this.openTerm(node.dataset.term);
    return this.back();
  }

  openTab(name) {
    this.tab = name;
    this.article = null;
    this.trail = [];
    this.render();
  }

  openTerm(id) {
    this.trail.push({ tab: this.tab, article: this.article, scroll: this.body.scrollTop });
    this.tab = 'terms';
    this.article = id;
    this.render();
  }

  back() {
    const spot = this.trail.pop();
    if (!spot) return;
    this.tab = spot.tab;
    this.article = spot.article;
    this.render(spot.scroll);
  }

  render(scroll = 0) {
    this.root.querySelectorAll('[data-tab]').forEach((node) => {
      node.classList.toggle(ACTIVE_CLASS, node.dataset.tab === this.tab);
    });
    this.root.querySelectorAll('[data-pane]').forEach((node) => {
      node.hidden = node.dataset.pane !== this.tab;
    });
    this.node('glossary').hidden = this.article !== null;
    this.root.querySelectorAll('[data-article]').forEach((node) => {
      node.hidden = node.dataset.article !== this.article;
    });
    this.body.scrollTop = scroll;
  }
}
