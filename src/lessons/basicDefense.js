import { Notation } from '../core/notation.js';
import { ARROW, figure, group, lineFigure, riichiGenbutsuFigure, sidesFigure, waitFigure } from './figure.js';
import { citedPick, pickPages } from './table.js';
import { FURITEN, FURITEN_DRAWN, FURITEN_RIVER } from './riichi.js';
import { NOTHING_SAFER, riichiTable, safeDrill } from './riichiTable.js';
import { SEEN_HONOR, SUJI_SOURCE, TERM_FIGURES } from './terms.js';
import { MARK } from '../ui/tileView.js';

const GENBUTSU_TILES = Notation.split(FURITEN_RIVER).join('');
const GENBUTSU_MARKS = { [MARK.CITE]: GENBUTSU_TILES };
const GENBUTSU_FIGURE = figure([group('genbutsu', GENBUTSU_TILES)]);

const GENBUTSU = {
  id: 'genbutsu',
  cover: TERM_FIGURES.discard,
  pages: [
    {
      id: 'learn',
      board: FURITEN,
      beats: [
        { id: 'hidden', callout: ['hidden:across'] },
        { id: 'visible', callout: ['river:across'] },
        { id: 'genbutsu', callout: ['river:across'], marks: GENBUTSU_MARKS },
        { id: 'name', figure: GENBUTSU_FIGURE }
      ]
    },
    {
      id: 'practice',
      board: FURITEN_DRAWN,
      beats: [citedPick('pick', { correct: { genbutsu: '17s' }, wrong: { furiten: '4s' } })]
    }
  ]
};

const BETAORI_TABLE = { hand: '23467m567p3477s9p', draw: '4z', across: '1z9s2p8m7z3*m' };

const BETAORI = {
  id: 'betaori',
  cover: TERM_FIGURES.betaori,
  pages: [
    {
      id: 'learn',
      board: riichiTable(BETAORI_TABLE),
      beats: [
        { id: 'riichi', callout: ['riichi:across', 'hand'] },
        { id: 'betaori' },
        { id: 'build', callout: ['hand:9p', 'drawn'] },
        { id: 'safe', callout: ['river:across:3m', 'hand:3m'] },
        { id: 'turns', callout: ['wall'] }
      ]
    },
    ...pickPages([
      safeDrill({
        hand: '22557m45789p678s', draw: '4p', dora: '9s',
        self: '3z6z1s4s4p3s5p1s6p', right: '9s4m9p3s9p4z6z5p2p',
        across: '3z2z9p2z4z2p6p1*m5s', left: '9s2z2s6z1p1m5z2p5s'
      }, { correct: { genbutsu: '9p' }, wrong: { loose: '4p' } }),
      safeDrill({
        hand: '789m2289p112367s', draw: '5m', dora: '8m',
        self: '1z2z4z2m7z4z2m6m', right: '1z3z5z6z7z1m9m3p',
        across: '1z4z6z1p9s4z7s4*p', left: '2z3z6z7z2m5z2z1m'
      }, { correct: { genbutsu: '7s' }, wrong: { loose: '5m1s' } }),
      safeDrill({
        hand: '23455m589p23678s', draw: '4m', dora: '4s',
        self: '1z2p7m3m3z7z9m9m2p', right: '3z5z4s5m1s1m2z9m2m',
        across: '1z4z6z7z2m4p6z9m1*s', left: '1z6z6m1s2z2z9s1m7z'
      }, { correct: { genbutsu: '2m' }, wrong: { loose: '4m5p' } }),
      safeDrill({
        hand: '5589m46p13346s55z', draw: '8m', dora: '8s',
        self: '1z3z6z1z2z4z5s1p8m2m2m', right: '1s1m1m5s1z7p1p1p9s4z9p',
        across: '7z2m5z3p7z5z8s8p2*s8p5p', left: '3z6z9s9s7m1s1s1p2s3z9p'
      }, { correct: { genbutsu: '5z' }, wrong: { loose: '1s' } }),
      safeDrill({
        hand: '999m33378p23455s', draw: '4p', dora: '8s',
        self: '2z5z3z6z3m4z4z6p5m9p7m', right: '3z7z2p3z1s2s5s6z6s1m4m',
        across: '2z6z4m2m8s7z7m8m5m4*s6s', left: '4z2p1s2s2m4p1z4s9s1m8m'
      }, { correct: { genbutsu: '4s' }, wrong: { tenpai: '4p' } })
    ])
  ]
};

const FIRST_PASSED = '5z';
const PASSED_TABLE = {
  hand: '23457m456p4568s5z', draw: '6p',
  self: '2z9m1p8s4z1m', right: '9p1s4z2m8p6z', across: '1z9s2p8m7z3*s', left: `1m9m3z8s2s${FIRST_PASSED}`
};

