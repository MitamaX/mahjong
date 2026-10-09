import { riverTarget } from '../core/evidence.js';
import { Notation } from '../core/notation.js';
import { SEAT_NAMES } from '../core/seats.js';
import { Tiles } from '../core/tiles.js';
import { figure, group, waitFigure } from './figure.js';
import { pickPages } from './table.js';
import { riichiTable, safeDrill } from './riichiTable.js';
import { SHARED_GENBUTSU, TERM_FIGURES } from './terms.js';
import { MARK } from '../ui/tileView.js';

const CHASE_TABLE = {
  hand: '3459m2468p23678s', draw: '1p',
  self: '2z9p1p6s4z5s', right: '9p1s4z2m8p7p', across: '1z2p8s8m3*s7z', left: '9m3z8s2s1m5*p'
};

const CHASE = {
  id: 'chase',
  cover: TERM_FIGURES.chase,
  pages: [
    {
      id: 'learn',
      board: riichiTable(CHASE_TABLE),
      beats: [
        { id: 'two', callout: ['riichi:across', 'riichi:left'] },
        { id: 'one', callout: ['river:across:2p', 'hand:2p'] },
        { id: 'both', callout: [`river:across:${SHARED_GENBUTSU}`, `river:left:${SHARED_GENBUTSU}`, `hand:${SHARED_GENBUTSU}`] },
        { id: 'declare', callout: ['riichi:left'] },
        { id: 'after' }
      ]
    },
    ...pickPages([
      safeDrill({
        hand: '34789m68999p122s', draw: '6m', dora: '6s',
        self: '3z5z4z6z2p5p8s8m9m2p', right: '5z1m7s9m5p4s1p7p1z2p',
        across: '1s3z7m9s1s8p3s7z1m7*z', left: '2z2z7p5z4z8m2z6p8p9*s'
      }, { correct: { both: '8p' }, wrong: { across: '7m1s', left: '8m6p' } }),
      safeDrill({
        hand: '23456m234p12578s', draw: '7m', dora: '5m',
        self: '1z2z6z8m6p9p9m6z', right: '6z1s8s4m2m2m5m1m',
        across: '1m1p7z7z6s7m2*s8m', left: '1z2z6z3m8m5p9s2*p'
      }, { correct: { both: '2p' }, wrong: { across: '2s7m', left: '3m' } }),
      safeDrill({
        hand: '11234m689p12357s', draw: '5s', dora: '5z',
        self: '1z2s2m1z6m3z5z8m6z', right: '1z3z4z4m2m2p4p6z1s',
        across: '7z7z7s2m1p2z4s4*p5z', left: '7z2s3z6z1p1p1z9*s7z'
      }, { correct: { both: '1s' }, wrong: { across: '2m7s', left: '2s' } }),
      safeDrill({
        hand: '899m234p2345799s', draw: '3z', dora: '7p',
        self: '6z7z3m6m4p2m8m2m4z2s', right: '1z6z2z2m5z7m7z8m1m1m',
        across: '6z2z3z4z5z1m2s7*s7m6m', left: '1z2z9p4z7m6m5s8*p6z4z'
      }, { correct: { both: '2s' }, wrong: { across: '7s3z', left: '5s' } }),
      safeDrill({
        hand: '788m23567p2458s2z', draw: '1m', dora: '8s',
        self: '6z7z9p9m6p2m4m6z3s1s', right: '5z7z3m9m5z3m2m1m9s1s',
        across: '1z3s6z3z3s9s1m2*m6m5z', left: '1z5z6z3z4z2p9p4z1*s4s'
      }, { correct: { both: '4s' }, wrong: { across: '1m', left: '2p' } })
    ])
  ]
};

const PAIR_RIVERS = {
  self: '1p8s3s4z1m9s',
  right: '1s4z2m3s8p6s',
  across: '9s4m1z2*p6z4p',
  left: '4p3s5z7z6m3*m',
  dora: '3s'
};

