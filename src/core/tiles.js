export const KINDS = 34;
export const SUIT_KINDS = 27;
export const COPIES = 4;

export const SUIT = { MAN: 0, PIN: 1, SOU: 2, HONOR: 3 };

const HONOR_FACES = ['東', '南', '西', '北', '白', '發', '中'];
const SUIT_FACES = ['萬', '筒', '索'];
const SUIT_NAMES = ['man', 'pin', 'sou', 'honor'];

export const Tiles = {
  suitOf(index) {
    return index < SUIT_KINDS ? Math.floor(index / 9) : 3;
  },
  rankOf(index) {
    return index < SUIT_KINDS ? (index % 9) + 1 : index - SUIT_KINDS + 1;
  },
  isHonor(index) {
    return index >= SUIT_KINDS;
  },
  indexOf(suit, rank) {
    return suit * 9 + rank - 1;
  },
  suitName(index) {
    return SUIT_NAMES[this.suitOf(index)];
  },
  face(index) {
    return this.isHonor(index)
      ? { glyph: HONOR_FACES[index - SUIT_KINDS], suit: '' }
      : { glyph: String(this.rankOf(index)), suit: SUIT_FACES[this.suitOf(index)] };
  },
  next(index) {
    if (index < SUIT_KINDS) {
      const offset = index % 9;
      return index - offset + ((offset + 1) % 9);
    }
    if (index < 31) return 27 + ((index - 27 + 1) % 4);
    return 31 + ((index - 31 + 1) % 3);
  },
  emptyCounts() {
    return new Array(KINDS).fill(0);
  },
  countsOf(tiles) {
    const counts = this.emptyCounts();
    tiles.forEach((tile) => { counts[tile] += 1; });
    return counts;
  },
  expand(counts) {
    const tiles = [];
    counts.forEach((amount, index) => {
      for (let copy = 0; copy < amount; copy += 1) tiles.push(index);
    });
    return tiles;
  },
  fullSet() {
    const tiles = [];
    for (let index = 0; index < KINDS; index += 1) {
      for (let copy = 0; copy < COPIES; copy += 1) tiles.push(index);
    }
    return tiles;
  }
};
