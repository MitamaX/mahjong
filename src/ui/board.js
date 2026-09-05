import { tileNode } from './tileView.js';

const RIVER_COLUMNS = Number(getComputedStyle(document.documentElement).getPropertyValue('--river-cols'));

export const SEAT_CLASSES = ['seat--self', 'seat--right', 'seat--across', 'seat--left'];

export function riverRows(entries) {
  const rows = [];
  entries.forEach((entry, index) => {
    if (index % RIVER_COLUMNS === 0) {
      const row = document.createElement('div');
      row.className = 'river__row';
      rows.push(row);
    }
    rows[rows.length - 1].appendChild(tileNode(entry.tile, { turned: entry.turned }));
  });
  return rows;
}
