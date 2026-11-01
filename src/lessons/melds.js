import { SEAT_NAMES } from '../core/seats.js';
import { ARROW, figure, group } from './figure.js';
import {
  SHOW_HAND, WALL_AFTER_DRAW, dealt, drillPages, grouped, looseDrill, opening, singlePage, tenpaiDrill
} from './table.js';
import { COMPLETE_MELDS, READY_MELDS, READY_PAIRS, TERM_FIGURES, WHITE_PAIR } from './terms.js';
import { MARK } from '../ui/tileView.js';

export const COMPLETE_BLOCKS = [...COMPLETE_MELDS, WHITE_PAIR];
export const COMPLETE = opening({ hand: COMPLETE_BLOCKS.join('') });

const SHAPE = singlePage('shape', figure([group('meld', '123m'), group('pair', WHITE_PAIR)]), COMPLETE, [
  { id: 'agari', ...SHOW_HAND },
  { id: 'goal', figure: TERM_FIGURES.agari },
  { id: 'meld', ...grouped(COMPLETE_BLOCKS, ...COMPLETE_MELDS) },
  { id: 'pair', ...grouped(COMPLETE_BLOCKS, WHITE_PAIR) },
  { id: 'total', ...grouped(COMPLETE_BLOCKS, COMPLETE_MELDS.join(''), WHITE_PAIR) },
  { id: 'hand', ...grouped(COMPLETE_BLOCKS), ...SHOW_HAND },
  { id: 'kinds', figure: TERM_FIGURES.meld }
]);

const RUNS = {
  id: 'runs',
  cover: TERM_FIGURES.run,
  pages: [
    {
      id: 'runs',
      board: COMPLETE,
      beats: [
        { id: 'run', figure: figure([group('run', '123m'), group('run', '456p'), group('run', '789s')]) },
        { id: 'mixed', figure: figure([group('run', '123m'), group('mixed', '1m2p3s', { wrong: true })]) },
        { id: 'gap', figure: figure([group('run', '123m'), group('gap', '135m', { wrong: true })]) },
        { id: 'honorRun', figure: figure([group('honorRun', '123z', { wrong: true })]) },
        { id: 'wrap', figure: figure([group('wrap', '891m', { wrong: true })]) }
      ]
    },
    ...drillPages([
      looseDrill(dealt('2349m567p345789s1z', '5p'), ['234m', '567p', '345s', '789s'], '9m1z'),
      looseDrill(dealt('345m4678p1235667s', '1s'), ['345m', '678p', '123s', '567s'], '4p6s'),
      looseDrill(dealt('5679m234678p3345s', '6p'), ['567m', '234p', '678p', '345s'], '9m3s'),
      looseDrill(dealt('3678m123789p456s4z', '4z'), ['678m', '123p', '789p', '456s'], '3m4z'),
      looseDrill(dealt('234456m5679p1238s', '4m'), ['234m', '456m', '567p', '123s'], '9p8s')
    ])
  ]
};

const TRIPLETS = {
  id: 'triplets',
  cover: TERM_FIGURES.triplet,
  pages: [
    {
      id: 'triplets',
      board: COMPLETE,
      beats: [
        { id: 'triplet', figure: figure([group('triplet', '555m'), group('triplet', '222p'), group('triplet', '999s')]) },
        { id: 'honor', figure: figure([group('triplet', '111z'), group('triplet', '777z')]) },
        { id: 'broken', figure: figure([group('broken', '556m', { wrong: true }), group('broken', '5m5p5s', { wrong: true })]) }
      ]
    },
    ...drillPages([
      looseDrill(dealt('555m222p3777s1116z', '2p'), ['555m', '222p', '777s', '111z'], '3s6z'),
      looseDrill(dealt('222m2666p4446s777z', '4s'), ['222m', '666p', '444s', '777z'], '2p6s'),
      looseDrill(dealt('444m4999p1115s666z', '5s'), ['444m', '999p', '111s', '666z'], '4p5s'),
      looseDrill(dealt('7888m3334p555s222z', '5s'), ['888m', '333p', '555s', '222z'], '7m4p'),
      looseDrill(dealt('1119m777p999s4445z', '7p'), ['111m', '777p', '999s', '444z'], '9m5z')
    ])
  ]
};

