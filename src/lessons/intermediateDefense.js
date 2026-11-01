import { ARROW, figure, group, lineFigure, sidesFigure, waitFigure, waitRow } from './figure.js';
import { pickPages } from './table.js';
import { NOTHING_SAFER, riichiTable, safeDrill, turnBoards } from './riichiTable.js';
import { KABE_WALL, TERM_FIGURES } from './terms.js';
import { MARK } from '../ui/tileView.js';

const NAKA_TABLE = { hand: '4567m456p3478s55z', across: '2m9s8m1z2p7*z' };
const blockedSides = (key, suit, open) => [
  group(key, `5${suit}`, { mark: MARK.BEST }),
  group('ryanmen', `34${suit}`, { wrong: true }),
  group('ryanmen', `67${suit}`, { wrong: !open })
];
const NAKA_VS_KATA = figure(blockedSides('nakaSuji', 'm', false), blockedSides('kataSuji', 'p', true));
const NAKA_LINES = lineFigure('4m', '5m', '6m');
const NAKA_CHECK = figure(
  [group('genbutsu', '1m'), group('kataSuji', '4m', { mark: MARK.BEST })],
  [group('genbutsu', '1m'), group('nakaSuji', '4m', { mark: MARK.BEST }), group('genbutsu', '7m')]
);

const NAKA_SUJI = {
  id: 'nakasuji',
  cover: TERM_FIGURES.nakaSuji,
  pages: [
    {
      id: 'learn',
      board: riichiTable(NAKA_TABLE),
      beats: [
        { id: 'two', figure: sidesFigure('m', 5, [false, false]) },
        { id: 'sources', callout: ['river:across:2m', 'river:across:8m', 'hand:5m'] },
        { id: 'naka', figure: sidesFigure('m', 5, [true, true]) },
        { id: 'kata', figure: sidesFigure('p', 5, [true, false]) },
        { id: 'danger', figure: NAKA_VS_KATA },
        { id: 'lines', figure: NAKA_LINES },
        { id: 'check', figure: NAKA_CHECK }
      ]
    },
    ...pickPages([
      safeDrill({
        hand: '15567m22p345799s', draw: '7m', dora: '5p',
        self: '2z7z3z1p7p2s9p2m', right: '5p4z3z5m1m4s7p8m',
        across: '1z4z9p2m8m3m1*s9p', left: '5z5m2m1p4s6m3m7p'
      }, { correct: { naka: '5m' }, wrong: { kata: '6m4s' } }),
      safeDrill({
        hand: '166m12667p45699s', draw: '8m', dora: '2s',
        self: '2z3z4z1m4m9p5z1s7s', right: '6z7z3s8s2m3z8p6z9m',
        across: '2z1z5z2s3m7s9p9*m8p', left: '6z5z2m7p5z8p1s9m2s'
      }, { correct: { naka: '6m' }, wrong: { kata: '6p4s5s' } }),
      safeDrill({
        hand: '56m234p12556678s', draw: '8s', dora: '2m',
        self: '3z4z7z9m8m6p8p', right: '3z4z6z1p2z2m1p',
        across: '1z6z7z1p7p7m8*m', left: '4z5z5m2m8m6p1z'
      }, { correct: { naka: '4p' }, wrong: { kata: '5m' } }),
      safeDrill({
        hand: '22334m356p13366s', draw: '6p', dora: '8s',
        self: '4z1z5z9m5z6m8p4z1p', right: '2z3z7z1m9m2p5z5z7p',
        across: '6z9p9s1p2p3z4p9*s8p', left: '6z1m7z1s6s5m7m8p9s'
      }, { correct: { naka: '5p' }, wrong: { kata: '6p6s' } }),
      safeDrill({
        hand: '345678m1145567s', draw: '1s', dora: '9s',
        self: '1p4p5z3m8p5z9p9s5p3p3z', right: '3z5z6z1p2p3s7z9m1z1z5p',
        across: '1z2z4z3p7z6p8s3z3*s5p9s', left: '2z5z4z7p7z1m7s2m6p3p2p'
      }, { correct: { naka: '6s' }, wrong: { kata: '5s' } })
    ])
  ]
};

const KABE_TILE = '3s';
const KABE_TABLE = { hand: '3459m2378p12334s', across: '1z9p7z2m9s4*z', left: '1m9m3s8s2s6z', dora: KABE_TILE };

