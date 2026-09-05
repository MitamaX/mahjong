import { KINDS, Tiles } from './tiles.js';
import { Shanten } from './shanten.js';

export class Hand {
  constructor(tiles = []) {
    this.counts = Tiles.countsOf(tiles);
  }

  get tiles() {
    return Tiles.expand(this.counts);
  }

  get size() {
    return this.counts.reduce((sum, amount) => sum + amount, 0);
  }

  has(tile) {
    return this.counts[tile] > 0;
  }

  add(tile) {
    this.counts[tile] += 1;
  }

  remove(tile) {
    this.counts[tile] -= 1;
  }

  shanten() {
    return Shanten.of(this.counts);
  }

  bestShanten() {
    let best = Infinity;
    for (let tile = 0; tile < KINDS; tile += 1) {
      if (this.counts[tile] === 0) continue;
      this.counts[tile] -= 1;
      best = Math.min(best, this.shanten());
      this.counts[tile] += 1;
    }
    return best;
  }

  isComplete() {
    return Shanten.of(this.counts) === -1;
  }

  completedBy(tile) {
    if (this.counts[tile] >= 4) return false;
    this.counts[tile] += 1;
    const complete = Shanten.of(this.counts) === -1;
    this.counts[tile] -= 1;
    return complete;
  }

  waits() {
    const tiles = [];
    for (let tile = 0; tile < KINDS; tile += 1) {
      if (this.completedBy(tile)) tiles.push(tile);
    }
    return tiles;
  }

  ukeire(remaining) {
    const base = this.shanten();
    const tiles = [];
    let total = 0;
    for (let tile = 0; tile < KINDS; tile += 1) {
      if (this.counts[tile] >= 4 || remaining[tile] <= 0) continue;
      this.counts[tile] += 1;
      const improves = Shanten.of(this.counts) < base;
      this.counts[tile] -= 1;
      if (improves) {
        tiles.push(tile);
        total += remaining[tile];
      }
    }
    return { tiles, total };
  }

  discardOptions(remaining) {
    const options = [];
    for (let tile = 0; tile < KINDS; tile += 1) {
      if (this.counts[tile] === 0) continue;
      this.counts[tile] -= 1;
      const shanten = this.shanten();
      const { total } = this.ukeire(remaining);
      options.push({ tile, shanten, ukeire: total, waits: shanten === 0 ? this.waits() : [] });
      this.counts[tile] += 1;
    }
    return options;
  }
}