const SHARED_GUARDS = {
  id: 'shared',
  cover: figure([group('suji', '1p', { mark: MARK.BEST }), group('genbutsu', '9s')]),
  pages: [
    {
      id: 'learn',
      board: riichiTable({ ...PAIR_RIVERS, hand: '578m13679p2589s4z' }),
      beats: [
        { id: 'shared', callout: ['hand:2s', 'hand:4z'] },
        { id: 'apart', callout: ['river:across:4m', 'hand:7m'] },
        { id: 'double', callout: ['river:across:4p', 'river:left:4p', 'hand:1p'] },
        { id: 'better', callout: ['hand:1p', 'hand:9s'] }
      ]
    },
    ...pickPages([
      safeDrill({
        hand: '46679m35888p334s', draw: '4p', dora: '5m',
        self: '1z4z7z3m8p7z3p9s9s4m', right: '3z5z6z5z5m1p5p3p1m2m',
        across: '4m9p3z2s5m9p1z2p9s6*p', left: '1z3z1z5z8m7z1p7z2s6*p'
      }, { correct: { double: '3p' }, second: { one: '4m' }, wrong: { half: '7m' } }),
      safeDrill({
        hand: '11388m22446689s', draw: '7m', dora: '4m',
        self: '2z4z9p5m5p1p5p1s3z3z2m3m', right: '4m7z9p1m2m6m2p3p6z1p6p4z',
        across: '1z3z5z6z1s9p7s2m6p5*m3m6z', left: '1z4z7z1p4z1s5s8s2m1z5z9*p'
      }, { correct: { kabe: '1m' }, second: { one: '3m8s' }, wrong: { half: '8m2s4s' } }),
      safeDrill({
        hand: '4m11357p557889s2z', draw: '7p', dora: '3z',
        self: '3z6z2s6z7z8m9m3m', right: '1z1s5p2z1m1m2m9m',
        across: '3m5z5z6m4p4z5*m9p', left: '4z5z6z1m9p9s1z1*z'
      }, { correct: { honor: '2z' }, second: { one: '9s' }, wrong: { half: '1p7p' } }),
      safeDrill({
        hand: '22345m44p122258s', draw: '5s', dora: '6m',
        self: '1z1s7z7z4p4s7m7m5p9p4z', right: '9s3m2m2m4m1p2z2z2z1m8m',
        across: '1z3z2z1z6z9m9s6z6m5p9*p', left: '3z4z7z6z7p6m7m6s8p4s3*p'
      }, { correct: { double: '3m' }, second: { half: '1s' } }),
      safeDrill({
        hand: '18m12445567789p', draw: '9m', dora: '4p',
        self: '2z3p7m9p3z9m2m3z2m', right: '1z4z6z7z2z1m1z6m9s',
        across: '1z2z5z2m6z6m8*s9s5m', left: '4z5z2m6z5m2s3z8s4*s'
      }, { correct: { kabe: '1m' }, second: { double: '8m' }, wrong: { half: '9m' } })
    ])
  ]
};

const KEEP_TABLE = { hand: '23467m2367p5699s', across: '1z2p9s8m7z4*s', self: '2z1p8s4z1m5m', right: '9p1s9s2m8p6z' };