const KABE = {
  id: 'kabe',
  cover: figure([KABE_WALL, ARROW, group('outer', '12s', { mark: MARK.BEST })]),
  pages: [
    {
      id: 'learn',
      board: riichiTable(KABE_TABLE),
      beats: [
        NOTHING_SAFER,
        { id: 'four', callout: ['hand:3s3s', `river:left:${KABE_TILE}`, 'dora'] },
        { id: 'blocked', figure: waitFigure(['ryanmen', '23s', '1s', { wrong: true }], ['ryanmen', '34s', '2s', { wrong: true }]) },
        { id: 'safe', callout: ['hand:1s2s'] },
        { id: 'kanchan', figure: waitFigure(['kanchan', '13s', '2s', { wrong: true }]) },
        { id: 'weak', figure: figure([group('kabe', '4444s', { mark: MARK.CITE })], waitRow(['ryanmen', '23s', '1s'])) },
        { id: 'strong', figure: figure([group('kabe', '2378s', { mark: MARK.BEST })]) },
        { id: 'pairs', figure: waitFigure(['tanki', '2s', '2s'], ['shanpon', '22s55z', '2s5z']) }
      ]
    },
    ...pickPages([
      safeDrill({
        hand: '4456m335689p555s', draw: '2p', dora: '7p',
        self: '4z6z1z1z7s2z7p', right: '2z2z3z5z1p7z1s',
        across: '1z6z7z7m7p1*s9m', left: '1z7z6m9m1p7p1s'
      }, { correct: { kabe: '8p9p' }, wrong: { beside: '6p' } }),
      safeDrill({
        hand: '2358m4567p11346s', draw: '8m', dora: '6p',
        self: '3m3z5z7z7z1p2s9m1m4z', right: '3m3z2z9s2m6m1p2s4z4z',
        across: '1z3z5z2z1p2*s9m7z5s4m', left: '9m1m1z9s8p1p2s2z2z4z'
      }, { correct: { kabe: '1s' }, wrong: { beside: '3s' } }),
      safeDrill({
        hand: '24m2233p3345679s', draw: '8m', dora: '3z',
        self: '5z1z7z8m9p3m7p2p1p3m', right: '2m1z7m2z9m2p4z4z7m8p',
        across: '2z6z1p8s7m3m3m8*p3z6m', left: '3z7z8p9m1p7p7z2z6z6m'
      }, { correct: { kabe: '2m' }, wrong: { beside: '4m' } }),
      safeDrill({
        hand: '67m346699p23489s', draw: '6s', dora: '4m',
        self: '3z8p3m6s6s2s4m4z5m3m7s', right: '2z6z5m6z8p3m1m8m4z5z5z',
        across: '3z6z5z8p2p2p8*m3m7s4z1m', left: '3z2z6z7z4p1m1z4z7s7s5m'
      }, { correct: { kabe: '8s9s' }, wrong: { beside: '6s' } }),
      safeDrill({
        hand: '279m24588p33368s', draw: '2m', dora: '6p',
        self: '1z5z2p5s9m8m8p1p8m3z7s', right: '3z3m2z3p1s4z9p5m8m6m4s',
        across: '6z6z1p7z1s6m8m4*s6z7s4z', left: '1z3z4z7z1m1p3z2z2z2z7s'
      }, { correct: { kabe: '9m' }, wrong: { beside: '7m' } })
    ])
  ]
};

const SAFETY_TABLE = {
  hand: '34558m226p5568s4z', across: '2m8m1z9p4s7*z',
  self: '2z1p3p4z1m9s', right: '9p3p4z2m3p6z', left: '1m9m3z3p2s6z'
};
const SAFETY_RANKING = figure([
  group('genbutsu', '8m'), group('honor', '4z'), group('kabe', '2p'), group('suji', '5m'), group('noSuji', '5s')
]);

const SAFETY = {
  id: 'safety',
  cover: figure([group('genbutsu', '8m', { mark: MARK.BEST }), ARROW, group('noSuji', '5s')]),
  pages: [
    {
      id: 'learn',
      board: riichiTable(SAFETY_TABLE),
      beats: [
        { id: 'fewer' },
        { id: 'order', figure: SAFETY_RANKING },
        { id: 'suji', callout: ['hand:5m', 'hand:6p'] },
        { id: 'honor', figure: SAFETY_RANKING, focus: ['honor', 'suji'] }
      ]
    },
    ...pickPages([
      safeDrill({
        hand: '2334466789m123p', draw: '7z', dora: '6m',
        self: '3z4z5z7z9s1z7p', right: '3z5z8m6p6p6p9p',
        across: '5p5z8m6z9s1m9*p', left: '3z5z2z6z1m1s8m'
      }, { correct: { genbutsu: '8m' }, second: { honor: '7z' }, wrong: { kabe: '9m', suji: '2p', kata: '4m' } }),
      safeDrill({
        hand: '889m345789p79s22z', draw: '3s', dora: '2m',
        self: '1z5z5m1p4m5m2s', right: '3z7z1m1s3z4s9m',
        across: '4z1m4z7z6m6z6*s', left: '3z6z1s4s2z4p7m'
      }, { correct: { honor: '2z' }, second: { suji: '9m9s3s' } }),
      safeDrill({
        hand: '239m3345p122577s', draw: '1p', dora: '7m',
        self: '5z4p7p1s9m3p7m', right: '2z3z4z7p8m6z3s',
        across: '7m3z1m7m5m6*p1z', left: '3z4z1m5z9m2z2z'
      }, { correct: { kabe: '9m' }, second: { suji: '2m3p' } }),
      safeDrill({
        hand: '557m135567p2235s', draw: '3s', dora: '7p',
        self: '3z4z5z6z8s2m', right: '1z2z3z1p6s4m',
        across: '7z1m9m4m2m8*m', left: '1z4z5z1p6p1m'
      }, { correct: { naka: '5m' }, second: { suji: '7m' } }),
      safeDrill({
        hand: '134m4478p444589s', draw: '2p', dora: '9p',
        self: '4z7z1m1s6z6z6p', right: '4z5z3m1p4m4p6p',
        across: '5z6z1z1p4z6*p6s', left: '4z6z1z2z3z1p1z'
      }, { correct: { suji: '9s' }, second: { kata: '4p' } })
    ])
  ]
};