const PASSED = {
  id: 'passed',
  cover: riichiGenbutsuFigure(['3*s'], FIRST_PASSED),
  pages: [
    {
      id: 'learn',
      board: riichiTable(PASSED_TABLE),
      beats: [
        { id: 'river', callout: ['river:across'] },
        { id: 'passed', callout: [`river:left:${FIRST_PASSED}`, 'riichi:across'] },
        { id: 'furiten', callout: [`river:left:${FIRST_PASSED}`] },
        { id: 'anyone' },
        { id: 'before', callout: ['river:right'] },
        { id: 'only', callout: ['plate:across'] }
      ]
    },
    ...pickPages([
      safeDrill({
        hand: '6699m6689p56699s', draw: '4p', dora: '1z',
        self: '2z9s2m1s1z4m8m7m6z6z', right: '1z3z4z8m2p6m7p2s1m8m',
        across: '5z4z1m2z2m4z3z3*z7s1s', left: '1z6z5m5z7p4m7m5m9p2z'
      }, { correct: { safe: '9p' }, wrong: { before: '6m9s' } }),
      safeDrill({
        hand: '66779p11345577s', draw: '5m', dora: '1z',
        self: '2z5m6z4p2p3z3p6m7m8s7z', right: '1z2z4z5z8m4p1s5m8p5m5z',
        across: '7z8p2m1m4m6m6*s8m8s4z1z', left: '1z3z4z6z7z1p4m6z7m2z5p'
      }, { correct: { safe: '5m' }, wrong: { before: '1s' } }),
      safeDrill({
        hand: '36677m2448p1127s', draw: '1m', dora: '9s',
        self: '9s1z4z3z5z1p4m2s', right: '1z2z3z5z1z7z3m9s',
        across: '9s4z5z4m3p5s5*m2m', left: '1z2z4z3z9m1p5s7z'
      }, { correct: { safe: '2s' }, wrong: { before: '3m' } }),
      safeDrill({
        hand: '34567m1334789p3s', draw: '3s', dora: '6p',
        self: '3z6z4z3s6s2p4p1s1s5p1m', right: '2z2z5z8m9m8m3s6p6p1m1p',
        across: '6z9m2z1s5z6p9*s7s2p7z1z', left: '2z4z7z9m1z1p9s9s9m1m2p'
      }, { correct: { safe: '1p' }, wrong: { before: '4p3s' } }),
      safeDrill({
        hand: '124455p333467s4z', draw: '1s', dora: '8p',
        self: '1z2z3z6m8p3m3z1s9m8s5z7z', right: '4z5z7z6z4p6z1m2m2s7m5s3z',
        across: '2z7z1m3m2s1z8s7m6*p9m9m6m', left: '1z5z6z9s6m1z7z5m5s9m6z4z'
      }, { correct: { safe: '4z' }, wrong: { before: '4p1s' } })
    ])
  ]
};

const HONOR_TABLE = { hand: '345m678p246s4z55z7z', draw: '1s', across: '9m1p9s2m8m3*p' };
const [THREE_SEEN, TWO_SEEN, ONE_SEEN] = ['4z', '5z', '7z'];
const THREE_LEFT = figure([SEEN_HONOR, ARROW, group('tanki', '4z', { mark: MARK.BEST })]);

const HONOR = {
  id: 'honor',
  cover: THREE_LEFT,
  pages: [
    {
      id: 'learn',
      board: riichiTable(HONOR_TABLE),
      beats: [
        NOTHING_SAFER,
        { id: 'shapes', figure: waitFigure(['tanki', '7z', '7z'], ['shanpon', '5577z', '57z']) },
        { id: 'count', callout: [`river:right:${THREE_SEEN}`, `river:self:${THREE_SEEN}`, `hand:${THREE_SEEN}`] },
        { id: 'three', figure: THREE_LEFT },
        { id: 'one', callout: [`hand:${ONE_SEEN}`] },
        { id: 'late', callout: ['wall'] }
      ]
    },
    ...pickPages([
      safeDrill({
        hand: '8m67p334455679s6z', draw: '4z', dora: '2p',
        self: '2z7z2z1m3p1s9m9m5z', right: '3z7z5z1p1p4z2s2s5m',
        across: '1z5z2s6m6m3*p5m8s1s', left: '3z5z6z6z7z3p3z9m5m'
      }, { correct: { three: '6z' }, second: { two: '4z' } }),
      safeDrill({
        hand: '5788m5678p6778s7z', draw: '4z', dora: '4s',
        self: '4s4z2p2m3m1z1z6z6z', right: '1z2z9m4z1p2s9s2z6m',
        across: '9p6z2s1p9*s1s3z6m5s', left: '1z2z3z8m3s1s3s9m9m'
      }, { correct: { three: '4z' }, wrong: { one: '7z' } }),
      safeDrill({
        hand: '34466p799s33455z', draw: '5s', dora: '1m',
        self: '1z1p5m9p2s3m4m6m8p5p', right: '2m1z1p6z2s9p5z7m1m1m',
        across: '6z7p8p2s9p3s3m5*m5p5m', left: '6z2z7p7z9m1p8p4m2s3s'
      }, { correct: { three: '5z' }, second: { two: '3z' }, wrong: { one: '4z' } }),
      safeDrill({
        hand: '8899m22p357s2267z', draw: '9m', dora: '4s',
        self: '5z1m4m1p6p2s2m3z3z3z', right: '2z3z2m9m1m4p1m8s1s9p',
        across: '1z3m5z9p2s9s8s3*p9s1z', left: '7z1s1p9s7p1m4m8s9s5z'
      }, { correct: { three: '2z' }, second: { two: '7z' }, wrong: { one: '6z' } }),
      safeDrill({
        hand: '189m1177p57s1255z', draw: '9m', dora: '7s',
        self: '4m6m5m7m4p6p8p9p3z4z6z', right: '2z6s2m9m3s3z4z7m3m8p2p',
        across: '6z9p6p8p9*s4s8s4m4z5p5m', left: '3z5z1p1s6p9s8s4m9s5p4z'
      }, { correct: { three: '5z' }, second: { two: '2z' }, wrong: { one: '1z' } })
    ])
  ]
};

