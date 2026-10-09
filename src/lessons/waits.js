import { Notation } from '../core/notation.js';
import { COPIES } from '../core/tiles.js';
import { counted, figure, group, handWaitFigure, ryanmenHand, waitFigure } from './figure.js';
import {
  DORA, WALL_AFTER_DRAW, dealt, drillOn, drillPages, handPart, opening, showParts, singlePage
} from './table.js';
import {
  RYANMEN_BLOCKS, RYANMEN_SHAPE, RYANMEN_TILES, RYANMEN_WAITS, TERM_FIGURES, WAIT_MELDS, WAIT_SHAPES, WHITE_PAIR
} from './terms.js';
import { MARK } from '../ui/tileView.js';

const RYANMEN_HAND = opening({ hand: RYANMEN_TILES });

const heldOf = (shape, arrival) => Notation.tiles(shape).filter((tile) => tile === arrival).length;

const unseen = (wait) => {
  const [, shape, arrivals] = wait;
  return counted(wait, COPIES - heldOf(shape, Notation.tile(arrivals)));
};

const WAIT_HAND = handWaitFigure(ryanmenHand(WAIT_MELDS, WHITE_PAIR, RYANMEN_SHAPE), RYANMEN_WAITS);

const ALL_SHAPES = waitFigure(...Object.values(WAIT_SHAPES));

const INTRO = singlePage('waits', TERM_FIGURES.ryanmen, RYANMEN_HAND, [
  { id: 'wait', figure: TERM_FIGURES.wait },
  { id: 'waitHere', figure: WAIT_HAND, focus: ['ryanmen', 'wait'] },
  { id: 'shapes', figure: ALL_SHAPES },
  { id: 'strongest', figure: ALL_SHAPES, focus: ['ryanmen'] }
]);

const completedRun = (run, arrival) => group('run', run, { marks: { [MARK.BEST]: arrival } });

const keepWider = ({ board, blocks, correct, second, kept }) => drillOn(board, blocks, { correct, second }, kept);

const RYANMEN = {
  id: 'ryanmen',
  cover: waitFigure(['ryanmen', '45m', '36m']),
  pages: [
    {
      id: 'learn',
      board: RYANMEN_HAND,
      beats: [
        { id: 'ryanmen', figure: TERM_FIGURES.ryanmen },
        { id: 'how', figure: figure([completedRun('234s', '2s'), completedRun('345s', '5s')]) },
        { id: 'wide', figure: waitFigure(unseen(WAIT_SHAPES.ryanmen)) },
        { id: 'compare', figure: waitFigure(WAIT_SHAPES.ryanmen, WAIT_SHAPES.kanchan) }
      ]
    },
    ...drillPages([
      keepWider({
        board: dealt(`${RYANMEN_TILES}6s`, '4s'),
        blocks: RYANMEN_BLOCKS,
        correct: { ryanmen: '6s' },
        second: { kanchan: '3s' },
        kept: RYANMEN_SHAPE
      }),
      keepWider({
        board: dealt('123p789p456s77z568m', '6m'),
        blocks: ['123p', '789p', '456s', '77z', '56m'],
        correct: { ryanmen: '8m' },
        second: { kanchan: '5m' },
        kept: '56m'
      }),
      keepWider({
        board: dealt('34599m678p234679s', '9s'),
        blocks: ['345m', '99m', '678p', '234s', '67s'],
        correct: { ryanmen: '9s' },
        second: { kanchan: '6s' },
        kept: '67s'
      }),
      keepWider({
        board: dealt('67899m345p222457s', '5s'),
        blocks: ['678m', '99m', '345p', '222s', '45s'],
        correct: { ryanmen: '7s' },
        second: { kanchan: '4s' },
        kept: '45s'
      }),
      keepWider({
        board: dealt('456m235p345789s66z', '3p'),
        blocks: ['456m', '345s', '789s', '66z', '23p'],
        correct: { ryanmen: '5p' },
        second: { kanchan: '2p' },
        kept: '23p'
      })
    ])
  ]
};

const COMPARE_BASE = '123m456p789p77z';
const COMPARE_HAND = opening({ hand: `${COMPARE_BASE}35s`, draw: '6s' });

const discardedFrom = (kept, discard, dora = DORA) =>
  opening({ hand: `${COMPARE_BASE}${kept}`, river: discard }, { wall: WALL_AFTER_DRAW, dora });

const COUNTED = waitFigure(unseen(['ryanmen', '56s', '47s']), unseen(WAIT_SHAPES.kanchan));
const HELD = waitFigure(unseen(['shanpon', '66s11z', '6s1z']), unseen(['tanki', '5s', '5s']));
const KEPT_RYANMEN = '56s';
const SHOWN_WAIT = '7s';

const COMPARE = {
  id: 'compare',
  cover: figure([group('ryanmen', '56s'), group('kanchan', '35s', { wrong: true })]),
  pages: [
    {
      id: 'learn',
      board: COMPARE_HAND,
      beats: [
        { id: 'two', ...showParts('3s', '6s') },
        { id: 'ryanmen', board: discardedFrom(KEPT_RYANMEN, '3s'), ...showParts(KEPT_RYANMEN) },
        { id: 'kanchan', board: discardedFrom('35s', '6s'), ...showParts('35s') },
        { id: 'count', figure: COUNTED },
        { id: 'more', figure: COUNTED, focus: ['ryanmen'] },
        { id: 'held', figure: HELD },
        { id: 'indicator', board: discardedFrom(KEPT_RYANMEN, '3s', SHOWN_WAIT), callout: ['dora', handPart(KEPT_RYANMEN)] }
      ]
    },
    ...drillPages([
      keepWider({
        board: opening({ hand: '456m234p789p66z13s', draw: '4s' }),
        blocks: ['456m', '234p', '789p', '66z', '34s'],
        correct: { ryanmen: '1s' },
        second: { kanchan: '4s' },
        kept: '34s'
      }),
      keepWider({
        board: opening({ hand: '345m678p11z22266s', draw: '5s' }),
        blocks: ['345m', '678p', '222s', '11z', '56s'],
        correct: { ryanmen: '6s' },
        second: { shanpon: '5s' },
        kept: '56s'
      }),
      keepWider({
        board: opening({ hand: '345m678p123s111z5s', draw: '7s' }),
        blocks: ['345m', '678p', '123s', '11z', '57s'],
        correct: { kanchan: '1z' },
        second: { tanki: '57s' },
        kept: '57s'
      }),
      keepWider({
        board: dealt('346m789p123456s77z', '6m'),
        blocks: ['789p', '123s', '456s', '77z', '34m'],
        correct: { ryanmen: '6m' },
        second: { kanchan: '3m' },
        kept: '34m'
      }),
      keepWider({
        board: dealt('234m578p456999s33z', '9s'),
        blocks: ['234m', '456s', '999s', '33z', '78p'],
        correct: { ryanmen: '5p' },
        second: { kanchan: '8p' },
        kept: '78p'
      })
    ])
  ]
};

export const WAIT_LESSONS = [INTRO, RYANMEN, COMPARE];
