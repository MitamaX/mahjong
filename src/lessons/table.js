import { Notation } from '../core/notation.js';
import { PLAYER, SEAT_NAMES } from '../core/seats.js';

const OPENING_WALL = 70;
const DRAWN = 1;
const DISCARDED = { callout: ['river:self'] };

export const SHOW_HAND = { callout: ['hand'] };
export const handPart = (tiles) => `hand:${tiles}`;
export const showParts = (...parts) => ({ callout: parts.map(handPart) });
export const grouped = (blocks, ...parts) => ({ blocks, ...showParts(...parts) });
const OTHER_SEATS = SEAT_NAMES.filter((seat, index) => index !== PLAYER);
const targetsOf = (region, seats) => seats.map((seat) => `${region}:${seat}`);
export const OPPONENTS = targetsOf('hidden', OTHER_SEATS);
export const ALL_RIVERS = targetsOf('river', SEAT_NAMES);
export const OPPONENT_RIVERS = targetsOf('river', OTHER_SEATS);

export const DORA = '9m';
export const EMPTY_WALL = 0;
export const SAMPLE_HAND = '123m456p789s1357z';

const wallOf = (start, draw) => (draw ? start - DRAWN : start);

export const WALL_AFTER_DRAW = wallOf(OPENING_WALL, true);

export const opening = (self, { wall = wallOf(OPENING_WALL, self.draw), dora = DORA } = {}) => ({ self, dora, wall });

const wallAfterRounds = (river, draw) =>
  wallOf(OPENING_WALL - Notation.entries(river).length * SEAT_NAMES.length, draw);

export const midgame = ({ self, ...others }, { draw, dora = DORA } = {}) => ({
  ...others,
  self: { ...self, draw },
  dora,
  wall: wallAfterRounds(self.river, draw)
});

export const SAMPLE = opening({ hand: SAMPLE_HAND });

export const SAMPLE_DRAWN = opening({ hand: SAMPLE_HAND, draw: '2z' });

export const dealt = (tiles, draw, table) => opening({ hand: Notation.without(tiles, draw), draw }, table);

export const pick = (id, answer, solved = DISCARDED) => ({ id, answer, solved });

export const choose = (id, answer, solved) => ({ id, answer, solved, chosen: true });

export const citedPick = (id, answer, solved) => ({ id, answer, solved, cited: true });

const pageOf = (id, board, beat) => ({ id, board, beats: [beat] });

export const choosePage = (id, board, answer) => pageOf(id, board, choose(id, answer));

const GUIDED_DRILLS = 2;

const drillId = (order) => `pick${order + 1}`;

const drill = (id, { answer, blocks, parts = [], chosen = false }, guided) => ({
  ...(chosen ? choose : pick)(id, answer, grouped(blocks, ...parts)),
  ...(guided && { blocks })
});

const drills = (specs) => specs.map((spec, order) => drill(drillId(order), spec, order < GUIDED_DRILLS));

export const drillPages = (specs) => drills(specs).map((beat, order) => pageOf(beat.id, specs[order].board, beat));

const pagesWith = (beatOf) => (specs) => specs.map(({ board, answer, solved }, order) =>
  pageOf(drillId(order), board, beatOf(drillId(order), answer, solved)));

export const pickPages = pagesWith(citedPick);

export const plainPages = pagesWith(pick);

export const drillOn = (board, blocks, answer, ...parts) => ({ board, blocks, answer, parts });

export const looseDrill = (board, blocks, loose, kept = '') => drillOn(board, blocks, { correct: { loose }, second: { kept } });

export const tenpaiDrill = (board, blocks, tenpai, ...parts) => drillOn(board, blocks, { correct: { tenpai } }, ...parts);

export const singlePage = (id, cover, board, beats) => ({ id, cover, pages: [{ id, board, beats }] });
