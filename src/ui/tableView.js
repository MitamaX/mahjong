import { tileHtml } from './tileView.js';
import { NO_MARKS, SEAT_CLASSES, backTilesHtml, doraTilesHtml, faceTilesHtml, markOf, riverRowsHtml } from './board.js';
import { iconSvg } from './iconView.js';
import { DiscardInput } from './discardInput.js';
import { button, classNames, div, escape, html, tag, text } from './markup.js';
import { PLAYER } from '../core/seats.js';

const ANNOUNCE_MS = 900;
const TOOLS = ['help'];
const OPENING_ROUND = '東1';

const BLOCKED_CLASS = 'hand--blocks';
const SHOWN_HAND_CLASS = 'seat__hand--shown';
const TILE = '.tile';

const itself = (item) => item;

function takeFrom(pool, wanted, keyOf = itself) {
  return wanted.map((value) => {
    const at = pool.findIndex((item) => keyOf(item) === value);
    return at < 0 ? null : pool.splice(at, 1)[0];
  });
}

function blockLayout(tiles, blocks) {
  const rest = tiles.slice();
  const claimed = blocks.map((block) => takeFrom(rest, block).filter((tile) => tile !== null));
  return [...claimed.filter((group) => group.length), ...rest.map((tile) => [tile])]
    .sort(([first], [other]) => first - other);
}

const tileNodesIn = (nodes) =>
  nodes.flatMap((node) => (node.matches(TILE) ? [node] : [...node.querySelectorAll(TILE)]));

const tileOfNode = (node) => Number(node.dataset.tile);

const tilesOrSelf = (node) => {
  const tiles = [...node.querySelectorAll(TILE)];
  return tiles.length ? tiles : [node];
};

const isShown = ({ seat, shown = [] }) => seat !== PLAYER && shown.length > 0;

function seatHandHtml(seat) {
  if (seat.seat === PLAYER) return '';
  return isShown(seat) ? faceTilesHtml(seat.shown) : backTilesHtml(seat.handSize);
}

const REGIONS = {
  table: (view) => [view.root.querySelector('.board__square'), view.node('hand')],
  hand: (view) => [...view.node('hand').querySelectorAll(TILE)],
  drawn: (view) => [...view.node('hand').querySelectorAll('.tile--drawn')],
  dora: (view) => [view.node('dora')],
  wall: (view) => [view.root.querySelector('.center__core')],
  river: (view, seat) => tilesOrSelf(view.seatNode('data-river', seat)),
  riichi: (view, seat) => [...view.seatNode('data-river', seat).querySelectorAll('.tile--turned')],
  plate: (view, seat) => [view.seatNode('data-plate', seat)],
  hidden: (view, seat) => [view.seatNode('data-hidden-hand', seat)]
};

const seatHtml = (seatClass, seat) => tag('div', { class: classNames('seat', seatClass), 'data-seat': seat }, [
  tag('div', { class: 'seat__hand', 'data-hidden-hand': seat }),
  tag('div', { class: 'river', 'data-river': seat })
]);

const plateHtml = (dictionary) => (seatClass, seat) => tag('div', {
  class: classNames('plate', seatClass.replace('seat', 'plate')),
  'data-plate': seat
}, [
  tag('span', { class: 'plate__wind', 'data-wind': seat }),
  tag('span', { class: 'chip', 'data-riichi-chip': seat }, escape(dictionary.riichi))
]);

const centerHtml = (dictionary) => div('center', [
  SEAT_CLASSES.map(plateHtml(dictionary)),
  div('center__core', [
    text(OPENING_ROUND, 'center__round'),
    tag('span', { class: 'center__wall', 'data-wall': true })
  ])
]);

const toolsHtml = (dictionary) => div('board__corner board__tools', TOOLS.map((name) =>
  button(iconSvg(name), {
    class: 'btn btn--icon btn--felt',
    'aria-label': dictionary[name].title,
    'data-tool': name
  })));

export const splashMarkup = (dictionary) => tag('div', { class: 'splash', 'data-splash': true }, [
  tag('h1', { class: 'splash__name' }, escape(dictionary.brand)),
  tag('p', { class: 'splash__tagline' }, escape(dictionary.tagline))
]);

export const tableMarkup = (dictionary, { tools = true } = {}) => html([
  tag('section', { class: 'board', 'data-stage': true, hidden: true },
    div('table board__square', [
      SEAT_CLASSES.map(seatHtml),
      centerHtml(dictionary),
      tag('div', { class: 'rack board__corner board__dora', 'data-dora': true }),
      tools && toolsHtml(dictionary),
      tag('div', { class: 'announce', 'data-announce': true, hidden: true })
    ])),
  tag('section', { class: 'dock', 'data-stage': true, hidden: true }, [
    tag('div', { class: 'hand', 'data-hand': true }),
    button(escape(dictionary.riichi), {
      class: 'btn btn--accent dock__riichi',
      'data-riichi': true,
      hidden: true
    })
  ])
]);

