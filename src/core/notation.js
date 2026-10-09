import { SUIT, Tiles } from './tiles.js';

const SUIT_CODES = { m: SUIT.MAN, p: SUIT.PIN, s: SUIT.SOU, z: SUIT.HONOR };
const CODE_OF_SUIT = Object.fromEntries(Object.entries(SUIT_CODES).map(([code, suit]) => [suit, code]));
const GROUP_PATTERN = /([\d*]+)([mpsz])/g;
const TURNED_MARK = '*';

function groupEntries([, ranks, code]) {
  const entries = [];
  for (const char of ranks) {
    if (char !== TURNED_MARK) entries.push({ tile: Tiles.indexOf(SUIT_CODES[code], Number(char)), turned: false });
    else if (entries.length) entries[entries.length - 1].turned = true;
    else throw new SyntaxError(`${ranks}${code} starts with ${TURNED_MARK}`);
  }
  return entries;
}

export const Notation = {
  entries(source = '') {
    return [...source.matchAll(GROUP_PATTERN)].flatMap(groupEntries);
  },
  tiles(source) {
    return this.entries(source).map((entry) => entry.tile);
  },
  tile(source) {
    return this.tiles(source)[0] ?? null;
  },
  of(tile) {
    return `${Tiles.rankOf(tile)}${CODE_OF_SUIT[Tiles.suitOf(tile)]}`;
  },
  split(source) {
    return this.tiles(source).map((tile) => this.of(tile));
  },
  groups(source) {
    return [...source.matchAll(GROUP_PATTERN)].map(([group]) => group);
  },
  without(source, tile) {
    const tiles = this.split(source);
    const at = tiles.indexOf(tile);
    if (at < 0) throw new RangeError(`${tile} is not in ${source}`);
    tiles.splice(at, 1);
    return tiles.join('');
  }
};
