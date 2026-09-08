import { tileHtml } from './tileView.js';
import { div, html } from './markup.js';

const DORA_SLOTS = 5;
const RIVER_COLUMNS = '--river-cols';

export const SEAT_CLASSES = ['seat--self', 'seat--right', 'seat--across', 'seat--left'];

const riverColumns = () =>
  Number(getComputedStyle(document.documentElement).getPropertyValue(RIVER_COLUMNS));

export function riverRowsHtml(entries, marks = new Map()) {
  const columns = riverColumns();
  const rows = [];
  entries.forEach((entry, index) => {
    if (index % columns === 0) rows.push([]);
    rows[rows.length - 1].push(tileHtml(entry.tile, {
      turned: entry.turned,
      mark: marks.get(entry.tile) ?? null
    }));
  });
  return html(rows.map((row) => div('river__row', row)));
}

export const doraTilesHtml = (indicator, mark = null) => html([
  tileHtml(indicator, { mark }),
  Array.from({ length: DORA_SLOTS - 1 }, () => tileHtml(0, { back: true }))
]);

export const backTilesHtml = (count) => html(Array.from({ length: count }, () => tileHtml(0, { back: true })));
