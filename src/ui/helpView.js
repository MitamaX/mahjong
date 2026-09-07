import { GUARD } from '../core/danger.js';
import { SUIT, Tiles } from '../core/tiles.js';
import { PanelView } from './panelView.js';
import { tileNode } from './tileView.js';
import { doraTiles } from './board.js';
import { box, link, span } from './dom.js';
import { iconSvg } from './iconView.js';
import { strings } from '../i18n/index.js';

const CITE_MARK = 'cite';
const SAFE_MARK = 'best';
const PLUS = '+';
const EQUAL = '=';
const BACK = '←';
const LINK_PATTERN = /\[\[(\w+)(?:\|([^\]]+))?\]\]/g;
const TABS = ['basic', 'defense', 'terms', 'info'];
const TEXT_SECTIONS = ['control', 'flow'];
const DEFENSE_CASES = [GUARD.GENBUTSU, GUARD.HONOR, GUARD.KABE, GUARD.SUJI];
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

const term = (id) => strings().glossary.term[id];

const tileRow = (tiles, mark, turned) =>
  box('tile-row', tiles.map((tile) => tileNode(tile, { mark, turned })));

const groupNode = ({ tiles, mark }, { turned, rack } = {}) =>
  (rack ? box('rack rack--figure', doraTiles(tiles[0], mark)) : tileRow(tiles, mark, turned));

const handNode = (groups, options) => box('hand-figure', groups.map((group) => groupNode(group, options)));

const sectionNode = (title, body) => box('help__group', [span(title, 'caption'), body]);

function figureParts({ hold, draw, safe, turned, rack, shanten }) {
  const parts = [];
  if (shanten !== undefined) parts.push(span(strings().shantenMark(shanten), 'caption'));
  parts.push(handNode(hold, { turned, rack }));
  if (draw) parts.push(span(PLUS, 'op'), tileRow(draw, SAFE_MARK));
  if (safe) parts.push(span(EQUAL, 'op'), tileRow(safe, SAFE_MARK));
  return parts;
}

const figureRows = (id) => (FIGURES[id] ?? []).map((row) => box('row', figureParts(row)));

function buttonNode(label, className, onClick) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = className;
  button.textContent = label;
  button.addEventListener('click', onClick);
  return button;
}

function brandLink({ label, href }) {
  const node = link(label, href, 'btn btn--wide btn--brand');
  node.insertAdjacentHTML('afterbegin', iconSvg('github'));
  return node;
}

function textParts(text) {
  const parts = [];
  let read = 0;
  for (const match of text.matchAll(LINK_PATTERN)) {
    if (match.index > read) parts.push(text.slice(read, match.index));
    parts.push({ id: match[1], label: match[2] });
    read = match.index + match[0].length;
  }
  if (read < text.length) parts.push(text.slice(read));
  return parts;
}

export class HelpView extends PanelView {
  get modifier() {
    return 'panel--help';
  }

  get title() {
    return strings().help.title;
  }

  content() {
    return `
      <div class="segment segment--wide" data-tabs></div>
      <div class="help" data-help-body></div>
    `;
  }

  bind() {
    this.trail = this.trail ?? [];
    this.render(this.tab ?? TABS[0]);
  }

  render(tab, scroll = 0) {
    this.tab = tab;
    this.node('tabs').replaceChildren(...TABS.map((name) => this.tabButton(name)));
    const body = this.node('help-body');
    body.replaceChildren(...this.sections());
    body.scrollTop = scroll;
  }

  spot() {
    return { tab: this.tab, article: this.article ?? null, scroll: this.node('help-body').scrollTop };
  }

  openTab(name) {
    this.article = null;
    this.trail = [];
    this.render(name);
  }

  openTerm(id) {
    this.trail.push(this.spot());
    this.article = id;
    this.render('terms');
  }

  back() {
    const spot = this.trail.pop();
    if (!spot) return;
    this.article = spot.article;
    this.render(spot.tab, spot.scroll);
  }

  tabButton(name) {
    const active = name === this.tab ? 'btn--on' : '';
    return buttonNode(strings().help.tab[name], `btn ${active}`, () => this.openTab(name));
  }

  sections() {
    if (this.tab === 'defense') return [box('guide', DEFENSE_CASES.map((id) => this.guardCase(id)))];
    if (this.tab === 'terms') return this.termSections();
    if (this.tab === 'info') return this.infoSections();
    return this.basicSections();
  }

  infoSections() {
    const { help } = strings();
    const rows = INFO_LINKS.map(({ name, label, href }) =>
      box('option', [span(help.info[name], 'option__label'), link(label, href, 'link')]));
    return [span(help.name, 'help__name'), brandLink(REPOSITORY), box('info surface', rows)];
  }

  basicSections() {
    const { help } = strings();
    return [
      span(help.name, 'help__name'),
      this.linesNode(help.intro, 'lines'),
      ...TEXT_SECTIONS.map((name) =>
        sectionNode(help[name].title, this.linesNode(help[name].lines, 'lines surface')))
    ];
  }

  guardCase(id) {
    const head = box('row', [span(term(id).name, 'case__name'), ...FIGURES[id].flatMap(figureParts)]);
    return box('case surface', [head, this.lineNode(term(id).text)]);
  }

  termSections() {
    if (this.article) return [this.articleNode(this.article)];
    return GLOSSARY_GROUPS.map(({ name, ids }) =>
      sectionNode(strings().glossary.group[name], box('index surface', ids.map((id) => this.linkNode(id)))));
  }

  articleNode(id) {
    const head = box('row', [
      buttonNode(BACK, 'link', () => this.back()),
      span(term(id).name, 'article__title')
    ]);
    return box('article surface', [head, ...figureRows(id), this.lineNode(term(id).text)]);
  }

  linesNode(lines, className) {
    return box(className, lines.map((line) => this.lineNode(line)));
  }

  lineNode(text) {
    const line = span();
    textParts(text).forEach((part) => {
      line.append(typeof part === 'string' ? part : this.linkNode(part.id, part.label));
    });
    return line;
  }

  linkNode(id, label) {
    return buttonNode(label ?? term(id).name, 'link', () => this.openTerm(id));
  }
}