export class TableView {
  constructor(root, { onDiscard, onTool, nameOf = () => null, dimIdle = true }) {
    this.root = root;
    this.dimIdle = dimIdle;
    this.nameOf = nameOf;
    this.input = new DiscardInput((tile) => onDiscard(tile, this.riichiMode));
    this.riichiMode = false;
    this.riichiButton = this.node('riichi');
    this.riichiButton.addEventListener('click', () => {
      this.setRiichiMode(!this.riichiMode);
      this.renderHand();
    });
    this.root.querySelectorAll('[data-tool]').forEach((node) => {
      node.addEventListener('click', () => onTool(node.dataset.tool));
    });
  }

  node(name) {
    return this.root.querySelector(`[data-${name}]`);
  }

  seatNode(selector, seat) {
    return this.root.querySelector(`[${selector}="${seat}"]`);
  }

  region({ region, seat, tiles = null, at = null }) {
    const nodes = REGIONS[region](this, seat);
    if (at !== null) return [tileNodesIn(nodes)[at] ?? null];
    return tiles ? takeFrom(tileNodesIn(nodes), tiles, tileOfNode) : nodes;
  }

  handTile(tile) {
    return this.node('hand').querySelector(`[data-tile="${tile}"]`);
  }

  get firstChoice() {
    return this.node('hand').querySelector('button[data-tile]');
  }

  setRiichiMode(on) {
    this.riichiMode = on;
    this.riichiButton.classList.toggle('btn--on', on);
  }

  announce(content) {
    const banner = this.node('announce');
    banner.textContent = content;
    banner.hidden = false;
    banner.classList.remove('announce--on');
    void banner.offsetWidth;
    banner.classList.add('announce--on');
    clearTimeout(this.announceTimer);
    this.announceTimer = setTimeout(() => { banner.hidden = true; }, ANNOUNCE_MS);
  }

  revealStage() {
    this.root.querySelectorAll('[data-splash]').forEach((node) => { node.hidden = true; });
    this.root.querySelectorAll('[data-stage]').forEach((node) => { node.hidden = false; });
  }

  get marks() {
    return this.state.marks ?? NO_MARKS;
  }

  render(state) {
    const previous = this.state;
    this.state = state;
    this.revealStage();
    if (!state.riichiChoices.length && this.riichiMode) this.setRiichiMode(false);
    this.renderSeats(previous);
    this.renderInfo();
    this.renderHand();
    this.markTurn(state.last ? state.last.seat : PLAYER);
  }

  renderSeats(previous) {
    this.state.seats.forEach((seat) => {
      this.seatNode('data-wind', seat.seat).textContent = seat.wind;
      this.seatNode('data-riichi-chip', seat.seat).classList.toggle('chip--on', seat.declared);
      this.renderSeatHand(seat);
      this.seatNode('data-river', seat.seat).innerHTML = riverRowsHtml(seat.river, this.marks);
    });
    this.markLast(previous);
  }

  renderSeatHand(seat) {
    const node = this.seatNode('data-hidden-hand', seat.seat);
    node.classList.toggle(SHOWN_HAND_CLASS, isShown(seat));
    node.innerHTML = seatHandHtml(seat);
  }

  markLast(previous) {
    const last = this.state.last;
    if (!last) return;
    const tiles = this.seatNode('data-river', last.seat).querySelectorAll('.tile');
    if (!tiles.length) return;
    const node = tiles[tiles.length - 1];
    node.classList.add('tile--last');
    const before = previous ? previous.seats[last.seat].river.length : 0;
    if (before < this.state.seats[last.seat].river.length) node.classList.add('tile--drop');
  }

  markTurn(seat) {
    this.root.querySelectorAll('.plate--active').forEach((node) => node.classList.remove('plate--active'));
    this.seatNode('data-plate', seat).classList.add('plate--active');
  }

  renderInfo() {
    this.node('wall').textContent = this.state.wall;
    const { doraIndicator } = this.state;
    this.node('dora').innerHTML = doraTilesHtml(doraIndicator, markOf(this.marks, doraIndicator));
  }

  renderHand() {
    const { hand, drawn, riichiChoices, awaiting, blocks } = this.state;
    const selectable = this.riichiMode ? new Set(riichiChoices) : null;
    const concealed = hand.slice();
    if (drawn !== null) concealed.splice(concealed.lastIndexOf(drawn), 1);

    const face = (tile, drawnTile) => {
      const allowed = awaiting && (!selectable || selectable.has(tile));
      return tileHtml(tile, {
        dim: this.dimIdle && !allowed,
        interactive: allowed,
        drawn: drawnTile,
        mark: markOf(this.marks, tile),
        label: allowed ? this.nameOf(tile) : null
      });
    };

    const container = this.node('hand');
    this.input.clear();
    container.classList.toggle(BLOCKED_CLASS, Boolean(blocks));
    container.innerHTML = blocks
      ? html(blockLayout(hand, blocks).map((group) => div('hand__block', group.map((tile) => face(tile, false)))))
      : html([concealed.map((tile) => face(tile, false)), drawn !== null && face(drawn, true)]);
    container.querySelectorAll('button[data-tile]').forEach((node) => {
      this.input.bind(node, Number(node.dataset.tile));
    });

    this.riichiButton.hidden = !riichiChoices.length;
  }
}