const KEEP = {
  id: 'keep',
  cover: figure([group('genbutsu', '9s', { mark: MARK.BEST }), group('genbutsu', '2p')]),
  pages: [
    {
      id: 'learn',
      board: riichiTable(KEEP_TABLE),
      beats: [
        { id: 'two', callout: ['hand:9s', 'hand:2p'] },
        { id: 'keep', callout: ['river:right:9s', 'hand:9s'] },
        { id: 'first', callout: ['hand:2p'] }
      ]
    },
    ...pickPages([
      safeDrill({
        hand: '22355789m89p248s', draw: '3p', dora: '7s',
        self: '3z7z5z4z6z3p1s1z1p6s', right: '4z2z5z1s7z7z2p4m5p7m',
        across: '3z1z7m6z5p6s6m1s8*p5p', left: '7z9m1z3m1p8s9p2p6m5z'
      }, { correct: { first: '8p' }, second: { keep: '7m' } }),
      safeDrill({
        hand: '789m11478p12356s', draw: '2s', dora: '9s',
        self: '1m6z3m8m9p7p6p5s6s6p', right: '1m2m8m6p5m1p4m1z9m3p',
        across: '4z5m6p5z1s4m5p8m9*s9s', left: '2z6z3z5p1p8p1m4z2m1m'
      }, { correct: { first: '1s' }, second: { keep: '8m' } }),
      safeDrill({
        hand: '234m24456p23388s', draw: '2m', dora: '4z',
        self: '5z1z9m8p6s9s6m2m6s3z5s9p', right: '6z7z9m4p1z1m5s3s8m7s3z4s',
        across: '5z2z9p7z2z7m3s7p1s8s9*s1p', left: '6z7z3z8m9s1s5m9m3m9p7m6z'
      }, { correct: { first: '8s' }, second: { keep: '3s' } }),
      safeDrill({
        hand: '22555m1267p1239s', draw: '7p', dora: '2s',
        self: '1z3z6s1m1s7m4z1m5p2z', right: '2z7z8m1z1s4z4z4m5p3m',
        across: '2z3m6z1z2m7z5p6*p7s9m', left: '1z4z6z2z3p2p1s2m3m9m'
      }, { correct: { first: '6p' }, second: { keep: '2m' } }),
      safeDrill({
        hand: '1399m244699p678s', draw: '6m', dora: '7z',
        self: '7z2z3z1z6m6z3z1s', right: '3z4z9p1p2p4z9m2s',
        across: '2z4z5p6s1z1m7m1*s', left: '7z6z1m2s8m2m5z5p'
      }, { correct: { first: '6s' }, second: { keep: '1m' } })
    ])
  ]
};

const quietRivers = (self, right, left) => ({ self: `2z4z3z${self}1z5z`, right: `4z6z3z2z${right}`, left: `1z3z5z${left}6z4z` });

const RANK_TIERS = { terminal: [1, 9], edge: [2, 8], side: [3, 7], middle: [4, 5, 6] };
const TIERS = Object.keys(RANK_TIERS);

const tierOf = (tile) => TIERS.find((tier) => RANK_TIERS[tier].includes(Tiles.rankOf(tile)));

function rankAnswer(source) {
  const tiles = Notation.tiles(source);
  const [best, ...rest] = TIERS
    .map((tier) => [tier, tiles.filter((tile) => tierOf(tile) === tier).map((tile) => Notation.of(tile)).join('')])
    .filter(([, members]) => members);
  return { correct: Object.fromEntries([best]), wrong: Object.fromEntries(rest) };
}

const NO_SUJI_TABLE = { ...quietRivers('6s', '5p7z', '7s'), across: '1z9m7z2z5z3*z', hand: '1234m789p23458s6p' };

const rankDrill = (table) => safeDrill(table, rankAnswer(`${table.hand}${table.draw}`));

const NO_SUJI = {
  id: 'nosuji',
  cover: figure([group('noSuji', '1m', { mark: MARK.BEST }), group('noSuji', '5m')]),
  pages: [
    {
      id: 'learn',
      board: riichiTable(NO_SUJI_TABLE),
      beats: [
        { id: 'none', callout: ['hand'] },
        { id: 'edge', callout: ['hand:1m', 'hand:9p'] },
        {
          id: 'why',
          figure: waitFigure(['ryanmen', '23m', '1m'], ['ryanmen', '34m', '5m'], ['ryanmen', '67m', '5m'], ['kanchan', '46m', '5m'])
        }
      ]
    },
    ...pickPages([
      rankDrill({
        hand: '1114m24588p2668s', draw: '8s', dora: '8m',
        self: '1z5z9s1s3p7m4p3m3s6p3m', right: '2z5z7z3z7m4z4p5p9s2m3m',
        across: '1z5z4z3z6z6m2m6p1*s3p2m', left: '4z1m5z1p2p1s2p8m8m6p7z'
      }),
      rankDrill({
        hand: '346679p2345557s', draw: '4p', dora: '1m',
        self: '5m5z3z5z1z1s9m7p8p8m4z', right: '2z4z3s4z1m9m2m5z9m8m5p',
        across: '4z6z7z8p9m2p9s5*m3m2z3m', left: '7m5z6z7z1z2z3m8p2p8m9s'
      }),
      rankDrill({
        hand: '22m5577p2336799s', draw: '4m', dora: '1z',
        self: '2z6z7z5z8m1p6m8p3p3m9s', right: '3z5z7z1m4m1s2p1s1m8s8s',
        across: '1z2z4z6z1p4z6z3m9p6p9*p', left: '1z3z3z7z7s6p9p7z4z6z3z'
      }),
      rankDrill({
        hand: '23357m12233566s', draw: '2m', dora: '9p',
        self: '4z9m5p3p9p9s6z', right: '2z6m5z3z4z8s8s',
        across: '2z4z3z9m6z1p6*p', left: '1z3z6z7s8s8s1p'
      }),
      rankDrill({
        hand: '44m477p22334467s', draw: '4p', dora: '2z',
        self: '1z2p3m4m6m8m5p', right: '1z6z8s2s6m2p2m',
        across: '5z7z5m2m3p5*p9m', left: '5z6z8s1m8s3p8m'
      })
    ])
  ]
};

