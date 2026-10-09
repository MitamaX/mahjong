import {
  ARROW, doraOf, figure, group, handUkeireFigure, handWaitFigure, riichiGenbutsuFigure, splitRow, ukeireFigure, waitFigure
} from './figure.js';
import { MARK } from '../ui/tileView.js';

export const WHITE_PAIR = '55z';

export const SAME_RANK = '5m5p5s';
const SUITED = group('suited', SAME_RANK);
const HONOR = group('honor', '1z6z7z');
export const FAMILIES = figure([SUITED, HONOR]);

const seatFigure = (tiles) => figure([group('seats', tiles, { mark: MARK.CITE })]);
const DISCARDS = group('discard', '2z1s9m1p');
const DORA_SAMPLE = ['3p', '4p'];

export const COMPLETE_MELDS = ['123m', '456p', '789s', '111z'];
export const READY_MELDS = ['123m', '456p', '789s'];
export const READY_PAIRS = ['11z', WHITE_PAIR];

export const RYANMEN = '34p';
export const KANCHAN = '79p';
export const PENCHAN = '12s';

export const TAATSU_SHAPES = {
  ryanmen: ['taatsu', RYANMEN, '25p', { tag: 'ryanmen' }],
  kanchan: ['taatsu', KANCHAN, '8p', { tag: 'kanchan' }],
  penchan: ['taatsu', PENCHAN, '3s', { tag: 'penchan' }],
  toitsu: ['toitsu', WHITE_PAIR, '5z']
};

const TAATSU_ARRIVALS = ukeireFigure(TAATSU_SHAPES.ryanmen);

export const FIVE_TAATSU = ['79m', '67p'];
export const FIVE_BLOCKS = ['234m', '678s', ...FIVE_TAATSU, WHITE_PAIR];

export const REACH = [
  { id: 'honor', tile: '3z', reach: '3z' },
  { id: 'terminal', tile: '1s', reach: '123s' },
  { id: 'edge', tile: '8m', reach: '6789m' },
  { id: 'middle', tile: '4p', reach: '23456p' }
];
export const ISOLATED_TILES = REACH.map(({ tile }) => tile);

const ONE_SHANTEN = '123m456p3478s557z';
const ONE_SHANTEN_UKEIRE = '2569s';

export const WAIT_MELDS = ['123m', '789m', '456p'];
export const RYANMEN_SHAPE = '34s';
export const RYANMEN_WAITS = '25s';
export const RYANMEN_BLOCKS = [...WAIT_MELDS, WHITE_PAIR, RYANMEN_SHAPE];
export const RYANMEN_TILES = `${WAIT_MELDS.join('')}${RYANMEN_SHAPE}${WHITE_PAIR}`;

export const WAIT_SHAPES = {
  ryanmen: ['ryanmen', RYANMEN_SHAPE, RYANMEN_WAITS],
  kanchan: ['kanchan', '35s', '4s'],
  penchan: ['penchan', '12s', '3s'],
  tanki: ['tanki', '1z', '1z'],
  shanpon: ['shanpon', '1155z', '15z']
};

const DECLARED_RIVER = [DISCARDS, group('declare', '4*m')];
const DECLARED = figure(DECLARED_RIVER);
export const DEAL_IN_TILE = '1s';

export const SUJI_SOURCE = '4m';
export const SHARED_GENBUTSU = '8s';
export const KABE_WALL = group('kabe', '3333s', { mark: MARK.CITE });
export const SEEN_HONOR = group('seen', '444z', { mark: MARK.CITE });

export const TERM_FIGURES = {
  suited: figure([SUITED]),
  honor: figure([HONOR]),
  man: figure([group('man', '159m')]),
  pin: figure([group('pin', '159p')]),
  sou: figure([group('sou', '159s')]),
  winds: figure([group('winds', '1234z')]),
  dragons: figure([group('dragons', '567z')]),

  oya: seatFigure('1z'),
  ko: seatFigure('234z'),
  turn: seatFigure('1234z'),
  hand: figure([group('hand', '123m456p')]),
  wall: figure([group('wall', '2m7p4s6z9p')]),
  discard: figure([DISCARDS]),
  dora: doraOf(...DORA_SAMPLE),
  indicator: doraOf(...DORA_SAMPLE, 'indicator'),

  agari: figure(splitRow(COMPLETE_MELDS, [WHITE_PAIR])),
  meld: figure([group('run', '123m'), group('triplet', '111z')]),
  run: figure([group('run', '345p')]),
  triplet: figure([group('triplet', '777z')]),
  pair: figure([group('pair', '22p')]),
  tenpai: handWaitFigure(splitRow(READY_MELDS, READY_PAIRS, 'toitsu'), '15z'),

  taatsu: TAATSU_ARRIVALS,
  ukeire: TAATSU_ARRIVALS,
  toitsu: ukeireFigure(TAATSU_SHAPES.toitsu),
  shanten: handUkeireFigure([group('shanten', ONE_SHANTEN)], ONE_SHANTEN_UKEIRE),
  block: figure([group('meld', '678s'), group('taatsu', '67p'), group('toitsu', WHITE_PAIR)]),
  fiveBlocks: figure(FIVE_BLOCKS.map((block) => group('block', block))),
  isolated: figure([group('isolated', ISOLATED_TILES.join(''))]),

  wait: handWaitFigure([group('tenpai', RYANMEN_TILES)], RYANMEN_WAITS),
  ryanmen: waitFigure(WAIT_SHAPES.ryanmen),
  kanchan: waitFigure(WAIT_SHAPES.kanchan),
  penchan: waitFigure(WAIT_SHAPES.penchan),
  tanki: waitFigure(WAIT_SHAPES.tanki),
  shanpon: waitFigure(WAIT_SHAPES.shanpon),

  riichi: DECLARED,
  declare: DECLARED,
  tsumogiri: figure([group('drawn', '2z'), ARROW, group('river', '2z')]),
  tsumo: figure([group('ryanmen', '34s'), group('tsumo', '5s', { mark: MARK.BEST })]),
  ron: figure([group('river', '8s3p'), group('ron', '4s', { mark: MARK.BEST })]),
  dealIn: figure([group('river', DEAL_IN_TILE, { mark: MARK.PICK })]),
  furiten: figure([group('wait', '14s', { wrong: true })]),

  betaori: riichiGenbutsuFigure(['3*m'], '3m'),
  genbutsu: figure([...DECLARED_RIVER, ARROW, group('genbutsu', '1s', { mark: MARK.BEST })]),
  suji: figure([
    group('suji', '1m', { mark: MARK.BEST }), group('genbutsu', SUJI_SOURCE), group('suji', '7m', { mark: MARK.BEST })
  ]),
  nakaSuji: figure([group('genbutsu', '2m'), group('nakaSuji', '5m', { mark: MARK.BEST }), group('genbutsu', '8m')]),
  kataSuji: figure([group('genbutsu', '2m'), group('kataSuji', '5m', { mark: MARK.BEST })]),
  kabe: figure([KABE_WALL]),
  noSuji: figure([group('noSuji', '1m'), group('noSuji', '5m')]),
  seen: figure([SEEN_HONOR]),
  chase: riichiGenbutsuFigure(['3*s', '5*p'], SHARED_GENBUTSU)
};