const ORDER_START = {
  hand: '23467m4678p359s3z',
  self: '2z9m1p8s4z1m',
  right: '9p1s3z7z8p6z',
  across: '1z9s2p8m7z5*m',
  left: '1m9m3z8s2s'
};
const ORDER_TURNS = [
  { left: '6z', draw: '1p', discard: '9s', right: '2m', across: '2s' },
  { left: '5z', draw: '9p', discard: '2m', right: '1z', across: '8s' },
  { left: '4z', draw: '6m', discard: '3z', right: '6z', across: '4s' },
  { left: '2z', draw: '5p', discard: '5s', right: '6m', across: '7z' },
  { left: '7z', draw: '7s', discard: '6m' }
];
const [FIRST_TURN, SECOND_TURN, , , LAST_TURN] = turnBoards(ORDER_START, ORDER_TURNS);
const [{ discard: FIRST_SAFE, right: SAVED }] = ORDER_TURNS;

const ORDER = {
  id: 'order',
  cover: figure([group('genbutsu', FIRST_SAFE, { mark: MARK.BEST }), group('suji', SAVED)]),
  pages: [
    {
      id: 'learn',
      board: FIRST_TURN,
      beats: [
        { id: 'first', callout: [`hand:${FIRST_SAFE}`] },
        { id: 'save', callout: [`hand:${SAVED}`] },
        { id: 'later', board: SECOND_TURN, callout: [`river:right:${SAVED}`, `hand:${SAVED}`] },
        { id: 'narrow', board: LAST_TURN, callout: ['river:across'] }
      ]
    },
    ...pickPages([
      safeDrill({
        hand: '24566789p12789s', draw: '3z', dora: '7s',
        self: '6m4s5z2z3z6z9m6z4z', right: '1z5z2z7z1m5s6z2z7z',
        across: '3z5z5m6m2m2m5s3m3*s', left: '9m8m2z1m6z1z1z7z3s'
      }, { correct: { genbutsu: '3z' }, second: { suji: '2s8s' } }),
      safeDrill({
        hand: '4489m2468p34578s', draw: '2s', dora: '5s',
        self: '4z6z2m7z1p2s4p1m6p6p2m', right: '3z1z6z1m3z4m6m3z2p6z6m',
        across: '4z1m5m1p4m1z3m3z3s6s7*m', left: '1z5z9m2m1p5m5z1s3m2z3m'
      }, { correct: { genbutsu: '4m3s' }, second: { suji: '8m' }, wrong: { kata: '4p' } }),
      safeDrill({
        hand: '13588m1155p2779s', draw: '2s', dora: '4p',
        self: '5z6z7z1z1s6z4m4s9p2s', right: '1z2z4z4z9p8s3s6p8p7p',
        across: '3s6s3p1s4s6p8*p1z5s7m', left: '5z2z7z2z4m9m8p4z6s1s'
      }, { correct: { genbutsu: '2s' }, second: { suji: '7s9s' }, wrong: { kata: '5p' } }),
      safeDrill({
        hand: '11345m99p456789s', draw: '2p', dora: '9s',
        self: '1z6z9m1p1p4z5s2z3s', right: '7z3z1m3p2p3s8m3z1s',
        across: '2z6z1s2m2z2p8p8m4*s', left: '5z6z6p6z3z5s3z8p8m'
      }, { correct: { genbutsu: '4s2p' }, second: { naka: '5m' }, wrong: { suji: '7s' } }),
      safeDrill({
        hand: '2258m2899p34468s', draw: '9s', dora: '5z',
        self: '7z3z4p1s3p9m7m3m5m', right: '1z4m4p6z1s5p6z3m2p',
        across: '1z5z4z5m6p6p3p1*m2s', left: '1p4m6m1s7m9m4p5z2p'
      }, { correct: { genbutsu: '5m2p' }, second: { suji: '2m8m9p' } })
    ])
  ]
};

export const DEFENSE_INTERMEDIATE_LESSONS = [NAKA_SUJI, KABE, SAFETY, ORDER];
