import { Tiles } from './tiles.js';

export function mulberry32(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6D2B79F5) >>> 0;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffledWall(random) {
  const tiles = Tiles.fullSet();
  for (let index = tiles.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1));
    [tiles[index], tiles[swap]] = [tiles[swap], tiles[index]];
  }
  return tiles;
}
