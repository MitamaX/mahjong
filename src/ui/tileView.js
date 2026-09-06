import { Tiles } from '../core/tiles.js';
import { Settings } from '../core/settings.js';

const VIEW = { width: 60, height: 84 };
const FIELD = { x: 8, y: 10, width: 44, height: 64 };
const MAN_NUMERALS = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];
const HONOR_GLYPHS = ['東', '南', '西', '北', '', '發', '中'];
const WHITE_DRAGON = 5;
const GREEN_DRAGON = 6;
const RED_DRAGON = 7;
const SIMPLE = { size: 54, baseline: 61 };

const PIP_ROWS = {
  pin: {
    1: [[1, 0]],
    2: [[1, 0], [1, 0]],
    3: [[1, -13], [1, 0], [1, 13]],
    4: [[2, 0], [2, 0]],
    5: [[2, 0], [1, 0], [2, 0]],
    6: [[2, 0], [2, 0], [2, 0]],
    7: [[3, 0], [2, 0], [2, 0]],
    8: [[2, 0], [2, 0], [2, 0], [2, 0]],
    9: [[3, 0], [3, 0], [3, 0]]
  },
  sou: {
    1: [[1, 0]],
    2: [[1, 0], [1, 0]],
    3: [[1, 0], [2, 0]],
    4: [[2, 0], [2, 0]],
    5: [[2, 0], [1, 0], [2, 0]],
    6: [[3, 0], [3, 0]],
    7: [[1, 0], [3, 0], [3, 0]],
    8: [[4, 0], [4, 0]],
    9: [[3, 0], [3, 0], [3, 0]]
  }
};

const round = (value) => Number(value.toFixed(1));

function circlePip(cell) {
  const radius = round(Math.min(Math.min(cell.width, cell.height) * 0.43, 16));
  return (cx, cy) => `<circle cx="${round(cx)}" cy="${round(cy)}" r="${radius}"/>`;
}

function stickPip(cell) {
  const width = round(Math.min(cell.width * 0.5, 10));
  const height = round(cell.height * 0.78);
  return (cx, cy) =>
    `<rect x="${round(cx - width / 2)}" y="${round(cy - height / 2)}" width="${width}" height="${height}" rx="${round(width / 2)}"/>`;
}

function pipFace(suit, rank) {
  const rows = PIP_ROWS[suit][rank];
  const columns = Math.max(...rows.map(([count]) => count));
  const cell = { width: FIELD.width / columns, height: FIELD.height / rows.length };
  const pip = suit === 'pin' ? circlePip(cell) : stickPip(cell);
  return rows
    .flatMap(([count, offset], row) => {
      const cy = FIELD.y + cell.height * (row + 0.5);
      const span = FIELD.width / count;
      return Array.from({ length: count }, (unused, column) =>
        pip(FIELD.x + span * (column + 0.5) + offset, cy));
    })
    .join('');
}

function manFace(rank) {
  return `<text x="30" y="36" font-size="31">${MAN_NUMERALS[rank - 1]}</text>`
    + `<text x="30" y="72" font-size="27">萬</text>`;
}

function honorFace(rank) {
  if (rank === WHITE_DRAGON) {
    return `<rect x="13" y="15" width="34" height="54" rx="4" fill="none" stroke="currentColor" stroke-width="3.5"/>`;
  }
  return `<text x="30" y="57" font-size="42">${HONOR_GLYPHS[rank - 1]}</text>`;
}

function classicFace(suit, rank) {
  if (suit === 'man') return manFace(rank);
  if (suit === 'honor') return honorFace(rank);
  return pipFace(suit, rank);
}

function simpleFace(suit, rank) {
  if (suit === 'honor') return honorFace(rank);
  return `<text x="30" y="${SIMPLE.baseline}" font-size="${SIMPLE.size}">${rank}</text>`;
}

const FACES = { classic: classicFace, simple: simpleFace };

function faceSvg(tile) {
  const body = FACES[Settings.get('tileStyle')](Tiles.suitName(tile), Tiles.rankOf(tile));
  return `<svg viewBox="0 0 ${VIEW.width} ${VIEW.height}" fill="currentColor" text-anchor="middle" font-weight="700" aria-hidden="true">${body}</svg>`;
}

function accentOf(tile) {
  if (!Tiles.isHonor(tile)) return null;
  const rank = Tiles.rankOf(tile);
  if (rank === GREEN_DRAGON) return 'tile--green';
  if (rank === RED_DRAGON) return 'tile--red';
  return null;
}

export function tileNode(tile, { back = false, turned = false, dim = false, mark = null, interactive = false } = {}) {
  const node = document.createElement(interactive ? 'button' : 'div');
  if (interactive) node.type = 'button';
  node.className = 'tile';
  if (back) {
    node.classList.add('tile--back');
    return node;
  }
  node.classList.add(`tile--${Tiles.suitName(tile)}`);
  const accent = accentOf(tile);
  if (accent) node.classList.add(accent);
  if (turned) node.classList.add('tile--turned');
  if (dim) node.classList.add('tile--dim');
  if (mark) node.classList.add(`tile--${mark}`);
  node.innerHTML = faceSvg(tile);
  return node;
}
