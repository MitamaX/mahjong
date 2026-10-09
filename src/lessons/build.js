import { Notation } from '../core/notation.js';
import { SEAT_NAMES } from '../core/seats.js';
import { COPIES } from '../core/tiles.js';
import { counted, figure, group, ukeireFigure } from './figure.js';
import { COMPLETE, COMPLETE_BLOCKS } from './melds.js';
import {
  SHOW_HAND, WALL_AFTER_DRAW, dealt, drillOn, drillPages, grouped, handPart, looseDrill, opening
} from './table.js';
import {
  FIVE_BLOCKS, FIVE_TAATSU, ISOLATED_TILES, KANCHAN, PENCHAN, REACH, RYANMEN, TAATSU_SHAPES, TERM_FIGURES, WHITE_PAIR
} from './terms.js';

const UPPER_PENCHAN = ['taatsu', '89s', '7s', { tag: 'penchan' }];
const TAATSU_COMPLETIONS = ukeireFigure(
  ...[TAATSU_SHAPES.ryanmen, TAATSU_SHAPES.kanchan, TAATSU_SHAPES.penchan].map((shape) => counted(shape, COPIES))
);

const SIX_BLOCKS = ['456m', '678s', RYANMEN, KANCHAN, PENCHAN, WHITE_PAIR];
const SIX_BLOCK_HAND = opening({ hand: SIX_BLOCKS.join('') });

const FIRST_DRILL = { melds: ['123m', '222z'], shapes: { ryanmen: '34s', kanchan: '57p', penchan: '89m', toitsu: '11z' }, draw: '2z' };
const SECOND_DRILL = { melds: ['456p', '777z'], shapes: { ryanmen: '67m', kanchan: '24s', penchan: '89s', toitsu: '33z' }, draw: '7z' };

const shapeDrills = ({ melds, shapes, draw }, keys) => {
  const blocks = [...melds, ...Object.values(shapes)];
  const board = dealt(blocks.join(''), draw);
  return keys.map((key) => {
    const { [key]: correct, ...wrong } = shapes;
    return { board, blocks, answer: { correct: { [key]: correct }, wrong }, parts: [correct], chosen: true };
  });
};

const TAATSU = {
  id: 'taatsu',
  cover: TERM_FIGURES.taatsu,
  pages: [
    {
      id: 'learn',
      board: SIX_BLOCK_HAND,
      beats: [
        { id: 'taatsu', ...grouped(SIX_BLOCKS, RYANMEN, KANCHAN, PENCHAN) },
        { id: 'ryanmen', figure: TERM_FIGURES.taatsu },
        { id: 'kanchan', figure: ukeireFigure(TAATSU_SHAPES.kanchan) },
        { id: 'penchan', figure: ukeireFigure(TAATSU_SHAPES.penchan, UPPER_PENCHAN) },
        { id: 'toitsu', figure: TERM_FIGURES.toitsu }
      ]
    },
    ...drillPages([
      ...shapeDrills(FIRST_DRILL, ['ryanmen', 'kanchan']),
      ...shapeDrills(SECOND_DRILL, ['penchan', 'ryanmen', 'kanchan'])
    ])
  ]
};

const FIVE_LOOSE = '4z';
const FIVE_BLOCK_HAND = `${FIVE_BLOCKS.join('')}${FIVE_LOOSE}`;

const BLOCKS = {
  id: 'blocks',
  cover: figure([group('block', '678s'), group('block', '67p')]),
  pages: [
    {
      id: 'learn',
      board: opening({ hand: FIVE_BLOCK_HAND }),
      beats: [
        { id: 'five', board: COMPLETE, ...grouped(COMPLETE_BLOCKS), ...SHOW_HAND },
        { id: 'block', figure: TERM_FIGURES.block },
        { id: 'count', ...grouped(FIVE_BLOCKS, ...FIVE_BLOCKS) },
        { id: 'theory', ...grouped(FIVE_BLOCKS), ...SHOW_HAND },
        { id: 'grow', ...grouped(FIVE_BLOCKS, ...FIVE_TAATSU) },
        { id: 'loose', ...grouped(FIVE_BLOCKS, FIVE_LOOSE) }
      ]
    },
    ...drillPages([
      looseDrill(dealt(`${FIVE_BLOCK_HAND}1s`, '7p'), FIVE_BLOCKS, `1s${FIVE_LOOSE}`),
      looseDrill(dealt('238m34599p57s666z1z', '9p'), ['23m', '345p', '99p', '57s', '666z'], '8m1z'),
      looseDrill(dealt('1678m239p4479s555z', '4s'), ['678m', '23p', '44s', '79s', '555z'], '1m9p'),
      looseDrill(dealt('239m1678p46s11444z', '1p'), ['678p', '444z', '23m', '46s', '11z'], '9m1p'),
      looseDrill(dealt('3789m56p12379s227z', '8m'), ['789m', '123s', '56p', '79s', '22z'], '3m7z')
    ])
  ]
};

const FOUR_BLOCKS = ['234m', '789p', '45s', WHITE_PAIR];

const REACH_FIGURE = ukeireFigure(...REACH.map(({ tile, reach }) => [tile, tile, reach]));