const SUJI_TABLE = { hand: '1578m137p234669s', across: '1z9p4m8s2z5*p' };
const SUJI_LINES = lineFigure('1m7m', '2m8m', '3m9m');

const SUJI = {
  id: 'suji',
  cover: TERM_FIGURES.suji,
  pages: [
    {
      id: 'learn',
      board: riichiTable(SUJI_TABLE),
      beats: [
        NOTHING_SAFER,
        { id: 'genbutsu', callout: [`river:across:${SUJI_SOURCE}`] },
        { id: 'ryanmen', figure: sidesFigure('m', 4, [false, false]) },
        { id: 'furiten', figure: sidesFigure('m', 4, [true, true]) },
        { id: 'suji', callout: ['hand:1m', 'hand:7m', `river:across:${SUJI_SOURCE}`] },
        { id: 'lines', figure: SUJI_LINES },
        { id: 'outer', figure: SUJI_LINES },
        { id: 'middle', figure: sidesFigure('m', 4, [true, false]) },
        {
          id: 'limit',
          figure: waitFigure(['kanchan', '68m', '7m'], ['penchan', '89m', '7m'], ['tanki', '7m', '7m'], ['shanpon', '77m55z', '7m5z'])
        }
      ]
    },
    ...pickPages([
      safeDrill({
        hand: '377m1178p455679s', draw: '7m', dora: '6s',
        self: '7z5z6z2m6z2z2z3p8m', right: '7z6s2z1m9m2p3p1z8s',
        across: '4z4z1m3p5m8*s4m4m9p', left: '7z1z2z6z9m5m3z3z8m'
      }, { correct: { suji: '7m' }, wrong: { kata: '5s' } }),
      safeDrill({
        hand: '55689m8p3678899s', draw: '6m', dora: '4s',
        self: '1p2s9m7s1z5p4m9p7m7p3m4p', right: '3z2z5z9p1s1m6p3p7p2z3m1p',
        across: '7z1p9p4z6p4*m6p5z6z3m5p1s', left: '3z5z1m1s1z1z4z3p7m3p5p4z'
      }, { correct: { suji: '8p' }, wrong: { kata: '6m' } }),
      safeDrill({
        hand: '37789m446p45779s', draw: '7p', dora: '1p',
        self: '1z2z3z2z1p4z4z1s9p2m', right: '1z5z6m9m8p9p1z1m1p7z',
        across: '5z5z9p1p6s3z2m8*s8p8s', left: '5z3z6z7z2m5m3m8s6s6z'
      }, { correct: { suji: '9s' }, wrong: { kata: '4p6p5s' } }),
      safeDrill({
        hand: '2269m115577p244s', draw: '4p', dora: '1m',
        self: '1m5z7z1z9s4m7z', right: '1z2z1s9s1p4z8s',
        across: '4z7z2p2z6s5*m7s', left: '2z5z7z4z1z6s6s'
      }, { correct: { suji: '2m' }, wrong: { kata: '5p4s' } }),
      safeDrill({
        hand: '447m11p23455578s', draw: '3p', dora: '4m',
        self: '3z4z1m9m5p6m9p1s1s', right: '3z1z5z5z6z7z3m2m9s',
        across: '4z5z6z2m1s5m9s4*p2p', left: '4z7z2m9m3z1s5p9s5m'
      }, { correct: { suji: '1p' }, wrong: { kata: '4s' } })
    ])
  ]
};

export const DEFENSE_BASIC_LESSONS = [GENBUTSU, BETAORI, PASSED, HONOR, SUJI];
