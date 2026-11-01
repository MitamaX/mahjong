import { ARROW, figure, group, handWaitFigure, ryanmenHand, waitFigure } from './figure.js';
import { OPPONENTS, OPPONENT_RIVERS, grouped, pick, plainPages, singlePage } from './table.js';
import { riichiTable, safeDrill } from './riichiTable.js';
import { DEAL_IN_TILE, TERM_FIGURES } from './terms.js';
import { MARK } from '../ui/tileView.js';

const SIDE_RIVERS = { right: '9p1z2m8s3p', left: '8m3z9s1m2p' };

const CALLER_RIVER = '2z9m1p7s4*m';
const TSUMOGIRI_TILE = '8p';
const FURITEN_TILE = '1s';
export const FURITEN_RIVER = `2z${FURITEN_TILE}9m1p7s4*m`;
const DEFENDER_HAND = '258m369p147s1356z';
const DEFENDER_RIVER = '9s4z6p1p8m';
const WINNER_HAND = '123m789m456p55z34s';
const WINNER_RIVER = '9s4z6*p';

const CALLER_MELDS = ['234m', '567m', '234p'];
const CALLER_PAIR = '66s';
const CALLER_SHAPE = '23s';
const CALLER_HAND = [...CALLER_MELDS, CALLER_PAIR, CALLER_SHAPE].join('');

const CALLER_TABLE = { ...SIDE_RIVERS, hand: DEFENDER_HAND, self: DEFENDER_RIVER, across: CALLER_RIVER };
const calledTable = (changes = {}) => riichiTable({ ...CALLER_TABLE, ...changes });
const revealed = (changes) => calledTable({ ...changes, shown: { across: CALLER_HAND } });
const winnerTable = (draw) => riichiTable({ ...SIDE_RIVERS, hand: WINNER_HAND, self: WINNER_RIVER, across: '1z8p6s', draw });

const CALLED = calledTable();
const REVEALED = revealed();
const TSUMOGIRI_TABLE = calledTable({ across: `${CALLER_RIVER}${TSUMOGIRI_TILE}` });
const DEALT_IN = calledTable({ self: `${DEFENDER_RIVER}${DEAL_IN_TILE}` });
const WINNER_DRAWN = winnerTable('9p');
export const FURITEN = calledTable({ across: FURITEN_RIVER });
export const FURITEN_DRAWN = calledTable({ across: FURITEN_RIVER, draw: '7z' });
const FURITEN_REVEALED = revealed({ across: FURITEN_RIVER });
const FURITEN_REVEALED_DRAWN = revealed({ across: FURITEN_RIVER, draw: '7z' });

const CALLER_GROUPS = ryanmenHand(CALLER_MELDS, CALLER_PAIR, CALLER_SHAPE);
const CALLER_WAITS = handWaitFigure(CALLER_GROUPS, '14s');
const TSUMO_ONLY = figure([group('ron', '4s', { wrong: true }), group('tsumo', '4s', { mark: MARK.BEST })]);

const RIICHI = singlePage('riichi', figure([group('river', CALLER_RIVER)]), CALLED, [
  { id: 'tenpai', callout: ['hidden:across'] },
  { id: 'what' },
  { id: 'declare', callout: ['plate:across'] },
  { id: 'sideways', callout: ['riichi:across'] }
]);

const TSUMOGIRI = singlePage('tsumogiri', figure([group('river', `7s4*m${TSUMOGIRI_TILE}`)]), TSUMOGIRI_TABLE, [
  { id: 'lock', callout: ['hidden:across'] },
  { id: 'tsumogiri', callout: [`river:across:${TSUMOGIRI_TILE}`] },
  { id: 'name', board: WINNER_DRAWN, callout: ['drawn', 'river:self'] }
]);

const TSUMO = singlePage('tsumo', TERM_FIGURES.tsumo, winnerTable('5s'), [
  { id: 'tsumo', callout: ['drawn'] },
  { id: 'complete', ...grouped(['123m', '789m', '456p', '55z', '345s'], '345s') },
  { id: 'pay', callout: OPPONENTS }
]);

const RON = singlePage('ron', TERM_FIGURES.ron, CALLED, [
  { id: 'ron', callout: ['river:right'] },
  { id: 'anyone', callout: OPPONENT_RIVERS }
]);

