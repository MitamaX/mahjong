import { Tiles } from '../core/tiles.js';
import { Settings } from '../core/settings.js';
import { classNames, tag } from './markup.js';

const VIEW = { width: 60, height: 84 };
const FIELD = { x: 8, y: 10, width: 44, height: 64 };
const MAN_NUMERALS = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];
const HONOR_GLYPHS = ['東', '南', '西', '北', '', '發', '中'];
const WHITE_DRAGON = 5;
const GREEN_DRAGON = 6;
const RED_DRAGON = 7;
const SIMPLE = { size: 54, baseline: 61 };
const ART_DIR = '../assets/tiles/';

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
    9: [[3, 0], [3, 0], [3, 0]]
  }
};

const PIP_SPOTS = {
  sou: {
    8: {
      columns: 4,
      rows: 2,
      spots: [
        [0.41, 0.5, 0], [1.45, 0.5, 35], [2.55, 0.5, -35], [3.59, 0.5, 0],
        [0.41, 1.5, 0], [1.45, 1.5, -35], [2.55, 1.5, 35], [3.59, 1.5, 0]
      ]
    }
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
  return (cx, cy, tilt) => {
    const bar = `<rect x="${round(cx - width / 2)}" y="${round(cy - height / 2)}" width="${width}" height="${height}" rx="${round(width / 2)}"/>`;
    return tilt ? `<g transform="rotate(${tilt} ${round(cx)} ${round(cy)})">${bar}</g>` : bar;
  };
}

function rowPlacement(rows) {
  const columns = Math.max(...rows.map(([count]) => count));
  const cell = { width: FIELD.width / columns, height: FIELD.height / rows.length };
  const spots = rows.flatMap(([count, offset], row) => {
    const cy = FIELD.y + cell.height * (row + 0.5);
    const span = FIELD.width / count;
    return Array.from({ length: count }, (unused, column) =>
      [FIELD.x + span * (column + 0.5) + offset, cy, 0]);
  });
  return { cell, spots };
}

function spotPlacement({ columns, rows, spots }) {
  const cell = { width: FIELD.width / columns, height: FIELD.height / rows };
  return {
    cell,
    spots: spots.map(([column, row, tilt]) =>
      [FIELD.x + cell.width * column, FIELD.y + cell.height * row, tilt])
  };
}

function pipFace(suit, rank) {
  const free = PIP_SPOTS[suit]?.[rank];
  const { cell, spots } = free ? spotPlacement(free) : rowPlacement(PIP_ROWS[suit][rank]);
  const pip = suit === 'pin' ? circlePip(cell) : stickPip(cell);
  return spots.map(([cx, cy, tilt]) => pip(cx, cy, tilt)).join('');
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

function standardFace(suit, rank) {
  if (suit === 'man') return manFace(rank);
  if (suit === 'honor') return honorFace(rank);
  return pipFace(suit, rank);
}

function simpleFace(suit, rank) {
  if (suit === 'honor') return honorFace(rank);
  return `<text x="30" y="${SIMPLE.baseline}" font-size="${SIMPLE.size}">${rank}</text>`;
}

function drawnFace(face) {
  return (suit, rank) =>
    `<svg viewBox="0 0 ${VIEW.width} ${VIEW.height}" fill="currentColor" text-anchor="middle" font-weight="700" aria-hidden="true">${face(suit, rank)}</svg>`;
}

function artFace(suit, rank) {
  return `<img src="${ART_DIR}${suit}${rank}.svg" alt="" draggable="false">`;
}

const STYLES = {
  standard: { face: drawnFace(standardFace) },
  simple: { face: drawnFace(simpleFace) },
  classic: { face: artFace, art: true }
};

function accentOf(tile) {
  if (!Tiles.isHonor(tile)) return null;
  const rank = Tiles.rankOf(tile);
  if (rank === GREEN_DRAGON) return 'tile--green';
  if (rank === RED_DRAGON) return 'tile--red';
  return null;
}

const faceOf = (tile) => STYLES[Settings.get('tileStyle')].face(Tiles.suitName(tile), Tiles.rankOf(tile));

export function tileHtml(tile, { back = false, turned = false, dim = false, mark = null, interactive = false } = {}) {
  if (back) return tag('div', { class: 'tile tile--back' });
  const style = STYLES[Settings.get('tileStyle')];
  return tag(interactive ? 'button' : 'div', {
    class: classNames('tile', `tile--${Tiles.suitName(tile)}`, style.art && 'tile--art', accentOf(tile),
      turned && 'tile--turned', dim && 'tile--dim', mark && `tile--${mark}`),
    type: interactive && 'button',
    'data-tile': tile
  }, faceOf(tile));
}

export function repaintTiles(root) {
  const art = Boolean(STYLES[Settings.get('tileStyle')].art);
  root.querySelectorAll('[data-tile]').forEach((node) => {
    node.classList.toggle('tile--art', art);
    node.innerHTML = faceOf(Number(node.dataset.tile));
  });
}
