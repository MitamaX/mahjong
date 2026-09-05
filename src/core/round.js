import { Tiles } from './tiles.js';
import { Hand } from './hand.js';
import { Wall } from './wall.js';
import { shuffledWall, mulberry32 } from './deal.js';
import { OpponentBrain } from './opponent.js';
import { Evaluator } from './evaluator.js';

const WINDS = ['東', '南', '西', '北'];
const SEATS = [0, 1, 2, 3];
const PLAYER = 0;
const HAND_SIZE = 13;
const RIICHI_WALL_FLOOR = 4;
const DEFENSE_SHANTEN_FLOOR = 2;
const PHASE = { AUTO: 'auto', DEFENSE: 'defense' };

export class Round {
  constructor(seed) {
    this.random = mulberry32(seed);
    this.evaluator = new Evaluator();
    this.setup();
  }

  setup() {
    this.pickDeal();
    this.rivers = SEATS.map(() => []);
    this.declared = SEATS.map(() => false);
    this.declaredAt = SEATS.map(() => -1);
    this.log = [];
    this.doraIndicator = this.wall.doraIndicator;
    this.turn = 0;
    this.result = null;
    this.drawn = null;
    this.events = [];
    this.seatToAct = PLAYER;
    this.awaiting = false;
  }

  pickDeal() {
    this.wall = new Wall(shuffledWall(this.random));
    this.hands = SEATS.map(() => new Hand(this.wall.deal(HAND_SIZE)));
  }

  get playerHand() {
    return this.hands[PLAYER];
  }

  get underThreat() {
    return SEATS.some((seat) => seat !== PLAYER && this.declared[seat]);
  }

  awaitsChoice() {
    return this.underThreat && !this.declared[PLAYER];
  }

  isDefenseScenario() {
    return this.awaiting && this.playerHand.bestShanten() >= DEFENSE_SHANTEN_FLOOR;
  }

  remaining(viewer = PLAYER) {
    const seen = Tiles.emptyCounts();
    this.hands[viewer].counts.forEach((amount, tile) => { seen[tile] += amount; });
    this.rivers.forEach((river) => river.forEach((entry) => { seen[entry.tile] += 1; }));
    seen[this.doraIndicator] += 1;
    return seen.map((amount) => 4 - amount);
  }

  passedTiles(seat, upTo = this.log.length) {
    const passed = new Set(this.rivers[seat].map((entry) => entry.tile));
    if (this.declaredAt[seat] >= 0) {
      this.log.slice(this.declaredAt[seat], upTo).forEach((entry) => passed.add(entry.tile));
    }
    return passed;
  }

  threats(viewer = PLAYER) {
    return SEATS
      .filter((seat) => seat !== viewer && this.declared[seat])
      .map((seat) => ({
        seat,
        discards: new Set(this.rivers[seat].map((entry) => entry.tile)),
        safe: this.passedTiles(seat)
      }));
  }

  riichiChoices() {
    if (!this.awaiting || this.declared[PLAYER] || this.wall.remaining < RIICHI_WALL_FLOOR) return [];
    return this.playerHand
      .discardOptions(this.remaining())
      .filter((option) => option.shanten === 0)
      .map((option) => option.tile);
  }

  start() {
    this.events = [];
    return this.run();
  }

  run() {
    while (!this.result && !this.awaiting) {
      this.takeTurn(this.seatToAct);
      if (this.result || this.awaiting) break;
      this.seatToAct = (this.seatToAct + 1) % SEATS.length;
    }
    return this.events;
  }

  playerDiscard(tile, withRiichi) {
    if (!this.awaiting || !this.playerHand.has(tile)) return [];
    this.events = [];
    this.awaiting = false;
    this.evaluator.evaluate({
      turn: this.turn,
      hand: this.playerHand,
      chosen: tile,
      remaining: this.remaining(),
      threats: this.threats(),
      rivers: this.rivers.map((river) => river.slice()),
      doraIndicator: this.doraIndicator
    });
    this.commitDiscard(PLAYER, tile, withRiichi);
    this.seatToAct = (PLAYER + 1) % SEATS.length;
    return this.run();
  }

  takeTurn(seat) {
    if (this.wall.remaining <= 0) {
      this.result = { type: 'draw' };
      this.record({ type: 'result', seat });
      return;
    }
    if (seat === PLAYER) this.turn += 1;
    const drawn = this.wall.draw();
    this.hands[seat].add(drawn);
    if (seat === PLAYER) this.drawn = drawn;
    if (this.declared[seat] && this.hands[seat].isComplete()) {
      this.finishByTsumo(seat, drawn);
      return;
    }
    if (seat === PLAYER && this.awaitsChoice()) {
      this.awaiting = true;
      return;
    }
    this.autoDiscard(seat, drawn);
  }

  autoDiscard(seat, drawn) {
    const decision = OpponentBrain.decide({
      hand: this.hands[seat],
      remaining: this.remaining(seat),
      threats: this.threats(seat),
      drawn,
      declared: this.declared[seat],
      canRiichi: seat !== PLAYER && this.wall.remaining >= RIICHI_WALL_FLOOR
    });
    this.commitDiscard(seat, decision.tile, decision.riichi);
  }

  commitDiscard(seat, tile, withRiichi) {
    this.hands[seat].remove(tile);
    if (withRiichi) {
      this.declared[seat] = true;
      this.declaredAt[seat] = this.log.length;
    }
    this.rivers[seat].push({ tile, turned: withRiichi });
    this.log.push({ seat, tile });
    if (seat === PLAYER) this.drawn = null;
    this.record({ type: 'discard', seat, tile, riichi: withRiichi });
    this.resolveRon(seat, tile);
  }

  record(event) {
    this.events.push({
      ...event,
      phase: this.underThreat ? PHASE.DEFENSE : PHASE.AUTO,
      state: this.snapshot()
    });
  }

  resolveRon(from, tile) {
    const claimant = SEATS.find((seat) => {
      if (seat === from || !this.declared[seat]) return false;
      if (!this.hands[seat].completedBy(tile)) return false;
      const passed = this.passedTiles(seat, this.log.length - 1);
      return !this.hands[seat].waits().some((wait) => passed.has(wait));
    });
    if (claimant === undefined) return;

    this.result = { type: 'ron', winner: claimant, from, tile };
    this.record({ type: 'result', seat: claimant });
  }

  finishByTsumo(seat, tile) {
    this.result = { type: 'tsumo', winner: seat, tile };
    this.record({ type: 'result', seat });
  }

  snapshot() {
    return {
      turn: this.turn,
      wall: this.wall.remaining,
      doraIndicator: this.doraIndicator,
      result: this.result,
      drawn: this.drawn,
      awaiting: this.awaiting,
      last: this.log.length ? this.log[this.log.length - 1] : null,
      hand: this.playerHand.tiles,
      riichiChoices: this.riichiChoices(),
      seats: SEATS.map((seat) => ({
        seat,
        wind: WINDS[seat],
        declared: this.declared[seat],
        river: this.rivers[seat].slice(),
        handSize: this.hands[seat].size
      }))
    };
  }

  report() {
    return { ...this.evaluator.summary(), result: this.result };
  }
}

export { PLAYER, WINDS };