const ISOLATED = {
  id: 'isolated',
  cover: TERM_FIGURES.isolated,
  pages: [
    {
      id: 'learn',
      board: opening({ hand: [...FOUR_BLOCKS, ...ISOLATED_TILES].join('') }),
      beats: [
        { id: 'isolated', ...grouped(FOUR_BLOCKS, ...ISOLATED_TILES) },
        { id: 'short', ...grouped(FOUR_BLOCKS, ...FOUR_BLOCKS) },
        ...REACH.map(({ id, tile }) => ({ id, figure: REACH_FIGURE, focus: [tile] })),
        { id: 'order', figure: REACH_FIGURE }
      ]
    },
    ...drillPages([
      looseDrill(dealt('2349m567p3789s266z', '6p'), ['234m', '567p', '789s', '66z'], '2z', '9m3s'),
      looseDrill(dealt('1456m448p1237s777z', '4p'), ['456m', '44p', '123s', '777z'], '1m', '8p7s'),
      looseDrill(dealt('2678m599p2347s555z', '3s'), ['678m', '99p', '234s', '555z'], '2m', '5p7s'),
      looseDrill(dealt('3458m3999p678s447z', '7z'), ['345m', '999p', '678s', '44z'], '7z', '8m3p'),
      looseDrill(dealt('2567m11149p33789s', '8s'), ['567m', '111p', '33s', '789s'], '9p', '2m4p')
    ])
  ]
};

const TRIMMED_BLOCKS = SIX_BLOCKS.filter((block) => block !== PENCHAN);
const [PENCHAN_CUT, PENCHAN_LEFT] = Notation.split(PENCHAN);
const TRIMMED = opening(
  { hand: [...TRIMMED_BLOCKS, PENCHAN_LEFT].join(''), river: PENCHAN_CUT },
  { wall: WALL_AFTER_DRAW }
);

const trimDrill = (tiles, draw, blocks, correct, second, wrong) =>
  drillOn(dealt(tiles, draw), blocks, { correct, second, wrong });

const TRIM = {
  id: 'trim',
  cover: figure([group('taatsu', RYANMEN), group('taatsu', PENCHAN, { wrong: true })]),
  pages: [
    {
      id: 'learn',
      board: SIX_BLOCK_HAND,
      beats: [
        { id: 'six', ...grouped(SIX_BLOCKS), ...SHOW_HAND },
        { id: 'count', figure: TAATSU_COMPLETIONS },
        { id: 'weak', figure: TAATSU_COMPLETIONS, focus: ['kanchan', 'penchan'] },
        { id: 'head', ...grouped(SIX_BLOCKS, WHITE_PAIR) },
        { id: 'one', board: TRIMMED, blocks: TRIMMED_BLOCKS, callout: ['river:self', handPart(PENCHAN_LEFT)] }
      ]
    },
    ...drillPages([
      trimDrill('23478m567p3489s22z', '6p', ['234m', '78m', '567p', '34s', '89s', '22z'],
        { penchan: '89s' }, { ryanmen: '78m34s' }, { toitsu: '22z' }),
      trimDrill('3479m12367p456s33z', '9m', ['34m', '79m', '123p', '67p', '456s', '33z'],
        { kanchan: '79m' }, { ryanmen: '34m67p' }, { toitsu: '33z' }),
      trimDrill('13678m23p34578s66z', '4s', ['13m', '678m', '23p', '345s', '78s', '66z'],
        { kanchan: '13m' }, { ryanmen: '23p78s' }, { toitsu: '66z' }),
      trimDrill('56m234p2379s11777z', '6m', ['234p', '777z', '56m', '23s', '79s', '11z'],
        { kanchan: '79s' }, { ryanmen: '56m23s' }, { toitsu: '11z' }),
      trimDrill('4589m12367p678s22z', '3p', ['123p', '678s', '45m', '67p', '89m', '22z'],
        { penchan: '89m' }, { ryanmen: '45m67p' }, { toitsu: '22z' })
    ])
  ]
};

const MENZEN_BLOCKS = ['234m', '67s', '777z', WHITE_PAIR];
const MENZEN_LOOSE = ['2z', '9m', '2p'];
const MENZEN_START = [...MENZEN_BLOCKS, ...MENZEN_LOOSE].join('');

const MENZEN_TURNS = [
  { draw: '7p', loose: '2z', kept: '9m2p7p', blocks: MENZEN_BLOCKS },
  { draw: '1z', loose: '1z', kept: '9m2p7p', blocks: MENZEN_BLOCKS },
  { draw: '3s', loose: '9m', kept: '2p7p3s', blocks: MENZEN_BLOCKS },
  { draw: '8s', loose: '2p', kept: '7p3s', blocks: ['234m', '678s', '777z', WHITE_PAIR] },
  { draw: '8p', loose: '3s', blocks: ['234m', '78p', '678s', '777z', WHITE_PAIR] }
];

const wallAt = (turn) => WALL_AFTER_DRAW - turn * SEAT_NAMES.length;

const turnDrills = (start, turns) => turns.reduce(({ hand, river, specs }, { draw, loose, kept, blocks }, turn) => ({
  hand: Notation.without(`${hand}${draw}`, loose),
  river: `${river}${loose}`,
  specs: [...specs, looseDrill(opening({ hand, draw, river }, { wall: wallAt(turn) }), blocks, loose, kept)]
}), { hand: start, river: '', specs: [] }).specs;

const MENZEN = {
  id: 'menzen',
  cover: figure([group('river', MENZEN_TURNS.map(({ loose }) => loose).join(''))]),
  pages: [
    {
      id: 'learn',
      board: opening({ hand: MENZEN_START }),
      beats: [
        { id: 'menzen', ...SHOW_HAND },
        { id: 'turn', board: opening({ hand: MENZEN_START, draw: MENZEN_TURNS[0].draw }), callout: ['drawn'] },
        { id: 'order', ...grouped(MENZEN_BLOCKS, ...MENZEN_LOOSE) }
      ]
    },
    ...drillPages(turnDrills(MENZEN_START, MENZEN_TURNS))
  ]
};

export const BUILD_LESSONS = [TAATSU, BLOCKS, ISOLATED, TRIM, MENZEN];