const DEAL_IN = singlePage('dealin', TERM_FIGURES.dealIn, DEALT_IN, [
  { id: 'dealIn', callout: [`river:self:${DEAL_IN_TILE}`, 'hidden:across'] },
  { id: 'pay', callout: ['plate:self'] },
  { id: 'avoid', callout: ['plate:across'] }
]);

const READING = {
  id: 'reading',
  cover: waitFigure(['ryanmen', CALLER_SHAPE, '14s']),
  pages: [
    {
      id: 'reveal',
      board: REVEALED,
      beats: [
        { id: 'reveal', callout: ['hidden:across'] },
        { id: 'waits', figure: CALLER_WAITS, focus: ['ryanmen', 'wait'] }
      ]
    },
    ...plainPages([
      safeDrill({
        hand: '11m666778899p55s', draw: '9p', dora: '3p', shown: { across: '234567m34578p22s' },
        self: '2z4z5z6z7z1z2m9m9m3z', right: '3z6m1p8p5p5p1m7m2m2p',
        across: '2z1s4p7m2p9m3m5s7s7*p', left: '1z4z1s7z1m7z9m2p1z6m'
      }, { correct: { safe: '1m7p8p5s' }, wrong: { dealIn: '6p9p' } }),
      safeDrill({
        hand: '44455666p34555s', draw: '5p', dora: '3m', shown: { across: '123789m789p3346s' },
        self: '2z3z4z6z5m1s2p5p7m1p4s', right: '3z4z5z6z1p8m7m7z8p3z4m',
        across: '2z5z7z5z6z5m9m2z5m8p1*s', left: '3z1m4m4p8m2p5s4m7p6s9m'
      }, { correct: { safe: '4p5p6p3s4s' }, wrong: { dealIn: '5s' } }),
      safeDrill({
        hand: '66699m33344455s', draw: '5s', dora: '3m', shown: { across: '234567m33567p12s' },
        self: '2z5z2p9s6p1m2m1s', right: '3p4m4p6z5p3s4z5z',
        across: '2z1z4z8m1p2p1m5*p', left: '5z7z6s2m1p2p3z8m'
      }, { correct: { safe: '6m9m4s5s' }, wrong: { dealIn: '3s' } }),
      safeDrill({
        hand: '22p11133778899s', draw: '9s', dora: '4m', shown: { across: '123567m22456p77s' },
        self: '5z9p5p2z5m4s4m6z2z', right: '1z6z3z4z9m9p1m2m2m',
        across: '1z3z7z9m5m2s3p8p5*s', left: '6z3m3p9p6z8p1s1m9p'
      }, { correct: { safe: '1s3s8s9s' }, wrong: { dealIn: '2p7s' } }),
      safeDrill({
        hand: '2223344556m666z', draw: '4m', dora: '1z', shown: { across: '4789m345789p234s' },
        self: '4z5m1p6p2z1s1p', right: '6m4z3z6m2z5m6p',
        across: '1z3z1p2z1s7s3*m', left: '4z8m2p3z5z2p3m'
      }, { correct: { safe: '2m3m5m6m6z' }, wrong: { dealIn: '4m' } })
    ])
  ]
};

const FURITEN_LESSON = {
  id: 'furiten',
  cover: TERM_FIGURES.furiten,
  pages: [
    {
      id: 'furiten',
      board: FURITEN_REVEALED,
      beats: [
        { id: 'furiten', figure: CALLER_WAITS, focus: ['wait'] },
        { id: 'rule', figure: TSUMO_ONLY },
        { id: 'discarded', callout: [`river:across:${FURITEN_TILE}`] },
        { id: 'noRon', figure: figure(CALLER_GROUPS, [ARROW, group('wait', '14s', { wrong: true })]) }
      ]
    },
    {
      id: 'practice',
      board: FURITEN_REVEALED_DRAWN,
      beats: [pick('pickFuriten', { correct: { furiten: '4s' } })]
    }
  ]
};

export const RIICHI_LESSONS = [RIICHI, TSUMO, TSUMOGIRI, RON, DEAL_IN, READING, FURITEN_LESSON];
