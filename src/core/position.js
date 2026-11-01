import { Tiles } from './tiles.js';
import { Notation } from './notation.js';
import { HAND_SIZE, PLAYER, SEATS, SEAT_NAMES, WINDS } from './seats.js';

const sorted = (tiles) => Tiles.expand(Tiles.countsOf(tiles));

function parseSeat({ hand = '', draw, river } = {}) {
  return {
    hand: sorted(Notation.tiles(hand)),
    drawn: draw === undefined ? null : Notation.tile(draw),
    river: Notation.entries(river)
  };
}

const NO_RIICHI = -1;

const turnOf = (seat, index) => index * SEATS.length + seat;

const riichiTurnOf = (seats) => Math.max(NO_RIICHI, ...seats.flatMap(({ river }, seat) =>
  river.flatMap((entry, index) => (entry.turned ? [turnOf(seat, index)] : []))));

function markedAfterRiichi(seats) {
  const riichiTurn = riichiTurnOf(seats);
  if (riichiTurn === NO_RIICHI) return seats;
  return seats.map((seat, index) => ({
    ...seat,
    river: seat.river.map((entry, order) => ({ ...entry, afterRiichi: turnOf(index, order) > riichiTurn }))
  }));
}

export class Position {
  constructor({ doraIndicator, wall, seats, last = null }) {
    this.doraIndicator = doraIndicator;
    this.wall = wall;
    this.seats = seats;
    this.last = last;
  }

  static parse(spec) {
    return new Position({
      doraIndicator: Notation.tile(spec.dora),
      wall: spec.wall,
      seats: markedAfterRiichi(SEAT_NAMES.map((name) => parseSeat(spec[name])))
    });
  }

  get player() {
    return this.seats[PLAYER];
  }

  get held() {
    const { hand, drawn } = this.player;
    return drawn === null ? hand.slice() : [...hand, drawn];
  }

  discarded(tile) {
    const held = this.held;
    held.splice(held.indexOf(tile), 1);
    const seats = this.seats.slice();
    const afterRiichi = riichiTurnOf(this.seats) !== NO_RIICHI;
    seats[PLAYER] = { hand: sorted(held), drawn: null, river: [...this.player.river, { tile, turned: false, afterRiichi }] };
    return new Position({ ...this, seats, last: { seat: PLAYER, tile } });
  }

  snapshot(awaiting) {
    return {
      wall: this.wall,
      doraIndicator: this.doraIndicator,
      result: null,
      drawn: this.player.drawn,
      awaiting,
      last: this.last,
      hand: this.held,
      riichiChoices: [],
      seats: this.seats.map((seat, index) => ({
        seat: index,
        wind: WINDS[index],
        declared: seat.river.some((entry) => entry.turned),
        river: seat.river,
        shown: seat.hand,
        handSize: HAND_SIZE
      }))
    };
  }
}
