import { Notation } from '../core/notation.js';
import { MARK } from '../ui/tileView.js';

export const ARROW = '→';

export const group = (key, tiles, options = {}) => ({ key, tiles, ...options });

export const figure = (...rows) => ({ rows });

const SUJI_LINES = ['147m', '258m', '369m'];

export const lineFigure = (...marked) =>
  figure(...SUJI_LINES.map((line, order) => [group('line', line, { marks: { [MARK.BEST]: marked[order] } })]));

export const multiplied = (base, times) => ({ ...base, times });

export const splitRow = (melds, pairs, pairKey = 'pair') => [
  ...melds.map((meld) => group('meld', meld)),
  ...pairs.map((pair) => group(pairKey, pair))
];

export const ryanmenHand = (melds, pair, shape) => [...splitRow(melds, [pair]), group('ryanmen', shape)];

export const named = (source) => Notation.split(source).map((tile) => group(tile, tile));

export const ring = (source) => ({ rows: [named(source).flatMap((part) => [part, ARROW])], ring: true });

const arrivalGroup = (target, arrivals, options) => group(target, arrivals, { mark: MARK.BEST, ...options });

const arrivalRow = (target) => ([key, shape, arrivals, { tag = key, ...options } = {}]) =>
  [group(key, shape, { tag }), ARROW, arrivalGroup(target, arrivals, { tag, ...options })];

const arrivalFigure = (target) => (...shapes) => figure(...shapes.map(arrivalRow(target)));

const handArrivalFigure = (target) => (parts, arrivals) => figure(parts, [ARROW, arrivalGroup(target, arrivals)]);

export const counted = ([key, shape, arrivals, options = {}], times) => [key, shape, arrivals, { ...options, times }];

export const waitRow = arrivalRow('wait');

export const waitFigure = arrivalFigure('wait');

export const ukeireFigure = arrivalFigure('ukeire');

export const handWaitFigure = handArrivalFigure('wait');

export const handUkeireFigure = handArrivalFigure('ukeire');

const markedIn = (marked) => (key, tiles) => group(key, tiles, key === marked ? { mark: MARK.BEST } : {});

export const doraOf = (indicator, dora, marked = 'dora') => {
  const part = markedIn(marked);
  return figure([part('indicator', indicator), ARROW, part('dora', dora)]);
};

export const riichiGenbutsuFigure = (declares, genbutsu) => figure([
  ...declares.map((declare) => group('riichi', declare)), ARROW, group('genbutsu', genbutsu, { mark: MARK.BEST })
]);

const ranked = (suit, ...ranks) => `${ranks.join('')}${suit}`;

export const sidesFigure = (suit, rank, [low, high]) => waitFigure(
  ['ryanmen', ranked(suit, rank - 2, rank - 1), ranked(suit, rank - 3, rank), { wrong: low }],
  ['ryanmen', ranked(suit, rank + 1, rank + 2), ranked(suit, rank, rank + 3), { wrong: high }]
);
