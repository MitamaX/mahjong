import { KINDS, Tiles } from './tiles.js';

const GUARD = { GENBUTSU: '현물', KABE: '벽', SUJI: '스지', NO_SUJI: '위험패', HONOR: '자패' };

const SHAPE = {
  RYANMEN: 'ryanmen',
  PENCHAN: 'penchan',
  KANCHAN: 'kanchan',
  TANKI: 'tanki',
  SHANPON: 'shanpon'
};

const SHAPE_FREQUENCY = {
  [SHAPE.RYANMEN]: 0.5630,
  [SHAPE.SHANPON]: 0.1818,
  [SHAPE.KANCHAN]: 0.1208,
  [SHAPE.TANKI]: 0.0991,
  [SHAPE.PENCHAN]: 0.0353
};

const SUIT_COUNT = 3;
const SUIT_LENGTH = 9;
const MIN_RANK = 1;
const MAX_RANK = 9;
const PERCENT = 100;
const LAST_COPY_LEFT = 1;
const PAIR_SIZE = 2;

function sequenceShapes(base) {
  const shapes = [];
  for (let rank = MIN_RANK; rank < MAX_RANK; rank += 1) {
    const low = base + rank - 1;
    const high = low + 1;
    if (rank === MIN_RANK) shapes.push({ type: SHAPE.PENCHAN, held: [[low, 1], [high, 1]], waits: [high + 1] });
    else if (rank === MAX_RANK - 1) shapes.push({ type: SHAPE.PENCHAN, held: [[low, 1], [high, 1]], waits: [low - 1] });
    else shapes.push({ type: SHAPE.RYANMEN, held: [[low, 1], [high, 1]], waits: [low - 1, high + 1] });
  }
  for (let rank = MIN_RANK; rank <= MAX_RANK - PAIR_SIZE; rank += 1) {
    const low = base + rank - 1;
    shapes.push({ type: SHAPE.KANCHAN, held: [[low, 1], [low + 2, 1]], waits: [low + 1] });
  }
  return shapes;
}

function pairShapes() {
  const shapes = [];
  for (let tile = 0; tile < KINDS; tile += 1) {
    shapes.push({ type: SHAPE.TANKI, held: [[tile, 1]], waits: [tile] });
    for (let other = tile + 1; other < KINDS; other += 1) {
      shapes.push({ type: SHAPE.SHANPON, held: [[tile, PAIR_SIZE], [other, PAIR_SIZE]], waits: [tile, other] });
    }
  }
  return shapes;
}

const WAIT_SHAPES = [
  ...Array.from({ length: SUIT_COUNT }, (_, suit) => sequenceShapes(suit * SUIT_LENGTH)).flat(),
  ...pairShapes()
];

function combinations(available, needed) {
  if (available < needed) return 0;
  return needed === PAIR_SIZE ? (available * (available - 1)) / 2 : available;
}

function shapeWeight(shape, remaining) {
  return shape.held.reduce((product, [tile, needed]) => product * combinations(remaining[tile], needed), 1);
}

function frequencyScale(weights) {
  const totals = {};
  WAIT_SHAPES.forEach((shape, index) => {
    totals[shape.type] = (totals[shape.type] ?? 0) + weights[index];
  });
  return totals;
}

function isFuriten(shape, threat) {
  return shape.waits.some((wait) => threat.safe.has(wait));
}

class WaitModel {
  constructor(threat, remaining) {
    this.threat = threat;
    const weights = WAIT_SHAPES.map((shape) => shapeWeight(shape, remaining));
    const scale = frequencyScale(weights);
    const spread = new Float64Array(KINDS);
    let mass = 0;
    WAIT_SHAPES.forEach((shape, index) => {
      if (!weights[index] || isFuriten(shape, threat)) return;
      const posterior = SHAPE_FREQUENCY[shape.type] * weights[index] / scale[shape.type];
      mass += posterior;
      shape.waits.forEach((wait) => { spread[wait] += posterior; });
    });
    this.dealIn = mass > 0 ? spread.map((weight) => (weight / mass) * PERCENT) : spread;
  }

  rate(tile) {
    return this.dealIn[tile];
  }
}

function suitBaseOf(tile) {
  return tile - (Tiles.rankOf(tile) - 1);
}

function sujiSources(tile, discards) {
  const rank = Tiles.rankOf(tile);
  const base = suitBaseOf(tile);
  const sourceOf = (target) => base + target - 1;
  const sources = (rank <= 3 ? [rank + 3] : rank >= 7 ? [rank - 3] : [rank - 3, rank + 3]).map(sourceOf);
  return sources.every((source) => discards.has(source)) ? sources : [];
}

function isDead(remaining, base, rank) {
  return rank < MIN_RANK || rank > MAX_RANK || remaining[base + rank - 1] <= 0;
}

function kabeWall(tile, remaining) {
  const rank = Tiles.rankOf(tile);
  const base = suitBaseOf(tile);
  const dead = (target) => isDead(remaining, base, target);
  const blocks = [[rank - 2, rank - 1], [rank - 1, rank + 1], [rank + 1, rank + 2]];
  if (!blocks.every(([low, high]) => dead(low) || dead(high))) return null;
  const wall = [rank - 1, rank + 1, rank - 2, rank + 2]
    .find((target) => target >= MIN_RANK && target <= MAX_RANK && remaining[base + target - 1] <= 0);
  return wall === undefined ? null : base + wall - 1;
}

function copiesLeft(tile, remaining) {
  return Math.max(0, Math.min(4, remaining[tile]));
}

function isDeadHonor(tile, left) {
  return Tiles.isHonor(tile) && left === 0;
}

function guardOf(tile, threat, remaining) {
  const left = copiesLeft(tile, remaining);
  if (isDeadHonor(tile, left)) return { kind: GUARD.HONOR, left, cites: [] };
  if (threat.safe.has(tile)) return { kind: GUARD.GENBUTSU, left: null, cites: [] };
  if (Tiles.isHonor(tile)) return { kind: GUARD.HONOR, left, cites: [] };
  const wall = kabeWall(tile, remaining);
  if (wall !== null) return { kind: GUARD.KABE, left: null, cites: [wall] };
  const sources = sujiSources(tile, threat.discards);
  const seen = left <= LAST_COPY_LEFT ? left : null;
  if (sources.length) return { kind: GUARD.SUJI, left: seen, cites: sources };
  return { kind: GUARD.NO_SUJI, left: seen, cites: [] };
}

class ThreatProfile {
  constructor(threats, remaining) {
    this.remaining = remaining;
    this.models = threats.map((threat) => new WaitModel(threat, remaining));
  }

  rate(tile) {
    const survival = this.models.reduce((chance, model) => chance * (1 - model.rate(tile) / PERCENT), 1);
    return (1 - survival) * PERCENT;
  }

  guard(tile) {
    if (!this.models.length) return null;
    const riskiest = this.models.reduce((worst, model) => (model.rate(tile) > worst.rate(tile) ? model : worst));
    return guardOf(tile, riskiest.threat, this.remaining);
  }
}

export { GUARD };

export const Danger = {
  profile(threats, remaining) {
    return new ThreatProfile(threats, remaining);
  },

  isDeadHonor(guard) {
    return guard !== null && guard.kind === GUARD.HONOR && guard.left === 0;
  }
};
