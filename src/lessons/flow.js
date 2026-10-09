import { Notation } from '../core/notation.js';
import { doraOf, figure, group, ring } from './figure.js';
import {
  ALL_RIVERS, DORA, EMPTY_WALL, OPPONENTS, SAMPLE, SAMPLE_DRAWN, SAMPLE_HAND, SHOW_HAND, WALL_AFTER_DRAW,
  choose, choosePage, grouped, opening, pick, singlePage
} from './table.js';
import { TERM_FIGURES } from './terms.js';

const EVERYONE = ['hand', ...OPPONENTS];
const SUIT_GROUPS = Notation.groups(SAMPLE_HAND);
const DISCARDED = opening({ hand: SAMPLE_HAND, river: '2z' }, { wall: WALL_AFTER_DRAW });
const ROUND_WALL = 65;

const ROUND = {
  self: { hand: '359m247p158s1467z', draw: '2s', river: '9p' },
  right: { river: '8s' },
  across: { river: '3m' },
  left: { river: '6z' },
  dora: DORA,
  wall: ROUND_WALL
};

const SEATS = {
  id: 'seats',
  cover: figure([group('seats', '234z')]),
  pages: [
    {
      id: 'learn',
      board: ROUND,
      beats: [
        { id: 'four', callout: EVERYONE },
        { id: 'self', ...SHOW_HAND },
        { id: 'right', callout: ['hidden:right'] },
        { id: 'across', callout: ['hidden:across'] },
        { id: 'left', callout: ['hidden:left'] },
        { id: 'rivers', callout: ALL_RIVERS },
        { id: 'use', callout: [`river:across:${ROUND.across.river}`, 'hidden:across'] }
      ]
    },
    {
      id: 'practice',
      board: ROUND,
      beats: [
        choose('pick1', { correct: { right: '8s' }, wrong: { across: '3m', left: '6z' } }),
        choose('pick2', { correct: { across: '3m' }, wrong: { right: '8s', left: '6z' } }),
        choose('pick3', { correct: { left: '6z' }, wrong: { right: '8s', across: '3m' } })
      ]
    }
  ]
};

const HAND = singlePage('hand', TERM_FIGURES.hand, SAMPLE, [
  { id: 'hand', ...SHOW_HAND },
  { id: 'sorted', ...grouped(SUIT_GROUPS, ...SUIT_GROUPS) },
  { id: 'hidden', callout: OPPONENTS },
  { id: 'start', callout: EVERYONE }
]);

const EMPTY = opening({ hand: SAMPLE_HAND }, { wall: EMPTY_WALL });

const WALL = singlePage('wall', TERM_FIGURES.wall, SAMPLE, [
  { id: 'pile' },
  { id: 'wall', callout: ['wall'] },
  { id: 'shrink', board: SAMPLE_DRAWN, callout: ['wall', 'drawn'] },
  { id: 'empty', board: EMPTY, callout: ['wall'] },
  { id: 'over', board: EMPTY, callout: EVERYONE }
]);

const TURN = {
  id: 'turn',
  cover: TERM_FIGURES.tsumogiri,
  pages: [
    {
      id: 'turn',
      board: SAMPLE_DRAWN,
      beats: [
        { id: 'draw', callout: ['drawn'] },
        { id: 'full', ...SHOW_HAND },
        { id: 'discard', board: DISCARDED, callout: ['river:self'] },
        { id: 'back', board: DISCARDED, ...SHOW_HAND },
        { id: 'next', board: DISCARDED, callout: ['hidden:right'] },
        { id: 'order', board: DISCARDED, cycle: ALL_RIVERS }
      ]
    },
    {
      id: 'practice',
      board: SAMPLE_DRAWN,
      beats: [
        pick('pick1', { correct: { any: `${SAMPLE_HAND}2z` } }),
        pick('pick2', { correct: { drawn: '2z' } })
      ]
    }
  ]
};

const NEXT_DORA = TERM_FIGURES.dora;

const doraPractice = (id, { hand, draw, indicator, dora }) =>
  choosePage(id, opening({ hand, draw }, { dora: indicator }), { correct: { dora }, wrong: { indicator } });

const DORA_LESSON = {
  id: 'dora',
  cover: NEXT_DORA,
  pages: [
    {
      id: 'dora',
      board: opening({ hand: SAMPLE_HAND }, { dora: '3p' }),
      beats: [
        { id: 'indicator', callout: ['dora'] },
        { id: 'next', figure: NEXT_DORA },
        { id: 'notItself', figure: NEXT_DORA, focus: ['indicator'] },
        { id: 'bonus', figure: NEXT_DORA, focus: ['dora'] },
        { id: 'wrap', figure: doraOf('9m', '1m') },
        { id: 'winds', figure: ring('1234z') },
        { id: 'dragons', figure: ring('567z') }
      ]
    },
    doraPractice('pick1', { hand: '258m147p34569s27z', draw: '6z', indicator: '4s', dora: '5s' }),
    doraPractice('pick2', { hand: '258m1789p369s157z', draw: '2p', indicator: '9p', dora: '1p' }),
    doraPractice('pick3', { hand: '258m147p369s5677z', draw: '1z', indicator: '7z', dora: '5z' })
  ]
};

export const FLOW_LESSONS = [SEATS, HAND, WALL, TURN, DORA_LESSON];
