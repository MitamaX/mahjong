import { KINDS, SUIT_KINDS, Tiles } from './tiles.js';

const MAX_BLOCKS = 5;
const cache = new Map();

function isRunStart(index) {
  return index < SUIT_KINDS && index % 9 <= 6;
}

function isPairStart(index) {
  return index < SUIT_KINDS && index % 9 <= 7;
}

function standard(counts) {
  const work = counts.slice();
  let best = 8;

  const settle = (melds, partials, hasPair) => {
    let value = 8 - 2 * melds - partials;
    if (melds + partials === MAX_BLOCKS && !hasPair) value += 1;
    if (value < best) best = value;
  };

  const walk = (start, melds, partials, hasPair) => {
    let index = start;
    while (index < KINDS && work[index] === 0) index += 1;
    if (index >= KINDS) {
      settle(melds, partials, hasPair);
      return;
    }
    if (melds + partials < MAX_BLOCKS) {
      if (work[index] >= 3) {
        work[index] -= 3;
        walk(index, melds + 1, partials, hasPair);
        work[index] += 3;
      }
      if (isRunStart(index) && work[index + 1] > 0 && work[index + 2] > 0) {
        work[index] -= 1; work[index + 1] -= 1; work[index + 2] -= 1;
        walk(index, melds + 1, partials, hasPair);
        work[index] += 1; work[index + 1] += 1; work[index + 2] += 1;
      }
      if (work[index] >= 2) {
        work[index] -= 2;
        walk(index, melds, partials + 1, true);
        work[index] += 2;
      }
      if (isPairStart(index) && work[index + 1] > 0) {
        work[index] -= 1; work[index + 1] -= 1;
        walk(index, melds, partials + 1, hasPair);
        work[index] += 1; work[index + 1] += 1;
      }
      if (isRunStart(index) && work[index + 2] > 0) {
        work[index] -= 1; work[index + 2] -= 1;
        walk(index, melds, partials + 1, hasPair);
        work[index] += 1; work[index + 2] += 1;
      }
    }
    const held = work[index];
    work[index] = 0;
    walk(index + 1, melds, partials, hasPair);
    work[index] = held;
  };

  walk(0, 0, 0, false);
  return best;
}

function sevenPairs(counts) {
  let pairs = 0;
  let kinds = 0;
  counts.forEach((amount) => {
    if (amount >= 1) kinds += 1;
    if (amount >= 2) pairs += 1;
  });
  return 6 - pairs + Math.max(0, 7 - kinds);
}

function thirteenOrphans(counts) {
  let kinds = 0;
  let hasPair = false;
  for (let index = 0; index < KINDS; index += 1) {
    const terminal = Tiles.isHonor(index) || Tiles.rankOf(index) === 1 || Tiles.rankOf(index) === 9;
    if (!terminal || counts[index] === 0) continue;
    kinds += 1;
    if (counts[index] >= 2) hasPair = true;
  }
  return 13 - kinds - (hasPair ? 1 : 0);
}

export const Shanten = {
  of(counts) {
    const key = counts.join('');
    const cached = cache.get(key);
    if (cached !== undefined) return cached;
    const value = Math.min(standard(counts), sevenPairs(counts), thirteenOrphans(counts));
    cache.set(key, value);
    return value;
  }
};