const NEAR_OFFSETS = [-1, 1];

const neighborsOf = (code) => {
  const tile = Notation.tile(code);
  return NEAR_OFFSETS
    .map((offset) => tile + offset)
    .filter((near) => Tiles.suitOf(near) === Tiles.suitOf(tile))
    .map((near) => Notation.of(near));
};

const nearTargets = (table, code) => {
  const near = neighborsOf(code);
  return SEAT_NAMES.flatMap((name, seat) => Notation.split(table[name])
    .map((each, index) => ({ each, seat, index }))
    .filter(({ each }) => near.includes(each))
    .map(riverTarget));
};

const countedDrill = (table, seen) => ({
  ...safeDrill(table, { correct: { seen } }),
  solved: { callout: nearTargets(table, seen) }
});

const COUNTED_TILE = '4s';
const COUNTED_TABLE = { ...quietRivers('3s', '5s3s', '5s'), across: '1z5z7z2z6z3*z', hand: '45566m4566p4566s' };

const COUNTED = {
  id: 'counted',
  cover: figure([group('seen', '3355s', { mark: MARK.CITE }), group('noSuji', COUNTED_TILE, { mark: MARK.BEST })]),
  pages: [
    {
      id: 'learn',
      board: riichiTable(COUNTED_TABLE),
      beats: [
        { id: 'far' },
        { id: 'self', callout: ['river:right:5s', 'river:left:5s', 'hand:5s'] },
        { id: 'near', callout: [...nearTargets(COUNTED_TABLE, COUNTED_TILE), `hand:${COUNTED_TILE}`] }
      ]
    },
    ...pickPages([
      countedDrill({
        hand: '3455677m33p3366s', draw: '4m', dora: '5s',
        self: '4z5z5z8m1z1m5p5z4p', right: '4z3z6z2z8m2p8s9p5p',
        across: '5z9p1p2p1z2p4*p4z7s', left: '3z6z6z6m1m4p1p1p9p'
      }, '3p'),
      countedDrill({
        hand: '333455677m66p33s', draw: '4m', dora: '7z',
        self: '2z6z9p3z8p1m1z5z5z', right: '4z5z6s7p7s7z2z2s4s',
        across: '2z4z8p7p4s2s7*s7s4s', left: '4s6m8m3p2z4z7p8p5z'
      }, '3s'),
      countedDrill({
        hand: '77m56677p445556s', draw: '6s', dora: '1m',
        self: '1m1z6m9s4s1p4z', right: '2s1p9s2p5z8s6m',
        across: '4z5m1z1z8m6m9*m', left: '1z2z6z8p9p8s5m'
      }, '7m'),
      countedDrill({
        hand: '4445m4477p33577s', draw: '5s', dora: '5m',
        self: '1z2z4z6z6s1m9s2p6z', right: '1z4z3z3z8p9m2p7z9p',
        across: '1z2z6z8p6m6z5*p6p5p', left: '7z6m1p2m3m5s8p5p6p'
      }, '7p'),
      countedDrill({
        hand: '3344m3567p44577s', draw: '5s', dora: '1p',
        self: '1z4z2p6z5s7z9m6s6s', right: '3z1p5z8s7z6m8m6z6z',
        across: '4z1p6s4z8m9*m9m5z5m', left: '1z2z7z2z8m6s8m9s9m'
      }, '7s')
    ])
  ]
};

export const DEFENSE_ADVANCED_LESSONS = [CHASE, SHARED_GUARDS, KEEP, NO_SUJI, COUNTED];
