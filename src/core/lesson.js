import { Evidence } from './evidence.js';
import { Notation } from './notation.js';
import { Position } from './position.js';
import { PLAYER, SEAT_NAMES } from './seats.js';

export const UNLISTED = 'other';
const SCENE_KEYS = ['figure', 'focus', 'callout', 'cycle', 'blocks', 'marks'];
const TARGET_SEPARATOR = ':';

const keyedTiles = (groups = {}) => new Map(Object.entries(groups)
  .flatMap(([key, source]) => Notation.tiles(source).map((tile) => [tile, key])));

const isSeat = (part) => SEAT_NAMES.includes(part);

function parseTarget(source) {
  const [region, ...parts] = source.split(TARGET_SEPARATOR);
  const seat = parts.find(isSeat);
  const tiles = parts.find((part) => !isSeat(part));
  return {
    region,
    seat: seat === undefined ? PLAYER : SEAT_NAMES.indexOf(seat),
    tiles: tiles === undefined ? null : Notation.tiles(tiles)
  };
}

const targetOf = (source) => (typeof source === 'string' ? parseTarget(source) : source);

export const VERDICT = { CORRECT: 'correct', SECOND: 'second', WRONG: 'wrong' };

const VERDICT_ORDER = [VERDICT.CORRECT, VERDICT.SECOND, VERDICT.WRONG];

class Answer {
  constructor(answer) {
    this.keys = new Map(VERDICT_ORDER.map((verdict) => [verdict, keyedTiles(answer[verdict])]));
  }

  get noteKeys() {
    return new Set([UNLISTED, ...[...this.keys.values()].flatMap((keys) => [...keys.values()])]);
  }

  judge(tile) {
    const verdict = VERDICT_ORDER.find((each) => this.keys.get(each).has(tile)) ?? VERDICT.WRONG;
    return { verdict, key: this.keys.get(verdict).get(tile) ?? UNLISTED };
  }
}

function checkScene(spec) {
  const unknown = Object.keys(spec).filter((key) => !SCENE_KEYS.includes(key));
  if (unknown.length) throw new TypeError(`unknown scene keys: ${unknown.join(', ')}`);
}

class Scene {
  constructor(spec, figures) {
    checkScene(spec);
    const { figure = null, focus = [], callout = [], cycle = [], blocks = null, marks } = spec;
    this.figure = figure ? figures.indexOf(figure) : null;
    this.focus = focus;
    this.callout = callout.map(targetOf);
    this.cycle = cycle.map(targetOf);
    this.blocks = blocks && blocks.map((block) => Notation.tiles(block));
    this.marks = keyedTiles(marks);
  }
}

class Beat {
  constructor({ id, page, board, answer, solved, chosen = false, cited = false, ...scene }, figures) {
    this.id = id;
    this.page = page;
    this.chosen = chosen;
    this.cited = cited;
    this.position = Position.parse(board);
    this.scene = new Scene(scene, figures);
    this.solvedScene = new Scene({ ...scene, ...solved }, figures);
    this.answer = answer ? new Answer(answer) : null;
  }

  get asks() {
    return this.answer !== null;
  }

  solvedSceneOf(tile) {
    if (!this.cited) return this.solvedScene;
    const cites = new Evidence(this.position).citesOf(tile);
    return { ...this.solvedScene, callout: [...this.solvedScene.callout, ...cites] };
  }
}

const parseGroup = (part) => (typeof part === 'string'
  ? part
  : { ...part, tiles: Notation.entries(part.tiles), marks: keyedTiles(part.marks) });

export const parseFigure = ({ rows, times = null, ring = false }) => ({ rows: rows.map((row) => row.map(parseGroup)), times, ring });

export class Lesson {
  constructor({ id, cover, pages }) {
    this.id = id;
    this.cover = parseFigure(cover);
    this.pages = pages.map((page) => page.id);
    const specs = pages.flatMap((page, index) =>
      page.beats.map((beat) => ({ board: page.board, ...beat, page: index })));
    const figures = [...new Set(specs.map((spec) => spec.figure).filter(Boolean))];
    this.figures = figures.map(parseFigure);
    this.beats = specs.map((spec) => new Beat(spec, figures));
  }
}
