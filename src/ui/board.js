import { tileHtml } from './tileView.js';
import { div, html } from './markup.js';
import { SEAT_NAMES } from '../core/seats.js';

const DORA_SLOTS = 5;
const RIVER_COLUMNS = '--river-cols';
export const NO_MARKS = new Map();

export const SEAT_CLASSES = SEAT_NAMES.map((name) => `seat--${name}`);

export const markOf = (marks, tile) => marks.get(tile) ?? null;

const riverColumns = () =>
  Number(getComputedStyle(document.documentElement).getPropertyValue(RIVER_COLUMNS));

export function riverRowsHtml(entries, marks = NO_MARKS) {
  const columns = riverColumns();
  const rows = [];
  entries.forEach((entry, index) => {
    if (index % columns === 0) rows.push([]);
    rows[rows.length - 1].push(tileHtml(entry.tile, {
      turned: entry.turned,
      mark: markOf(marks, entry.tile)
    }));
  });
  return html(rows.map((row) => div('river__row', row)));
}

export const doraTilesHtml = (indicator, mark = null) => html([
  tileHtml(indicator, { mark }),
  Array.from({ length: DORA_SLOTS - 1 }, () => tileHtml(0, { back: true }))
]);

export const faceTilesHtml = (tiles, marks = NO_MARKS) =>
  html(tiles.map((tile) => tileHtml(tile, { mark: markOf(marks, tile) })));

export const backTilesHtml = (count) => html(Array.from({ length: count }, () => tileHtml(0, { back: true })));
