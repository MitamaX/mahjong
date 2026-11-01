import { COPIES, Tiles } from '../core/tiles.js';
import { Notation } from '../core/notation.js';
import { figure, group, multiplied, named, ring } from './figure.js';
import { SAMPLE, SAMPLE_DRAWN, choose, opening, pick } from './table.js';
import { FAMILIES, SAME_RANK, TERM_FIGURES } from './terms.js';

const SUITS = ['man', 'pin', 'sou'];
const HONORS = ['winds', 'dragons'];

const CATALOG = figure(
  [group('man', '123456789m')],
  [group('pin', '123456789p')],
  [group('sou', '123456789s')],
  [group('winds', '1234z'), group('dragons', '567z')]
);

const FULL_SET = multiplied(CATALOG, COPIES);
const COPY_ROW = figure([group('copies', '1111m'), group('copies', '5555p'), group('copies', '7777z')]);

const COUNT = {
  id: 'count',
  cover: figure([group('copies', '5555p')]),
  pages: [
    {
      id: 'learn',
      board: SAMPLE,
      beats: [
        { id: 'count' },
        { id: 'kinds', figure: CATALOG },
        { id: 'copies', figure: COPY_ROW },
        { id: 'total', figure: FULL_SET }
      ]
    },
    {
      id: 'practice',
      board: opening({ hand: '159m5555p37s1257z', draw: '4z' }),
      beats: [pick('pick', { correct: { four: '5p' } })]
    }
  ]
};

const FAMILY_LESSON = {
  id: 'families',
  cover: FAMILIES,
  pages: [
    {
      id: 'learn',
      board: SAMPLE,
      beats: [
        { id: 'families', figure: FAMILIES },
        { id: 'suited', figure: FAMILIES, focus: ['suited'] },
        { id: 'suits', figure: CATALOG, focus: SUITS },
        { id: 'honor', figure: FAMILIES, focus: ['honor'] },
        { id: 'honors', figure: CATALOG, focus: HONORS },
        { id: 'total', figure: CATALOG }
      ]
    },
    {
      id: 'practice',
      board: SAMPLE_DRAWN,
      beats: [
        choose('pick1', { correct: { suited: '123m456p789s' } }),
        choose('pick2', { correct: { honor: '12357z' } })
      ]
    }
  ]
};

const SPOKEN_EXAMPLES = 2;

const readingOf = (tiles) => (Tiles.isHonor(Notation.tile(tiles))
  ? { figure: ring(tiles) }
  : { focus: Notation.split(tiles).slice(0, SPOKEN_EXAMPLES) });

const readingLesson = ({ id, tiles, hand, draw, targets }) => {
  const names = figure(named(tiles));
  return {
    id,
    cover: TERM_FIGURES[id],
    pages: [
      {
        id: 'learn',
        board: SAMPLE,
        beats: [
          { id: 'names', figure: names },
          { id: 'read', figure: names, ...readingOf(tiles) },
          { id: 'copies', figure: multiplied(names, COPIES) }
        ]
      },
      {
        id: 'practice',
        board: opening({ hand, draw }),
        beats: targets.map((tile, order) => choose(`pick${order + 1}`, { correct: { right: tile } }))
      }
    ]
  };
};

const MAN = readingLesson({
  id: 'man', tiles: '123456789m', hand: '13579m258p469s15z', draw: '6m', targets: ['3m', '7m', '6m']
});

const PIN = readingLesson({
  id: 'pin', tiles: '123456789p', hand: '147m13579p258s26z', draw: '8p', targets: ['3p', '8p', '5p']
});

const SOU = readingLesson({
  id: 'sou', tiles: '123456789s', hand: '369m258p13579s47z', draw: '8s', targets: ['1s', '8s', '5s']
});

const WINDS = readingLesson({
  id: 'winds', tiles: '1234z', hand: '258m369p147s1234z', draw: '2z', targets: ['2z', '4z', '3z']
});

const DRAGONS = readingLesson({
  id: 'dragons', tiles: '567z', hand: '258m369p147s1567z', draw: '6z', targets: ['6z', '5z', '7z']
});

const SAME_RANK_SUITS = figure(Notation.split(SAME_RANK).map((tile, order) => group(SUITS[order], tile)));
const SAME_RANK_NAMES = figure(named(SAME_RANK));

const SUITED = {
  id: 'suited',
  cover: TERM_FIGURES.suited,
  pages: [
    {
      id: 'learn',
      board: SAMPLE,
      beats: [
        { id: 'same', figure: SAME_RANK_SUITS },
        { id: 'read', figure: SAME_RANK_NAMES }
      ]
    },
    {
      id: 'practice',
      board: opening({ hand: '1579m357p579s126z', draw: '4z' }),
      beats: [
        choose('pick1', { correct: { right: '5p' } }),
        choose('pick2', { correct: { right: '7s' } }),
        choose('pick3', { correct: { right: '9m' } })
      ]
    }
  ]
};

export const TILE_LESSONS = [COUNT, FAMILY_LESSON, MAN, PIN, SOU, SUITED, WINDS, DRAGONS];
