import { Danger } from './danger.js';

const PERFECT = 100;
const PERCENT = 100;
const ROUNDING = 100;

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

const CRITERIA = [
  { of: (option) => option.danger, weight: 12, tie: 0.001 },
  { of: (option) => option.shanten, weight: 4, tie: 0 },
  { of: (option) => -option.ukeire, weight: 0.2, tie: 0 }
];

function compare(option, other) {
  for (const { of, tie } of CRITERIA) {
    const gap = of(option) - of(other);
    if (Math.abs(gap) > tie) return gap;
  }
  return 0;
}

function lossOf(picked, ideal) {
  return CRITERIA.reduce((sum, { of, weight }) => sum + weight * Math.max(0, of(picked) - of(ideal)), 0);
}

function accuracyOf(loss) {
  return Math.round(Math.max(0, PERFECT - loss) * ROUNDING) / ROUNDING;
}

export class Evaluator {
  constructor() {
    this.records = [];
  }

  evaluate({ turn, hand, chosen, remaining, threats, rivers, doraIndicator }) {
    const profile = Danger.profile(threats, remaining);
    const options = hand.discardOptions(remaining).map((option) => ({
      ...option,
      danger: profile.rate(option.tile),
      guard: profile.guard(option.tile)
    }));

    const picked = options.find((option) => option.tile === chosen);
    const ideal = options.reduce((best, option) => (compare(option, best) < 0 ? option : best), picked);
    const score = accuracyOf(lossOf(picked, ideal));

    const record = {
      turn,
      hand: hand.tiles,
      rivers,
      doraIndicator,
      picked: statsOf(picked),
      best: statsOf(ideal),
      score,
      verdict: labelOf(VERDICTS, score)
    };
    this.records.push(record);
    return record;
  }

  summary() {
    const { records } = this;
    const total = (pick) => records.reduce((sum, record) => sum + pick(record), 0);
    const mean = (pick) => (records.length ? total(pick) / records.length : null);
    const overall = mean((record) => record.score);
    return {
      overall,
      grade: overall === null ? '—' : labelOf(GRADES, overall),
      danger: mean((record) => record.picked.danger),
      shanten: mean((record) => record.picked.shanten),
      hits: mean((record) => (record.best.tile === record.picked.tile ? PERCENT : 0)),
      records
    };
  }
}
