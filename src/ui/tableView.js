import { tileNode } from './tileView.js';
import { SEAT_CLASSES, riverRows } from './board.js';

const DORA_SLOTS = 5;
const ANNOUNCE_MS = 900;

export class TableView {
  constructor(root, { onDiscard }) {
    this.root = root;
    this.onDiscard = onDiscard;
    this.riichiMode = false;
    this.build();
  }

  build() {
    this.root.innerHTML = `
      <section class="board">
        <div class="table board__square">
          ${SEAT_CLASSES.map((seatClass, seat) => `
            <div class="seat ${seatClass}" data-seat="${seat}">
              <div class="seat__hand" data-hidden-hand="${seat}"></div>
              <div class="river" data-river="${seat}"></div>
            </div>
          `).join('')}
          <div class="center">
            ${SEAT_CLASSES.map((seatClass, seat) => `
              <div class="plate ${seatClass.replace('seat', 'plate')}" data-plate="${seat}">
                <span class="plate__wind" data-wind="${seat}"></span>
                <span class="chip" data-riichi-chip="${seat}">리치</span>
              </div>
            `).join('')}
            <div class="center__core">
              <span class="center__round">東1</span>
              <span class="center__wall" data-wall></span>
            </div>
          </div>
          <div class="board__dora" data-dora></div>
          <div class="announce" data-announce hidden></div>
        </div>
      </section>
      <section class="dock">
        <div class="hand" data-hand></div>
        <button class="btn btn--accent" type="button" data-riichi>리치</button>
      </section>
    `;
    this.riichiButton = this.root.querySelector('[data-riichi]');
    this.riichiButton.addEventListener('click', () => {
      this.setRiichiMode(!this.riichiMode);
      this.renderHand();
    });
  }

  seatNode(selector, seat) {
    return this.root.querySelector(`[${selector}="${seat}"]`);
  }

  setRiichiMode(on) {
    this.riichiMode = on;
    this.riichiButton.classList.toggle('btn--on', on);
  }

  announce(text) {
    const banner = this.root.querySelector('[data-announce]');
    banner.textContent = text;
    banner.hidden = false;
    banner.classList.remove('announce--on');
    void banner.offsetWidth;
    banner.classList.add('announce--on');
    clearTimeout(this.announceTimer);
    this.announceTimer = setTimeout(() => { banner.hidden = true; }, ANNOUNCE_MS);
  }

  render(state) {
    const previous = this.state;
    this.state = state;
    if (!state.riichiChoices.length && this.riichiMode) this.setRiichiMode(false);
    this.renderSeats(previous);
    this.renderInfo();
    this.renderHand();
    this.markTurn(state.last ? state.last.seat : 0);
  }

  renderSeats(previous) {
    this.state.seats.forEach((seat) => {
      this.seatNode('data-wind', seat.seat).textContent = seat.wind;
      this.seatNode('data-riichi-chip', seat.seat).classList.toggle('chip--on', seat.declared);

      const hidden = this.seatNode('data-hidden-hand', seat.seat);
      hidden.replaceChildren();
      if (seat.seat !== 0) {
        for (let index = 0; index < seat.handSize; index += 1) hidden.appendChild(tileNode(0, { back: true }));
      }

      this.renderRiver(seat.seat, seat.river);
    });
    this.markLast(previous);
  }

  renderRiver(seat, entries) {
    this.seatNode('data-river', seat).replaceChildren(...riverRows(entries));
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
    this.root.querySelector('[data-wall]').textContent = this.state.wall;
    const dora = this.root.querySelector('[data-dora]');
    dora.replaceChildren(
      tileNode(this.state.doraIndicator),
      ...Array.from({ length: DORA_SLOTS - 1 }, () => tileNode(0, { back: true }))
    );
  }

  renderHand() {
    const container = this.root.querySelector('[data-hand]');
    container.replaceChildren();
    const { hand, drawn, riichiChoices, awaiting } = this.state;
    const selectable = this.riichiMode ? new Set(riichiChoices) : null;

    const concealed = hand.slice();
    if (drawn !== null) concealed.splice(concealed.indexOf(drawn), 1);

    const append = (tile, extraClass) => {
      const allowed = awaiting && (!selectable || selectable.has(tile));
      const node = tileNode(tile, {
        dim: !allowed,
        onSelect: allowed ? (chosen) => this.onDiscard(chosen, this.riichiMode) : null
      });
      if (extraClass) node.classList.add(extraClass);
      container.appendChild(node);
    };

    concealed.forEach((tile) => append(tile));
    if (drawn !== null) append(drawn, 'tile--drawn');

    this.riichiButton.disabled = !awaiting || !riichiChoices.length;
  }
}
