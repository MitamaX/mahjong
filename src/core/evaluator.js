import { Danger } from './danger.js';

const STANCE = { BUILD: 'build', PUSH: 'push', FOLD: 'fold' };
const WEIGHTS = {
  [STANCE.BUILD]: { efficiency: 1, safety: 0 },
  [STANCE.PUSH]: { efficiency: 0.65, safety: 0.35 },
  [STANCE.FOLD]: { efficiency: 0.1, safety: 0.9 }
};
const PUSH_TURN_LIMIT = 8;
const PUSH_DORA_FLOOR = 2;
const PUSH_UKEIRE_FLOOR = 12;
const DEAD_HONOR_EDGE = 2;

const bands = (rows) => rows.map(([label, min]) => ({ label, min }));

const VERDICTS = bands([
  ['최선', 100], ['차선', 92], ['좋음', 80], ['미흡', 62], ['위험', 40], ['최악', -1]
]);

const GRADES = bands([
  ['S', 100],
  ['A+', 98], ['A', 96], ['A-', 94],
  ['B+', 91], ['B', 87], ['B-', 83],
  ['C+', 78], ['C', 72], ['C-', 65],
  ['D+', 57], ['D', 48], ['D-', 38],
  ['E', -1]
]);

function labelOf(table, value) {
  return table.find((entry) => value >= entry.min).label;
}

function statsOf(option) {
  return {
    tile: option.tile,
    shanten: option.shanten,
    ukeire: option.ukeire,
    danger: option.danger,
    guard: option.guard
  };
}

function stanceOf(threats, minShanten, turn, doraCount, bestUkeire) {
  if (!threats.length) return STANCE.BUILD;
  if (minShanten <= 0) return STANCE.PUSH;
  if (minShanten === 1 && turn <= PUSH_TURN_LIMIT && (doraCount >= PUSH_DORA_FLOOR || bestUkeire >= PUSH_UKEIRE_FLOOR)) return STANCE.PUSH;
  return STANCE.FOLD;
}

function efficiencyScore(option, minShanten, bestUkeire) {
  const loss = option.shanten - minShanten;
  if (loss > 0) return Math.max(10, 45 - 15 * loss);
  return 60 + 40 * (option.ukeire / Math.max(bestUkeire, 1));
}

function safetyScore(danger, minDanger, maxDanger) {
  const span = maxDanger - minDanger;
  if (span <= 0.001) return 100;
  return 100 - 100 * ((danger - minDanger) / span);
}

export class Evaluator {
  constructor() {
    this.records = [];
  }

  evaluate({ turn, hand, chosen, remaining, threats, rivers, dora }) {
    const profile = Danger.profile(threats, remaining);
    const options = hand.discardOptions(remaining).map((option) => ({
      ...option,
      danger: profile.rate(option.tile),
      guard: profile.guard(option.tile)
    }));

    const minShanten = Math.min(...options.map((option) => option.shanten));
    const bestUkeire = Math.max(...options.filter((option) => option.shanten === minShanten).map((option) => option.ukeire), 1);
    const dangers = options.map((option) => option.danger);
    const minDanger = Math.min(...dangers);
    const maxDanger = Math.max(...dangers);
    const stance = stanceOf(threats, minShanten, turn, hand.counts[dora], bestUkeire);

    const weight = WEIGHTS[stance];
    const scored = options.map((option) => {
      const efficiency = efficiencyScore(option, minShanten, bestUkeire);
      const safety = safetyScore(option.danger, minDanger, maxDanger)
        + (Danger.isDeadHonor(option.guard) ? DEAD_HONOR_EDGE : 0);
      return {
        ...option,
        efficiency,
        safety,
        score: weight.efficiency * efficiency + weight.safety * safety
      };
    });

    const picked = scored.find((option) => option.tile === chosen);
    const ideal = scored.reduce((best, option) => (option.score > best.score ? option : best), picked);
    const accuracy = Math.round((100 - (ideal.score - picked.score)) * 100) / 100;
    const record = {
      turn,
      stance,
      hand: hand.tiles,
      rivers,
      picked: statsOf(picked),
      best: statsOf(ideal),
      score: accuracy,
      verdict: labelOf(VERDICTS, accuracy)
    };
    this.records.push(record);
    return record;
  }

  summary() {
    const mean = (list, pick) => (list.length ? list.reduce((sum, record) => sum + pick(record), 0) / list.length : null);
    const score = (record) => record.score;
    const of = (stance) => mean(this.records.filter((record) => record.stance === stance), score);
    const overall = mean(this.records, score);
    return {
      push: of(STANCE.PUSH),
      fold: of(STANCE.FOLD),
      overall,
      shanten: mean(this.records, (record) => record.picked.shanten),
      grade: overall === null ? '—' : labelOf(GRADES, overall),
      records: this.records
    };
  }
}

export { STANCE };
