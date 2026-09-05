import { Tiles } from './tiles.js';

const NO_SUJI = [5.0, 5.6, 6.2, 6.8, 6.9, 6.8, 6.2, 5.6, 5.0];
const SUJI = [2.4, 3.4, 3.8, 4.0, 4.1, 4.0, 3.8, 3.4, 2.4];
const HONOR_BY_LEFT = [0, 1.8, 3.2, 4.4, 5.2];
const LAST_COPY_FACTOR = 0.6;

function hasSuji(tile, discards) {
  const rank = Tiles.rankOf(tile);
  const suitBase = tile - (rank - 1);
  const discarded = (target) => discards.has(suitBase + target - 1);
  if (rank <= 3) return discarded(rank + 3);
  if (rank >= 7) return discarded(rank - 3);
  return discarded(rank - 3) && discarded(rank + 3);
}

export const Danger = {
  rate(tile, threat, remaining) {
    if (threat.safe.has(tile)) return 0;
    if (Tiles.isHonor(tile)) {
      const left = Math.max(0, Math.min(4, remaining[tile]));
      return HONOR_BY_LEFT[left];
    }
    const table = hasSuji(tile, threat.discards) ? SUJI : NO_SUJI;
    const base = table[Tiles.rankOf(tile) - 1];
    return remaining[tile] <= 1 ? base * LAST_COPY_FACTOR : base;
  },

  worst(tile, threats, remaining) {
    if (!threats.length) return 0;
    return Math.max(...threats.map((threat) => this.rate(tile, threat, remaining)));
  }
};
