import { tileHtml } from './tileView.js';
import { SEAT_CLASSES, backTilesHtml, doraTilesHtml, riverRowsHtml } from './board.js';
import { iconSvg } from './iconView.js';
import { DiscardInput } from './discardInput.js';
import { button, classNames, div, escape, html, tag, text } from './markup.js';

const ANNOUNCE_MS = 900;
const TOOLS = ['help', 'settings'];
const OPENING_ROUND = '東1';
const DRAWN_MARK = 'drawn';
const PLAYER_SEAT = 0;

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
    class: 'btn btn--icon',
    'aria-label': dictionary[name].title,
    'data-tool': name
  })));

export const splashMarkup = (dictionary) => tag('div', { class: 'splash', 'data-splash': true }, [
  tag('h1', { class: 'splash__name' }, escape(dictionary.brand)),
  tag('p', { class: 'splash__tagline' }, escape(dictionary.tagline))
]);

export const tableMarkup = (dictionary) => html([
  tag('section', { class: 'board', 'data-stage': true, hidden: true },
    div('table board__square', [
      SEAT_CLASSES.map(seatHtml),
      centerHtml(dictionary),
      tag('div', { class: 'rack board__corner board__dora', 'data-dora': true }),
      toolsHtml(dictionary),
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
  constructor(root, { onDiscard, onTool }) {
    this.root = root;
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
    this.node('splash').hidden = true;
    this.root.querySelectorAll('[data-stage]').forEach((node) => { node.hidden = false; });
  }

  render(state) {
    const previous = this.state;
    this.state = state;
    this.revealStage();
    if (!state.riichiChoices.length && this.riichiMode) this.setRiichiMode(false);
    this.renderSeats(previous);
    this.renderInfo();
    this.renderHand();
    this.markTurn(state.last ? state.last.seat : PLAYER_SEAT);
  }

  renderSeats(previous) {
    this.state.seats.forEach((seat) => {
      this.seatNode('data-wind', seat.seat).textContent = seat.wind;
      this.seatNode('data-riichi-chip', seat.seat).classList.toggle('chip--on', seat.declared);
      this.seatNode('data-hidden-hand', seat.seat).innerHTML =
        seat.seat === PLAYER_SEAT ? '' : backTilesHtml(seat.handSize);
      this.seatNode('data-river', seat.seat).innerHTML = riverRowsHtml(seat.river);
    });
    this.markLast(previous);
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
    this.node('dora').innerHTML = doraTilesHtml(this.state.doraIndicator);
  }

  renderHand() {
    const { hand, drawn, riichiChoices, awaiting } = this.state;
    const selectable = this.riichiMode ? new Set(riichiChoices) : null;
    const concealed = hand.slice();
    if (drawn !== null) concealed.splice(concealed.indexOf(drawn), 1);

    const face = (tile, mark) => {
      const allowed = awaiting && (!selectable || selectable.has(tile));
      return tileHtml(tile, { dim: !allowed, interactive: allowed, mark });
    };

    const container = this.node('hand');
    this.input.clear();
    container.innerHTML = html([
      concealed.map((tile) => face(tile, null)),
      drawn !== null && face(drawn, DRAWN_MARK)
    ]);
    container.querySelectorAll('button[data-tile]').forEach((node) => {
      this.input.bind(node, Number(node.dataset.tile));
    });

    this.riichiButton.hidden = !riichiChoices.length;
  }
}