const PAIRS = {
  id: 'pairs',
  cover: TERM_FIGURES.pair,
  pages: [
    {
      id: 'pairs',
      board: COMPLETE,
      beats: [
        { id: 'pair', figure: figure([group('pair', '22p'), group('pair', '55z')]) },
        { id: 'one', ...grouped(COMPLETE_BLOCKS, WHITE_PAIR) },
        { id: 'broken', figure: figure([group('broken', '23p', { wrong: true }), group('broken', '2m2p', { wrong: true })]) }
      ]
    },
    ...drillPages([
      looseDrill(dealt('113m557p499s22566z', '1m'), ['11m', '55p', '99s', '22z', '66z'], '3m7p4s5z'),
      looseDrill(dealt('224m668p337s11446z', '1z'), ['22m', '66p', '33s', '11z', '44z'], '4m8p7s6z'),
      looseDrill(dealt('588m344p15599s377z', '9s'), ['88m', '44p', '55s', '99s', '77z'], '5m3p1s3z'),
      looseDrill(dealt('339m177p22668s455z', '7p'), ['33m', '77p', '22s', '66s', '55z'], '9m1p8s4z'),
      looseDrill(dealt('116m299p447s13377z', '1z'), ['11m', '99p', '44s', '33z', '77z'], '6m2p7s1z')
    ])
  ]
};

const READY_BLOCKS = [...READY_MELDS, ...READY_PAIRS];
const READY_HAND = READY_BLOCKS.join('');
const LOOSE_TILE = '9p';
const LOOSE = opening({ hand: `${READY_HAND}${LOOSE_TILE}` }, { wall: WALL_AFTER_DRAW });

const SPLITTING = {
  id: 'split',
  cover: figure([group('meld', '456p'), group('loose', LOOSE_TILE, { wrong: true })]),
  pages: [
    {
      id: 'split',
      board: COMPLETE,
      beats: [
        { id: 'split', ...grouped(COMPLETE_BLOCKS), ...SHOW_HAND },
        { id: 'loose', board: LOOSE, ...grouped(READY_BLOCKS, LOOSE_TILE) }
      ]
    },
    ...drillPages([
      looseDrill(dealt(`${READY_HAND}${LOOSE_TILE}`, '4p'), READY_BLOCKS, LOOSE_TILE),
      looseDrill(dealt('234678m99p1345s77z', '9p'), ['234m', '678m', '99p', '345s', '77z'], '1s'),
      looseDrill(dealt('11188m3445p678s22z', '8m'), ['111m', '88m', '345p', '678s', '22z'], '4p'),
      looseDrill(dealt('1567m33999p234s66z', '3s'), ['567m', '33p', '999p', '234s', '66z'], '1m'),
      looseDrill(dealt('777m88p1234566s44z', '6s'), ['777m', '88p', '123s', '456s', '44z'], '6s')
    ])
  ]
};

const NEXT_TURN_WALL = WALL_AFTER_DRAW - SEAT_NAMES.length;
const EAST_TRIPLET = '111z';
const EAST_BLOCKS = [...READY_MELDS, EAST_TRIPLET, WHITE_PAIR];
const EAST_DRAWN = opening({ hand: READY_HAND, draw: '1z', river: LOOSE_TILE }, { wall: NEXT_TURN_WALL });

const TENPAI = {
  id: 'tenpai',
  cover: figure([group('pair', '55z'), ARROW, group('wait', '5z', { mark: MARK.BEST })]),
  pages: [
    {
      id: 'tenpai',
      board: opening({ hand: READY_HAND, river: LOOSE_TILE }, { wall: WALL_AFTER_DRAW }),
      beats: [
        { id: 'ready', ...grouped(READY_BLOCKS, ...READY_PAIRS) },
        { id: 'readyWait', figure: TERM_FIGURES.tenpai },
        { id: 'east', board: EAST_DRAWN, ...grouped(EAST_BLOCKS, EAST_TRIPLET, WHITE_PAIR) }
      ]
    },
    ...drillPages([
      tenpaiDrill(dealt('234m567p345s77z89s1z', '5p'), ['234m', '567p', '345s', '77z', '89s'], '1z', '89s'),
      tenpaiDrill(dealt('55m123456p24789s6z', '4s'), ['55m', '123p', '456p', '789s', '24s'], '6z', '24s'),
      tenpaiDrill(dealt('345m1678p22299s11z', '1p'), ['345m', '678p', '222s', '99s', '11z'], '1p', '99s', '11z'),
      tenpaiDrill(dealt('123m23678p3459s77z', '2p'), ['123m', '678p', '345s', '77z', '23p'], '9s', '23p'),
      tenpaiDrill(dealt('456789m589p234s11z', '8m'), ['456m', '789m', '234s', '11z', '89p'], '5p', '89p')
    ])
  ]
};

export const MELD_LESSONS = [SHAPE, RUNS, TRIPLETS, PAIRS, SPLITTING, TENPAI];
