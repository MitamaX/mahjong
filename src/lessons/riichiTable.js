import { Notation } from '../core/notation.js';
import { midgame } from './table.js';

const DEFAULT_RIVERS = { self: '2z1p8s4z1m9s', right: '9p1s4z2m8p6z', left: '1m9m3z8s2s6z' };

const seatsOf = ({ self, ...others }, hand, shown) => ({
  self: { hand, river: self },
  ...Object.fromEntries(Object.entries(others).map(([seat, river]) => [seat, { river, hand: shown[seat] }]))
});

export const riichiTable = ({ hand, draw, dora, shown = {}, ...rivers }) =>
  midgame(seatsOf({ ...DEFAULT_RIVERS, ...rivers }, hand, shown), { draw, dora });

export const safeDrill = (table, answer) => ({ board: riichiTable(table), answer });

export const NOTHING_SAFER = { id: 'none', callout: ['river:across', 'hand'] };

const takeTurn = ({ hand, rivers, boards }, { left = '', draw, discard, right = '', across = '' }) => {
  const seated = { ...rivers, left: `${rivers.left}${left}` };
  return {
    hand: Notation.without(`${hand}${draw}`, discard),
    rivers: {
      ...seated,
      self: `${seated.self}${discard}`,
      right: `${seated.right}${right}`,
      across: `${seated.across}${across}`
    },
    boards: [...boards, riichiTable({ ...seated, hand, draw })]
  };
};

export const turnBoards = ({ hand, ...rivers }, turns) =>
  turns.reduce(takeTurn, { hand, rivers, boards: [] }).boards;
