const DEAD_WALL = 14;

export class Wall {
  constructor(tiles) {
    this.tiles = tiles;
    this.cursor = 0;
    this.doraIndicator = tiles[tiles.length - 1];
  }

  get remaining() {
    return this.tiles.length - DEAD_WALL - this.cursor;
  }

  deal(amount) {
    const dealt = this.tiles.slice(this.cursor, this.cursor + amount);
    this.cursor += amount;
    return dealt;
  }

  draw() {
    const tile = this.tiles[this.cursor];
    this.cursor += 1;
    return tile;
  }
}
